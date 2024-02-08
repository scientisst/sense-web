import { useEffect, useState } from "react"

import Image from "next/image"

import { faToolbox, faWaveSquare, faGear } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	ButtonCheckboxGroupField,
	ButtonRadioGroupField,
	ImageRadioGroupField,
	NumberField,
	TextButton
} from "@scientisst/react-ui/components/inputs"
import { FormikAutoSubmit } from "@scientisst/react-ui/components/utils"
import { SCIENTISST_COMUNICATION_MODE } from "@scientisst/sense/future"
import clsx from "clsx"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import { settingsProps, loadSettings, eventProps } from "../constants"

import CoreBottom from "../assets/boards/core-bottom.svg"
import CoreTop from "../assets/boards/core-top.svg"
import SenseLayout from "../components/layout/SenseLayout"


const Page = () => {
	const schema = Yup.object().shape({
		// deviceType: Yup.string().oneOf(["sense", "maker", "system"]).required(),
		deviceType: Yup.string().oneOf(["sense", "maker"]).required(),
		communication: Yup.number()
			.oneOf([
				SCIENTISST_COMUNICATION_MODE.WEBSOCKET,
				SCIENTISST_COMUNICATION_MODE.WEBSERIAL
			])
			.test(
				"bluetooth",
				"Bluetooth is not supported on your current browser.",
				value =>
					value !== SCIENTISST_COMUNICATION_MODE.WEBSERIAL ||
					typeof navigator.serial !== "undefined"
			)
			.required(),
		baudRate: Yup.number().when("deviceType", {
			is: "maker",
			then: Yup.number().integer().min(9600).max(115200).required()
		}),
		samplingRate: Yup.number().when("deviceType", {
			is: "sense",
			then: Yup.number().integer().min(1).max(16000).required()
		}),
		channels: Yup.array().when("deviceType", {
			is: "sense",
			then: Yup.array()
				.min(1, "You must select at least one channel")
				.required()
		}),
		events: Yup.array().when("deviceType", {
			is: "system",
			then: Yup.array().required()
		})
	})
	
	const settingsTab = () => {
	
		return (
			<ImageRadioGroupField
				label="Device Type"
				id="deviceType"
				name="deviceType"
				center
				className="w-full max-w-[29.25rem]"
				options={[
					{
						name: "Sense",
						value: "sense",
						img: (
							<FontAwesomeIcon
								icon={faWaveSquare}
								className="h-16 w-16"
							/>
						)
					},
					{
						name: "Maker",
						value: "maker",
						img: (
							<FontAwesomeIcon
								icon={faToolbox}
								className="h-16 w-16"
							/>
						)
					},
					// {
					// 	name: "System",
					// 	value: "system",
					// 	img: (
					// 		<FontAwesomeIcon
					// 			icon={faGear}
					// 			className="h-16 w-16"
					// 		/>
					// 	)
					// }
				]}
			/>
		)
	}
	
	const senseSettings = () => {
	
		const options = [
			{
				name: "AI1",
				value: "AI1"
			},
			{
				name: "AI2",
				value: "AI2"
			},
			{
				name: "AI3",
				value: "AI3"
			},
			{
				name: "AI4",
				value: "AI4"
			},
			{
				name: "AI5",
				value: "AI5"
			},
			{
				name: "AI6",
				value: "AI6"
			},
			{
				name: "AX1",
				value: "AX1"
			},
			{
				name: "AX2",
				value: "AX2"
			}
		]
	
		const image = hovered => (
			<div className="hidden gap-8 sm:flex">
				<div className="relative flex flex-col items-center">
					<div
						className={clsx(
							"border-primary absolute rounded-lg border-[3px]",
							{
								hidden:
									hovered !==
									"AI1"
							}
						)}
						style={{
							width: "4.5rem",
							height: "4.5rem",
							top: "0.25rem",
							left: "0"
						}}
					/>
					<div
						className={clsx(
							"border-primary absolute rounded-lg border-[3px]",
							{
								hidden:
									hovered !==
									"AI2"
							}
						)}
						style={{
							width: "4.5rem",
							height: "4.5rem",
							top: "calc(4.75rem - 3px)",
							left: "0"
						}}
					/>
					<div
						className={clsx(
							"border-primary absolute rounded-lg border-[3px]",
							{
								hidden:
									hovered !==
									"AI3"
							}
						)}
						style={{
							width: "4.5rem",
							height: "4.5rem",
							top: "calc(4.75rem - 3px)",
							right: "0"
						}}
					/>
					<div
						className={clsx(
							"border-primary absolute rounded-lg border-[3px]",
							{
								hidden:
									hovered !==
									"AX1"
							}
						)}
						style={{
							width: "4.5rem",
							height: "4.5rem",
							top: "0.25rem",
							right: "0"
						}}
					/>
					<Image
						src={CoreTop}
						alt=""
						className="m-2"
						style={{
							maxWidth: "16rem",
							height: "auto"
						}}
					/>
					<span className="font-secondary text-2xl">
						Top
					</span>
				</div>
				<div className="relative flex flex-col items-center">
					<div
						className={clsx(
							"border-primary absolute rounded-lg border-[3px]",
							{
								hidden:
									hovered !==
									"AI4"
							}
						)}
						style={{
							width: "4.5rem",
							height: "4.5rem",
							top: "0.25rem",
							right: "0"
						}}
					/>
					<div
						className={clsx(
							"border-primary absolute rounded-lg border-[3px]",
							{
								hidden:
									hovered !==
									"AI5"
							}
						)}
						style={{
							width: "4.5rem",
							height: "4.5rem",
							top: "calc(4.75rem - 3px)",
							left: "0"
						}}
					/>
					<div
						className={clsx(
							"border-primary absolute rounded-lg border-[3px]",
							{
								hidden:
									hovered !==
									"AI6"
							}
						)}
						style={{
							width: "4.5rem",
							height: "4.5rem",
							top: "calc(4.75rem - 3px)",
							right: "0"
						}}
					/>
					<div
						className={clsx(
							"border-primary absolute rounded-lg border-[3px]",
							{
								hidden:
									hovered !==
									"AX2"
							}
						)}
						style={{
							width: "4.5rem",
							height: "4.5rem",
							top: "0.25rem",
							left: "0"
						}}
					/>
					<Image
						src={CoreBottom}
						alt=""
						className="m-2"
						style={{
							maxWidth: "16rem",
							height: "auto"
						}}
					/>
					<span className="font-secondary text-2xl">
						Bottom
					</span>
				</div>
			</div>
		)
	
		return (
			<>
				<ButtonRadioGroupField
					label="Communication"
					id="communication"
					name="communication"
					center
					options={[
						{
							name: "Bluetooth",
							value: SCIENTISST_COMUNICATION_MODE.WEBSERIAL
						},
						{
							name: "WiFi",
							value: SCIENTISST_COMUNICATION_MODE.WEBSOCKET
						}
					]}
					className="w-full max-w-[29.25rem]"
				/>
				<NumberField
					label="Sampling Rate"
					name="samplingRate"
					id="samplingRate"
					min={1}
					max={16000}
					center
					className="w-full max-w-[29.25rem]"
				/>
				<ButtonCheckboxGroupField
					label="Channels"
					id="channels"
					name="channels"
					center
					options={options}
					image={image}
				/>
			</>)
	}
	
	const makerSettings = () => {
	
		return (
			<>
				<NumberField
					label="Baud Rate"
					name="baudRate"
					id="baudRate"
					min={0}
					max={16000}
					center
					className="w-full max-w-[29.25rem]"
				/>
			</>
		)
	}
	
	const systemSettings = (createEvent, events) => {
		console.log(events)
	
		return (
			<>
				{events.map((event, index) => (
					<div key={index}>
						<b>Event</b>: {event.name},
						<b>Color</b>: {event.color},
						<b>Key</b>: "{event.key}",
						<b>Toggle</b>: {event.toggle.toString()} {/* Convert boolean to string for display */}
					</div>
				))}
	
				<TextButton size="base" className="flex-grow" onClick={createEvent} >
					Add new event
				</TextButton>
	
				{/* <div className="flex-grow" onClick={createEvent}>
					Add new event
				</div> */}
			</>
		)
		
	}

	const [settings, setSettings] = useState<settingsProps>(loadSettings())
	const [loaded, setLoaded] = useState(false)

	useEffect(() => {
		if (typeof window !== "undefined" && !loaded) {
			setLoaded(true)

			// setSettings({
			// 	...settings,
			// 	communication:
			// 		typeof navigator.serial !== "undefined"
			// 			? SCIENTISST_COMUNICATION_MODE.WEBSERIAL
			// 			: SCIENTISST_COMUNICATION_MODE.WEBSOCKET,
			// 	...(JSON.parse(localStorage.getItem("settings") ?? "{}") || {})
			// })

		}
	}, [settings, loaded])

	const createEvent = () => {

		const newEvent: eventProps = {
			name: "New Event",
			color: "#000000",
			key: "c",
			toggle: false
		}

		setSettings(prevState => ({
			...prevState,
			events: [...prevState.eventsLabel, {...newEvent}]
		}));
	}

	return (
		<SenseLayout
			title="Sense settings"
			shortTitle="settings"
			returnHref="/"
			className="container flex flex-col items-center justify-start p-8"
			style={{
				minHeight: "calc(100vh - 18.5rem)"
			}}
		>
			{loaded && (
				<Formik
					initialValues={settings}
					validationSchema={schema}
					onSubmit={values => {
						localStorage.setItem("settings", JSON.stringify(values))
					}}
				>
					{({ values: { deviceType, eventsLabel } }) => (
						<Form className="flex w-full flex-col items-center">
							<FormikAutoSubmit delay={100} />
							
							{settingsTab()}
							{deviceType==="sense" && senseSettings()}
							{deviceType==="maker" && makerSettings()}
							{deviceType === "system" && systemSettings(createEvent, eventsLabel)}

						</Form>
					)}
				</Formik>
			)}
		</SenseLayout>
	)
}

export default Page;
