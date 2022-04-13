import { Input as ChakraInput, InputProps as ChakraInputProps } from "@chakra-ui/react";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FloatFormControl } from "./FloatFormControl";

interface InputProps {
  name: string;
  label?: string;
  inputProps?: ChakraInputProps;
}

export const Input = ({ name, label, inputProps }: InputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ fieldState: { error }, field }) => (
        <FloatFormControl label={label} errorMessage={error?.message}>
          <ChakraInput {...inputProps} {...field} />
        </FloatFormControl>
      )}
    />
  );
};
