import { Form, FormItemProps } from 'antd';

export const FormItem = ({ children, ...props }: FormItemProps) => {
  return <Form.Item {...props}>{children}</Form.Item>;
};
