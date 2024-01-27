import { Fragment, useEffect, useState, useRef } from "react"

import { TextButton, TextField } from "@scientisst/react-ui/components/inputs"
import EventsLabel from "../../../components/ShowEvents"
import { Formik, Form } from "formik"
import { FormikAutoSubmit } from "@scientisst/react-ui/components/utils"
import CanvasChart from "../../../components/charts/CanvasChart"
import { annotationProps, chartStyle, loadSettings } from "../../../constants"

import { useDarkTheme } from "@scientisst/react-ui/dark-theme"

const Acquiring = ({channelsRef, graphBufferRef, xTickFormatter, pause, xDomain, stop, annotations, setAnnotations}) => {
	const isDark = useDarkTheme()
    const eventsLabel = loadSettings().eventsLabel

    // const [annotations, setAnnotations] = useState<annotationProps[]>([]);

    useEffect(() => {
        const handleKeyPress = (event) => {
            const pressedKey = event.key;

			for (const label of eventsLabel) {
				if (pressedKey === label.key) {
					const mostRightPosition = xDomain[1]; // Assuming xDomain is an array [min, max]
					const newAnnotation = {name: label.name, color: label.color, pos: mostRightPosition};
					setAnnotations([...annotations, newAnnotation]);
				}
			}

        };

		// Add event listener on component mount
        document.addEventListener("keydown", handleKeyPress);

        // Remove event listener on component unmount
		return () => {
			localStorage.setItem("aq_annotations", JSON.stringify(annotations))
			document.removeEventListener("keydown", handleKeyPress);
		};
    }, [annotations, xDomain]);

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


            <EventsLabel eventsLabel={eventsLabel}/>

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
													),
													annotations: annotations,
													intervals: []
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
    )
}

export default Acquiring