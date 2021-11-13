import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

export default function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth Context is only valid in an authContext provider');
  }

  return context;
}
