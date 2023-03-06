import { useEffect, useState } from "react"

import Image from "next/image"

import { faToolbox, faWaveSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	ButtonCheckboxGroupField,
	ButtonRadioGroupField,
	ImageRadioGroupField,
	NumberField
} from "@scientisst/react-ui/components/inputs"
import { FormikAutoSubmit } from "@scientisst/react-ui/components/utils"
import { CHANNEL, COMMUNICATION_MODE } from "@scientisst/sense/future"
import clsx from "clsx"
import { Form, Formik } from "formik"
import * as Yup from "yup"

import CoreBottom from "../assets/boards/core-bottom.svg"
import CoreTop from "../assets/boards/core-top.svg"
import SenseLayout from "../components/layout/SenseLayout"

const schema = Yup.object().shape({
	deviceType: Yup.string().oneOf(["sense", "maker"]).required(),
	communication: Yup.number()
		.oneOf([COMMUNICATION_MODE.WEB_SOCKET, COMMUNICATION_MODE.BLUETOOTH])
		.test(
			"bluetooth",
			"Bluetooth is not supported on your current browser.",
			value =>
				value !== COMMUNICATION_MODE.BLUETOOTH ||
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
	})
})

const Page = () => {
	const [loaded, setLoaded] = useState(false)
	const [defaultValues, setDefaultValues] = useState({
		deviceType: "sense",
		communication: COMMUNICATION_MODE.BLUETOOTH,
		baudRate: 115200,
		samplingRate: 1000,
		channels: [
			CHANNEL.AI1,
			CHANNEL.AI2,
			CHANNEL.AI3,
			CHANNEL.AI4,
			CHANNEL.AI5,
			CHANNEL.AI6
		]
	})

	useEffect(() => {
		if (typeof window !== "undefined" && !loaded) {
			setLoaded(true)

			setDefaultValues({
				...defaultValues,
				communication:
					typeof navigator.serial !== "undefined"
						? COMMUNICATION_MODE.BLUETOOTH
						: COMMUNICATION_MODE.WEB_SOCKET,
				...(JSON.parse(localStorage.getItem("settings") ?? "{}") || {})
			})
		}
	}, [defaultValues, loaded])

	return (
		<SenseLayout
			title="Sense Settings"
			shortTitle="Settings"
			returnHref="/"
			className="container flex flex-col items-center justify-start p-8"
			style={{
				minHeight: "calc(100vh - 18.5rem)"
			}}
		>
			{loaded && (
				<Formik
					initialValues={defaultValues}
					validationSchema={schema}
					onSubmit={values => {
						localStorage.setItem("settings", JSON.stringify(values))
					}}
				>
					{({ values: { deviceType } }) => (
						<Form className="flex w-full flex-col items-center">
							<FormikAutoSubmit delay={100} />
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
									}
								]}
							/>
							{deviceType === "sense" && (
								<>
									<ButtonRadioGroupField
										label="Communication"
										id="communication"
										name="communication"
										center
										options={[
											{
												name: "Bluetooth",
												value: COMMUNICATION_MODE.BLUETOOTH
											},
											{
												name: "WiFi",
												value: COMMUNICATION_MODE.WEB_SOCKET
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
										options={[
											{
												name: "AI1",
												value: CHANNEL.AI1
											},
											{
												name: "AI2",
												value: CHANNEL.AI2
											},
											{
												name: "AI3",
												value: CHANNEL.AI3
											},
											{
												name: "AI4",
												value: CHANNEL.AI4
											},
											{
												name: "AI5",
												value: CHANNEL.AI5
											},
											{
												name: "AI6",
												value: CHANNEL.AI6
											},
											{
												name: "AX1",
												value: CHANNEL.AX1
											},
											{
												name: "AX2",
												value: CHANNEL.AX2
											}
										]}
										image={hovered => (
											<div className="hidden gap-8 sm:flex">
												<div className="relative flex flex-col items-center">
													<div
														className={clsx(
															"border-primary absolute rounded-lg border-[3px]",
															{
																hidden:
																	hovered !==
																	CHANNEL.AI1
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
																	CHANNEL.AI2
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
																	CHANNEL.AI3
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
																	CHANNEL.AX1
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
																	CHANNEL.AI4
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
																	CHANNEL.AI5
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
																	CHANNEL.AI6
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
																	CHANNEL.AX2
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
										)}
									/>
								</>
							)}
							{deviceType === "maker" && (
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
							)}
						</Form>
					)}
				</Formik>
			)}
		</SenseLayout>
	)
}

export default Page
