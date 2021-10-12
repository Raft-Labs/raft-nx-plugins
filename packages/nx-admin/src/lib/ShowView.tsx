import { Stack, Text } from '@fluentui/react';
import { get } from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useQuery } from 'urql';
import { useResource } from './Admin';
import { PageLoader } from './PageLoader';
import { IShowView } from './types';

export const ShowView = ({
  query,
  variables,
  pause = false,
  queryPath,
  children,
  title,
}: IShowView) => {
  const router = useRouter();
  const { item, setItem } = useResource();
  const { id, resource } = router.query;
  const [{ data, fetching, error }] = useQuery({
    query,
    variables: variables ? variables : { id },
    pause: !pause ? pause : !id,
    requestPolicy: 'network-only',
  });

  useEffect(() => {
    if (data && resource)
      setItem(get(data, queryPath || resource?.slice(0, -1)));
  }, [data, resource]);

  if (fetching) return <PageLoader />;
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
