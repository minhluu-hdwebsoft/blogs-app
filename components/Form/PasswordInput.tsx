import { Button, Input as ChakraInput, InputElementProps, InputGroup, InputRightElement } from "@chakra-ui/react";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FloatFormControl } from "./FloatFormControl";

interface PasswordInputProps {
  name: string;
  label?: string;
  inputProps?: InputElementProps;
}

export function PasswordInput({ name, label, inputProps }: PasswordInputProps) {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <FloatFormControl label={label} errorMessage={error?.message}>
          <InputGroup>
            <ChakraInput type={show ? "text" : "password"} {...inputProps} {...field} />
            <InputRightElement width="4.5rem" height={"38px"}>
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FloatFormControl>
      )}
    />
  );
}
