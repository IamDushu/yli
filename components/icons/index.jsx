import React from "react";
import PropTypes from "prop-types";

export const Icon = ({ handleClick, iconName }) => {
  /* icon links based on icon name */
  const iconLinks = {
    addConnectionIcon: "assets/images/profile-icons/person_add.svg",
    viewProfileIcon: "assets/images/profile-icons/person_search.svg",
    growthConnectionIcon: "assets/images/profile-icons/addchart.svg",
  };
  return (
    <div onClick={handleClick}>
      <img src={iconLinks[iconName]} />
    </div>
  );
};

Icon.propTypes = {
  iconName: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
};
