import { SemVer } from "semver"

import { ScientISSTAdcCharacteristics } from "../adcCharacteristics"
import { Frame } from "../frames/Frame"

export enum DEVICE_STATUS {
	DISCONNECTED,
	CONNECTING,
	IDLE,
	ACQUIRING
}

export interface Device {
	connect(): Promise<void>
	disconnect(): Promise<void>
	getStatus(): DEVICE_STATUS
	isConnecting(): boolean
	isConnected(): boolean
	isIdle(): boolean
	isAcquiring(): boolean
	startAcquisition(): Promise<void>
	stopAcquisition(): Promise<void>
	onFrames(frames: Frame[]): void | Promise<void>
	onError(error: unknown): void | Promise<void>
	getFirmwareVersion(): SemVer | null
	getAdcCharacteristics(): ScientISSTAdcCharacteristics | null
	getChannels(): string[]
	getSamplingRate(): number
}
