import React, { useRef, useState } from "react";
import { Avatar, Box, VStack, Text, HStack, Image, Textarea, Button } from "@chakra-ui/react";
import { useCreate } from "../hooks";
import { useGetCommentInfiniteByBlog } from "../hooks/useGetCommentInfinitebyBlog";

type Props = {
  blogId: string;
};

const CreateComment = ({ blogId }: Props) => {
  const { create, isLoading } = useCreate(blogId);
  const [commentContent, setCommentContent] = useState<string>("");

  const handleCommentPost = () => {
    const value = commentContent;
    if (!value) return;
    create(value);
  };

  return (
    <VStack spacing={3} alignItems={"end"} border={"1px solid #d6d6d7"} borderRadius="md" w={"full"} padding={5}>
      <HStack width={"full"} alignItems={"start"}>
        <Avatar />
        <Textarea
          value={commentContent}
          isDisabled={isLoading}
          placeholder="Place your comment here..."
          rows={5}
          focusBorderColor={"orange.400"}
          onChange={(e) => setCommentContent(e.target.value)}
        />
      </HStack>
      <Button
        isDisabled={!commentContent}
        isLoading={isLoading}
        color={"white"}
        backgroundColor={"orange.400"}
        _hover={{
          backgroundColor: "orange.500",
        }}
        loadingText={"Commenting"}
        onClick={handleCommentPost}
      >
        Comment
      </Button>
    </VStack>
  );
};

export default CreateComment;
