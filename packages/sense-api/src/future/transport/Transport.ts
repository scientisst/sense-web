/**
 * Transport is a low-level interface for sending and receiving data.
 *
 * @interface
 */
export interface Transport {
	/**
	 * Open the transport.
	 * @returns {Promise<void>}
	 * @throws {AlreadyConnectedException} if the transport is already open
	 * @throws {ConnectionFailedException} if a connection cannot be established
	 * @throws {PermissionDeniedException} if the browser blocks the operation
	 * @throws {CancelledByUserException} if the user cancels the operation
	 */
	open(): Promise<void>

	/**
	 * Check if the transport is open.
	 * @returns {boolean}
	 */
	isOpen(): boolean

	/**
	 * Closes the transport.
	 * @returns {Promise<void>}
	 */
	close: () => Promise<void>

	/**
	 * Write data to the transport.
	 * @param {Uint8Array} data the data to write
	 * @returns {Promise<void>}
	 * @throws {NotConnectedException} if the transport is not open
	 * @throws {ConnectionLostException} if the transport is closed while
	 * writing
	 */
	write: (data: Uint8Array) => Promise<void>

	/**
	 * Read data from the transport.
	 * @param {number} bytes the number of bytes to read
	 * @param {number} timeoutMilliseconds the timeout in milliseconds
	 * @returns {Promise<Uint8Array>} the data read
	 * @throws {NotConnectedException} if the transport is not open
	 * @throws {ConnectionLostException} if the transport is closed while
	 * reading or if the timeout is reached
	 */
	read: (bytes: number, timeoutMilliseconds: number) => Promise<Uint8Array>
}
