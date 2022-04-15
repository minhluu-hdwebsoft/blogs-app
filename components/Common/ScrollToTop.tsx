import { Button, IconButton } from "@chakra-ui/react";
import { useScrollToTop } from "hooks/useScrollToTop";
import React from "react";
import { FiChevronsUp } from "react-icons/fi";

type Props = {};

export const ScrollToTop = (props: Props) => {
  const { isVisible, scrollToTop } = useScrollToTop();

  return (
    <IconButton
      position={"fixed"}
      bottom={isVisible ? 30 : 5}
      opacity={isVisible ? 1 : 0}
      visibility={isVisible ? "visible" : "hidden"}
      right={30}
      color={"white"}
      transition={"0.3s ease all"}
      backgroundColor={"orange.400"}
      _hover={{
        backgroundColor: "orange.500",
      }}
      aria-label="Search database"
      icon={<FiChevronsUp size={30} />}
      onClick={scrollToTop}
    />
  );
};
