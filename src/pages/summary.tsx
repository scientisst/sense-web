import { useCallback } from "react"

import { TextButton } from "@scientisst/react-ui/components/inputs"
import {
	CHANNEL,
	CHANNEL_SIZE,
	ScientISSTAdcCharacteristics,
	utf16ToFrames
} from "@scientisst/sense/future"
import { Canvg } from "canvg"
import * as d3 from "d3"
import FileSaver from "file-saver"
import jsPDF from "jspdf"
import JSZip from "jszip"

import SenseLayout from "../components/layout/SenseLayout"

const imagineFontBase64 =
	"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AEMBpAIIEgYAJAAA//8AYgAABHwGihAnAEEAAALaEgYAJAAA//8AYgAABHwG9BAnAGEAAAOsEgYAJAAA//8AYgAABHwGIhAnAEMBpAIIEgYAKAAA//8AYgAABHwGihAnAEEAAALaEgYAKAAA//8AYgAAATQGIhAnAEMAAAIIEgYALAAA///+vgAAAtgGihAnAEH+XALaEgYALAAA//8AYgAABHwG9BAnAGEAAAOsEgYAMQAA//8AYgAABHwGIhAnAEMBpAIIEgYAMgAA//8AYgAABHwGihAnAEEAAALaEgYAMgAA//8AYgAABHwG9BAnAGEAAAOsEgYAMgAA//8AYgAABHwGIhAnAEMBpAIIEgYAOAAA//8AYgAABHwGihAnAEEAAALaEgYAOAAA//8AYgAABHwGIhAnAEMBpAIIEgYARAAA//8AYgAABHwGihAnAEEAAALaEgYARAAA//8AYgAABHwG9BAnAGEAAAOsEgYARAAA//8AYgAABHwGIhAnAEMBpAIIEgYASAAA//8AYgAABHwGihAnAEEAAALaEgYASAAA//8AYgAAATQGIhAnAEMAAAIIEgYATAAA///+vgAAAtgGihAnAEH+XALaEgYATAAA//8AYgAABHwG9BAnAGEAAAOsEgYAUQAA//8AYgAABHwGIhAnAEMBpAIIEgYAUgAA//8AYgAABHwGihAnAEEAAALaEgYAUgAA//8AYgAABHwG9BAnAGEAAAOsEgYAUgAA//8AYgAABHwGIhAnAEMBpAIIEgYAWAAA//8AYgAABHwGihAnAEEAAALaEgYAWAAA//8AYgAACWgEGhAnACgE7AAAEAYAMgAA//8AYgAACWgEGhAnAEgE7AAAEAYAUgAA//8AYgGkBHwDsBIGAEEAAP///fIAZAIMAtoQBwBh/ZD/kgAAAAEAYgGkAtgCdgADACIAsAAvsQED6bEBA+kBsAQvsQABK7QDCAAHBCuxBQErADAxEzUhFWICdgGk0tIAAAEAYgGkAtgCdgADACIAsAAvsQED6bEBA+kBsAQvsQABK7QDCAAHBCuxBQErADAxEzUhFWICdgGk0tIAAAEAYgGkAtgCdgADACIAsAAvsQED6bEBA+kBsAQvsQABK7QDCAAHBCuxBQErADAxEzUhFWICdgGk0tIAAAEAYgGkAtgCdgADACIAsAAvsQED6bEBA+kBsAQvsQABK7QDCAAHBCuxBQErADAxEzUhFWICdgGk0tIAAAEAYgGkBiACdgADABcAsAAvsQED6bEBA+kBsAQvsQUBKwAwMRM1IRViBb4BpNLSAAEAYgJ2ATQEGgADACMAsgECACu0AAUACgQrAbAEL7AA1rEDBumxAwbpsQUBKwAwMRMRMxFi0gJ2AaT+XAAAAAABAGICdgE0BBoAAwAjALIBAgArtAAFAAoEKwGwBC+wANaxAwbpsQMG6bEFASsAMDETETMRYtICdgGk/lwAAAAAAgBiAnYC2AQaAAMABwA8ALIBAgArsAUztAAFAAoEK7AEMrIBAgArtAAFAAoEKwGwCC+wANaxAwbpsAMQsQQBK7EHBumxCQErADAxExEzETMRMxFi0tLSAnYBpP5cAaT+XAAAAAIAYgJ2AtgEGgADAAcAPACyAQIAK7AFM7QABQAKBCuwBDKyAQIAK7QABQAKBCsBsAgvsADWsQMG6bADELEEASuxBwbpsQkBKwAwMRMRMxEzETMRYtLS0gJ2AaT+XAGk/lwAAP//AGIAAAR8ANIQJwARA0gAABAnABEBpAAAEAYAEQAA//8AYgAAAnAEGhIGAB8AAP//AGIAAAJwBBoSBgAhAAD//wBiAAAJaAQaECcAMATsAAAQBgA3AAAAAQAAAAAEHwQfAAMAABEhESEEH/vhBB/74QAA//8AYgAABiAEGhAnAEwE7AAAEAYASQAA//8AYgAACWgEGhAnAE8E7AAAEAYASQAA//8AYgAACwwEGhAnAEwJ2AAAECcASQTsAAAQBgBJAAD//wBiAAAOVAQaECcATwnYAAAQJwBJBOwAABAGAEkAAAAAABMA6gABAAAAAAATACUAAAADAAEECQAAADAAJQADAAEECQABABgBdwADAAEECQACAA4AVQADAAEECQADADIAYwADAAEECQAEABgBdwADAAEECQAFAC4AlQADAAEECQAGABgCIQADAAEECQAHAD4AwwADAAEECQAIAD4BAQADAAEECQAJAAoDPwADAAEECQAKAF4BPwADAAEECQALAFwBnQADAAEECQAMAEAB+QADAAEECQANAHQCOQADAAEECQAOAGICrQADAAEECQASAAADDwADAAEECQATAEoDDwADAAEECQDIAG4DWU1hZGUgYnkgSm9va2kuZGUgMjAwOCByZWRlc2lnbmVkIDIwMTIAQwBvAHAAeQByAGkAZwBoAHQAIABqAG8AbwBrAGkALgBkAGUAIAAyADAAMAAxADIAUgBlAGcAdQBsAGEAcgBJAG0AYQBnAGkAbgBlACAARgBvAG4AdAA6ACAAVgBlAHIAcwBpAG8AbgAgADMALgAwAFYAZQByAHMAaQBvAG4AIAAzAC4AMAAgAEEAcAByAGkAbAAsACAAMgAwADEAMgBBAGwAbAAgAFIAaQBnAGgAdABzACAAcgBlAHMAZQByAHYAZQBkACAAdABvACAAagBvAG8AawBpAC4AZABlAEcAZQB0ACAAYwBvAG0AbQBlAHIAYwBpAGEAbAAgAGwAaQBjAGUAbgBzAGUAIABAAG0AeQBmAG8AbgB0AHMASQBtAGEAZwBpAG4AZQAgAEMAdQBiAGUAIABpAHMAIABQAGEAcgB0ACAAbwBmACAAdABoAGUAIABJAG0AYQBnAGkAbgBlACAARgBvAG4AdAAgAEYAYQBtAGkAbAB5AGgAdAB0AHAAOgAvAC8AdwB3AHcALgBtAHkAZgBvAG4AdABzAC4AYwBvAG0ALwBmAG8AdQBuAGQAcgB5AC8ASgBvAGMAaABlAG4AXwBJAHMAZQBuAHMAZQBlAC8AaAB0AHQAcAA6AC8ALwB3AHcAdwAuAGoAbwBvAGsAaQAuAGQAZQAvAGkAbQBhAGcAaQBuAGUALQBmAG8AbgB0AEMAcgBlAGEAdABpAHYAZQAgAEMAbwBtAG0AbwBuAHMAIABBAHQAdAByAGkAYgB1AHQAaQBvAG4AIABOAG8AbgAtAGMAbwBtAG0AZQByAGMAaQBhAGwAIABOAG8AIABEAGUAcgBpAHYAYQB0AGkAdgBlAHMAaAB0AHQAcAA6AC8ALwBjAHIAZQBhAHQAaQB2AGUAYwBvAG0AbQBvAG4AcwAuAG8AcgBnAC8AbABpAGMAZQBuAHMAZQBzAC8AYgB5AC0AbgBjAC0AbgBkAC8AMwAuADAALwBJAG0AYQBnAGkAbgBlACAARgBvAG4AdAAgAGkAcwAgAG0AYQBkAGUAIABiAHkAIABKAG8AbwBrAGkALgBkAGUAIAAyADAAMQAyAFQAaABpAHMAIABmAG8AbgB0ACAAdwBhAHMAIABnAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAHQAaABlACAARgBvAG4AdAAgAFMAcQB1AGkAcgByAGUAbAAgAEcAZQBuAGUAcgBhAHQAbwByAC4AAAAAAgAAAAAAAADFAGYAAAAAAAAAAAAAAAAAAAAAAAAAAACmAAAAAQACAAMABAAFAAYABwAIAAkACgALAAwADQAOAA8AEAARABIAEwAUABUAFgAXABgAGQAaABsAHAAdAB4AHwAgACEAIgAjACQAJQAmACcAKAApACoAKwAsAC0ALgAvADAAMQAyADMANAA1ADYANwA4ADkAOgA7ADwAPQA+AD8AQABBAEIAQwBEAEUARgBHAEgASQBKAEsATABNAE4ATwBQAFEAUgBTAFQAVQBWAFcAWABZAFoAWwBcAF0AXgBfAGAAYQECAJ0BAwEEAQUBBgCeAK0AxwCuAMsAyADPAM0AZgDTANEArwDWANUAagBrAG0AcQByAHUAdgB4AHoAewB9AH8AgACwALEA2ADZAQcBCAEJAQoBCwEMAQ0BDgEPARABEQESARMBFACyALMAtgC3ALQAtQCrARUAvgC/ARYAjAEXARgBGQEaARsHdW5pMDBBMAd1bmkwMEFEB3VuaTAwQjIHdW5pMDBCMwd1bmkwMEI5B3VuaTIwMDAHdW5pMjAwMQd1bmkyMDAyB3VuaTIwMDMHdW5pMjAwNAd1bmkyMDA1B3VuaTIwMDYHdW5pMjAwNwd1bmkyMDA4B3VuaTIwMDkHdW5pMjAwQQd1bmkyMDEwB3VuaTIwMTEKZmlndXJlZGFzaAd1bmkyMDJGB3VuaTIwNUYHdW5pRTAwMAd1bmlGQjAxB3VuaUZCMDIHdW5pRkIwMwd1bmlGQjA0AAAAAAEAAf//AA8AAAABAAAAAMmJbzEAAAAAy6N1mQAAAADLo3WaAAEAAAAOAAAAGAAAAAAAAgABAAEApQABAAQAAAACAAA="

