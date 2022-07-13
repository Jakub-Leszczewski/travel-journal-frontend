import React from 'react';
import { Navigate } from 'react-router-dom';

export function IndexView() {
  return <Navigate to="/profile" />;
}
