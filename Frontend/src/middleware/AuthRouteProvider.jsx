import React from 'react';
import { Navigate } from 'react-router';
import { getAccessToken } from '../utils/localStorage';

const AuthRouteProvider = ({ children }) => {
  const token = getAccessToken();
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

export default AuthRouteProvider;
