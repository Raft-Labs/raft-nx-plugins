import { Auth } from '@raftlabs/hbp-sdk';
import { isEmpty } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AuthContext } from './AuthContext';
import { AuthUser, AuthUserType } from './AuthUser';

interface AuthProviderProps {
  children: React.ReactNode;
  auth: Auth;
}

export function AuthProvider({ children, auth }: AuthProviderProps) {
  const isMounted = useRef(false);
  const [authState, setAuthState] = useState({
    signedIn: auth.isAuthenticated() || false,
    user: null as AuthUserType,
    loading: true,
    role: null as string | string[] | null,
  });

  useEffect(() => {
    isMounted.current = true;
    const resetUser = (signedIn: any) => {
      const user = auth.getUser();
      const role = auth.getClaim('x-hasura-default-role');
      if (isMounted.current) {
        setAuthState((oldValue) => ({
          ...oldValue,
          user,
          signedIn: signedIn == null ? !isEmpty(user) : signedIn,
          role,
        }));
      }
    };

    auth.onAuthStateChanged((data) => resetUser(data));

    auth.onTokenChanged(() => resetUser(null));

    auth.refreshToken().then(() => {
      setTimeout(() => {
        setAuthState((oldValue) => ({
          ...oldValue,
          loading: false,
        }));
      }, 1000);
    });

    return () => {
      isMounted.current = false;
    };
  }, [auth]);

  const setUser = useCallback(
    (user: AuthUser) => {
      setAuthState((oldValue) => ({ ...oldValue, user }));
    },
    [setAuthState]
  );

  return (
    <AuthContext.Provider value={{ ...authState, setUser }}>
      {!authState.loading ? children : null}
    </AuthContext.Provider>
  );
}
