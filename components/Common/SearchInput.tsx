import { Input, InputGroup, InputLeftElement, InputProps } from "@chakra-ui/react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useDebounce } from "../../hooks";

interface SearchInputProps {
  delay?: number;
  onChange?: (value: string) => void;
  inputProps?: InputProps;
  defaultValue?: string;
  ref?: React.MutableRefObject<HTMLInputElement>;
}

export function SearchInput({ delay = 500, inputProps, onChange, defaultValue, ref }: SearchInputProps) {
  const [value, setValue] = useState<string | null>(null);
  const debouncedValue = useDebounce<string | null>(value, delay);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if (onChange && value !== null) {
      onChange(value);
    }
  }, [debouncedValue]);

  return (
    <InputGroup maxWidth={600} minWidth={400} w="full">
      <InputLeftElement pointerEvents="none">
        <FiSearch />
      </InputLeftElement>
      <Input
        focusBorderColor={"orange.400"}
        type="text"
        placeholder="Search..."
        defaultValue={defaultValue}
        {...inputProps}
        value={value || undefined}
        onChange={handleChange}
        ref={ref}
      />
    </InputGroup>
  );
}
