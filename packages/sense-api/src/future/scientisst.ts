import semver, { SemVer } from "semver"

import { ScientISSTAdcCharacteristics } from "./adcCharacteristics"
import {
	ADC_ATTEN,
	ADC_BITS_WIDTH,
	ADC_UNIT,
	CHANNEL,
	COMMUNICATION_MODE,
	SCIENTISST_STATE
} from "./enums"
import {
	AlreadyConnectedException,
	CommunicationModeNotSupportedException,
	ConnectionAlreadyInProgressException,
	ConnectionFailedException,
	ConnectionLostException,
	IdleException,
	InvalidSamplingRateException,
	NoChannelsEnabledException,
	NotConnectedException,
	NotIdleException,
	NotImplementedException,
	UserCancelledException
} from "./exceptions"
import { ScientISSTFrame } from "./frame"

export class ScientISST {
	private state: SCIENTISST_STATE = SCIENTISST_STATE.DISCONNECTED
	private communicationMode?: COMMUNICATION_MODE = undefined
	private serialPort?: SerialPort = undefined
	private writer?: WritableStreamDefaultWriter<Uint8Array> = undefined
	private reader?: ReadableStreamDefaultReader<Uint8Array> = undefined
	private readerBuffer: number[] = []
	private version?: SemVer = undefined
	private adcCharacteristics?: ScientISSTAdcCharacteristics = undefined
	private frameReadingQueue: Array<{
		resolve: () => void
		reject: () => void
	}> = []
	private frameReadingLocked = false
	private channels: CHANNEL[] = []
	private packetSize = 0

	public isIdle() {
		return this.state === SCIENTISST_STATE.IDLE
	}

	public isAcquiring() {
		return this.state === SCIENTISST_STATE.ACQUIRING
	}

	public isConnected() {
		return this.isIdle() || this.isAcquiring()
	}

	public isConnecting() {
		return this.state === SCIENTISST_STATE.CONNECTING
	}

	public isDisconnected() {
		return this.state === SCIENTISST_STATE.DISCONNECTED
	}

	public getVersion() {
		if (!this.isConnected()) {
			throw new NotConnectedException()
		}

		return this.version
	}

	public getAdcCharacteristics() {
		if (!this.isConnected()) {
			throw new NotConnectedException()
		}

		return this.adcCharacteristics
	}

	public async connect(mode: COMMUNICATION_MODE) {
		if (this.isConnected()) {
			throw new AlreadyConnectedException()
		} else if (this.isConnecting()) {
			throw new ConnectionAlreadyInProgressException()
		}

		this.state = SCIENTISST_STATE.CONNECTING
		this.communicationMode = mode

		switch (mode) {
			case COMMUNICATION_MODE.BLUETOOTH:
				if (!navigator || !navigator.serial) {
					throw new CommunicationModeNotSupportedException()
				}

				try {
					this.serialPort = await navigator.serial.requestPort()
				} catch {
					await this.disconnect()
					throw new UserCancelledException()
				}

				// DO NOT REMOVE THIS TIMEOUT
				// MacOS WILL NOT WORK WITHOUT IT
				if (this.isMacOS()) {
					await new Promise(resolve => {
						setTimeout(resolve, 2000)
					})
				}

				try {
					await this.serialPort.open({
						baudRate: 115200
					})

					// DO NOT REMOVE THIS TIMEOUT
					// MacOS WILL NOT WORK WITHOUT IT
					if (this.isMacOS()) {
						await new Promise(resolve => {
							setTimeout(resolve, 8000)
						})
					}
				} catch {
					await this.disconnect()
					throw new ConnectionFailedException()
				}

				try {
					this.writer = this.serialPort.writable.getWriter()
					this.reader = this.serialPort.readable.getReader()
				} catch {
					await this.disconnect()
					throw new ConnectionFailedException()
				}

				try {
					await this.getVersionAndAdcCharacteristics()
				} catch {
					await this.disconnect()
					throw new ConnectionFailedException()
				}

				this.state = SCIENTISST_STATE.IDLE
				break
			case COMMUNICATION_MODE.WEB_SOCKET:
				// TODO: Support web socket communication.
				// As of the time of writing this, web socket communication is
				// broken on the firmware side and therefore there's no way to test
				// it.
				throw new NotImplementedException()
			default:
				throw new NotImplementedException()
		}
	}

