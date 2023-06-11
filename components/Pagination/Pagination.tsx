import Back from 'public/svg/backIcon.svg';
import DoubleBack from 'public/svg/doubleBack.svg';
import Forward from 'public/svg/forward.svg';
import SingleForward from 'public/svg/singleForward.svg';
import * as React from 'react';
import ReactPaginate from 'react-paginate';

export interface PaginationProps {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  disableInitialCallback: boolean;
  initialPage?: number;
  onPageChange: (t: number) => any;
}

const containerClass = 'flex justify-center h-auto align-center items-center';
const activeClass =
  'px-4 py-2 text-white bg-gray-400 border  border-gray-400 cursor-pointer text-body-1 hover:bg-gray-500';
const inActiveClass =
  'px-4 py-2 bg-white border border-r-0 border-slate-300  cursor-pointer text-merchaint-text-dark-grey text-body-1 hover:bg-gray-200';
const leftLinkClassName = `relative flex items-center justify-center p-2 py-[8.5px] ml-0 bg-white border border-r-0 border-slate-300  cursor-pointer text-merchaint-text-dark-grey hover:bg-gray-200`;
const rightLinkClassName = `relative flex items-center justify-center p-2 py-[8.5px] ml-0 bg-white border border-r-0  border-slate-300  cursor-pointer text-merchaint-text-dark-grey hover:bg-gray-200`;

const getPageNumbers = (totalItems: number, itemsPerPage: number): number =>
  Math.ceil(totalItems / itemsPerPage) >> 0;

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  disableInitialCallback = false,
  initialPage = 0,
}: PaginationProps) => {
  const handleOnPageChange = React.useCallback(
    ({ selected = 0 }) => onPageChange(selected),
    [onPageChange],
  );
  const pageCount = React.useMemo(
    () => getPageNumbers(totalItems, itemsPerPage),
    [totalItems, itemsPerPage],
  );
  return (
    <div className="flex items-center">
      <button
        type="button"
        className="text-merchaint-text-dark-grey relative ml-0 flex cursor-pointer items-center justify-center rounded-l border border-r-0 border-slate-300 bg-white  p-2 py-[8.5px] hover:bg-gray-200"
        onClick={() => onPageChange(initialPage)}
      >
        <DoubleBack />
      </button>
      <ReactPaginate
        containerClassName={containerClass}
        previousLabel={<Back />}
        previousLinkClassName={leftLinkClassName}
        nextLabel={<SingleForward />}
        nextLinkClassName={rightLinkClassName}
        breakLinkClassName={inActiveClass}
        activeLinkClassName={activeClass}
        pageLinkClassName={inActiveClass}
        onPageChange={handleOnPageChange}
        pageRangeDisplayed={2}
        marginPagesDisplayed={3}
        disableInitialCallback={disableInitialCallback}
        pageCount={pageCount}
        renderOnZeroPageCount={() => null}
        forcePage={currentPage}
      />
      <button
        type="button"
        className="text-merchaint-text-dark-grey relative ml-0 flex cursor-pointer items-center justify-center rounded-r border border-slate-300 bg-white  p-2 py-[8.5px] hover:bg-gray-200"
        onClick={() => onPageChange(pageCount - 1)}
      >
        <Forward />
      </button>
    </div>
  );
};

export default Pagination;
