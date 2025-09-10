import { Box, Button, HStack, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { ColumnDef, createColumnHelper, PaginationState } from '@tanstack/react-table';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { AppTable, Modal, Skeleton } from '@/components';
import { useErrorNotification } from '@/hooks';
import { createEncryptedUrlParams } from '@/utils';

import { useGetFx } from '../../apis';
import { Fx } from '../../types';

import { AddFx } from './AddFx';

export const ExchangeList = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const addFxOptions = useDisclosure();
  const updateFxOptions = useDisclosure();

  const { isPending, isError, data: fxRates, error } = useGetFx();

  const navigate = useNavigate();
  const handleViewFx = (fx: Fx) => {
    const encryptedParams = createEncryptedUrlParams(fx);
    navigate(`${encryptedParams}`);
    updateFxOptions.onOpen();
  };
  const tableColumnHelper = createColumnHelper<Fx>();
  const tableColumns: ColumnDef<Fx, any>[] = [
    tableColumnHelper.accessor('baseCurrency', {
      id: 'name',
      cell: (info) => info.getValue(),
      header: () => <Box as="span">Base Currency</Box>,
    }),
    tableColumnHelper.accessor('targetCurrency', {
      id: 'accountNumber',
      cell: (info) => info.getValue(),
      header: () => <Box as="span">Target Currency</Box>,
    }),
    tableColumnHelper.accessor('rate', {
      id: 'bankName',
      cell: (info) => info.getValue(),
      header: () => <Box as="span">Rate</Box>,
    }),
    tableColumnHelper.display({
      id: 'actions',
      cell: (info) => (
        <Text
          as="span"
          onClick={() => handleViewFx(info.row.original)}
          _hover={{ cursor: 'pointer' }}
        >
          Update
        </Text>
      ),
    }),
  ];

  useErrorNotification({
    description: error?.message ?? 'Error fetching the fx rates',
    isError: isError,
    name: 'fx-err',
  });
  return (
    <>
      <Modal
        id="add-fx"
        isOpen={addFxOptions.isOpen}
        onClose={addFxOptions.onClose}
        size="md"
        body={
          <AddFx
            modalOptions={{
              isOpen: addFxOptions.isOpen,
              onClose: addFxOptions.onClose,
              onOpen: addFxOptions.onOpen,
            }}
          />
        }
      />
      <Modal
        id="update-fx"
        isOpen={updateFxOptions.isOpen}
        onClose={updateFxOptions.onClose}
        size="md"
        body={
          <AddFx
            modalOptions={{
              isOpen: updateFxOptions.isOpen,
              onClose: updateFxOptions.onClose,
              onOpen: updateFxOptions.onOpen,
            }}
            isEdit
          />
        }
      />
      <Stack minH="90vh" py={6} px={{ base: 4, md: 6, lg: 8, xl: 12 }} overflowX="hidden">
        <HStack justifyContent="space-between">
          <Text fontFamily="body" fontSize="xl">
            Update and monitor live FX rates for seamless transactions
          </Text>
          <Button onClick={addFxOptions.onOpen}>Add FX</Button>
        </HStack>

        <Skeleton isLoading={isPending} isError={isError}>
          <AppTable
            pagination={pagination}
            setPagination={setPagination}
            columns={tableColumns}
            data={fxRates?.data.createFxRateResponse || []}
            isServerSide
          />
        </Skeleton>
      </Stack>
    </>
  );
};
