import { Form, FormItemProps, Switch, SwitchProps } from 'antd';
import { isEmpty } from 'lodash';
import { Controller, UseFormReturn } from 'react-hook-form';

interface SwitchFieldProps extends SwitchProps {
  name: string;
  label: string;
  customHelp?: string;
  formHook: UseFormReturn<any>;
  formItemProps?: FormItemProps;
}
const FormItem = Form.Item;

export const SwitchField = ({
  name,
  label,
  formHook,
  customHelp,
  formItemProps,
  ...props
}: SwitchFieldProps) => {
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
            <Switch {...props} checked={value} onChange={onChange} />
          </FormItem>
        );
      }}
      control={control}
    />
  );
};
