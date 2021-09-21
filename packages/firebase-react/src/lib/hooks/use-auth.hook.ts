import { useContext } from 'react';
import { AuthContext } from '../AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
