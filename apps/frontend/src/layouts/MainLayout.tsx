import { ILayoutProvider, IResource, useResource } from '@raftlabs/nx-admin';
import { useRouter } from 'next/router';
import React from 'react';

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
