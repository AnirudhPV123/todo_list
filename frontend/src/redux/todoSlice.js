import { createSlice } from "@reduxjs/toolkit";
/**
 * todoSlice
 *
 * A Redux slice for managing the state of todo items.
 *
 * Reducers:
 * - `setTodoSlice`: Sets the entire todos array.
 * - `addTempTodoSlice`: Adds a temporary todo item before the actual todo is saved to the backend.
 * - `replaceTempTodoSlice`: Replaces a temporary todo item with the final todo item after receiving a response from the API.
 * - `updateTodoSlice`: Updates an existing todo item with new data (e.g., title or completion status).
 * - `deleteTodoSlice`: Removes a todo item from the todos array based on its ID.
 * - `resetTodoSlice`: Resets the todos array to its initial state, clearing all todos.
 */
const initialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodoSlice: (state, action) => {
      state.todos = action.payload;
    },
    addTempTodoSlice: (state, action) => {
      state.todos.push(action.payload);
    },
    replaceTempTodoSlice: (state, action) => {
      const { tempId, finalTodo } = action.payload;
      const index = state.todos.findIndex((todo) => todo.tempId === tempId); // Find the index of the temp todo
      if (index !== -1) {
        // Replace the temporary todo with the final todo
        state.todos[index] = { ...finalTodo };
      }
    },
    // Update an existing todo item
    updateTodoSlice: (state, action) => {
      const { id, completed, title } = action.payload;
      const todo = state.todos.find((todo) => todo._id === id);
      if (todo) {
        if (completed !== undefined) todo.completed = completed;
        if (title !== undefined) todo.title = title;
      }
    },
    deleteTodoSlice: (state, action) => {
      const { todoId } = action.payload;
      state.todos = state.todos.filter((todo) => todo._id !== todoId);
    },
    resetTodoSlice: (state) => {
      state.todos = [];
    },
  },
});

export const {
  setTodoSlice,
  addTempTodoSlice,
  replaceTempTodoSlice,
  updateTodoSlice,
  deleteTodoSlice,
  resetTodoSlice,
} = todoSlice.actions;

export default todoSlice.reducer;
