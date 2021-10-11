import { GraphQLProvider } from '@raftlabs/hasura-react';
import { AuthProvider } from '@raftlabs/hbp-react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { HASURA_BASE_URL } from '../configs';
import { auth } from '../helpers/hbp-helper';
import './styles.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider auth={auth}>
      <GraphQLProvider auth={auth} url={HASURA_BASE_URL}>
        <Head>
          <title>Frontend</title>
        </Head>
        <main>
          <Component {...pageProps} />
        </main>
      </GraphQLProvider>
    </AuthProvider>
  );
};

export default App;
