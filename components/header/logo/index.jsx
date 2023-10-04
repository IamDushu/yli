import React from "react";
import PropTypes from "prop-types";
import logoStyles from "./logo.module.scss";

export const Logo = ({
  handleClick,
  logoUrl,
  alt = "Yliway",
  width,
  height,
}) => {
  return (
    <div className={logoStyles["yliway-logo"]} onClick={handleClick}>
      <img src={logoUrl} />
    </div>
  );
};

Logo.propTypes = {
  logoUrl: PropTypes.string,
  handleClick: PropTypes.func,
  alt: "Yliway",
  width: PropTypes.number,
  height: PropTypes.number,
};

Logo.defaultProps = {
  logoUrl: "/assets/images/brand-logo.svg",
};
