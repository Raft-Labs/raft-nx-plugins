import { ILayoutProvider } from '@raftlabs/nx-admin';
import { useRouter } from 'next/router';
import React from 'react';
import AuthLayout from './AuthLayout';
import MainLayout from './MainLayout';

const Layout = {
  main: MainLayout,
  auth: AuthLayout,
};

const LayoutProvider = ({ children, resources }: ILayoutProvider) => {
  const router = useRouter();
  const getLayout = () => {
    if (router.pathname.includes('auth')) {
      return 'auth';
    } else {
      return 'main';
    }
  };
  const CurrentLayout = Layout[getLayout()];
  return <CurrentLayout resources={resources}>{children}</CurrentLayout>;
};

export default LayoutProvider;
