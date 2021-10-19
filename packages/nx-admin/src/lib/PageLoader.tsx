import { Shimmer, Spinner, SpinnerSize, Stack } from '@fluentui/react';
import React from 'react';
import { IPageLoaderProps } from './types';

export const PageLoader = ({
  spinner = false,
  shimmerProps,
}: IPageLoaderProps) => {
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
      {spinner ? (
        <Spinner size={SpinnerSize.large} />
      ) : (
        <Shimmer {...shimmerProps} />
      )}
    </Stack>
  );
};
