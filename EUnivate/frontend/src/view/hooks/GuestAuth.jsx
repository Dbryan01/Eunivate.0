import React from 'react';
import { Navigate } from 'react-router-dom';

const GuestAuth = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    // User is not authenticated
    return <Navigate to="/login" />;
  }

  if (user.role !== 'guest') {
    // User is authenticated but not a guest
    return <Navigate to="/login" />;
  }

  // User is authenticated and is a guest
  return children;
};

export default GuestAuth;
