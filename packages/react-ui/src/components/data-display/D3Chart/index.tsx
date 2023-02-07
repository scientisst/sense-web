import { useEffect, useState } from "react"

import clsx from "clsx"

export interface D3ChartProps {
	data: Array<[number, number | null]>
	className?: string
	style?: React.CSSProperties
	canvasPaintFn?: (
		canvas: HTMLCanvasElement,
		width: number,
		height: number,
		pixelRatio: number,
		data: Array<[number, number | null]>,
		time: number
	) => void
	svgPaintFn?: (
		svg: SVGSVGElement,
		width: number,
		height: number,
		data: Array<[number, number | null]>
	) => void
}

const D3Chart: React.FC<D3ChartProps> = ({
	data,
	className,
	style,
	svgPaintFn,
	canvasPaintFn
}) => {
	const [canvasElement, setCanvasElement] =
		useState<HTMLCanvasElement | null>(null)
	const [svgElement, setSvgElement] = useState<SVGSVGElement | null>(null)
	const [parentElement, setParentElement] = useState<HTMLDivElement | null>(
		null
	)
	const [pixelRatio, setPixelRatio] = useState(1)

	const [width, setWidth] = useState(0)
	const [height, setHeight] = useState(0)

	useEffect(() => {
		let valid = true

		if (svgElement && svgPaintFn) {
			window.requestAnimationFrame(() => {
				if (valid) {
					svgPaintFn(svgElement, width, height, data)
				}
			})
		}

		return () => {
			valid = false
		}
	}, [data, svgElement, svgPaintFn, width, height])

	useEffect(() => {
		let valid = true

		if (canvasElement && canvasPaintFn) {
			window.requestAnimationFrame(time => {
				if (valid) {
					canvasPaintFn(
						canvasElement,
						width,
						height,
						pixelRatio,
						data,
						time
					)
				}
			})
		}

		return () => {
			valid = false
		}
	}, [data, canvasElement, canvasPaintFn, width, height, pixelRatio])

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

	return (
		<div
			ref={setParentElement}
			className={clsx("relative flex flex-row items-stretch", className)}
		>
			<canvas
				ref={setCanvasElement}
				className="h-auto w-full"
				style={style}
			/>
			<svg ref={setSvgElement} className="absolute h-full w-full" />
		</div>
	)
}

export default D3Chart
