import { FrameReader } from "../FrameReader"
import { FrameReaderException } from "./FrameReaderException"

export class TooManyFramesLostException extends FrameReaderException {
	public readonly framesLost: number

	constructor(frameReader: FrameReader) {
		super(frameReader, "Too many frames lost")
	}

	public getFramesLost(): number {
		return this.framesLost
	}
}
