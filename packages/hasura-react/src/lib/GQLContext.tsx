import { Client } from '@urql/core';
import { createContext } from 'react';

export const GQLContext = createContext<{ client: Client }>({
  client: null,
});
