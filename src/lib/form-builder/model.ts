/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  InputWrapperProps,
  NumberInputProps,
  ScrollAreaProps,
  StackProps,
  TextProps,
} from "@mantine/core";
import { FieldValues, PathValue, UseFormReturn } from "react-hook-form";
import { validator } from "./utils";
export type TFieldType =
  | "text"
  | "textarea"
  | "richtext"
  | "number"
  | "datetime"
  | "select"
  | "multiselect"
  | "file"
  | "radio"
  | "checkbox"
  | "label"
  | "panel"
  | "table"
  | "switch"
  | "segment"
  | "password"
  | "async-select"
  | "radio-card";
export type TField<T extends FieldValues> = {
  id?: string;
  position?: number;
  type: TFieldType;
  label?: string;
  defaultValue?: PathValue<FieldValues, any>;
  name: T extends Array<infer U> ? keyof U : keyof T; // Handle both array and object fields
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  hidden?: boolean;
  icon?: any;
  page?: number;
  data?:
    | {
        label: string;
        value: string;
        description?: string;
      }[]
    | undefined;
  group?: T extends Array<infer U extends FieldValues>
    ? TField<U>[]
    : TField<T[keyof T]>[];
  asyncDataSource?: {
    valueKey?: string;
    labelKey?: string | string[];
    url?: string;
    method?: string;
    mapData?: (data: any) => DataItem[] | undefined;
  };
  showWhen?: (props: UseFormReturn<T>) => boolean;

  disabledWhen?: (props: UseFormReturn<T>) => boolean;
  panelProps?: {
    root?: StackProps;
    label?: TextProps;
    description?: TextProps;
    wrapper?: StackProps;
  };
  tableProps?: {
    root?: ScrollAreaProps;
    wrapper?: InputWrapperProps;
  };
  validationRules?: ValidationRules;
  numberProps?: NumberInputProps;
  visibleRules?: {
    fieldName: PathValue<FieldValues, any>;
    comparison: ComparisonType;
    caseSensitivity?: boolean;
    fieldValue: string;
    whenVisibleRulesPass?: string;
  };
};

export interface ValidationRules {
  required?: boolean | string;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (
    value: any,
    fun: typeof validator,
  ) => boolean | string | (boolean | string)[];
}

export interface DataItem {
  label: string;
  value: any;
}
export type ComparisonType =
  | "equals"
  | "notEquals"
  | "contains"
  | "notContains"
  | "startsWith"
  | "endsWith";
