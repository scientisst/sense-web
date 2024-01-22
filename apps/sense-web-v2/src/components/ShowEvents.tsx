import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

const EventsLabel = ({ eventsLabel }) => {
  return (
    <Flex>
      {eventsLabel &&
        Array.isArray(eventsLabel) &&
        eventsLabel.map((event, index) => (
          <Flex
            key={index}
            alignItems="center"
            mr={4}
            mb={2}
            fontWeight="bold"
            color="gray.700"
          >
            <Box
              mr={1}
              width="10px"
              height="10px"
              borderRadius="full"
              bg={event.color || 'teal.500'}
            />
            <Box>{event.name}</Box>
            <Box ml={1}>({event.key.toUpperCase()})</Box>
          </Flex>
        ))}
    </Flex>
  );
};

export default EventsLabel;
