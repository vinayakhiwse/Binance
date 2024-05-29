import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ element }) {
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const token = localStorage.getItem("token");

  if (!auth && !token) {
    // Redirect to the home page if not authenticated
    return <Navigate to="/login/auth" replace />;
  }
  // Render the specified element for authenticated users
  return element;
}
