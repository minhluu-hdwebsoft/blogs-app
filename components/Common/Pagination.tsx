import { Box, HStack, IconButton, Select } from "@chakra-ui/react";
import React, { ChangeEvent } from "react";
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight, FiMoreHorizontal } from "react-icons/fi";

interface PaginationProps {
  currentPage?: number;
  total?: number;
  pageSize?: number;
  onChange?: (values: { page: number; limit: number }) => void;
  nextItemUrl?: string;
  prevItemUrl?: string;
  pageBufferSize?: number;
}

export function Pagination({
  currentPage = 1,
  total = 1,
  pageSize = 1,
  pageBufferSize = 1,
  onChange,
}: PaginationProps) {
  const totalPage = Math.ceil(total / pageSize);

  let left = Math.max(1, currentPage - pageBufferSize);
  let right = Math.min(currentPage + pageBufferSize, totalPage);

  if (totalPage > pageBufferSize * 2) {
    if (currentPage - 1 <= pageBufferSize) {
      right = 1 + pageBufferSize * 2;
    }

    if (totalPage - currentPage <= pageBufferSize) {
      left = totalPage - pageBufferSize * 2;
    }
  }

  function renderPageList(left: number, right: number, current: number, onChange: (page: number) => void) {
    const pageList = [];
    for (let i = left; i <= right; i++) {
      const pageIndex = i;
      const isActive = pageIndex === current;

      pageList.push(
        <IconButton
          onClick={() => onChange(pageIndex)}
          key={pageIndex}
          aria-label={`page-${pageIndex}`}
          isActive={isActive}
          icon={<p>{pageIndex}</p>}
        />,
      );
    }
    return pageList;
  }

  function handlePageItemSelected(page: number) {
    if (onChange) {
      onChange({
        page: page,
        limit: pageSize,
      });
    }
  }

  function handlePageLimitSelected(e: ChangeEvent<HTMLSelectElement>) {
    const limit = parseInt(e.target.value);

    if (onChange) {
      onChange({
        page: 1,
        limit: limit,
      });
    }
  }

  return (
    <Box display="flex" justifyContent={"space-between"} w="full">
      <Select defaultValue={pageSize} w={200} onChange={handlePageLimitSelected}>
        <option value={10}>10 / Page</option>
        <option value={20}>20 / Page</option>
        <option value={30}>30 / Page</option>
      </Select>
      <HStack>
        <IconButton
          isDisabled={currentPage === 1}
          onClick={() => handlePageItemSelected(1)}
          aria-label="Search database"
          icon={<FiChevronsLeft />}
        />
        <IconButton
          isDisabled={currentPage === 1}
          onClick={() => handlePageItemSelected(currentPage - 1)}
          aria-label="Search database"
          icon={<FiChevronLeft />}
        />
        {left !== 1 && (
          <IconButton isDisabled variant={"ghost"} aria-label="Search database" icon={<FiMoreHorizontal />} />
        )}
        {renderPageList(left, right, currentPage, handlePageItemSelected)}
        {right !== totalPage && (
          <IconButton isDisabled variant={"ghost"} aria-label="Search database" icon={<FiMoreHorizontal />} />
        )}
        <IconButton
          isDisabled={currentPage === totalPage}
          onClick={() => handlePageItemSelected(currentPage + 1)}
          aria-label="Search database"
          icon={<FiChevronRight />}
        />
        <IconButton
          isDisabled={currentPage === totalPage}
          onClick={() => handlePageItemSelected(totalPage)}
          aria-label="Search database"
          icon={<FiChevronsRight />}
        />
      </HStack>
    </Box>
  );
}
