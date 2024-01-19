import { Transport } from "../Transport"

export class TransportException extends Error {
	public readonly transport: Transport

	constructor(transport: Transport, message: string) {
		super(message)
		this.transport = transport
	}

	public getTransport(): Transport {
		return this.transport
	}
}
