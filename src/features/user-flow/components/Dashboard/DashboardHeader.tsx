import { Box, Button, HStack, Icon, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { useNavigate } from 'react-router';

import { ReactComponent as NigeriaIcon } from '@/assets/icons/nigeria-flag.svg';
import { ReactComponent as UnitedStatesIcon } from '@/assets/icons/united-states.svg';
import { LINKS } from '@/constants';
import { formatCurrency } from '@/utils';

export const DashboardHeader = () => {
  const [showBalance, setShowBalance] = useState(true);

  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };

  const dashboardItems = [
    {
      name: 'NGN Account',
      icon: NigeriaIcon,
      amount: 0,
      currency: 'NGN',
      locale: 'en-NG',
    },
    {
      name: 'USD Account',
      icon: UnitedStatesIcon,
      amount: 0,
      currency: 'USD',
      locale: 'en-US',
    },
  ];
  const navigate = useNavigate();
  return (
    <Stack spacing={10}>
      <HStack width="full" justifyContent="end" flexWrap="wrap">
        {headerButtons.map((button) => (
          <Button
            key={button.name}
            color="primary.800"
            variant="secondary"
            onClick={() => navigate(button.link)}
          >
            {button.name}
          </Button>
        ))}
      </HStack>
      <Stack direction={{ base: 'column', md: 'row' }} spacing={6}>
        {dashboardItems.map((item) => (
          <Box key={item.name} boxShadow="sm" p={4} rounded="8px" w="full" bgColor="white" p={4}>
            <Stack h="full" justifyContent="space-between">
              <HStack spacing={4}>
                <Icon as={item.icon} boxSize={6} />
                <Text fontFamily="body" fontSize="md" fontWeight="medium" color="black.300">
                  {item.name}
                </Text>
              </HStack>
              <HStack spacing={4}>
                <Text fontFamily="body" fontSize="2xl" fontWeight="medium">
                  {showBalance ? (
                    formatCurrency(item.amount, item.currency, item.locale)
                  ) : (
                    <Text as="span">*******</Text>
                  )}
                  {'   '}
                  <Text as="span" fontSize="xs" color="black" fontWeight="light">
                    ( Available Balance)
                  </Text>
                </Text>
                <Box _hover={{ cursor: 'pointer' }} onClick={toggleBalanceVisibility}>
                  <Icon
                    color="black.300"
                    as={showBalance ? IoMdEye : IoMdEyeOff}
                    aria-label={showBalance ? 'Hide balance' : 'Show balance'}
                  />
                </Box>
              </HStack>
            </Stack>
          </Box>
        ))}
        <Box boxShadow="sm" p={4} rounded="8px" w="full" bgColor="white">
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
    </Stack>
  );
};

const headerButtons = [
  {
    name: 'Complete KYC',
    link: LINKS.COMPLETE_KYC,
  },
  {
    name: 'Withdraw',
    link: LINKS.WITHDRAW,
  },
  {
    name: 'Convert Fund',
    link: LINKS.CONVERT_FUNDS,
  },
  {
    name: 'Deposit',
    link: LINKS.DEPOSIT,
  },
  {
    name: 'Make Payment',
    link: LINKS.MAKE_PAYMENT,
  },
];
