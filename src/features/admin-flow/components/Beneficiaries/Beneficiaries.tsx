import { Box, HStack, Stack } from '@chakra-ui/react';
import { ColumnDef, createColumnHelper, PaginationState } from '@tanstack/react-table';
import { useState } from 'react';

import { AppTable, Menu, SearchBox, Skeleton } from '@/components';
import { CreateBeneficiaryDTO, useGetBeneficiary } from '@/features/user-flow';
import { useAppDispatch, useAppSelector } from '@/redux';

import { setBeneficiaryDateRange, setBeneficiaryStatus } from '../../adminFlowSlice';

export const Beneficiaries = () => {
  const dispatch = useAppDispatch();
  const { beneficiaryDateRange, beneficiaryStatus } = useAppSelector((state) => state.adminFlow);

  const handleBeneficiaryStatus = (value: string, name: string) => {
    dispatch(setBeneficiaryStatus({ value, name }));
  };

  const handleBeneficiaryDateRange = (value: string, name: string) => {
    dispatch(setBeneficiaryDateRange({ value, name }));
  };

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { isPending, isError, data: beneficiaries } = useGetBeneficiary(pagination, true);

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

  // const handleViewBeneficiary = (accountNumber: string) => {
  //   console.log(accountNumber);
  // };

  // const handleDeleteBeneficiary = (accountNumber: string) => {
  //   console.log(accountNumber);
  // };

  const [searchTerm, setSearchTerm] = useState('');
  return (
    <section>
      <Box minH="100vh" px={{ base: 4, md: 6, lg: 8, xl: 12 }} overflowX="hidden">
        <Stack alignItems="end" py={4}>
          <Stack
            direction={{ base: 'column', lg: 'row' }}
            w={{ base: 'full', lg: '70%', xl: '50%' }}
            justifyContent="end"
            spacing={{ base: 4, lg: 2 }}
            pb={4}
          >
            <Box w={{ base: 'full', lg: '60%' }}>
              <SearchBox
                inputValue={searchTerm}
                setInputValue={setSearchTerm}
                placeholder="Search by transaction ID, Name"
                name="beneficiary"
              />
            </Box>
            <HStack flex={1}>
              <Box w="full">
                <Menu
                  styles={{ bgColor: 'primary.50', borderColor: 'primary.800' }}
                  menuItems={beneficiaryStatusItems}
                  handleClick={handleBeneficiaryStatus}
                  selectedMenuItem={beneficiaryStatus.name}
                  placement="bottom"
                />
              </Box>

              <Box w="full">
                <Menu
                  styles={{ bgColor: 'primary.50', borderColor: 'primary.800' }}
                  menuItems={[{ label: 'date', value: 'date' }]}
                  handleClick={handleBeneficiaryDateRange}
                  selectedMenuItem={beneficiaryDateRange.name}
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
                data={beneficiaries?.data.beneficiaries || []}
                pageCount={0}
                isServerSide
              />
            </Box>
          </Skeleton>
        </Stack>
      </Box>
    </section>
  );
};

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
