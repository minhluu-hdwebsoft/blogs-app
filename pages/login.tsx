import { Box, Flex, Heading, Stack, useColorModeValue } from "@chakra-ui/react";
import SigninForm from "features/Auth/Form/SigninForm";
import Link from "next/link";
import React from "react";

type Props = {};

const LoginPage = (props: Props) => {
  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            {"Sign In"}
          </Heading>
        </Stack>
        <Link href={"/"}>Back to home</Link>
        <Box
          minW={"450px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          rounded={"lg"}
          p={8}
        >
          <SigninForm />
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginPage;
