import { Spinner, SpinnerSize, Stack } from '@fluentui/react';
import React from 'react';

export const PageLoader = () => {
  return (
    <Stack
      styles={{
        root: {
          height: '93vh',
          width: '100%',
        },
      }}
      verticalAlign="center"
      horizontalAlign="center"
    >
      <Spinner size={SpinnerSize.large} />
    </Stack>
  );
};
