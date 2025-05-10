import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { Menu, Table, TableColumn } from '@/components';
import { useAppDispatch, useAppSelector } from '@/redux';
import { formatDate } from '@/utils';

import { UserBeneficiaryDTO } from '../../types';
import { setBeneficiaryStatusFilter, setCurrencyFilter } from '../../userFlowSlice';

export const Beneficiaries = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePage = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const { beneficiaryStatus, currency } = useAppSelector((state) => state.userFlow);
  const dispatch = useAppDispatch();
  const handleBeneficiaryStatus = (value: string, name: string) => {
    dispatch(setBeneficiaryStatusFilter({ value, name }));
  };

  const handleCurrencyFilter = (value: string, name: string) => {
    dispatch(setCurrencyFilter({ value, name }));
  };
  const tableColumns: TableColumn<UserBeneficiaryDTO>[] = [
    {
      title: 'Name',
      field: 'name',
    },
    {
      title: 'Account Number',
      field: 'accountNumber',
    },
    {
      title: 'Method',
      field: 'method',
    },
    {
      title: 'Date',
      Cell: ({ entry }) => <Text as="span">{formatDate(entry.date).fullDate}</Text>,
    },
    {
      title: 'Status',
      field: 'status',
    },
  ];
  return (
    <Box minH="90vh" px={{ base: 4, md: 6, lg: 8, xl: 12 }} overflowX="hidden">
      <Flex justifyContent="end" pt={10}>
        <HStack w="30%" pb={4}>
          <Menu
            styles={{ bgColor: 'primary.50', borderColor: 'primary.800' }}
            menuItems={currencyFilter}
            handleClick={handleCurrencyFilter}
            selectedMenuItem={currency.name}
            placement="bottom"
          />
          <Menu
            styles={{ bgColor: 'primary.50', borderColor: 'primary.800' }}
            menuItems={beneficiaryStatusItems}
            handleClick={handleBeneficiaryStatus}
            selectedMenuItem={beneficiaryStatus.name}
            placement="left"
          />
        </HStack>
      </Flex>

      <Table
        columns={tableColumns}
        data={userBeneficiaries}
        currentPage={currentPage}
        handlePage={handlePage}
        emptyData={{
          title: 'No Beneficiary found',
          body: 'All Beneficiaries available will appear here',
        }}
        totalPages={1}
        uniqueKey="accountNumber"
      />
    </Box>
  );
};

const currencyFilter = [
  {
    label: 'Naira',
    value: 'NGN',
  },
  {
    label: 'Dollar',
    value: 'USD',
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

const userBeneficiaries: UserBeneficiaryDTO[] = [
  {
    name: 'Ada Obi',
    accountNumber: '0123456789',
    method: 'Bank Transfer',
    date: '2025-09-01T09:30:00Z',
    status: 'Active',
  },
  {
    name: 'John Doe',
    accountNumber: '1234567890',
    method: 'Card Payment',
    date: '2025-09-02T12:45:00Z',
    status: 'Blacklisted',
  },
  {
    name: 'Lola Adebayo',
    accountNumber: '2345678901',
    method: 'USSD',
    date: '2025-09-03T08:10:00Z',
    status: 'Active',
  },
  {
    name: 'Chidi Nwosu',
    accountNumber: '3456789012',
    method: 'Bank Transfer',
    date: '2025-09-04T15:00:00Z',
    status: 'Active',
  },
  {
    name: 'Fatima Yusuf',
    accountNumber: '4567890123',
    method: 'Card Payment',
    date: '2025-09-05T14:22:00Z',
    status: 'Blacklisted',
  },
  {
    name: 'Tunde Akande',
    accountNumber: '5678901234',
    method: 'Bank Transfer',
    date: '2025-09-06T11:00:00Z',
    status: 'Active',
  },
  {
    name: 'Zainab Bello',
    accountNumber: '6789012345',
    method: 'Bank Transfer',
    date: '2025-09-07T13:37:00Z',
    status: 'Active',
  },
  {
    name: 'Michael Eze',
    accountNumber: '7890123456',
    method: 'Card Payment',
    date: '2025-09-08T10:05:00Z',
    status: 'Blacklisted',
  },
  {
    name: 'Amina Sule',
    accountNumber: '8901234567',
    method: 'USSD',
    date: '2025-09-09T16:40:00Z',
    status: 'Active',
  },
  {
    name: 'Emeka Okafor',
    accountNumber: '9012345678',
    method: 'Bank Transfer',
    date: '2025-09-10T09:15:00Z',
    status: 'Blacklisted',
  },
];
