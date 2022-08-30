import React, { createContext, useEffect, useState } from 'react';
import { GetUserFromTokenResponse, UserSaveResponseData } from 'types';
import { api } from '../../utils/api';
import { apiUrl } from '../../config';

interface Props {
  children: React.ReactNode;
}

interface AuthContextInterface {
  user: UserSaveResponseData | null;
  refreshUser: () => void;
  saveUserData: (user: UserSaveResponseData | null) => void;
}

export const AuthContext = createContext<AuthContextInterface>({
  user: null,
  refreshUser: () => {},
  saveUserData: (user: UserSaveResponseData | null) => {},
});

export function Auth({ children }: Props) {
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserSaveResponseData | null>(null);

  useEffect(() => {
    (async () => {
      if (user === null) {
        const { status, body } = await api<GetUserFromTokenResponse>(`${apiUrl}/auth/user`);

        if (status === 200) setUser(body);

        setInitialLoading(false);
      }
    })();
  }, [user]);

  const refreshUser = async () => {
    setUser(null);
  };

  const saveUserData = (user: UserSaveResponseData | null) => {
    setUser(user);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        refreshUser,
        saveUserData,
      }}
    >
      {!initialLoading ? children : false}
    </AuthContext.Provider>
  );
}
