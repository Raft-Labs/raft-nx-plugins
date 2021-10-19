import { ListView, ShowButton } from '@raftlabs/nx-admin';
import React from 'react';
import { Organisations } from './queries';

export const OrganisationsList = () => {
  return (
    <ListView
      query={Organisations}
      columns={[
        {
          key: 'id',
          name: 'Id',
          fieldName: 'id',
          minWidth: 100,
          maxWidth: 200,
          isResizable: true,
          onRender: (item) => (
            <ShowButton id={item.id} title="id" type="link" />
          ),
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
          key: 'slug',
          name: 'Slug',
          minWidth: 100,
          maxWidth: 200,
          isResizable: true,
          onRender: (item) => item?.slug,
        },
      ]}
    />
  );
};

export const OrganisationsShow = () => {
  return <div>Show1 Example</div>;
};
export const OrganisationsEdit = () => {
  return <div>Edit1 Example</div>;
};
export const OrganisationsCreate = () => {
  return <div>Create1 Example</div>;
};
