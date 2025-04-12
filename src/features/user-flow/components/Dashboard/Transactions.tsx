import { Text } from '@chakra-ui/react';
import { useState } from 'react';

import { Table, TableColumn } from '@/components';
import { formatDate, formatNumber } from '@/utils';

import { UserTransactionDTO } from '../../types';

export const Transactions = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePage = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const tableColumns: TableColumn<UserTransactionDTO>[] = [
    {
      title: 'Amount',
      Cell: ({ entry }) => <Text as="span">{formatNumber(entry.amount)}</Text>,
    },
    {
      title: 'Transaction ID',
      field: 'transactionId',
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
    <Table
      columns={tableColumns}
      data={userTransactions}
      currentPage={currentPage}
      handlePage={handlePage}
      emptyData={{
        title: 'No Transactions found',
        body: 'All Transactions available will appear here',
      }}
      totalPages={1}
      uniqueKey="transactionId"
    />
  );
};

const userTransactions: UserTransactionDTO[] = [
  {
    amount: 15000,
    transactionId: 1001,
    method: 'Bank Transfer',
    date: '2025-09-01T09:30:00Z',
    status: 'Successful',
  },
  {
    amount: 230900,
    transactionId: 1002,
    method: 'Card Payment',
    date: '2025-09-02T12:45:00Z',
    status: 'Pending',
  },
  {
    amount: 4800,
    transactionId: 1003,
    method: 'USSD',
    date: '2025-09-03T08:10:00Z',
    status: 'Failed',
  },
  {
    amount: 6700,
    transactionId: 1004,
    method: 'Bank Transfer',
    date: '2025-09-04T15:00:00Z',
    status: 'Successful',
  },
  {
    amount: 9100,
    transactionId: 1005,
    method: 'Card Payment',
    date: '2025-09-05T14:22:00Z',
    status: 'Refunded',
  },
  {
    amount: 13500,
    transactionId: 1006,
    method: 'Bank Transfer',
    date: '2025-09-06T11:00:00Z',
    status: 'Successful',
  },
  {
    amount: 21000,
    transactionId: 1007,
    method: 'USSD',
    date: '2025-09-07T13:37:00Z',
    status: 'Successful',
  },
  {
    amount: 18500,
    transactionId: 1008,
    method: 'Card Payment',
    date: '2025-09-08T10:05:00Z',
    status: 'Pending',
  },
  {
    amount: 7200,
    transactionId: 1009,
    method: 'Bank Transfer',
    date: '2025-09-09T16:40:00Z',
    status: 'Failed',
  },
  {
    amount: 9900,
    transactionId: 1010,
    method: 'Card Payment',
    date: '2025-09-10T09:15:00Z',
    status: 'Successful',
  },
];
