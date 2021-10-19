import {
  DetailsListLayoutMode,
  ShimmeredDetailsList,
  Stack,
  Text,
} from '@fluentui/react';
import { get } from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useQuery } from 'urql';
import { CreateButton, Search } from '..';
import { useResource } from './Admin';
import { PageLoader } from './PageLoader';
import { IListView } from './types';

export const ListView = ({
  query,
  columns,
  variables,
  pause = false,
  queryPath,
  children,
  title,
  searchProps,
}: IListView) => {
  const router = useRouter();
  const { resource } = router.query;
  const { items, setItems, create } = useResource();
  const [{ data, fetching, error }] = useQuery({
    query,
    variables,
    pause,
    requestPolicy: 'network-only',
  });

  useEffect(() => {
    if (data && resource) setItems(get(data, queryPath || resource));
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
      <Stack.Item
        align="stretch"
        styles={{
          root: {
            backgroundColor: '#fff',
          },
        }}
      >
        {children ? children : null}
      </Stack.Item>

      <Stack.Item styles={{ root: { paddingBottom: 15 } }}>
        <Stack verticalFill horizontal horizontalAlign="space-between">
          <Stack.Item>
            <Search {...searchProps} />
          </Stack.Item>
          <Stack.Item>{create ? <CreateButton /> : null}</Stack.Item>
        </Stack>
      </Stack.Item>

      <Stack.Item
        align="stretch"
        styles={{
          root: {
            backgroundColor: '#fff',
          },
        }}
      >
        <ShimmeredDetailsList
          items={items}
          columns={columns}
          setKey="none"
          isHeaderVisible={true}
          layoutMode={DetailsListLayoutMode.justified}
        />
      </Stack.Item>
    </Stack>
  );
};
