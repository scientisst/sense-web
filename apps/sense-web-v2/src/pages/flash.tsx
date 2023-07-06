import { useCallback, useRef, useState } from "react"

import Link from "next/link"

import { chakra } from "@chakra-ui/react"
import { TextButton } from "@scientisst/react-ui/components/inputs"
import { ESPLoader, Transport } from "esptool-js"

import SenseLayout from "../components/layout/SenseLayout"

enum CONNECTION_STATE {
	DISCONNECTED,
	CONNECTING,
	DOWNLOADING,
	SELECT_MODEL,
	ERASING,
	FLASHING,
	FLASHED
}

const Page = () => {
	const [state, setState] = useState(CONNECTION_STATE.DISCONNECTED)

	const deviceRef = useRef<SerialPort>()
	const transportRef = useRef<Transport>()
	const esploaderRef = useRef<ESPLoader>()

	const actionConnect = useCallback(async () => {
		try {
			setState(CONNECTION_STATE.CONNECTING)

			deviceRef.current = await navigator.serial.requestPort()
			transportRef.current = new Transport(deviceRef.current)

			const esploader = new ESPLoader(transportRef.current, 115200)
			esploaderRef.current = esploader
			await esploader.main_fn()

			setState(CONNECTION_STATE.SELECT_MODEL)
		} catch (error) {
			console.error(error)
			setState(CONNECTION_STATE.DISCONNECTED)
		}
	}, [])

	const flashCore = useCallback(async () => {
		if (esploaderRef.current === null) {
			return
		}

		try {
			const esploader = esploaderRef.current

			setState(CONNECTION_STATE.DOWNLOADING)
			const partitionTable = await fetch(
				"/firmware/core-noext-bt/partition-table.bin"
			)
				.then(res => res.arrayBuffer())
				.then(buffer => {
					// Convert the buffer to a binary string
					let binaryString = ""
					const bytes = new Uint8Array(buffer)
					for (let i = 0; i < bytes.length; i++) {
						binaryString += String.fromCharCode(bytes[i])
					}
					return binaryString
				})
			const scientisstSense = await fetch(
				"/firmware/core-noext-bt/scientisst-sense.bin"
			)
				.then(res => res.arrayBuffer())
				.then(buffer => {
					// Convert the buffer to a binary string
					let binaryString = ""
					const bytes = new Uint8Array(buffer)
					for (let i = 0; i < bytes.length; i++) {
						binaryString += String.fromCharCode(bytes[i])
					}
					return binaryString
				})
			const www = await fetch("/firmware/core-noext-bt/www.bin")
				.then(res => res.arrayBuffer())
				.then(buffer => {
					// Convert the buffer to a binary string
					let binaryString = ""
					const bytes = new Uint8Array(buffer)
					for (let i = 0; i < bytes.length; i++) {
						binaryString += String.fromCharCode(bytes[i])
					}
					return binaryString
				})

			// Download bootloader binary from /firmware/bootloader.bin as binary string
			const bootloader = await fetch(
				"/firmware/core-noext-bt/bootloader.bin"
			)
				.then(res => res.arrayBuffer())
				.then(buffer => {
					// Convert the buffer to a binary string
					let binaryString = ""
					const bytes = new Uint8Array(buffer)
					for (let i = 0; i < bytes.length; i++) {
						binaryString += String.fromCharCode(bytes[i])
					}
					return binaryString
				})

			setState(CONNECTION_STATE.ERASING)
			await esploader.erase_flash()

			setState(CONNECTION_STATE.FLASHING)
			const fileArrays = [
				{
					data: partitionTable,
					address: 0x8000
				},
				{
					data: bootloader,
					address: 0x1000
				},
				{
					data: scientisstSense,
					address: 0x10000
				},
				{
					data: www,
					address: 0x210000
				}
			]

			await esploader.write_flash(fileArrays, "4MB", "dio", "40m")

			// Close the connection
			await transportRef.current.disconnect()
			await transportRef.current.waitForUnlock(1500)

			setState(CONNECTION_STATE.FLASHED)
		} catch (error) {
			console.error(error)
			setState(CONNECTION_STATE.DISCONNECTED)
		}
	}, [])

	const flashNano = useCallback(async () => {
		if (esploaderRef.current === null) {
			return
		}

		try {
			const esploader = esploaderRef.current

			setState(CONNECTION_STATE.DOWNLOADING)
			const partitionTable = await fetch(
				"/firmware/nano-noext-bt/partition-table.bin"
			)
				.then(res => res.arrayBuffer())
				.then(buffer => {
					// Convert the buffer to a binary string
					let binaryString = ""
					const bytes = new Uint8Array(buffer)
					for (let i = 0; i < bytes.length; i++) {
						binaryString += String.fromCharCode(bytes[i])
					}
					return binaryString
				})
			const scientisstSense = await fetch(
				"/firmware/nano-noext-bt/scientisst-sense.bin"
			)
				.then(res => res.arrayBuffer())
				.then(buffer => {
					// Convert the buffer to a binary string
					let binaryString = ""
					const bytes = new Uint8Array(buffer)
					for (let i = 0; i < bytes.length; i++) {
						binaryString += String.fromCharCode(bytes[i])
					}
					return binaryString
				})
			const www = await fetch("/firmware/nano-noext-bt/www.bin")
				.then(res => res.arrayBuffer())
				.then(buffer => {
					// Convert the buffer to a binary string
					let binaryString = ""
					const bytes = new Uint8Array(buffer)
					for (let i = 0; i < bytes.length; i++) {
						binaryString += String.fromCharCode(bytes[i])
					}
					return binaryString
				})

			// Download bootloader binary from /firmware/bootloader.bin as binary string
			const bootloader = await fetch(
				"/firmware/nano-noext-bt/bootloader.bin"
			)
				.then(res => res.arrayBuffer())
				.then(buffer => {
					// Convert the buffer to a binary string
					let binaryString = ""
					const bytes = new Uint8Array(buffer)
					for (let i = 0; i < bytes.length; i++) {
						binaryString += String.fromCharCode(bytes[i])
					}
					return binaryString
				})

			setState(CONNECTION_STATE.ERASING)
			await esploader.erase_flash()

			setState(CONNECTION_STATE.FLASHING)
			const fileArrays = [
				{
					data: partitionTable,
					address: 0x8000
				},
				{
					data: bootloader,
					address: 0x1000
				},
				{
					data: scientisstSense,
					address: 0x10000
				},
				{
					data: www,
					address: 0x210000
				}
			]

			await esploader.write_flash(fileArrays, "4MB", "dio", "40m")

			// Close the connection
			await transportRef.current.disconnect()
			await transportRef.current.waitForUnlock(1500)

			setState(CONNECTION_STATE.FLASHED)
		} catch (error) {
			console.error(error)
			setState(CONNECTION_STATE.DISCONNECTED)
		}
	}, [])

	return (
		<SenseLayout
			title="Flash firmware"
			className="flex w-[480px] flex-col items-center justify-center gap-8 py-8 px-8 sm:w-[640px]"
			returnHref="/"
		>
			<chakra.div display="flex" flexDirection="column" gap="4" p="4">
				{(state === CONNECTION_STATE.DISCONNECTED ||
					state === CONNECTION_STATE.FLASHED ||
					state === CONNECTION_STATE.CONNECTING) && (
					<>
						<p>
							Warning: You most likely do not need to flash your
							board as they usually come pre-flashed. If you{"'"}
							re just looking to acquire data, you can use the{" "}
							<Link href="/live">
								<span className="underline">
									acquisition page
								</span>
							</Link>
							.
						</p>
						<p>
							Before flashing, connect your board to your computer
							using a USB cable. Make sure to place your board in
							flash mode. Instructions on how to place your board
							in flash mode vary depending on your board model.
							Newer board models are automatically placed in flash
							mode when connected to your computer via USB.
						</p>
						<TextButton
							size="base"
							onClick={actionConnect}
							disabled={state === CONNECTION_STATE.CONNECTING}
						>
							{state === CONNECTION_STATE.CONNECTING
								? "Awaiting device..."
								: "Select device"}
						</TextButton>
					</>
				)}
				{state === CONNECTION_STATE.SELECT_MODEL && (
					<>
						<p>Connected to the board successfully!</p>
						<p>
							Please select the model of your board below in order
							to flash the correct firmware.
						</p>
						<TextButton size="base" onClick={flashCore}>
							ScientISST Core
						</TextButton>
						<TextButton size="base" onClick={flashCore}>
							ScientISST Cardio
						</TextButton>
						<TextButton size="base" onClick={flashNano}>
							ScientISST Nano
						</TextButton>
					</>
				)}
				{state === CONNECTION_STATE.DOWNLOADING && (
					<span>Downloading firmware...</span>
				)}
				{state === CONNECTION_STATE.ERASING && <span>Erasing...</span>}
				{state === CONNECTION_STATE.FLASHING && (
					<span>Flashing...</span>
				)}
				{state === CONNECTION_STATE.FLASHED && <span>Flashed!</span>}
			</chakra.div>
		</SenseLayout>
	)
}

export default Page
