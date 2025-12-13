import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import React from 'react';

interface Props {  
  itemCount: number;
  pageSize: number;
  currentPage: number;
  onPageSizeChange: (newPageSize: number) => void;
  onPageChange: (newPage: number) => void;
}

const Pagination = ({    
  itemCount,
  pageSize,
  currentPage,
  onPageSizeChange,
  onPageChange
}: Props) => {

  const pageCount = Math.ceil(itemCount / pageSize);

  let pageArray = [10, 20, 50, 100, 200, 500, 1000];

  const start = itemCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, itemCount);

  return (
    <div className="flex flex-wrap items-center gap-2 bg-gray-100 rounded-xl px-4 py-2">
      <label className="flex items-center gap-1 text-sm font-medium text-gray-700">
        Page Size:
        <select
          className="ml-1 px-2 py-1 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={pageSize}
          onChange={(event) => onPageSizeChange(Number(event.target.value))}
        >
          {pageArray.map((page) => (
            <option key={page} value={page}>
              {page}
            </option>
          ))}
        </select>
      </label>

      <span className="text-sm text-gray-600">
        {start} to {end} of {itemCount}
      </span>

      <button
        className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
        aria-label="First Page"
      >
        <DoubleArrowLeftIcon />
      </button>
      <button
        className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous Page"
      >
        <ChevronLeftIcon />
      </button>

      <span className="text-sm text-gray-700 font-medium">
        Page {currentPage} of {pageCount}
      </span>

      <button
        className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
        disabled={currentPage === pageCount}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next Page"
      >
        <ChevronRightIcon />
      </button>
      <button
        className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
        disabled={currentPage === pageCount}
        onClick={() => onPageChange(pageCount)}
        aria-label="Last Page"
      >
        <DoubleArrowRightIcon />
      </button>
    </div>
  );
};

export default Pagination;