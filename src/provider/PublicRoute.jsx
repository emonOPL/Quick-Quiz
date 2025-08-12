import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router";
import Loading from "../components/Loading";

export default function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return children;
  }

  return <Navigate to="/"></Navigate>;
}
