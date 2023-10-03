import React from "react";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import userCardStyles from "./user-card.module.scss";

const UserCard = ({
  coverImage,
  profileImage,
  name,
  position,
  mutualCountText,
  renderFooter,
  profileurl = "",
  containerWidth,
}) => {
  return (
    <div
      className={userCardStyles["user-card-wrapper"]}
      style={{ width: containerWidth }}
    >
      <div className="w-100">
        <div
          className={userCardStyles["cover-image"]}
          style={{
            width: "100%",
            backgroundImage: `url(${
              coverImage ?? "../../assets/images/user-cover.jpg"
            })`,
          }}
        >
          <a href={profileurl} target="_blank">
            <Avatar
              alt={name}
              src={profileImage}
              className={userCardStyles["profile-avatar-image"]}
              sx={{ width: 34, height: 34 }}
            />
          </a>
        </div>
        <div className={userCardStyles["body"]}>
          <a href={profileurl} target="_blank">
            <span className={userCardStyles["name"]}>{name}</span>
          </a>
          <span className={userCardStyles["position"]}>{position}</span>
          <span className={userCardStyles["mutual-contacts"]}>
            {mutualCountText}
          </span>
        </div>
      </div>
      {!!renderFooter && (
        <div className={userCardStyles["footer"]}>{renderFooter()}</div>
      )}
    </div>
  );
};

export default UserCard;

UserCard.propTypes = {
  coverImage: PropTypes.string,
  profileImage: PropTypes.string,
  name: PropTypes.string,
  position: PropTypes.string,
  mutualCountText: PropTypes.string,
  renderFooter: PropTypes.func,
  profileurl: PropTypes.string,
  containerWidth: PropTypes.string,
};
