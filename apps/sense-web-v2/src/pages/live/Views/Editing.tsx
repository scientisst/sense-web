import { TextButton, TextField } from "@scientisst/react-ui/components/inputs";
import { chartStyle, loadSettings } from "../../../constants";
import ShowEvents from "../../../components/ShowEvents";
import { Fragment, useEffect } from "react";
import { Form, Formik } from "formik";
import { FormikAutoSubmit } from "@scientisst/react-ui/components/utils";
import CanvasChart from "../../../components/charts/CanvasChart";
import { useDarkTheme } from "@scientisst/react-ui/dark-theme";

const Editing = ({submit, xTickFormatter, channelsRef, graphBufferRef, xDomain, annotations, setAnnotations}) => {
    const isDark = useDarkTheme()
	const eventsLabel = loadSettings().eventsLabel 

	useEffect(() => {
		return () => {
			localStorage.setItem("aq_annotations", JSON.stringify(annotations))
		}
	}, [annotations, xDomain])

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
												data={{
													
													vector: graphBufferRef.current.map(
														x => [
															x[0],
															x[1].channels[channel]
														]
													), annotations: annotations, intervals: []
												
												}}

												domain={{left: xDomain[0], right: xDomain[1], top: 0, bottom: 0}}

												style={chartStyle(isDark)}

												yTicks={5}
												xTicks={5}
												xTickFormat={xTickFormatter}
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