import { FC } from 'react';
import { useResource } from '../../hooks/useResource';

const ListViewPage = () => {
  const { name, label, list } = useResource();
  const ListComponent: FC = list;
  return label;
};

export default ListViewPage;
