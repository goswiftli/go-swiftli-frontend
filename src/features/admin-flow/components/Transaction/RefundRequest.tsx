import { Box, HStack, Icon, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { ReactComponent as EyeIcon } from '@/assets/icons/eye-icon.svg';
import { ReactComponent as LockIcon } from '@/assets/icons/lock.svg';
import { Menu, SearchBox, Table, TableColumn } from '@/components';
import { CONSTANTS } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/redux';
import { checkStatusType } from '@/utils';

import { setRefundStatus } from '../../adminFlowSlice';
import { RefundRequestDTO } from '../../types';

export const RefundRequests = () => {
  const dispatch = useAppDispatch();
  const { refundStatus } = useAppSelector((state) => state.adminFlow);

  const [currentPage, setCurrentPage] = useState(0);

  const handlePage = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const handleRefundStatus = (value: string, name: string) => {
    dispatch(setRefundStatus({ value, name }));
  };

  const handleViewRefundRequest = (id: number) => {
    console.log(id);
  };

  const handleDeleteRefundRequest = (id: number) => {
    console.log(id);
  };

  const tableColumns: TableColumn<RefundRequestDTO>[] = [
    {
      title: 'Transaction ID',
      field: 'transactionId',
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
      title: 'Reason',
      field: 'reason',
    },
    {
      title: 'Status',
      Cell: ({ entry }) => checkStatusType(entry.status),
    },
    {
      title: 'ACTIONS',
      Cell: ({ entry }) => (
        <HStack>
          <Box
            onClick={() => handleViewRefundRequest(entry.transactionId)}
            _hover={{ cursor: 'pointer' }}
          >
            <Icon as={EyeIcon} boxSize={8} />
          </Box>
          <Box
            onClick={() => handleDeleteRefundRequest(entry.transactionId)}
            _hover={{ cursor: 'pointer' }}
          >
            <Icon as={LockIcon} boxSize={8} />
          </Box>
        </HStack>
      ),
    },
  ];
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Stack alignItems="end" py={4}>
      <HStack
        w={{ base: 'full', lg: '50%', xl: '40%' }}
        justifyContent="end"
        spacing={{ base: 4, lg: 2 }}
        pb={4}
      >
        <Box w={{ base: '60%', lg: '70%' }}>
          <SearchBox
            inputValue={searchTerm}
            setInputValue={setSearchTerm}
            placeholder="Search by transaction ID, Name"
            name="refundRequest"
          />
        </Box>
        <HStack flex={1}>
          <Box w="full">
            <Menu
              styles={{ bgColor: 'primary.50', borderColor: 'primary.800' }}
              menuItems={refundStatusItems}
              handleClick={handleRefundStatus}
              selectedMenuItem={refundStatus.name}
              placement="bottom"
            />
          </Box>
        </HStack>
      </HStack>
      <Table
        columns={tableColumns}
        data={refundRequests}
        currentPage={currentPage}
        handlePage={handlePage}
        emptyData={{
          title: 'No Refund Requests found',
          body: 'All Refund requests available will appear here',
        }}
        totalPages={1}
        uniqueKey="transactionId"
      />
    </Stack>
  );
};

const refundStatusItems = [
  {
    label: 'Approved',
    value: 'APPROVED',
  },
  {
    label: 'Declined',
    value: 'DECLINED',
  },
  {
    label: 'Refunded',
    value: 'REFUNDED',
  },
];

const refundRequests: RefundRequestDTO[] = [
  {
    transactionId: 1001,
    name: 'Alice Johnson',
    amount: 250.75,
    reason: 'Duplicate charge',
    status: CONSTANTS.APPROVED,
  },
  {
    transactionId: 1002,
    name: 'Bob Smith',
    amount: 89.99,
    reason: 'Service not delivered',
    status: CONSTANTS.REFUNDED,
  },
  {
    transactionId: 1003,
    name: 'Cynthia Lee',
    amount: 45.0,
    reason: 'Wrong amount charged',
    status: CONSTANTS.DECLINED,
  },
  {
    transactionId: 1004,
    name: 'Daniel Kim',
    amount: 120.5,
    reason: 'Cancelled order',
    status: CONSTANTS.APPROVED,
  },
  {
    transactionId: 1005,
    name: 'Eve Martinez',
    amount: 300.0,
    reason: 'Late delivery',
    status: CONSTANTS.REFUNDED,
  },
  {
    transactionId: 1006,
    name: 'Frank Zhao',
    amount: 55.25,
    reason: 'Item not received',
    status: CONSTANTS.APPROVED,
  },
  {
    transactionId: 1007,
    name: 'Grace Newton',
    amount: 199.99,
    reason: 'Accidental purchase',
    status: CONSTANTS.DECLINED,
  },
  {
    transactionId: 1008,
    name: 'Henry Osei',
    amount: 15.5,
    reason: 'Subscription issue',
    status: CONSTANTS.REFUNDED,
  },
  {
    transactionId: 1009,
    name: 'Ivy Nwankwo',
    amount: 85.0,
    reason: 'Wrong item sent',
    status: CONSTANTS.APPROVED,
  },
  {
    transactionId: 1010,
    name: 'Jake Mensah',
    amount: 60.6,
    reason: 'Refund requested by support',
    status: CONSTANTS.REFUNDED,
  },
];
