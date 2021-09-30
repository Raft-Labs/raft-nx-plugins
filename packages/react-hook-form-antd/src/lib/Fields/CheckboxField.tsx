import { Checkbox, CheckboxProps, Form, FormItemProps } from 'antd';
import { isEmpty } from 'lodash';
import { Controller, UseFormReturn } from 'react-hook-form';

interface CheckboxFieldProps extends CheckboxProps {
  name: string;
  customHelp?: string;
  formHook: UseFormReturn<any>;
  formItemProps?: FormItemProps;
}
const FormItem = Form.Item;

export const CheckboxField = ({
  name,
  formHook,
  customHelp,
  formItemProps,
  children,
  ...props
}: CheckboxFieldProps) => {
  const {
    control,
    formState: { errors },
  } = formHook;
  return (
    <Controller
      name={name}
      render={({ field }) => {
        const { onChange, value } = field;
        return (
          <FormItem
            {...formItemProps}
            validateStatus={
              !isEmpty(errors) && errors?.[name] ? 'error' : 'validating'
            }
            help={
              errors && errors?.[name]
                ? errors[name]?.message
                : customHelp || undefined
            }
          >
            <Checkbox {...props} checked={value} onChange={onChange}>
              {children}
            </Checkbox>
          </FormItem>
        );
      }}
      control={control}
    />
  );
};
