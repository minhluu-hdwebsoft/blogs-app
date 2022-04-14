import { HStack, SpaceProps, Tag } from "@chakra-ui/react";
import { Category } from "models";
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
