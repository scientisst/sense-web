import { Fragment, useEffect, useState } from "react"

import { Box } from "@chakra-ui/react"
import { TextButton, TextField } from "@scientisst/react-ui/components/inputs"
import { FormikAutoSubmit } from "@scientisst/react-ui/components/utils"
import { useDarkTheme } from "@scientisst/react-ui/dark-theme"
import { Form, Formik } from "formik"

import CanvasChart from "../../components/CanvasChart"
import ShowEvents from "../../components/ShowEvents"
import { useSettings } from "../../context/SettingsContext"
import { ChannelList } from "../../utils/ChannelList"
import {
	annotationProps,
	chartStyle,
	intervalsProps as intervalProps
} from "../../utils/constants"
import { DEBUG } from "../../utils/constants"

const Acquiring = ({
	channelList,
	graphBufferRef,
	xTickFormatter,
	pause,
	xDomain,
	stop,
	sampleRate
}) => {
	const { settings } = useSettings()
	const channels: ChannelList = channelList
	const isDark = useDarkTheme()

	const [timeArray, setTimeArray] = useState({})
	const [pressedKeys, setPressedKeys] = useState([])

	// Create Annotations and Intervals
	useEffect(() => {
		const createAnnotation = (pressedKey, label) => {
			const time = xDomain[1]

			const newAnnotation = {
				name: label.name,
				color: label.color,
				pos: time
			}

			channels.createAnnotationAllChannels(newAnnotation)
			setTimeArray({ ...timeArray, [pressedKey]: time })
		}

		const createInterval = pressedKey => {
			const startTime = timeArray[pressedKey]
			const endTime = xDomain[1]
			const duration = endTime - startTime

			const oldAnnotation: annotationProps =
				channels.getAnnotation(startTime)
			if (oldAnnotation === undefined) return // Should not happen

			if (duration < 0) {
				// Error (it should not happen)
				if (DEBUG) console.log("Acquiring.tsx: duration < 0")
				setTimeArray(prev => ({ ...prev, [pressedKey]: null }))
				return
			}

			if (duration < (300 * sampleRate) / 1000) {
				// Is annotation (there nothing to do)
				setTimeArray(prev => ({ ...prev, [pressedKey]: null }))
				return
			}

			// Is interval (remove previous annotation, and transform it into an interval)
			const newInterval: intervalProps = {
				name: oldAnnotation.name,
				start: startTime,
				end: endTime,
				color: oldAnnotation.color
			}

			channels.removeAnnotationAllChannels(oldAnnotation)
			channels.createIntervalAllChannels(newInterval)
			setTimeArray(prev => ({ ...prev, [pressedKey]: null }))
		}

		const handleKeyPress = event => {
			const pressedKey = event.key

			if (pressedKeys[pressedKey] === true) {
				// Returns if the key is hold
				return
			} else {
				setPressedKeys({ ...pressedKeys, [pressedKey]: true })
			}

			const label = settings.eventsLabel.find(
				label => pressedKey === label.key
			)

			if (!label) return // The pressed key does not correspond to an event

			if (!timeArray[pressedKey]) {
				// If it's not a toggle event or it's the first part of an toggle event
				createAnnotation(pressedKey, label)
			}

			if (timeArray[pressedKey] && label.toggle === "true") {
				// If it's a toggle event and it's the second part of it
				createInterval(pressedKey)
			}
		}

		const handleKeyRelease = event => {
			const pressedKey = event.key
			setPressedKeys({ ...pressedKeys, [pressedKey]: false })

			const eventLabel = settings.eventsLabel.find(
				label => pressedKey === label.key
			)
			if (!eventLabel || eventLabel.toggle === "true") return // If it's an toggle event, don't do anything

			createInterval(pressedKey)
		}

		// Add event listener on component mount
		document.addEventListener("keydown", handleKeyPress)
		document.addEventListener("keyup", handleKeyRelease)

		// Remove event listener on component unmount
		return () => {
			document.removeEventListener("keydown", handleKeyPress)
			document.removeEventListener("keyup", handleKeyRelease)
		}
	}, [
		channels,
		xDomain,
		sampleRate,
		settings.eventsLabel,
		pressedKeys,
		timeArray
	])
	// }, [channels, xDomain])

	return (
		<>
			<div className="flex flex-row gap-4">
				<TextButton size={"base"} onClick={pause}>
					{"Pause"}
				</TextButton>
				<TextButton size={"base"} onClick={stop}>
					Stop
				</TextButton>
			</div>

			<span>Acquiring...</span>

			<Box alignItems={"center"} my={5}>
				<ShowEvents eventsLabel={settings.eventsLabel} style={{}} />
			</Box>

			<Formik
				initialValues={{
					channelName: channels.names.reduce((acc, channel) => {
						acc[channel] = channel
						return acc
					}, {} as Record<number, string>)
				}}
				onSubmit={async values => {
					console.log(values)
				}}
			>
				<Form className="flex w-full flex-col gap-4">
					<FormikAutoSubmit delay={100} />
					{channels.getAllChannels().map(channel => {
						return (
							<Fragment key={channel.name}>
								<div className="flex w-full flex-row">
									<TextField
										id={`channelName.${channel.name}`}
										name={`channelName.${channel.name}`}
										className="mb-0"
										placeholder={channel.name}
									/>
								</div>
								<div className="bg-background-accent flex w-full flex-col rounded-md">
									<div className="w-full p-4">
										<CanvasChart
											data={graphBufferRef.current.map(
												x => [
													x[0],
													x[1].channels[channel.name]
												]
											)}
											channel={channel}
											channels={channels}
											domain={{
												left: xDomain[0],
												right: xDomain[1]
											}}
											style={chartStyle(isDark)}
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
		</>
	)
}

export default Acquiring
