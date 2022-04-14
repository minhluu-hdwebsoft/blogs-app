import { FilterParams } from "models";
import { useRouter } from "next/router";
import queryString from "query-string";
import { useMemo } from "react";
import { cleanObject, flattenObj } from "utils/helper";

export const useQueryParams = <T>() => {
  const router = useRouter();
  const query = useMemo(() => {
    return router.query as FilterParams<T>;
  }, [router.query]);

  const updateParams = (filter: T) => {
    const cleanedFilter = cleanObject(flattenObj(filter));
    // navigate({
    //   search: queryString.stringify(cleanedFilter),
    // });
  };

  return { query, updateParams };
};
