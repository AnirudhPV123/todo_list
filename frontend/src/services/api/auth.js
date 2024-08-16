import apiClient from "./api";

const signUpUser = async ({ userName, email, password }) => {
  const data = { userName, email, password };
  return await apiClient.post("/api/v1/users/sign-up", data);
};

const loginUser = async ({ email, password }) => {
  const data = { email, password };
  return await apiClient.post("/api/v1/users/login", data);
};

const logoutUser = async () => {
  return await apiClient.post("/api/v1/users/logout");
};

export { signUpUser, loginUser, logoutUser };
