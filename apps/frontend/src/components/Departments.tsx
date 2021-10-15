/* eslint-disable react/display-name */
import {
  CreateButton,
  CreateView,
  EditButton,
  EditView,
  ListView,
  ShowButton,
  ShowView,
  useResource,
} from '@raftlabs/nx-admin';
import React from 'react';
import {
  CreateDepartment,
  Department,
  Departments,
  EditDepartment,
} from './queries';

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
          key: 'actions',
          name: 'Action',
          minWidth: 100,
          maxWidth: 200,
          isResizable: true,
          onRender: (item) => (
            <>
              <ShowButton id={item.id} type="icon" />
              <EditButton id={item.id} type="icon" />
            </>
          ),
        },
      ]}
    >
      <CreateButton />
    </ListView>
  );
};

export const DepartmentShow = () => {
  const { item } = useResource();
  return <ShowView query={Department}>{item?.name}</ShowView>;
};

export const DepartmentCreate = () => {
  const { item } = useResource();
  return <CreateView mutation={CreateDepartment}>Create View</CreateView>;
};

export const DepartmentEdit = () => {
  const { item } = useResource();
  return (
    <EditView query={Department} mutation={EditDepartment}>
      Edit View {item?.name}
    </EditView>
  );
};
