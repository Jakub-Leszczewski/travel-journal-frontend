import { useContext } from 'react';
import { AuthContext } from '../components/Auth/Auth';

export function useSaveUserData() {
  const authContext = useContext(AuthContext);

  return authContext.saveUserData;
}
