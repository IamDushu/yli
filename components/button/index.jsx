import React from "react";
import PropTypes from "prop-types";
import buttonStyles from "./button.module.scss";

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary,
  backgroundColor,
  size,
  label,
  handleClick,
}) => {
  const mode = primary
    ? buttonStyles["yliway-button-primary"]
    : buttonStyles["yliway-button-secondary"];

  const style = {
    backgroundColor,
  };

  return (
    <button
      type="button"
      className={[
        buttonStyles["yliway-button"],
        buttonStyles[`yliway-button-${size}`],
        mode,
      ].join(" ")}
      onClick={handleClick}
      style={style}>
      {label}
    </button>
  );
};

Button.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  primary: PropTypes.bool,
  /**
   * What background color to use
   */
  backgroundColor: PropTypes.string,
  /**
   * How large should the button be?
   */
  size: PropTypes.string,
  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  handleClick: PropTypes.func,
};

Button.defaultProps = {
  primary: false,
  // size: "common",
  handleClick: PropTypes.func,
};
