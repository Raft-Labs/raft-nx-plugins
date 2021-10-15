import { Stack, Text } from '@fluentui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useMutation } from 'urql';
import { useResource } from '..';
import { ICreateView } from './types';

export const CreateView = ({
  children,
  mutation,
  queryPath,
  title,
}: ICreateView) => {
  const router = useRouter();
  const { resource } = router.query;

  const { setCreateMutation } = useResource();
  const [, create] = useMutation(mutation);

  useEffect(() => {
    if (mutation && create) setCreateMutation(create);
  }, [mutation, create]);

  return (
    <Stack
      styles={{
        root: {
          width: '100%',
        },
      }}
    >
      <Text
        block
        variant={'xxLarge'}
        styles={{
          root: {
            textTransform: 'capitalize',
            paddingBottom: 10,
          },
        }}
      >
        {title ? title : resource}
      </Text>
      <Stack.Item>{children}</Stack.Item>
    </Stack>
  );
};
