import { IColumn } from '@fluentui/react/lib/DetailsList';
import React, {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

export interface IResource {
  name: string;
  label: string;
  list?: FC;
  show?: FC;
  create?: FC;
  edit?: FC;
  icon?: ReactNode;
}
export interface IResourceContext {
  resource: IResource;
  setResource: Dispatch<SetStateAction<IResource>>;
}
export interface IAdmin {
  gqlProvider?: FC;
  authProvider?: FC;
  resources: IResource[];
  children: ReactNode;
  layout: FC<ILayoutProvider>;
}

export interface ILayoutProvider {
  children: ReactNode;
  resources: IResource[];
}

export interface IListView {
  query?: string;
  columns?: IColumn;
  variables?: Record<string, unknown>;
  pause?: boolean;
  queryPath?: string;
  resource?: string;
  children?: ReactNode;
}

export const ResourceContext = createContext({} as IResourceContext);

export const Admin = ({
  authProvider,
  gqlProvider,
  resources,
  layout,
  children,
}: IAdmin) => {
  const [resource, setResource] = useState<IResource>(resources[0]);
  const AuthProvider = authProvider;
  const GraphQLProvider = gqlProvider;
  const LayoutProvider = layout;
  return (
    // <AuthProvider>
    // <GraphQLProvider>
    <ResourceContext.Provider value={{ resource, setResource }}>
      <LayoutProvider resources={resources}>{children}</LayoutProvider>
    </ResourceContext.Provider>
    // </GraphQLProvider>
    // </AuthProvider>
  );
};

export const useResource = () => {
  const { resource, setResource } = useContext(ResourceContext);
  return { ...resource, setResource };
};
