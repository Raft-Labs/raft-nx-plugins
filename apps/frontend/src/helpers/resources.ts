import { IResource } from '@raftlabs/nx-admin';
import {
  DepartmentCreate,
  DepartmentEdit,
  DepartmentShow,
  DepartmentsList,
} from '../components/Departments';
import {
  OrganisationsCreate,
  OrganisationsEdit,
  OrganisationsList,
  OrganisationsShow,
} from '../components/Organisations';

export const resources: IResource[] = [
  {
    label: 'Departments',
    name: 'departments',
    list: DepartmentsList,
    show: DepartmentShow,
    create: DepartmentCreate,
    edit: DepartmentEdit,
  },
  {
    label: 'Organisations',
    name: 'organizations',
    list: OrganisationsList,
    create: OrganisationsCreate,
    edit: OrganisationsEdit,
    show: OrganisationsShow,
  },
];
