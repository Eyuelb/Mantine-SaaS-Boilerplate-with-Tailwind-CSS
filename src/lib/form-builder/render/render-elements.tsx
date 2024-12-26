/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useMemo } from "react";
import {
  Checkbox,
  FileInput,
  InputLabel,
  MultiSelect,
  NumberInput,
  PasswordInput,
  Radio,
  RadioGroup,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import {
  Control,
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  get,
  UseFormReturn,
  UseFormStateReturn,
} from "react-hook-form";
import { TableField } from "../fields/table";
import { PanelField } from "../fields/panel";
import { TField } from "../model";
import AsyncSelect from "../fields/async-select";
import SegmentedInput from "../fields/segment";
import SwitchInput from "../fields/switch";
import { ErrorMessage } from "../fields/error-message";
import { compareValues, generateValidationRules } from "../utils";
import RadioCardInput from "../fields/radio-card";

interface RenderControllerProps<T extends FieldValues> {
  control: Control<T, any>;
  config: TField<T>;
  render: ({
    field,
    fieldState,
    formState,
  }: {
    field: ControllerRenderProps<T, any>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<T>;
    defaultProps: Record<string, any>;
  }) => React.ReactElement;
}
const RenderController = <T extends FieldValues>({
  config,
  control,
  render,
}: RenderControllerProps<T>) => {
  // useRenderCount(`RenderController (${config.label})`);

  const { rules, isRequired } = useMemo(
    () => ({
      rules: generateValidationRules(config.validationRules),
      isRequired: config.validationRules?.required,
    }),
    [config.validationRules],
  );
  const icon = config.icon ? <config.icon size={16} /> : undefined;

  return (
    <Controller
      name={config.name as any}
      control={control}
      rules={rules as any}
      defaultValue={config.defaultValue ?? ("" as any)}
      render={(renderProps) => {
        //       console.log(config.defaultValue)

        const defaultProps = {
          label: config.label,
          placeholder: config.placeholder ?? "",
          description: config.description,
          withAsterisk: isRequired,
          disabled: config.disabled ?? false,
          hidden: config.hidden ?? false,
          leftSection: icon,

          inputWrapperOrder: ["label", "input", "error", "description"],
          error: get(renderProps.formState.errors, config.name as string) && (
            <ErrorMessage
              errors={renderProps.formState.errors}
              name={config.name as any}
              render={({ message }) => message}
            />
          ),
          rules,
        };
        //  console.log(renderProps.field.value, config.name)
        return render({ ...renderProps, defaultProps });
      }}
    />
  );
};
interface RenderElementsProps<T extends FieldValues> {
  element: TField<T>;
  methods: UseFormReturn<T>;
  editing?: boolean;
}

const RenderElements = <T extends FieldValues>({
  element,
  methods,
  editing,
}: RenderElementsProps<T>) => {
  const { showWhen, disabledWhen, visibleRules } = element;
  const { control } = methods;
  const getFieldElement = (config: TField<T>) => {
    const commonProps = { config, control };
    switch (config.type) {
      case "text":
        return (
          <RenderController<T>
            {...commonProps}
            render={({ field, defaultProps }) => (
              <TextInput {...field} {...defaultProps} />
            )}
          />
        );
      case "textarea":
        return (
          <RenderController<T>
            {...commonProps}
            render={({ field, defaultProps }) => (
              <Textarea {...field} {...defaultProps} />
            )}
          />
        );
      case "number":
        return (
          <RenderController<T>
            {...commonProps}
            render={({ field, defaultProps }) => (
              <NumberInput
                {...field}
                value={Number(field.value)}
                {...defaultProps}
                allowNegative={false}
                min={0}
                defaultValue={""}
                {...config.numberProps}
              />
            )}
          />
        );
      case "datetime":
        return (
          <RenderController<T>
            {...commonProps}
            render={({ field, defaultProps }) => (
              <DateInput
                {...field}
                {...defaultProps}
                value={field.value ? new Date(field.value) : undefined}
                onChange={(v) => field.onChange(v?.toUTCString())}
              />
            )}
          />
        );
      case "select":
        return (
          <RenderController<T>
            {...commonProps}
            render={({ field, defaultProps }) => (
              <Select {...field} {...defaultProps} data={config.data || []} />
            )}
          />
        );
      case "multiselect":
        return (
          <RenderController<T>
            {...commonProps}
            config={{ ...commonProps.config, defaultValue: [] }}
            render={({ field, defaultProps }) => (
              <MultiSelect
                {...field}
                {...defaultProps}
                data={config.data || []}
                defaultValue={[]}
              />
            )}
          />
        );
      case "async-select":
        return (
          <RenderController<T>
            {...commonProps}
            render={({ field, defaultProps }) => (
              <AsyncSelect
                {...field}
                {...defaultProps}
                dataSource={config.asyncDataSource}
                data={config.data || []}
              />
            )}
          />
        );
      case "file":
        return (
          <RenderController<T>
            {...commonProps}
            render={({ field, defaultProps }) => (
              <FileInput {...field} {...defaultProps} />
            )}
          />
        );
      case "radio":
        return (
          <RenderController<T>
            {...commonProps}
            render={({ field, defaultProps }) => (
              <RadioGroup {...field} {...defaultProps}>
                {config.data?.map((option) => (
                  <Radio
                    key={option.value}
                    value={option.value}
                    label={option.label}
                    size="xs"
                    mt={6}
                  />
                ))}
              </RadioGroup>
            )}
          />
        );
      case "checkbox":
        return (
          <RenderController<T>
            {...commonProps}
            config={{
              ...commonProps.config,
              ...(!commonProps.config.defaultValue
                ? { defaultValue: undefined }
                : {}),
            }}
            render={({
              field,
              defaultProps: { inputWrapperOrder, ...defaultProps },
            }) => (
              <Checkbox
                key={String(field.value)}
                {...field}
                checked={Boolean(field.value)}
                {...defaultProps}
                size="xs"
              />
            )}
          />
        );
      case "label":
        return <InputLabel size="sm">{config.label}</InputLabel>;
      case "panel":
        return (
          <RenderController<T>
            {...commonProps}
            render={({ field, defaultProps }) => (
              <PanelField
                field={{ ...config }}
                {...field}
                {...defaultProps}
                methods={methods}
              />
            )}
          />
        );
      case "table":
        return (
          <RenderController<T>
            {...commonProps}
            config={{ ...commonProps.config, defaultValue: [] }}
            render={({ field, defaultProps }) => (
              <TableField
                field={{ ...config }}
                {...field}
                {...defaultProps}
                methods={methods}
              />
            )}
          />
        );
      case "switch":
        return (
          <RenderController<T>
            {...commonProps}
            render={({ field, defaultProps }) => (
              <SwitchInput
                {...field}
                {...defaultProps}
                data={config.data || []}
              />
            )}
          />
        );
      case "radio-card":
        return (
          <RenderController<T>
            {...commonProps}
            render={({ field, defaultProps }) => (
              <RadioCardInput
                {...field}
                {...defaultProps}
                data={config.data || []}
              />
            )}
          />
        );
      case "segment":
        return (
          <RenderController<T>
            {...commonProps}
            render={({ field, defaultProps }) => (
              <SegmentedInput
                {...defaultProps}
                {...field}
                data={config.data || []}
              />
            )}
          />
        );
      case "password":
        return (
          <RenderController<T>
            {...commonProps}
            render={({ field, defaultProps }) => (
              <PasswordInput {...field} {...defaultProps} />
            )}
          />
        );

      default:
        return <div>Field type {config.type} not supported</div>;
    }
  };
  const disabled = useMemo(
    () => (disabledWhen ? disabledWhen(methods) : element.disabled),
    [element.disabled, disabledWhen],
  );

  const showControl = useCallback(
    (children: React.ReactNode) => {
      if (visibleRules && visibleRules.comparison) {
        if (editing) return children;
        const comparisonResult = compareValues(
          methods.watch(visibleRules.fieldName),
          visibleRules.fieldValue,
          visibleRules.comparison,
          visibleRules.caseSensitivity,
        );

        if (comparisonResult) {
          return visibleRules.whenVisibleRulesPass === "showField"
            ? children
            : null;
        } else {
          return visibleRules.whenVisibleRulesPass === "hideField"
            ? children
            : null;
        }
      }
      return showWhen && !showWhen(methods) ? null : children;
    },
    [showWhen, visibleRules, methods, editing],
  );

  return showControl(getFieldElement({ ...element, disabled }));
};

export default RenderElements;
