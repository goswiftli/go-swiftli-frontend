import {
  Box,
  HStack,
  Icon,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { HiOutlinePlusSmall } from 'react-icons/hi2';
import { useNavigate } from 'react-router';

import { Menu } from '@/components';
import { LINKS } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/redux';

import { setBeneficiaryStatusFilter, setTranStatusFilter } from '../../userFlowSlice';

import { Beneficiaries } from './Beneficiaries';
import { DashboardHeader } from './DashboardHeader';
import { Transactions } from './Transactions';

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { tranStatus, beneficiaryStatus } = useAppSelector((state) => state.userFlow);

  const handleTranStatus = (value: string, name: string) => {
    dispatch(setTranStatusFilter({ value, name }));
  };
  const handleBeneficiaryStatus = (value: string, name: string) => {
    dispatch(setBeneficiaryStatusFilter({ value, name }));
  };
  return (
    <section>
      <Box minH="90vh" px={{ base: 4, md: 6, lg: 8, xl: 12 }} overflow="hidden" pb={10}>
        <Stack py={4} spacing={10}>
          <DashboardHeader />
          <Tabs index={activeTab} onChange={(index) => setActiveTab(index)}>
            <TabList as={HStack} justifyContent="space-between">
              <HStack>
                <Tab
                  _selected={{ color: 'primary.800', borderColor: 'primary.800' }}
                  fontFamily="body"
                  fontWeight="medium"
                  fontSize="lg"
                  color="black"
                >
                  Transactions
                </Tab>

                <Tab
                  _selected={{ color: 'primary.800', borderColor: 'primary.800' }}
                  fontFamily="body"
                  fontWeight="medium"
                  fontSize="lg"
                  color="black"
                >
                  Beneficiaries
                </Tab>
              </HStack>
              <HStack justifyContent="flex-end" pb={2}>
                <HStack
                  w="full"
                  _hover={{ cursor: 'pointer' }}
                  display={activeTab === 1 ? 'flex' : 'none'}
                  onClick={() => navigate(LINKS.ADD_BENEFICIARY)}
                >
                  <Icon as={HiOutlinePlusSmall} />
                  <Text w="max-content" fontSize="md" color="primary.800" fontWeight="medium">
                    Add Beneficiary
                  </Text>
                </HStack>
                <Box w="full">
                  <Menu
                    styles={{ bgColor: 'primary.50', borderColor: 'primary.800' }}
                    menuItems={tranStatusItems}
                    handleClick={handleTranStatus}
                    selectedMenuItem={tranStatus.name}
                    placement="left"
                  />
                </Box>
                <Box w="full">
                  <Menu
                    styles={{ bgColor: 'primary.50', borderColor: 'primary.800' }}
                    menuItems={beneficiaryStatusItems}
                    handleClick={handleBeneficiaryStatus}
                    selectedMenuItem={beneficiaryStatus.name}
                    placement="left"
                  />
                </Box>
              </HStack>
            </TabList>

            <TabPanels>
              <TabPanel px={0}>
                <Transactions />
              </TabPanel>
              <TabPanel px={0}>
                <Beneficiaries />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Box>
    </section>
  );
};

const tranStatusItems = [
  {
    label: 'Successful',
    value: 'SUCCESSFUL',
  },
  {
    label: 'Pending',
    value: 'PENDING',
  },
  {
    label: 'Failed',
    value: 'FAILED',
  },
  {
    label: 'Refunded',
    value: 'REFUNDED',
  },
];

const beneficiaryStatusItems = [
  {
    label: 'Active',
    value: 'ACTIVE',
  },
  {
    label: 'Blacklisted',
    value: 'BLACKLISTED',
  },
];
