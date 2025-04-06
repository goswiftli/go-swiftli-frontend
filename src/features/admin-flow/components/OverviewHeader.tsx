import { Box, HStack, Icon, Stack, Text } from '@chakra-ui/react';
import { RiCheckboxBlankCircleFill } from 'react-icons/ri';
import { PieChart, Pie, Cell } from 'recharts';

import { ReactComponent as ArrowIcon } from '@/assets/icons/arrow-icon.svg';
import { ReactComponent as NigeriaIcon } from '@/assets/icons/nigeria-flag.svg';
import { ReactComponent as UnitedStatesIcon } from '@/assets/icons/united-states.svg';
import { Menu } from '@/components';
import { useAppDispatch, useAppSelector } from '@/redux';

import { setTotalRevenueFilter, setTotalTranFilter } from '../adminFlowSlice';

type CustomizedLabelProps = {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  payload: {
    value: string;
  };
};

export const OverviewHeader = () => {
  const dispatch = useAppDispatch();
  const { totalRevenueFilter, totalTranFilter } = useAppSelector((state) => state.adminFlow);

  const handleTotalTranOptions = (value: string, name: string) => {
    dispatch(setTotalTranFilter({ value, name }));
  };

  const handleTotalRevenue = (value: string, name: string) => {
    dispatch(setTotalRevenueFilter({ value, name }));
  };
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    payload,
  }: CustomizedLabelProps) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) / 2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    const formattedValue = `$${payload.value.toLocaleString()}`;

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="0.75rem"
      >
        {formattedValue}
      </text>
    );
  };
  return (
    <section>
      <Box px={{ base: 4, md: 6, lg: 8, xl: 12 }}>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          flexWrap={{ base: 'nowrap', md: 'wrap', lg: 'nowrap' }}
          spacing={6}
        >
          <Box boxShadow="md" p={4} rounded="8px" w="full">
            <HStack w="full" justifyContent="space-between">
              <Box w="40px" h="34px" rounded="8px" bgColor="warning.300" />

              <HStack w="50%">
                <Icon as={UnitedStatesIcon} boxSize={7} />
                <Menu
                  menuItems={menuItems}
                  handleClick={handleTotalTranOptions}
                  selectedMenuItem={totalTranFilter.name}
                  placement="bottom"
                />
              </HStack>
            </HStack>

            <HStack alignItems="center" pt={6} justifyContent="space-between">
              <Box>
                <Text fontFamily="body" fontSize="2xl" fontWeight="semibold">
                  $500,000
                </Text>
                <Text fontFamily="body" fontSize="md" fontWeight="medium" color="black.300">
                  Total Transactions
                </Text>
              </Box>
              <HStack bgColor="success.100" rounded="full" p={1} w="60px" justifyContent="center">
                <Text fontFamily="inter" fontSize="9px" color="success.400" fontWeight="normal">
                  $200
                </Text>
                <Box>
                  <ArrowIcon />
                </Box>
              </HStack>
            </HStack>
          </Box>

          <Box boxShadow="md" p={4} rounded="8px" w="full">
            <HStack w="full" h="full" justifyContent="space-between" alignItems="start">
              <Stack spacing={3}>
                <HStack spacing={4} alignItems="start">
                  <Box w="40px" h="34px" rounded="8px" bgColor="warning.300" />

                  <PieChart height={100} width={100}>
                    <Pie
                      dataKey="value"
                      outerRadius={50}
                      innerRadius={25}
                      data={pieChartData}
                      labelLine={false}
                      label={renderCustomizedLabel}
                    >
                      {pieChartData.map((_chart, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </HStack>

                <Text fontFamily="body" fontSize="md" fontWeight="medium" color="black.300">
                  Total Revenue Earned
                </Text>
              </Stack>

              <Stack w="50%" justifyContent="space-between" h="full">
                <HStack>
                  <Icon as={UnitedStatesIcon} boxSize={7} />
                  <Menu
                    menuItems={menuItems}
                    handleClick={handleTotalRevenue}
                    selectedMenuItem={totalRevenueFilter.name}
                    placement="bottom"
                  />
                </HStack>
                <Stack>
                  {pieChartData.map((data, index) => (
                    <HStack>
                      <Icon
                        boxSize="8px"
                        as={RiCheckboxBlankCircleFill}
                        color={COLORS[index % COLORS.length]}
                      />
                      <Text fontFamily="inter" fontSize="xs">
                        {data.name}
                      </Text>
                    </HStack>
                  ))}
                </Stack>
              </Stack>
            </HStack>
          </Box>
          <Box boxShadow="md" p={4} rounded="8px" w="full">
            <Stack justifyContent="space-between" h="full">
              <HStack w="full" justifyContent="space-between">
                <Box>
                  <Text fontFamily="body" fontWeight="medium" fontSize="lg" color="black.400">
                    Today's Rate
                  </Text>
                  <Text fontFamily="body" fontWeight="medium" fontSize="md" color="black.400">
                    Check Exchange Rate
                  </Text>
                </Box>
                <Text fontFamily="body" fontWeight="medium" fontSize="lg" color="black.400">
                  24th March, 2025
                </Text>
              </HStack>

              <HStack w="full" justifyContent="space-between" spacing={4}>
                <HStack
                  p={1}
                  border="1px solid"
                  justifyContent="space-between"
                  borderColor="grey.300"
                  rounded="3px"
                  w="full"
                >
                  <Text fontFamily="body" fontWeight="medium" fontSize="lg" color="black.500">
                    1.00
                  </Text>
                  <Box
                    rounded="4px"
                    bgColor="grey.100"
                    border="1px solid"
                    borderColor="grey.300"
                    p={1}
                  >
                    <HStack>
                      <Box boxSize="22px">
                        <NigeriaIcon />
                      </Box>
                      <Text fontFamily="body" fontWeight="medium" fontSize="md" color="black.300">
                        NGN
                      </Text>
                    </HStack>
                  </Box>
                </HStack>
                <HStack
                  p={1}
                  border="1px solid"
                  justifyContent="space-between"
                  borderColor="grey.300"
                  rounded="3px"
                  w="full"
                >
                  <Text fontFamily="body" fontWeight="medium" fontSize="lg" color="black.500">
                    1678.94
                  </Text>
                  <Box
                    rounded="4px"
                    bgColor="grey.100"
                    border="1px solid"
                    borderColor="grey.300"
                    p={1}
                  >
                    <HStack>
                      <Box boxSize="22px">
                        <UnitedStatesIcon />
                      </Box>
                      <Text fontFamily="body" fontWeight="medium" fontSize="md" color="black.300">
                        USD
                      </Text>
                    </HStack>
                  </Box>
                </HStack>
              </HStack>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </section>
  );
};

const COLORS = ['#FFA81D', '#043668'];

const pieChartData = [
  {
    name: 'Process Fee',
    value: 20000,
  },
  { name: 'FX Margin', value: 20000 },
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
