import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { account } from "../services/appwrite";

const ProtectedRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] =
    useState(true);

  const [authenticated, setAuthenticated] =
    useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await account.get();

        setAuthenticated(true);
      } catch {
        setAuthenticated(false);
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <h1 className="p-6">
        Loading...
      </h1>
    );
  }

  return authenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;