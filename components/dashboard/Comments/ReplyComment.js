import { USER_REPLY_DELETE } from "api/routes";
import { USER_API_URL } from "config";
import React, { useState, useEffect } from "react";
import { Form, Card, Dropdown, Button } from "react-bootstrap";
import Reactions from "../Posts/Reactions";
import store from "store";
import { useDispatch } from "react-redux";
import {
  LikeReplyCommentPost,
  UPDATE_REPLY_COMMENT_COUNT,
} from "store/actions";
import { onImageError, urlify } from "utils";
import { Link } from "@routes";
import { useTranslation } from "react-i18next";
import ReactHtmlParser from "react-html-parser";
const ReplyComment = ({
  replyComment,
  index,
  postId,
  handleEditReplyComments,
  commentReplyListAPiCall,
  currentUserInfo,
  userInfo,
}) => {
  const dispatch = useDispatch();
  const [lang] = useTranslation("language");
  /******************** 
@purpose : Used for use States
@Parameter : { e, event }
@Author : INIC
******************/
  const [eventTypeReplyComment, setEventTypeReplyComment] = useState(null);
  const [, setCounterLiked] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [replyCommentLikeId, setReplyCommentLikeId] = useState();

  /******************** 
@purpose : Used for useEffect
@Parameter : {}
@Author : INIC
******************/
  useEffect(() => {
    commentReplyLikes();
  }, [eventTypeReplyComment]);

  useEffect(() => {
    replyComment?.commentReplyLikes?.forEach((element) => {
      if (element.userId === currentUserInfo?.id) {
        setEventTypeReplyComment(element.type);
        setReplyCommentLikeId(element.id);
      }
    });
  }, []);
  /******************** 
@purpose : Used for  handle like reply comment
@Parameter : { e, event }
@Author : INIC
******************/
  const handleCommentReplyLike = async (e, event) => {
    e.preventDefault();
    setEventTypeReplyComment(event);
    setIsloading(true);
  };
  /******************** 
@purpose : Used for like reply comment
@Parameter : { e, event }
@Author : INIC
******************/
  const commentReplyLikes = async () => {
    const id = replyCommentLikeId;
    if (isLoading) {
      const body = {
        id,
        userId: currentUserInfo.id,
        commentReplyId: replyComment.id,
        type: eventTypeReplyComment,
      };

      await dispatch(LikeReplyCommentPost(body));
      setCounterLiked(true);
      commentReplyListAPiCall();
    }
  };

  /******************** 
@purpose : Used for delete reply 
@Parameter : { e, event }
@Author : INIC
******************/
  const handleDeleteReply = (e, delrplysc) => {
    const requestData = new URLSearchParams();
    requestData.append("id", delrplysc?.id);

    fetch(`${USER_API_URL}/${USER_REPLY_DELETE}`, {
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
        dispatch({
          type: UPDATE_REPLY_COMMENT_COUNT,
          data: { type: "delete", postId: postId },
        });
        commentReplyListAPiCall();
      });
  };

  /******************* 
  @purpose : Set Image Preference
  @Author : INIC
  ******************/
  const replyCommentImagePreference = (userDetails, userId) => {
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
            Object.keys(userDetails?.growthConnectionData).length > 0 &&
            userDetails?.profilePicShowData?.myGrowthConnection) ||
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

  const imagePreference = replyCommentImagePreference(
    replyComment?.userDetails,
    replyComment?.userId
  );
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
            Object.keys(userDetails?.growthConnectionData).length > 0 &&
            userDetails?.lastNameVisibility?.settings?.myGrowthConnection) ||
          (userDetails?.followData &&
            userDetails?.followData[0]?.isFollow &&
            userDetails?.lastNameVisibility?.settings?.followers)))
    ) {
      return true;
    }
  };
  const firstName =
    replyComment?.instituteDetails !== null
      ? replyComment?.instituteDetails?.name?.split(" ", 1)[0]
      : replyComment?.companyDetails !== null
      ? replyComment?.companyDetails?.companyName
      : replyComment?.userDetails?.firstName;
  const lastName =
    replyComment?.instituteDetails !== null
      ? replyComment?.instituteDetails?.name?.split(" ", 2)[1]
      : replyComment?.companyDetails !== null
      ? ""
      : replyComment?.userDetails?.lastName;

  const profileRoute =
    replyComment?.instituteDetails !== null
      ? "/profile/institute-profile?instituteId=" +
        replyComment?.instituteDetails?.id +
        "&name=" +
        firstName +
        "+" +
        lastName +
        "&userId=" +
        currentUserInfo.id
      : replyComment?.companyDetails !== null
      ? "/profile/company-profile?companyId=" +
        replyComment?.companyDetails?.id +
        "&name=" +
        firstName +
        "+" +
        lastName +
        "&userId=" +
        currentUserInfo.id
      : `/profile/${replyComment?.userDetails?.profileId}`;
  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  return (
    <div className="d-flex  mt-2" key={replyComment.id}>
      <div className="mr-2 rounded-pill overflow-hidden flex-shrink-0 border border-geyser w-h-40">
        <div>
          <Link route={profileRoute}>
            <a>
              <picture onContextMenu={(e) => e.preventDefault()}>
                <source
                  srcSet={
                    imagePreference
                      ? replyComment.userDetails?.profilePicURL || ""
                      : replyComment?.instituteDetails !== null
                      ? replyComment?.instituteDetails?.logo
                      : replyComment?.companyDetails !== null
                      ? replyComment?.companyDetails?.logo
                      : ""
                  }
                  type="image/jpg"
                />
                <img
                  src={
                    imagePreference
                      ? replyComment.userDetails?.profilePicURL || ""
                      : replyComment?.instituteDetails !== null
                      ? replyComment?.instituteDetails?.logo
                      : replyComment?.companyDetails !== null
                      ? replyComment?.companyDetails?.logo
                      : ""
                  }
                  onError={(e) => {
                    onImageError(
                      e,
                      "profile",
                      `${firstName} ${
                        lastNameHandler(
                          replyComment?.userDetails,
                          replyComment?.userId
                        )
                          ? lastName
                          : ""
                      }`
                    );
                  }}
                  width="40"
                  height="40"
                  className="img-fluid h-40 "
                />
              </picture>
            </a>
          </Link>
        </div>
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
                        {lastNameHandler(
                          replyComment?.userDetails,
                          replyComment?.userId
                        )
                          ? lastName
                          : ""}
                      </h5>
                    </Card.Title>
                  </a>
                </Link>
                <Card.Text className="font-12 mb-1 text-gray-darker break-word">
                  {replyComment.userDetails !== null
                    ? replyComment.userDetails.currentPosition
                    : ""}
                </Card.Text>
              </div>
              {currentUserInfo?.id === replyComment.userId && (
                <Dropdown className="theme-dropdown pl-3 d-flex align-items-center">
                  <Dropdown.Toggle>
                    <em className="icon icon-ellipsis-h font-24 text-gray-darker"></em>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="dropdown-inner-left ml-3 ">
                    <Dropdown.Item
                      onClick={(e) => handleEditReplyComments(e, replyComment)}
                      className="sdfd-flex align-items-center"
                    >
                      <em className="icon icon-write reaction-icons pr-2 font-20"></em>
                      <span>{lang("DASHBOARD.POSTS.COMMENT.EDIT_REPLY")}</span>
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={(e) => handleDeleteReply(e, replyComment)}
                      className="d-flex align-items-center"
                    >
                      <em className="icon icon-delete-line reaction-icons pr-2 font-24"></em>
                      <span>
                        {lang("DASHBOARD.POSTS.COMMENT.DELETE_REPLY")}
                      </span>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
            <Card.Text className="font-14 font-600 text-gary mb-1">
              {ReactHtmlParser(
                urlify(replyComment.title)?.replaceAll("\n", "<br />")
              )}
              {replyComment.imageURL !== null && (
                <img src={replyComment.imageURL} />
              )}
            </Card.Text>
          </div>
          <div className="reaction-icons-sections icons-reply-box pt-2 d-flex justify-content-start">
            <div className="rection-outer-box d-flex align-items-center px-0">
              <Reactions
                eventType={eventTypeReplyComment}
                handleClickEvent={handleCommentReplyLike}
                counter={true}
                totalCount={replyComment.reactionCount}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplyComment;
