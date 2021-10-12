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
  const [item, setItem] = useState([]);
  const [items, setItems] = useState([]);

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

  const LayoutProvider = layout;

  return (
    <ThemeProvider theme={theme}>
      <ResourceContext.Provider
        value={{
          resource,
          setResource,
          resources,
          setResources,
          loading,
          setLoading,
          setItem,
          item,
          setItems,
          items,
        }}
      >
        <LayoutProvider resources={resources}>{children}</LayoutProvider>
      </ResourceContext.Provider>
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
    setItem,
    item,
    setItems,
    items,
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
    setItem,
    item,
    setItems,
    items,
  };
};
