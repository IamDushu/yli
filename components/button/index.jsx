import React from "react";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import buttonStyles from "./button.module.scss";

export const YliwayButton = ({
  primary,
  textbutton,
  primaryOutlined,
  backgroundColor,
  color,
  btnType,
  disabled,
  size,
  fontWeight,
  label,
  handleClick,
  style: _style,
}) => {
  let mode;

  const style = {
    ...(_style || {}),
    textTransform: "none",
  };
  if (fontWeight) style.fontWeight = fontWeight;
  if (primary) {
    mode = buttonStyles["yliway-button--primary"];
  } else if (textbutton) {
    mode = buttonStyles["yliway-button--textbutton"];
  } else if (primaryOutlined) {
    mode = buttonStyles["yliway-button--primary-outlined"];
  }

  return (
    <>
      <Button
        type= {btnType ? btnType : "button"}
        className={[
          "yliway-button",
          buttonStyles["yliway-button"],
          buttonStyles[`yliway-button-${size}`],
          mode,
        ].join(" ")}
        onClick={handleClick}
        style={style}
        disabled={disabled}
      >
        {label}
      </Button>
    </>
  );
};

YliwayButton.propTypes = {
  // primary: PropTypes.bool,
  /**
   */
  disabled: PropTypes.bool,

  backgroundColor: PropTypes.string,

  size: PropTypes.oneOf(["small", "medium", "large", "thin"]),

  label: PropTypes.string.isRequired,

  handleClick: PropTypes.func,
};

YliwayButton.defaultProps = {
  handleClick: () => null,
  disabled: false,
  size: "medium",
};
