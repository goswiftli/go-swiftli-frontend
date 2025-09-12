import { Box, Button, Stack, VStack, useBreakpointValue } from '@chakra-ui/react';

import { UserInfo } from '@/features/admin-flow';
import { useToast } from '@/hooks';

import { useSetupSettings } from '../../apis';

import { useCommunicationPref } from './CommunicationPreference';
import { useSecuritySettings } from './SecuritySettings';

export const Settings = () => {
  const toast = useToast();
  const isSmallScreen = useBreakpointValue({ base: true, lg: false });
  const { securitySettings } = useSecuritySettings();
  const { communicationPreferences, settings } = useCommunicationPref();

  const setupSettingsMutation = useSetupSettings();

  const handleSettingsSetup = () => {
    const isAllSettingsFalse = Object.values(settings).every((settings) => !settings);
    if (isAllSettingsFalse) {
      toast({
        id: 'settings-comm',
        status: 'error',
        description: 'At least one communication preference must be set',
        duration: 2000,
      });
    } else {
      setupSettingsMutation.mutate(settings);
    }
  };

  return (
    <section>
      <Box minH="80vh" px={{ base: 4, md: 6, lg: 8, xl: 12 }} pb={12}>
        <VStack>
          <Stack spacing={4} w={{ base: 'full', md: '80%' }}>
            <UserInfo
              headerName="Security Settings"
              column={securitySettings}
              isStacked={isSmallScreen}
            />

            <UserInfo
              headerName="Communication Preference"
              actionItem={
                <Button
                  rounded="8px"
                  size="sm"
                  onClick={handleSettingsSetup}
                  isLoading={setupSettingsMutation.isPending}
                  _hover={{ bgColor: 'primary.800' }}
                >
                  Save
                </Button>
              }
              column={communicationPreferences}
            />
          </Stack>
        </VStack>
      </Box>
    </section>
  );
};
