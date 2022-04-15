import { VStack } from "@chakra-ui/react";
import { Comment } from "api-sdk/api/comment/models";
import React from "react";
import CreateComment from "../Form/CreateComment";
import { useGetAllCommentByBlog } from "../hooks";
import { CommentItem, CommentItemSkeleton } from "./CommentItem";

type Props = {
  blogId: string;
};

const CommentList = ({ blogId }: Props) => {
  const { comments, isLoading } = useGetAllCommentByBlog(blogId);
  return (
    <VStack mt={5}>
      <CreateComment blogId={blogId} />
      {!comments
        ? new Array(10).fill(1).map((_, index) => <CommentItemSkeleton key={index} />)
        : comments.map((comment: Comment) => <CommentItem key={comment.id} comment={comment} />)}
    </VStack>
  );
};

export default CommentList;
