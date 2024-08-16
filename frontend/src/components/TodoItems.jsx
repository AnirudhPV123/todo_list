import TodoItem from "./TodoItem";
import { useDispatch, useSelector } from "react-redux";
import { getTodos } from "@/services/api/todo";
import { setTodoSlice } from "@/redux/todoSlice";
import { useEffect } from "react";

/**
 * TodoItems Component
 *
 * Fetches todos from the API and displays them in a list using TodoItem.
 */

function TodoItems() {
  const { todos } = useSelector((store) => store.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await getTodos();
        dispatch(setTodoSlice(res.data.data));
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, [dispatch]);

  return (
    <ul className="h-[50vh] overflow-y-auto">
      {todos.map(({ title, completed, _id, tempId }) => (
        <TodoItem
          key={_id || tempId}
          title={title}
          completed={completed}
          todoId={_id}
        />
      ))}
    </ul>
  );
}

export default TodoItems;
