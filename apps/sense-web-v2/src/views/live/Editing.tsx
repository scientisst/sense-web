import { TextButton, TextField } from "@scientisst/react-ui/components/inputs";
import { chartStyle, loadSettings } from "../../utils/constants";
import ShowEvents from "../../components/ShowEvents";
import React, { Fragment, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { FormikAutoSubmit } from "@scientisst/react-ui/components/utils";
import CanvasChart from "../../components/CanvasChart";
import { useDarkTheme } from "@scientisst/react-ui/dark-theme";
import { Box, Button, Flex, IconButton } from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay} from "@fortawesome/free-solid-svg-icons";
import { ChannelList } from "../../utils/ChannelList";

const Editing = ({submit, xTickFormatter, channelList, data, xDomain, changeSegments, segmentCount, maxNumSegments, setChannelsList}) => {
	const eventsLabel = loadSettings().eventsLabel 
	const channels: ChannelList = channelList
	const isDark = useDarkTheme()

	const [updateCharts, setUpdateCharts] = useState(0)

	const chartUpdated = () => {
		setChannelsList(prev => {
			const updatedList = [...prev];
			// Check if the index is within bounds before updating
			if (segmentCount >= 0 && segmentCount < updatedList.length) {
				updatedList[segmentCount] = channels;
			}

			console.log("updatedList", updatedList);
			return updatedList;
		});
		setUpdateCharts(updateCharts + 1);
	};

	

    return (
        <>
            <TextButton size={"base"} onClick={submit}>
                Submit
            </TextButton>

			<span>Editing...</span>

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
					onSubmit={async values => {}}
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
												data={data.map(
													x => [ x[0], x[1].channels[channel.name]]
												)}
												channel={channel}
												channels={channels}
												domain={{left: xDomain[0], right: xDomain[1]}}
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

			<Flex alignItems={"space-around"} my={5} width={"100vw"}>
				<Box ml={"120px"} mt={3} width={"50px"} height={"100%"}>
					{segmentCount > 0 && <FontAwesomeIcon onClick={() => changeSegments("previous")} icon={faPlay} size={"2x"} style={{ color: "#f05463", transform: "scaleX(-1)", cursor: "pointer"}} />}	
				</Box>

				<ShowEvents eventsLabel={eventsLabel} style={{ margin: "0 auto" }} />
				<Box mr={"120px"} mt={3} width={"50px"} height={"100%"}>
					{segmentCount < maxNumSegments &&  <FontAwesomeIcon onClick={() => changeSegments("next")} icon={faPlay} size={"2x"} style={{ color: "#f05463", cursor: "pointer"}} />}	
				</Box>
			</Flex>
        </>
        
    );
}

export default Editing;