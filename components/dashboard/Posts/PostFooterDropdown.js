import React, { Fragment, useMemo, useCallback } from "react";
import { Dropdown } from "react-bootstrap";
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

function PostFooterDropdown({ postData, userInfo, type, getAllPost }) {
  const dispatch = useDispatch();
  const [lang] = useTranslation("language");
  const router = useRouter();
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
    <div>
      <Dropdown className="theme-dropdown d-flex align-items-start">
        <Dropdown.Toggle>
          {/* !type && (
            <em className="icon icon-ellipsis-h font-24 text-gray-darker"></em>
          ) */}
          <em className="icon icon-ellipsis-h font-24 text-secondary-purple"></em>
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-inner-left dropdown-scroll">
          {/* SavePost Post Section */}
          <Dropdown.Item
            className="d-flex align-items-center"
            onClick={() =>
              hideAllPost(postData?.id, !postData?.savePost, "save")
            }
          >
            {postData?.savePost === true ? (
              <em className="icon icon-save reaction-icons pr-2 font-24"></em>
            ) : (
              <em className="icon icon-save reaction-icons pr-2 font-24"></em>
            )}
            <span>
              {postData?.savePost
                ? lang("DASHBOARD.POSTS.POST_HEADER.UNSAVE")
                : lang("DASHBOARD.POSTS.POST_HEADER.SAVE")}
            </span>
          </Dropdown.Item>
          {/* Copy Link Post Section */}
          <Dropdown.Item
            onClick={handleCopyLinkToClipboard}
            className="d-flex align-items-center"
          >
            <em className="icon icon-copy-link reaction-icons pr-2 font-24"></em>
            <span>{lang("DASHBOARD.POSTS.POST_HEADER.COPY_LINK")}</span>
          </Dropdown.Item>

          {userInfo?.id === postData?.postDetails?.userDetails?.id && (
            <Fragment>
              {/* Delete Post Section */}
              <Dropdown.Item
                onClick={() => deleteOwnPost(postData.postId)}
                className="d-flex align-items-center"
              >
                <em className="icon icon-delete-line reaction-icons pr-2 font-26"></em>
                <span>{lang("DASHBOARD.POSTS.POST_HEADER.DELETE_POST")}</span>
              </Dropdown.Item>

              {/* Edit Post Section */}
              {postData?.postDetails?.postType !== "virtualShare" && (
                <Dropdown.Item
                  onClick={(e) =>
                    postData.postDetails.title
                      ? router.push({
                          pathname: "/article",
                          query: { id: postData.postDetails.id },
                        })
                      : handleEditDashboardPost(e, postData)
                  }
                  className="d-flex align-items-center"
                >
                  <em className="icon icon-write reaction-icons pr-2 font-22"></em>
                  <span>{lang("DASHBOARD.POSTS.POST_HEADER.EDIT_POST")}</span>
                </Dropdown.Item>
              )}
            </Fragment>
          )}
          {postData?.postDetails?.userDetails?.id !== userInfo?.id && (
            <Fragment>
              {/* Unfollow Post Section */}
              <Dropdown.Item
                className="d-flex align-items-center"
                onClick={() => {
                  if (followData) {
                    dispatch(unfollowUser(postData?.postDetails?.userId));
                  } else {
                    dispatch(followUser(postData?.postDetails?.userId));
                  }
                }}
              >
                {followData ? (
                  <em className="icon icon-unfollow reaction-icons pr-2 font-24" />
                ) : (
                  <i class="bx bx-user-plus bx-sm pr-2 pl-1" />
                )}
                <span className="pr-1 text-ellipsis">
                  {followData ? lang("COMMON.UNFOLLOW") : lang("COMMON.FOLLOW")}
                  {` ${firstName !== null ? firstName : ""} ${
                    lastName !== null ? lastName : ""
                  }`}
                </span>
              </Dropdown.Item>
              {/* Mute Post Section */}
              <Dropdown.Item
                className="d-flex align-items-center"
                onClick={() => {
                  hideAllPost(postData?.id, !postData?.mutePost, "mute");
                }}
              >
                <em className="icon icon-mute reaction-icons pr-2 font-24"></em>
                <span className="pr-1">
                  {postData?.mutePost
                    ? lang("DASHBOARD.POSTS.POST_HEADER.UNMUTE")
                    : lang("DASHBOARD.POSTS.POST_HEADER.MUTE")}
                </span>
                <span className="pr-1 text-ellipsis">
                  {`${firstName !== null ? firstName : ""} ${
                    lastName !== null ? lastName : ""
                  }`}
                </span>
              </Dropdown.Item>
              {/* Report Post Section */}

              <Dropdown.Item
                className="d-flex align-items-center"
                onClick={() => {
                  dispatch(toggleModals({ reportpost: true }));
                  dispatch(setReportPostId(postData?.postId));
                }}
              >
                <em className="icon icon-report reaction-icons pr-2 font-24"></em>
                <span className="pr-1 text-ellipsis">
                  {lang("DASHBOARD.POSTS.POST_HEADER.REPORT_POST")}
                </span>
              </Dropdown.Item>

              {/* Hide Post Section */}
              <Dropdown.Item
                className="d-flex align-items-center"
                onClick={() =>
                  hideAllPost(postData?.id, !postData?.hidePost, "hide")
                }
              >
                <em className="icon icon-eye-close reaction-icons pr-2 font-24"></em>
                <span className="pr-1 text-ellipsis">
                  {lang("DASHBOARD.POSTS.POST_HEADER.SEE_POST")}
                </span>
              </Dropdown.Item>
            </Fragment>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default PostFooterDropdown;
