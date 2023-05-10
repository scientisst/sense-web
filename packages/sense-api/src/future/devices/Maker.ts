import { SemVer } from "semver"

import { ScientISSTAdcCharacteristics } from "../adcCharacteristics"
import { Frame } from "../frames"
import { FrameReader, MakerFrameReader } from "../readers"
import { Transport, WebSerialTransport } from "../transport"
import { DEVICE_STATUS, Device } from "./Device"
import { NotAcquiringException, NotIdleException } from "./exceptions"

export class Maker implements Device {
	private readonly transport: Transport
	private status: DEVICE_STATUS = DEVICE_STATUS.DISCONNECTED
	private frameReader: FrameReader | null = null
	private timeoutID: NodeJS.Timeout | null = null
	private startTimestamp: number | null = null
	private frameCount = 0
	private channels: string[] = []

	constructor(baudRate = 9600) {
		this.transport = new WebSerialTransport(baudRate, 2 ** 20)
	}

	private async acquire(): Promise<void> {
		try {
			const frames = await this.frameReader?.readFrames(4, 100)

			this.frameCount += frames.length
			if (this.startTimestamp === null) {
				this.startTimestamp = Date.now()
				this.channels = Object.keys(
					frames[frames.length - 1].channels
				).sort()
			}

			if (this.timeoutID !== null) {
				if (this.status === DEVICE_STATUS.ACQUIRING) {
					await this.onFrames(frames)
				}

				this.timeoutID = setTimeout(async () => {
					await this.acquire()
				}, 0)
			}
		} catch (e) {
			if (this.timeoutID === null) {
				return
			}

			await this.disconnect()
			await this.onError(e)
		}
	}

	private async ignoreLine(): Promise<void> {
		let byte = (await this.transport.read(1, 100))[0]
		while (byte !== 0x0a) {
			byte = (await this.transport.read(1, 100))[0]
		}
	}

	public async connect(): Promise<void> {
		this.status = DEVICE_STATUS.CONNECTING
		try {
			await this.transport.open()
			// Ignore first line to avoid reading partial frames
			await this.ignoreLine()

			this.status = DEVICE_STATUS.IDLE
			this.frameReader = new MakerFrameReader(this.transport)

			// ScientISST MAKER starts sending data immediately after
			// connecting, so we need to start reading data from the transport
			// and discard it until the client is ready to start reading frames.
			this.startTimestamp = null
			this.frameCount = 0
			this.channels = []
			this.timeoutID = setTimeout(async () => {
				await this.acquire()
			}, 0)
		} catch (error) {
			this.status = DEVICE_STATUS.DISCONNECTED
			throw error
		}
	}

	public async disconnect(): Promise<void> {
		this.status = DEVICE_STATUS.DISCONNECTED
		this.frameReader = null

		if (this.timeoutID !== null) {
			clearTimeout(this.timeoutID)
			this.timeoutID = null
		}

		await this.transport.close()
	}

	public getStatus(): DEVICE_STATUS {
		return this.status
	}

	public isConnecting(): boolean {
		return this.status === DEVICE_STATUS.CONNECTING
	}

	public isConnected(): boolean {
		return (
			(this.status === DEVICE_STATUS.IDLE ||
				this.status === DEVICE_STATUS.ACQUIRING) &&
			this.transport.isOpen()
		)
	}

	public isIdle(): boolean {
		return this.isConnected() && this.status === DEVICE_STATUS.IDLE
	}

	public isAcquiring(): boolean {
		return this.isConnected() && this.status === DEVICE_STATUS.ACQUIRING
	}

	public async startAcquisition(): Promise<void> {
		if (!this.isIdle()) {
			throw new NotIdleException(this)
		}

		this.status = DEVICE_STATUS.ACQUIRING
	}

	public async stopAcquisition(): Promise<void> {
		if (!this.isAcquiring()) {
			throw new NotAcquiringException(this)
		}

		this.status = DEVICE_STATUS.IDLE
	}

	public async onFrames(frames: Frame[]): Promise<void> {
		console.log(frames)
	}

	public async onError(error: unknown): Promise<void> {
		console.error(error)
	}

	public getFirmwareVersion(): SemVer | null {
		return null
	}
	public getAdcCharacteristics(): ScientISSTAdcCharacteristics | null {
		return null
	}

	public getSamplingRate(): number {
		if (this.startTimestamp === null || this.frameCount === 0) {
			return 0
		}

		const elapsed = Date.now() - this.startTimestamp
		return this.frameCount / (elapsed / 1000)
	}

	public getChannels(): string[] {
		return this.channels
	}
}
