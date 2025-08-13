import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import { ColumnDef, createColumnHelper, PaginationState } from '@tanstack/react-table';
import { useState } from 'react';

import { AppTable, Menu, Skeleton } from '@/components';
import { useErrorNotification } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/redux';
import { checkStatusType, formatDate, formatNumber } from '@/utils';

import { useGetTransactions } from '../../apis';
import { TransactionsDTO } from '../../types';
import { setCurrencyFilter, setTranStatusFilter } from '../../userFlowSlice';

export const Transactions = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const dispatch = useAppDispatch();

  const { tranStatus, currency } = useAppSelector((state) => state.userFlow);

  const handleTranStatus = (value: string, name: string) => {
    dispatch(setTranStatusFilter({ value, name }));
  };

  const handleCurrencyFilter = (value: string, name: string) => {
    dispatch(setCurrencyFilter({ value, name }));
  };

  const { isPending, isError, error, data: transactions } = useGetTransactions(pagination);

  useErrorNotification({
    description: error?.message ?? '',
    isError: isError,
    name: 'tran-err',
  });

  const tableColumnHelper = createColumnHelper<TransactionsDTO>();

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
  return (
    <Box minH="90vh" px={{ base: 4, md: 6, lg: 8, xl: 12 }} overflowX="hidden" pb={10}>
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
            menuItems={tranStatusItems}
            handleClick={handleTranStatus}
            selectedMenuItem={tranStatus.name}
            placement="left"
          />
        </HStack>
      </Flex>

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
