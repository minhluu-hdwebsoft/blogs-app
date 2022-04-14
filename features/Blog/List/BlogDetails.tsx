import { Heading, VStack, Text, Image } from "@chakra-ui/react";
import { Blog } from "api-sdk/api/blog/models";
import React from "react";
import { BlogAuthor, BlogTag } from "../components";

type Props = {
  blog: Blog;
};

const BlogDetails = ({ blog }: Props) => {
  const { id, title, categories, author, updated_at, html } = blog;

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
        <Heading as="h2">What we write about</Heading>
        <BlogAuthor avatar={author.avatar} name={author.name} date={new Date(Number(updated_at) || "")} />
        <Text as="p" fontSize="lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum quam arcu, eu tempus tortor
          molestie at. Vestibulum pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed imperdiet. Mauris
          quis erat consequat, commodo massa quis, feugiat sapien. Suspendisse placerat vulputate posuere. Curabitur
          neque tortor, mattis nec lacus non, placerat congue elit.
        </Text>
        <Text as="p" fontSize="lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum quam arcu, eu tempus tortor
          molestie at. Vestibulum pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed imperdiet. Mauris
          quis erat consequat, commodo massa quis, feugiat sapien. Suspendisse placerat vulputate posuere. Curabitur
          neque tortor, mattis nec lacus non, placerat congue elit.
        </Text>
        <Text as="p" fontSize="lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum quam arcu, eu tempus tortor
          molestie at. Vestibulum pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed imperdiet. Mauris
          quis erat consequat, commodo massa quis, feugiat sapien. Suspendisse placerat vulputate posuere. Curabitur
          neque tortor, mattis nec lacus non, placerat congue elit.
        </Text>
      </VStack>
    </div>
  );
};

export default BlogDetails;
