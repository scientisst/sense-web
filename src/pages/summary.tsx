import { TextButton } from "@scientisst/react-ui/components/inputs"
import {
	CHANNEL,
	ScientISSTAdcCharacteristics,
	utf16ToFrames
} from "@scientisst/sense/future"
import FileSaver from "file-saver"
import JSZip from "jszip"

import SenseLayout from "../components/layout/SenseLayout"

const Page = () => {
	const convertToCSV = () => {
		const adcChars = ScientISSTAdcCharacteristics.fromJSON(
			localStorage.getItem("aq_adcChars")
		)

		const channels: CHANNEL[] = JSON.parse(
			localStorage.getItem("aq_channels")
		)

		const channelNames: string[] = channels.map(channel => CHANNEL[channel])

		const segments: number = JSON.parse(localStorage.getItem("aq_segments"))

		const zip = new JSZip()

		for (let i = 1; i <= segments; i++) {
			const fileContent = []
			const frames = utf16ToFrames(
				localStorage.getItem(`aq_seg${i}`),
				channels,
				adcChars
			)

			// append header
			fileContent.push("Sequence," + channelNames.join(","))

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

				fileContent.push(frameContent.join(","))
			}

			zip.file(`segment_${i}.csv`, fileContent.join("\n"))
		}

		zip.generateAsync({ type: "blob" }).then(content => {
			FileSaver.saveAs(content, "data.zip")
		})
	}

	return (
		<SenseLayout
			title="Summary"
			returnHref="/live"
			className="flex w-[480px] flex-col items-center justify-center gap-8 py-8 px-8 sm:w-[640px]"
		>
			<span>End of acquisition!</span>
			<TextButton
				size="base"
				className="flex-grow"
				onClick={convertToCSV}
			>
				Download as CSV
			</TextButton>
		</SenseLayout>
	)
}

export default Page
