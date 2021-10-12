import { ListView } from '@raftlabs/nx-admin';
import React from 'react';
import { Divisions } from './queries';

export const DivisionsList = () => {
  return (
    <ListView
      query={Divisions}
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
          key: 'department',
          name: 'Department',
          fieldName: 'department',
          minWidth: 100,
          maxWidth: 200,
          isResizable: true,
          onRender: (item) => item.name,
        },
      ]}
    />
  );
};

export const Hello1Show = () => {
  return <div>Show1 Example</div>;
};
export const Hello1Edit = () => {
  return <div>Edit1 Example</div>;
};
export const Hello1Create = () => {
  return <div>Create1 Example</div>;
};
