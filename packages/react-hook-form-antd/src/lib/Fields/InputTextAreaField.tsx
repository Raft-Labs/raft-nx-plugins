import { Form, FormItemProps, Input } from 'antd';
import { TextAreaProps } from 'antd/lib/input';
import { isEmpty } from 'lodash';
import { Controller, UseFormReturn } from 'react-hook-form';

interface InputTextAreaFieldProps extends TextAreaProps {
  name: string;
  label?: string;
  customHelp?: string;
  formHook: UseFormReturn<any>;
  formItemProps?: FormItemProps;
}
const FormItem = Form.Item;

export const InputTextAreaField = ({
  name,
  label,
  formHook,
  customHelp,
  formItemProps,
  className,
  ...props
}: InputTextAreaFieldProps) => {
  const {
    control,
    formState: { errors },
  } = formHook;
  const cls = [className, 'pid-discussion--type-suggestion']
    .filter(Boolean)
    .join(' ');
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
              <span className="text-xs lg:text-base">
                {errors && errors?.[name]
                  ? errors[name]?.message
                  : customHelp || undefined}
              </span>
            }
          >
            <Input.TextArea
              {...props}
              className={cls}
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
