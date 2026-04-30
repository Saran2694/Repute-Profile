import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAdminAuth') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/adminpage" replace />;
  }

  return children;
};

export default ProtectedRoute;
