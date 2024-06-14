// src/components/PrivateRoute.js

import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem('token');

  return token ? <Route {...rest} element={element} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
