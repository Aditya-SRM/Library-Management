import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { auth } = useAuth();

  if (!auth.isAuthenticated) {
    return <Navigate to="/" />; // Redirect to login if not authenticated
  }

  // if (auth.role !== requiredRole) {
  //   return <Navigate to="/dashboard" />; // Redirect to dashboard if not authorized
  // }

  return children;
};

export default ProtectedRoute;