const Page = () => {
	const convertToCSV = useCallback(() => {
		const adcChars = ScientISSTAdcCharacteristics.fromJSON(
			localStorage.getItem("aq_adcChars")
		)

		const channels: CHANNEL[] = JSON.parse(
			localStorage.getItem("aq_channels")
		)

		const channelNames: string[] = channels.map(channel => CHANNEL[channel])

		const segments: number = JSON.parse(localStorage.getItem("aq_segments"))

		const zip = new JSZip()

		let firstTimestamp = 0

		for (let i = 1; i <= segments; i++) {
			const fileContent = []
			const frames = utf16ToFrames(
				localStorage.getItem(`aq_seg${i}`),
				channels,
				adcChars
			)

			if (frames.length === 0) {
				continue
			}

			const resolutionBits = []
			for (let j = 0; j < channels.length; j++) {
				resolutionBits.push(CHANNEL_SIZE[channels[j]])
			}

			const timestamp = new Date(
				JSON.parse(localStorage.getItem(`aq_seg${i}time`) ?? "0")
			)

			if (firstTimestamp === 0) {
				firstTimestamp = timestamp.getTime()
			}

			const metadata = {
				Device: "ScientISST Sense",
				Channels: channelNames,
				"Sampling rate (Hz)": JSON.parse(
					localStorage.getItem("aq_sampleRate")
				),
				"ISO 8601": timestamp.toISOString(),
				Timestamp: timestamp.getTime(),
				"Resolution (bits)": resolutionBits
			}

			fileContent.push("#" + JSON.stringify(metadata, null, null))

			// append header
			fileContent.push("#NSeq\t" + channelNames.join("\t"))

			// append data
			for (let j = 0; j < frames.length; j++) {
				const frameContent = []
				frameContent.push(frames[j].sequence)

				let ignore = false
				for (let k = 0; k < channels.length; k++) {
					if (frames[j].analog[channels[k]] === null) {
						ignore = true
						break
					}

					frameContent.push(frames[j].analog[channels[k]])
				}

				if (ignore) {
					continue
				}

				fileContent.push(frameContent.join("\t"))
			}

			zip.file(`segment_${i}.csv`, fileContent.join("\n"))
		}

		if (firstTimestamp === 0) {
			firstTimestamp = new Date().getTime()
		}

		const timestampISO = new Date(firstTimestamp).toISOString()

		zip.generateAsync({ type: "blob" }).then(content => {
			FileSaver.saveAs(content, `${timestampISO}.zip`)
		})
	}, [])

	const convertToPDF = useCallback(async () => {
		const doc = new jsPDF("landscape", "px", "a4", true)

		doc.addFileToVFS("Imagine.ttf", imagineFontBase64)
		doc.addFont("Imagine.ttf", "Imagine", "normal")

		const adcChars = ScientISSTAdcCharacteristics.fromJSON(
			localStorage.getItem("aq_adcChars")
		)

		const channels: CHANNEL[] = JSON.parse(
			localStorage.getItem("aq_channels")
		)

		const channelNames: string[] = channels.map(channel => CHANNEL[channel])
		const segments: number = JSON.parse(localStorage.getItem("aq_segments"))

		const segment = segments

		const frames = utf16ToFrames(
			localStorage.getItem(`aq_seg${segment}`),
			channels,
			adcChars
		)

		if (frames.length === 0) {
			// TODO: improve behaviour
			throw new Error("No frames found")
		}

		const timestamp = new Date(
			JSON.parse(localStorage.getItem(`aq_seg${segment}time`) ?? "0")
		)

		const samplingRate = JSON.parse(localStorage.getItem("aq_sampleRate"))

		// get the last 10 seconds of data
		const last10Seconds = frames.slice(-samplingRate * 10)

		// generate svg using d3.js
		const svg = d3
			.create("svg")
			.attr("viewBox", [0, 0, 800, 600])
			.attr("font-family", "Imagine")

		const x = d3
			.scaleLinear()
			.domain([0, last10Seconds.length - 1])
			.range([10, 800 - 10])

		const y = d3
			.scaleLinear()
			.domain([0, 4096])
			.range([600 - 10, 10])

		// data for first channel
		const data1 = last10Seconds.map((frame, i) => [
			i,
			frame.analog[channels[0]]
		]) as [number, number][]

		// draw first channel
		svg.append("path")
			.datum(data1)
			.attr("fill", "none")
			.attr("stroke", "red")
			.attr("stroke-width", 2)
			.attr(
				"d",
				d3
					.line()
					.x(d => x(d[0]))
					.y(d => y(d[1]))
			)

		// convert svg to string
		const svgString = new XMLSerializer().serializeToString(svg.node())

		const canvas = document.createElement("canvas")
		// set canvas size to svg size
		canvas.width = 800
		canvas.height = 600
		const context = canvas.getContext("2d")

		context.clearRect(0, 0, canvas.width, canvas.height)
		const v = Canvg.fromString(context, svgString)
		await v.render()

		const imgData = canvas.toDataURL("image/png")
		doc.addImage(imgData, "PNG", 0, 0, 1122.52, 222.75)

		console.log(svgString)

		doc.setFontSize(10)
		doc.text("Channel 1", 0, 100, { align: "left", baseline: "top" })

		const timestampISO = new Date(timestamp).toISOString()
		doc.save(`${timestampISO}.pdf`)
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
