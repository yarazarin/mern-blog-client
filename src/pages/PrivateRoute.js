//src/pages/PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ shouldNavigate = false }) => {
  const isAuth = !!localStorage.getItem('token');
  return isAuth ? <Outlet /> : shouldNavigate ? <Navigate to="/login" /> : null;
};

export default PrivateRoute;