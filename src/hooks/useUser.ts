import { useContext } from 'react';
import { UserSaveResponseData } from 'types';
import { AuthContext } from '../components/Auth/Auth';

export function useUser(): UserSaveResponseData | null {
  const authContext = useContext(AuthContext);

  return authContext?.user;
}
