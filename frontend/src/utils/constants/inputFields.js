const userName = {
  name: "userName",
  type: "text",
  placeholder: "Username",
};

const email = {
  name: "email",
  type: "email",
  placeholder: "Email",
};

const password = {
  name: "password",
  type: "password",
  placeholder: "Password",
};

const confirmPassword = {
  name: "confirmPassword",
  type: "password",
  placeholder: "Confirm Password",
};

const signUpFields = [userName, email, password, confirmPassword];
const loginFields = [email, password];

export { signUpFields, loginFields };
