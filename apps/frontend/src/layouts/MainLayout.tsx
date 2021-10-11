import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { useResource } from '../hooks/useResource';
import { ILayoutProvider, IResource } from '../types/interfaces';

const MainLayout = ({ resources, children }: ILayoutProvider) => {
  const router = useRouter();
  const { setResource } = useResource();

  const onClickMenu = async (resource: IResource) => {
    await setResource(resource);
    router.push(`/${resource?.name}/list`);
  };
  return <div>{children}</div>;
};

export default MainLayout;
