import { Box, Flex, HStack } from '@chakra-ui/react';
import { ColumnDef, createColumnHelper, PaginationState } from '@tanstack/react-table';
import { useState } from 'react';

import { AppTable, Menu, Skeleton } from '@/components';
import { useErrorNotification } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/redux';

import { useGetBeneficiary } from '../../apis';
import { CreateBeneficiaryDTO } from '../../types';
import { setBeneficiaryStatusFilter, setCurrencyFilter } from '../../userFlowSlice';

export const Beneficiaries = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { beneficiaryStatus, currency } = useAppSelector((state) => state.userFlow);
  const dispatch = useAppDispatch();
  const handleBeneficiaryStatus = (value: string, name: string) => {
    dispatch(setBeneficiaryStatusFilter({ value, name }));
  };

  const handleCurrencyFilter = (value: string, name: string) => {
    dispatch(setCurrencyFilter({ value, name }));
  };

  const { isPending, isError, data: beneficiaries, error } = useGetBeneficiary(pagination);

  const tableColumnHelper = createColumnHelper<CreateBeneficiaryDTO>();

  const tableColumns: ColumnDef<CreateBeneficiaryDTO, any>[] = [
    tableColumnHelper.accessor('name', {
      id: 'name',
      cell: (info) => info.getValue(),
      header: () => <Box as="span">Name</Box>,
    }),
    tableColumnHelper.accessor('accountNumber', {
      id: 'accountNumber',
      cell: (info) => info.getValue(),
      header: () => <Box as="span">Account Number</Box>,
    }),
    tableColumnHelper.accessor('bankName', {
      id: 'bankName',
      cell: (info) => info.getValue(),
      header: () => <Box as="span">Bank Name</Box>,
    }),
  ];

  useErrorNotification({
    description: error?.message ?? 'Error fetching the list of beneficiaries',
    isError: isError,
    name: 'bene-err',
  });
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

      <Skeleton isLoading={isPending} isError={isError}>
        <Box bgColor="white">
          <AppTable
            pagination={pagination}
            setPagination={setPagination}
            columns={tableColumns}
            data={beneficiaries?.data.beneficiaries || []}
            pageCount={0}
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
