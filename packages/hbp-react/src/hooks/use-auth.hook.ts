import { useContext } from 'react';
import { AuthContext } from './../AuthContext';

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
