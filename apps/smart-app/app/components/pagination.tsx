import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { Button, Flex, Text } from '@radix-ui/themes';
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
  if (pageCount <= 1) return null;

  let pageArray = [10, 20, 50, 100, 200, 500, 1000];
    
 
  return (
    <Flex align="center" gap="2">     

      <Text size="2">
      Page Size:  
        <select className='pl-2' onChange = { (event: React.ChangeEvent<HTMLSelectElement>) => onPageSizeChange(Number(event.target.value)) }>
        <option key={pageSize} value={pageSize}> {pageSize} </option>
        {pageArray.map((page, index) => (
          <option key={index} value={page}>
            {page}
          </option>
        ))}
      </select>
      </Text>

      <Text size="2" className='pl-2'>
      {(currentPage -1) * pageSize + 1} to {currentPage * pageSize} of {itemCount}
      </Text>

      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>

      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>


      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => onPageChange(currentPage + 1)}
      >     
        <ChevronRightIcon />
      </Button>

      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => onPageChange(pageCount)}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;