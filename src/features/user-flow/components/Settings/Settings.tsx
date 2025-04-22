import { Box, Stack, VStack } from '@chakra-ui/react';

import { UserInfo } from '@/features/admin-flow';

import { useCommunicationPref } from './CommunicationPreference';
import { useSecuritySettings } from './SecuritySettings';

export const Settings = () => {
  const { securitySettings } = useSecuritySettings();
  const { communicationPreferences } = useCommunicationPref();

  return (
    <section>
      <Box minH="80vh" px={{ base: 4, md: 6, lg: 8, xl: 12 }} pb={12}>
        <VStack>
          <Stack spacing={4} w={{ base: 'full', md: '80%' }}>
            <UserInfo headerName="Security Settings" column={securitySettings} />
            <UserInfo headerName="Communication Preference" column={communicationPreferences} />
          </Stack>
        </VStack>
      </Box>
    </section>
  );
};
