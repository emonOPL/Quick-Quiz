import React, { use } from "react";
import { Navigate } from "react-router";

export default function PrivateRoute({ children }) {
  const { user } = use();
  if (user) {
    return children;
  }
  return <Navigate to="/auth/login"></Navigate>;
}
