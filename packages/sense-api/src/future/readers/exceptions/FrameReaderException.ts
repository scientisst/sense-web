import { FrameReader } from "../FrameReader"

export class FrameReaderException extends Error {
	public readonly frameReader: FrameReader

	constructor(frameReader: FrameReader, message: string) {
		super(message)
		this.frameReader = frameReader
	}

	public getFrameReader(): FrameReader {
		return this.frameReader
	}
}
