import { createGQLClient } from '@raftlabs/hasura-react';
import { createClient } from '@raftlabs/hbp-sdk';
import { HASURA_BASE_URL, HBP_BASE_URL } from '../configs';

export const { auth, storage } = createClient({
  ssr: !process.browser,
  baseURL: HBP_BASE_URL,
});

export const { client } = createGQLClient(HASURA_BASE_URL, auth);
