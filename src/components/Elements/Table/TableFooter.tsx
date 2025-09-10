import { Box, HStack, IconButton, Select, Text } from '@chakra-ui/react';
import type { PaginationState, Table } from '@tanstack/react-table';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

import { usePagination } from '@/hooks';

type TableFooterProps<TData> = {
  table: Table<TData>;
  actualTotalItems: number;
  pageCount: number;
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  isServerSide: boolean;
};

export const TableFooter = <TData,>(props: TableFooterProps<TData>) => {
  const { startItem, endItem } = usePagination(
    props.isServerSide,
    props.pagination,
    props.actualTotalItems,
    props.table,
    props.pageCount
  );

  const handlePageSizeChange = (newPageSize: number) => {
    props.setPagination({
      pageIndex: 0,
      pageSize: newPageSize,
    });
  };
  return (
    <Box
      as={HStack}
      display={props.actualTotalItems > 0 ? 'flex' : 'none'}
      justifyContent="space-between"
      alignItems="center"
      px={6}
      py={2}
      bg="grey.200"
    >
      <Box w="65%">
        <Text fontSize="xs" fontFamily="body">{`${props.actualTotalItems} result(s) found`}</Text>
      </Box>
      <Box as={HStack} w="full" justifyContent="space-between" flex={1}>
        <HStack alignItems="center" spacing={1}>
          <Text fontSize="xs" fontFamily="body" whiteSpace="nowrap">
            Rows per page:
          </Text>
          <Select
            value={props.pagination.pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            size="sm"
            bg="transparent"
            border="none"
            name="select"
            data-testid="select-pagesize"
            _hover={{ cursor: 'pointer' }}
            pl={0}
            w="60px"
            textStyle="body-small"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
          </Select>
        </HStack>
        <HStack>
          <Text fontSize="xs" fontFamily="body">
            {props.actualTotalItems > 0
              ? `${startItem}-${endItem} of ${props.actualTotalItems}`
              : '0-0 of 0'}
          </Text>
          <HStack spacing={0}>
            <IconButton
              aria-label="go-to-previous-page"
              onClick={() => props.table.previousPage()}
              disabled={!props.table.getCanPreviousPage()}
              icon={<FaAngleLeft />}
              variant="ghost"
              size="sm"
            />

            <IconButton
              aria-label="go-to-next-page"
              onClick={() => props.table.nextPage()}
              disabled={!props.table.getCanNextPage()}
              icon={<FaAngleRight />}
              variant="ghost"
              size="sm"
            />
          </HStack>
        </HStack>
      </Box>
    </Box>
  );
};
