import { SCIENTISST_CHANNEL } from "../devices"
import { Frame } from "./Frame"

export class ScientISSTFrame extends Frame {
	public static readonly CHANNEL_SIZES: Record<SCIENTISST_CHANNEL, number> = {
		AI1: 12,
		AI2: 12,
		AI3: 12,
		AI4: 12,
		AI5: 12,
		AI6: 12,
		AX1: 24,
		AX2: 24,
		I1: 1,
		I2: 1,
		O1: 1,
		O2: 1
	}
	public static readonly SEQUENCE_SIZE = 12

	readonly channels: Record<string, number>
	readonly sequence: number

	constructor(
		channels: Partial<Record<SCIENTISST_CHANNEL, number>>,
		sequence: number
	) {
		super()
		this.channels = channels
		this.sequence = sequence
	}

	static deserialize(
		serialized: string,
		channels: Set<string>
	): [Frame, string] {
		const channelNames = Array.from(channels).sort()

		// Size in number of UTF-16 characters
		const size = Math.ceil(
			channelNames.reduce(
				(sum, channel) => sum + ScientISSTFrame.CHANNEL_SIZES[channel],
				ScientISSTFrame.SEQUENCE_SIZE
			) / 16
		)

		const channelValues: Record<string, number> = {}
		let offset = 0
		let charOffset = 0
		let sequence = 0

		for (let i = -1; i < channelNames.length; i++) {
			const channel = channelNames[i]
			const valueSize =
				i === -1
					? ScientISSTFrame.SEQUENCE_SIZE
					: ScientISSTFrame.CHANNEL_SIZES[channel]
			let valueOffset = 0
			let value = 0

			while (valueOffset < valueSize) {
				const toRead = Math.min(
					16 - charOffset,
					valueSize - valueOffset
				)

				value +=
					((serialized.codePointAt(offset) / 2 ** charOffset) &
						(2 ** toRead - 1)) *
					2 ** valueOffset

				valueOffset += toRead
				charOffset = (charOffset + toRead) % 16

				if (charOffset === 0) {
					offset++
				}
			}

			if (i === -1) {
				sequence = value
			} else {
				channelValues[channel] = value
			}
		}

		return [
			new ScientISSTFrame(channelValues, sequence),
			serialized.slice(size)
		]
	}

	serialize(): string {
		const channelNames = Object.keys(this.channels).sort()
		let serialized = ""
		let offset = 0

		for (let i = -1; i < channelNames.length; i++) {
			const channel = channelNames[i]
			const value = i === -1 ? this.sequence : this.channels[channel]
			const valueSize =
				i === -1
					? ScientISSTFrame.SEQUENCE_SIZE
					: ScientISSTFrame.CHANNEL_SIZES[channel]
			let valueOffset = 0

			while (valueOffset < valueSize) {
				if (offset === 0) {
					serialized += String.fromCharCode(0x00)
				}

				const toWrite = Math.min(16 - offset, valueSize - valueOffset)

				serialized =
					serialized.slice(0, -1) +
					String.fromCharCode(
						serialized.codePointAt(serialized.length - 1) |
							(((value / 2 ** valueOffset) & (2 ** toWrite - 1)) *
								2 ** offset)
					)

				valueOffset += toWrite
				offset = (offset + toWrite) % 16
			}
		}

		return serialized
	}
}
