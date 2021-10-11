import React, { FC } from 'react';
import { useResource } from '../../../hooks/useResource';

const EditViewPage = () => {
  const { name, label, edit } = useResource();
  const EditComponent: FC = edit;
  return <EditComponent />;
};

export default EditViewPage;
