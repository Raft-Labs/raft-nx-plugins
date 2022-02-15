import { User } from '@raftlabs/hbp-sdk';

export interface AuthUser {
  id: string;
  display_name: string;
  email: string;
}

export type AuthUserType = User | null;
