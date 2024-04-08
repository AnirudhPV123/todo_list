import React, { useState } from "react";
import { deleteTodoSlice, updateTodoSlice } from "../store/todoSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function TodoList({ todo }) {
  const [isEditable, setIsEditable] = useState(false);
  const [tittle, setTittle] = useState(todo.tittle);

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todoData);

  const todoEditHanlder = () => {
    const newTodods = todos.map((item) =>
      item.id !== todo.id ? item : { ...todo, tittle }
    );
    dispatch(updateTodoSlice(newTodods));
  };

  const todoDeleteHandler = () => {
    const newTodods = todos.filter((item) => item.id !== todo.id);
    dispatch(deleteTodoSlice(newTodods));
  };

  const todoToggleHandler = () => {
    const newTodods = todos.map((item) =>
      item.id !== todo.id ? item : { ...todo, completed: !todo.completed }
    );
    dispatch(updateTodoSlice(newTodods));
  };

  return (
    <li className="flex items-center mb-2 h-10 overflow-hidden gap-2">
      <div className="border h-full items-center flex px-3 flex-1 rounded-md">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => !isEditable && todoToggleHandler()}
          className="mr-3 size-5"
        />
        <input
          className={`flex-1 text-lg bg-transparent px-1 rounded-sm outline-none ${
            isEditable ? "border border-gray-500" : ""
          } ${todo.completed ? "line-through" : ""}`}
          disabled={!isEditable}
          type="text"
          value={tittle}
          onChange={(e) => setTittle(e.target.value)}
        />
      </div>

      {/* edit */}
      <button
        onClick={() => !todo.completed && setIsEditable(!isEditable)}
        className={`bg-green-700 h-full w-14 flex justify-center items-center rounded-md ${
          !isEditable ? "visible" : "hidden"
        } `}
      >
        <img className="w-8" src="./images/edit.svg" alt="" />
      </button>
      {/* submit */}
      <button
        onClick={() => {
          setIsEditable(!isEditable);
          todoEditHanlder();
        }}
        className={`bg-green-700 h-full w-14 flex justify-center items-center rounded-md ${
          isEditable ? "visible" : "hidden"
        } `}
      >
        <img className="w-5" src="./images/submit.svg" alt="" />
      </button>
      <button
        onClick={todoDeleteHandler}
        className="bg-red-700 h-full w-14 cursor-pointer flex justify-center items-center rounded-md"
      >
        <img className="w-8" src="./images/delete.svg" alt="" />
      </button>
    </li>
  );
}

export default TodoList;
