import { useEffect, useState } from "react"

import Image from "next/future/image"

import { faToolbox, faWaveSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Form, Formik } from "formik"
import * as Yup from "yup"

import CoreBottom from "../assets/boards/core-bottom.svg"
import CoreTop from "../assets/boards/core-top.svg"
import ButtonCheckboxGroupField from "../components/inputs/ButtonCheckboxGroupField"
import ButtonRadioGroupField from "../components/inputs/ButtonRadioGroupField"
import ImageRadioGroupField from "../components/inputs/ImageRadioGroupField"
import NumberField from "../components/inputs/NumberField"
import SenseLayout from "../components/layout/SenseLayout"
import FormikAutoSubmit from "../components/utils/FormikAutoSubmit"
import joinClassNames from "../components/utils/joinClassNames"
import { tintToClassName } from "../components/utils/tints"

const schema = Yup.object().shape({
	deviceType: Yup.string().oneOf(["sense", "maker"]).required(),
	communication: Yup.string()
		.oneOf(["wifi", "bluetooth"])
		.test(
			"bluetooth",
			"Bluetooth is not supported on your current browser.",
			value =>
				value !== "bluetooth" || typeof navigator.serial !== "undefined"
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
		communication: "bluetooth",
		baudRate: 9600,
		samplingRate: 1000,
		channels: ["AI1", "AI2", "AI3", "AI4", "AI5", "AI6"]
	})

	useEffect(() => {
		if (typeof window !== "undefined" && !loaded) {
			setLoaded(true)

			setDefaultValues({
				...defaultValues,
				communication:
					typeof navigator.serial !== "undefined"
						? "bluetooth"
						: "wifi",
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
								tint="red"
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
												value: "bluetooth"
											},
											{
												name: "WiFi",
												value: "wifi"
											}
										]}
										className="w-full max-w-[29.25rem]"
										tint="red"
									/>
									<NumberField
										label="Sampling Rate"
										name="samplingRate"
										id="samplingRate"
										min={1}
										max={16000}
										center
										className="w-full max-w-[29.25rem]"
										tint="red"
									/>
									<ButtonCheckboxGroupField
										label="Channels"
										id="channels"
										name="channels"
										center
										tint="red"
										options={[
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
												name: "Digital",
												value: "DI"
											}
										]}
										image={hovered => (
											<div className="hidden gap-8 sm:flex">
												<div className="relative flex flex-col items-center">
													<div
														className={joinClassNames(
															"absolute rounded-lg border-[3px]",
															tintToClassName[
																"border"
															]["red"],
															hovered === "AI1"
																? ""
																: "hidden"
														)}
														style={{
															width: "4.5rem",
															height: "4.5rem",
															top: "0.25rem",
															left: "0"
														}}
													/>
													<div
														className={joinClassNames(
															"absolute rounded-lg border-[3px]",
															tintToClassName[
																"border"
															]["red"],
															hovered === "AI3"
																? ""
																: "hidden"
														)}
														style={{
															width: "4.5rem",
															height: "4.5rem",
															top: "calc(4.75rem - 3px)",
															left: "0"
														}}
													/>
													<div
														className={joinClassNames(
															"absolute rounded-lg border-[3px]",
															tintToClassName[
																"border"
															]["red"],
															hovered === "AI5"
																? ""
																: "hidden"
														)}
														style={{
															width: "4.5rem",
															height: "4.5rem",
															top: "calc(4.75rem - 3px)",
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
													<span className="imagine-font text-2xl">
														Top
													</span>
												</div>
												<div className="relative flex flex-col items-center">
													<div
														className={joinClassNames(
															"absolute rounded-lg border-[3px]",
															tintToClassName[
																"border"
															]["red"],
															hovered === "AI2"
																? ""
																: "hidden"
														)}
														style={{
															width: "4.5rem",
															height: "4.5rem",
															top: "0.25rem",
															right: "0"
														}}
													/>
													<div
														className={joinClassNames(
															"absolute rounded-lg border-[3px]",
															tintToClassName[
																"border"
															]["red"],
															hovered === "AI6"
																? ""
																: "hidden"
														)}
														style={{
															width: "4.5rem",
															height: "4.5rem",
															top: "calc(4.75rem - 3px)",
															left: "0"
														}}
													/>
													<div
														className={joinClassNames(
															"absolute rounded-lg border-[3px]",
															tintToClassName[
																"border"
															]["red"],
															hovered === "AI4"
																? ""
																: "hidden"
														)}
														style={{
															width: "4.5rem",
															height: "4.5rem",
															top: "calc(4.75rem - 3px)",
															right: "0"
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
													<span className="imagine-font text-2xl">
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
										tint="red"
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
