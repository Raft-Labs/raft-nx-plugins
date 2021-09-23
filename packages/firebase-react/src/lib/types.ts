import { Auth, User } from 'firebase/auth';
import { Dispatch, SetStateAction } from 'react';

export type TAuth = {
  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>> | undefined;
  signedIn: boolean;
  auth: Auth | undefined;
};
