import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
  navigateTo: string;
  isAuth: boolean
}

export function ProtectedRoute({
  children, navigateTo, isAuth,
}: Props): any {
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to={navigateTo} state={{ from: location }} replace />;
  }

  return children;
}
