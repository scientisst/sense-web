import { Device } from "../Device"
import { DeviceException } from "./DeviceException"

export class NotAcquiringException extends DeviceException {
	constructor(device: Device) {
		super(device, "Device needs to be acquiring to perform this action")
	}
}
