import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";

export const Icon = ({ handleClick, iconName, width, height }) => {
  /* icon links based on icon name */
  const iconLinks = {
    addConnectionIcon: "/assets/images/profile-icons/person_add.svg",
    viewProfileIcon: "/assets/images/profile-icons/person_search.svg",
    growthConnectionIcon: "/assets/images/profile-icons/addchart.svg",
    growthAreaIcon: "/assets/images/icons-4/y-growth-area-ico.svg",
    growthProjectIcon: "/assets/images/icons-4/growth-projects-ico.svg",
    courseIcon: "/assets/images/icons-4/course-ico.svg",
    trainigRoomIcon: "/assets/images/icons-4/training-room-ico.svg",
    coachingRoomIcon: "/assets/images/icons-4/coaching-room-ico.svg",
    masterClassIcon: "/assets/images/icons-4/masterclass-ico.svg",
    webinarIcon: "/assets/images/icons-4/webinar-ico.svg",
    bnRoomIcon: "/assets/images/icons-4/bn-room-ico.svg",
    eventIcon: "/assets/images/icons-4/event-ico.svg",
    keyboardDownArrowIcon: "/assets/images/icons-4/keyboard-down-arrow-ico.svg",
    keyboardRightArrowIcon:
      "/assets/images/icons-4/keyboard-right-arrow-ico.svg",
    rightArrowIcon: "/assets/images/icons-4/right-arrow-ico.svg",
    informationIcon: "/assets/images/icons-4/info-ico.svg",
    unfollowUserIcon: "/assets/images/icons-4/unfollow-user-ico.svg",
    muteUserIcon: "/assets/images/icons-4/mute-user-ico.svg",
    hidePostIcon: "/assets/images/icons-4/hide-post-ico.svg",
    reportIcon: "/assets/images/icons-4/report-ico.svg",
    postArticleIcon: "/assets/images/post-type-icons/post-article.svg",
    postImageIcon: "/assets/images/post-type-icons/post-image.svg",
    postPollIcon: "/assets/images/post-type-icons/post-poll.svg",
    postVideoIcon: "/assets/images/post-type-icons/post-video.svg",
    agreementIcon: "/assets/images/homepage-icons/agreement-icon.svg",
    bookmarkAddIcon: "/assets/images/homepage-icons/bookmark-add-icon.svg",
    commentIcons: "/assets/images/homepage-icons/comment-icon.svg",
    copyLinkClipboardIcon:
      "/assets/images/homepage-icons/copy-link-clipboard-icon.svg",
    closeIcon: "/assets/images/homepage-icons/close-icon.svg",
    deleteIcon: "/assets/images/homepage-icons/delete-icon.svg",
    disconnectIcon: "/assets/images/homepage-icons/disconnect-icon.svg",
    downloadIcon: "/assets/images/homepage-icons/download-icon.svg",
    editIcon: "/assets/images/homepage-icons/edit-icon.svg",
    heartIcon: "/assets/images/homepage-icons/heart-icon.svg",
    launchMeetingNowIcon:
      "/assets/images/homepage-icons/launch-meeting-now-icon.svg",
    launchMeetingLaterIcon:
      "/assets/images/homepage-icons/launch-meeting-later-icon.svg",
    moreHorizIcon: "/assets/images/homepage-icons/more_horiz-icon.svg",
    myActivitiesIcon: "/assets/images/homepage-icons/my-activities-icon.svg",
    myProfileIcon: "/assets/images/homepage-icons/my-profile-icon.svg",
    notificationsIcon: "/assets/images/homepage-icons/notifications-icon.svg",
    roomsHistoryIcon: "/assets/images/homepage-icons/rooms-history-icon.svg",
    searchIcon: "/assets/images/homepage-icons/search-icon.svg",
    settingsIcon: "/assets/images/homepage-icons/settings-icon.svg",
    shareIcon: "/assets/images/homepage-icons/share-icon.svg",
    addIcon: "/assets/images/conection-page-icons/add-icon.svg",
    addTaskIcon: "/assets/images/conection-page-icons/add-task-icon.svg",
    cancelConnectionsIcon:
      "/assets/images/conection-page-icons/cancel-connections-icon.svg",
    selectedIcon: "/assets/images/conection-page-icons/selected-icon.svg",
    sendIcon: "/assets/images/conection-page-icons/send-icon.svg",
    videoCameraFrontIcon:
      "/assets/images/conection-page-icons/video-camera-front-icon.svg",
  };
  return (
    <div onClick={handleClick} className="d-inline-flex">
      <Image
        src={iconLinks[iconName]}
        alt={iconName}
        width={width ? width : "24"}
        height={height ? height : "24"}
      />
    </div>
  );
};

Icon.propTypes = {
  iconName: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
};
