import { useCallback, useEffect, useRef, useState } from "react"

import { D3Chart } from "@scientisst/react-ui/components/data-display"
import * as d3 from "d3"

const GraphComponent = () => {
	const [data, setData] = useState<Array<[number, number | null]>>([])

	useEffect(() => {
		const samplingRate = 16000 / 16
		const seconds = 5
		const downsample = 728
		const bufferSize = samplingRate * seconds

		const signalWorker = new Worker(
			new URL("../workers/fakeSignal.ts", import.meta.url)
		)

		signalWorker.onmessage = (
			e: MessageEvent<{
				buffer: Array<{
					seq: number
					voltage: number
				}>
			}>
		) => {
			setData(e.data.buffer.map(d => [d.seq, d.voltage]))
		}

		let valid = true
		const w = (time: number) => {
			if (valid) {
				signalWorker.postMessage({
					samplingRate,
					bufferSize,
					downsample,
					time
				})
				window.requestAnimationFrame(w)
			}
		}
		window.requestAnimationFrame(w)

		return () => {
			signalWorker.terminate()
			valid = false
		}
	}, [])

	const canvasPaintFn = useCallback(
		(
			canvasElement: HTMLCanvasElement,
			width: number,
			height: number,
			pixelRatio: number,
			data: Array<[number, number | null]>,
			time: number
		) => {
			d3.select(canvasElement)
				.attr("width", width * pixelRatio)
				.attr("height", height * pixelRatio)

			const ctx = canvasElement.getContext("2d")

			const margins = {
				top: Math.floor(40 * pixelRatio),
				right: Math.floor(40 * pixelRatio),
				bottom: Math.floor(40 * pixelRatio),
				left: Math.floor(40 * pixelRatio)
			}
			width = Math.floor(
				width * pixelRatio - margins.left - margins.right
			)
			height = Math.floor(
				height * pixelRatio - margins.top - margins.bottom
			)
			ctx.translate(margins.left, margins.top)

			const last = data.length ? data[data.length - 1][0] / 16000 : 0

			const X = data.map(d => d[0] / 16000)
			const Y = data.map(d => d[1])

			const xDomain = [Math.max(0, last - 5), Math.max(last, 5)]
			const yDomain = d3.extent(Y)
			const xScale = d3.scaleLinear(xDomain, [0, width])
			const yScale = d3.scaleLinear(yDomain, [height, 0])

			ctx.lineWidth = 2
			const line = d3
				.line()
				.x((_, i) => xScale(X[i]))
				.y((_, i) => yScale(Y[i]))
				.defined((_, i) => Y[i] !== null)
				.context(ctx)

			line(data)
			ctx.strokeStyle = "red"
			ctx.stroke()

			// Draw the x-axis

			const ticks = []
			let lastTick = Math.ceil(xDomain[0])
			X.forEach(x => {
				if (x > lastTick) {
					lastTick = Math.floor(x) + 1
					ticks.push(Math.floor(x))
				}
			})

			ctx.lineWidth = 2
			ctx.beginPath()
			ctx.moveTo(0, height + 1)
			ctx.lineTo(width, height + 1)

			ticks.forEach(tick => {
				const x = xScale(tick)
				ctx.moveTo(x, height + 1)
				ctx.lineTo(x, height + 10)
			})

			ctx.strokeStyle = "#000"
			ctx.stroke()

			ctx.textAlign = "center"
			ctx.textBaseline = "top"
			ctx.font = `${16 * pixelRatio}px Lexend`
			ticks.forEach(tick => {
				const x = xScale(tick)
				ctx.fillText(tick.toString(), x, height + 12)
			})
		},
		[]
	)

	return (
		<D3Chart
			data={data}
			canvasPaintFn={canvasPaintFn}
			className="h-96 w-full"
		/>
	)
}

const Page = () => {
	return (
		<div className="flex w-full flex-col items-center justify-start">
			<div className="container flex flex-col items-center justify-start">
				<GraphComponent />
				<GraphComponent />
				<GraphComponent />
			</div>
		</div>
	)
}

export default Page
