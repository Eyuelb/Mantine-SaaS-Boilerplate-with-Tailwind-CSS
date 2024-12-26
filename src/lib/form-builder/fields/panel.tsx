/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef } from "react";
import {
  InputDescription,
  InputError,
  InputLabel,
  InputWrapper,
  Stack,
  TextInputProps,
} from "@mantine/core";
import { TField } from "../model";
import { FieldValues, UseFormReturn } from "react-hook-form";
import RenderElements from "../render/render-elements";

interface PanelFieldProps<T extends FieldValues> extends TextInputProps {
  field: TField<T>;
  methods: UseFormReturn<T>;
}
interface WithForwardRefType<T extends FieldValues>
  extends React.FC<PanelFieldProps<T>> {
  <T extends FieldValues>(
    props: PanelFieldProps<T>,
  ): ReturnType<React.FC<PanelFieldProps<T>>>;
}

export const PanelField: WithForwardRefType<FieldValues> = forwardRef<
  HTMLInputElement,
  PanelFieldProps<FieldValues>
>(
  (
    {
      field: { name, group, panelProps },
      label,
      error,
      description,
      methods,
      withAsterisk,
      inputWrapperOrder,
    },
    ref,
  ) => {
    const content = inputWrapperOrder!.map((part) => {
      switch (part) {
        case "label":
          return (
            <InputLabel required={withAsterisk} key="label">
              {label}
            </InputLabel>
          );
        case "input":
          return (
            <Stack
              key="input"
              {...panelProps?.wrapper}
              className={`mx-2 p-2.5 rounded-md ${panelProps?.wrapper?.className}`}
            >
              {group?.map((field, i) => (
                <RenderElements
                  key={`${field.name as string}-${i}`}
                  element={
                    {
                      ...field,
                      name: `${name as string}.${field.name as string}` as any,
                    } as any
                  }
                  methods={methods}
                />
              ))}
            </Stack>
          );
        case "description":
          return (
            <InputDescription key="description">{description}</InputDescription>
          );
        case "error":
          return (
            <InputError ta={"left"} key="error">
              {error}
            </InputError>
          );
        default:
          return null;
      }
    });
    return (
      <InputWrapper>
        <button ref={ref as any} />
        {content}
      </InputWrapper>
    );
  },
);
PanelField.displayName = "PanelField";
