import { Transport } from "../Transport"
import { TransportException } from "./TransportException"

export class ConnectionLostException extends TransportException {
	constructor(transport: Transport) {
		super(transport, "Connection lost")
	}
}
