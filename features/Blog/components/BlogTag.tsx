import { HStack, Skeleton, SpaceProps, Tag } from "@chakra-ui/react";
import { Category } from "api-sdk/api/category/models";
import React from "react";

interface Props {
  categories: Array<Category>;
  marginTop?: SpaceProps["marginTop"];
}

export const BlogTag = (props: Props) => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      {props.categories?.map((category) => {
        return (
          <Tag size={"md"} variant="solid" colorScheme="orange" key={category.id}>
            {category.name}
          </Tag>
        );
      })}
    </HStack>
  );
};

export const BlogTagSkeleton = () => {
  return (
    <HStack spacing={2}>
      <Skeleton w={100} height="20px" />
      <Skeleton w={100} height="20px" />
      <Skeleton w={100} height="20px" />
    </HStack>
  );
};
