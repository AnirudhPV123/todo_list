import { setAuthUserSlice } from "@/redux/userSlice";
import { loginUser, signUpUser } from "@/services/api/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
/**
 * `useHandleAuth` custom hook to handle authentication
 */
/**
 * `useHandleAuth` custom hook to manage user authentication:
 * - Handles user login or sign-up based on the `type` provided ("sign-up" or "login").
 * - Dispatches authentication data to the Redux store upon successful authentication.
 * - Redirects to the home page after successful authentication.
 * - Manages loading state and handles errors, providing error messages for form validation.
 */
function useHandleAuth({ type }) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAuth = async (values, { setErrors, resetForm }) => {
    setIsLoading(true);
    try {
      let res;
      if (type === "sign-up") {
        res = await signUpUser(values);
      } else if (type === "login") {
        res = await loginUser(values);
      }
      dispatch(setAuthUserSlice(res.data.data));
      resetForm();
      navigate("/");
    } catch (error) {
      if (error.response) {
        setErrors({
          server: error.response.data.message || "Authentication failed",
        });
      } else {
        setErrors({ server: "Network error, please try again later" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { handleAuth, isLoading };
}

export default useHandleAuth;
