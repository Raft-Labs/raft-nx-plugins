import { createContext } from 'react';
import { TAuth } from './types';

export const AuthContext = createContext<TAuth>({
  signedIn: false,
  user: undefined,
  setUser: undefined,
});
