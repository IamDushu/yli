import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
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
}) => {
  return (
    <div className={userCardStyles["user-card-wrapper"]}>
      <div className="w-100">
        <Link href={profileurl}>
          <div
            className={userCardStyles["cover-image"]}
            style={{
              width: "100%",
              backgroundImage: `url(${
                coverImage ?? "../../assets/images/user-cover.jpg"
              })`,
            }}
          >
            <Avatar
              alt={name}
              src={profileImage}
              className={userCardStyles["profile-avatar-image"]}
              sx={{ width: 34, height: 34 }}
            />
          </div>
        </Link>
        <div className={userCardStyles["body"]}>
          <span className={userCardStyles["name"]}>{name}</span>
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

UserCard.PropTypes = {
  coverImage: PropTypes.string,
  profileImage: PropTypes.string,
  name: PropTypes.string,
  position: PropTypes.string,
  mutualCountText: PropTypes.string,
  renderFooter: PropTypes.func,
  profileurl: PropTypes.string,
};
