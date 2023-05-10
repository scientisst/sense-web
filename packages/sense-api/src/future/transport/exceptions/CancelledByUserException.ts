import { Transport } from "../Transport"
import { TransportException } from "./TransportException"

export class CancelledByUserException extends TransportException {
	constructor(transport: Transport) {
		super(transport, "Action was cancelled by the user")
	}
}
