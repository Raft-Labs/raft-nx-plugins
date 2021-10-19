import React, { DetailedHTMLProps, FC, FormHTMLAttributes } from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';

export interface FormProps
  extends DetailedHTMLProps<
    FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {
  formHook: UseFormReturn<any>;
  onSubmit: (values: any) => void;
}

export const Form: FC<FormProps> = ({
  children,
  formHook,
  onSubmit,
  ...props
}) => {
  const { handleSubmit } = formHook;

  return (
    <FormProvider {...formHook}>
      <form {...props} onSubmit={handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};
