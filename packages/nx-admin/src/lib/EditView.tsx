import { Stack, Text } from '@fluentui/react';
import { get } from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useMutation, useQuery } from 'urql';
import { useResource } from './Admin';
import { PageLoader } from './PageLoader';
import { IEditView } from './types';

export const EditView = ({
  children,
  mutation,
  query,
  variables,
  pause = false,
  queryPath,
  title,
}: IEditView) => {
  const router = useRouter();
  const { item, setItem, setEditMutation } = useResource();
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

  const [, edit] = useMutation(mutation);

  useEffect(() => {
    if (mutation) setEditMutation(edit);
  }, [mutation]);

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
