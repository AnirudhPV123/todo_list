import ContentBox from "@/layout/ContentBox";
import HeadTag from "./HeadTag";
import Button from "./Button";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import AuthSwitch from "./AuthSwitch";
import Loader from "./Loader";
import useHandleAuth from "@/hooks/useHandleAuth";
import InputBox from "./InputBox";
/**
 * AuthForm Component
 *
 * Renders a form for authentication (sign-up or login) with configurable properties.
 * Utilizes Formik for form management, including validation(Yup) and submission.
 * Displays a loader when the form is in the loading state.
 * Handles form submission through a custom hook (`useAuth`) based on the form type.
 *
 * Props:
 * - type (string): Specifies the type of authentication form ("sign-up" or "login").
 * - initialValues (object): Initial values for the form fields.
 * - validationSchema (object): Validation schema for Formik.
 * - heading (string): Heading text displayed above the form.
 * - inputFields (array): Array of input field configurations for the form.
 * - redirect (object): Configuration for redirecting to another page (e.g., login or sign-up).
 */
function AuthForm({
  type,
  initialValues,
  validationSchema,
  heading,
  inputFields,
  redirect,
}) {
  const { isLoading, handleAuth } = useHandleAuth({ type });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleAuth,
  });

  return (
    <ContentBox>
      <HeadTag>{heading}</HeadTag>
      {formik.errors.server && (
        <div className="mb-2 text-center font-semibold text-red-600">
          {formik.errors.server}
        </div>
      )}
      <form
        onSubmit={formik.handleSubmit}
        className="flex w-full flex-col gap-2"
      >
        {inputFields.map(({ name, type, placeholder }) => (
          <InputBox
            key={name}
            name={name}
            type={type}
            placeholder={placeholder}
            formik={formik}
          />
        ))}
        <Button type="submit">{isLoading ? <Loader /> : heading}</Button>
        <AuthSwitch
          link={redirect.link}
          message={redirect.message}
          url={redirect.url}
        />
      </form>
    </ContentBox>
  );
}

AuthForm.propTypes = {
  type: PropTypes.string.isRequired,
  initialValues: PropTypes.object.isRequired,
  validationSchema: PropTypes.object.isRequired,
  heading: PropTypes.string.isRequired,
  inputFields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
    }),
  ).isRequired,
  redirect: PropTypes.shape({
    link: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default AuthForm;
