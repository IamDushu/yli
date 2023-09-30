import React, {
  Fragment,
  useMemo,
  useCallback,
  useState,
  useRef,
  useEffect,
} from "react";
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
import { useRouter } from "next/router";
import { showMessageNotification } from "utils";
import { ListItem } from "components/list-item";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box, Button, Container, IconButton, Tooltip } from "@mui/material";
import Image from "next/image";

const PostFooterDropdown = ({ postData, userInfo, type, getAllPost }) => {
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Click occurred outside the dropdown; close the dropdown
        setIsOpen(false);
      }
    };

    // Add the event listener when the component mounts
    document.addEventListener("click", handleOutsideClick);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };
  const dispatch = useDispatch();
  const [lang] = useTranslation("language");
  const router = useRouter();
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
  return (
    <Box className="custom-dropdown" ref={dropdownRef}>
      <em
        onClick={toggleDropdown}
        className="like-tsp pointer icon icon-ellipsis-h font-24"
      ></em>

      {isOpen && (
        <Box id="simple-menu" className="dropdown-content">
          {/* Dropdown options */}
          {/* SavePost Post Section */}
          <Box
            onClick={() =>
              hideAllPost(postData?.id, !postData?.savePost, "save")
            }
            className={"p-m-option"}
          >
            {postData?.savePost === true ? (
              <Image
                className="like-tsp"
                width={30}
                height={30}
                src="/assets/images/posts/save.svg"
              />
            ) : (
              <Image
                className="like-tsp"
                width={30}
                height={30}
                src="/assets/images/posts/unsave.svg"
              />
            )}
            <span className="like-tsp">
              {postData?.savePost
                ? lang("DASHBOARD.POSTS.POST_HEADER.UNSAVE")
                : lang("DASHBOARD.POSTS.POST_HEADER.SAVE")}
            </span>
          </Box>
          {/* Turn on Notification Post Section */}
          <Box className={"p-m-option"}>
            <Image
              className="like-tsp"
              width={30}
              height={30}
              src="/assets/images/posts/notification.svg"
            />
            <span className="like-tsp">
              {lang("DASHBOARD.POSTS.POST_HEADER.TURN_ON_NOTIFICATION")}
            </span>
          </Box>
          {/* Copy Link Post Section */}
          <Box className={"p-m-option"} onClick={handleCopyLinkToClipboard}>
            <Image
              className="like-tsp"
              width={30}
              height={30}
              src="/assets/images/posts/copy.svg"
            />
            <span className="like-tsp">{lang("DASHBOARD.POSTS.POST_HEADER.COPY_LINK")}</span>
          </Box>
          {userInfo?.id === postData?.postDetails?.userDetails?.id && (
            <Fragment>
              {/* Delete Post Section */}
              <Box
                className={"p-m-option"}
                onClick={() => deleteOwnPost(postData.postId)}
              >
                {" "}
                <em className="like-tsp icon icon-delete-line reaction-icons pr-2 font-26"></em>
                <span className="like-tsp">{lang("DASHBOARD.POSTS.POST_HEADER.DELETE_POST")}</span>
              </Box>
              {/* Edit Post Section */}
              {postData?.postDetails?.postType !== "virtualShare" && (
                <Box
                  className={"p-m-option"}
                  onClick={(e) =>
                    postData.postDetails.title
                      ? router.push({
                          pathname: "/article",
                          query: { id: postData.postDetails.id },
                        })
                      : handleEditDashboardPost(e, postData)
                  }
                >
                  <em className="icon like-tsp icon-write reaction-icons pr-2 font-22"></em>
                  <span className="like-tsp">{lang("DASHBOARD.POSTS.POST_HEADER.EDIT_POST")}</span>
                </Box>
              )}
            </Fragment>
          )}
          {isOpen &&
            postData?.postDetails?.userDetails?.id !== userInfo?.id && (
              <Fragment>
                {/* Unfollow Post Section */}
                <Box
                  className={"p-m-option"}
                  onClick={() => {
                    if (followData) {
                      dispatch(unfollowUser(postData?.postDetails?.userId));
                    } else {
                      dispatch(followUser(postData?.postDetails?.userId));
                    }
                  }}
                >
                  {followData ? (
                    // <em className="icon icon-unfollow reaction-icons pr-2 font-24" />
                    <Image
                      className="like-tsp"
                      width={30}
                      height={30}
                      src="/assets/images/posts/unfollow.svg"
                    />
                  ) : (
                    // <i class="bx bx-user-plus bx-sm pr-2 pl-1" />
                    <Image
                      className="like-tsp"
                      width={30}
                      height={30}
                      src="/assets/images/posts/follow.svg"
                    />
                  )}
                  <span className="pr-1 text-ellipsis like-tsp">
                    {followData
                      ? lang("COMMON.UNFOLLOW")
                      : lang("COMMON.FOLLOW")}
                    {` ${firstName !== null ? firstName : ""} ${
                      lastName !== null ? lastName : ""
                    }`}
                  </span>
                </Box>
              </Fragment>
            )}
          {/* Mute Post Section */}
          <Box
            className={"p-m-option"}
            onClick={() => {
              hideAllPost(postData?.id, !postData?.mutePost, "mute");
            }}
          >
            {postData?.mutePost ? (
              <Image
                className="like-tsp"
                width={30}
                height={30}
                src="/assets/images/posts/mute.svg"
              />
            ) : (
              <Image
                className="like-tsp"
                width={30}
                height={30}
                src="/assets/images/posts/unmute.svg"
              />
            )}

            <span className="pr-1 like-tsp">
              {postData?.mutePost
                ? lang("DASHBOARD.POSTS.POST_HEADER.UNMUTE")
                : lang("DASHBOARD.POSTS.POST_HEADER.MUTE")}
            </span>
            <span className="pr-1 text-ellipsis like-tsp">
              {`${firstName !== null ? firstName : ""} ${
                lastName !== null ? lastName : ""
              }`}
            </span>
          </Box>
          {/* Hide Post Section */}
          <Box
            className={"p-m-option"}
            onClick={() =>
              hideAllPost(postData?.id, !postData?.hidePost, "hide")
            }
          >
            <Image
              className="like-tsp"
              width={30}
              height={30}
              src="/assets/images/posts/hide.svg"
            />
            <span className="pr-1 text-ellipsis like-tsp">
              {lang("DASHBOARD.POSTS.POST_HEADER.SEE_POST")}
            </span>
          </Box>
          {/* Report Post Section */}
          <Box
            className={"p-m-option"}
            onClick={() => {
              dispatch(toggleModals({ reportpost: true }));
              dispatch(setReportPostId(postData?.postId));
            }}
          >
            <Image
              className="like-tsp"
              width={30}
              height={30}
              src="/assets/images/posts/report.svg"
            />

            <span className="pr-1 text-ellipsis like-tsp">
              {lang("DASHBOARD.POSTS.POST_HEADER.REPORT_POST")}
            </span>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PostFooterDropdown;