	public async disconnect() {
		// Cleanup the reader and writer. The try-catch blocks are here to
		// prevent errors from being thrown if the reader/writer is already
		// closed.
		switch (this.communicationMode) {
			case COMMUNICATION_MODE.BLUETOOTH:
				try {
					this.writer?.releaseLock()
				} catch {}
				try {
					await this.writer?.close()
				} catch {}
				try {
					this.reader?.releaseLock()
				} catch {}
				try {
					await this.serialPort?.close()
				} catch {}
				break
			case COMMUNICATION_MODE.WEB_SOCKET:
				// TODO: Support web socket communication.
				// As of the time of writing this, web socket communication is
				// broken on the firmware side and therefore there's no way to test
				// it.
				throw new NotImplementedException()
			default:
				break
		}

		this.state = SCIENTISST_STATE.DISCONNECTED
		this.communicationMode = undefined
		this.serialPort = undefined
		this.writer = undefined
		this.reader = undefined
		this.readerBuffer = []
		this.version = undefined
		this.adcCharacteristics = undefined

		for (const queue of this.frameReadingQueue) {
			queue.reject()
		}
		this.frameReadingQueue = []
		this.frameReadingLocked = false

		this.channels = []
		this.packetSize = 0
	}

	public async start(
		channels: CHANNEL[],
		samplingRate: number,
		simulated = false
	) {
		if (this.isDisconnected()) {
			throw new NotConnectedException()
		} else if (!this.isIdle()) {
			throw new NotIdleException()
		} else if (channels.length === 0) {
			throw new NoChannelsEnabledException()
		} else if (
			samplingRate < 1 ||
			samplingRate > 12000 ||
			samplingRate % 1 !== 0
		) {
			throw new InvalidSamplingRateException()
		}

		this.state = SCIENTISST_STATE.ACQUIRING
		this.channels = channels.sort((a, b) => a - b)

		const internalChannelsCount = channels.filter(
			x =>
				x === CHANNEL.AI1 ||
				x === CHANNEL.AI2 ||
				x === CHANNEL.AI3 ||
				x === CHANNEL.AI4 ||
				x === CHANNEL.AI5 ||
				x === CHANNEL.AI6
		).length
		const externalChannelsCount = channels.filter(
			x => x === CHANNEL.AX1 || x === CHANNEL.AX2
		).length

		this.packetSize = 3 * externalChannelsCount + 2

		if (this.version.major >= 2) {
			this.packetSize += 1
		}

		if (internalChannelsCount % 2) {
			this.packetSize += (internalChannelsCount * 12 - 4) / 8
		} else {
			this.packetSize += (internalChannelsCount * 12) / 8
		}

		await this.send(
			new Uint8Array([
				0x43,
				samplingRate & 0xff,
				(samplingRate >> 8) & 0xff
			])
		)

		await this.send(
			new Uint8Array([
				simulated ? 0x02 : 0x01,
				(channels.includes(CHANNEL.AI1) ? 1 : 0) |
					(channels.includes(CHANNEL.AI2) ? 1 << 1 : 0) |
					(channels.includes(CHANNEL.AI3) ? 1 << 2 : 0) |
					(channels.includes(CHANNEL.AI4) ? 1 << 3 : 0) |
					(channels.includes(CHANNEL.AI5) ? 1 << 4 : 0) |
					(channels.includes(CHANNEL.AI6) ? 1 << 5 : 0) |
					(channels.includes(CHANNEL.AX1) ? 1 << 6 : 0) |
					(channels.includes(CHANNEL.AX2) ? 1 << 7 : 0)
			])
		)
	}

	public async stop() {
		if (this.isDisconnected()) {
			throw new NotConnectedException()
		} else if (this.isIdle) {
			throw new IdleException()
		}

		await this.send(new Uint8Array([0x00]))
		this.state = SCIENTISST_STATE.IDLE
	}

