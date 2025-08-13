import { FC } from 'react';
import ReactPaginate from 'react-paginate';

type Props = {
  handlePage: ({ selected }: { selected: number }) => void;
  totalPages: number;
  currentPage: number;
  prefetchNextPage?: () => void;
  pageNext?: {
    isFirstPage: boolean;
    isLastPage: boolean;
  };
};
const Pagination: FC<Props> = ({ handlePage, totalPages, currentPage }) => {
  return (
    <ReactPaginate
      previousLabel={null}
      nextLabel={null}
      breakLabel={'...'}
      pageRangeDisplayed={3}
      pageCount={totalPages}
      onPageChange={handlePage}
      forcePage={currentPage}
      containerClassName={'paginationBtns'}
      activeClassName="paginationActive"
    />
  );
};

export { Pagination };
