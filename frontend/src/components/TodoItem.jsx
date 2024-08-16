import React, { useCallback, useState } from "react";
import edit_icon from "@/assets/icons/edit_icon.png";
import save_icon from "@/assets/icons/save_icon.svg";
import delete_icon from "@/assets/icons/delete_icon.svg";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { deleteTodo, updateTodo } from "@/services/api/todo";
import { deleteTodoSlice, updateTodoSlice } from "@/redux/todoSlice";
import TodoButton from "./TodoButton";

/**
 * TodoItem Component
 *
 * Renders an individual todo item with the ability to toggle completion status,
 * edit the title, and delete the todo. It supports both editing and viewing modes.
 *
 * Utilizes local state to manage editing and completion status, and dispatches
 * Redux actions to update or delete the todo. The component also handles API
 * interactions for updating and deleting todos.
 *
 * Props:
 * - todoId (string): Unique identifier for the todo item.
 * - title (string): The title of the todo item.
 * - completed (bool): Boolean indicating if the todo is completed or not.
 *
 * State:
 * - isEditable (bool): Determines if the todo title is in editable mode.
 * - editableTitle (string): Holds the current value of the todo title when in edit mode.
 * - isCompleted (bool): Holds the current completion status of the todo.
 *
 * Functions:
 * - handleToggle: Toggles the completion status of the todo and updates it in the server.
 * - handleSave: Saves changes made to the todo title and updates it in the server.
 * - handleDelete: Deletes the todo item and updates the server.
 *
 * UI:
 * - Renders a checkbox to toggle completion status.
 * - Displays an input field for the todo title, which can be edited when in edit mode.
 * - Provides action buttons for saving edits, toggling edit mode, and deleting the todo.
 */

function TodoItem({ todoId, title, completed }) {
  const [isEditable, setIsEditable] = useState(false);
  const [editableTitle, setEditableTitle] = useState(title);
  const [isCompleted, setIsCompleted] = useState(completed);
  const dispatch = useDispatch();

  const handleToggle = useCallback(async () => {
    const newCompletedStatus = !isCompleted;
    setIsCompleted(newCompletedStatus);
    dispatch(
      updateTodoSlice({
        id: todoId,
        completed: newCompletedStatus,
      }),
    );
    try {
      await updateTodo({
        todoId,
        completed: newCompletedStatus,
      });
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  }, [isCompleted, dispatch, todoId]);

  const handleSave = useCallback(async () => {
    setIsEditable(false);
    if (editableTitle === title) return;
    dispatch(updateTodoSlice({ id: todoId, title: editableTitle }));
    try {
      await updateTodo({
        todoId,
        title: editableTitle,
      });
    } catch (error) {
      console.error("Failed to save todo:", error);
    }
  }, [dispatch, editableTitle, todoId, title]);

  const handleDelete = useCallback(async () => {
    dispatch(deleteTodoSlice({ todoId }));
    try {
      await deleteTodo({ todoId });
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  }, [dispatch, todoId]);

  return (
    <li className="mb-2 flex h-10 items-center gap-2 overflow-hidden">
      {/* todo */}
      <div className="flex h-full flex-1 items-center rounded-md border px-3">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={handleToggle}
          className="mr-3 size-5"
        />
        <input
          className={`flex-1 rounded-sm bg-transparent px-1 text-lg outline-none ${isCompleted ? "line-through" : null}`}
          value={editableTitle}
          disabled={!isEditable}
          onChange={isEditable ? (e) => setEditableTitle(e.target.value) : null}
        />
      </div>

      {/* buttons */}
      {isEditable ? (
        <TodoButton
          onClick={handleSave}
          iconSrc={save_icon}
          bgColor="bg-green-700"
          style="w-1/2"
        />
      ) : (
        <TodoButton
          onClick={() => (!isCompleted ? setIsEditable(true) : null)}
          iconSrc={edit_icon}
          bgColor="bg-blue-700"
          style="w-4/6"
        />
      )}

      <TodoButton
        onClick={handleDelete}
        iconSrc={delete_icon}
        bgColor="bg-red-700"
        style="w-3/4"
      />
    </li>
  );
}

TodoItem.propTypes = {
  todoId: PropTypes.string,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};

export default TodoItem;
