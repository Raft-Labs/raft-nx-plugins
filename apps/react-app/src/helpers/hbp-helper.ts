import { createClient } from '@raftlabs/hbp-sdk';
import { HBP_BASE_URL } from '../config';

export const { auth, storage } = createClient({
  baseURL: HBP_BASE_URL,
});
