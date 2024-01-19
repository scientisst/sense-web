import { Transport } from "../Transport"
import { TransportException } from "./TransportException"

export class PermissionDeniedException extends TransportException {
	constructor(transport: Transport) {
		super(transport, "Permission denied")
	}
}
