import { Box, Button, HStack, Link, Stack, Text } from "@chakra-ui/react";
import { Form, Input, PasswordInput } from "components/Form";
import React from "react";

export default function SignupForm() {
  const onSubmit = async (values: any) => {
    console.log(values);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Stack spacing={5}>
        <HStack>
          <Box>
            <Input label="First Name" name="first_name" inputProps={{ placeholder: "Please enter first name..." }} />
          </Box>
          <Box>
            <Input label="Last Name" name="last_name" inputProps={{ placeholder: "Please enter last name..." }} />
          </Box>
        </HStack>
        <Input label="Email" name="email" inputProps={{ placeholder: "Please enter email..." }} />
        <Input label="Username" name="username" inputProps={{ placeholder: "Please enter username..." }} />
        <PasswordInput label="Password" name="password1" inputProps={{ placeholder: "Please enter password..." }} />
        <PasswordInput
          label="Confirm password"
          name="password2"
          inputProps={{ placeholder: "Please enter password..." }}
        />

        <Stack spacing={10} pt={2}>
          <Button
            type="submit"
            loadingText="Submitting"
            size="lg"
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
          >
            Sign up
          </Button>
        </Stack>
        <Stack pt={3}>
          <Text align={"center"}>
            Already a user?{" "}
            {/* <Link as={ReactLink} to={"/sign-in"} color={"blue.400"}>
              Login
            </Link> */}
          </Text>
        </Stack>
      </Stack>
    </Form>
  );
}
