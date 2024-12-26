/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useReducer } from "react";
import {
  FieldValues,
  FormProvider,
  useForm,
  UseFormProps,
} from "react-hook-form";
import { TField } from "../model";
import { LoadingOverlay, Stack, StackProps } from "@mantine/core";
import RenderElements from "../render/render-elements";

interface Props<T extends FieldValues> extends UseFormProps<T, any> {
  fields: TField<T>[];
  onSubmit?: (values: T) => void;
  resetOnSubmit?: boolean;
  wrapperProps?: StackProps;
  isLoading?: boolean;
  children?: React.ReactNode;
}
const FormBuilder = <T extends FieldValues>({
  fields,
  onSubmit,
  resetOnSubmit,
  wrapperProps,
  children,
  isLoading,
  ...props
}: Props<T>) => {
  const [key, reset] = useReducer((value: number) => (value + 1) % 1000000, 0);
  const methods = useForm<T>(props);

  const handleOnSubmit = (data: T) => {
    if (onSubmit) {
      onSubmit(data);
    }
    if (resetOnSubmit) {
      methods.reset();
      reset();
    }
  };
  return (
    <FormProvider {...methods} key={key}>
      <form
        className="w-full relative"
        onSubmit={methods.handleSubmit(handleOnSubmit)}
      >
        <LoadingOverlay visible={isLoading} />
        <Stack {...wrapperProps}>
          {fields?.map((field, i) => (
            <RenderElements<T>
              key={`${field.name as string}-${i}`}
              element={field}
              methods={methods}
            />
          ))}
          {children}
        </Stack>
      </form>
    </FormProvider>
  );
};

export default FormBuilder;
