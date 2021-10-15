import {
  IStackStyles,
  IStackTokens,
  PrimaryButton,
  Stack,
  Text,
} from '@fluentui/react';
import { Depths } from '@fluentui/theme';
import { useAuth } from '@raftlabs/hbp-react';
import { PageLoader } from '@raftlabs/nx-admin';
import {
  Form,
  InputField,
  PasswordInputField,
} from '@raftlabs/react-hook-form-fluentui';
import { capitalize, get } from 'lodash';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { auth } from '../../../helpers/hbp-helper';
import signInSchema from './login.schema';

interface LoginProps {
  onLogin: (email: string, password: string) => Promise<any>;
  onSuccess: (user: any) => Promise<any>;
}

export default function Login({ onLogin, onSuccess }: LoginProps) {
  const innerStackTokens: IStackTokens = {
    childrenGap: 10,
    padding: 30,
  };
  const stackStyles: IStackStyles = {
    root: {
      width: 400,
      boxShadow: Depths.depth4,
      backgroundColor: '#faf9f8',
    },
  };
  const formHook = useForm({
    mode: 'all',
    resolver: signInSchema,
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const onSubmit = async ({ email, password }) => {
    setLoading(true);
    try {
      await auth.logout();
      const loginResponse = await onLogin(email, password);
      await auth.refreshToken(get(loginResponse, 'refresh_token'));

      setUser(auth.getUser());
      await onSuccess(auth.getUser());
      setLoading(false);
    } catch (error) {
      if (error) {
        const alertMessage =
          error?.response?.data?.message ||
          error.message.replace('[GraphQL] ', '').replaceAll('"', '');

        if (alertMessage) {
          const formattedError = capitalize(alertMessage);
          alert(formattedError);
        }
        console.log(error, alertMessage);
      }
      setLoading(false);
    }
  };

  if (loading) return <PageLoader />;

  return (
    <Form formHook={formHook} onSubmit={onSubmit}>
      <Stack
        horizontalAlign="center"
        verticalAlign="center"
        styles={stackStyles}
        tokens={innerStackTokens}
      >
        <Stack.Item>
          <Text variant="xxLarge">Login</Text>
        </Stack.Item>
        <Stack.Item styles={{ root: { width: '100%' } }}>
          <InputField
            required={true}
            label="Email"
            formHook={formHook}
            name="email"
          />
        </Stack.Item>
        <Stack.Item styles={{ root: { width: '100%' } }}>
          <PasswordInputField
            required={true}
            label="Password"
            formHook={formHook}
            name="password"
            strengthMeter={true}
          />
        </Stack.Item>
        <Stack.Item>
          <PrimaryButton disabled={loading} type="submit" text="Login" />
        </Stack.Item>
      </Stack>
    </Form>
  );
}
