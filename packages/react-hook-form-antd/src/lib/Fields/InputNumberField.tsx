import { Form, FormItemProps, InputNumber, InputNumberProps } from 'antd';
import { isEmpty } from 'lodash';
import { Controller, UseFormReturn } from 'react-hook-form';
interface InputNumberFieldProps extends InputNumberProps {
  name: string;
  label: string;
  customHelp?: string;
  formHook: UseFormReturn<any>;
  formItemProps?: FormItemProps;
}
const FormItem = Form.Item;

export const InputNumberField = ({
  name,
  label,
  formHook,
  customHelp,
  formItemProps,
  ...props
}: InputNumberFieldProps) => {
  const {
    control,
    formState: { errors },
  } = formHook;

  return (
    <Controller
      name={name}
      control={control}
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
            <InputNumber
              {...props}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
          </FormItem>
        );
      }}
    />
  );
};
