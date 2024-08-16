import { loginValidationSchema } from "@/utils/validators/authValidatorSchema";
import { loginFields } from "@/utils/constants/inputFields";
import AuthForm from "@/components/AuthForm";

/**
 * Login Component
 *
 * Renders the login form with configurations including initial values,
 * validation schema, heading, form fields, and redirect settings.
 * Provides navigation to the sign-up page for users who do not have an account.
 */
function Login() {
  const initialValues = {
    email: "",
    password: "",
  };

  const redirect = {
    link: "SignUp",
    message: "Create an Account?",
    url: "sign-up",
  };

  return (
    <AuthForm
      type="login"
      initialValues={initialValues}
      validationSchema={loginValidationSchema}
      heading="Login"
      inputFields={loginFields}
      redirect={redirect}
    />
  );
}

export default Login;
