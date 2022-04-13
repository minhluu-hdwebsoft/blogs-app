import { yupResolver } from "@hookform/resolvers/yup";
import React, { ReactElement } from "react";
import { DeepPartial, FormProvider, SubmitHandler, UnpackNestedValue, useForm, UseFormReturn } from "react-hook-form";
import * as yup from "yup";

interface FormProps<T> {
  children?: ReactElement | ReactElement[];
  defaultValues?: UnpackNestedValue<DeepPartial<T>>;
  onSubmit?: SubmitHandler<T>;
  schema?: yup.AnyObjectSchema;
  formMethods?: UseFormReturn<T, unknown>;
}

export function Form<T>({ children, defaultValues, onSubmit = () => null, schema, formMethods }: FormProps<T>) {
  const resolver = schema ? yupResolver(schema) : undefined;
  const methods = formMethods || useForm<T>({ defaultValues, resolver });

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {React.Children.map(children, (child) => {
          return child?.props.name
            ? React.createElement(child.type, {
                ...{
                  ...child.props,
                  register: methods.register,
                  key: child.props.name,
                },
              })
            : child;
        })}
      </form>
    </FormProvider>
  );
}
