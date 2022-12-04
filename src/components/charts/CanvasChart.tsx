import { useEffect, useState } from "react"

import clsx from "clsx"
import * as d3 from "d3"

export interface CanvasChartProps {
	className?: string
	style?: React.CSSProperties
	data: [number, number | null][]
	xMin?: number | "auto"
	xMax?: number | "auto"
	yMin?: number | "auto"
	yMax?: number | "auto"
	xTicks?: number
	yTicks?: number
	xTickFormat?: (x: number) => string
	yTickFormat?: (y: number) => string
	topMargin?: number
	rightMargin?: number
	bottomMargin?: number
	leftMargin?: number
	fontSize?: number
	fontFamily?: string
	fontWeight?: number
}

const CanvasChart: React.FC<CanvasChartProps> = ({
	className,
	style,
	data,
	xMin,
	xMax,
	yMin,
	yMax,
	xTicks,
	yTicks,
	xTickFormat,
	yTickFormat,
	topMargin,
	rightMargin,
	bottomMargin,
	leftMargin,
	fontSize,
	fontFamily,
	fontWeight
}) => {
	const [parentElement, setParentElement] = useState<HTMLDivElement | null>(
		null
	)
	const [canvasElement, setCanvasElement] =
		useState<HTMLCanvasElement | null>(null)

	const [width, setWidth] = useState(0)
	const [height, setHeight] = useState(0)
	const [pixelRatio, setPixelRatio] = useState(1)

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

	useEffect(() => {
		if (canvasElement) {
			const scaledWidth = width * pixelRatio
			const scaledHeight = height * pixelRatio

			d3.select(canvasElement)
				.attr("width", scaledWidth)
				.attr("height", scaledHeight)

			const context = canvasElement.getContext("2d")

			if (!context) {
				return
			}

			const fontSizeScaled = (fontSize ?? 16) * pixelRatio
			context.font = `${fontWeight ?? 400} ${fontSizeScaled}px ${
				fontFamily ?? "sans-serif"
			}`

			const X = d3.map(data, d => d[0])
			const Y = d3.map(data, d => d[1])

			const xMinValue =
				xMin === "auto" || xMin === undefined ? d3.min(X) : xMin
			const xMaxValue =
				xMax === "auto" || xMax === undefined ? d3.max(X) : xMax
			const yMinValue =
				yMin === "auto" || yMin === undefined ? d3.min(Y) : yMin
			const yMaxValue =
				yMax === "auto" || yMax === undefined ? d3.max(Y) : yMax

			const yTicksValues = d3.ticks(yMinValue, yMaxValue, yTicks ?? 10)
			const xTicksValues = d3.ticks(xMinValue, xMaxValue, xTicks ?? 10)
			const yAxisWidth =
				d3.max(
					yTicksValues.map(
						y =>
							context.measureText(
								String(yTickFormat ? yTickFormat(y) : y)
							).width
					)
				) +
				8 * pixelRatio
			const xAxisHeight = fontSizeScaled + 8 * pixelRatio

			const scaledTopMargin =
				(topMargin ?? fontSizeScaled / 2) * pixelRatio
			const scaledRightMargin =
				(rightMargin ?? fontSizeScaled / 2) * pixelRatio
			const scaledBottomMargin =
				(bottomMargin ?? 0) * pixelRatio + xAxisHeight
			const scaledLeftMargin = (leftMargin ?? 0) * pixelRatio + yAxisWidth

			const plotWidth = scaledWidth - scaledLeftMargin - scaledRightMargin
			const plotHeight =
				scaledHeight - scaledTopMargin - scaledBottomMargin

			context.translate(scaledLeftMargin, scaledTopMargin)

			const xScale = d3
				.scaleLinear()
				.domain([xMinValue, xMaxValue])
				.range([0, plotWidth])

			const yScale = d3
				.scaleLinear()
				.domain([yMinValue, yMaxValue])
				.range([plotHeight, 0])

			const lineWidth = 2 * pixelRatio
			const halfLineWidth = lineWidth / 2
			context.lineWidth = lineWidth

			const line = d3
				.line()
				.x(d => xScale(d[0]))
				.y(d => yScale(d[1]))
				.context(context)
				.defined(
					d => d[1] !== null && d[0] >= xMinValue && d[0] <= xMaxValue
				)
				.context(context)

			line(data)
			context.strokeStyle = "red"
			context.stroke()

			context.strokeStyle = "black"

			// Draw y axis
			context.beginPath()
			context.moveTo(0, -halfLineWidth)
			context.lineTo(0, plotHeight + halfLineWidth)
			context.stroke()

			context.textAlign = "right"
			context.textBaseline = "middle"

			for (const yTickValue of yTicksValues) {
				const yTickPosition = yScale(yTickValue)
				context.beginPath()
				context.moveTo(-6 * pixelRatio - halfLineWidth, yTickPosition)
				context.lineTo(-halfLineWidth, yTickPosition)
				context.stroke()

				context.fillText(
					yTickFormat
						? yTickFormat(yTickValue)
						: yTickValue.toString(),
					-halfLineWidth - 8 * pixelRatio,
					yTickPosition
				)
			}

			// Draw x axis
			context.beginPath()
			context.moveTo(-halfLineWidth, plotHeight)
			context.lineTo(plotWidth + halfLineWidth, plotHeight)
			context.stroke()

			context.textAlign = "center"
			context.textBaseline = "top"

			for (const xTickValue of xTicksValues) {
				const xTickPosition = xScale(xTickValue)
				context.beginPath()
				context.moveTo(xTickPosition, plotHeight + halfLineWidth)
				context.lineTo(
					xTickPosition,
					plotHeight + halfLineWidth + 6 * pixelRatio
				)
				context.stroke()

				context.fillText(
					xTickFormat
						? xTickFormat(xTickValue)
						: xTickValue.toString(),
					xTickPosition,
					plotHeight + lineWidth + 8 * pixelRatio
				)
			}
		}
	}, [
		data,
		width,
		height,
		pixelRatio,
		canvasElement,
		topMargin,
		rightMargin,
		bottomMargin,
		leftMargin,
		xMin,
		xMax,
		yMin,
		yMax,
		yTicks,
		yTickFormat,
		xTicks,
		xTickFormat,
		fontSize,
		fontWeight,
		fontFamily
	])

	return (
		<div
			ref={setParentElement}
			className={clsx("relative", className)}
			style={style}
		>
			<canvas ref={setCanvasElement} className="h-auto w-full" />
		</div>
	)
}

export default CanvasChart
