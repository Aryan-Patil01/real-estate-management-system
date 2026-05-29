import { Navigate } from "react-router-dom";

function ProtectedRoute({

  children,

  adminOnly = false,

  agentOnly = false,

  agentOrAdmin = false

}) {

  const token =
    localStorage.getItem("token");

  const user =
    JSON.parse(
      localStorage.getItem("user") || "{}"
    );

  // NOT LOGGED IN
  if (!token) {

    return <Navigate to="/login" />;
  }

  // ADMIN ONLY
  if (
    adminOnly &&
    user.role !== "admin"
  ) {

    return <Navigate to="/" />;
  }

  // AGENT ONLY
  if (
    agentOnly &&
    user.role !== "agent"
  ) {

    return <Navigate to="/" />;
  }

  // ADMIN OR AGENT
  if (
    agentOrAdmin &&
    user.role !== "admin" &&
    user.role !== "agent"
  ) {

    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;