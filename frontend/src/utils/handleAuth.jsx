import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuthUser } from "@/redux/userSlice";
import { loginUser, signUpUser } from "@/services/api/auth";

const handleAuth = async (values, { setErrors, resetForm }, authType) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userName, email, password, confirmPassword } = values;

  try {
    let res;
    if (authType === "sign-up") {
      res = await signUpUser({ userName, email, password, confirmPassword });
    } else if (authType === "login") {
      res = await loginUser({ email, password });
    }

    dispatch(setAuthUser(res.data.data));
    resetForm();
    navigate("/home");
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      setErrors({        server: error.response.data.message || "Authentication failed",

      });
    } else {
      // Network or other error
      setErrors({ server: "Network error, please try again later" });
    }
  }

  return<></>
};

export {handleAuth}