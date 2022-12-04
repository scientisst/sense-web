import { useEffect, useRef, useState } from "react"

import { TextButton } from "@scientisst/react-ui/components/inputs"
import { useLiveD3Chart } from "@scientisst/react-ui/hooks"
import {
	CHANNEL,
	COMMUNICATION_MODE,
	ConnectionFailedException,
	ConnectionLostException,
	ScientISST,
	UserCancelledException
} from "@scientisst/sense/future"

import CanvasChart from "../components/charts/CanvasChart"
import SenseLayout from "../components/layout/SenseLayout"

const p = {
	className: "w-full h-96",
	fontFamily: "Lexend"
}

const Page = () => {
	const scientisstRef = useRef(new ScientISST())

	const [isConnected, setIsConnected] = useState(false)
	const [isConnecting, setIsConnecting] = useState(false)
	const [hasConnectionFailed, setHasConnectionFailed] = useState(false)
	const [isAcquiring, setIsAcquiring] = useState(false)
	const [hasLostConnection, setHasLostConnection] = useState(false)

	const [channel1, setChannel1] = useState(0)
	const [channel2, setChannel2] = useState(0)
	const [channel3, setChannel3] = useState(0)

	const sequenceRef = useRef(0)

	useEffect(() => {
		if (isAcquiring) {
			let work = true

			new Promise(async resolve => {
				while (work && scientisstRef.current.isConnected) {
					try {
						const data = await scientisstRef.current.readFrames(20)
						if (data.length === 0) {
							break
						}
						setChannel1(data[data.length - 1].analog[CHANNEL.AI1])
						setChannel2(data[data.length - 1].analog[CHANNEL.AI2])
						setChannel3(data[data.length - 1].analog[CHANNEL.AI3])

						const d: Array<[number, number | null]> = []

						let sequence = sequenceRef.current

						for (let i = 0; i < data.length; i++) {
							const analog = data[i].analog[CHANNEL.AI1]

							sequence++
							d.push([sequence, analog])
						}

						sequenceRef.current = sequence

						// appendData(d)
						break
					} catch (e) {
						if (e instanceof ConnectionLostException) {
							if (isAcquiring) {
								setHasLostConnection(true)
								setIsAcquiring(false)
								setIsConnected(false)
							}
							break
						}
						throw e
					}
				}

				resolve(undefined)
			})

			return () => {
				work = false
			}
		}
	}, [isAcquiring])

	return (
		<SenseLayout
			className="container flex flex-col items-center justify-start gap-8 py-8 px-8"
			title="Live Acquisition"
			shortTitle="Live"
			returnHref="/"
			style={{
				minHeight: "calc(100vh - 18.5rem)"
			}}
		>
			{!isConnected ? (
				<TextButton
					size="base"
					onClick={async () => {
						if (!isConnecting) {
							setIsConnecting(true)
							setHasConnectionFailed(false)
							setHasLostConnection(false)

							try {
								await scientisstRef.current.connect(
									COMMUNICATION_MODE.BLUETOOTH
								)
								setIsConnected(true)
								setIsConnecting(false)
							} catch (error) {
								if (error instanceof UserCancelledException) {
									setIsConnecting(false)
								} else if (
									error instanceof ConnectionFailedException
								) {
									setIsConnecting(false)
									setHasConnectionFailed(true)
								}
							}
						}
					}}
				>
					Connect
				</TextButton>
			) : null}
			{isConnected ? (
				<>
					<TextButton
						size="base"
						onClick={async () => {
							if (!isAcquiring) {
								try {
									await scientisstRef.current.start(
										[CHANNEL.AI1, CHANNEL.AI2, CHANNEL.AI3],
										1000,
										true
									)
									setIsAcquiring(true)
								} catch (error) {
									console.log(error)
									setIsConnected(false)
								}
							} else {
								try {
									await scientisstRef.current.stop()
									await scientisstRef.current.disconnect()
								} catch (error) {
									console.log(error)
								}
								setIsConnected(false)
								setIsAcquiring(false)
							}
						}}
					>
						{isAcquiring ? "Stop" : "Start"} Acquisition
					</TextButton>
					{!isAcquiring && (
						<TextButton
							size="base"
							onClick={async () => {
								try {
									if (!scientisstRef.current.isIdle()) {
										await scientisstRef.current.stop()
									}
									await scientisstRef.current.disconnect()
								} catch (error) {
									console.log(error)
								}
								setIsConnected(false)
							}}
						>
							Disconnect
						</TextButton>
					)}
				</>
			) : null}
			{isConnected ? <span>Connected!</span> : null}
			{isConnecting ? <span>Connecting...</span> : null}
			{hasConnectionFailed ? <span>Connection lost!</span> : null}
			{hasConnectionFailed && !isConnected ? (
				<span>Connection failed!</span>
			) : null}

			{isAcquiring ? (
				<>
					<span>Channel 1: {channel1}</span>
					<span>Channel 2: {channel2}</span>
					<span>Channel 3: {channel3}</span>
				</>
			) : null}
			<CanvasChart
				className="h-96 w-full"
				data={[
					[0, 1],
					[1, 2],
					[2, 0]
				]}
			/>
			<div className="h-[20rem] w-full"></div>
		</SenseLayout>
	)
}

export default Page
