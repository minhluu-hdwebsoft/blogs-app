import { Box, HStack, Select, Text } from "@chakra-ui/react";
import { Category } from "api-sdk/api/category/models";
import { Pagination } from "api-sdk/types";
import { Order } from "models";
import React, { useRef } from "react";
import useSWR from "swr";

export interface FilterValues {
  selectedCategoryId: string;
  sortFilter?: {
    _sort?: string;
    _order?: Order;
  };
}

type Props = {
  defaultValue?: {
    categoryId?: string;
    sort?: string;
  };
  onChange?: (values: FilterValues) => void;
};

const getSortObject = (key: number | string | undefined) => {
  switch (key) {
    case "1":
      return {
        _sort: "created_at",
        _order: Order.DESC,
      };
    case "2":
      return {
        _sort: "created_at",
        _order: Order.ASC,
      };
    default:
      return {};
  }
};

export const Filter = ({ defaultValue, onChange }: Props) => {
  const { data, isValidating } = useSWR<Pagination<Category>>("/categories");

  const selectCategoryRef = useRef<HTMLSelectElement>(null);
  const selectSortRef = useRef<HTMLSelectElement>(null);

  const hanleFilterChange = () => {
    const selectCategoryValue = selectCategoryRef.current?.value;
    const selectSortValue = selectSortRef.current?.value;

    onChange &&
      onChange({ selectedCategoryId: selectCategoryValue as string, sortFilter: getSortObject(selectSortValue) });
  };

  return (
    <HStack justifyContent={"space-between"} w={"full"}>
      <Select
        w={200}
        focusBorderColor={"orange.400"}
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
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Text fontWeight={"semibold"} w={100}>
          Sort by:
        </Text>
        <Select
          placeholder="None"
          ref={selectSortRef}
          defaultValue={defaultValue?.sort}
          size="md"
          onChange={hanleFilterChange}
        >
          <option value={1}>Newest</option>
          <option value={2}>Lastest</option>
        </Select>
      </Box>
    </HStack>
  );
};
