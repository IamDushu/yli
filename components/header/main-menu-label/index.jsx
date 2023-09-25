import React from "react";
import PropTypes from "prop-types";
import labelStyles from "./label.module.scss";

export const HeaderLabel = ({
  handleClick,
  labelText,
  target,
  className,
  role,
}) => {
  const cName = `${labelStyles["yliway-header-label"]} ${className}`;

  return (
    <a className={cName} onClick={handleClick} target={target} role={role}>
      {labelText}
    </a>
  );
};

HeaderLabel.propTypes = {
  labelText: PropTypes.string,
  handleClick: PropTypes.func,
  target: PropTypes.string,
  className: PropTypes.string,
  role: PropTypes.string,
};

HeaderLabel.defaultProps = {
  labelText: "Home",
};
