import PropTypes from "prop-types";

function TodoButton({ onClick, iconSrc, bgColor, style }) {
  return (
    <button
      className={`flex h-full w-10 items-center justify-center rounded-md ${bgColor}`}
      onClick={onClick}
    >
      <img className={style} src={iconSrc} />
    </button>
  );
}

TodoButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  iconSrc: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  style: PropTypes.string,
};

export default TodoButton;
