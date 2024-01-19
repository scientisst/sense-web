import { Device } from "../Device"
import { DeviceException } from "./DeviceException"

export class NotIdleException extends DeviceException {
	constructor(device: Device) {
		super(device, "Device needs to be idling to perform this action")
	}
}
