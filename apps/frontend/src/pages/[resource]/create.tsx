import React, { FC } from 'react';
import { useResource } from '../../hooks/useResource';

const CreateViewPage = () => {
  const { name, label, create } = useResource();
  const CreateComponent: FC = create;
  return <CreateComponent />;
};

export default CreateViewPage;
