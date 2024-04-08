import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todoData: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // todos from backend
    addTodosSlice: (state, action) => {
      state.todoData = action.payload;
    },
    addTodoSlice: (state, action) => {
      const todo = {
        id: nanoid(),
        tittle: action.payload.tittle,
        completed: action.payload.completed,
      };
      state.todoData.push(todo);
    },
    updateTodoSlice: (state, action) => {
      state.todoData = action.payload;
    },
    deleteTodoSlice: (state, action) => {
      state.todoData = action.payload;
    },
  },
});

export const { addTodosSlice, updateTodoSlice, addTodoSlice ,deleteTodoSlice } =
  todoSlice.actions;

export default todoSlice.reducer;
