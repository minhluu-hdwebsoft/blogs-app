import { Heading, HStack, VStack } from "@chakra-ui/react";
import { Pagination } from "components/Common";
import { SearchInput } from "components/Common/SearchInput";
import React from "react";
import { Filter, FilterValues } from "../components/Filter";
import { useGetAllBlog } from "../hooks";
import { BlogItem, BlogItemSkeleton } from "./BlogItem";

type Props = {};

export const BlogList = (props: Props) => {
  const { filter, isLoading, setFilter, blogList, pagination, totalRows } = useGetAllBlog();

  const handlePaginationOnChange = ({ page, limit }: { page: number; limit: number }) => {
    setFilter((prev) => ({
      ...prev,
      _page: page,
      _limit: limit,
    }));
  };

  const handleFilterChange = ({ selectedCategoryId, sortFilter }: FilterValues) => {
    setFilter((prev) => ({
      ...prev,
      _page: 1,
      _sort: sortFilter?._sort,
      _order: sortFilter?._order,
      queryParams: {
        categoriesSearch: {
          id: selectedCategoryId,
        },
      },
    }));
  };

  return (
    <VStack spacing={5} alignItems="stretch">
      <Heading as="h1">Blog</Heading>
      <HStack spacing={5}>
        <SearchInput
          defaultValue={filter.q}
          onChange={(value) => setFilter((prev) => ({ ...prev, _page: 1, q: value }))}
        />

        <Filter
          defaultValue={{
            categoryId: filter.queryParams?.categoriesSearch?.id,
          }}
          onChange={handleFilterChange}
        />
      </HStack>

      {isLoading || !blogList
        ? new Array(filter._limit || 5).fill(1).map((__, index) => <BlogItemSkeleton key={index} />)
        : blogList?.map((blog) => <BlogItem blog={blog} key={blog.id} />)}

      <Pagination
        onChange={handlePaginationOnChange}
        currentPage={+(filter?._page || 1)}
        total={totalRows}
        pageSize={+(filter?._limit || 5)}
        rowPerPageOptions={[5, 10, 20]}
      />
    </VStack>
  );
};
