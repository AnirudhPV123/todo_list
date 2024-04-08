const conf = {
  backendUserPath: String(import.meta.env.VITE_USERS_URI_PATH),
  backendUrl: String(import.meta.env.VITE_BACKEND_URI),
  backendTodoUrl: String(import.meta.env.VITE_TODOS_URI_PATH),
};

export default conf