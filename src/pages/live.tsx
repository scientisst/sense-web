import { useCallback, useEffect, useReducer, useRef, useState } from "react"

import router from "next/router"

import { TextButton } from "@scientisst/react-ui/components/inputs"
import {
	CHANNEL,
	COMMUNICATION_MODE,
	ConnectionFailedException,
	ConnectionLostException,
	ScientISST,
	ScientISSTFrame,
	UserCancelledException,
	framesToUtf16
} from "@scientisst/sense/future"

import SenseLayout from "../components/layout/SenseLayout"

enum CONNECTION_STATUS {
	DISCONNECTED,
	CONNECTION_LOST,
	CONNECTION_FAILED,
	CONNECTING,
	CONNECTED,
	ACQUIRING,
	PAUSED,
	STOPPING
}

type LastValues = {
	[CHANNEL.AI1]: number | undefined
	[CHANNEL.AI2]: number | undefined
	[CHANNEL.AI3]: number | undefined
	[CHANNEL.AI4]: number | undefined
	[CHANNEL.AI5]: number | undefined
	[CHANNEL.AI6]: number | undefined
}

const Page = () => {
	const scientisstRef = useRef(new ScientISST())
	const [connectionStatus, setConnectionStatus] = useState(
		CONNECTION_STATUS.DISCONNECTED
	)
	const [activeChannels, setActiveChannels] = useState<CHANNEL[]>([])
	const [activeSamplingRate, setActiveSamplingRate] = useState(0)
	const [lastValues, dispatchLastValues] = useReducer(
		(state: LastValues, action: LastValues) => {
			return { ...state, ...action }
		},
		{
			[CHANNEL.AI1]: undefined,
			[CHANNEL.AI2]: undefined,
			[CHANNEL.AI3]: undefined,
			[CHANNEL.AI4]: undefined,
			[CHANNEL.AI5]: undefined,
			[CHANNEL.AI6]: undefined
		}
	)
	const [segment, setSegment] = useState(1)
	const frameSequenceRef = useRef(0)
	const connectionTimeoutRef = useRef<number | null>(null)

	const bufferRef = useRef<ScientISSTFrame[]>([])
	const appendBuffer = useCallback(
		(frames: ScientISSTFrame[], segment: number, bufferLimit: number) => {
			const newState = [...bufferRef.current, ...frames]

			if (newState.length >= bufferLimit) {
				const i = newState.length - (newState.length % 16)
				const newData = framesToUtf16(newState.slice(0, i))
				const oldData = localStorage.getItem("aq_seg" + segment) ?? ""

				localStorage.setItem("aq_seg" + segment, oldData + newData)

				bufferRef.current = newState.slice(i)
			} else {
				bufferRef.current = newState
			}
		},
		[]
	)

	const clearBuffer = useCallback((segment: number) => {
		const i = bufferRef.current.length - (bufferRef.current.length % 16)
		const newData = framesToUtf16(bufferRef.current.slice(0, i))
		const oldData = localStorage.getItem("aq_seg" + segment) ?? ""

		localStorage.setItem("aq_seg" + segment, oldData + newData)
		bufferRef.current = []
	}, [])

	const flushBuffer = useCallback(() => {
		bufferRef.current = []
	}, [])

	useEffect(() => {
		if (connectionStatus === CONNECTION_STATUS.ACQUIRING) {
			let valid = true

			new Promise(async resolve => {
				while (valid) {
					try {
						const frames = await scientisstRef.current.readFrames(
							Math.ceil(activeSamplingRate / 15)
						)

						if (frames.length === 0) {
							break
						}

						if (valid) {
							dispatchLastValues(frames[frames.length - 1].analog)
							appendBuffer(frames, segment, activeSamplingRate)
						} else {
							frameSequenceRef.current = 0
						}
					} catch (error) {
						if (valid) {
							if (error instanceof ConnectionLostException) {
								setConnectionStatus(
									CONNECTION_STATUS.CONNECTION_LOST
								)
							} else {
								setConnectionStatus(
									CONNECTION_STATUS.CONNECTION_FAILED
								)
								throw error
							}
						}
					}
				}
				resolve(undefined)
			})

			return () => {
				valid = false
			}
		} else if (connectionStatus === CONNECTION_STATUS.PAUSED) {
			let valid = true

			new Promise(async resolve => {
				while (valid) {
					try {
						const frames = await scientisstRef.current.readFrames(
							activeSamplingRate
						)

						if (frames.length === 0 || !valid) {
							break
						}

						frameSequenceRef.current += frames.length
					} catch (error) {
						if (valid) {
							if (error instanceof ConnectionLostException) {
								setConnectionStatus(
									CONNECTION_STATUS.CONNECTION_LOST
								)
							} else {
								setConnectionStatus(
									CONNECTION_STATUS.CONNECTION_FAILED
								)
								throw error
							}
						}
					}
				}
				resolve(undefined)
			})

			return () => {
				valid = false
			}
		}
	}, [
		activeChannels,
		activeSamplingRate,
		appendBuffer,
		connectionStatus,
		segment
	])

	const connect = useCallback(async () => {
		if (
			connectionStatus === CONNECTION_STATUS.DISCONNECTED ||
			connectionStatus === CONNECTION_STATUS.CONNECTION_FAILED ||
			connectionStatus === CONNECTION_STATUS.CONNECTION_LOST
		) {
			setConnectionStatus(CONNECTION_STATUS.CONNECTING)

			const settings = localStorage.getItem("settings") || "{}"
			const communicationMode =
				JSON.parse(settings).communication ||
				COMMUNICATION_MODE.BLUETOOTH

			const t = connectionTimeoutRef.current + 1
			connectionTimeoutRef.current = t
			setTimeout(async () => {
				if (connectionTimeoutRef.current === t) {
					try {
						await scientisstRef.current.disconnect()
					} catch {}
					setConnectionStatus(CONNECTION_STATUS.CONNECTION_FAILED)
				}
			}, 5000)

			try {
				await scientisstRef.current.connect(communicationMode)
				setConnectionStatus(CONNECTION_STATUS.CONNECTED)
				connectionTimeoutRef.current = connectionTimeoutRef.current + 1
			} catch (error) {
				connectionTimeoutRef.current = connectionTimeoutRef.current + 1
				if (error instanceof UserCancelledException) {
					setConnectionStatus(CONNECTION_STATUS.DISCONNECTED)
				} else if (error instanceof ConnectionFailedException) {
					setConnectionStatus(CONNECTION_STATUS.CONNECTION_FAILED)
				} else {
					throw error
				}
			}
		}
	}, [connectionStatus])

	const disconnect = useCallback(async () => {
		if (
			connectionStatus === CONNECTION_STATUS.CONNECTED ||
			connectionStatus === CONNECTION_STATUS.ACQUIRING
		) {
			try {
				if (!scientisstRef.current.isIdle()) {
					await scientisstRef.current.stop()
				}
				await scientisstRef.current.disconnect()
			} catch {}
			setConnectionStatus(CONNECTION_STATUS.DISCONNECTED)
		}
	}, [connectionStatus])

	const start = useCallback(async () => {
		if (connectionStatus === CONNECTION_STATUS.CONNECTED) {
			setConnectionStatus(CONNECTION_STATUS.ACQUIRING)

			// Read channels and sample rate from settings
			const settings = localStorage.getItem("settings") || "{}"
			const channels = JSON.parse(settings).channels || [
				CHANNEL.AI1,
				CHANNEL.AI2,
				CHANNEL.AI3,
				CHANNEL.AI4,
				CHANNEL.AI5,
				CHANNEL.AI6
			]
			const sampleRate = JSON.parse(settings).sampleRate || 1000
			scientisstRef.current.getAdcCharacteristics().then(adcChars => {
				localStorage.setItem("aq_adcChars", adcChars.toJSON())
			})

			channels.sort()

			setActiveChannels(channels)
			setActiveSamplingRate(sampleRate)
			setSegment(1)

			for (const key in localStorage) {
				if (key.startsWith("aq_")) {
					localStorage.removeItem(key)
				}
			}

			localStorage.setItem("aq_channels", JSON.stringify(channels))
			localStorage.setItem("aq_sampleRate", JSON.stringify(sampleRate))
			localStorage.setItem("aq_segments", JSON.stringify(1))
			localStorage.setItem("aq_gracefullyStopped", JSON.stringify(false))

			flushBuffer()

			try {
				await scientisstRef.current.start(channels, sampleRate, false)
			} catch (error) {
				if (error instanceof ConnectionLostException) {
					setConnectionStatus(CONNECTION_STATUS.CONNECTION_LOST)
				} else {
					setConnectionStatus(CONNECTION_STATUS.CONNECTION_FAILED)
					throw error
				}
			}
		}
	}, [connectionStatus, flushBuffer])

	const pauseResume = useCallback(async () => {
		if (connectionStatus === CONNECTION_STATUS.PAUSED) {
			setSegment(segment + 1)
			localStorage.setItem("aq_segments", JSON.stringify(segment + 1))
			setConnectionStatus(CONNECTION_STATUS.ACQUIRING)
		} else if (connectionStatus === CONNECTION_STATUS.ACQUIRING) {
			setConnectionStatus(CONNECTION_STATUS.PAUSED)
			clearBuffer(segment)
		}
	}, [clearBuffer, connectionStatus, segment])

	const stop = useCallback(async () => {
		if (
			connectionStatus === CONNECTION_STATUS.ACQUIRING ||
			connectionStatus === CONNECTION_STATUS.PAUSED
		) {
			if (connectionStatus === CONNECTION_STATUS.ACQUIRING) {
				clearBuffer(segment)
			}

			setConnectionStatus(CONNECTION_STATUS.STOPPING)

			try {
				if (!scientisstRef.current.isIdle()) {
					await scientisstRef.current.stop()
				}
				await scientisstRef.current.disconnect()
				router.push("/summary")
			} catch (error) {
				console.error(error)
			}
		}
	}, [clearBuffer, connectionStatus, segment])

	return (
		<SenseLayout
			className="container flex flex-col items-center justify-start gap-4 p-8"
			title="Live Acquisition"
			shortTitle="Live"
			returnHref="/"
		>
			<div className="flex flex-row gap-4">
				{(connectionStatus === CONNECTION_STATUS.DISCONNECTED ||
					connectionStatus === CONNECTION_STATUS.CONNECTING ||
					connectionStatus === CONNECTION_STATUS.CONNECTION_FAILED ||
					connectionStatus === CONNECTION_STATUS.CONNECTION_LOST) && (
					<TextButton
						size={"base"}
						onClick={connect}
						disabled={
							connectionStatus === CONNECTION_STATUS.CONNECTING
						}
					>
						Connect
					</TextButton>
				)}
				{connectionStatus === CONNECTION_STATUS.CONNECTED && (
					<>
						<TextButton size={"base"} onClick={start}>
							Start
						</TextButton>
						<TextButton size={"base"} onClick={disconnect}>
							Disconnect
						</TextButton>
					</>
				)}
				{(connectionStatus === CONNECTION_STATUS.ACQUIRING ||
					connectionStatus === CONNECTION_STATUS.PAUSED) && (
					<>
						<TextButton size={"base"} onClick={pauseResume}>
							{connectionStatus === CONNECTION_STATUS.PAUSED
								? "Resume"
								: "Pause"}
						</TextButton>
						<TextButton size={"base"} onClick={stop}>
							Stop
						</TextButton>
					</>
				)}
			</div>
			{connectionStatus === CONNECTION_STATUS.CONNECTING && (
				<span>Attempting to connect...</span>
			)}
			{connectionStatus === CONNECTION_STATUS.CONNECTION_FAILED && (
				<span>Connection failed!</span>
			)}
			{connectionStatus === CONNECTION_STATUS.CONNECTION_LOST && (
				<span>Connection lost!</span>
			)}
			{connectionStatus === CONNECTION_STATUS.CONNECTION_LOST && (
				<span>Stopping acquisition...</span>
			)}
			{lastValues &&
				connectionStatus === CONNECTION_STATUS.ACQUIRING &&
				activeChannels.map(channel => {
					return (
						<span key={channel}>{`Channel ${channel}: ${
							lastValues[channel as number]
						}`}</span>
					)
				})}
		</SenseLayout>
	)
}

export default Page
