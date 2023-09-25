import React from "react";
import { onImageError } from "utils";
const SpeakerCard = ({ data }) => {
  return (
    <div className="col-lg-3 col-sm-6 pl-2 pr-1">
      <div className="speaker-card px-0 mb-3">
        <div style={{ height: "80px" }}>
          <img
            src={
              data?.userDetails?.profileBgURL &&
              data?.userDetails?.profileBgURL.length > 0
                ? data?.userDetails?.profileBgURL
                : "../assets/images/dashboard/cover-background.jpg"
            }
            className="speaker-card-bgimg"
            onError={(e) => {
              onImageError(e, "myprofile");
            }}
            alt="Card"
          />
          <div>
            <img
              src={
                data?.userDetails?.profilePicURL
                  ? data?.userDetails?.profilePicURL
                  : ""
              }
              className="speaker-card-img"
              onError={(e) =>
                onImageError(
                  e,
                  "profile",
                  `${data?.userDetails?.firstName} ${data?.userDetails?.lastName}`
                )
              }
            />
          </div>
        </div>
        <div className="speaker-card-content">
          <div
            onClick={() => {
              window.open(
                `https://front-dev.yliway.com/profile/${data?.userDetails?.profileId}`
              );
            }}
            style={{
              textAlign: "center",
              marginBottom: "10px",
              cursor: "pointer",
            }}
          >
            <div className="people-tab-follower-name-css">{`${data?.userDetails?.firstName} ${data?.userDetails?.lastName}`}</div>
            <div className="people-tab-follower-position-css">
              {data?.userDetails?.currentPosition}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SpeakerCard;
