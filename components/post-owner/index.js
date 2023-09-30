import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import postOwnerStyles from "./post-owner.module.scss";
import { onImageError } from "../../utils/functions";
import { CustomDropDowns } from "components/add-post-ui/custom-dropdown";
import { toggleModals } from "store/actions";

export const PostOwner = ({
  photoLink = "https://d39ubr28bcomsg.cloudfront.net/2023/9/19/ben-sweet-2LowviVHZ-E-unsplash.1695106775974.jpg",
  name = "Test Post",
  profileNameArrow = "assets/images/profile-name-down-arrow.svg",
  postData,
  privacyOptions,
  changePrivacy,
  handleClick,
}) => {
  const [lang] = useTranslation("language");
  const anchorRef = useRef(null);
  const dispatch = useDispatch();
  const { postPrivacyDropdown } = useSelector(
    ({ ui }) => ui.modals,
    shallowEqual
  );
  return (
    <>
      <div
        className={postOwnerStyles["yliway-post-owner-container"]}
        onClick={() => {
          dispatch(
            toggleModals({
              postPrivacyDropdown: !(postPrivacyDropdown || false),
            })
          );
        }}
      >
        <div   className={postOwnerStyles["post-owner-img-name-block"]}>
          <div
            className={[postOwnerStyles["yliway-post-owner-img"]].join(" ")}
            onClick={handleClick}
          >
            <picture onContextMenu={(e) => e.preventDefault()}>
              <source srcSet={photoLink || ""} type="image/jpg" />
              <img
                src={photoLink || ""}
                onError={(e) => {
                  onImageError(e, "profile", name);
                }}
                width="46"
                height="46"
              />
            </picture>
          </div>

          <div
            className={[postOwnerStyles["yliway-post-owner-name"]].join(" ")}
            onClick={handleClick}
          >
            {name}
          </div>
        </div>


        <div className={postOwnerStyles["yliway-post-owner-right-block"]}>
          <div className={postOwnerStyles["yliway-post-owner-name-div"]}>
            <div className={postOwnerStyles["yliway-post-post-privacy-block"]}>
              <div className={postOwnerStyles["yliway-post-owner-name-arrow"]} style={
                (postPrivacyDropdown)?{transform:"rotate(180deg)"}:{}
              }>
                <img src={profileNameArrow} />
              </div>
              <div
                className={postOwnerStyles["yliway-post-owner-post-privacy"]}
                ref={anchorRef}
              >
                {`${lang("COMMON.POST_TO")} `}{postData?.privacy}
                <CustomDropDowns
                  anchorRef={anchorRef}
                  defaultValue={postData?.privacy}
                  menuOpen={postPrivacyDropdown || false}
                  options={privacyOptions}
                  key={"postPrivacyDropdown"}
                  callback={changePrivacy}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

PostOwner.propTypes = {
  photoLink: PropTypes.string,
  name: PropTypes.string,
};
