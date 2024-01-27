import { useEffect, useState } from "react"

import clsx from "clsx"
import * as d3 from "d3"
import { annotationProps, intervalsProps } from "../../constants"

export interface CanvasChartProps {
	data: {vector: [number, number][], annotations: annotationProps[], intervals: intervalsProps[]}
	domain: {left: number, right: number, top: number, bottom: number}
	style: {cssStyle?: React.CSSProperties, className?: string, fontSize?: number, fontFamily?: string, fontWeight?: number, lineColor?: string, outlineColor?: string, margin?: {top: number, right: number, bottom: number, left: number}}
	xTicks?: number
	yTicks?: number
	xTickFormat?: (x: number) => string
	yTickFormat?: (y: number) => string
	setAnnotations?: React.Dispatch<React.SetStateAction<annotationProps[]>>

}

const CanvasChart: React.FC<CanvasChartProps> = ({data, domain, style, xTicks, yTicks, xTickFormat, yTickFormat, setAnnotations}) => {
	const [parentElement, setParentElement] = useState<HTMLDivElement | null>(null)
	const [canvasElement, setCanvasElement] = useState<HTMLCanvasElement | null>(null)

	const [width, setWidth] = useState(0)
	const [height, setHeight] = useState(0)
	const [pixelRatio, setPixelRatio] = useState(1)

	const [plotWidht, setPlotWidth] = useState(0)
	const [scaledMarginLeft, setScaledMarginLeft] = useState(0)

	const xScale = (x: number) => {
		//invert scale
		const scale = d3
			.scaleLinear()
			.domain([0, plotWidht])
			.range([domain.left, domain.right])


		return scale(x)
	}

	// Define the size of the canvas
	useEffect(() => {
		if (!parentElement) return;

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
	}, [parentElement])


	// Define the pixel ratio
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

	// Remove annotations on click
	useEffect(() => {
		const handleCanvasClick = (event: MouseEvent) => {

			if (event.button !== 2) return;

			const canvasRect = canvasElement?.getBoundingClientRect();
			if (!canvasRect) return;
		
			const mousePosition = xScale((event.clientX - canvasRect.left) * pixelRatio - scaledMarginLeft);
		
			// Find the annotation closest to the mouse position
			const closestAnnotation = data.annotations.reduce((closest, annotation) => {
				const distance = Math.abs(mousePosition - annotation.pos);
				return distance < Math.abs(mousePosition - closest.pos) ? annotation : closest;
			}, data.annotations[0]);
		
			if (!closestAnnotation) return;

			// Check if the mouse is within a certain range of the closest annotation
			const isMouseOverAnnotation = Math.abs(mousePosition - closestAnnotation.pos) < 100;
		
			if (isMouseOverAnnotation) {
				// Prompt the user for confirmation
				const userConfirmed = window.confirm('Are you sure you want to delete this annotation?');
		
				if (userConfirmed) {
				// Delete the annotation
				const updatedAnnotations = data.annotations.filter(annotation => annotation !== closestAnnotation);
			  	setAnnotations(updatedAnnotations);
			}
		  }
		};
	  
		// Add an event listener for the click event on the canvas
		canvasElement?.addEventListener('mousedown', handleCanvasClick);
		canvasElement?.addEventListener('contextmenu', (event) => event.preventDefault());
	  
		// Cleanup event listener on component unmount
		return () => {
		  canvasElement?.removeEventListener('mousedown', handleCanvasClick);
		  canvasElement?.removeEventListener('contextmenu', (event) => event.preventDefault());
		};
	}, [canvasElement, data.annotations, setAnnotations, xScale, pixelRatio, scaledMarginLeft]);	

	// Draw the chart
	useEffect(() => {
		if (!canvasElement) return;
			
		const scaledWidth = width * pixelRatio
		const scaledHeight = height * pixelRatio

		d3.select(canvasElement)
			.attr("width", scaledWidth)
			.attr("height", scaledHeight)

		const context = canvasElement.getContext("2d")

		if (!context) { return }

		const fontSizeScaled = (style.fontSize ?? 16) * pixelRatio
		context.font = `${style.fontWeight ?? 400} ${fontSizeScaled}px ${style.fontFamily ?? "sans-serif"}`

		const X = d3.map(data.vector, d => d[0])
		const Y = d3.map(data.vector, d => d[1])

		const yTicksValues = d3.ticks(domain.bottom, domain.top, yTicks ?? 10)
		const xTicksValues = d3.ticks(domain.left, domain.right, xTicks ?? 10)
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

		const scaledTopMargin = (style.margin.top ?? fontSizeScaled / 2) * pixelRatio
		const scaledRightMargin = (style.margin.right ?? fontSizeScaled / 2) * pixelRatio
		const scaledBottomMargin = (style.margin.bottom ?? 0) * pixelRatio + xAxisHeight
		const scaledLeftMargin = (style.margin.left ?? 0) * pixelRatio + yAxisWidth

		const plotWidth = scaledWidth - scaledLeftMargin - scaledRightMargin
		const plotHeight = scaledHeight - scaledTopMargin - scaledBottomMargin

		setPlotWidth(plotWidth)
		setScaledMarginLeft(scaledLeftMargin)

		const xScale = d3
			.scaleLinear()
			.domain([domain.left, domain.right])
			.range([0, plotWidth])

		const yScale = d3
			.scaleLinear()
			.domain([domain.bottom, domain.top])
			.range([plotHeight, 0])


		context.translate(scaledLeftMargin, scaledTopMargin)

		const lineWidth = 2 * pixelRatio
		const halfLineWidth = lineWidth / 2
		context.lineWidth = lineWidth

		// Draw the chart/line
		const line = d3
			.line()
			.x(d => xScale(d[0]))
			.y(d => yScale(d[1]))
			.context(context)
			.defined(d => d[1] !== null && d[0] >= domain.left && d[0] <= domain.right)
			.context(context)

		line(data.vector)
		context.strokeStyle = style.lineColor ?? "red"
		context.stroke()

		context.strokeStyle = style.outlineColor ?? "black"

		// Draw y axis
		context.beginPath()
		context.moveTo(0, -halfLineWidth)
		context.lineTo(0, plotHeight + halfLineWidth)
		context.stroke()

		context.textAlign = "right"
		context.textBaseline = "middle"
		context.fillStyle = style.outlineColor ?? "black"

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

		// Draw annotations
		context.lineWidth = 2;
		data.annotations.forEach(annotation => {
			context.strokeStyle = annotation.color;
			const xPosition = xScale(annotation.pos); // Adjust this based on how your annotations are defined
			context.beginPath();
			context.moveTo(xPosition, 0);
			context.lineTo(xPosition, plotHeight);
			context.stroke();
		});
	}, [
		data,
		width,
		height,
		pixelRatio,
		canvasElement,
		yTicks,
		yTickFormat,
		xTicks,
		xTickFormat,
		style,
	])

	return (
		<div
			ref={setParentElement}
			className={clsx("relative", style.className)}
			style={style.cssStyle}
		>
			<canvas ref={setCanvasElement} className="h-auto w-full" />
		</div>
	)
}

export default CanvasChart
