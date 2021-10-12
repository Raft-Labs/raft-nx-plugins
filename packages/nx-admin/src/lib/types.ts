import { IColumn, PartialTheme } from '@fluentui/react';
import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { TypedDocumentNode } from 'urql';
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
  item: any;
  setItem: Dispatch<SetStateAction<any>>;
  items: any;
  setItems: Dispatch<SetStateAction<any>>;
}
export interface IAdmin {
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
  query: TypedDocumentNode<any, any>;
  columns?: IColumn[];
  variables?: Record<string, unknown>;
  pause?: boolean;
  queryPath?: string;
  children?: ReactNode;
  title?: string;
}
export interface IShowView {
  query: TypedDocumentNode<any, any>;
  variables?: Record<string, unknown>;
  pause?: boolean;
  queryPath?: string;
  children: ReactNode;
  title?: string;
}

export interface IActionButtonProps {
  id: string;
  type?: 'icon' | 'primary';
  tooltip?: string;
}
