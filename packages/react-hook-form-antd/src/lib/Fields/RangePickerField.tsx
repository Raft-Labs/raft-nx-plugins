import { DatePicker, Form, FormItemProps } from 'antd';
import {
  PickerProps,
  RangePickerProps,
} from 'antd/lib/date-picker/generatePicker';
import { isEmpty } from 'lodash';
import moment, { Moment } from 'moment';
import { Controller, UseFormReturn } from 'react-hook-form';

type RangePickerFieldProps = PickerProps<Moment> &
  RangePickerProps<Moment> & {
    name: string;
    label: string;
    customHelp?: string;
    formHook: UseFormReturn<any>;
    formItemProps?: FormItemProps;
  };
const FormItem = Form.Item;

export const RangePickerField = ({
  name,
  label,
  formHook,
  customHelp,
  formItemProps,
  ...props
}: RangePickerFieldProps) => {
  const {
    control,
    formState: { errors },
  } = formHook;

  return (
    <Controller
      name={name}
      render={({ field }) => {
        const { onChange, value } = field;
        const { start_date, end_date } = value;
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
            <DatePicker.RangePicker
              {...props}
              onChange={(dates) => {
                const dateRange = {
                  start_date: dates?.[0]?.toISOString(),
                  end_date: dates?.[1]?.toISOString(),
                };
                onChange(dateRange);
              }}
              value={[moment(start_date), moment(end_date)]}
            />
          </FormItem>
        );
      }}
      control={control}
    />
  );
};
