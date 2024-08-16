import PropTypes from "prop-types";
import backgroundImg from "@/assets/images/background_image.png";
/**
 * `PageLayout` component for rendering a full-screen page layout:
 * - Centers the content both horizontally and vertically within the viewport.
 * - Applies a background image with cover size and centered positioning.
 * - Suitable for use on home, login, and sign-up pages.
 */
function PageLayout({ children }) {
  return (
    <div
      className="flex h-screen w-full items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {children}
    </div>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageLayout;
