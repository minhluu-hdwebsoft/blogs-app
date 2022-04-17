import { Box, Container, Divider, Heading, VStack } from "@chakra-ui/react";
import api from "api";
import { Blog } from "api-sdk/api/blog/models";
import { MainLayout } from "components/Layout";
import BlogDetails from "features/Blog/List/BlogDetails";
import { PAGE_SIZE } from "features/Comment/config";
import CommentList from "features/Comment/List/CommentList";
import { NextPageWithLayout, Order } from "models";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import React from "react";
import useSWR, { SWRConfig, SWRConfiguration, unstable_serialize } from "swr";

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
  const COMMENT_PAGE = 1;
  const { params } = context;

  if (!params || !params.blogId) return { notFound: true };

  try {
    const blog = await api.blog.get(params.blogId as string);
    const comments = await api.comment.list(
      undefined,
      {
        blogId: params.blogId as string,
      },
      COMMENT_PAGE,
      PAGE_SIZE,
      "created_at",
      Order.DESC,
    );

    return {
      props: {
        fallback: {
          [`/blog/${params.blogId}`]: blog,
          [unstable_serialize([`/blog/${params.blogId}/comment`, COMMENT_PAGE])]: comments,
        },
      },
      revalidate: 10,
    };
  } catch (error) {
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const response = await api.blog.list(undefined, undefined, 1, 30);
    const data = response.data;

    return {
      paths: data.map((item: Blog) => ({ params: { blogId: item.id } })),
      fallback: "blocking",
    };
  } catch (error) {
    return {
      paths: [],
      fallback: false,
    };
  }
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
