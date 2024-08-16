import apiClient from "./api";

const addTodo = async (todo) => {
  return await apiClient.post("/api/v1/todos", todo);
};
const getTodos = async () => {
  return await apiClient.get("/api/v1/todos");
};

const deleteTodo = async ({ todoId }) => {
  return await apiClient.delete(`/api/v1/todos/${todoId}`);
};

const updateTodo = async ({ todoId, completed, title }) => {
  const data = {};
  if (completed !== undefined) {
    data.completed = completed;
  }
  if (title !== undefined) {
    data.title = title;
  }
  return await apiClient.put(`/api/v1/todos/${todoId}`, data);
};

export { addTodo, getTodos, deleteTodo, updateTodo };
