import api from "api";
import { BlogQueryParam } from "api-sdk/api/blog/models";
import { useQueryParams } from "hooks";
import { FilterParams } from "models";
import { useEffect, useState } from "react";
import useSWR from "swr";

export const useGetAllBlog = () => {
  const { query, updateParams } = useQueryParams<BlogQueryParam>();

  const [totalRows, setTotalRows] = useState(1);
  const [filter, setFilter] = useState<FilterParams<BlogQueryParam>>({
    ...query,
  });

  const { data } = useSWR(
    ["/blogs", filter],
    () => api.blog.list(filter.q, filter.queryParams, filter._page, filter._limit, filter._sort, filter._order),
    {
      focusThrottleInterval: 10000,
      onSuccess: (data) => {
        setTotalRows(data.pagination?._totalRows || 1);
      },
    },
  );

  useEffect(() => {
    updateParams(filter);
  }, [filter]);

  return {
    blogList: data?.data,
    pagination: data?.pagination,
    totalRows,
    isLoading: !Boolean(data?.data),
    filter,
    setFilter,
  };
};
