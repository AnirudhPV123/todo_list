import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getCurrentUser, refreshToken } from "./db/auth";
import { useDispatch } from "react-redux";
import { login as authLogin } from "./store/storeSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);







  useEffect(() => {
    if (!authStatus) {
      (async () => {
        try {
          const res = await getCurrentUser();
          dispatch(authLogin(res.data.data));
        } catch (error) {
          if (error?.response?.status === 402) {
            try {
              const res = await refreshToken();
              dispatch(authLogin(res.data.data));
            } catch (error) {
              console.log("err");
              navigate("/login");
            }
          } else {
            navigate("/login");
          }
        }
      })();
    }
  }, [authStatus, dispatch, navigate]);

  return (
    <div
      className="w-full h-screen flex justify-center items-center"
      style={{
        backgroundImage: 'url("../../../images/login-bg.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Outlet />
    </div>
  );
}

export default App;
