import { HStack, Input, Select } from "@chakra-ui/react";
import api from "api";
import { Category } from "api-sdk/api/category/models";
import { Pagination } from "api-sdk/types";
import { SearchInput } from "components/Common/SearchInput";
import React, { useRef } from "react";
import useSWR from "swr";

export interface FilterValues {
  selectedCategoryId: string;
}

type Props = {
  defaultValue?: {
    categoryId?: string;
  };
  onChange?: (values: FilterValues) => void;
};

export const Filter = ({ defaultValue, onChange }: Props) => {
  const { data, isValidating } = useSWR<Pagination<Category>>("/categories");

  const selectCategoryRef = useRef<HTMLSelectElement>(null);

  const hanleFilterChange = () => {
    const selectCategoryValue = selectCategoryRef.current?.value;

    onChange && onChange({ selectedCategoryId: selectCategoryValue as string });
  };

  return (
    <HStack>
      <Select
        ref={selectCategoryRef}
        placeholder="All"
        defaultValue={defaultValue?.categoryId}
        size="md"
        onChange={hanleFilterChange}
      >
        {data &&
          data?.data.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
      </Select>
    </HStack>
  );
};
