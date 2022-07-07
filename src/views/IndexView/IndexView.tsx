import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export function IndexView() {
  const isAuth = useAuth();
  return isAuth ? <Navigate to="/profile" /> : <Navigate to="/login" />;
}
