import { FilterParams } from "models";
import { useRouter } from "next/router";
import queryString from "query-string";
import { useMemo } from "react";
import { cleanObject, flattenObj, flattenObjToNestedObj } from "utils/helper";

export const useQueryParams = <T>() => {
  const router = useRouter();
  const query = useMemo(() => {
    const { q, _limit, _order, _sort, _page, ...rest } = router.query as FilterParams<T>;
    const result: FilterParams<T> = {
      q,
      queryParams: flattenObjToNestedObj(rest) as unknown as T,
      _page,
      _limit,
      _order,
      _sort,
    };

    return result;
  }, [router.query]);

  const updateParams = ({ queryParams, ...filter }: FilterParams<T>) => {
    const params = { ...filter, ...flattenObj(queryParams) };
    const cleanedFilter = cleanObject(params);
    router.push(
      {
        query: queryString.stringify(cleanedFilter),
      },
      undefined,
      { shallow: true },
    );
  };

  return { query, updateParams };
};
