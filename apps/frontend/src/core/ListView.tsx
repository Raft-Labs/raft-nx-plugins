import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'urql';
import { IListView } from '../types/interfaces';

const ListView = ({
  query,
  columns,
  variables,
  pause,
  queryPath,
  resource,
  children,
}: IListView) => {
  const [items, setItems] = useState([]);
  const [{ data, fetching, error }] = useQuery({
    query,
    variables,
    pause,
    requestPolicy: 'network-only',
  });

  useEffect(() => {
    if (data) setItems(get(data, queryPath || resource));
  }, [data, queryPath, resource]);
  return <div>{children}</div>;
};

export default ListView;
