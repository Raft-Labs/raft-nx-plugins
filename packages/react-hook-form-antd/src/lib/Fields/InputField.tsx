import { Form, FormItemProps, Input, InputProps } from 'antd';
import { isEmpty } from 'lodash';
import { LegacyRef } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

interface InputFieldProps extends InputProps {
  name: string;
  label: string;
  customHelp?: string;
  formHook: UseFormReturn<any>;
  formItemProps?: FormItemProps;
  ref?: LegacyRef<Input>;
}
const FormItem = Form.Item;

export const InputField = ({
  name,
  label,
  formHook,
  customHelp,
  formItemProps,
  ref,
  ...props
}: InputFieldProps) => {
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
            <Input
              {...props}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              ref={ref}
            />
          </FormItem>
        );
      }}
      control={control}
    />
  );
};
