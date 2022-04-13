import { Radio, RadioGroup, Stack, UseRadioGroupProps } from "@chakra-ui/react";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FloatFormControl } from "./FloatFormControl";

interface RadioInputProps {
  name: string;
  label?: string;
  inputProps?: UseRadioGroupProps;
  data: {
    value: string | number | undefined;
    title: string | number;
  }[];
}

export function RadioInput({ name, label, inputProps, data }: RadioInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={data[0].value}
      render={({ fieldState: { error }, field }) => (
        <FloatFormControl label={label} errorMessage={error?.message}>
          <RadioGroup {...field} {...inputProps}>
            <Stack direction="row" spacing={10}>
              {data.map((item) => (
                <Radio key={item.value} value={item.value}>
                  {item.title}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </FloatFormControl>
      )}
    />
  );
}
