import { Box } from '@chakra-ui/react';
import { ColumnDef, createColumnHelper, PaginationState } from '@tanstack/react-table';
import { useState } from 'react';

import { AppTable, Skeleton } from '@/components';

import { useGetBeneficiary } from '../../apis';
import { CreateBeneficiaryDTO } from '../../types';

export const Beneficiaries = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { isPending, isError, data: beneficiaries } = useGetBeneficiary(pagination);

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
  return (
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
  );
};
