import { FirebaseApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { FC, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider: FC<{ app: FirebaseApp }> = ({ children, app }) => {
  const [user, setUser] = useState<User>();
  const [signedIn, setSignedIn] = useState(false);

  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setSignedIn(true);
        setUser(user);
      } else {
        setSignedIn(false);
        setUser(undefined);
      }
    });
    return unsubscribe;
  }, [auth, app]);

  const value = { user, setUser, signedIn, auth };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
