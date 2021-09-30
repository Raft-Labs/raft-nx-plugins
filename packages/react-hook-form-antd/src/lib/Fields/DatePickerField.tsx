import { DatePicker, Form, FormItemProps } from 'antd';
import { PickerProps } from 'antd/lib/date-picker/generatePicker';
import { isEmpty } from 'lodash';
import moment, { Moment } from 'moment';
import { Controller, UseFormReturn } from 'react-hook-form';

type DatePickerFieldProps = PickerProps<Moment> & {
  name: string;
  label: string;
  customHelp?: string;
  formHook: UseFormReturn<any>;
  formItemProps?: FormItemProps;
};
const FormItem = Form.Item;

export const DatePickerField = ({
  name,
  label,
  formHook,
  customHelp,
  formItemProps,
  ...props
}: DatePickerFieldProps) => {
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
            <DatePicker
              {...props}
              onBlur={onBlur}
              onChange={(date) => {
                onChange(date);
              }}
              value={moment(value).second(0)}
            />
          </FormItem>
        );
      }}
      control={control}
    />
  );
};
