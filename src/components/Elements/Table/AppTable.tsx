import {
  Box,
  Center,
  Icon,
  Stack,
  Table as ChakraTable,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  type PaginationState,
  useReactTable,
} from '@tanstack/react-table';
import { PiSealWarningFill } from 'react-icons/pi';

import { scrollbarSx } from './Table';
import { TableFooter } from './TableFooter';

interface IAppTable<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  pagination: PaginationState;
  pageCount?: number;
  totalItems?: number;
  isServerSide?: boolean;
}

export function AppTable<TData, TValue>({
  columns,
  data,
  setPagination,
  pageCount,
  pagination,
  totalItems,
  isServerSide = false,
}: IAppTable<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    debugTable: true,
    state: {
      pagination,
    },
    manualPagination: isServerSide,
    pageCount: isServerSide ? pageCount : undefined,
  });

  const actualTotalItems = totalItems ?? data.length;

  if (!data?.length) {
    return (
      <Stack width="100%" justifyContent="center" alignItems="center" bgColor="white" h={80}>
        <Center bgColor="primary.200" boxSize="80px" rounded="full">
          <Icon boxSize="40px" as={PiSealWarningFill} fill="primary.400" />
        </Center>
        <Box pt={4} textAlign="center">
          <Text fontFamily="body" color="black.600" fontSize="md" fontWeight="semibold">
            No Data found
          </Text>
          <Text fontFamily="body" fontWeight="medium" fontSize="md" color="black.600">
            All Data available will appear here
          </Text>
        </Box>
      </Stack>
    );
  }

  return (
    <Box w="100%" overflow="auto" bgColor="white">
      <TableContainer sx={scrollbarSx} maxW="-moz-max-content">
        <ChakraTable>
          <Thead>
            {table.getHeaderGroups().map((headerGroup, index) => (
              <Tr borderRadius="8px" key={`${headerGroup.id}-${index}`}>
                {headerGroup.headers.map((header, index) => {
                  return (
                    <Th
                      fontSize="sm"
                      key={`${header.id}-${index}`}
                      colSpan={header.colSpan}
                      textTransform="capitalize"
                    >
                      {header.isPlaceholder ? null : (
                        <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                      )}
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row, index) => {
              return (
                <Tr key={`${row.id}-${index}`}>
                  {row.getVisibleCells().map((cell, index) => {
                    return (
                      <Td
                        maxW="180px"
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        key={`${cell.id}-${index}`}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </ChakraTable>
        <TableFooter
          table={table}
          actualTotalItems={actualTotalItems}
          pageCount={pageCount ?? 0}
          pagination={pagination}
          setPagination={setPagination}
          isServerSide={isServerSide}
        />
      </TableContainer>
    </Box>
  );
}
