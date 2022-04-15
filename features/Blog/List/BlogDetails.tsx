import { Heading, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { BlogAuthor, BlogTag } from "../components";
import useGetBlogById from "../hooks/useGetBlogById";

type Props = {
  blogId: string;
};

const BlogDetails = ({ blogId }: Props) => {
  const { data } = useGetBlogById(blogId as string);

  if (!data) return null;

  const { title, categories, author, created_at, html } = data;

  return (
    <div>
      <VStack spacing="5" alignItems="flex-start">
        <Image
          width={"full"}
          height={300}
          borderRadius="lg"
          src={
            "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
          }
          alt="some good alt text"
          objectFit="cover"
        />
        <BlogTag categories={categories} />
        <Heading as="h2">{title}</Heading>
        <BlogAuthor avatar={author.avatar} name={author.name} date={new Date(created_at || "")} />
        <Text as="p" fontSize="lg">
          {html}
        </Text>
      </VStack>
    </div>
  );
};

export default BlogDetails;
