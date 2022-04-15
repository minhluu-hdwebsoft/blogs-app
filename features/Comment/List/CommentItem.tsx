import { Avatar, Box, VStack, HStack, Text, SkeletonText } from "@chakra-ui/react";
import { Comment } from "api-sdk/api/comment/models";
import React from "react";
import { CommentAuthor, CommentAuthorSkeleton } from "../components";

type Props = {
  comment: Comment;
};

export const CommentItem = ({ comment }: Props) => {
  const { id, author, content, created_at } = comment;

  return (
    <VStack spacing={3} width={"full"} alignItems="start" padding={5} border={"1px solid #d6d6d7"} borderRadius="md">
      <CommentAuthor name={author?.name} avatar={author?.avatar || ""} date={new Date(created_at || "")} />
      <Text>{content}</Text>
    </VStack>
  );
};

export const CommentItemSkeleton = () => {
  return (
    <VStack spacing={3} width={"full"} alignItems="start" padding={5} border={"1px solid #d6d6d7"} borderRadius="md">
      <CommentAuthorSkeleton />
      <SkeletonText noOfLines={4} spacing="4" />
    </VStack>
  );
};
