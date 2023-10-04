import React, { useMemo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  createPoll,
  deleteDashboardPost,
  editDashboardPost,
  hidePostData,
  mutePostData,
  reportPostData,
  savePostData,
  setPostDocument,
  setPostImage,
  setPostVideo,
  setReportPostId,
  toggleModals,
} from "store/actions";
import { followUser, unfollowUser } from "store/actions/connections";
import { showMessageNotification } from "utils";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton, ListItemIcon, Typography } from "@mui/material";
import Image from "next/image";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
const PostFooterDropdown = ({ postData, userInfo, type, getAllPost }) => {
  const dispatch = useDispatch();
  const [lang] = useTranslation("language");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const followData =
    postData?.postDetails?.userDetails?.followData &&
    postData?.postDetails?.userDetails?.followData?.length > 0;
  // Get user first name
  const firstName = useMemo(() => {
    if (type === "share") {
      if (postData.postShareDetails !== null)
        return postData?.postShareDetails?.userDetails?.firstName;
      else if (postData?.instituteId)
        return postData?.postDetails?.instituteDetails?.name;
      else return postData?.postDetails?.userDetails?.firstName;
    } else if (postData?.instituteId)
      return postData?.postDetails?.instituteDetails?.name;
    else return postData?.postDetails?.userDetails?.firstName;
  }, [postData]);

  // Get user last name
  const lastName = useMemo(() => {
    if (type === "share") {
      if (postData.postShareDetails !== null)
        return postData?.postShareDetails?.userDetails?.lastName;
      else if (postData?.instituteId) return "";
      else return postData?.postDetails?.userDetails?.lastName;
    } else if (postData?.instituteId) return "";
    else return postData?.postDetails?.userDetails?.lastName;
  }, [postData]);

  // Copy link to clipboard
  const handleCopyLinkToClipboard = useCallback(() => {
    const el = document.createElement("input");
    el.value = `${window.location.origin}/post/${postData.id}`;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    showMessageNotification("Link Copied Successfully");
  }, [postData]);

  // hide, mute, report save post
  const hideAllPost = useCallback(
    async (id, status, type) => {
      if (type === "hide") {
        await dispatch(hidePostData({ id, hidePost: status }));
        getAllPost();
      } else if (type === "mute") {
        await dispatch(mutePostData({ id, mutePost: status }));
        getAllPost();
      } else if (type === "report") {
        await dispatch(reportPostData({ id, reportPost: status }));
        getAllPost();
      } else {
        await dispatch(savePostData({ id, savePost: status }));
        showMessageNotification(
          `Post ${status ? "Saved" : "Unsaved"} Successfully`
        );
        getAllPost();
      }
    },
    [postData, getAllPost]
  );

  // Edit post details
  const handleEditDashboardPost = useCallback(
    (e, postData) => {
      if (postData.postDetails.postType === "poll") {
        dispatch(editDashboardPost(postData));
        dispatch(createPoll(postData.pollDetails));
        dispatch(toggleModals({ addpost: true, isEdit: true }));
      } else if (postData.postDetails.postType === "video") {
        dispatch(setPostVideo(postData.postDetails.videoURL));
        dispatch(editDashboardPost(postData));
        dispatch(toggleModals({ addpost: true, isEdit: true }));
      } else if (postData.postDetails.postType === "photo") {
        dispatch(setPostImage(postData));
        dispatch(editDashboardPost(postData));
        dispatch(toggleModals({ addpost: true, isEdit: true }));
      } else if (postData.postDetails.postType === "documents") {
        dispatch(setPostDocument(postData.postDetails.documentURL));
        dispatch(editDashboardPost(postData));
        dispatch(toggleModals({ addpost: true, isEdit: true }));
      } else if (postData.postDetails.postType === "postShare") {
        dispatch(editDashboardPost(postData));
        dispatch(toggleModals({ sharepost: true, isEdit: true }));
      } else if (postData.postDetails.postType === "") {
        dispatch(editDashboardPost(postData));
        dispatch(toggleModals({ addpost: true, isEdit: true }));
      }
    },
    [postData, getAllPost]
  );

  // Delete post
  const deleteOwnPost = async (id) => {
    const response = await dispatch(deleteDashboardPost(id));
    if (response.status === 1) {
      getAllPost();
    }
  };

  const options = [
    {
      name: postData?.savePost
        ? lang("DASHBOARD.POSTS.POST_HEADER.UNSAVE")
        : lang("DASHBOARD.POSTS.POST_HEADER.SAVE"),
      icon: postData?.savePost ? (
        <Image
          className="like-tsp"
          width={24}
          height={24}
          src={"/assets/images/posts/save.svg"}
        />
      ) : (
        <Image
          className="like-tsp"
          width={24}
          height={24}
          src={"/assets/images/posts/unsave.svg"}
        />
      ),
      onClick: () => {
        hideAllPost(postData?.id, !postData?.savePost, "save");
        setAnchorEl(null);
      },
      show: true,
    },
    {
      show: true,
      name: lang("DASHBOARD.POSTS.POST_HEADER.TURN_ON_NOTIFICATION"),
      icon: (
        <Image
          className="like-tsp"
          width={24}
          height={24}
          src={"/assets/images/posts/notification.svg"}
        />
      ),
      onClick: () => {
        hideAllPost(postData?.id, !postData?.savePost, "save");
        setAnchorEl(null);
      },
    },
    {
      show: true,
      name: lang("DASHBOARD.POSTS.POST_HEADER.COPY_LINK"),
      icon: (
        <Image
          className="like-tsp"
          width={24}
          height={24}
          src={"/assets/images/posts/copy.svg"}
        />
      ),
      onClick: () => {
        handleCopyLinkToClipboard();
        setAnchorEl(null);
      },
    },
    {
      name: lang("DASHBOARD.POSTS.POST_HEADER.DELETE_POST"),
      icon: (
        <em className="like-tsp icon icon-delete-line reaction-icons pr-2 font-26"></em>
      ),
      onClick: () => {
        deleteOwnPost(postData.postId);
        setAnchorEl(null);
      },
      show: userInfo?.id === postData?.postDetails?.userDetails?.id,
    },
    {
      name: `${followData ? lang("COMMON.UNFOLLOW") : lang("COMMON.FOLLOW")} ${
        firstName !== null ? firstName : ""
      } ${lastName !== null ? lastName : ""}`,
      icon: followData ? (
        <Image
          className="like-tsp"
          width={24}
          height={24}
          src="/assets/images/posts/unfollow.svg"
        />
      ) : (
        <Image
          className="like-tsp"
          width={24}
          height={24}
          src="/assets/images/posts/follow.svg"
        />
      ),
      onClick: () => {
        if (followData) {
          dispatch(unfollowUser(postData?.postDetails?.userId));
        } else {
          dispatch(followUser(postData?.postDetails?.userId));
        }
        setAnchorEl(null);
      },
      show: postData?.postDetails?.userDetails?.id !== userInfo?.id,
    },
    {
      name: `${
        postData?.mutePost
          ? lang("DASHBOARD.POSTS.POST_HEADER.UNMUTE")
          : lang("DASHBOARD.POSTS.POST_HEADER.MUTE")
      } ${firstName !== null ? firstName : ""} ${
        lastName !== null ? lastName : ""
      }`,
      icon: postData?.mutePost ? (
        <Image
          className="like-tsp"
          width={24}
          height={24}
          src="/assets/images/posts/mute.svg"
        />
      ) : (
        <Image
          className="like-tsp"
          width={24}
          height={24}
          src="/assets/images/posts/unmute.svg"
        />
      ),
      onClick: () => {
        hideAllPost(postData?.id, !postData?.mutePost, "mute");
        setAnchorEl(null);
      },
      show: true,
    },
    {
      name: lang("DASHBOARD.POSTS.POST_HEADER.SEE_POST"),
      icon: (
        <Image
          className="like-tsp"
          width={24}
          height={24}
          src="/assets/images/posts/hide.svg"
        />
      ),
      onClick: () => {
        hideAllPost(postData?.id, !postData?.hidePost, "hide");
        setAnchorEl(null);
      },
      show: true,
    },
    {
      name: lang("DASHBOARD.POSTS.POST_HEADER.REPORT_POST"),
      icon: (
        <Image
          className="like-tsp"
          width={24}
          height={24}
          src="/assets/images/posts/report.svg"
        />
      ),
      onClick: () => {
        dispatch(toggleModals({ reportpost: true }));
        dispatch(setReportPostId(postData?.postId));
        setAnchorEl(null);
      },
      show: true,
    },
  ];

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ paddingTop: 0, paddingBottom: 0 }}
      >
        {options
          .filter((o) => o.show)
          .map((option) => (
            <MenuItem
              sx={{
                padding: "8px 24px 8px 16px",
                borderBottom: "1px solid #CAC4CF",
              }}
              key={option.name}
              onClick={option.onClick}
            >
              <ListItemIcon>{option.icon}</ListItemIcon>
              <Typography variant="bodySmall">{option.name}</Typography>
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
};

export default PostFooterDropdown;