	public async readFrames(count = 1): Promise<Array<ScientISSTFrame | null>> {
		if (this.isDisconnected()) {
			throw new NotConnectedException()
		} else if (this.isIdle()) {
			throw new IdleException()
		}

		if (this.frameReadingLocked) {
			try {
				await new Promise((resolve, reject) => {
					this.frameReadingQueue.push({
						resolve: () => resolve(undefined),
						reject
					})
				})
			} catch {
				return []
			}
		} else {
			this.frameReadingLocked = true
		}

		const frames: Array<ScientISSTFrame | null> = []
		let buffer = await this.recv(count * this.packetSize)
		let offset = 0

		for (let i = 0; i < count; i++) {
			let frameBuffer = buffer.slice(
				this.packetSize * i + offset,
				this.packetSize * (i + 1) + offset
			)

			while (!this.validateCRC4(frameBuffer)) {
				buffer = new Uint8Array([...buffer, ...(await this.recv(1))])
				offset++

				frameBuffer = buffer.slice(
					this.packetSize * i + offset,
					this.packetSize * (i + 1) + offset
				)
			}

			// TODO: Detect packet loss and stop acquisition if more than
			// 2 ** sequenceNumberBits packets are lost in a row

			const frameSkeleton: Record<CHANNEL, number | undefined> = {
				[CHANNEL.AI1]: undefined,
				[CHANNEL.AI2]: undefined,
				[CHANNEL.AI3]: undefined,
				[CHANNEL.AI4]: undefined,
				[CHANNEL.AI5]: undefined,
				[CHANNEL.AI6]: undefined,
				[CHANNEL.AX1]: undefined,
				[CHANNEL.AX2]: undefined,
				[CHANNEL.I1]: undefined,
				[CHANNEL.I2]: undefined,
				[CHANNEL.O1]: undefined,
				[CHANNEL.O2]: undefined
			}

			const sequenceNumber =
				this.version.major >= 2
					? (frameBuffer[frameBuffer.length - 2] >> 4) |
					  (frameBuffer[frameBuffer.length - 1] << 4)
					: frameBuffer[frameBuffer.length - 1] >> 4

			let byteOffset = 0
			let midFrame = false
			for (let i = this.channels.length - 1; i >= 0; i--) {
				const channel = this.channels[i]

				if (channel === CHANNEL.AX1 || channel === CHANNEL.AX2) {
					frameSkeleton[channel] =
						frameBuffer[byteOffset] |
						(frameBuffer[byteOffset + 1] << 8) |
						(frameBuffer[byteOffset + 2] << 16)

					byteOffset += 3
				} else if (channel === CHANNEL.I1) {
					frameSkeleton[channel] =
						this.version.major >= 2
							? (frameBuffer[frameBuffer.length - 3] >> 7) & 0x01
							: (frameBuffer[frameBuffer.length - 2] >> 7) & 0x01
				} else if (channel === CHANNEL.I2) {
					frameSkeleton[channel] =
						this.version.major >= 2
							? (frameBuffer[frameBuffer.length - 3] >> 6) & 0x01
							: (frameBuffer[frameBuffer.length - 2] >> 6) & 0x01
				} else if (channel === CHANNEL.O1) {
					frameSkeleton[channel] =
						this.version.major >= 2
							? (frameBuffer[frameBuffer.length - 3] >> 5) & 0x01
							: (frameBuffer[frameBuffer.length - 2] >> 5) & 0x01
				} else if (channel === CHANNEL.O2) {
					frameSkeleton[channel] =
						this.version.major >= 2
							? (frameBuffer[frameBuffer.length - 3] >> 4) & 0x01
							: (frameBuffer[frameBuffer.length - 2] >> 4) & 0x01
				} else if (!midFrame) {
					frameSkeleton[channel] =
						((frameBuffer[byteOffset + 1] << 8) |
							frameBuffer[byteOffset]) &
						0xfff

					byteOffset += 1
					midFrame = true
				} else {
					frameSkeleton[channel] =
						((frameBuffer[byteOffset + 1] << 8) |
							frameBuffer[byteOffset]) >>
						4

					byteOffset += 2
					midFrame = false
				}
			}

			frames.push(
				new ScientISSTFrame(
					this.adcCharacteristics,
					frameSkeleton,
					sequenceNumber
				)
			)
		}

		if (this.frameReadingQueue.length > 0) {
			const queue = this.frameReadingQueue.shift()
			queue.resolve()
		} else {
			this.frameReadingLocked = false
		}

		return frames
	}

	/**
	 * Returns true if the current device is a MacOS device
	 */
	private isMacOS(): boolean {
		return (
			navigator &&
			typeof navigator.userAgent === "string" &&
			navigator.userAgent.includes("Mac OS")
		)
	}

	private validateCRC4(frameData: Uint8Array): boolean {
		const CRC4tab = [0, 3, 6, 5, 12, 15, 10, 9, 11, 8, 13, 14, 7, 4, 1, 2]
		let crc = 0
		let b: number

		if (this.version.major < 2) {
			for (let i = 0; i < frameData.length - 1; i++) {
				b = frameData[i]
				crc = CRC4tab[crc] ^ (b >> 4)
				crc = CRC4tab[crc] ^ (b & 0x0f)
			}

			crc = CRC4tab[crc] ^ (frameData[frameData.length - 1] >> 4)
			crc = CRC4tab[crc]

			return crc == (frameData[frameData.length - 1] & 0x0f)
		} else {
			for (let i = 0; i < frameData.length - 2; i++) {
				b = frameData[i]
				crc = CRC4tab[crc] ^ (b >> 4)
				crc = CRC4tab[crc] ^ (b & 0x0f)
			}

			crc = CRC4tab[crc] ^ (frameData[frameData.length - 2] >> 4)
			crc = CRC4tab[crc] ^ (frameData[frameData.length - 1] >> 4)
			crc = CRC4tab[crc] ^ (frameData[frameData.length - 1] & 0x0f)
			crc = CRC4tab[crc]

			return crc == (frameData[frameData.length - 2] & 0x0f)
		}
	}

