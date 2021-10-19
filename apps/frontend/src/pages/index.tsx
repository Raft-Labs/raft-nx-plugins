import { PageLoader, useResource } from '@raftlabs/nx-admin';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Dashboard = () => {
  const router = useRouter();
  const { name } = useResource();
  useEffect(() => {
    router.push(`/${name}/list`);
  }, []);
  return <PageLoader />;
};

export default Dashboard;
