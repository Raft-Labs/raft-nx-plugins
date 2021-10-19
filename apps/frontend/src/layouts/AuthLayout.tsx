import { Stack } from '@fluentui/react';
import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <Stack
      styles={{ root: { minHeight: '100vh' } }}
      horizontalAlign="center"
      verticalAlign="center"
    >
      {children}
    </Stack>
  );
};

export default AuthLayout;
