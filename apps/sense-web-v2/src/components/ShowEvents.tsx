import { Box, Center, Flex } from '@chakra-ui/react';
import React from 'react';

const EventsLabel = ({ eventsLabel, style }) => {

	const toggleEvents = eventsLabel.filter(event => event.toggle);
	const holdEvents = eventsLabel.filter(event => !event.toggle);


	const transformIntoJsx = (events, label) => {
		if (events.length === 0) return null;

		const eventsJsx = events.map((event, index) => (
			<Flex key={index} alignItems="center" mr={4} fontWeight="bold" color="gray.700">
				<Box alignItems="center" mr={1} width="10px" height="10px" borderRadius="full" bg={event.color || 'teal.500'}/>
				<Box alignItems="center" textUnderlineOffset={1}>{event.name}</Box>
				<Box alignItems="center" ml={1}>({event.key.toUpperCase()})</Box>
			</Flex>
		))
		
		return (
			<Flex alignItems={"center"} my={1}>
				<Box mr={3} alignItems={"center"} fontWeight={500} textUnderlineOffset={1}>{label}</Box>
				{...eventsJsx}
			</Flex>
		)
		
	}

	return (
		<Flex direction={"column"} alignItems={"center"} style={style}>
			{transformIntoJsx(holdEvents, "Hold:")}
			{transformIntoJsx(toggleEvents, "Toggle:")}
		</Flex>
	);

}

export default EventsLabel;
