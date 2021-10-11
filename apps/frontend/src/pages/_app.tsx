import { Admin, IResource } from '@raftlabs/nx-admin';
import { AppProps } from 'next/app';
import Head from 'next/head';
import {
  HelloCreate,
  HelloEdit,
  HelloList,
  HelloShow,
} from '../components/Hello';
import LayoutProvider from '../layouts/LayoutProvider';
import './styles.css';

const App = ({ Component, pageProps }: AppProps) => {
  const resources: IResource[] = [
    {
      label: 'Hello',
      name: 'hello',
      list: HelloList,
      create: HelloCreate,
      edit: HelloEdit,
      show: HelloShow,
    },
  ];

  return (
    <>
      <Head>
        <title>Nx Admin</title>
      </Head>
      <main>
        <Admin resources={resources} layout={LayoutProvider}>
          <Component {...pageProps} />
        </Admin>
      </main>
    </>
  );
};

export default App;
