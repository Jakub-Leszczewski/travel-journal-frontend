import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export function IndexView() {
  const isAuth = useAuth();
  return !isAuth ? <Navigate to="/login" /> : <p>strona główna</p>;
}
