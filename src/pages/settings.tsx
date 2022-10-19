import Image from "next/future/image"

import { faToolbox, faWaveSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Form, Formik, FormikHelpers, FormikValues } from "formik"
import * as Yup from "yup"

import CoreBottom from "../assets/boards/core-bottom.svg"
import CoreTop from "../assets/boards/core-top.svg"
import ButtonCheckboxGroupField from "../components/inputs/ButtonCheckboxGroupField"
import ButtonRadioGroupField from "../components/inputs/ButtonRadioGroupField"
import ImageRadioGroupField from "../components/inputs/ImageRadioGroupField"
import NumberField from "../components/inputs/NumberField"
import SenseLayout from "../components/layout/SenseLayout"
import joinClassNames from "../components/utils/joinClassNames"
import { tintToClassName } from "../components/utils/tints"

const schema = Yup.object().shape({
	address: Yup.string().url().required()
})

const Page = () => {
	return (
		<SenseLayout
			title="Sense Settings"
			shortTitle="Settings"
			returnHref="/"
			className="container flex flex-col items-center justify-center p-8"
		>
			<Formik
				initialValues={{
					address: "",
					rate: 1000,
					deviceType: "sense",
					communication: "bluetooth",
					baudRate: 9600
				}}
				validationSchema={schema}
				onSubmit={function (
					values: FormikValues,
					formikHelpers: FormikHelpers<FormikValues>
				): void | Promise<any> {
					throw new Error("Function not implemented.")
				}}
			>
				{({ values: { deviceType } }) => (
					<Form className="flex w-full flex-col items-center">
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
									name="rate"
									id="rate"
									min={0}
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
											name: "1",
											value: "AI1"
										},
										{
											name: "2",
											value: "AI2"
										},
										{
											name: "3",
											value: "AI3"
										},
										{
											name: "4",
											value: "AI4"
										},
										{
											name: "5",
											value: "AI5"
										},
										{
											name: "6",
											value: "AI6"
										},
										{
											name: "Digital",
											value: "DI"
										}
									]}
									image={hovered => (
										<div className="flex gap-8">
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
		</SenseLayout>
	)
}

export default Page
