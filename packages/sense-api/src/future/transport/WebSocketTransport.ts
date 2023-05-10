import { Mutex } from "../locks"
import { Transport } from "./Transport"
import {
	AlreadyConnectedException,
	ConnectionFailedException,
	ConnectionLostException,
	NotConnectedException
} from "./exceptions"
import { TransportClosedException } from "./exceptions/TransportClosedException"

/**
 * Transport that uses the Web Socket API to communicate with a device.
 */
export class WebSocketTransport implements Transport {
	private readonly address: string
	private readonly bufferSize: number
	private socket?: WebSocket
	private readBuffer = new Uint8Array(0)
	private readResolve?: (value: undefined) => void
	private readReject?: (reason: unknown) => void
	private connecting = false
	private readLock = new Mutex()
	private writeLock = new Mutex()

	/**
	 * Create a new WebSocketTransport.
	 * @param {string} address the address of the device
	 * @param {number} bufferSize the size of the read buffer, in bytes
	 */
	constructor(address: string, bufferSize: number) {
		this.address = address
		this.bufferSize = bufferSize
	}

	async open() {
		if (this.isOpen()) {
			throw new AlreadyConnectedException(this)
		}

		try {
			this.connecting = true
			this.socket = await new Promise((resolve, reject) => {
				const socket = new WebSocket(this.address)

				socket.onopen = () => {
					resolve(socket)
				}

				socket.onerror = () => {
					reject(new ConnectionFailedException(this))
				}
			})
		} finally {
			this.connecting = false
		}

		this.readBuffer = new Uint8Array(0)
		this.readResolve = undefined
		this.readReject = undefined

		this.socket.onerror = async () => {
			const error = new ConnectionLostException(this)
			this.readLock.cancel(error)
			this.writeLock.cancel(error)
			await this.close()
		}

		this.socket.onclose = async () => {
			await this.close()
		}

		this.socket.onmessage = async event => {
			const data = new Uint8Array(event.data)
			const newBuffer = new Uint8Array(
				this.readBuffer.length + data.length
			)
			newBuffer.set(this.readBuffer)
			newBuffer.set(data, this.readBuffer.length)

			if (newBuffer.length > this.bufferSize) {
				const error = new ConnectionLostException(this)
				this.readLock.cancel(error)
				this.writeLock.cancel(error)
				await this.close()
			} else {
				this.readBuffer = newBuffer
			}

			if (this.readResolve) {
				this.readResolve(undefined)
				this.readResolve = undefined
				this.readReject = undefined
			}
		}

		return
	}

	isOpen() {
		return !!(this.socket || this.connecting)
	}

	async close() {
		if (!this.isOpen()) {
			return
		}

		this.socket.close()
		this.socket = undefined
		const error = new TransportClosedException(this)
		this.readLock.cancel(error)
		this.writeLock.cancel(error)
	}

	async write(data: Uint8Array) {
		if (!this.isOpen()) {
			throw new NotConnectedException(this)
		}

		await this.writeLock.acquire()

		try {
			this.socket.send(data)
		} catch (e) {
			if (e instanceof DOMException && e.name === "InvalidStateError") {
				const error = new ConnectionLostException(this)
				this.readLock.cancel(error)
				this.writeLock.cancel(error)
				throw error
			}
			this.readLock.cancel(e)
			this.writeLock.cancel(e)
			throw e
		}

		this.writeLock.release()
	}

	async read(bytes: number, timeoutMilliseconds: number) {
		if (!this.isOpen()) {
			throw new NotConnectedException(this)
		}

		await this.readLock.acquire()

		const result = new Uint8Array(bytes)
		let bytesRead = 0

		if (this.readBuffer.length >= 0) {
			const bytesToRead = Math.min(bytes, this.readBuffer.length)
			result.set(this.readBuffer.slice(0, bytesToRead))
			this.readBuffer = this.readBuffer.slice(bytesToRead)
			bytesRead += bytesToRead
		}

		while (bytesRead < bytes) {
			await new Promise((resolve, reject) => {
				if (this.readBuffer.length > 0) {
					resolve(undefined)
					return
				}

				this.readResolve = resolve
				this.readReject = reject
				setTimeout(() => {
					if (this.readReject) {
						this.readReject(new ConnectionFailedException(this))
						this.readResolve = undefined
						this.readReject = undefined
					}
				}, timeoutMilliseconds)
			})

			const bytesToRead = Math.min(
				bytes - bytesRead,
				this.readBuffer.length
			)
			result.set(this.readBuffer.slice(0, bytesToRead), bytesRead)
			this.readBuffer = this.readBuffer.slice(bytesToRead)
			bytesRead += bytesToRead
		}

		this.readLock.release()

		return result
	}
}
