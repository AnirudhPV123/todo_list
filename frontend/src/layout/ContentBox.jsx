import PropTypes from "prop-types";
/**
 * `ContentBox` component for rendering a styled container:
 * - Provides a layout for the todo list box.
 */
function ContentBox({ children }) {
  return (
    <div className="absolute w-1/2 max-w-[600px] rounded-md border p-4 text-white shadow-md backdrop-blur-lg">
      {children}
    </div>
  );
}

ContentBox.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContentBox;
