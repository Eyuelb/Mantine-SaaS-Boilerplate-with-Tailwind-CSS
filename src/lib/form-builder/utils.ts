/* eslint-disable @typescript-eslint/no-explicit-any */
import { RegisterOptions } from "react-hook-form";
import { ComparisonType, DataItem, ValidationRules } from "./model";
type ValidatorProps = {
  fail?: string;
};
export const validator = {
  email: (value: string, props?: ValidatorProps) =>
    /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(value) ||
    (props?.fail ?? "Invalid Email"),

  arrayMax: (value: any[], max: number, props?: ValidatorProps) =>
    value.length <= max ||
    (props?.fail ?? `Array length must be less than or equal to ${max}`),

  arrayMin: (value: any[], min: number, props?: ValidatorProps) =>
    value.length >= min ||
    (props?.fail ?? `Array length must be greater than or equal to ${min}`),
};

export const generateValidationRules = (
  rules?: ValidationRules,
): RegisterOptions => {
  const validationRules: RegisterOptions = {};

  if (rules?.required) {
    validationRules.required =
      typeof rules.required === "string"
        ? rules.required
        : "This field is required";
  }

  if (rules?.minLength) {
    validationRules.minLength = {
      value: rules.minLength,
      message: `Minimum length is ${rules.minLength}`,
    };
  }

  if (rules?.maxLength) {
    validationRules.maxLength = {
      value: rules.maxLength,
      message: `Maximum length is ${rules.maxLength}`,
    };
  }

  if (rules?.pattern) {
    validationRules.pattern = {
      value: rules.pattern,
      message: "Invalid format",
    };
  }

  if (rules?.custom) {
    validationRules.validate = (value: any) => {
      const customValidation = rules.custom!(value, validator);

      if (Array.isArray(customValidation)) {
        // If it's an array of validation results, return the first error message that is a string
        for (const result of customValidation) {
          if (typeof result === "string") {
            return result;
          }
        }
        // If all results are boolean or if there's no error message, return true
        return customValidation.every((result) => result === true)
          ? true
          : "Invalid value";
      } else {
        // Handle single validation result
        if (typeof customValidation === "string") {
          return customValidation;
        }
        return customValidation ? true : "Invalid value";
      }
    };
  }

  return validationRules;
};

export function processData({
  data,
  valueKey,
  labelKey,
  placeholder = [],
  joinBy = " ",
}: {
  data: any;
  valueKey?: string;
  labelKey?: string | string[];
  placeholder: any;
  joinBy?: string;
}): DataItem[] {
  const uniqueValues = new Set<string>(); // Set to store unique values

  if (Array.isArray(data)) {
    if (!Array.isArray(labelKey) && labelKey && valueKey) {
      return data
        .map((item, index) => ({
          label:
            item[labelKey] !== undefined && item[labelKey] !== null
              ? item[labelKey]
              : "",
          value:
            item[valueKey] !== undefined && item[valueKey] !== null
              ? item[valueKey]
              : index,
        }))
        .filter((obj) => {
          const value = obj.value;
          if (!uniqueValues.has(value)) {
            uniqueValues.add(value); // Add value to set if not already present

            return true; // Include the object if the value is unique
          }
          return false; // Exclude the object if the value is duplicate
        });
    } else if (Array.isArray(labelKey) && valueKey) {
      return data
        .map((item, index) => ({
          label: labelKey
            .map((key) => item[key])
            .filter((label) => label !== undefined && label !== null)
            .join(joinBy),
          value:
            item[valueKey] !== undefined && item[valueKey] !== null
              ? item[valueKey]
              : index,
        }))
        .filter((obj) => {
          const value = obj.value;
          if (!uniqueValues.has(value)) {
            uniqueValues.add(value); // Add value to set if not already present

            return true; // Include the object if the value is unique
          }
          return false; // Exclude the object if the value is duplicate
        });
    } else {
      return data.map((item, index) => ({
        label: item !== undefined && item !== null ? item : "",
        value: String(index),
      }));
    }
  } else if (typeof data === "object") {
    return Object.keys(data).map((key) => ({
      label: data[key] !== undefined && data[key] !== null ? data[key] : "",
      // custom for org
      value:
        data[key] !== undefined && data[key] !== null
          ? data[key].replace(" ", "_")
          : "",
    }));
  } else {
    return placeholder;
  }
}

export function compareValues(
  value1: string,
  value2: string,
  comparison: ComparisonType = "equals",
  caseSensitivity: boolean = true,
): boolean {
  //console.log({value1,value2,comparison,caseSensitivity})
  if (!caseSensitivity) {
    value1 = value1?.toLowerCase();
    value2 = value2?.toLowerCase();
  }

  switch (comparison) {
    case "equals":
      return value1 === value2;
    case "notEquals":
      return value1 !== value2;
    case "contains":
      return value1?.includes(value2);
    case "notContains":
      return !value1?.includes(value2);
    case "startsWith":
      return value1?.startsWith(value2);
    case "endsWith":
      return value1?.endsWith(value2);
    default:
      throw new Error(`Unknown comparison type: ${comparison}`);
  }
}
