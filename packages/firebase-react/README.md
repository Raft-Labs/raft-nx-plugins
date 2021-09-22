# @raftlabs/firebase-react

Connect firebase with react and have user data in React Context.

Create a helper file and initialize firebase app

```js
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../config';

export const app = initializeApp(firebaseConfig);
```

Once the app is configured wrap the app with The AuthProvider and pass firebase app as prop.

```js
import { AuthProvider } from '@raftlabs/firebase-react';
import { AppProps } from 'next/app';
import { FC, useEffect } from 'react';
import { app as firebaseApp } from '../helpers/firebase.helpers';
import './styles.css';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AuthProvider app={firebaseApp}>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default App;
```

You will be able to get user, auth, signedIn from `useAuth()` hook.

This library was generated with [Nx](https://nx.dev).
