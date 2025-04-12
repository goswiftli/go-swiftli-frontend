import { Box, HStack, Icon, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { ReactComponent as EyeIcon } from '@/assets/icons/eye-icon.svg';
import { ReactComponent as LockIcon } from '@/assets/icons/lock.svg';
import { Menu, SearchBox, Table, TableColumn } from '@/components';
import { CONSTANTS } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/redux';
import { checkStatusType, formatDate } from '@/utils';

import { setPaymentType, setTranDateRange, setTranStatus } from '../../adminFlowSlice';
import { TransactionDTO } from '../../types';

export const TransactionMonitoring = () => {
  const dispatch = useAppDispatch();
  const { paymentType, transactionDateRange, transactionStatus } = useAppSelector(
    (state) => state.adminFlow
  );

  const [currentPage, setCurrentPage] = useState(0);

  const handlePage = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const handlePaymentType = (value: string, name: string) => {
    dispatch(setPaymentType({ value, name }));
  };

  const handleTranStatus = (value: string, name: string) => {
    dispatch(setTranStatus({ value, name }));
  };
  const handleTranDateRange = (value: string, name: string) => {
    dispatch(setTranDateRange({ value, name }));
  };

  const handleViewTransaction = (id: string) => {
    console.log(id);
  };

  const handleDeleteTransaction = (id: string) => {
    console.log(id);
  };
  const tableColumns: TableColumn<TransactionDTO>[] = [
    {
      title: 'Transaction ID',
      field: 'id',
    },
    {
      title: 'Name',
      field: 'name',
    },
    {
      title: 'Amount',
      Cell: ({ entry }) => <Text as="span">{entry.amount.toFixed(2)}</Text>,
    },
    {
      title: 'Payment Type',
      field: 'paymentType',
    },
    {
      title: 'Status',
      Cell: ({ entry }) => checkStatusType(entry.status),
    },
    {
      title: 'Date',
      Cell: ({ entry }) => <Text as="span">{formatDate(entry.date).dateTime}</Text>,
    },
    {
      title: 'ACTIONS',
      Cell: ({ entry }) => (
        <HStack>
          <Box onClick={() => handleViewTransaction(entry.id)} _hover={{ cursor: 'pointer' }}>
            <Icon as={EyeIcon} boxSize={8} />
          </Box>
          <Box onClick={() => handleDeleteTransaction(entry.id)} _hover={{ cursor: 'pointer' }}>
            <Icon as={LockIcon} boxSize={8} />
          </Box>
        </HStack>
      ),
    },
  ];
  return (
    <Stack alignItems="end" py={4}>
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        w={{ base: 'full', lg: '70%', xl: '60%' }}
        justifyContent="end"
        spacing={{ base: 4, lg: 2 }}
        pb={4}
      >
        <Box w={{ base: 'full', lg: '50%' }}>
          <SearchBox placeholder="Search by transaction ID, Name" />
        </Box>
        <HStack flex={1}>
          <Box w="full">
            <Menu
              styles={{ bgColor: 'primary.50', borderColor: 'primary.800' }}
              menuItems={paymentTypes}
              handleClick={handlePaymentType}
              selectedMenuItem={paymentType.name}
              placement="bottom"
            />
          </Box>
          <Box w="full">
            <Menu
              styles={{ bgColor: 'primary.50', borderColor: 'primary.800' }}
              menuItems={tranStatusItems}
              handleClick={handleTranStatus}
              selectedMenuItem={transactionStatus.name}
              placement="bottom"
            />
          </Box>
          <Box w="full">
            <Menu
              styles={{ bgColor: 'primary.50', borderColor: 'primary.800' }}
              menuItems={[{ label: 'date', value: 'date' }]}
              handleClick={handleTranDateRange}
              selectedMenuItem={transactionDateRange.name}
              placement="left-start"
            />
          </Box>
        </HStack>
      </Stack>
      <Table
        columns={tableColumns}
        data={transactions}
        currentPage={currentPage}
        handlePage={handlePage}
        emptyData={{
          title: 'No Transactions found',
          body: 'All Transactions available will appear here',
        }}
        totalPages={1}
        uniqueKey="id"
      />
    </Stack>
  );
};

const paymentTypes = [
  {
    label: 'Bank Transfer',
    value: 'BANK_TRANSFER',
  },
];

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

export const transactions: TransactionDTO[] = [
  {
    id: 'tx-001',
    name: 'John Doe',
    amount: 20000,
    paymentType: 'Card',
    status: CONSTANTS.SUCCESSFUL,
    date: '2023-10-01T10:30:00Z',
  },
  {
    id: 'tx-002',
    name: 'Jane Smith',
    amount: 15000,
    paymentType: 'Bank Transfer',
    status: CONSTANTS.PENDING,
    date: '2023-10-02T12:15:00Z',
  },
  {
    id: 'tx-003',
    name: 'Chris Johnson',
    amount: 5000,
    paymentType: 'USSD',
    status: CONSTANTS.FAILED,
    date: '2023-10-03T09:45:00Z',
  },
  {
    id: 'tx-004',
    name: 'Emily Davis',
    amount: 32000,
    paymentType: 'Wallet',
    status: CONSTANTS.SUCCESSFUL,
    date: '2023-10-04T14:00:00Z',
  },
  {
    id: 'tx-005',
    name: 'Michael Brown',
    amount: 22000,
    paymentType: 'Card',
    status: CONSTANTS.REFUNDED,
    date: '2023-10-05T11:30:00Z',
  },
  {
    id: 'tx-006',
    name: 'Olivia Wilson',
    amount: 17500,
    paymentType: 'Bank Transfer',
    status: CONSTANTS.SUCCESSFUL,
    date: '2023-10-06T16:20:00Z',
  },
  {
    id: 'tx-007',
    name: 'Daniel Lee',
    amount: 7000,
    paymentType: 'USSD',
    status: CONSTANTS.PENDING,
    date: '2023-10-07T13:10:00Z',
  },
  {
    id: 'tx-008',
    name: 'Sophia Martinez',
    amount: 27000,
    paymentType: 'Wallet',
    status: CONSTANTS.FAILED,
    date: '2023-10-08T08:40:00Z',
  },
  {
    id: 'tx-009',
    name: 'James Anderson',
    amount: 30000,
    paymentType: 'Card',
    status: CONSTANTS.SUCCESSFUL,
    date: '2023-10-09T17:25:00Z',
  },
  {
    id: 'tx-010',
    name: 'Ava Thomas',
    amount: 12500,
    paymentType: 'Bank Transfer',
    status: CONSTANTS.REFUNDED,
    date: '2023-10-10T15:55:00Z',
  },
];
