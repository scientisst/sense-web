import { Device } from "../Device"

export class DeviceException extends Error {
	public readonly device: Device

	constructor(device: Device, message: string) {
		super(message)
		this.device = device
	}

	public getDevice(): Device {
		return this.device
	}
}
