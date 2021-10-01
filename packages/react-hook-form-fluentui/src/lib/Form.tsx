import { Stack, IStackTokens, IStackStyles } from '@fluentui/react';
import { Depths } from '@fluentui/theme';
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
  const innerStackTokens: IStackTokens = {
    childrenGap: 10,
    padding: 15,
  };
  const stackStyles: IStackStyles = {
    root: {
      width: 400,
      boxShadow: Depths.depth4,
      backgroundColor: '#faf9f8',
    },
  };
  const { handleSubmit } = formHook;

  return (
    <FormProvider {...formHook}>
      <form {...props} onSubmit={handleSubmit(onSubmit)}>
        <Stack
          horizontalAlign="center"
          verticalAlign="center"
          styles={stackStyles}
          tokens={innerStackTokens}
        >
          {children}
        </Stack>
      </form>
    </FormProvider>
  );
};
