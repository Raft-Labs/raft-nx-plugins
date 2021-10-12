import { INavLinkGroup, PartialTheme, ThemeProvider } from '@fluentui/react';
import { findKey } from 'lodash';
import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { IAdmin, IResource, IResourceContext } from './types';

export const ResourceContext = createContext({} as IResourceContext);

const basicTheme: PartialTheme = {
  palette: {
    themePrimary: '#0f8387',
    themeDark: '#324c4d',
  },
};

export const Admin = ({
  authProvider,
  gqlProvider,
  resources: resourcesData,
  layout,
  children,
  theme = basicTheme,
}: IAdmin) => {
  const router = useRouter();
  const { resource: resourceName } = router.query;
  const [resources, setResources] = useState<IResource[]>(resourcesData);
  const [resource, setResource] = useState<IResource>(resourcesData[0]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (resourceName && resourcesData) {
      setLoading(true);
      const resourceKey = findKey(
        resourcesData,
        (resource: IResource) => resource.name === resourceName
      );
      setResource(resources[parseInt(`${resourceKey}`)]);
      setLoading(false);
    }
  }, [resourceName, resourcesData]);

  const AuthProvider = authProvider;
  const GraphQLProvider = gqlProvider;
  const LayoutProvider = layout;

  return (
    <ThemeProvider theme={theme}>
      {/* <AuthProvider> */}
      {/* <GraphQLProvider> */}
      <ResourceContext.Provider
        value={{
          resource,
          setResource,
          resources,
          setResources,
          loading,
          setLoading,
        }}
      >
        <LayoutProvider resources={resources}>{children}</LayoutProvider>
      </ResourceContext.Provider>
      {/* </GraphQLProvider> */}
      {/* </AuthProvider> */}
    </ThemeProvider>
  );
};

export const useResource = () => {
  const {
    resource,
    setResource,
    resources,
    setResources,
    loading,
    setLoading,
  } = useContext(ResourceContext);
  const resourceRoutes: INavLinkGroup[] = [
    {
      links: resources.map((resource) => {
        return {
          name: resource?.label,
          url: `/${resource?.name}/list`,
          key: `${resource?.name}`,
          iconProps: {
            iconName: resource.icon ? resource?.icon : 'Contact',
          },
        };
      }),
    },
  ];
  return {
    ...resource,
    setResource,
    resources,
    setResources,
    resourceRoutes,
    setLoading,
    loading,
  };
};
