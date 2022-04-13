import { FormControl, FormErrorMessage, FormHelperText, FormLabel } from "@chakra-ui/react";
import React, { ReactElement } from "react";

interface FloatFormControlProps {
  id?: string;
  children?: ReactElement | ReactElement[];
  helperText?: string;
  label?: string;
  errorMessage?: string;
  isRequire?: boolean;
  isInvaild?: boolean;
}

export const FloatFormControl = (props: FloatFormControlProps) => {
  const { helperText, label, errorMessage, children, isInvaild, id, ...rest } = props;

  return (
    <FormControl id={id} {...rest} isInvalid={Boolean(errorMessage) || isInvaild}>
      {label && <FormLabel>{label || "Label"}</FormLabel>}
      {children}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  );
};
