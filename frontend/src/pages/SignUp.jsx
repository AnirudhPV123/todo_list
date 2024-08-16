import { signUpValidationSchema } from "@/utils/validators/authValidatorSchema";
import { signUpFields } from "@/utils/constants/inputFields";
import AuthForm from "@/components/AuthForm";

/**
 * SignUp Component
 *
 * Renders the sign-up form with the necessary configurations, including initial values,
 * validation schema, heading, form fields, and redirect settings. Handles navigation
 * to the login page if the user already has an account.
 */

function SignUp() {
  const initialValues = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const redirect = {
    link: "Login",
    message: "Already have an Account?",
    url: "login",
  };

  return (
    <AuthForm
      type="sign-up"
      initialValues={initialValues}
      validationSchema={signUpValidationSchema}
      heading="SignUp"
      inputFields={signUpFields}
      redirect={redirect}
    />
  );
}

export default SignUp;
