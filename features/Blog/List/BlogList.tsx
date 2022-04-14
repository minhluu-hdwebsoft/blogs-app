import { Box, Heading } from "@chakra-ui/react";
import { Blog } from "api-sdk/api/blog/models";
import React from "react";
import { BlogItem } from "./BlogItem";

type Props = {
  blogList: Blog[];
};

export const BlogList = ({ blogList }: Props) => {
  return (
    <Box>
      <Heading as="h1">Stories by Chakra Templates</Heading>
      {blogList.map((blog) => (
        <BlogItem blog={blog} key={blog.id} />
      ))}
    </Box>
  );
};
