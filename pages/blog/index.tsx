import { Container } from "@chakra-ui/react";
import api from "api";
import { Blog, BlogQueryParam } from "api-sdk/api/blog/models";
import { Pagination } from "components/Common";
import { MainLayout } from "components/Layout";
import { BlogList } from "features/Blog/List/BlogList";
import { useQueryParams } from "hooks/useQueryParams";
import { FilterParams, NextPageWithLayout } from "models";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { useState } from "react";
import useSWR from "swr";

type Props = {
  blogList: Blog[];
};

const BlogListPage: NextPageWithLayout<Props> = ({ blogList }: Props) => {
  const {
    query: { _page, _limit, _order, _sort },
  } = useQueryParams();

  const [filter, setFilter] = useState({
    _page,
    _limit,
    _order,
    _sort,
  });

  const { data } = useSWR(["/blog", filter], () =>
    api.blog.list(undefined, undefined, filter._page, filter._limit, filter._order, filter._sort),
  );
  if (!data) return null;

  const handlePaginationOnChange = ({ page, limit }: { page: number; limit: number }) => {
    console.log("🚀 Minh =====>  ~ file: index.tsx ~ line 33 ~  page, limit", page, limit);
    setFilter((prev) => ({
      ...prev,
      _page: page,
      _limit: limit,
    }));
  };

  return (
    <Container maxW={"7xl"} p="12">
      <BlogList blogList={data.data} />
      <Pagination
        onChange={handlePaginationOnChange}
        currentPage={data.pagination?._page || 1}
        total={data.pagination?._totalRows}
        pageSize={data.pagination?._limit || 5}
      />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (context: GetServerSidePropsContext) => {
  const { _page, _limit, _order, _sort } = context.query as FilterParams<BlogQueryParam>;
  const response = await api.blog.list(undefined, undefined, _page, _limit, _order, _sort);
  const data = response.data;

  return {
    props: {
      blogList: data as Blog[],
    },
  };
};

BlogListPage.Layout = MainLayout;

export default BlogListPage;
