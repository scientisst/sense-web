import { useEffect, useState } from "react"


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
import { Maker, SCIENTISST_COMUNICATION_MODE } from "@scientisst/sense/future"
import clsx from "clsx"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import { settingsProps, loadSettings, eventProps } from "../utils/constants"


import SenseLayout from "../components/layout/SenseLayout"
import Table from "../components/Table"
import SettingsTab from "../components/SettingsTab"
import SenseSettings from "../views/settings/SenseSettings"
import MakerSettings from "../views/settings/MakerSettings"
import SystemSettings from "../views/settings/SystemSettings"

const schema = Yup.object().shape({
	// deviceType: Yup.string().oneOf(["sense", "maker", "system"]).required(),
	deviceType: Yup.string().oneOf(["sense", "maker", "system"]).required(),
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

const Page = () => {
	const [settings, setSettings] = useState<settingsProps>(loadSettings())
	const [loaded, setLoaded] = useState(false)

	const updateSettings = (events: eventProps[]) => {
		setSettings(prev => ({ ...prev, eventsLabel: events }))
	}

	useEffect(() => {
		if (typeof window !== "undefined" && !loaded) {
			setLoaded(true)
		}
	}, [settings, loaded])

	// useEffect(() => {
	// 	return (
	// 		() => {
	// 			localStorage.setItem("settings", JSON.stringify(settings))
	// 		}
		
	// 	)
	// }, [])

	useEffect(() => {
		console.log("settings", settings)
	}, [settings])

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
					{({ values: { deviceType } }) => (
						<Form className="flex w-full flex-col items-center">
							<FormikAutoSubmit delay={100} />
							
							<SettingsTab />
							{deviceType==="sense" && <SenseSettings /> }
							{deviceType==="maker" && <MakerSettings /> }
							{deviceType === "system" && <SystemSettings events={settings.eventsLabel} updateSettings={updateSettings}/>}

						</Form>
					)}
				</Formik>
			)}
		</SenseLayout>
	)
}

export default Page;
