/* eslint-disable react/display-name */
import {
  ListView,
  ShowButton,
  ShowView,
  useResource,
} from '@raftlabs/nx-admin';
import React from 'react';
import { Department, Departments } from './queries';

export const DepartmentsList = () => {
  return (
    <ListView
      query={Departments}
      columns={[
        {
          key: 'id',
          name: 'Id',
          fieldName: 'id',
          minWidth: 100,
          maxWidth: 200,
          isResizable: true,
        },
        {
          key: 'name',
          name: 'Name',
          fieldName: 'name',
          minWidth: 100,
          maxWidth: 200,
          isResizable: true,
        },
        {
          key: 'description',
          name: 'Description',
          fieldName: 'description',
          minWidth: 100,
          maxWidth: 200,
          isResizable: true,
        },
        {
          key: 'actions',
          name: 'Action',
          minWidth: 100,
          maxWidth: 200,
          isResizable: true,
          onRender: (item) => <ShowButton id={item.id} type="icon" />,
        },
      ]}
    />
  );
};

export const DepartmentShow = () => {
  const { item } = useResource();
  return <ShowView query={Department}>{item?.name}</ShowView>;
};
export const HelloEdit = () => {
  return <div>Edit Example</div>;
};
export const HelloCreate = () => {
  return <div>Create Example</div>;
};
