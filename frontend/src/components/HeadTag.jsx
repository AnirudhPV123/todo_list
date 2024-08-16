import PropTypes from "prop-types";

function HeadTag({ children }) {
  return <h2 className="mb-5 text-center text-4xl font-bold">{children}</h2>;
}

HeadTag.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HeadTag;
