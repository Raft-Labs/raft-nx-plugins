import React, { createContext, useState } from 'react';
import LayoutProvider from '../layouts/LayoutProvider';
import { IAdmin, IResource, IResourceContext } from '../types/interfaces';

export const ResourceContext = createContext<IResourceContext>(null);

export const Admin = ({ auth, url, resources, children }: IAdmin) => {
  const [resource, setResource] = useState<IResource>(resources[0]);

  return (
    // <AuthProvider auth={auth}>
    //   <GraphQLProvider auth={auth} url={url}>
    <ResourceContext.Provider value={{ resource, setResource }}>
      <LayoutProvider resources={resources}>{children}</LayoutProvider>
    </ResourceContext.Provider>
    //   </GraphQLProvider>
    // </AuthProvider>
  );
};
