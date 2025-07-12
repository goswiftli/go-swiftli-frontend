import { Box, HStack, Stack, Text } from '@chakra-ui/react';

import { Menu, SearchBox } from '@/components';
import { useAppDispatch, useAppSelector } from '@/redux';

import { setAccountStatusFilter, setKycStatusFilter } from '../../adminFlowSlice';

type UserHeaderProps = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

export const UserHeader = ({ searchTerm, setSearchTerm }: UserHeaderProps) => {
  const dispatch = useAppDispatch();
  const { kycStatus, accountStatus } = useAppSelector((state) => state.adminFlow);

  const handleKycStatusOptions = (value: string, name: string) => {
    dispatch(setKycStatusFilter({ value, name }));
  };

  const handleAccountStatusOptions = (value: string, name: string) => {
    dispatch(setAccountStatusFilter({ value, name }));
  };

  return (
    <Stack alignItems="end" py={4}>
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        w={{ base: 'full', lg: '70%', xl: '60%' }}
        justifyContent="end"
        spacing={{ base: 4, lg: 2 }}
      >
        <Box w={{ base: 'full', lg: '50%' }}>
          <SearchBox
            inputValue={searchTerm}
            setInputValue={setSearchTerm}
            placeholder="Search by Name, Email, Phone.."
            name="searchTerm"
          />
        </Box>
        <HStack flex={1}>
          <Box w="full">
            <Menu
              styles={{ bgColor: 'primary.50', borderColor: 'primary.800' }}
              menuItems={kycItems}
              handleClick={handleKycStatusOptions}
              selectedMenuItem={kycStatus.name}
              placement="bottom"
              menuTitle="KYC Status"
            />
          </Box>
          <Box w="full">
            <Menu
              styles={{ bgColor: 'primary.50', borderColor: 'primary.800' }}
              menuItems={accountItems}
              handleClick={handleAccountStatusOptions}
              selectedMenuItem={accountStatus.name}
              placement="left-start"
              menuTitle="User Status"
            />
          </Box>
        </HStack>
      </Stack>
      <HStack pt={2}>
        {items.map((item) => (
          <Text
            fontFamily="body"
            color="black.400"
            fontSize="md"
            fontWeight="normal"
            key={item.name}
          >
            {`${item.name}: `}
            <Text as="span" color="black.800" fontWeight="semibold">
              {item.total}
            </Text>
          </Text>
        ))}
      </HStack>
    </Stack>
  );
};

const items = [
  {
    name: 'Completed KYC',
    total: 1000,
  },
  {
    name: 'Pending KYC',
    total: 475,
  },
  {
    name: 'Total',
    total: 1475,
  },
];

const kycItems = [
  {
    label: 'Pending',
    value: 'PENDING',
  },
  {
    label: 'Approved',
    value: 'APPROVED',
  },
  {
    label: 'Rejected',
    value: 'REJECTED',
  },
];

const accountItems = [
  {
    label: 'Active',
    value: 'ACTIVE',
  },
  {
    label: 'Suspended',
    value: 'SUSPENDED',
  },
];
