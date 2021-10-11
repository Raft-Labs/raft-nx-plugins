import { AppProps } from 'next/app';
import Head from 'next/head';
import { HASURA_BASE_URL } from '../configs';
import { Admin } from '../core/Admin';
import { auth } from '../helpers/hbp-helper';
import './styles.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Frontend</title>
      </Head>
      <main>
        <Admin
          resources={[{ label: 'Hello', name: 'hello' }]}
          auth={auth}
          url={HASURA_BASE_URL}
        >
          <Component {...pageProps} />
        </Admin>
      </main>
    </>
  );
};

export default App;
