import React, { Fragment, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  likePost,
  postLikeReactionData,
  setCommentList,
  sharePostModal,
  toggleModals,
} from "store/actions";
import Reactions from "./Reactions";
import Comment from "../Comments/Comment";
import { APP_URL } from "config";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import PostFooterDropdown from "./PostFooterDropdown";
import { AddToGmIcon, CommentIcon, ShareIcon } from "components/svg/dashboard";
import { getSearchResults } from "store/actions/search-result";

/******************** 
@purpose : Used for Post Footer 
@Parameter : {  }
@Author : INIC
******************/
const PostFooter = ({
  postData,
  currentUserInfo,
  getAllPost,
  toggleGMModal,
  toggleGMModalLI,
  toggleGMModalArticle,
  type,
  searchText,
}) => {
  const {
    id,
    postId,
    reaction,
    reactionCount,
    commentCount,
    postComments: comments,
    postDetails,
    isPostAddedGM,
  } = postData;

  const dispatch = useDispatch();
  const [lang] = useTranslation("language");
  const { postLikesData } = useSelector((state) => state.post);
  const router = useRouter();
  const { instituteId, companyId, activityType, commentId } = router.query;
  const commentRef = useRef();
  const { learningData } = useSelector((state) => state.learningInstitute);

  /******************** 
@purpose : Used for useState
@Parameter : {  }
@Author : INIC
******************/
  const [eventType, setEventType] = useState(reaction);
  const [isLoading, setIsloading] = useState(false);
  const [postIdForComment, setPostIdForComment] = useState("");
  const [isDisplayCommentsPage, setDisplayCommentsPage] = useState(false);
  /******************** 
@purpose : Used for like post
@Parameter : { e, event }
@Author : INIC
******************/
  const handleClickEvent = (e, event) => {
    e.preventDefault();
    // event type is updated
    setEventType(event);
    setIsloading(true);
  };
  /******************** 
@purpose : Used for useEffect
@Parameter : {}
@Author : INIC
******************/
  useEffect(() => {
    // Post LIke is called
    postLike();
  }, [eventType]);
  /******************** 
@purpose : Used for post like
@Parameter : { data, dispatch }
@Author : INIC
******************/
  const postLike = async () => {
    if (isLoading) {
      let typeId = router?.query?.instituteId
        ? instituteId
        : router?.query?.companyId
        ? companyId
        : "";
      const body = {
        id,
        reaction: eventType,
        postId,
        typeId,
        query: router.query,
        pathname: router.pathname,
        ...(postData.groupId !== undefined &&
          postData.groupId !== "" && { groupId: postData.groupId }),
      };
      const response = await dispatch(
        likePost(body, () =>
          dispatch(getSearchResults({ page: 1, pagesize: 10, searchText }))
        )
      );

      if (response.status === 1) {
        setIsloading(false);
      }
    }
  };

  /******************** 
@purpose : Used for handle User Comments
@Parameter : { data, dispatch }
@Author : INIC
******************/

  const handleUserComments = (postId) => {
    setPostIdForComment(postId);
    if (postId === postIdForComment) {
      commentRef.current.focus();
      setDisplayCommentsPage(true);
    } else {
      setDisplayCommentsPage(true);
      dispatch(setCommentList(""));
    }
  };
  /******************** 
@purpose : Used for Share modal 
@Parameter : { data, dispatch }
@Author : INIC
******************/

  const shareModalHandler = () => {
    let sharePostData = postData;
    if (postData.postShareDetails !== null) {
      sharePostData.postDetails = sharePostData.postShareDetails;
      sharePostData.postId = sharePostData.postShareDetails.id;
      sharePostData.postShareDetails = null;

      dispatch(sharePostModal(sharePostData));
      dispatch(toggleModals({ sharepost: true, isEdit: false }));
    } else {
      dispatch(sharePostModal(postData));
      dispatch(toggleModals({ sharepost: true, isEdit: false }));
    }
  };

  /******************** 
@purpose : Used for Adding Post to GM 
@Parameter : { id, post name,post link,postid }
@Author : INIC
******************/

  const addtoGMFunc = () => {
    let postLink = `${APP_URL}/post/${postData?.id}`;
    toggleGMModal(
      id,
      postDetails.userDetails.firstName + "'s Post",
      postLink,
      postData?.postId
    );
  };

  /******************** 
@purpose : Used for Adding Post to GM from LI
@Parameter : { id, post name,post link,postid }
@Author : INIC
******************/

  const addtoGMFuncLI = (instituteId) => {
    let postLink = `${APP_URL}/post/${postData?.id}`;
    toggleGMModalLI(
      id,
      postDetails.instituteDetails.name + "'s Post",
      postLink,
      postData?.postId,
      instituteId
    );
  };
  /******************** 
@purpose : Used for Adding Post to GM from Article
@Parameter : { id, post name,post link,postid }
@Author : INIC
******************/

  const addtoGMFuncArticle = (postType, instituteId) => {
    let postLink = `${APP_URL}/post/${postData?.id}`;
    toggleGMModalArticle(
      id,
      postDetails.instituteDetails.name + "'s Article",
      postLink,
      postData?.postId,
      postType,
      instituteId
    );
  };

  const addToGMclickFunc = (instituteId, postDetails) => {
    if (instituteId && postDetails?.postType !== "article") {
      addtoGMFuncLI(instituteId);
    } else if (instituteId === undefined) {
      addtoGMFunc();
    } else if (
      postDetails?.postType === "article" ||
      postDetails?.postType === "Article" ||
      postDetails?.postType === "ARTICLE"
    ) {
      addtoGMFuncArticle(postDetails?.postType, instituteId);
    } else if (instituteId === undefined) {
      addtoGMFunc();
    } else if (
      postDetails?.postType === "article" ||
      postDetails?.postType === "Article" ||
      postDetails?.postType === "ARTICLE"
    ) {
      addtoGMFuncArticle(postDetails?.postType, instituteId);
    }
  };

  return (
    <Fragment>
      <div className="d-flex align-items-center justify-content-between px-3 py-2 post-footer-container">
        <div className="reaction-icons-sections post-reactions d-flex align-items-center p-0 mb-md-0 mb-0">
          {/* Like Post Section */}
          <Reactions
            eventType={eventType}
            handleClickEvent={handleClickEvent}
          />
          <a
            className="text-body-12 font-weight-semibold"
            onClick={() => {
              dispatch(
                postLikeReactionData({
                  page: 1,
                  pageSize: 10,
                  postId: postId || postDetails?.id,
                })
              );
              postLikesData?.rows &&
                dispatch(toggleModals({ likelistcounter: true }));
            }}
          >
            <span className="text-gray-darker font-14 font-weight-semibold">
              {reactionCount}
            </span>
          </a>
          {/* Comment Post Section */}
          <div className="reaction-icons-box p-0 mr-4">
            <div
              className={
                postDetails?.whoCanComment === "No one" ||
                (postDetails?.whoCanComment === "Connections only" &&
                  postDetails?.userDetails?.id !== currentUserInfo?.id &&
                  !postDetails?.userDetails?.connectionData?.length) ||
                  (postDetails?.whoCanComment === "Growth connections only" &&
                  postDetails?.userDetails?.id !== currentUserInfo?.id &&
                  !postDetails?.userDetails?.growthConnectionData?.isGrowthConnection)
                  ? "d-flex align-items-center justify-content-center disableButton ml-4"
                  : "d-flex align-items-center justify-content-center ml-4"
              }
              onClick={() =>
                postDetails?.whoCanComment === "No one" ||
                (postDetails?.whoCanComment === "Connections only" &&
                  postDetails?.userDetails?.id !== currentUserInfo?.id &&
                  !postDetails?.userDetails?.connectionData?.length) ||
                (postDetails?.whoCanComment === "Growth connections only" &&
                  postDetails?.userDetails?.id !== currentUserInfo?.id &&
                  !postDetails?.userDetails?.growthConnectionData?.isGrowthConnection)
                  ? null
                  : handleUserComments(postId)
              }
            >
              <div className="post-footer-social-icon">
                <CommentIcon />
              </div>

              <span className="ml-2 font-14 font-weight-semibold text-gray-darker">
                {commentCount}
                {/* {postData.postDetails.commentCount} */}
              </span>
            </div>
          </div>
          {/* Share Post Section */}
          <div
            className="reaction-icons-box p-0 mr-4"
            onClick={() => shareModalHandler()}
          >
            <a
              title=""
              className="d-xl-flex align-items-center justify-content-center"
            >
              <div className="post-footer-social-icon">
                <ShareIcon />
              </div>
            </a>
          </div>
          {/* Add to GM Post Section */}
          {!isPostAddedGM && (
            <div
              className="reaction-icons-box p-0 "
              onClick={() => addToGMclickFunc(instituteId, postDetails)}
            >
              <div className="d-xl-flex align-items-center justify-content-center">
                <div className="post-footer-social-icon">
                  <AddToGmIcon />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="d-flex align-items-center reaction-icons-sections">
          {/* Post Dropdown Section */}
          <PostFooterDropdown
            postData={postData}
            userInfo={currentUserInfo}
            type={type}
            getAllPost={getAllPost}
          />
        </div>
      </div>
      {isDisplayCommentsPage ||
      activityType === "comment" ||
      activityType === "commentReply" ||
      activityType === "commentLike" ? (
        <Comment
          currentUserInfo={currentUserInfo}
          commentLists={
            activityType === "comment" || "commentReply" || "commentLike"
              ? postData.postComments
              : comments
          }
          activityType={activityType}
          commentId={commentId}
          postDetails={postDetails}
          id={postId}
          getAllPost={getAllPost}
          commentRef={commentRef}
          searchText={searchText}
          commentCount={commentCount}
          // commentCount={postData.postDetails.commentCount}
        />
      ) : null}
    </Fragment>
  );
};

export default PostFooter;
