import React, { useContext } from "react";
import AuthContext from "../contexts/AuthContext.jsx";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { authUser, loadingAuth } = useContext(AuthContext);
  if (loadingAuth) {
    return (
      <div className="text-[20px] text-[#333333] text-center flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
