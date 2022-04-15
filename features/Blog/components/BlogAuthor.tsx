import { HStack, Img, SkeletonCircle, SkeletonText, Text } from "@chakra-ui/react";
import React from "react";

type Props = {
  date: Date;
  avatar?: string;
  name: string;
};

export const BlogAuthor = ({ name, date, avatar }: Props) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Img borderRadius="full" boxSize="40px" src={avatar} alt={`Avatar of ${name}`} />
      <Text fontWeight="medium">{name}</Text>
      <Text>—</Text>
      <Text>{date.toDateString()}</Text>
    </HStack>
  );
};

export const BlogAuthorSkeleton = () => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <SkeletonCircle size="40px" />
      <SkeletonText noOfLines={1} fontWeight={"medium"} w={300} />
    </HStack>
  );
};
