import { get } from 'lodash';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useClient } from 'urql';
import Login from '../../components/Auth/Login/Login';
import { login } from '../../components/Auth/Login/login.query';

export default function LoginPage(props) {
  const router = useRouter();
  const client = useClient();

  const loginMutate = (data) =>
    client
      .mutation(login, {
        data,
      })
      .toPromise();

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Login
        onLogin={async (email, password) => {
          const response = await loginMutate({
            roles: ['admin'],
            email,
            password,
          });

          if (response.error) {
            throw response.error;
          }

          return get(response, 'data.login');
        }}
        onSuccess={async () => {
          await router.push('/');
        }}
      />
    </>
  );
}
