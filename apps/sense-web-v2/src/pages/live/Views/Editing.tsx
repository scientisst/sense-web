import { TextButton, TextField } from "@scientisst/react-ui/components/inputs";
import { chartStyle, loadSettings } from "../../../constants";
import ShowEvents from "../../../components/ShowEvents";
import { Fragment, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { FormikAutoSubmit } from "@scientisst/react-ui/components/utils";
import CanvasChart from "../../../components/charts/CanvasChart";
import { useDarkTheme } from "@scientisst/react-ui/dark-theme";

const Editing = ({submit, xTickFormatter, channelsRef, graphBufferRef, xDomain}) => {
	const eventsLabel = loadSettings().eventsLabel 
	const channels = channelsRef.current
	const isDark = useDarkTheme()

	const [updateCharts, setUpdateCharts] = useState(0)
	const chartUpdated = () => setUpdateCharts(updateCharts + 1)

	// useEffect(() => {
	// 	return () => {
	// 		localStorage.setItem("aq_annotations", JSON.stringify(annotations))
	// 		localStorage.setItem("aq_intervals", JSON.stringify(intervals))
	// 	}
	// }, [annotations, intervals,xDomain])

    return (
        <>
            <TextButton size={"base"} onClick={submit}>
                Submit
            </TextButton>

            <ShowEvents eventsLabel={eventsLabel} />

            <Formik
					initialValues={{
						channelName: channels.names.reduce(
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
												data={{
													
													vector: graphBufferRef.current.map(
														x => [
															x[0],
															x[1].channels[channel]
														]
													)
												}}

												channel={channel}
												channels={channelsRef.current}
												domain={{left: xDomain[0], right: xDomain[1], top: 0, bottom: 0}}
												style={chartStyle(isDark)}
												yTicks={5}
												xTicks={5}
												xTickFormat={xTickFormatter}
												chartUpdated={chartUpdated}
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