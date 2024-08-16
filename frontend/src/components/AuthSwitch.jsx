import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
/**
 * `AuthSwitch` component for redirecting to a login or sign-up page:
 * - Displays a message with a clickable link that navigates to the specified URL.
 * - Used typically under buttons to provide navigation options for authentication-related pages.
 *
 */
function AuthSwitch({ link, message, url }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center">
      <span className="mt-3">
        {message}
        <a
          onClick={() => navigate(`/${url}`)}
          className="cursor-pointer font-bold"
        >
          &nbsp;{link}
        </a>
      </span>
    </div>
  );
}

AuthSwitch.propTypes = {
  link: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default AuthSwitch;
