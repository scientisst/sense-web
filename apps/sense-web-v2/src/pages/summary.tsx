import { useCallback, useEffect } from "react"

import { useRouter } from "next/router"

import { TextButton } from "@scientisst/react-ui/components/inputs"
import { MakerFrame, ScientISSTFrame } from "@scientisst/sense/future"
import { Canvg } from "canvg"
import * as d3 from "d3"
import FileSaver from "file-saver"
import JsPDF from "jspdf"
import JSZip from "jszip"

import SenseLayout from "../components/layout/SenseLayout"
import { annotationProps, intervalsProps } from "../constants"
import EventsLabel from "../components/ShowEvents"
import { Inter } from "@next/font/google"
import { ChannelList } from "../ChannelList"
import { Channel } from "../Channel"

const addSvgToPDF = async (
	pdf: JsPDF,
	svg: SVGSVGElement | string,
	x: number,
	y: number,
	width: number,
	height: number,
	dpi = 300
) => {

	const canvas = document.createElement("canvas")
	const ctx = canvas.getContext("2d")

	const dpmm = dpi / 25.4

	canvas.width = width * dpmm
	canvas.height = height * dpmm
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	const v: Canvg =
		typeof svg !== "string"
			? Canvg.fromString(ctx, svg.outerHTML)
			: await Canvg.from(ctx, svg, {})

	v.resize(width * dpmm, height * dpmm, "xMidYMid meet")
	await v.render()

	const imgData = canvas.toDataURL("image/png")
	pdf.addImage(imgData, "PNG", x, y, width, height)

	canvas.remove()
}

