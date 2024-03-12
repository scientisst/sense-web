import React, { useCallback, useEffect, useRef, useState } from "react"

import { useRouter } from "next/router"

import {
	CancelledByUserException,
	Device,
	Frame,
	Maker,
	SCIENTISST_CHANNEL,
	SCIENTISST_COMUNICATION_MODE,
	ScientISST
} from "@scientisst/sense/future"

import SenseLayout from "../components/layout/SenseLayout"
import { useDataContext } from "../context/DataContext"
import { useSettings } from "../context/SettingsContext"
import Acquiring from "../views/live/Acquiring"
import Connected from "../views/live/Connected"
import Connecting from "../views/live/Connecting"
import ConnectionFailed from "../views/live/ConnectionFailed"
import ConnectionLost from "../views/live/ConnectionLost"
import Disconnect from "../views/live/Disconnect"
import OutOfStorage from "../views/live/OutOfStorage"
// import Editing from "../views/live/Editing"
import Paused from "../views/live/Paused"
import Stopped from "../views/live/Stopped"
import Stopping from "../views/live/Stopping"

export enum STATUS {
	DISCONNECTED,
	CONNECTION_LOST,
	CONNECTION_FAILED,
	CONNECTING,
	CONNECTED,
	ACQUIRING,
	PAUSED,
	STOPPING,
	STOPPED,
	STOPPED_AND_SAVED,
	OUT_OF_STORAGE
	// EDITING
}

const disconnectDevice = async (device: Device | null) => {
	if (!device) {
		console.error("Device already disconnected")
		return
	}

	await device.disconnect().catch(error => {
		console.error(error)
	})
}

