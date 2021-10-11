import { IColumn } from '@fluentui/react/lib/DetailsList';
import { Auth } from '@raftlabs/hbp-sdk';
import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
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
  auth?: Auth;
  url?: string;
  resources: IResource[];
  children: ReactNode;
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
