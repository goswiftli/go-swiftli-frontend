import { Box, Text } from '@chakra-ui/react';
import { ColumnDef, createColumnHelper, PaginationState } from '@tanstack/react-table';
import { useState } from 'react';

import { AppTable, Skeleton } from '@/components';
import { useErrorNotification } from '@/hooks';
import { checkStatusType, formatDate, formatNumber } from '@/utils';

import { useGetTransactions } from '../../apis';
import { TransactionsDTO } from '../../types';

export const Transactions = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

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
  );
};
