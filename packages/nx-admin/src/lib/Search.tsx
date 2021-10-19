import { ISearchBoxProps, SearchBox, Stack } from '@fluentui/react';
import React from 'react';

export const Search = (props: ISearchBoxProps) => {
  return (
    <Stack.Item styles={{ root: { width: 300 } }}>
      <SearchBox {...props} />
    </Stack.Item>
  );
};
