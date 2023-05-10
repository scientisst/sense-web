import { Frame, MakerFrame } from "../frames"
import { Transport } from "../transport"
import { FrameReader } from "./FrameReader"

/**
 * A MakerFrameReader is responsible for reading and validating frames from a
 * stream using the Maker protocol.
 */
export class MakerFrameReader implements FrameReader {
	private static readonly FRAME_SEPARATOR = /[ ,\t]+/
	private readonly transport: Transport
	private virtualSequence = 0

	constructor(transport: Transport) {
		this.transport = transport
	}

	/**
	 * Reads a string from the stream.
	 * @param timeoutMilliseconds The timeout in milliseconds.
	 * @returns The string read.
	 */
	private async readString(timeoutMilliseconds: number): Promise<string> {
		let byte = (await this.transport.read(1, timeoutMilliseconds))[0]
		let string = ""

		// Read until we hit \n.
		while (byte != 0x0a) {
			string += String.fromCharCode(byte)
			byte = (await this.transport.read(1, timeoutMilliseconds))[0]
		}

		return string
	}

	public async readFrames(
		frames: number,
		timeoutMilliseconds: number
	): Promise<Array<Frame | null>> {
		const result: Array<Frame | null> = []

		while (result.length < frames) {
			const frameString = await this.readString(timeoutMilliseconds)
			const values = frameString
				.trim()
				.split(MakerFrameReader.FRAME_SEPARATOR)
				.map(value => parseInt(value))

			const channels: Record<string, number> = {}
			for (let i = 0; i < values.length; i++) {
				channels[`A${i}`] = values[i]
			}

			result.push(new MakerFrame(channels, this.virtualSequence++))
		}

		return result
	}
}
