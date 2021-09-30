import { Form, FormItemProps, Radio, RadioGroupProps } from 'antd';
import { isEmpty } from 'lodash';
import { Controller, UseFormReturn } from 'react-hook-form';

interface RadioGroupFieldProps extends RadioGroupProps {
  name: string;
  label: string;
  customHelp?: string;
  formHook: UseFormReturn<any>;
  formItemProps?: FormItemProps;
}
const FormItem = Form.Item;

export const RadioGroupField = ({
  name,
  label,
  formHook,
  options,
  customHelp,
  formItemProps,
  ...props
}: RadioGroupFieldProps) => {
  const {
    control,
    formState: { errors },
  } = formHook;

  return (
    <Controller
      name={name}
      control={control}
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
            <Radio.Group
              {...props}
              options={options}
              value={value}
              onChange={onChange}
            />
          </FormItem>
        );
      }}
    />
  );
};
