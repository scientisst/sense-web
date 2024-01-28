import { Fragment, useEffect, useState, useRef } from "react"

import { TextButton, TextField } from "@scientisst/react-ui/components/inputs"
import EventsLabel from "../../../components/ShowEvents"
import { Formik, Form } from "formik"
import { FormikAutoSubmit } from "@scientisst/react-ui/components/utils"
import CanvasChart from "../../../components/charts/CanvasChart"
import { annotationProps, chartStyle, intervalsProps as intervalProps, loadSettings } from "../../../constants"

import { useDarkTheme } from "@scientisst/react-ui/dark-theme"
import { lab } from "d3"
import { time } from "console"

const Acquiring = ({channelsRef, graphBufferRef, xTickFormatter, pause, xDomain, stop, annotations, setAnnotations, intervals, setIntervals}) => {
	const isDark = useDarkTheme()
    const eventsLabel = loadSettings().eventsLabel

	// Keep track of the pressed key and interval ID
	const [timeArray, setTimeArray] = useState(() => {
		return eventsLabel.reduce((obj, label) => {
		  obj[label.key] = null;			// Add a key for each event label initialized to null
		  return obj;
		}, {});
	});
	

    useEffect(() => {
        const handleKeyPress = (event) => {
			const pressedKey = event.key;
			const label = eventsLabel.find(label => pressedKey === label.key);

			if (timeArray[pressedKey] !== null) return;		// The pressed key is already pressed
			if (!label) return;								// The pressed key does not correspond to an event
		
			const time = xDomain[1];
	
			const newAnnotation = {
				name: label.name,
				color: label.color,
				pos: time
			};
	
			setAnnotations([...annotations, newAnnotation]);
			setTimeArray({...timeArray, [pressedKey]: time});
		};

		const handleKeyRelease = (event) => {
			const pressedKey = event.key;
		
			const startTime = timeArray[pressedKey];
			const endTime = xDomain[1];
			const duration = endTime - startTime;
			
			const oldAnnotation: annotationProps = annotations.find(annotation => annotation.pos === startTime)

			if (duration < 0) {				// Error (it should not happen)
				setTimeArray(prev => ({...prev, [pressedKey]: null}));
				console.log("Acquiring.tsx: duration < 0")
				return;
			}

			if (duration < 300) {			// Is annotation (there nothing to do)
				setTimeArray(prev => ({...prev, [pressedKey]: null}));
				return;
			}						
			
			// Is interval (remove previous annotation, and transform it into an interval)
			const newInterval: intervalProps = {
				name: oldAnnotation.name,
				start: startTime,
				end: endTime,
				color: oldAnnotation.color
			}

			setIntervals([...intervals, newInterval])
			setAnnotations(annotations.filter(annotation => annotation.pos !== startTime))
			setTimeArray(prev => ({...prev, [pressedKey]: null}));
		};

		// Add event listener on component mount
        document.addEventListener("keydown", handleKeyPress);
		document.addEventListener("keyup", handleKeyRelease);

        // Remove event listener on component unmount
		return () => {
			localStorage.setItem("aq_annotations", JSON.stringify(annotations))
			localStorage.setItem("aq_intervals", JSON.stringify(intervals))
			document.removeEventListener("keydown", handleKeyPress);
			document.removeEventListener("keyup", handleKeyRelease);
		};
    }, [annotations, intervals, xDomain]);

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
													intervals: intervals,
												}}

												domain={{left: xDomain[0], right: xDomain[1], top: 0, bottom: 0}}

												style={chartStyle(isDark)}

												yTicks={5}
												xTicks={5}
												xTickFormat={xTickFormatter}
												setAnnotations = {setAnnotations}
												setIntervals = {setIntervals}
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