import { ReactNode, useCallback, useEffect, useRef, useState } from "react"

import clsx from "clsx"

let d3: typeof import("d3") | false = false
import("d3").then(d3Module => {
	d3 = d3Module
})
export interface LiveChartOptions {
	className?: string
	style?: React.CSSProperties
	margins?: {
		top?: number
		right?: number
		bottom?: number
		left?: number
	}
	fontFamily?: string
	yDomain?: [number | undefined, number | undefined]
	yTickInterval?: number
	yTickFormat?: (value: number) => string
}

const defaultMargins = {
	top: 0,
	right: 0,
	bottom: 30,
	left: 50
}

const useLiveD3Chart = ({
	className,
	style,
	margins,
	fontFamily,
	yDomain,
	yTickInterval,
	yTickFormat
}: LiveChartOptions) => {
	const [chartNode, setChartNode] = useState<ReactNode | null>(null)
	const [parentElement, setParentElement] = useState<HTMLDivElement | null>(
		null
	)
	const [canvasElement, setCanvasElement] =
		useState<HTMLCanvasElement | null>(null)
	const [pixelRatio, setPixelRatio] = useState(1)
	const [width, setWidth] = useState(0)
	const [height, setHeight] = useState(0)
	const [downsampledData, setDownsampledData] = useState<
		Array<[number, number | null]>
	>([])
	const [data, setData] = useState<Array<[number, number | null]>>([])
	const [downsamplerWorker, setDownsamplerWorker] = useState<Worker | null>(
		null
	)
	const downsamplerWorkerReady = useRef<boolean>(true)
	const dataLastOriginal = useRef<number>(0)
	const dataLastDownsampled = useRef<number>(0)
	const [requiresDownsampling, setRequiresDownsampling] = useState(true)
	const lastDownsampling = useRef<number>(0)

	const redraw = useCallback(() => {
		if (canvasElement && d3) {
			const scaledWidth = width * pixelRatio
			const scaledHeight = height * pixelRatio

			d3.select(canvasElement)
				.attr("width", scaledWidth)
				.attr("height", scaledHeight)

			const context = canvasElement.getContext("2d")

			if (context) {
				const scaledMargins = {
					top: (margins?.top ?? defaultMargins.top) * pixelRatio,
					right:
						(margins?.right ?? defaultMargins.right) * pixelRatio,
					bottom:
						(margins?.bottom ?? defaultMargins.bottom) * pixelRatio,
					left: (margins?.left ?? defaultMargins.left) * pixelRatio
				}

				const plotWidth =
					scaledWidth - scaledMargins.left - scaledMargins.right
				const plotHeight =
					scaledHeight - scaledMargins.top - scaledMargins.bottom

				context.translate(scaledMargins.left, scaledMargins.top)

				if (downsampledData.length > 0) {
					const X = downsampledData.map(([x]) => x)
					const Y = downsampledData.map(([, y]) => y)
					const yDefined = Y.filter(y => y !== null) as number[]

					const min = Math.max(0, d3.min(X) ?? 0)
					const xDomain = [min, min + 1000 * 5]

					const xScale = d3.scaleLinear(xDomain, [0, plotWidth])
					const yScale = d3.scaleLinear(
						[
							yDomain?.[0] ?? d3.min(yDefined) ?? 0,
							yDomain?.[1] ?? d3.max(yDefined) ?? 100
						],
						[plotHeight, 0]
					)

					const lineWidth = 2 * pixelRatio
					const halfLineWidth = lineWidth / 2
					context.lineWidth = lineWidth

					const line = d3
						.line<[number, number | null]>()
						.x(([x]) => xScale(x))
						.y(([, y]) => yScale(y ?? 0))
						.defined(
							([x, y]) =>
								y !== null && x >= xDomain[0] && x <= xDomain[1]
						)
						.context(context)

					line(downsampledData)
					context.strokeStyle = "red"
					context.stroke()

					// Draw y axis
					context.beginPath()
					context.moveTo(-halfLineWidth, 0)
					context.lineTo(-halfLineWidth, plotHeight + lineWidth)
					context.strokeStyle = "black"
					context.stroke()

					// Draw y ticks
					const yTicks = d3.ticks(
						yDomain?.[0] ?? d3.min(yDefined) ?? 0,
						yDomain?.[1] ?? d3.max(yDefined) ?? 100,
						yTickInterval ?? 10
					)

					context.textAlign = "right"
					context.textBaseline = "middle"
					context.font = `${16 * pixelRatio}px ${
						fontFamily ?? "sans-serif"
					}`

					for (const y of yTicks) {
						const yScaled = yScale(y)

						context.beginPath()
						context.moveTo(-6 - halfLineWidth * pixelRatio, yScaled)
						context.lineTo(-halfLineWidth, yScaled)
						context.strokeStyle = "black"
						context.stroke()

						context.fillText(
							yTickFormat ? yTickFormat(y) : y.toString(),
							-8 * pixelRatio,
							yScaled
						)
					}

					// Draw x axis
					context.beginPath()
					context.moveTo(-lineWidth, plotHeight + halfLineWidth)
					context.lineTo(plotWidth, plotHeight + halfLineWidth)
					context.strokeStyle = "black"
					context.stroke()

					// Draw x ticks
					const xTicks = d3.ticks(xDomain[0], xDomain[1], 5)

					context.textAlign = "center"
					context.textBaseline = "top"
					context.font = `${16 * pixelRatio}px ${
						fontFamily ?? "sans-serif"
					}`

					for (const x of xTicks) {
						const xScaled = xScale(x)

						context.beginPath()
						context.moveTo(xScaled, plotHeight + lineWidth)
						context.lineTo(
							xScaled,
							plotHeight + lineWidth + 4 * pixelRatio
						)
						context.strokeStyle = "black"
						context.stroke()

						context.fillText(
							x.toString(),
							xScaled,
							plotHeight + lineWidth + 8 * pixelRatio
						)
					}
				}
			}
		}
	}, [
		canvasElement,
		downsampledData,
		fontFamily,
		height,
		margins,
		pixelRatio,
		width,
		yDomain,
		yTickFormat,
		yTickInterval
	])

	useEffect(() => {
		setRequiresDownsampling(true)
		dataLastOriginal.current = -1
	}, [width, height, pixelRatio, margins, yDomain])

	useEffect(() => {
		setChartNode(
			<div
				ref={setParentElement}
				className={clsx("relative", className)}
				style={style}
			>
				<canvas
					ref={setCanvasElement}
					className="h-auto w-full"
					style={style}
				/>
			</div>
		)
	}, [className, style])

	useEffect(() => {
		let cancel = false

		window.requestAnimationFrame(() => {
			if (!cancel) {
				redraw()
			}
		})

		return () => {
			cancel = true
		}
	}, [redraw])

	useEffect(() => {
		setPixelRatio(window.devicePixelRatio)

		const resizeObserver = new ResizeObserver(() => {
			setPixelRatio(window.devicePixelRatio)
		})

		resizeObserver.observe(window.document.body)

		return () => {
			resizeObserver.disconnect()
		}
	}, [])

	useEffect(() => {
		if (parentElement) {
			setWidth(parentElement.clientWidth)
			setHeight(parentElement.clientHeight)

			const resizeObserver = new ResizeObserver(() => {
				setWidth(parentElement.clientWidth)
				setHeight(parentElement.clientHeight)
			})

			resizeObserver.observe(parentElement)

			return () => {
				resizeObserver.disconnect()
			}
		}
	}, [parentElement])

	// useEffect(() => {
	// 	const worker = new Worker(
	// 		new URL("./downsamplingWorker.js", import.meta.url)
	// 	)
	// 	setDownsamplerWorker(worker)

	// 	return () => {
	// 		if (worker) {
	// 			worker.terminate()
	// 		}
	// 	}
	// }, [])

	useEffect(() => {
		if (
			downsamplerWorker &&
			downsamplerWorkerReady.current &&
			requiresDownsampling
		) {
			downsamplerWorkerReady.current = false
			setRequiresDownsampling(false)

			const xLeftLimit =
				data.length > 0
					? Math.max(data[data.length - 1][0] - 1000 * 5, 0)
					: 0

			const i = downsampledData.findIndex(([x]) => x >= xLeftLimit)
			const truncatedDownsampledData = [...downsampledData]
			if (i > 0) {
				truncatedDownsampledData.splice(0, i)
				dataLastDownsampled.current -= i
			}

			const noData = dataLastOriginal.current < 0
			const samplesPerBucket = 3

			downsamplerWorker.onmessage = (
				event: MessageEvent<{
					downsampledData: Array<[number, number | null]>
					lastOriginal: number
					lastDownsampled: number
				}>
			) => {
				if (noData) {
					setDownsampledData(event.data.downsampledData)
				} else {
					setDownsampledData([
						...truncatedDownsampledData.slice(
							0,
							dataLastDownsampled.current
						),
						...event.data.downsampledData.slice(1)
					])
				}

				if (dataLastOriginal.current < 0) {
					dataLastOriginal.current = 0
					dataLastDownsampled.current = 0
				} else {
					if (noData) {
						dataLastOriginal.current += event.data.lastOriginal
						dataLastDownsampled.current +=
							event.data.lastDownsampled
					} else {
						dataLastOriginal.current += event.data.lastOriginal - 1
						dataLastDownsampled.current +=
							event.data.lastDownsampled - 1
					}
				}

				downsamplerWorkerReady.current = true
			}

			if (
				dataLastOriginal.current <= 0 ||
				truncatedDownsampledData.length === 0
			) {
				dataLastOriginal.current = 0
				dataLastDownsampled.current = 0
				downsamplerWorker.postMessage({
					data: data,
					samplesPerBucket
				})
			} else {
				downsamplerWorker.postMessage({
					data: [
						truncatedDownsampledData[
							truncatedDownsampledData.length - 1
						],
						...data.slice(dataLastOriginal.current)
					],
					samplesPerBucket
				})
			}

			// const currentTime = Date.now()
			// if (currentTime - lastDownsampling.current > 100) {
			// 	lastDownsampling.current = currentTime
			// } else {
			// 	lastDownsampling.current += 100
			// 	setTimeout(work, lastDownsampling.current + 100 - currentTime)
			// }
		}
	}, [
		data,
		downsampledData,
		downsamplerWorker,
		margins,
		pixelRatio,
		requiresDownsampling,
		width
	])

	const setDataExport = useCallback(
		(newData: Array<[number, number | null]>) => {
			setData(newData)
			setRequiresDownsampling(true)
			dataLastOriginal.current = -1
		},
		[]
	)

	const appendDataExport = useCallback(
		(newData: Array<[number, number | null]>) => {
			const d = [...data, ...newData]

			const xLeftLimit = Math.max(d[d.length - 1][0] - 1000 * 5, 0)
			const i = data.findIndex(([x]) => x >= xLeftLimit)

			if (i > 0) {
				d.splice(0, i)
				dataLastOriginal.current -= i
			}

			setData(d)
			setRequiresDownsampling(true)
		},
		[data]
	)

	return {
		chartNode,
		setData: setDataExport,
		appendData: appendDataExport
	}
}

export default useLiveD3Chart
