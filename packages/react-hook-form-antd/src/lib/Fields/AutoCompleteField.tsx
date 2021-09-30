import { AutoComplete, AutoCompleteProps, Form, FormItemProps } from 'antd';
import { isEmpty } from 'lodash';
import { Controller, UseFormReturn } from 'react-hook-form';
interface AutoCompleteFieldProps extends AutoCompleteProps {
  name: string;
  label: string;
  customHelp?: string;
  formHook: UseFormReturn<any>;
  formItemProps?: FormItemProps;
}

const FormItem = Form.Item;

export const AutoCompleteField = ({
  name,
  label,
  formHook,
  customHelp,
  formItemProps,
  ...props
}: AutoCompleteFieldProps) => {
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
            <AutoComplete
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
