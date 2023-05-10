import { Transport } from "../Transport"
import { TransportException } from "./TransportException"

export class AlreadyConnectedException extends TransportException {
	constructor(transport: Transport) {
		super(transport, "Already connected")
	}
}
