import React, {
	Fragment,
	useCallback,
	useEffect,
	useRef,
	useState
} from "react"

import router from "next/router"

import { TextButton, TextField } from "@scientisst/react-ui/components/inputs"
import { FormikAutoSubmit } from "@scientisst/react-ui/components/utils"
import { useDarkTheme } from "@scientisst/react-ui/dark-theme"
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
import { Form, Formik } from "formik"
import { SemVer } from "semver"
import resolveConfig from "tailwindcss/resolveConfig"

import tailwindConfig from "../../tailwind.config"
import CanvasChart from "../components/charts/CanvasChart"
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

const fullConfig = resolveConfig(tailwindConfig)
const lineColorLight = fullConfig.theme.colors["primary-light"]
const lineColorDark = fullConfig.theme.colors["primary-dark"]
const outlineColorLight =
	fullConfig.theme.colors["over-background-highest-light"]
const outlineColorDark = fullConfig.theme.colors["over-background-highest-dark"]

const Page = () => {
	const scientisstRef = useRef(new ScientISST())
	const [connectionStatus, setConnectionStatus] = useState(
		CONNECTION_STATUS.DISCONNECTED
	)
	const [firmwareVersion, setFirmwareVersion] = useState<SemVer>(
		new SemVer("0.0.0")
	)
	const [activeChannels, setActiveChannels] = useState<CHANNEL[]>([])
	const [activeSamplingRate, setActiveSamplingRate] = useState(0)
	const [segment, setSegment] = useState(1)
	const frameSequenceRef = useRef(0)
	const connectionTimeoutRef = useRef<number | null>(null)
	const graphBufferSizeRef = useRef(0)
	const graphBufferRef = useRef<Record<CHANNEL, [number, number | null][]>>({
		[CHANNEL.AI1]: [],
		[CHANNEL.AI2]: [],
		[CHANNEL.AI3]: [],
		[CHANNEL.AI4]: [],
		[CHANNEL.AI5]: [],
		[CHANNEL.AI6]: [],
		[CHANNEL.AX1]: [],
		[CHANNEL.AX2]: [],
		[CHANNEL.I1]: [],
		[CHANNEL.I2]: [],
		[CHANNEL.O1]: [],
		[CHANNEL.O2]: []
	})
	const [xDomain, setXDomain] = useState<[number, number]>([0, 0])
	const isDark = useDarkTheme()
	const saveTimestampRef = useRef(false)

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
							if (saveTimestampRef.current) {
								saveTimestampRef.current = false

								if (segment === 1) {
									localStorage.setItem(
										`aq_seg${segment}time`,
										JSON.stringify(Date.now())
									)
								} else {
									localStorage.setItem(
										`aq_seg${segment}time`,
										JSON.stringify(
											JSON.parse(
												localStorage.getItem(
													`aq_seg1time`
												) ?? "0"
											) +
												(frameSequenceRef.current /
													activeSamplingRate) *
													1000
										)
									)
								}
							}

							appendBuffer(frames, segment, activeSamplingRate)

							for (const frame of frames) {
								for (const channel of activeChannels) {
									const analog = frame.analog[channel]

									if (analog === undefined) {
										console.log(
											"analog is undefined",
											channel,
											frame
										)
									} else {
										graphBufferRef.current[channel].push([
											frameSequenceRef.current,
											frame.analog[channel]
										])
									}

									if (
										graphBufferRef.current[channel].length >
										graphBufferSizeRef.current
									) {
										graphBufferRef.current[channel].shift()
									}
								}

								frameSequenceRef.current++

								setXDomain([
									frameSequenceRef.current -
										graphBufferSizeRef.current,
									frameSequenceRef.current
								])
							}
						} else {
							frameSequenceRef.current =
								frameSequenceRef.current + frames.length
						}
					} catch (error) {
						if (valid) {
							if (error instanceof ConnectionLostException) {
								setConnectionStatus(
									CONNECTION_STATUS.CONNECTION_LOST
								)
							} else {
								// TODO: Possibly handle this differently
								setConnectionStatus(
									CONNECTION_STATUS.CONNECTION_LOST
								)
								//throw error
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

						if (frames.length === 0) {
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
								// TODO: Possibly handle this differently
								setConnectionStatus(
									CONNECTION_STATUS.CONNECTION_LOST
								)
								//throw error
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
			}, 30000)

			try {
				await scientisstRef.current.connect(communicationMode)
				setConnectionStatus(CONNECTION_STATUS.CONNECTED)
				connectionTimeoutRef.current = connectionTimeoutRef.current + 1
				setFirmwareVersion(scientisstRef.current.getVersion())
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
			const adcCharacteristics =
				scientisstRef.current.getAdcCharacteristics()

			localStorage.setItem("aq_adcChars", adcCharacteristics.toJSON())

			channels.sort()

			setActiveChannels(channels)
			setActiveSamplingRate(sampleRate)
			graphBufferSizeRef.current = sampleRate * 5
			setSegment(1)
			saveTimestampRef.current = true
			frameSequenceRef.current = 0

			for (const key in localStorage) {
				if (key.startsWith("aq_")) {
					localStorage.removeItem(key)
				}
			}

			localStorage.setItem("aq_channels", JSON.stringify(channels))
			localStorage.setItem("aq_sampleRate", JSON.stringify(sampleRate))
			localStorage.setItem("aq_segments", JSON.stringify(1))
			localStorage.setItem("aq_gracefullyStopped", JSON.stringify(false))
			localStorage.setItem(
				"aq_seqRes",
				JSON.stringify(
					scientisstRef.current.getVersion().major < 2 ? 4 : 12
				)
			)

			for (const channel of channels) {
				localStorage.setItem(
					`aq_channelName${channel}`,
					CHANNEL[channel]
				)
			}

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
			saveTimestampRef.current = true
			for (const key in graphBufferRef.current) {
				graphBufferRef.current[key] = []
			}
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

	const xTickFormatter = useCallback(
		(value: number) => {
			const time = value / activeSamplingRate
			if (time < 0) {
				return "0:00"
			}

			const seconds = Math.floor(time % 60)
			const minutes = Math.floor(time / 60)

			if (seconds < 10) {
				return `${minutes}:0${seconds}`
			}
			return `${minutes}:${seconds}`
		},
		[activeSamplingRate]
	)

	return (
		<SenseLayout
			className="container flex flex-col items-center justify-start gap-4 p-8"
			title="Live Acquisition"
			shortTitle="Live"
			returnHref="/"
		>
			{(connectionStatus === CONNECTION_STATUS.CONNECTED ||
				connectionStatus === CONNECTION_STATUS.ACQUIRING ||
				connectionStatus === CONNECTION_STATUS.PAUSED) && (
				<span>{`Firmware version: ${firmwareVersion}`}</span>
			)}
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
			{connectionStatus === CONNECTION_STATUS.ACQUIRING && (
				<Formik
					initialValues={{
						channelName: activeChannels.reduce((acc, channel) => {
							acc[channel] = CHANNEL[channel]
							return acc
						}, {} as Record<number, string>)
					}}
					onSubmit={async values => {
						const { channelName } = values

						for (const channel of activeChannels) {
							localStorage.setItem(
								`aq_channelName${channel}`,
								channelName[channel]
							)
						}
					}}
				>
					<Form className="flex w-full flex-col gap-4">
						<FormikAutoSubmit delay={100} />
						{activeChannels.map(channel => {
							return (
								<Fragment key={channel}>
									<div className="flex w-full flex-row">
										<TextField
											id={`channelName.${channel}`}
											name={`channelName.${channel}`}
											className="mb-0"
										/>
									</div>
									<div className="bg-background-accent flex w-full flex-col rounded-md">
										<div className="w-full p-4">
											<CanvasChart
												data={
													graphBufferRef.current[
														channel
													]
												}
												xMin={xDomain[0]}
												xMax={xDomain[1]}
												className="h-64 w-full"
												fontFamily="Lexend"
												lineColor={
													isDark
														? lineColorDark
														: lineColorLight
												}
												outlineColor={
													isDark
														? outlineColorDark
														: outlineColorLight
												}
												yTicks={5}
												xTicks={5}
												xTickFormat={xTickFormatter}
											/>
										</div>
									</div>
								</Fragment>
							)
						})}
					</Form>
				</Formik>
			)}
		</SenseLayout>
	)
}

export default Page
