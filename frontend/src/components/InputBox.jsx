import PropTypes from "prop-types";
/**
 * InputBox Component
 *
 * Renders a single input field for a form, using Formik for form state management.
 * Displays validation errors for the specific field if applicable.
 *
 * Props:
 * - name (string): The name attribute of the input field and the key in Formik's form state.
 * - type (string): The type of the input field (e.g., "text", "password").
 * - placeholder (string): Placeholder text displayed inside the input field.
 * - formik (object): The Formik form state and handlers, including:
 *   - handleChange (function): Function to handle changes in the input field.
 *   - handleBlur (function): Function to handle blur events on the input field.
 *   - values (object): Current values of the form fields.
 *   - errors (object): Validation errors for the form fields.
 *   - touched (object): Indicates whether a field has been touched.
 */
function InputBox({ name, type, placeholder, formik }) {
  const error = formik.errors[name];
  const touched = formik.touched[name];

  const inputBoxAttributes = {
    placeholder,
    type,
    id: name,
    name,
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    value: formik.values[name] || "",
  };

  return (
    <>
      <input
        className={`h-12 w-full rounded-sm border bg-transparent px-3 text-lg outline-none`}
        {...inputBoxAttributes}
      />
      {error && touched && (
        <div className="mt-[-6px] text-xs text-red-600">{error}</div>
      )}
    </>
  );
}

InputBox.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  formik: PropTypes.shape({
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
  }).isRequired,
};

export default InputBox;
