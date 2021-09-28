# @raftlabs/firebase-react

Connect firebase with react and have user data in React Context.

## How to use

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

Once the provider is ready you can use firebase functions and get auth in any page you want.

Example

```js
import { useAuth } from '@raftlabs/firebase-react';
import { signInWithEmailAndPassword } from 'firebase/auth';

const { auth } = useAuth();

const onSubmit = async ({ email, password }) => {
  try {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res);
        if (res.user.emailVerified !== true) {
          alert('email not verified please check your email');
        } else {
          console.log('Continue');
        }
      })
      .catch((err) => {
        alert('Login fail');
      });
  } catch (er) {
    console.log(er);
    throw er;
  }
};
```

## Who should use it?

If you just want a basic wrapper that provides user info and auth from firebase all over the application, You can use this library. If you want to expand more functionality its better to create a context on your own.

## What problems are we solving?

When implementing firebase in an app, we want that data to be accessible all over the application. creating context and a hook that can provide the same is exhausting, Thus wrapping app with this context provides you the hook that provides the basic items that needs to be imported in all the required pages.

## useAuth

You will be able to get user, auth, signedIn from `useAuth()` hook.

| Item     | Description                                          | Type            |
| -------- | ---------------------------------------------------- | --------------- |
| user     | Provides logged in users info.                       | User - Firebase |
| auth     | Provides auth instance with the created firebase app | Auth - Firebase |
| signedIn | Provides whether the user is logged in or not.       | Boolean         |
