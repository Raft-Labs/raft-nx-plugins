import { createContext } from 'react';
import { AuthUserType } from './AuthUser';

export const AuthContext = createContext({
  signedIn: false,
  loading: true,
  user: null as AuthUserType,
  setUser: (user: any) => {
    console.log(user);
  },
  role: null as string | string[] | null,
});
