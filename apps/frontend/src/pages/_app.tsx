import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { GraphQLProvider } from '@raftlabs/hasura-react';
import { AuthProvider } from '@raftlabs/hbp-react';
import { Admin } from '@raftlabs/nx-admin';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { HASURA_BASE_URL } from '../configs';
import { auth } from '../helpers/hbp-helper';
import { resources } from '../helpers/resources';
import LayoutProvider from '../layouts/LayoutProvider';
import './styles.css';

initializeIcons(undefined, { disableWarnings: true });

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider auth={auth}>
      <GraphQLProvider auth={auth} url={HASURA_BASE_URL}>
        <Head>
          <title>Nx Admin</title>
        </Head>
        <main>
          <Admin resources={resources} layout={LayoutProvider}>
            <Component {...pageProps} />
          </Admin>
        </main>
      </GraphQLProvider>
    </AuthProvider>
  );
};

export default App;
