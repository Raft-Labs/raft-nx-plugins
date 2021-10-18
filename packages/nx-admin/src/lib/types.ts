import {
  IColumn,
  ISearchBoxProps,
  IShimmerProps,
  PartialTheme,
} from '@fluentui/react';
import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { OperationContext, OperationResult, TypedDocumentNode } from 'urql';
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
  createMutation: (
    variables?: any,
    context?: Partial<OperationContext> | undefined
  ) => Promise<OperationResult<any, any>>;
  setCreateMutation: Dispatch<
    SetStateAction<
      (
        variables?: any,
        context?: Partial<OperationContext> | undefined
      ) => Promise<OperationResult<any, any>>
    >
  >;
  editMutation: (
    variables?: any,
    context?: Partial<OperationContext> | undefined
  ) => Promise<OperationResult<any, any>>;
  setEditMutation: Dispatch<
    SetStateAction<
      (
        variables?: any,
        context?: Partial<OperationContext> | undefined
      ) => Promise<OperationResult<any, any>>
    >
  >;
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
  searchProps?: ISearchBoxProps;
}
export interface IShowView {
  query: TypedDocumentNode<any, any>;
  variables?: Record<string, unknown>;
  pause?: boolean;
  queryPath?: string;
  children: ReactNode;
  title?: string;
}

export interface IActionButtonWithIdProps {
  id: string;
  type?: 'icon' | 'primary' | 'link';
  title?: string;
}
export interface IActionButtonWithoutIdProps {
  type?: 'icon' | 'primary' | 'link';
  title?: string;
}

export interface ICreateView {
  mutation: string | TypedDocumentNode<any, any>;
  queryPath?: string;
  children: ReactNode;
  title?: string;
}
export interface IEditView {
  mutation: string | TypedDocumentNode<any, any>;
  query: string | TypedDocumentNode<any, any>;
  queryPath?: string;
  children: ReactNode;
  title?: string;
  variables?: Record<string, unknown>;
  pause?: boolean;
}

export interface IDeleteButtonProps extends IActionButtonWithIdProps {
  mutation: string | TypedDocumentNode<any, any>;
}

export interface IPageLoaderProps {
  spinner?: boolean;
  shimmerProps?: IShimmerProps;
}
