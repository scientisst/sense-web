import { Transport } from "../Transport"
import { TransportException } from "./TransportException"

export class ConnectionFailedException extends TransportException {
	constructor(transport: Transport) {
		super(transport, "Connection failed")
	}
}
