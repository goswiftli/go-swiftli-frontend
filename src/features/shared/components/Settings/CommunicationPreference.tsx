import { Box, Switch, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { SkeletonCircle } from '@/components';

import { useGetSettings } from '../../apis';
import { SettingsDTO } from '../../types';

export const useCommunicationPref = () => {
  const { isPending, isError, data } = useGetSettings();

  const [settings, setSettings] = useState<SettingsDTO>({
    emailNotification: data?.data?.emailNotification ?? false,
    smsNotification: data?.data?.smsNotification ?? false,
    websiteNotification: data?.data?.websiteNotification ?? false,
  });

  useEffect(() => {
    if (data?.data) {
      setSettings((prev) => ({
        ...prev,
        emailNotification: data?.data.emailNotification ?? false,
        smsNotification: data?.data.smsNotification ?? false,
        websiteNotification: data?.data.websiteNotification ?? false,
      }));
    }
  }, [data?.data]);
  const handleToggleSettings = (key: keyof SettingsDTO) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
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
      value: (
        <SkeletonCircle
          isLoading={isPending}
          isError={isError}
          display="flex"
          justifyContent="flex-end"
        >
          <Switch
            onChange={() => handleToggleSettings('emailNotification')}
            isChecked={settings.emailNotification}
          />
        </SkeletonCircle>
      ),
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
      value: (
        <SkeletonCircle
          isLoading={isPending}
          isError={isError}
          display="flex"
          justifyContent="flex-end"
        >
          <Switch
            onChange={() => handleToggleSettings('smsNotification')}
            isChecked={settings.smsNotification}
          />
        </SkeletonCircle>
      ),
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
      value: (
        <SkeletonCircle
          isLoading={isPending}
          isError={isError}
          display="flex"
          justifyContent="flex-end"
        >
          <Switch
            onChange={() => handleToggleSettings('websiteNotification')}
            isChecked={settings.websiteNotification}
          />
        </SkeletonCircle>
      ),
    },
  ];
  return { communicationPreferences, settings };
};
