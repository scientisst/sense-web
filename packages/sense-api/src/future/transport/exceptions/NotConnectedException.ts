import { TransportException } from "."
import { Transport } from "../Transport"

export class NotConnectedException extends TransportException {
	constructor(transport: Transport) {
		super(transport, "Not connected")
	}
}
