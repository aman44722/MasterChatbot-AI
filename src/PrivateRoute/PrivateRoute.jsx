// PrivateRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // or useSelector if using Redux

const PrivateRoute = () => {
  const { user } = useAuth(); // or useSelector(state => state.auth.user)

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
