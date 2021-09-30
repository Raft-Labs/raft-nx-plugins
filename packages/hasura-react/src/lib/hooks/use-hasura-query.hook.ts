import { get, toString } from 'lodash';
import { useState } from 'react';
import { OperationContext, useQuery, UseQueryArgs, UseQueryState } from 'urql';

interface HasuraQueryArgs<Data, Variables>
  extends UseQueryArgs<Data, Variables> {
  path?: string;
  pagination?: boolean;
  totalPath?: string;

  defaultCurrent?: number;
  defaultPageSize?: number;
  pageSizeOptions?: Array<string>;
}

interface HasuraPagination {
  onChange: (page: number, pageSize: number) => void;
  total: number;

  defaultCurrent: number;
  defaultPageSize: number;
  pageSizeOptions: Array<string>;
}

interface HasuraQueryState<Variables, Data>
  extends UseQueryState<Variables, Data> {
  reexecute: (opts?: Partial<OperationContext>) => void;
}

type HasuraQueryResponse<Data = any, Variables = any> = [
  any,
  HasuraQueryState<Variables, Data>,
  HasuraPagination
];

export const useHasuraQuery = <Data = any, Variables = any>(
  args: HasuraQueryArgs<Data, Variables>
): HasuraQueryResponse<Data, Variables> => {
  const {
    path,
    pagination = false,
    totalPath,
    defaultCurrent = 1,
    defaultPageSize = 16,
    pageSizeOptions = [16, 16 * 2, 16 * 3, 16 * 4].map(toString),
    ...queryArgs
  } = args;

  const [paginateParams, setPaginateParams] = useState({
    limit: defaultPageSize,
    offset: 0,
  });

  let variables = queryArgs.variables;

  if (pagination) {
    variables = { ...queryArgs.variables, ...paginateParams };
  }

  const [qState, reexecute] = useQuery({
    ...queryArgs,
    variables,
    requestPolicy: 'network-only',
  });

  let data: Data;
  let total: number;

  if (path) {
    data = get(qState.data, path);
  }

  if (totalPath) {
    total = get(qState.data, totalPath);
  }

  const onChange = (page: number, pageSize: number) =>
    setPaginateParams({ limit: pageSize, offset: page });

  return [
    data,
    { ...qState, reexecute },
    { onChange, total, defaultCurrent, defaultPageSize, pageSizeOptions },
  ];
};
