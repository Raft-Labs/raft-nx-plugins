import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { GraphQLProvider } from '@raftlabs/hasura-react';
import { AuthProvider } from '@raftlabs/hbp-react';
import { Admin, IResource } from '@raftlabs/nx-admin';
import { AppProps } from 'next/app';
import Head from 'next/head';
import {
  DepartmentShow,
  DepartmentsList,
  HelloCreate,
  HelloEdit,
} from '../components/Departments';
import {
  DivisionsList,
  Hello1Create,
  Hello1Edit,
  Hello1Show,
} from '../components/Divisions';
import { HASURA_BASE_URL } from '../configs';
import { auth } from '../helpers/hbp-helper';
import LayoutProvider from '../layouts/LayoutProvider';
import './styles.css';

initializeIcons(undefined, { disableWarnings: true });

const App = ({ Component, pageProps }: AppProps) => {
  const resources: IResource[] = [
    {
      label: 'Departments',
      name: 'departments',
      list: DepartmentsList,
      create: HelloCreate,
      edit: HelloEdit,
      show: DepartmentShow,
    },
    {
      label: 'Divisions',
      name: 'divisions',
      list: DivisionsList,
      create: Hello1Create,
      edit: Hello1Edit,
      show: Hello1Show,
    },
  ];

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
