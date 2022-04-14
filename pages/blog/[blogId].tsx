import { Box, Container, Divider, Heading, VStack } from "@chakra-ui/react";
import { Blog } from "api-sdk/api/blog/models";
import { MainLayout } from "components/Layout";
import BlogDetails from "features/Blog/List/BlogDetails";
import { NextPageWithLayout } from "models";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import React from "react";
import useSWR from "swr";

type Props = {
  blog: Blog;
};

const PostDetailsPage: NextPageWithLayout<Props> = ({ blog }: Props) => {
  if (!blog) return null;

  return (
    <Container maxW={"7xl"} p="12">
      <VStack spacing={5} alignItems="flex-start">
        <BlogDetails blog={blog} />
        <Divider />
        <Box>
          <Heading as="h2">Comments</Heading>
        </Box>
      </VStack>
    </Container>
  );
};

PostDetailsPage.Layout = MainLayout;

export const getStaticProps: GetStaticProps<Props> = async (context: GetStaticPropsContext) => {
  const { params } = context;

  if (!params) return { notFound: true };

  const response = await fetch(`http://localhost:5000/blogs/${params.blogId}`);
  const data = await response.json();

  return {
    props: {
      blog: data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch("http://localhost:5000/blogs?_page=1&limit=30");
  const data = await response.json();

  return {
    paths: data.data.map((item: Blog) => ({ params: { blogId: item.id } })),
    fallback: "blocking",
  };
};

export default PostDetailsPage;
