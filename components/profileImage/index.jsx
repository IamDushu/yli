import React from "react";
import PropTypes from "prop-types";
import profileImageStyles from "./profile-image.module.scss";

/**
 * Primary UI component for user interaction
 */
export const ProfileImage = ({ size, imageUrl, handleClick }) => {
  return (
    <>
      <img
        onClick={handleClick}
        src={imageUrl}
        className={[
          profileImageStyles["yliway-image"],
          profileImageStyles[`yliway-image-${size}`],
        ].join(" ")}
      />
    </>
  );
};

ProfileImage.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "big"]),
  imageUrl: PropTypes.string,
};

ProfileImage.defaultProps = {
  size: "medium",
  imageUrl: "assets/images/homepage/user-1.png",
};
