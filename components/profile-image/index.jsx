import React from "react";
import PropTypes from "prop-types";
import profileImageStyles from "./profile-image.module.scss";
// import { useSelector } from "react-redux";
// import { onImageError } from "utils";
// import { selectUserInfo } from "store/selectors/user";
import Avatar from "@mui/material/Avatar";

/**
 * Primary UI component for user interaction
 */
export const ProfileImage = ({
  size,
  imageUrl,
  handleClick,
  firstName,
  lastName,
}) => {
  // Check if there's an image URL; if not, use the user's name as the avatar content
  const avatarContent = (
    <Avatar
      src={imageUrl}
      alt={`${firstName} ${lastName}`}
      onClick={handleClick}
      sx={{ width: size, height: size, bgcolor: "#6750a4" }}>
      {` ${firstName?.charAt(0)}  ${lastName?.charAt(0)}`}
    </Avatar>
  );

  return <div className="d-inline-block">{avatarContent}</div>;
};

ProfileImage.propTypes = {
  size: PropTypes.string,
  imageUrl: PropTypes.string,
};

ProfileImage.defaultProps = {
  size: "24px",
  imageUrl: "assets/images/homepage/user-1.png",
};
