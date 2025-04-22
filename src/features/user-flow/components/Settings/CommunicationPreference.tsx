import { Box, Switch, Text } from '@chakra-ui/react';

export const useCommunicationPref = () => {
  const communicationPreferences = [
    {
      name: (
        <Box fontFamily="body" fontSize="md">
          <Text color="black.300" fontWeight="light">
            Email notification
          </Text>
          <Text color="black.800">Switch on of off email notification </Text>
        </Box>
      ),
      value: <Switch />,
    },
    {
      name: (
        <Box fontFamily="body" fontSize="md">
          <Text color="black.300" fontWeight="light">
            SMS notification
          </Text>
          <Text color="black.800">Switch on of off sms notification </Text>
        </Box>
      ),
      value: <Switch />,
    },
    {
      name: (
        <Box fontFamily="body" fontSize="md">
          <Text color="black.300" fontWeight="light">
            Website notification
          </Text>
          <Text color="black.800">Switch on of off Website notification </Text>
        </Box>
      ),
      value: <Switch />,
    },
  ];
  return { communicationPreferences };
};
