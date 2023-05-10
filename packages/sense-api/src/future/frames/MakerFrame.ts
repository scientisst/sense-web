import { Frame } from "./Frame"

export class MakerFrame extends Frame {
	readonly channels: Record<string, number>
	readonly sequence: number

	constructor(channels: Record<string, number>, sequence: number) {
		super()
		this.channels = channels
		this.sequence = sequence
	}

	static deserialize(
		serialized: string,
		channels: Set<string>
	): [Frame, string] {
		const channelList = Array.from(channels).sort()
		const serializedFrame = serialized.slice(
			0,
			(channelList.length + 1) * 3
		)

		if (serializedFrame.length !== (channelList.length + 1) * 3) {
			throw new Error(
				"When deserializing a MakerFrame, the number of values must match the number of channels"
			)
		}

		const decoded: Record<string, number> = {}
		const sequence =
			serializedFrame.charCodeAt(0) +
			serializedFrame.charCodeAt(1) * 2 ** 16 +
			serializedFrame.charCodeAt(2) * 2 ** 32

		for (let i = 1; i <= channelList.length; i++) {
			decoded[channelList[i - 1]] =
				serializedFrame.charCodeAt(i * 3) +
				serializedFrame.charCodeAt(i * 3 + 1) * 2 ** 16 +
				serializedFrame.charCodeAt(i * 3 + 2) * 2 ** 32
		}

		return [
			new MakerFrame(decoded, sequence),
			serialized.slice((channelList.length + 1) * 3)
		]
	}

	serialize(): string {
		// Every number is encoded as a 48-bit integer.
		// The first number is the sequence number.
		// The remaining numbers are the channel values ordered by channel name.
		let serialized =
			String.fromCharCode(this.sequence & 0xffff) +
			String.fromCharCode((this.sequence / 2 ** 16) & 0xffff) +
			String.fromCharCode((this.sequence / 2 ** 32) & 0xffff)

		for (const channel of Object.keys(this.channels).sort()) {
			const value = this.channels[channel]
			serialized +=
				String.fromCharCode(value & 0xffff) +
				String.fromCharCode((value / 2 ** 16) & 0xffff) +
				String.fromCharCode((value / 2 ** 32) & 0xffff)
		}

		return serialized
	}
}
