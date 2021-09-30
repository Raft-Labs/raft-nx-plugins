import { Form, FormItemProps, Select, SelectProps } from 'antd';
import { isEmpty } from 'lodash';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

interface SelectFieldProps extends SelectProps<any> {
  name: string;
  label: string | JSX.Element;
  customHelp?: string;
  formHook: UseFormReturn<any>;
  formItemProps?: FormItemProps;
}
const FormItem = Form.Item;

export const SelectField = ({
  name,
  label,
  formHook,
  options,
  customHelp,
  formItemProps,
  ...props
}: SelectFieldProps) => {
  const {
    control,
    formState: { errors },
  } = formHook;
  return (
    <Controller
      name={name}
      render={({ field }) => {
        const { onChange, value, onBlur } = field;
        return (
          <FormItem
            {...formItemProps}
            label={label}
            validateStatus={
              !isEmpty(errors) && errors?.[name] ? 'error' : 'validating'
            }
            help={
              errors && errors?.[name]
                ? errors[name]?.message
                : customHelp || undefined
            }
          >
            <Select
              {...props}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              options={options}
            />
          </FormItem>
        );
      }}
      control={control}
    />
  );
};
