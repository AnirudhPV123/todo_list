import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getCurrentUser, refreshToken } from "./db/auth";
import { useDispatch } from "react-redux";
import { login as authLogin } from "./store/storeSlice";
import { addTodosSlice } from "./store/todoSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTodo, addTodo } from "./db/todo";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);



  useEffect(() => {

      const handleBeforeUnload = async () => {
        const todos = await JSON.parse(localStorage.getItem("todos"));
        if(todos.length>0){
          await addTodo(todos);
        }
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };

  }, []);

      useEffect(() => {

          (async () => {
            const todos = await getTodo();
            if(todos.length > 0){
            dispatch(addTodosSlice(todos));
            localStorage.setItem("todos", JSON.stringify(todos));
            }
          })();

      }, []);


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
