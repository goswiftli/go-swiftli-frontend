import type { PaginationState, Table } from '@tanstack/react-table';

export const usePagination = <TData>(
  isServerSide: boolean,
  pagination: PaginationState,
  actualTotalItems: number,
  table: Table<TData>,
  pageCount: number
) => {
  const currentPage = pagination.pageIndex;
  const pageSize = pagination.pageSize;

  let startItem: number;
  let endItem: number;
  let totalPages: number;

  if (isServerSide) {
    startItem = currentPage * pageSize + 1;
    endItem = Math.min(startItem + pageSize - 1, actualTotalItems);
    totalPages = pageCount || Math.ceil(actualTotalItems / pageSize);
  } else {
    const paginatedRows = table.getRowModel().rows;
    totalPages = table.getPageCount();

    if (paginatedRows.length > 0) {
      startItem = currentPage * pageSize + 1;
      endItem = Math.min(startItem + paginatedRows.length - 1, actualTotalItems);
    } else {
      startItem = 0;
      endItem = 0;
    }
  }

  return {
    startItem,
    endItem,
    totalPages,
  };
};
