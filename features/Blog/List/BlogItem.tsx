import { Box, Heading, Image, Skeleton, SkeletonText, Text, useColorModeValue } from "@chakra-ui/react";
import { Blog } from "api-sdk/api/blog/models";
import { Link } from "components/Common";
import React from "react";
import { BlogAuthor, BlogAuthorSkeleton, BlogTag, BlogTagSkeleton } from "../components";

type Props = {
  blog: Blog;
};

export const BlogItem = ({ blog }: Props) => {
  const { id, title, categories, author, updated_at, html } = blog;

  return (
    <Box
      marginTop={{ base: "1", sm: "5" }}
      display="flex"
      flexDirection={{ base: "column", sm: "row" }}
      justifyContent="space-between"
    >
      <Box display="flex" flex="1" marginRight="3" position="relative" alignItems="center">
        <Box width={{ base: "100%", sm: "85%" }} zIndex="2" marginLeft={{ base: "0", sm: "5%" }} marginTop="5%">
          <Link
            href={`/blog/${id}`}
            linkProps={{
              textDecoration: "none",
              _hover: { textDecoration: "none" },
            }}
          >
            <Image
              borderRadius="lg"
              src={
                "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
              }
              alt="some good alt text"
              objectFit="contain"
            />
          </Link>
        </Box>
        <Box zIndex="1" width="100%" position="absolute" height="100%">
          <Box
            bgGradient={useColorModeValue(
              "radial(orange.600 1px, transparent 1px)",
              "radial(orange.300 1px, transparent 1px)",
            )}
            backgroundSize="20px 20px"
            opacity="0.4"
            height="100%"
          />
        </Box>
      </Box>
      <Box display="flex" flex="1" flexDirection="column" justifyContent="center" marginTop={{ base: "3", sm: "0" }}>
        <BlogTag categories={categories} />
        <Heading marginTop="1">
          <Link
            href={`/blog/${id}`}
            linkProps={{
              textDecoration: "none",
              _hover: { textDecoration: "none" },
            }}
          >
            {title}
          </Link>
        </Heading>
        <Text as="p" noOfLines={5} marginTop="2" color={useColorModeValue("gray.700", "gray.200")}>
          {html}
        </Text>
        <BlogAuthor avatar={author.avatar} name={author.name} date={new Date(updated_at || "")} />
      </Box>
    </Box>
  );
};

export const BlogItemSkeleton = () => {
  return (
    <Box
      marginTop={{ base: "1", sm: "5" }}
      display="flex"
      flexDirection={{ base: "column", sm: "row" }}
      justifyContent="space-between"
    >
      <Box display="flex" flex="1" marginRight="3" position="relative" alignItems="center">
        <Skeleton
          borderRadius="lg"
          width={{ base: "100%", sm: "85%" }}
          zIndex="2"
          marginLeft={{ base: "0", sm: "5%" }}
          height={280}
          marginTop="5%"
        />
        <Box zIndex="1" width="100%" position="absolute" height="100%">
          <Box
            bgGradient={useColorModeValue(
              "radial(orange.600 1px, transparent 1px)",
              "radial(orange.300 1px, transparent 1px)",
            )}
            backgroundSize="20px 20px"
            opacity="0.4"
            height="100%"
          />
        </Box>
      </Box>
      <Box display="flex" flex="1" flexDirection="column" justifyContent="center" marginTop={{ base: "3", sm: "0" }}>
        <BlogTagSkeleton />
        <Skeleton marginTop="2">
          <Heading>{"Blog Heading Title"}</Heading>
        </Skeleton>
        <SkeletonText noOfLines={6} marginTop="3" color={useColorModeValue("gray.700", "gray.200")} />
        <BlogAuthorSkeleton />
      </Box>
    </Box>
  );
};
