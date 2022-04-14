import React, { ReactElement } from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";

interface Props extends NextLinkProps {
  children?: ReactElement | string;
  linkProps?: LinkProps;
}

export const Link = ({ children, linkProps, ...rest }: Props) => {
  return (
    <NextLink {...rest} passHref>
      <ChakraLink {...linkProps}>{children}</ChakraLink>
    </NextLink>
  );
};
