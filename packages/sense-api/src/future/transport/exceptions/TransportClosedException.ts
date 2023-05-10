import { Transport } from "../Transport"
import { TransportException } from "./TransportException"

export class TransportClosedException extends TransportException {
	constructor(transport: Transport) {
		super(transport, "Transport closed")
	}
}
