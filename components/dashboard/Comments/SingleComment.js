import React, { useState, useEffect, Fragment } from "react";
import { Link } from "@routes";
import { UPDATE_COMMENT_COUNT } from "store/actions";
import { Card, Dropdown } from "react-bootstrap";
import Reactions from "../Posts/Reactions";
import ReplyComment from "./ReplyComment";
import CommentInput from "./CommentInput";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_URL } from "config";
import { USER_COMMENT_DELETE } from "api/routes";
import store from "store";
import { commentReplyPost, LikeCommentPost } from "store/actions";
import { onImageError, urlify } from "utils";
import { selectUserInfo } from "store/selectors/user";
import { useTranslation } from "react-i18next";
import ReactHtmlParser from "react-html-parser";
import { getSearchResults } from "store/actions/search-result";
import { getCookie } from "utils";
import {
  postListing, // here
  toggleModals,
  posttype,
  editDashboardPost,
  postGroupId,
} from "store/actions";
const SingleComment = ({
  comment,
  handleEditComments,
  currentUserInfo,
  postId,
  commentListApiCall,
  commentRef,
  searchText,
  router,
}) => {
  const [lang] = useTranslation("language");
  const sortBy = getCookie("sortBy");
  /******************** 
@purpose : Used for all state
@Parameter : { }
@Author : INIC
******************/
  const [startReply, setStartReply] = useState("");
  const [isEditReplyCmnts, setIsEditReplyCmnts] = useState(false);
  const [editReplyComentsId, setEditReplyComentsId] = useState("");
  const [, setIsEditReply] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isDisplayReplyPage, setDisplayReplyPage] = useState(false);
  const [eventTypeComment, setEventTypeComment] = useState(null);
  const [, setCounterLiked] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [commentReplyLists, setCommentReplyLists] = useState({});
  const [commentLikeId, setCommentLikeId] = useState();
  const [addEmoji, setAddEmoji] = useState(false);
  const [error, setError] = useState({ error: false, length: 0 });
  const dispatch = useDispatch();
  const [mentions, setMentions] = useState([]);
  const [tags, setTags] = useState([]);
  const userInfo = useSelector(selectUserInfo);
  const [commentReplyImage, setCommentReplyImage] = useState(null);

  useEffect(() => {
    if (startReply.trim() || commentReplyImage !== null) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [startReply, commentReplyImage]);
  /******************** 
@purpose : Used for make reply
@Parameter : { e, event }
@Author : INIC
******************/
  const handleMakeReply = (e) => {
    // e.preventDefault();
    if (e.target.value.length <= 3000) {
      setStartReply(e.target.value);
      setError({
        error: false,
        length: e.target.value.length,
      });
    } else {
      setStartReply(e.target.value);
      setError({
        error: true,
        length: e.target.value.length,
      });
    }
  };
  /******************** 
@purpose : Used for use Effects 
@Parameter : { e, event }
@Author : INIC
******************/

  useEffect(() => {
    comment?.commentLikes?.forEach((element) => {
      if (element.userId === currentUserInfo?.id) {
        setEventTypeComment(element.type);
        setCommentLikeId(element.id);
      }
    });
  }, []);

  useEffect(() => {
    commentLikePost();
  }, [eventTypeComment]);

  useEffect(() => {
    const replyLists = Paginator(comment.commentReplys, 1, 1);
    setCommentReplyLists(replyLists);
  }, [comment.commentReplys]);

  /******************** 
@purpose : Used for like comment 
@Parameter : { e, event }
@Author : INIC
******************/
  const handleLikeComments = (e, event) => {
    e.preventDefault();
    setEventTypeComment(event);
    setIsloading(true);
  };

  /******************** 
@purpose : Global search comment handler
@Parameter : { data, dispatch }
@Author : INIC
******************/
  const globalSearchCallback = () => {
    dispatch(getSearchResults({ page: 1, pagesize: 10, searchText }));
    commentListApiCall();
    setIsEditReply(false);
    setStartReply("");
  };
  /******************** 
@purpose : Used for Reply Post
@Parameter : { e, event }
@Author : INIC
******************/
  const ReplyPost = async (e) => {
    setIsButtonDisabled(true);
    let description = startReply;
    if (description && description.includes("#")) {
      description = description.split("$$$$__").join('<a href="/search-result');
    }
    const descriptionTagAdd = description.includes("~+~")
      ? description.split("~+~")[0] + "$$$~~~"
      : description;
    description = descriptionTagAdd.split("$$$__").join('<a href="/profile/');
    description = description.split("~~~__").join(`">`);
    description = description.split("$$$~~~").join("</a>");
    e.preventDefault();
    if (isEditReplyCmnts) {
      await dispatch(
        commentReplyPost(
          {
            id: editReplyComentsId,
            commentId: comment.id,
            title: description,
            postId: postId,
            imageURL: commentReplyImage,
            tags: tags.length > 0 ? tags : null,
            taggedId: mentions.length > 0 ? mentions : null,
          },
          router.pathname,
          () => globalSearchCallback()
        )
      ).then(() => {
        setError({ error: false, length: 0 });
        setIsButtonDisabled(false);
      });
    } else {
      await dispatch(
        commentReplyPost(
          {
            commentId: comment.id,
            title: description,
            postId: postId,
            imageURL: commentReplyImage,
            tags: tags.length > 0 ? tags : null,
            taggedId: mentions.length > 0 ? mentions : null,
          },
          router.pathname,
          () => globalSearchCallback()
        )
      ).then(() => {
        setError({ error: false, length: 0 });
        setIsButtonDisabled(false);
      });
    }
    commentListApiCall();
    setIsEditReply(false);
    setStartReply("");
    setCommentReplyImage(null);
  };

  /******************** 
@purpose : Used for handle Open reply page 
@Parameter : { e, event }
@Author : INIC
******************/
  const handleOpenReplyPage = (e) => {
    e.stopPropagation();
    setDisplayReplyPage(true);
  };

  /******************** 
@purpose : Used for like comment 
@Parameter : { e, event }
@Author : INIC
******************/
  const commentLikePost = async () => {
    const id = commentLikeId;
    if (isLoading) {
      const body = {
        id,
        userId: currentUserInfo.id,
        commentId: comment.id,
        type: eventTypeComment,
      };

      await dispatch(LikeCommentPost(body));
      setCounterLiked(true);
      commentListApiCall();
    }
  };

  const commentPreferenceHandler = (userDetails, userId) => {
    if (
      (userInfo && userInfo.id === userId) ||
      userDetails?.profilePicShowData === null ||
      userDetails?.profilePicShowData?.all ||
      (userDetails &&
        ((userDetails?.connectionData &&
          userDetails?.connectionData[0]?.isConnection &&
          userDetails?.profilePicShowData?.myConnections) ||
          (userDetails?.followData &&
            userDetails?.followData[0]?.isFollow &&
            userDetails?.profilePicShowData?.followers) ||
          (userDetails?.growthConnectionData &&
            userDetails?.growthConnectionData?.isGrowthConnection &&
            userDetails?.profilePicShowData?.myGrowthConnections) ||
          (userInfo.role &&
            ((userInfo.role.includes("Teacher") &&
              userDetails?.profilePicShowData?.teachers) ||
              (userInfo.role.includes("Trainer") &&
                userDetails?.profilePicShowData?.trainer) ||
              (userInfo.role.includes("Coach") &&
                userDetails?.profilePicShowData?.coach) ||
              (userInfo.role.includes("Host") &&
                userDetails?.profilePicShowData?.hosts)))))
    ) {
      return true;
    }
  };

  /******************* 
  @purpose : Last name handler
  @Author : INIC
  ******************/
  const lastNameHandler = (userDetails, userId) => {
    if (
      (userInfo && userInfo.id === userId) ||
      userDetails?.lastNameVisibility === null ||
      userDetails?.lastNameVisibility?.settings?.all ||
      (userDetails &&
        ((userDetails?.connectionData &&
          userDetails?.connectionData[0]?.isConnection &&
          userDetails?.lastNameVisibility?.settings?.myConnection) ||
          (userDetails?.growthConnectionData &&
            userDetails?.growthConnectionData?.isGrowthConnection &&
            userDetails?.lastNameVisibility?.settings?.myGrowthConnection) ||
          (userDetails?.followData &&
            userDetails?.followData[0]?.isFollow &&
            userDetails?.lastNameVisibility?.settings?.followers)))
    ) {
      return true;
    }
  };
  /******************** 
@purpose : Used for delete comment 
@Parameter : { e, event }
@Author : INIC
******************/
  const handleDeleteComments = (e, cmnt) => {
    // here delete comments
    const requestData = new URLSearchParams();
    requestData.append("id", cmnt.id);
    requestData.append("postId", postId);
    requestData.append("userId", cmnt.userId);

    fetch(`${USER_API_URL}/${USER_COMMENT_DELETE}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        Authorization: `${store?.getState()?.user?.token}`,
      },
      body: requestData,
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (router.pathname !== "/search-result") {
          dispatch(
            postListing(
              {
                page: 1,
                pagesize: 10,
                undefined,
                filter: null,
              },
              sortBy
            )
          );
        } else if (router.pathname === "/search-result") {
          dispatch(getSearchResults({ page: 1, pagesize: 10, searchText }));
        }
        commentListApiCall();
      });
  };

  /******************** 
@purpose : Used for edit reply comment 
@Parameter : { e, event }
@Author : INIC
******************/
  const handleEditReplyComments = (e, cmntData) => {
    let description1 = cmntData.title;
    if (description1 && description1.includes("#")) {
      description1 = description1
        .split("$$$$__")
        .join('<a href="/search-result');
    }
    const descriptionTagAdd = description1.includes("~+~")
      ? description1.split("~+~")[0] + "$$$~~~"
      : description1;
    description1 = descriptionTagAdd.split("$$$__").join('<a href="/profile/');
    description1 = description1.split("~~~__").join(`">`);
    description1 = description1.split("$$$~~~").join("</a>");

    setIsEditReplyCmnts(true);
    setDisplayReplyPage(true);
    setEditReplyComentsId(cmntData.id);
    setStartReply(description1);
    setCommentReplyImage(cmntData.imageURL);
    setError({ error: false, length: cmntData.title.length });
  };

  const loadPreviousReply = () => {
    const perpage = commentReplyLists.per_page + 2;
    setCommentReplyLists(Paginator(comment.commentReplys, 1, perpage));
  };

  function Paginator(items, page, per_page) {
    var page = page || 1,
      per_page = per_page || 10,
      offset = (page - 1) * per_page,
      paginatedItems = items.slice(offset).slice(0, per_page),
      total_pages = Math.ceil(items.length / per_page);
    return {
      page: page,
      per_page: per_page,
      pre_page: page - 1 ? page - 1 : null,
      next_page: total_pages > page ? page + 1 : null,
      total: items.length,
      total_pages: total_pages,
      data: paginatedItems,
    };
  }
  /******************* 
  @purpose : Set Image Preference
  @Author : INIC
  ******************/

  const imagePreference = commentPreferenceHandler(
    comment?.userDetails,
    comment?.userId
  );
  const handleEmoji = (e, commentRef) => {
    const cursor = commentRef.current.selectionStart;
    const text =
      startReply.slice(0, cursor) + e.native + startReply.slice(cursor);
    if (text.length <= 3000) {
      setStartReply(text);
      setError({
        error: false,
        length: text.length,
      });
    } else {
      setStartReply(text);
      setError({
        error: true,
        length: text.length,
      });
    }

    setStartReply(text);
  };
  const firstName =
    comment?.instituteDetails !== null
      ? comment?.instituteDetails?.name?.split(" ", 1)[0]
      : comment?.companyDetails !== null
      ? comment?.companyDetails?.companyName
      : comment?.userDetails?.firstName;
  const lastName =
    comment?.instituteDetails !== null
      ? comment?.instituteDetails?.name?.split(" ", 2)[1]
      : comment?.companyDetails !== null
      ? ""
      : comment?.userDetails?.lastName;

  const profileRoute =
    comment?.instituteDetails !== null
      ? "/profile/institute-profile?instituteId=" +
        comment?.instituteDetails?.id +
        "&name=" +
        firstName +
        "+" +
        lastName +
        "&userId=" +
        currentUserInfo.id
      : comment?.companyDetails !== null
      ? "/profile/company-profile?companyId=" +
        comment?.companyDetails?.id +
        "&name=" +
        firstName +
        "+" +
        lastName +
        "&userId=" +
        currentUserInfo.id
      : `/profile/${comment?.userDetails?.profileId}`;
  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/

  return (
    <div className="d-flex px-3 pb-3" key={comment.id}>
      <div className="mr-2 rounded-pill overflow-hidden flex-shrink-0 border border-geyser w-h-40">
        <Link route={profileRoute}>
          <a>
            <picture onContextMenu={(e) => e.preventDefault()}>
              <source
                srcSet={
                  imagePreference
                    ? comment.userDetails?.profilePicURL || ""
                    : comment?.companyDetails !== null
                    ? comment?.companyDetails?.logo
                    : comment?.instituteDetails !== null
                    ? comment?.instituteDetails?.logo
                    : ""
                }
                type=""
              />
              <img
                src={
                  imagePreference
                    ? comment.userDetails?.profilePicURL || ""
                    : comment?.companyDetails !== null
                    ? comment?.companyDetails?.logo
                    : comment?.instituteDetails !== null
                    ? comment?.instituteDetails?.logo
                    : ""
                }
                onError={(e) => {
                  onImageError(
                    e,
                    "profile",
                    `${firstName} ${
                      lastNameHandler(comment?.userDetails, comment?.userId)
                        ? lastName
                        : ""
                    }`
                  );
                }}
                width="40"
                height="40"
                className="img-fluid h-40"
              />
            </picture>
          </a>
        </Link>
      </div>
      <div className="w-100">
        <div className="mb-0">
          <div className="bg-doctor rounded p-2">
            <div className="d-flex justify-content-between">
              <div>
                <Link route={profileRoute}>
                  <a>
                    <Card.Title className="cursor-pointer font-14 font-600 text-secondary mb-1">
                      <h5 className="font-14 mb-0">
                        {firstName}{" "}
                        {lastNameHandler(comment?.userDetails, comment?.userId)
                          ? lastName
                          : ""}
                      </h5>
                    </Card.Title>
                  </a>
                </Link>
                <Card.Text className="font-12 mb-2 text-gray-darker break-word">
                  {comment.userDetails !== null
                    ? comment.userDetails.currentPosition
                    : ""}
                </Card.Text>
              </div>
              {currentUserInfo?.id === comment.userId && (
                <Dropdown className="theme-dropdown pl-3 d-flex  align-items-center">
                  <Dropdown.Toggle>
                    <em className="icon icon-ellipsis-h font-24 text-gray-darker"></em>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-inner-left ml-3">
                    <Dropdown.Item
                      onClick={(e) => handleDeleteComments(e, comment)}
                      className="d-flex align-items-center"
                    >
                      <em className="icon icon-delete-line reaction-icons pr-2 font-24"></em>
                      <span>
                        {lang("DASHBOARD.POSTS.COMMENT.DELETE_COMMENT")}
                      </span>
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={(e) => handleEditComments(e, comment)}
                      className="d-flex align-items-center"
                    >
                      <em className="icon icon-write reaction-icons pr-2 font-20"></em>
                      <span>
                        {lang("DASHBOARD.POSTS.COMMENT.EDIT_COMMENT")}
                      </span>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
            <Card.Text className="font-14 font-600 text-secondary mb-1">
              {ReactHtmlParser(
                urlify(comment.title)?.replaceAll("\n", "<br />")
              )}
              {comment.imageURL !== null && (
                <div className="comment-posted-img">
                  <img src={comment.imageURL} className="img-fluid" />
                </div>
              )}
            </Card.Text>
          </div>
          <div className="mb-4 reaction-icons-sections icons-reply-box pt-2 d-flex justify-content-start">
            <div className="rection-outer-box d-flex align-items-center">
              <div className="reaction-icons-box hover-likes-reactions p-0 d-flex">
                <div
                  title=""
                  className="d-xl-flex align-items-center justify-content-center"
                >
                  {/* Reaction Comment Post Section */}
                  <Reactions
                    eventType={eventTypeComment}
                    handleClickEvent={handleLikeComments}
                    counter={true}
                    totalCount={comment.reactionCount}
                  />
                </div>
              </div>
            </div>
            <div className="rection-outer-box d-flex align-items-center">
              <div className="reaction-icons-box hover-likes-reactions p-0 align-items-center d-flex">
                <div
                  title=""
                  className="d-xl-flex icons-reply-box align-items-center justify-content-center "
                >
                  <h5
                    className="font-12 ml-1 mt-0 text-gary reaction-icon-text"
                    onClick={(e) => handleOpenReplyPage(e)}
                  >
                    {lang("DASHBOARD.POSTS.COMMENT.REPLY_COMMENT")}
                  </h5>
                </div>
              </div>
              <p className="font-12 mb-0 text-gary reaction-icon-text pl-2">
                {comment?.commentReplys?.length}
              </p>
            </div>
          </div>

          {commentReplyLists?.data?.map((replyComment, index) => (
            <Fragment key={replyComment.id}>
              <ReplyComment
                currentUserInfo={currentUserInfo}
                commentReplyListAPiCall={commentListApiCall}
                replyComment={replyComment}
                index={index}
                postId={postId}
                handleEditReplyComments={handleEditReplyComments}
                userInfo={userInfo}
              />
            </Fragment>
          ))}
          {isDisplayReplyPage ? (
            <CommentInput
              reply={true}
              currentUserInfo={currentUserInfo}
              setStartComments={setStartReply}
              startComments={startReply}
              handleMakeComments={handleMakeReply}
              handlePostComments={ReplyPost}
              addEmoji={addEmoji}
              setAddEmoji={setAddEmoji}
              handleEmoji={handleEmoji}
              error={error}
              isButtonDisabled={isButtonDisabled}
              commentRef={commentRef}
              setMentions={setMentions}
              setTags={setTags}
              setCommentImage={setCommentReplyImage}
              commentImage={commentReplyImage}
              isEditCmnts={isEditReplyCmnts}
            />
          ) : null}
          {commentReplyLists?.total !== commentReplyLists?.data?.length && (
            <div className="mt-2 mb-3 text-center">
              <a onClick={loadPreviousReply}>
                <span
                  className="font-weight-bold"
                  style={{
                    fontsize: "bold",
                    color: "#0f6bbf",
                    fontSize: 14,
                  }}
                >
                  {lang("DASHBOARD.POSTS.COMMENT.LOAD_PREVIOUS_REPLY")}
                </span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleComment;
