import {
  Box,
  Center,
  Flex,
  HStack,
  Icon,
  IconButton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  PaginationState,
  // getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { PiSealWarningFill } from 'react-icons/pi';

// import { getPageSizeRange } from '@/utils';

interface IAppTable<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount: number;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  pagination: PaginationState;
}

export function AppTable<TData, TValue>({
  columns,
  data,
  setPagination,
  pageCount,
  pagination,
}: IAppTable<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    manualPagination: true,
    pageCount: pageCount,
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

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
    <TableContainer className="scrollable-element">
      <Table minW={'full'} variant="unstyled">
        <Thead>
          {table.getHeaderGroups().map((headerGroup, index) => (
            <Tr key={`${headerGroup.id}-${index}`}>
              {headerGroup.headers.map((header, index) => {
                return (
                  <Th
                    fontSize="sm"
                    textAlign={'left'}
                    key={`${header.id}-${index}`}
                    colSpan={header.colSpan}
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
              <Tr key={`${row.id}-${index}`} py={4}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <Td
                      maxWidth="180px"
                      whiteSpace="nowrap"
                      overflow="hidden"
                      textOverflow="ellipsis"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Flex
        gap={4}
        justify={'end'}
        alignItems={'center'}
        px={4}
        py={8}
        w={'full'}
        display={table.getPageCount() > 1 ? 'flex' : 'none'}
      >
        <HStack>
          <IconButton
            aria-label="go-left"
            size="sm"
            borderRadius="4px"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            icon={<FaAngleLeft />}
          />
          <Flex gap={1} justify={'center'} alignItems={'center'}>
            <Text textStyle="p">Page</Text>
            <Text textStyle="p">
              {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </Text>
          </Flex>
          <IconButton
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label="go-right"
            size="sm"
            borderRadius="4px"
            icon={<FaAngleRight />}
          />
        </HStack>
      </Flex>
    </TableContainer>
  );
}
