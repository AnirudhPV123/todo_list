import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import TodoList from "../TodoList";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../db/auth";
import { logout } from "../../store/storeSlice";
import { addTodoSlice } from "../../store/todoSlice";
import { addTodo } from "../../db/todo";

function Home() {
  const userData = useSelector((state) => state.auth.userData);
  const todos = useSelector((state) => state.todo.todoData);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuRef = useRef();

  const [showMenu, setShowMenu] = useState(false);
  const [tittle, setTittle] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const logoutHandler = useCallback(async () => {
    try {
      await userLogout();
      const storedTodos = JSON.parse(localStorage.getItem("todos"));
      localStorage.setItem("todos", "");

      if (storedTodos && storedTodos.length > 0) {
        await addTodo(storedTodos);
      }
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log("something went wrong");
    }
  }, [dispatch, navigate]);

  const addTodoHandler = useCallback(
    (e) => {
      e.preventDefault();
      setTittle("");
      dispatch(addTodoSlice({ tittle, completed }));
    },
    [dispatch, tittle, completed]
  );

  const memoizedUserData = useMemo(() => userData, [userData]);

  return (
    <div className="text-white border w-1/2 max-w-[600px] backdrop-blur-lg absolute shadow-md rounded-md p-4">
      <div
        className="w-12 bg-yellow-300 overflow-hidden rounded-full border-2 absolute right-4 cursor-pointer"
        onClick={() => setShowMenu(!showMenu)}
      >
        <img
          className="w-12"
          src="../../../public/images/profile_icon.jpeg"
          alt=""
        />
      </div>

      <div
        ref={menuRef}
        className={`absolute right-4 bg-white rounded-md shadow-lg transition-all duration-300 shadow-black ${
          showMenu ? "opacity-100 top-20 visible" : "opacity-0 top-16 invisible"
        } `}
      >
        <div className="w-0 h-0 border-solid border-8 border-transparent border-t-white border-opacity-100 absolute right-4 transform rotate-180 -top-4"></div>

        <ul className={`text-black p-4`}>
          <li className="border-b mb-2 border-gray-400 text-lg">
            Name: {memoizedUserData?.name}
          </li>
          <li className="border-b mb-2 border-gray-400 text-lg">
            Email: {memoizedUserData?.email}
          </li>
          <li>
            <button
              onClick={logoutHandler}
              className="w-full bg-gray-200 py-1 text-lg font-semibold"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      <h2 className="text-4xl text-center mb-5 font-bold">TODO LIST</h2>
      <form onSubmit={addTodoHandler} className="flex mb-4 h-12">
        <input
          type="text"
          placeholder="Add Todo"
          value={tittle}
          onChange={(e) => setTittle(e.target.value)}
          className="flex-1 border border-gray-300 rounded-md px-3 outline-none text-black text-xl mr-2"
        />

        <button
          type="submit"
          className="bg-blue-700 cursor-pointer h-full w-16 flex justify-center items-center rounded-md"
        >
          <img className="w-8" src="./images/add.svg" alt="" />
        </button>
      </form>
      <div>
        <ul className="flex flex-col">
          {todos.map((todo) => (
            <TodoList key={todo.id} todo={todo} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
