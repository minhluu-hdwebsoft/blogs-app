import { Box, Container, Divider, Heading, VStack } from "@chakra-ui/react";
import api from "api";
import { Blog } from "api-sdk/api/blog/models";
import { MainLayout } from "components/Layout";
import BlogDetails from "features/Blog/List/BlogDetails";
import CommentList from "features/Comment/List/CommentList";
import { NextPageWithLayout, Order } from "models";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import React from "react";
import useSWR, { SWRConfig, SWRConfiguration } from "swr";

const PostDetailsPage: NextPageWithLayout = () => {
  const {
    query: { blogId },
  } = useRouter();

  return (
    <Container maxW={"7xl"} p="12">
      <VStack spacing={5} alignItems="flex-start">
        <BlogDetails blogId={blogId as string} />
        <Divider />
        <Box width={"full"}>
          <Heading as="h2">Comments</Heading>
          <CommentList blogId={blogId as string} />
        </Box>
      </VStack>
    </Container>
  );
};

export const getStaticProps: GetStaticProps<SWRConfiguration> = async (context: GetStaticPropsContext) => {
  const { params } = context;

  if (!params || !params.blogId) return { notFound: true };

  try {
    const blog = await api.blog.get(params.blogId as string);
    const comments = await api.comment.list(
      undefined,
      {
        blogId: params.blogId as string,
      },
      1,
      10,
      "created_at",
      Order.DESC,
    );

    return {
      props: {
        fallback: {
          [`/blog/${params.blogId}`]: blog,
          [`/blog/${params.blogId}/comment`]: comments,
        },
      },
      revalidate: 10,
    };
  } catch (error) {
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await api.blog.list(undefined, undefined, 1, 30);
  const data = response.data;

  return {
    paths: data.map((item: Blog) => ({ params: { blogId: item.id } })),
    fallback: "blocking",
  };
};

const Page: NextPageWithLayout<SWRConfiguration> = ({ fallback }: SWRConfiguration) => {
  return (
    <SWRConfig value={{ fallback }}>
      <PostDetailsPage />
    </SWRConfig>
  );
};

Page.Layout = MainLayout;

export default Page;
