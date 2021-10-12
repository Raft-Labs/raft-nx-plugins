import { gql } from '@urql/core';

export const Departments = gql`
  query departments {
    departments {
      id
      name
      description
      created_at
      updated_at
      img_url
    }
  }
`;

export const Divisions = gql`
  query divisions {
    divisions {
      id
      name
      department {
        name
      }
    }
  }
`;

export const Department = gql`
  query department($id: uuid!) {
    department: departments_by_pk(id: $id) {
      id
      name
      description
    }
  }
`;