const Page = () => {
	const router = useRouter()
	useEffect(() => {
		if (!("aq_seg0" in localStorage)) {
			router.push("/").finally(() => {
				// Ignore
			})
		}
	}, [router])


	const convertToCSV = useCallback(() => {
		const eventsLabel = JSON.parse(localStorage.getItem("settings")).eventsLabel;

		const segments = JSON.parse(localStorage.getItem("aq_segments"));
		const deviceType = localStorage.getItem("aq_deviceType");
		const sampleRate = JSON.parse(localStorage.getItem("aq_sampleRate"));

		const channelsListData: any = JSON.parse(localStorage.getItem("aq_channels"));
		let channelsList: ChannelList[] = []
		for (let i = 0; i < segments; i++) {
			channelsList.push(ChannelList.parseInstance(channelsListData[i]));
		}

		if (deviceType !== "sense" && deviceType !== "maker") {
		  throw new Error("Device type not supported yet.");
		}

		const zip = new JSZip();
		let firstTimestamp = 0;

		for (let segment = 0; segment < segments; segment++) {
			const frames = deviceType === "sense"
				? ScientISSTFrame.deserializeAll(localStorage.getItem(`aq_seg${segment}`), new Set(channelsList[segment].names))
				: MakerFrame.deserializeAll(localStorage.getItem(`aq_seg${segment}`), new Set(channelsList[segment].names))

			if (frames.length === 0) {
				continue;
			}

			const resolutionBits = [];
			channelsList[segment].names.forEach(name => {
				resolutionBits.push(ScientISSTFrame.CHANNEL_SIZES[name]);
			});

			const timestamp = new Date(JSON.parse(localStorage.getItem(`aq_seg${segment}time`) ?? "0"));

			if (firstTimestamp === 0) {
				firstTimestamp = timestamp.getTime();
			}

			//Show Details
			const auxDeviceType = deviceType === "sense" ? "ScientISST Sense" : "ScientISST Maker"
			const auxResolutionBits = deviceType === "sense" ? resolutionBits : undefined;

			const detailsTable = [
				"# Device: " + auxDeviceType,
				"# Sampling rate (Hz): " + sampleRate,
				"# ISO 8601: " + timestamp.toISOString(),
				"# Timestamp: " + timestamp.getTime(),
			];

			// Show data table
			const dataTable = [
				"# Channel, " + channelsList[segment].names.join(", "),
				"# Resolution (bits), " + auxResolutionBits,
				...frames.map(frame => [frame.sequence, ...channelsList[segment].names.map(channel => frame.channels[channel])].join(", ")),
			];

			const translate = (events: string[]) => {
				const translation: string[] = [];
			
				for (const [index, label] of eventsLabel.entries()) {
					translation.push(`# ${index} -> ${label.name}`);
			
					for (let i = 0; i < events.length; i++) {
						const event = events[i];
			
						if (event.includes(label.name)) {
							// Replace label.name and assign the result back to events[i]
							events[i] = event.replace(label.name, index.toString());
						}
					}
				}
			
				// Now, translation array contains the desired strings.
				return translation.concat(events);
			}

			//Show annotations tables
			const annotationTable = [
				"# Channel, Annotations, Label, Instant",
				...translate(channelsList[segment].showAnnotations()),
			];

			//Show intervals tables
			const intervalsTable = [
				"# Channel, Intervals, Label, Start, End",
				...translate(channelsList[segment].showIntervals()),
			];

		  	const data_content = [...detailsTable, '#', ...dataTable];
			const annotation_content = [...detailsTable, '#', ...annotationTable];
			const intervals_content = [...detailsTable, '#', ...intervalsTable];

		  	zip.file(`segment_${segment}.csv`, data_content.join("\n"));
			zip.file(`segment_${segment}_annotations.csv`, annotation_content.join("\n"));
			zip.file(`segment_${segment}_intervals.csv`, intervals_content.join("\n"));
		}

		if (firstTimestamp === 0) {
		  firstTimestamp = new Date().getTime();
		}

		const timestampISO = new Date(firstTimestamp).toISOString();

		zip.generateAsync({ type: "blob" }).then(content => {
		  FileSaver.saveAs(content, `${timestampISO}.zip`);
		});
	}, []);

	const convertToPDF = useCallback(async () => {
		const pdf = new JsPDF({
			orientation: "landscape",
			unit: "mm",
			format: "a4",
			floatPrecision: 16,
			putOnlyUsedFonts: true,
			compress: true
		})

		const DOCUMENT_WIDTH = 297
		const DOCUMENT_HEIGHT = 210
		const DOCUMENT_DPI = 400
		const DOCUMENT_MARGIN = 25.4
		const TEXT_PRIMARY: [number, number, number] = [0, 0, 0]
		const TEXT_SECONDARY: [number, number, number] = [138, 138, 138]

		// Add fonts to the PDF document
		const imagineFontFile = await (
			await fetch("/static/imagine.ttf")
		).arrayBuffer()
		const imagineFontBase64 = Buffer.from(
			String.fromCharCode(...new Uint8Array(imagineFontFile)),
			"binary"
		).toString("base64")
		const lexendRegularFontFile = await (
			await fetch("/static/lexend-regular.ttf")
		).arrayBuffer()
		const lexendRegularFontBase64 = Buffer.from(
			String.fromCharCode(...new Uint8Array(lexendRegularFontFile)),
			"binary"
		).toString("base64")
		const lexendSemiBoldFontFile = await (
			await fetch("/static/lexend-semibold.ttf")
		).arrayBuffer()
		const lexendSemiBoldFontBase64 = Buffer.from(
			String.fromCharCode(...new Uint8Array(lexendSemiBoldFontFile)),
			"binary"
		).toString("base64")
		const lexendLightFontFile = await (
			await fetch("/static/lexend-light.ttf")
		).arrayBuffer()
		const lexendLightFontBase64 = Buffer.from(
			String.fromCharCode(...new Uint8Array(lexendLightFontFile)),
			"binary"
		).toString("base64")

		pdf.addFileToVFS("Imagine.ttf", imagineFontBase64)
		pdf.addFont("Imagine.ttf", "Imagine", "normal")
		pdf.addFileToVFS("Lexend-Regular.ttf", lexendRegularFontBase64)
		pdf.addFont("Lexend-Regular.ttf", "Lexend", "regular")
		pdf.addFileToVFS("Lexend-SemiBold.ttf", lexendSemiBoldFontBase64)
		pdf.addFont("Lexend-SemiBold.ttf", "Lexend", "semibold")
		pdf.addFileToVFS("Lexend-Light.ttf", lexendLightFontBase64)
		pdf.addFont("Lexend-Light.ttf", "Lexend", "light")

		// Extract acquisition data from local storage
		const channels: ChannelList = JSON.parse(localStorage.getItem("aq_channels"))

		const segmentCount: number = JSON.parse(localStorage.getItem("aq_segments"))
		const deviceType = localStorage.getItem("aq_deviceType")
		const storedChannelNames: string[] = JSON.parse(localStorage.getItem("aq_channelNames") ?? "{}")

		const annotations: annotationProps[] = JSON.parse(localStorage.getItem("aq_annotations") ?? "{}")
		const intervals: intervalsProps[] = JSON.parse(localStorage.getItem("aq_intervals") ?? "{}")

		if (deviceType !== "sense" && deviceType !== "maker") {
			throw new Error("Device type not supported yet.")
		}
		const selectedSegment = segmentCount
		const frames =
			deviceType === "sense"
				? ScientISSTFrame.deserializeAll(
						localStorage.getItem(`aq_seg${selectedSegment}`) ?? "",
						new Set(channels)
				  )
				: MakerFrame.deserializeAll(
						localStorage.getItem(`aq_seg${selectedSegment}`) ?? "",
						new Set(channels)
				  )

		const timestamp = new Date(
			JSON.parse(localStorage.getItem(`aq_seg${selectedSegment}time`))
		)
		const samplingRate = JSON.parse(localStorage.getItem("aq_sampleRate"))

		if (frames.length === 0) {
			throw new Error("No frames found")
		}

		const pages = Math.ceil(channels.size / 3)
		for (let page = 0; page < pages; page++) {
			if (page > 0) {
				pdf.addPage()
			}

			const channelsOnPage = page < pages - 1 ? 3 : channels.size - 3 * page
			const svgAspectRatio = channelsOnPage <= 2 ? 1282 / 180.5 : 1282 / 114.5
			const backgroundAspectRatio = channelsOnPage <= 2 ? 1282 / 212 : 1282 / 147
			const smallChart = channelsOnPage > 2

			const svgWidth = samplingRate * 10
			const svgHeight = svgWidth / svgAspectRatio

			// generate svg using d3.js
			const xScale = d3
				.scaleLinear()
				.domain([0, svgWidth - 1])
				.range([0, svgWidth])

			const yScale = d3
				.scaleLinear()
				.domain([0, 4095])
				.range([svgHeight, 0])

			// pdf.rect(
			// 	DOCUMENT_MARGIN,
			// 	DOCUMENT_MARGIN,
			// 	DOCUMENT_WIDTH - DOCUMENT_MARGIN * 2,
			// 	DOCUMENT_HEIGHT - DOCUMENT_MARGIN * 2
			// )

			// Header with logo and summary
			await addSvgToPDF(
				pdf,
				"/static/scientisst-break.svg",
				DOCUMENT_MARGIN,
				DOCUMENT_MARGIN,
				25,
				25 / (350 / 111.79),
				DOCUMENT_DPI
			)

			pdf.setTextColor(...TEXT_PRIMARY)
			pdf.setFont("Lexend", "semibold")
			pdf.setFontSize(11.5)
			pdf.text(
				"Acquisition Summary",
				DOCUMENT_WIDTH - DOCUMENT_MARGIN,
				DOCUMENT_MARGIN,
				{
					align: "right",
					baseline: "top"
				}
			)
			pdf.setFont("Lexend", "regular")
			pdf.setFontSize(6)
			pdf.text(
				"Ten-second preview automatically generated\n by SENSE WEB at sense.scientisst.com",
				DOCUMENT_WIDTH - DOCUMENT_MARGIN,
				DOCUMENT_MARGIN + 5,
				{
					align: "right",
					baseline: "top"
				}
			)

			// Fields titles
			pdf.setFont("Lexend", "regular")
			pdf.setFontSize(6)
			pdf.setTextColor(...TEXT_SECONDARY)
			pdf.text("DEVICE", DOCUMENT_MARGIN, DOCUMENT_MARGIN + 15, {
				align: "left",
				baseline: "top"
			})
			pdf.text(
				"SAMPLING FREQUENCY",
				DOCUMENT_MARGIN + 35,
				DOCUMENT_MARGIN + 15,
				{
					align: "left",
					baseline: "top"
				}
			)
			pdf.text("DATE", DOCUMENT_MARGIN + 75, DOCUMENT_MARGIN + 15, {
				align: "left",
				baseline: "top"
			})
			pdf.text("TIME", DOCUMENT_MARGIN + 105, DOCUMENT_MARGIN + 15, {
				align: "left",
				baseline: "top"
			})
			pdf.text(
				"TECHNICIAN",
				DOCUMENT_MARGIN + 135,
				DOCUMENT_MARGIN + 15,
				{
					align: "left",
					baseline: "top"
				}
			)
			pdf.text(
				"PATIENT/CODE",
				DOCUMENT_MARGIN + 175,
				DOCUMENT_MARGIN + 15,
				{
					align: "left",
					baseline: "top"
				}
			)

			// Field values
			pdf.setFontSize(8)
			pdf.setFont("Lexend", "regular")
			pdf.setTextColor(...TEXT_PRIMARY)
			pdf.text("ScientISST CORE", DOCUMENT_MARGIN, DOCUMENT_MARGIN + 18, {
				align: "left",
				baseline: "top"
			})
			pdf.text(
				`${Math.round(samplingRate)} Hz`,
				DOCUMENT_MARGIN + 35,
				DOCUMENT_MARGIN + 18,
				{
					align: "left",
					baseline: "top"
				}
			)
			pdf.text(
				`${new Date(timestamp).toLocaleDateString("en-UK", {
					year: "numeric",
					month: "short",
					day: "numeric"
				})}`,
				DOCUMENT_MARGIN + 75,
				DOCUMENT_MARGIN + 18,
				{
					align: "left",
					baseline: "top"
				}
			)
			pdf.text(
				new Date(timestamp).toLocaleTimeString("en-US", {
					hour: "2-digit",
					minute: "2-digit"
				}),
				DOCUMENT_MARGIN + 105,
				DOCUMENT_MARGIN + 18,
				{
					align: "left",
					baseline: "top"
				}
			)
			pdf.text(
				"Someone's Name",
				DOCUMENT_MARGIN + 135,
				DOCUMENT_MARGIN + 18,
				{
					align: "left",
					baseline: "top"
				}
			)
			pdf.text(
				"Someone's Name or Code",
				DOCUMENT_MARGIN + 175,
				DOCUMENT_MARGIN + 18,
				{
					align: "left",
					baseline: "top"
				}
			)

			let offset = 27
			for (
				let channel = page * 3;
				channel < page * 3 + channelsOnPage;
				channel++
			) {
				pdf.setFont("Lexend", "regular")
				pdf.setFontSize(6)
				pdf.setTextColor(...TEXT_SECONDARY)
				pdf.text(
					storedChannelNames[channels[channel]] ?? channels[channel],
					DOCUMENT_MARGIN,
					DOCUMENT_MARGIN + offset,
					{
						align: "left",
						baseline: "top"
					}
				)

				await addSvgToPDF(
					pdf,
					smallChart
						? "/static/axis_lower.svg"
						: "/static/axis_higher.svg",
					DOCUMENT_MARGIN,
					DOCUMENT_MARGIN + offset + 3.5,
					DOCUMENT_WIDTH - DOCUMENT_MARGIN * 2,
					(DOCUMENT_WIDTH - DOCUMENT_MARGIN * 2) /
						backgroundAspectRatio,
					DOCUMENT_DPI
				)
				// Draw x-axis
				pdf.setFont("Lexend", "light")
				pdf.setFontSize(6)
				pdf.setTextColor(...TEXT_SECONDARY)

				for (let i = 0; i < 10; i++) {
					pdf.text(
						i.toString(),
						DOCUMENT_MARGIN +
							((DOCUMENT_WIDTH - DOCUMENT_MARGIN * 2) * i) / 10,
						DOCUMENT_MARGIN + offset + (smallChart ? 32.5 : 45.5),
						{
							align: i === 0 ? "left" : "center",
							baseline: "top"
						}
					)
				}

				pdf.text(
					"SECONDS",
					DOCUMENT_WIDTH - DOCUMENT_MARGIN,
					DOCUMENT_MARGIN + offset + (smallChart ? 32.5 : 45.5),
					{
						align: "right",
						baseline: "top"
					}
				)

				const svg = d3
					.create("svg")
					.attr("viewBox", [0, 0, svgWidth, svgHeight])
					.attr("font-family", "Imagine")

				const data = frames
					.slice(-svgWidth)
					.map((frame, i) => [
						i,
						frame.channels[channels[channel]]
					]) as [number, number][]

				svg.append("path")
					.datum(data)
					.attr("fill", "none")
					.attr("stroke", "red")
					.attr("stroke-width", 10)
					.attr(
						"d",
						d3
							.line()
							.x(d => xScale(d[0]))
							.y(d => yScale(d[1]))
					)

				// Draw annotations
				svg.selectAll('.annotations')
					.data(annotations)
					.enter()
					.append('line')
						.attr('class', 'vertical-line')
						.attr('x1', d => d.pos)
						.attr('y1', 0)
						.attr('x2', d => d.pos)
						.attr('y2', svgHeight)
						.attr('stroke', d => d.color)
						.attr('stroke-width', 2);

				svg.selectAll('.intervals')
					.data(intervals)
					.enter()
					.append('line')
						.attr('class', 'vertical-line')
						.attr('x1', d => d.start)
						.attr('y1', 0)
						.attr('x2', d => d.start)
						.attr('y2', svgHeight)
						.attr('stroke', d => d.color)
						.attr('stroke-width', 2)

				svg.selectAll('.intervals')
					.data(intervals)
					.enter()
					.append('line')
						.attr('class', 'vertical-line')
						.attr('x1', d => d.end)
						.attr('y1', 0)
						.attr('x2', d => d.end)
						.attr('y2', svgHeight)
						.attr('stroke', d => d.color)
						.attr('stroke-width', 2)

				svg.selectAll('.intervals')
					.data(intervals)
					.enter()
					.append('rect')
						.attr('x', d => d.start)
						.attr('y', 0)
						.attr('width', d => d.end - d.start)
						.attr('height', svgHeight)
						.attr('fill', d => d.color) //falta meter a cor transparente
						.attr('opacity', 0.1);

				await addSvgToPDF(
					pdf,
					svg.node(),
					DOCUMENT_MARGIN,
					DOCUMENT_MARGIN +
						offset +
						3.5 +
						(DOCUMENT_WIDTH - DOCUMENT_MARGIN * 2) / (1282 / 16.25),
					DOCUMENT_WIDTH - DOCUMENT_MARGIN * 2,
					(DOCUMENT_WIDTH - DOCUMENT_MARGIN * 2) / svgAspectRatio,
					DOCUMENT_DPI
				)

				svg.remove()

				if (!smallChart) {
					offset += 57
				} else {
					offset += 37
				}
			}

			pdf.setFont("Lexend", "regular")
			pdf.setFontSize(6)
			pdf.setTextColor(...TEXT_SECONDARY)
			pdf.text("OBSERVATIONS", DOCUMENT_MARGIN, DOCUMENT_MARGIN + 140, {
				align: "left",
				baseline: "top"
			})

			const observations =
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum reprehenderit fuga, a, culpa consequatur dolorem molestias magni vero maxime quia suscipit ipsam debitis. Enim alias neque blanditiis soluta nisi odio doloribus ut sit, reiciendis esse, reprehenderit eius hic, repudiandae adipisci natus expedita fuga ad asperiores. Aliquid vero labore quaerat! Consectetur quaerat veritatis, placeat deserunt ullam neque sequi fuga quasi nulla tempora iusto aut? Perferendis id repellat in deleniti molestias. Molestiae alias quo soluta libero qui iste, sed eum magni non voluptas beatae atque dicta accusamus totam. Id ullam reprehenderit, fugit laborum odio dignissimos vel obcaecati minus, qui eos eum provident!"
			const d_obs = pdf.splitTextToSize(
				observations,
				DOCUMENT_WIDTH - DOCUMENT_MARGIN * 2
			)

			pdf.setTextColor(...TEXT_PRIMARY)
			pdf.text(d_obs, DOCUMENT_MARGIN, DOCUMENT_MARGIN + 140 + 3.5, {
				align: "left",
				baseline: "top"
			})

			// Notices
			pdf.setFont("Lexend", "light")
			pdf.setFontSize(6)
			pdf.setTextColor(...TEXT_SECONDARY)
			pdf.text(
				[
					"(C) 2023 ScientISST",
					"Designed by ScientISST at Instituto de Telecomunicações, Lisbon, Portugal"
				],
				DOCUMENT_MARGIN,
				DOCUMENT_HEIGHT - DOCUMENT_MARGIN - 2.5,
				{
					align: "left",
					baseline: "bottom"
				}
			)
			pdf.text(
				[
					"ScientISST hardware and software are not medical devices certified for diagnosis or treatment.",
					"This is PDF Summary is provided to you as is only for research and educational purposes."
				],
				DOCUMENT_WIDTH - DOCUMENT_MARGIN,
				DOCUMENT_HEIGHT - DOCUMENT_MARGIN - 2.5,
				{
					align: "right",
					baseline: "bottom"
				}
			)
		}

		const timestampISO = new Date(timestamp).toISOString()
		pdf.save(`${timestampISO}.pdf`)
	}, [])

	return (
		<SenseLayout
			title="Summary"
			returnHref="/live"
			className="flex w-[480px] flex-col items-center justify-center gap-8 py-8 px-8 sm:w-[640px]"
		>
			<span>End of acquisition!</span>

			<div className="justify-cenPDF flex flex-row gap-4">

				<TextButton
					size="base"
					className="flex-grow"
					onClick={convertToCSV}
				>
					Download as CSV
				</TextButton>

				<TextButton
					size="base"
					className="flex-grow"
					onClick={convertToPDF}
				>
					Download as PDF
				</TextButton>

			</div>
		</SenseLayout>
	)
}

export default Page
