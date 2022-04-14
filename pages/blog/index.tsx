import { Container } from "@chakra-ui/react";
import api from "api";
import { Blog, BlogQueryParam } from "api-sdk/api/blog/models";
import { Pagination } from "components/Common";
import { MainLayout } from "components/Layout";
import { BlogList } from "features/Blog/List/BlogList";
import { useQueryParams } from "hooks/useQueryParams";
import { FilterParams, NextPageWithLayout } from "models";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { ReactElement, useState } from "react";
import useSWR, { SWRConfig, SWRConfiguration, unstable_serialize } from "swr";
import { flattenObjToNestedObj } from "utils/helper";

type Props = {
  children?: ReactElement;
};

const BlogListPage = (props: Props) => {
  return (
    <Container maxW={"7xl"} p="12">
      <BlogList />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps<SWRConfiguration> = async (context: GetServerSidePropsContext) => {
  const { q, _limit, _order, _sort, _page, ...rest } = context.query as FilterParams<BlogQueryParam>;
  const filter: FilterParams<BlogQueryParam> = {
    q,
    _limit,
    _order,
    _sort,
    _page,
    queryParams: flattenObjToNestedObj(rest),
  };
  const response = await api.blog.list(
    filter.q,
    filter.queryParams,
    filter._page,
    filter._limit,
    filter._order,
    filter._sort,
  );
  const categories = await api.category.list(undefined, undefined, 1, 200);

  return {
    props: {
      fallback: {
        [unstable_serialize(["/blogs", filter])]: response,
        ["/categories"]: categories,
      },
    },
  };
};

const Page: NextPageWithLayout<SWRConfiguration> = ({ fallback }: SWRConfiguration) => {
  return (
    <SWRConfig value={{ fallback }}>
      <BlogListPage />
    </SWRConfig>
  );
};

Page.Layout = MainLayout;

export default Page;
