import { IColumn, PartialTheme } from '@fluentui/react';
import { Dispatch, FC, ReactNode, SetStateAction } from 'react';

export interface IResource {
  name: string;
  label: string;
  list?: FC;
  show?: FC;
  create?: FC;
  edit?: FC;
  icon?: string;
}
export interface IResourceContext {
  resource: IResource;
  setResource: Dispatch<SetStateAction<IResource>>;
  resources: IResource[];
  setResources: Dispatch<SetStateAction<IResource[]>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}
export interface IAdmin {
  gqlProvider?: FC;
  authProvider?: FC;
  resources: IResource[];
  children: ReactNode;
  layout: FC<ILayoutProvider>;
  theme?: PartialTheme;
}

export interface ILayoutProvider {
  children: ReactNode;
  resources?: IResource[];
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
