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
const Pagination: FC<Props> = ({
  handlePage,
  totalPages,
  currentPage,
  prefetchNextPage,
  pageNext,
}) => {
  return (
    <ReactPaginate
      previousLabel={
        !pageNext?.isFirstPage && (
          <button disabled={currentPage === 0} style={{ width: '100px' }}>
            Previous
          </button>
        )
      }
      nextLabel={
        !pageNext?.isLastPage && (
          <button
            onMouseEnter={prefetchNextPage}
            disabled={currentPage === totalPages - 1}
            style={{ width: '100px' }}
          >
            Next
          </button>
        )
      }
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
