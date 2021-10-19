import { createClient } from '@raftlabs/hbp-sdk';
import { HBP_BASE_URL } from '../configs';

export const { auth, storage } = createClient({
  ssr: !process.browser,
  baseURL: HBP_BASE_URL,
});
