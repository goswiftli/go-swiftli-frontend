import { Box, Flex, HStack } from '@chakra-ui/react';
import { useState } from 'react';

import { Menu, Skeleton, Table, TableColumn } from '@/components';
import { useErrorNotification } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/redux';

import { useGetBeneficiary } from '../../apis';
import { CreateBeneficiaryDTO } from '../../types';
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

  const { isPending, isError, data: beneficiaries, error } = useGetBeneficiary(currentPage);
  const tableColumns: TableColumn<CreateBeneficiaryDTO>[] = [
    {
      title: 'Name',
      field: 'name',
    },
    {
      title: 'Account Number',
      field: 'accountNumber',
    },
    {
      title: 'Bank Name',
      field: 'bankName',
    },
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
        <Table
          columns={tableColumns}
          data={beneficiaries?.data.beneficiaries}
          currentPage={currentPage}
          handlePage={handlePage}
          emptyData={{
            title: 'No Beneficiary found',
            body: 'All Beneficiaries available will appear here',
          }}
          totalPages={1}
          uniqueKey="accountNumber"
        />
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
