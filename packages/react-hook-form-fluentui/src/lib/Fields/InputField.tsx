import { ITextFieldProps, TextField } from '@fluentui/react';
import { FC } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

export interface InputFieldProps extends ITextFieldProps {
  formHook: UseFormReturn<any>;
  name: string;
}

export const InputField: FC<InputFieldProps> = ({
  formHook,
  name,
  ...props
}) => {
  const { control } = formHook;

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <TextField
          {...props}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          name={name}
          errorMessage={error && error.message}
        />
      )}
    />
  );
};