	private async send(data: Uint8Array) {
		if (this.isDisconnected()) {
			throw new NotConnectedException()
		}

		switch (this.communicationMode) {
			case COMMUNICATION_MODE.BLUETOOTH:
				try {
					// DO NOT REMOVE THIS CONSOLE.LOG
					// IF REMOVED, IT WILL BREAK THE APPLICATION FOR MacOS (IN BTH)
					if (this.isMacOS()) {
						console.log("Sending...", data)
					}
					await this.writer.write(data)
					await this.writer.ready
				} catch {
					await this.disconnect()
					throw new ConnectionLostException()
				}

				break
			case COMMUNICATION_MODE.WEB_SOCKET:
				// TODO: Support web socket communication.
				// As of the time of writing this, web socket communication is
				// broken on the firmware side and therefore there's no way to test
				// it.
				throw new NotImplementedException()
			default:
				throw new NotImplementedException()
		}
	}

	private async recv(byteCount = 0) {
		if (this.isDisconnected()) {
			throw new NotConnectedException()
		}

		switch (this.communicationMode) {
			case COMMUNICATION_MODE.BLUETOOTH:
				try {
					while (this.readerBuffer.length < byteCount) {
						const { value, done } = await this.reader.read()

						if (done) {
							await this.disconnect()
							throw new ConnectionLostException()
						}

						this.readerBuffer.push(...value)
					}

					return new Uint8Array(
						this.readerBuffer.splice(0, byteCount)
					)
				} catch {
					await this.disconnect()
					throw new ConnectionLostException()
				}
			case COMMUNICATION_MODE.WEB_SOCKET:
				// TODO: Support web socket communication.
				// As of the time of writing this, web socket communication is
				// broken on the firmware side and therefore there's no way to test
				// it.
				throw new NotImplementedException()
			default:
				throw new NotImplementedException()
		}
	}

	private async recvUntil(byte: number) {
		const result = []

		byte = byte & 0xff
		let recvByte = (await this.recv(1))[0]

		while (recvByte !== byte) {
			result.push(recvByte)
			recvByte = (await this.recv(1))[0]
		}

		result.push(recvByte)
		return new Uint8Array(result)
	}

	private async getVersionAndAdcCharacteristics() {
		if (this.isDisconnected()) {
			throw new NotConnectedException()
		}

		await this.send(new Uint8Array([0x23]))
		await this.send(new Uint8Array([0x07]))

		const version = await this.recvUntil(0x00)
		const versionString = new TextDecoder()
			.decode(version)
			.slice(0, -1)
			.trim()

		// Check if version string is a valid semantic version
		if (!semver.valid(versionString)) {
			this.version = semver.coerce("v1.0.0")
		} else {
			this.version = semver.coerce(versionString)
		}

		const adcCharacteristics = await this.recv(24)

		const adcNum: ADC_UNIT =
			adcCharacteristics[0] |
			(adcCharacteristics[1] << 8) |
			(adcCharacteristics[2] << 16) |
			(adcCharacteristics[3] << 24)

		const adcAtten: ADC_ATTEN =
			adcCharacteristics[4] |
			(adcCharacteristics[5] << 8) |
			(adcCharacteristics[6] << 16) |
			(adcCharacteristics[7] << 24)

		const adcBitWidth: ADC_BITS_WIDTH =
			adcCharacteristics[8] |
			(adcCharacteristics[9] << 8) |
			(adcCharacteristics[10] << 16) |
			(adcCharacteristics[11] << 24)

		const coeffA =
			adcCharacteristics[12] |
			(adcCharacteristics[13] << 8) |
			(adcCharacteristics[14] << 16) |
			(adcCharacteristics[15] << 24)

		const coeffB =
			adcCharacteristics[16] |
			(adcCharacteristics[17] << 8) |
			(adcCharacteristics[18] << 16) |
			(adcCharacteristics[19] << 24)

		const vRef =
			adcCharacteristics[20] |
			(adcCharacteristics[21] << 8) |
			(adcCharacteristics[22] << 16) |
			(adcCharacteristics[23] << 24)

		this.adcCharacteristics = new ScientISSTAdcCharacteristics(
			adcNum,
			adcAtten,
			adcBitWidth,
			coeffA,
			coeffB,
			vRef
		)
	}
}
