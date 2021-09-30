import { createContext } from 'react';
import { AuthUserType } from './AuthUser';

export const AuthContext = createContext({
  signedIn: false,
  user: null as AuthUserType,
  setUser: (user: any) => {
    console.log(user);
  },
});
