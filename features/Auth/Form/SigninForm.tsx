import { Button, Stack, Text } from "@chakra-ui/react";
import { Form, Input, PasswordInput } from "components/Form";
import React from "react";
import { SubmitHandler } from "react-hook-form";
import Link from "next/link";
import yup from "utils/yupGlobal";
import { useLogin } from "../hooks";

interface SigninType {
  email: string;
  password: string;
}

const validateSchema = yup.object({
  email: yup.string().required("Required").email("Email invalid"),
  password: yup.string().password().required("Required"),
});

export default function SigninForm(): JSX.Element {
  const { isLoading, login } = useLogin();

  const onSubmit: SubmitHandler<SigninType> = (values) => {
    login(values.email, values.password);
  };

  return (
    <Form onSubmit={onSubmit} schema={validateSchema}>
      <Stack spacing={5}>
        <Input name="email" label={"Email"} inputProps={{ placeholder: "Please enter" }} />
        <PasswordInput name="password" label={"Password"} inputProps={{ placeholder: "Please enter" }} />
        <Stack spacing={10} pt={2}>
          <Button
            type="submit"
            isLoading={isLoading}
            loadingText={"Submitting"}
            size="lg"
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
          >
            {"Sign In"}
          </Button>
        </Stack>
        <Stack pt={3}>
          <Text align={"center"}>
            {"Don't have account?"}
            <Link href={"/"}>{"Sign up"}</Link>
          </Text>
        </Stack>
      </Stack>
    </Form>
  );
}
