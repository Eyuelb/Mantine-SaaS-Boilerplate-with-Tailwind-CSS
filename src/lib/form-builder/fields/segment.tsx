/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef } from "react";
import {
  InputDescription,
  InputError,
  InputLabel,
  InputWrapper,
  SegmentedControl,
  SegmentedControlProps,
  TextInputProps,
} from "@mantine/core";

interface SegmentedInputProps extends TextInputProps {
  data: SegmentedControlProps["data"];
}

const SegmentedInput = forwardRef<HTMLInputElement, SegmentedInputProps>(
  (
    {
      label,
      data,
      description,
      error,
      onChange,
      value,
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
            <SegmentedControl
              value={value as string | undefined}
              onChange={(v) => onChange && onChange(v as any)}
              data={data}
              fullWidth
              key="input"
              size="xs"
              className={`mb-1 ${
                error && "border border-[var(--mantine-color-error)]"
              }`}
            />
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

    if (data && data.length >= 1) {
      return (
        <InputWrapper>
          <button ref={ref as any} />
          {content}
        </InputWrapper>
      );
    }
    return null;
  },
);
SegmentedInput.displayName = "SegmentedInput";
export default SegmentedInput;
