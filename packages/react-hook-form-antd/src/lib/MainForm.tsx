import { Form, FormProps } from 'antd';
import { FormProvider, UseFormReturn } from 'react-hook-form';

interface MainFormProps extends FormProps {
  formHook: UseFormReturn<any>;
  onSubmit: (values: any) => void;
}

export function MainForm({
  children,
  onSubmit,
  formHook,
  ...props
}: MainFormProps) {
  const { handleSubmit } = formHook;

  return (
    <FormProvider {...formHook}>
      <Form {...props} onFinish={handleSubmit(onSubmit)}>
        {children}
      </Form>
    </FormProvider>
  );
}
