//src/pages/PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


const PrivateRoute = () => {
  const isAuth = !!localStorage.getItem('token');
  return isAuth ? <Outlet /> : <Navigate to="/myblog" />;
};

export default PrivateRoute;
