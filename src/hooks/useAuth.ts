import { useContext } from 'react';
import { AuthContext } from '../components/Auth/Auth';

export function useAuth(): boolean {
  const authContext = useContext(AuthContext);

  return !!authContext?.user;
}
