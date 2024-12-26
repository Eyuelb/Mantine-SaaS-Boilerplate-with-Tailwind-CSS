/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef } from "react";
import {
  InputDescription,
  InputError,
  InputLabel,
  InputWrapper,
  Switch as MSwitch,
  TextInputProps,
} from "@mantine/core";
import { TField } from "../model";

interface SwitchInputProps extends TextInputProps {
  data: TField<any>["data"];
}

const SwitchInput = forwardRef<HTMLInputElement, SwitchInputProps>(
  (
    {
      label,
      data,
      description,
      error,
      onChange,
      value,
      defaultValue,
      withAsterisk,
      inputWrapperOrder,
    },
    ref,
  ) => {
    if (data && data.length >= 1 && data[0]) {
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
              <MSwitch
                key="input"
                ref={ref}
                checked={value === data[0].value} // Assuming the first item in statuses is the "active" state
                defaultChecked={Boolean(defaultValue)}
                onChange={() =>
                  onChange &&
                  onChange(
                    value === data[0].value
                      ? (data[1].value as any)
                      : (data[0].value as any),
                  )
                }
                color={value === data[0].value ? "green" : "red"}
              />
            );
          case "description":
            return (
              <InputDescription key="description">
                {description}
              </InputDescription>
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
      return <InputWrapper>{content}</InputWrapper>;
    }
    return <></>;
  },
);
SwitchInput.displayName = "SwitchInput";
export default SwitchInput;
