/**
 * A frame is a collection of channels that are sent in a sample.
 */
export abstract class Frame {
	/**
	 * The channels in the frame.
	 */
	readonly channels: Record<string, number>
	/**
	 * The sequence number of the frame.
	 */
	readonly sequence: number

	/**
	 * Serializes the frame to a UTF-16 string.
	 */
	abstract serialize(): string

	/**
	 * Deserializes the frame from a UTF-16 string.
	 * @param serialized The serialized frame.
	 * @param channels The channels to deserialize.
	 * @returns The deserialized frame and the remaining string.
	 */
	static deserialize(
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		serialized: string,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		channels: Set<string>
	): [Frame, string] {
		throw new Error("Not implemented")
	}

	/**
	 * Deserializes all frames from a UTF-16 string.
	 * @param serialized The serialized frames.
	 * @param channels The channels to deserialize.
	 * @returns The deserialized frames.
	 */
	static deserializeAll(serialized: string, channels: Set<string>): Frame[] {
		const frames: Frame[] = []
		while (serialized.length > 0) {
			const [frame, remaining] = this.deserialize(serialized, channels)
			frames.push(frame)
			serialized = remaining
		}
		return frames
	}
}