const Page = () => {
	const router = useRouter()
	const { settings } = useSettings()
	const { saveChannels, resetChannels, graphBufferRef } = useDataContext()

	const deviceRef = useRef<Device | null>(null)
	const [status, setStatus] = useState(STATUS.DISCONNECTED)
	// Determines whether an acquisition has started or not. If an acquisiton
	// has started, a download button will be shown if the acquistion fails.

	const sampleRate = deviceRef.current?.getSamplingRate()

	const [acquisitionStarted, setAcquisitionStarted] = useState(false)

	// const [segmentCount, setSegmentCount] = useState(0)
	const [numSegments, setNumSegments] = useState(0)

	// Store buffer contains the frames that are queued to be saved to
	// localStorage
	const storeBufferRef = useRef<Frame[]>([])
	const [storeBufferLength, setStoreBufferLength] = useState(0)
	const storeBufferThreshold = useRef(1000)
	const [firmwareVersion, setFirmwareVersion] = useState<string | null>(null)

	const channelsNamesRef = useRef<string[]>([])
	const [xDomain, setXDomain] = useState<[number, number]>([0, 0])
	const frameSequenceRef = useRef(0)

	// The following useEffect ensures that the device is disconnected when the
	// user leaves the page
	useEffect(() => {
		return () => {
			disconnectDevice(deviceRef.current)
		}
	}, [])

	// This function stored all queued frames to localStorage
	const saveData = useCallback(
		(buffer: Array<Frame | null>) => {
			if (buffer.length === 0) return

			try {
				const dataKey = `aq_${numSegments}_seg`
				if (!(dataKey in localStorage)) {
					localStorage.setItem(
						dataKey + "time",
						JSON.stringify(Date.now())
					)
				}

				const serialized = buffer
					.map(frame => frame?.serialize())
					.join("")
				localStorage.setItem(
					dataKey,
					(localStorage.getItem(dataKey) ?? "") + serialized
				)

				storeBufferRef.current = []
				setStoreBufferLength(0) // Prevent state loops
			} catch (e) {
				if (
					e instanceof DOMException &&
					e.name === "QuotaExceededError"
				) {
					// We are out of localStorage, show the user the error
					setStatus(STATUS.OUT_OF_STORAGE)
					storeBufferRef.current = []
					setStoreBufferLength(storeBufferRef.current.length) // Prevent state loops

					// Disconnect from the device, we can't continue the acquisition

					disconnectDevice(deviceRef.current)
					return
				}
				console.error(e)
				throw e
			}
		},
		[numSegments]
	)

	// Save data to local storage
	useEffect(() => {
		if (storeBufferLength >= storeBufferThreshold.current) {
			const start = Date.now()
			saveData(storeBufferRef.current)
			const saveTime = Date.now() - start

			// console.log("Saved data in " + saveTime + "ms")

			storeBufferThreshold.current = Math.max(
				sampleRate * 5,
				Math.min(
					sampleRate * (saveTime / 1000 / 0.005),
					sampleRate * 10
				)
			)

			// console.log("Save threshold: " + storeBufferThreshold.current)
		} else if (status === STATUS.PAUSED) {
			saveData(storeBufferRef.current)
			// } else if (status === STATUS.EDITING) {
			// saveData(storeBufferRef.current)
		} else if (status === STATUS.STOPPED) {
			saveData(storeBufferRef.current)

			setStatus(STATUS.STOPPED_AND_SAVED)
			router.push("/summary", {}).then(() => {
				// Ignore
			})
		}
	}, [router, saveData, status, storeBufferLength, sampleRate])

	const connect = useCallback(async () => {
		setStatus(STATUS.CONNECTING)
		setAcquisitionStarted(false)

		// Criar função para isto
		if (settings.deviceType === "system") {
			settings.deviceType = "sense"
			// localStorage.setItem("settings", JSON.stringify(settings))
		}

		channelsNamesRef.current = settings["channels"] as string[]

		switch (settings.deviceType ?? "sense") {
			case "maker":
				const baudRate = (settings.baudRate ?? 9600) as number
				deviceRef.current = new Maker(baudRate)

				// Set the initial threshold for maker
				storeBufferThreshold.current = 200

				break
			case "sense":
				const communicationMode = (settings.communication ??
					SCIENTISST_COMUNICATION_MODE.WEBSERIAL) as SCIENTISST_COMUNICATION_MODE
				const channels = (settings.channels ?? [
					"AI1",
					"AI2",
					"AI3",
					"AI4",
					"AI5",
					"AI6"
				]) as SCIENTISST_CHANNEL[]
				const samplingRate = (settings.samplingRate ?? 1000) as number

				deviceRef.current = new ScientISST(
					communicationMode,
					new Set(channels),
					samplingRate
				)

				// Set the initial save threshold for ScientISST to 10 seconds
				storeBufferThreshold.current = samplingRate * 5

				break
			default:
				setStatus(STATUS.CONNECTION_FAILED)
				throw new Error("Device type not supported.")
		}

		try {
			await deviceRef.current.connect()
			// setSegmentCount(0)
			setNumSegments(0)
			setFirmwareVersion(
				deviceRef.current.getFirmwareVersion()
					? deviceRef.current.getFirmwareVersion().version
					: null
			)
			setStatus(STATUS.CONNECTED)
		} catch (error) {
			console.error(error)
			if (error instanceof CancelledByUserException) {
				setStatus(STATUS.DISCONNECTED)
				return
			}

			setStatus(STATUS.CONNECTION_FAILED)
		}
	}, [settings])

	const disconnect = useCallback(async () => {
		disconnectDevice(deviceRef.current)
		setStatus(STATUS.DISCONNECTED)
	}, [])

	const start = useCallback(async () => {
		try {
			// cleanup all localstorage items that start with aq_
			for (const key in localStorage) {
				if (key.startsWith("aq_")) {
					localStorage.removeItem(key)
				}
			}

			// Save device type to localStorage
			localStorage.setItem(
				"aq_deviceType",
				deviceRef.current instanceof Maker ? "maker" : "sense"
			)

			if (sampleRate) {
				localStorage.setItem(
					"aq_sampleRate",
					JSON.stringify(sampleRate)
				)
			}

			// DEPRECATED: Save the device's channels to localStorage
			// // Save the device's ADC characteristics to localStorage
			// const adcCharacteristics =
			// 	deviceRef.current?.getAdcCharacteristics()
			// if (adcCharacteristics !== null) {
			// 	localStorage.setItem("aq_adcChars", adcCharacteristics.toJSON())
			// }

			// Save the total number of segments to localStorage.
			// This is going to start at zero because we are starting the
			// first acquisition.
			localStorage.setItem("aq_segments", JSON.stringify(numSegments + 1))

			deviceRef.current.onFrames = data => {
				if (data === null) return

				storeBufferRef.current = [
					...storeBufferRef.current,
					...data.filter(d => d !== null)
				]
				if (
					storeBufferRef.current.length >=
					storeBufferThreshold.current
				) {
					setStoreBufferLength(storeBufferRef.current.length)
				}

				const graphBufferLimit = Math.ceil(
					deviceRef.current.getSamplingRate() * 5
				)

				for (let i = 0; i < data.length; i++) {
					const frame = data[i]

					graphBufferRef.current.push([
						frameSequenceRef.current,
						frame
					])

					if (graphBufferRef.current.length > graphBufferLimit) {
						graphBufferRef.current.shift()
					}

					frameSequenceRef.current++
				}

				setXDomain([
					frameSequenceRef.current - graphBufferLimit,
					frameSequenceRef.current
				])

				// We set this to true so that the user will be shown a
				// download button in case the acquisition is stopped due
				// to a localStorage being full or connection being lost.
				setAcquisitionStarted(true)
			}

			deviceRef.current.onError = e => {
				console.error(e)
				setStatus(STATUS.CONNECTION_LOST)
			}

			// Ensure we don't store frames from previous acquisitions
			storeBufferRef.current = []
			setStoreBufferLength(storeBufferRef.current.length)

			// Reset the list of channels being acquired so it can be filled
			// again with the channels from the new acquisition
			resetChannels()

			await deviceRef.current?.startAcquisition()
			setStatus(STATUS.ACQUIRING)
		} catch (error) {
			console.error(error)
			setStatus(STATUS.CONNECTION_LOST)
		}
	}, [graphBufferRef, numSegments, resetChannels])

	const stop = useCallback(async () => {
		deviceRef.current.onError = () => {
			// We are already stopping and disconnecting the device, we don't
			// really care about errors from this point onwards.
		}
		setStatus(STATUS.STOPPING)
		try {
			await deviceRef.current?.stopAcquisition()
			await deviceRef.current?.disconnect()
			saveChannels(numSegments)
		} catch (e) {
			console.error(e)
			// Ignore the errors. See the comment in the onError handler above.
		}
		setStatus(STATUS.STOPPED)
	}, [saveChannels, numSegments])

	const pause = useCallback(async () => {
		deviceRef.current.onError = () => {
			// We are pausing the acquisition, if an error occurs we will handle
			// it in the catch block below.
		}
		try {
			await deviceRef.current?.stopAcquisition()
			setStatus(STATUS.PAUSED)
			saveChannels(numSegments)
		} catch (e) {
			console.error(e)
			setStatus(STATUS.CONNECTION_LOST)
		}
	}, [saveChannels, numSegments])

	const resume = useCallback(async () => {
		deviceRef.current.onError = e => {
			console.error(e)
			setStatus(STATUS.CONNECTION_LOST)
		}

		try {
			// We need to increment the segment number because we are starting
			// a new acquisition. This way the data will be saved in a different
			// localStorage entry.
			//
			// We do this before starting the acquisition to ensure that new
			// data will not be saved in the previous segment.

			setNumSegments(prev => prev + 1)
			// setNumSegments(prev => prev + 1)

			// Ensure we don't store frames from previous acquisitions
			storeBufferRef.current = []
			setStoreBufferLength(storeBufferRef.current.length)

			// Reset charts
			setXDomain([0, 0])
			frameSequenceRef.current = 0

			await deviceRef.current?.startAcquisition()
			setStatus(STATUS.ACQUIRING)

			resetChannels()

			// Now that acquisition has started, we need to update the
			// localStorage entry with the new segment number.
			localStorage.setItem("aq_segments", JSON.stringify(numSegments + 2))
		} catch (e) {
			setStatus(STATUS.CONNECTION_LOST)
		}
	}, [numSegments, resetChannels])

	const xTickFormatter = useCallback((value: number) => {
		const samplingRate = deviceRef.current?.getSamplingRate()
		const time = samplingRate !== 0 ? value / samplingRate : value
		if (time < 0) {
			return "0:00"
		}

		const seconds = Math.floor(time % 60)
		const minutes = Math.floor(time / 60)

		if (seconds < 10) {
			return `${minutes}:0${seconds}`
		}
		return `${minutes}:${seconds}`
	}, [])

	// const submit = useCallback(() => {
	// 	try {
	// 		disconnectDevice(deviceRef.current)
	// 		saveChannels(numSegments)
	// 		setStatus(STATUS.STOPPED)
	// 	} catch (e) {
	// 		console.error(e)
	// 		setStatus(STATUS.CONNECTION_LOST)
	// 	}
	// }, [])

	// const changeSegments = useCallback(
	// 	(direction: string) => {
	// 		if (
	// 			(segmentCount === 0 && direction === "previous") ||
	// 			(segmentCount === numSegments && direction === "next")
	// 		) {
	// 			throw new Error(
	// 				"Segment count out of bounds, should not happen"
	// 			)
	// 		}

	// 		if (direction === "next") {
	// 			setSegmentCount(prev => prev + 1)
	// 		} else if (direction === "previous") {
	// 			setSegmentCount(prev => prev - 1)
	// 		}
	// 	},
	// 	[segmentCount, numSegments]
	// )

	return (
		<SenseLayout
			className="container flex flex-col items-center justify-start gap-4 p-8"
			title="Live Acquisition"
			shortTitle="Live"
			returnHref="/"
		>
			{status === STATUS.DISCONNECTED && (
				<Disconnect status={status} connect={connect} />
			)}
			{status === STATUS.CONNECTING && (
				<Connecting status={status} connect={connect} />
			)}
			{status === STATUS.CONNECTION_FAILED && (
				<ConnectionFailed status={status} connect={connect} />
			)}
			{status === STATUS.STOPPING && <Stopping />}
			{status === STATUS.STOPPED && <Stopped />}
			{status === STATUS.STOPPED_AND_SAVED && <Stopped />}
			{status === STATUS.CONNECTED && (
				<Connected
					firmwareVersion={firmwareVersion}
					start={start}
					disconnect={disconnect}
				/>
			)}
			{status === STATUS.CONNECTION_LOST && acquisitionStarted && (
				<ConnectionLost status={status} connect={connect} />
			)}
			{status === STATUS.OUT_OF_STORAGE && acquisitionStarted && (
				<OutOfStorage />
			)}
			{status === STATUS.PAUSED && <Paused resume={resume} stop={stop} />}

			{status === STATUS.ACQUIRING && (
				<Acquiring
					pause={pause}
					stop={stop}
					xTickFormatter={xTickFormatter}
					xDomain={xDomain}
					sampleRate={sampleRate}
				/>
			)}
		</SenseLayout>
	)
}

export default Page
