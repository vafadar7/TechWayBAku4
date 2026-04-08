import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAdminLoggedIn = localStorage.getItem("almacenter_admin") === "true";

  if (!isAdminLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
