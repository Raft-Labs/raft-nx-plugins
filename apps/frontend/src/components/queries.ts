import { gql } from '@urql/core';

export const Departments = gql`
  query departments {
    departments {
      id
      name
      created_at
      updated_at
    }
  }
`;

export const Organisations = gql`
  query organizations {
    organizations {
      id
      name
      slug
    }
  }
`;

export const Department = gql`
  query department($id: uuid!) {
    department: departments_by_pk(id: $id) {
      id
      name
    }
  }
`;

export const CreateDepartment = gql`
  mutation createDepartments($objects: [departments_insert_input!] = {}) {
    insert_departments(objects: $objects) {
      returning {
        id
      }
    }
  }
`;

export const EditDepartment = gql`
  mutation editDepartment($id: uuid = "", $data: departments_set_input = {}) {
    update_departments(where: { id: { _eq: $id } }, _set: $data) {
      affected_rows
    }
  }
`;
