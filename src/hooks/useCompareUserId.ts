import { useContext } from 'react';
import { AuthContext } from '../components/Auth/Auth';

export function useCompareUserId(): (id: any) => boolean {
  const authContext = useContext(AuthContext);

  return (id: any): boolean => (authContext.user?.id === id);
}
