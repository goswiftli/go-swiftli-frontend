import { useState } from 'react';

import { Skeleton, Table, TableColumn } from '@/components';

import { useGetBeneficiary } from '../../apis';
import { CreateBeneficiaryDTO } from '../../types';

export const Beneficiaries = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePage = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const { isPending, isError, data: beneficiaries } = useGetBeneficiary(currentPage);

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
  return (
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
  );
};
