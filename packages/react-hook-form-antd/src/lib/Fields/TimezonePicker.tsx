import { Form, FormItemProps, Select, SelectProps } from 'antd';
import { isEmpty } from 'lodash';
import { Controller, UseFormReturn } from 'react-hook-form';
import timezones from 'timezones-list';

interface TimezonePickerProps extends SelectProps<any> {
  name: string;
  label: string | JSX.Element;
  customHelp?: string;
  formHook: UseFormReturn<any>;
  formItemProps?: FormItemProps;
}
const FormItem = Form.Item;
const options = timezones.map((timezone) => {
  return {
    label: timezone?.label,
    value: timezone?.tzCode,
  };
});
export const TimezonePicker = ({
  name,
  label,
  formHook,
  customHelp,
  formItemProps,
  ...props
}: TimezonePickerProps) => {
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
              defaultValue="Europe/Dublin"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              options={options}
              showSearch
            />
          </FormItem>
        );
      }}
      control={control}
    />
  );
};
