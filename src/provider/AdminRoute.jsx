import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (
    user &&
    (user.email === "emon.onnorokom@gmail.com" ||
      user.email === "jfemon8@gmail.com")
  ) {
    return children;
  }

  return <Navigate to="/"></Navigate>;
}
