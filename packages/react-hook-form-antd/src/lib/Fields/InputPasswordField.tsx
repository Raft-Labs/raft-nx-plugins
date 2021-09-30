import { Form, FormItemProps, Input } from 'antd';
import { PasswordProps } from 'antd/lib/input';
import { isEmpty } from 'lodash';
import { Controller, UseFormReturn } from 'react-hook-form';
interface InputPasswordProps extends PasswordProps {
  name: string;
  label: string;
  customHelp?: string;
  formHook: UseFormReturn<any>;
  formItemProps?: FormItemProps;
}
const FormItem = Form.Item;

export const InputPasswordField = ({
  name,
  label,
  formHook,
  customHelp,
  formItemProps,
  ...props
}: InputPasswordProps) => {
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
            <Input.Password
              {...props}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
          </FormItem>
        );
      }}
      control={control}
    />
  );
};
