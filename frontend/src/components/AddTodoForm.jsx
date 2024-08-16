import { addTempTodoSlice, replaceTempTodoSlice } from "@/redux/todoSlice";
import { addTodo } from "@/services/api/todo";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import add_icon from "@/assets/icons/add_icon.png";
/**
 * AddTodoForm Component
 *
 * Renders a form for adding a new todo item.
 * - Handles form submission(handleAddTodo).
 */
function AddTodoForm() {
  const [todo, setTodo] = useState({ title: "", completed: false });
  const dispatch = useDispatch();

  const handleAddTodo = useCallback(
    async (e) => {
      e.preventDefault();

      if (!todo.title) return; // Avoid adding empty titles

      const tempId = new Date().toISOString();
      dispatch(addTempTodoSlice({ ...todo, tempId }));

      setTodo({ title: "", completed: false });
      try {
        const res = await addTodo(todo);
        dispatch(replaceTempTodoSlice({ finalTodo: res.data.data, tempId }));
      } catch (error) {
        console.error("Failed to add todo:", error);
      }
    },
    [todo, dispatch],
  );

  return (
    <form className="mb-4 flex h-12" onSubmit={handleAddTodo}>
      <input
        type="text"
        placeholder="Add Todo"
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        className="mr-2 flex-1 rounded-md border border-gray-300 px-3 text-xl text-black outline-none"
      />
      <button
        type="submit"
        className="flex w-16 cursor-pointer items-center justify-center rounded-md bg-blue-700"
      >
        <img className="w-8" src={add_icon} alt="" />
      </button>
    </form>
  );
}

export default AddTodoForm;
