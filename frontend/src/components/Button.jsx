import PropTypes from "prop-types";

function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="relative w-full rounded-sm bg-white py-2 text-2xl font-semibold text-black duration-150 hover:bg-green-700 hover:text-white"
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Button;
