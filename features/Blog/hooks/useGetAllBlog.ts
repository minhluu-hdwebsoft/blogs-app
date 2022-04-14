import api from "api";
import { BlogQueryParam } from "api-sdk/api/blog/models";
import { useQueryParams } from "hooks";
import { FilterParams } from "models";
import { useEffect, useState } from "react";
import useSWR from "swr";

export const useGetAllBlog = () => {
  const { query, updateParams } = useQueryParams<BlogQueryParam>();

  const [filter, setFilter] = useState<FilterParams<BlogQueryParam>>({
    ...query,
  });

  const { data } = useSWR(
    ["/blogs", filter],
    () => api.blog.list(filter.q, filter.queryParams, filter._page, filter._limit, filter._order, filter._sort),
    {
      focusThrottleInterval: 10000,
    },
  );

  useEffect(() => {
    updateParams(filter);
  }, [filter]);

  return {
    blogList: data?.data,
    pagination: data?.pagination,
    isLoading: !Boolean(data?.data),
    filter,
    setFilter,
  };
};
