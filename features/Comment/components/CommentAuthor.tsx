import { Box, HStack, Img, SkeletonCircle, SkeletonText, Text } from "@chakra-ui/react";
import React from "react";

type Props = {
  date: Date;
  avatar?: string;
  name?: string;
};

export const CommentAuthor = ({ name, avatar, date }: Props) => {
  return (
    <HStack width={"full"}>
      <Img
        borderRadius="full"
        boxSize="40px"
        src={
          avatar ||
          "https://www.pikpng.com/pngl/b/238-2387386_default-avatar-png-avatar-default-transparent-clipart.png"
        }
        objectFit={"contain"}
        backgroundColor="gray.300"
        alt={name}
      />
      <Box>
        <Text fontWeight={"semibold"}>{name || "Anonymus"}</Text>
        <Text>{date.toDateString()}</Text>
      </Box>
    </HStack>
  );
};

export const CommentAuthorSkeleton = () => {
  return (
    <HStack width={"full"}>
      <SkeletonCircle size="40px" />
      <SkeletonText mt="4" noOfLines={1} spacing="4" />
    </HStack>
  );
};
