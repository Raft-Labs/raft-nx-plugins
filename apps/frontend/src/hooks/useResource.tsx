import { useContext } from 'react';
import { ResourceContext } from '../core/Admin';

export const useResource = () => {
  const { resource, setResource } = useContext(ResourceContext);

  return { ...resource, setResource };
};
