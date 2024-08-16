import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
/**
 * `ProtectedRoute` component to manage route protection based on authentication:
 * - Redirects to the login page if authentication is required and user is not authenticated.
 * - Redirects to the home page if authentication is not required and user is authenticated. (if try to access login or sign-up page)
 * - Renders `children` if the route is accessible based on the authentication status and route protection requirement.
 * - Returns `null` while deciding the route to avoid rendering unnecessary content.
 */
export default function ProtectedRoute({ children, authentication }) {
  const { authStatus } = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (authentication && !authStatus) {
      navigate("/login");
    } else if (!authentication && authStatus) {
      navigate("/");
    }
  }, [authStatus, navigate, authentication]);

  if ((authentication && !authStatus) || (!authentication && authStatus)) {
    return null;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  authentication: PropTypes.bool.isRequired,
};
