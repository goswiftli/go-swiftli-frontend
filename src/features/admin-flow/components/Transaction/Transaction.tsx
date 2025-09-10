import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import { RefundRequests } from './RefundRequest';
import { TransactionMonitoring } from './TransactionMonitoring';

export const Transaction = () => {
  return (
    <section>
      <Box minH="100vh" px={{ base: 4, md: 6, lg: 8, xl: 12 }} overflowX="hidden" pb={10}>
        <Tabs>
          <TabList>
            <Tab
              _selected={{ color: 'primary.800', borderColor: 'primary.800' }}
              fontFamily="body"
              fontWeight="medium"
              fontSize="lg"
              color="black"
            >
              Transaction Monitoring
            </Tab>
            <Tab
              _selected={{ color: 'primary.800', borderColor: 'primary.800' }}
              fontFamily="body"
              fontWeight="medium"
              fontSize="lg"
              color="black"
            >
              Refund Requests
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <TransactionMonitoring />
            </TabPanel>
            <TabPanel>
              <RefundRequests />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </section>
  );
};
