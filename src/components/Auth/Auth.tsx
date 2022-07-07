import React, { createContext, useState } from 'react';
import { GetUserResponse } from 'types';

interface Props {
  children: React.ReactNode;
}

interface AuthContextInterface {
  user: GetUserResponse | null;
  refreshUser: () => void;
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

export function Auth({ children }: Props) {
  const [user, setUser] = useState<GetUserResponse | null>(null);

  const refreshUser = async () => {

  };

  return (
    <AuthContext.Provider
      value={{
        user,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
