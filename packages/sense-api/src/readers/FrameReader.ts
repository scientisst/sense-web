import { Frame } from "../frames"

/**
 * A FrameReader is responsible for reading and validating frames from a stream.
 */
export interface FrameReader {
	/**
	 * Reads and validates frames from a stream.
	 * @param frames The number of frames to read.
	 * @param timeoutMilliseconds The timeout in milliseconds.
	 * @returns The frames read.
	 */
	readFrames(
		frames: number,
		timeoutMilliseconds: number
	): Promise<Array<Frame | null>>
}
