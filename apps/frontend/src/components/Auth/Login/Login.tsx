import { Link, PrimaryButton, Stack, Text } from '@fluentui/react';
import {
  Form,
  InputField,
  PasswordInputField,
} from '@raftlabs/react-hook-form-fluentui';
import React from 'react';
import { useForm } from 'react-hook-form';
import signInSchema from './login.schema';

const Login = () => {
  const formHook = useForm({
    mode: 'all',
    resolver: signInSchema,
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async ({ email, password }) => {
    try {
      console.log(email, password);
    } catch (er) {
      console.log(er);
      throw er;
    }
  };
  return (
    <>
      <Form formHook={formHook} onSubmit={onSubmit}>
        <Stack.Item>
          <Text variant="xxLarge">Login</Text>
        </Stack.Item>
        <Stack.Item>
          <InputField
            required={true}
            label="Email"
            formHook={formHook}
            Styles={{ root: { width: 300 } }}
            name="email"
          />
        </Stack.Item>
        <Stack.Item>
          <PasswordInputField
            required={true}
            label="Password"
            formHook={formHook}
            Styles={{ root: { width: 300 } }}
            name="password"
            strengthMeter={true}
          />
        </Stack.Item>
        <Stack.Item>
          <PrimaryButton type="submit" text="Login" />
        </Stack.Item>
        <Stack.Item>
          <Link href="/forgot-password">Forgot Password ?</Link>
        </Stack.Item>
        <Stack.Item>
          <Text>Do not have an account ?</Text>
        </Stack.Item>
        <Stack.Item>
          <Link href="/sign-up">Sign Up</Link>
        </Stack.Item>
      </Form>
    </>
  );
};

export default Login;
