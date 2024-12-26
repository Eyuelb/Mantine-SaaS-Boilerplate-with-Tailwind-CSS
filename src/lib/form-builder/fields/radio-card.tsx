/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef } from "react";
import {
  Group,
  InputDescription,
  InputError,
  InputLabel,
  InputWrapper,
  Radio,
  Stack,
  Text,
  TextInputProps,
} from "@mantine/core";
import classes from "./radio-card.module.css";
import { TField } from "../model";

interface SegmentedInputProps extends TextInputProps {
  data: TField<any>["data"];
}

const RadioCardInput = forwardRef<HTMLInputElement, SegmentedInputProps>(
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
            <Radio.Group
              defaultValue={defaultValue as string | undefined}
              value={value as string | undefined}
              onChange={(v) => onChange && onChange(v as any)}
              key="input"
              size="xs"
              className={`mb-1 ${
                error && "border border-[var(--mantine-color-error)]"
              }`}
            >
              <Stack pt="md" gap="xs">
                {data?.map((item) => (
                  <Radio.Card
                    className={classes.root}
                    radius="md"
                    value={item.value}
                    key={item.value}
                  >
                    <Group wrap="nowrap" align="flex-start">
                      <Radio.Indicator />
                      <div>
                        <Text className={classes.label}>{item.label}</Text>
                        <Text className={classes.description}>
                          {item?.description}
                        </Text>
                      </div>
                    </Group>
                  </Radio.Card>
                ))}
              </Stack>
            </Radio.Group>
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
RadioCardInput.displayName = "RadioCardInput";
export default RadioCardInput;
