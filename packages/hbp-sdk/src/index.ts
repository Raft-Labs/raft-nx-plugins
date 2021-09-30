import Auth from './lib/Auth';
import NhostClient from './lib/NhostClient';
import { UserConfig } from './lib/types';
export * from './lib/types';
export { NhostClient, createClient, Auth };

const createClient = (config: UserConfig) => {
  return new NhostClient(config);
};
