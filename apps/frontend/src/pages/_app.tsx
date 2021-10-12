import { initializeIcons } from '@fluentui/font-icons-mdl2';
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
import GraphQlProvider from '../helpers/urqlClient';
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
    <>
      <Head>
        <title>Nx Admin</title>
      </Head>
      <main>
        <GraphQlProvider>
          <Admin resources={resources} layout={LayoutProvider}>
            <Component {...pageProps} />
          </Admin>
        </GraphQlProvider>
      </main>
    </>
  );
};

export default App;
