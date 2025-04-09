import { Box, HStack, Icon, Stack, Text } from '@chakra-ui/react';
import { RiCheckboxBlankCircleFill } from 'react-icons/ri';
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { ChartTooltip, DataProps, Menu } from '@/components';
import { useAppDispatch, useAppSelector } from '@/redux';

import { setNoOfActiveUsersFilter } from '../../adminFlowSlice';

export const BarChartActiveUsers = () => {
  const dispatch = useAppDispatch();
  const { noOfActiveUsersFilter } = useAppSelector((state) => state.adminFlow);

  const handleNoOfActiveUsersOptions = (value: string, name: string) => {
    dispatch(setNoOfActiveUsersFilter({ value, name }));
  };

  const selectDateRange = () => {
    if (noOfActiveUsersFilter.value === 'DAILY') {
      return dailyData;
    } else {
      return weeklyData;
    }
  };

  return (
    <section>
      <Box px={{ base: 4, md: 6, lg: 8, xl: 12 }}>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          flexWrap={{ base: 'nowrap', md: 'wrap', lg: 'nowrap' }}
          spacing={6}
        >
          <Box boxShadow="md" p={4} rounded="8px" w={{ base: 'full', lg: '60%' }} bgColor="white">
            <HStack w="full" justifyContent="space-between" pb={4}>
              <Text fontFamily="body" fontWeight="medium" fontSize="lg" color="black.400">
                Number of Active Users & New Sign-ups
              </Text>
              <Box w="20%">
                <Menu
                  styles={{ h: '30px' }}
                  menuItems={menuItems}
                  handleClick={handleNoOfActiveUsersOptions}
                  selectedMenuItem={noOfActiveUsersFilter.name}
                  placement="bottom"
                />
              </Box>
            </HStack>
            <ResponsiveContainer height={200}>
              <BarChart data={selectDateRange() as any}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{
                    fontFamily: 'inter',
                    fontSize: '0.75rem',
                    fill: '#BDBDBD',
                  }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontFamily: 'inter',
                    fontSize: '0.75rem',
                    fill: '#BDBDBD',
                  }}
                />

                <Bar dataKey="activeUsers" stackId="name" fill="#FFA81D" radius={[0, 0, 10, 10]} />
                <Bar dataKey="newSignUps" stackId="name" fill="#043668" radius={[10, 10, 0, 0]} />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  content={
                    <ChartTooltip
                      data={tooltipData as DataProps[]}
                      topContent={{ title: 'Weekly', valueKey: 'name' }}
                    />
                  }
                />
              </BarChart>
            </ResponsiveContainer>
            <HStack w="full" justifyContent="end" pt={5}>
              {tooltipData.map((data) => (
                <HStack>
                  <Icon boxSize="12px" color={data.color} as={RiCheckboxBlankCircleFill} />
                  <Text fontFamily="inter" fontSize="md" color="black.400">
                    {data.title}
                  </Text>
                </HStack>
              ))}
            </HStack>
          </Box>
          <Box flex={1} boxShadow="md" p={4} rounded="8px" bgColor="white">
            <Stack justifyContent="space-between" h="full">
              <Text fontFamily="body" fontWeight="medium" fontSize="lg" color="black.400">
                Pending & Completed KYC Approvals:
              </Text>
              <Box>
                <Text fontFamily="body" textAlign="end" fontWeight="bold" fontSize="lg" pb={4}>
                  50,000 Users
                </Text>
                <ResponsiveContainer width="100%" height={65}>
                  <BarChart
                    data={kycData}
                    layout="vertical"
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                  >
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="name" hide />

                    <Bar dataKey="completed" stackId="a" fill="#FFA81D" radius={[10, 0, 0, 10]}>
                      <LabelList
                        dataKey="completed"
                        position="center"
                        fill="#fff"
                        fontSize={12}
                        formatter={(value: number) => value}
                      />
                    </Bar>

                    <Bar dataKey="pending" stackId="a" fill="#043668" radius={[0, 10, 10, 0]}>
                      <LabelList
                        dataKey="pending"
                        position="center"
                        fill="#fff"
                        fontSize={12}
                        formatter={(value: number) => value}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Box>
              <HStack justifyContent="end">
                <HStack>
                  <Icon boxSize="8px" color="primary.800" as={RiCheckboxBlankCircleFill} />
                  <Text fontFamily="inter" fontSize="md" color="black.400">
                    Completed KYC
                  </Text>
                </HStack>
                <HStack>
                  <Icon boxSize="8px" color="warning.400" as={RiCheckboxBlankCircleFill} />
                  <Text fontFamily="inter" fontSize="md" color="black.400">
                    Pending KYC
                  </Text>
                </HStack>
              </HStack>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </section>
  );
};

const tooltipData = [
  {
    title: 'Active users',
    valueKey: 'activeUsers',
    color: 'warning.400',
  },
  {
    title: 'New sign ups',
    valueKey: 'newSignUps',
    color: 'primary.800',
  },
];
const menuItems = [
  {
    label: 'Daily',
    value: 'DAILY',
  },
  {
    label: 'Monthly',
    value: 'MONTHLY',
  },
  {
    label: 'Yearly',
    value: 'YEARLY',
  },
];

const kycData = [
  {
    name: 'Users',
    completed: 150,
    pending: 50,
  },
];
const weeklyData = [
  {
    name: 'wk1',
    newSignUps: 100,
    activeUsers: 50,
  },
  {
    name: 'wk2',
    newSignUps: 30,
    activeUsers: 5,
  },
  {
    name: 'wk3',
    newSignUps: 80,
    activeUsers: 27,
  },
  {
    name: 'wk4',
    newSignUps: 120,
    activeUsers: 70,
  },
  {
    name: 'wk5',
    newSignUps: 10,
    activeUsers: 5,
  },
];

const dailyData = [
  {
    name: 'Sunday',
    newSignUps: 10,
    activeUsers: 5,
  },
  {
    name: 'Monday',
    newSignUps: 15,
    activeUsers: 5,
  },
  {
    name: 'Tuesday',
    newSignUps: 11,
    activeUsers: 7,
  },
  {
    name: 'Wednesday',
    newSignUps: 20,
    activeUsers: 10,
  },
  {
    name: 'Thursday',
    newSignUps: 12,
    activeUsers: 6,
  },
  {
    name: 'Friday',
    newSignUps: 12,
    activeUsers: 6,
  },
  {
    name: 'Saturday',
    newSignUps: 8,
    activeUsers: 3,
  },
];
