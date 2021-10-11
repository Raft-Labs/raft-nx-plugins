import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';
import { useResource } from '../hooks/useResource';

const Dashboard = () => {
  const router = useRouter();
  const { name } = useResource();
  useEffect(() => {
    router.push(`/${name}/list`);
  }, []);
  return 'Loading....';
};

export default Dashboard;
