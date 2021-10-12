import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { Admin, IResource } from '@raftlabs/nx-admin';
import { AppProps } from 'next/app';
import Head from 'next/head';
import {
  HelloCreate,
  HelloEdit,
  HelloList,
  HelloShow,
} from '../components/Hello';
import {
  Hello1Create,
  Hello1Edit,
  Hello1List,
  Hello1Show,
} from '../components/Hello1';
import LayoutProvider from '../layouts/LayoutProvider';
import './styles.css';
initializeIcons(undefined, { disableWarnings: true });

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
    {
      label: 'Hello1',
      name: 'hello1',
      list: Hello1List,
      create: Hello1Create,
      edit: Hello1Edit,
      show: Hello1Show,
    },
    {
      label: 'Hello2',
      name: 'hello2',
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
