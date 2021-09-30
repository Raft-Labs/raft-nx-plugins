import Auth from './libs/Auth';
import NhostClient from './libs/NhostClient';
import { UserConfig } from './libs/types';
export * from './libs/types';
export { NhostClient, createClient, Auth };

const createClient = (config: UserConfig) => {
  return new NhostClient(config);
};
