import React, { FC } from 'react';
import { useResource } from '../../../hooks/useResource';

const ShowViewPage = () => {
  const { name, label, show } = useResource();
  const ShowComponent: FC = show;
  return <ShowComponent />;
};

export default ShowViewPage;
