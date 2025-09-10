import { Box, HStack, Stack, Text } from '@chakra-ui/react';
import { ColumnDef, createColumnHelper, PaginationState } from '@tanstack/react-table';
import { useState } from 'react';

import { AppTable, Menu, SearchBox, Skeleton } from '@/components';
import { TransactionsDTO, useGetTransactions } from '@/features/user-flow';
import { useErrorNotification } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/redux';
import { checkStatusType, formatDate, formatNumber } from '@/utils';

import { setPaymentType, setTranDateRange, setTranStatus } from '../../adminFlowSlice';

export const TransactionMonitoring = () => {
  const dispatch = useAppDispatch();
  const { paymentType, transactionDateRange, transactionStatus } = useAppSelector(
    (state) => state.adminFlow
  );

  const handlePaymentType = (value: string, name: string) => {
    dispatch(setPaymentType({ value, name }));
  };

  const handleTranStatus = (value: string, name: string) => {
    dispatch(setTranStatus({ value, name }));
  };
  const handleTranDateRange = (value: string, name: string) => {
    dispatch(setTranDateRange({ value, name }));
  };

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { isPending, isError, error, data: transactions } = useGetTransactions(pagination, true);
  const tableColumnHelper = createColumnHelper<TransactionsDTO>();

  useErrorNotification({
    description: error?.message ?? '',
    isError: isError,
    name: 'tran-err',
  });

  const tableColumns: ColumnDef<TransactionsDTO, any>[] = [
    tableColumnHelper.accessor('amount', {
      id: 'email',
      cell: (entry) => <Text as="span">{formatNumber(entry.getValue())}</Text>,
      header: () => <Box as="span">Amount</Box>,
    }),
    tableColumnHelper.accessor('reference', {
      id: 'userType',
      cell: (info) => info.getValue(),
      header: () => <Box as="span">Transaction Reference</Box>,
    }),
    tableColumnHelper.accessor('paymentMethod', {
      id: 'gender',
      cell: (info) => info.getValue(),
      header: () => <Box as="span">Method</Box>,
    }),
    tableColumnHelper.accessor('date', {
      id: 'firstName',
      cell: (entry) => <Text as="span">{formatDate(entry.getValue()).fullDate}</Text>,
      header: () => <Box as="span">Date</Box>,
    }),
    tableColumnHelper.accessor('transactionStatus', {
      id: 'transactionStatus',
      cell: (info) => checkStatusType(info.getValue()),
      header: () => <Box as="span">Status</Box>,
    }),
  ];

  const [searchTerm, setSearchTerm] = useState('');

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
          <SearchBox
            inputValue={searchTerm}
            setInputValue={setSearchTerm}
            placeholder="Search by transaction ID, Name"
            name="tranMonitoring"
          />
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
      <Skeleton isLoading={isPending} isError={isError}>
        <Box bgColor="white">
          <AppTable
            pagination={pagination}
            setPagination={setPagination}
            columns={tableColumns}
            data={transactions?.data.transaction || []}
            pageCount={transactions?.data.totalPages ?? 0}
          />
        </Box>
      </Skeleton>
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
