import { TextButton, TextField } from "@scientisst/react-ui/components/inputs";
import { loadSettings } from "../../../constants";
import ShowEvents from "../../../components/ShowEvents";
import tailwindConfig from "../../../../tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";
import { useDarkTheme } from "@scientisst/react-ui/dark-theme";
import { Fragment } from "react";
import { Form, Formik } from "formik";
import { FormikAutoSubmit } from "@scientisst/react-ui/components/utils";
import CanvasChart from "../../../components/charts/CanvasChart";

const fullConfig = resolveConfig(tailwindConfig)
const lineColorLight = fullConfig.theme.colors["primary-light"]
const lineColorDark = fullConfig.theme.colors["primary-dark"]
const outlineColorLight = fullConfig.theme.colors["over-background-highest-light"]
const outlineColorDark = fullConfig.theme.colors["over-background-highest-dark"]

const Editing = ({submit, xTickFormatter, channelsRef, graphBufferRef, xDomain, annotations, setAnnotations}) => {
	const isDark = useDarkTheme()
    const eventsLabel = loadSettings().eventsLabel 

    // const annotations = JSON.parse(localStorage.getItem("aq_annotations") || "[]")
    console.log(annotations)

    return (
        <>
            <TextButton size={"base"} onClick={submit}>
                Submit
            </TextButton>

            <ShowEvents eventsLabel={eventsLabel} />

            <Formik
					initialValues={{
						channelName: channelsRef.current.reduce(
							(acc, channel) => {
								acc[channel] = channel
								return acc
							},
							{} as Record<number, string>
						)
					}}
					onSubmit={async values => {
						const { channelName } = values

						localStorage.setItem(
							"aq_channelNames",
							JSON.stringify(channelName)
						)
					}}
				>
					<Form className="flex w-full flex-col gap-4">
						<FormikAutoSubmit delay={100} />
						{channelsRef.current.map(channel => {

							return (

								<Fragment key={channel}>
									<div className="flex w-full flex-row">
										<TextField
											id={`channelName.${channel}`}
											name={`channelName.${channel}`}
											className="mb-0"
											placeholder={channel}
										/>
									</div>
									<div className="bg-background-accent flex w-full flex-col rounded-md">
										<div className="w-full p-4">
											<CanvasChart
												data={graphBufferRef.current.map(
													x => [
														x[0],
														x[1].channels[channel]
													]
												)}
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
                                                annotations={annotations}
                                                setAnnotations = {setAnnotations}
											/>
										</div>
									</div>
								</Fragment>
							)
						})}
					</Form>
            </Formik>
        </>
        
    );
}

export default Editing;