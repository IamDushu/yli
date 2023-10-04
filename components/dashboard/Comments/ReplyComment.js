import { USER_REPLY_DELETE } from "api/routes";
import { USER_API_URL } from "config";
import React, { useState, useEffect } from "react";

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
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import CommentMenu from "./CommentMenu";
import ProfileCard from "./profile-card";
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
    <Box ml={2} mt={2}>
      <Stack direction={"row"} gap={2}>
        <Link route={profileRoute}>
          <a>
            <Avatar
              sx={{ width: 56, height: 56 }}
              src={
                imagePreference
                  ? replyComment.userDetails?.profilePicURL || ""
                  : replyComment?.instituteDetails !== null
                  ? replyComment?.instituteDetails?.logo
                  : replyComment?.companyDetails !== null
                  ? replyComment?.companyDetails?.logo
                  : ""
              }
            />
          </a>
        </Link>

        <Card
          sx={{
            width: "100%",
            bgcolor: "#ECE7EB",
            borderRadius: "3px",
            px: "20px",
            py: "10px",
          }}
          elevation={0}
        >
          <CardHeader
            sx={{ p: 0 }}
            title={
              <ProfileCard
                profileRoute={profileRoute}
                src={
                  imagePreference
                    ? replyComment.userDetails?.profilePicURL || ""
                    : replyComment?.instituteDetails !== null
                    ? replyComment?.instituteDetails?.logo
                    : replyComment?.companyDetails !== null
                    ? replyComment?.companyDetails?.logo
                    : ""
                }
                firstName={firstName}
                lastName={
                  lastNameHandler(
                    replyComment?.userDetails,
                    replyComment?.userId
                  )
                    ? lastName
                    : ""
                }
                currentPosition={
                  replyComment.userDetails !== null
                    ? replyComment.userDetails.currentPosition
                    : ""
                }
              />
            }
            subheader={
              <Typography
                color={"#49454E"}
                lineHeight={"20px"}
                fontWeight={400}
                fontSize={"14px"}
              >
                {replyComment.userDetails !== null
                  ? replyComment.userDetails.currentPosition
                  : ""}
              </Typography>
            }
            action={
              currentUserInfo?.id === replyComment.userId && (
                <CommentMenu
                  editLabel={lang("DASHBOARD.POSTS.COMMENT.EDIT_REPLY")}
                  deleteLabel={lang("DASHBOARD.POSTS.COMMENT.DELETE_REPLY")}
                  handleDelete={(e) => handleDeleteReply(e, replyComment)}
                  handleEdit={(e) => handleEditReplyComments(e, replyComment)}
                />
              )
            }
          />

          <CardContent sx={{ p: 0, mt: 1 }}>
            <Typography
              color={"#49454E"}
              lineHeight={"20px"}
              fontWeight={400}
              fontSize={"14px"}
            >
              {ReactHtmlParser(
                urlify(replyComment.title)?.replaceAll("\n", "<br />")
              )}
              {replyComment.imageURL !== null && (
                <img src={replyComment.imageURL} />
              )}
            </Typography>
          </CardContent>

          <CardActions sx={{ px: 0, pb: 0 }}>
            <Button>{lang("DASHBOARD.POSTS.POST_FOOTER.LIKE")}</Button>
            <Button>Reply</Button>
            <Typography
              fontSize={"11px"}
              lineHeight={"16px"}
              fontWeight={500}
              color={"#79767A"}
              flex={1}
              display={"flex"}
              justifyContent={"flex-end"}
            >
              3h
            </Typography>
          </CardActions>
          {/* <Reactions
              eventType={eventTypeReplyComment}
              handleClickEvent={handleCommentReplyLike}
              counter={true}
              totalCount={replyComment.reactionCount}
            />
          </CardActions> */}
        </Card>
        {/* 
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
                        onClick={(e) =>
                          handleEditReplyComments(e, replyComment)
                        }
                        className="sdfd-flex align-items-center"
                      >
                        <em className="icon icon-write reaction-icons pr-2 font-20"></em>
                        <span>
                          {lang("DASHBOARD.POSTS.COMMENT.EDIT_REPLY")}
                        </span>
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
        </div> */}
      </Stack>
    </Box>
  );
};

export default ReplyComment;

// <div className="w-100">
// <div className="mb-0">
//   <div className="bg-doctor rounded p-2">
//     <div className="d-flex justify-content-between">
//       <div>
//         <Link route={profileRoute}>
//           <a>
//             <Card.Title className="cursor-pointer font-14 font-600 text-secondary mb-1">
//               <h5 className="font-14 mb-0">
//                 {firstName}{" "}
//                 {lastNameHandler(
//                   comment?.userDetails,
//                   comment?.userId
//                 )
//                   ? lastName
//                   : ""}
//               </h5>
//             </Card.Title>
//           </a>
//         </Link>
//         <Card.Text className="font-12 mb-2 text-gray-darker break-word">
//           {comment.userDetails !== null
//             ? comment.userDetails.currentPosition
//             : ""}
//         </Card.Text>
//       </div>
//       {currentUserInfo?.id === comment.userId && (
//         <Dropdown className="theme-dropdown pl-3 d-flex  align-items-center">
//           <Dropdown.Toggle>
//             <em className="icon icon-ellipsis-h font-24 text-gray-darker"></em>
//           </Dropdown.Toggle>
//           <Dropdown.Menu className="dropdown-inner-left ml-3">
//             <Dropdown.Item
//               onClick={(e) => handleDeleteComments(e, comment)}
//               className="d-flex align-items-center"
//             >
//               <em className="icon icon-delete-line reaction-icons pr-2 font-24"></em>
//               <span>
//                 {lang("DASHBOARD.POSTS.COMMENT.DELETE_COMMENT")}
//               </span>
//             </Dropdown.Item>
//             <Dropdown.Item
//               onClick={(e) => handleEditComments(e, comment)}
//               className="d-flex align-items-center"
//             >
//               <em className="icon icon-write reaction-icons pr-2 font-20"></em>
//               <span>
//                 {lang("DASHBOARD.POSTS.COMMENT.EDIT_COMMENT")}
//               </span>
//             </Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>
//       )}
//     </div>
//     <Card.Text className="font-14 font-600 text-secondary mb-1">
//       {ReactHtmlParser(
//         urlify(comment.title)?.replaceAll("\n", "<br />")
//       )}
//       {comment.imageURL !== null && (
//         <div className="comment-posted-img">
//           <img src={comment.imageURL} className="img-fluid" />
//         </div>
//       )}
//     </Card.Text>
//   </div>
//   <div className="mb-4 reaction-icons-sections icons-reply-box pt-2 d-flex justify-content-start">
//     <div className="rection-outer-box d-flex align-items-center">
//       <div className="reaction-icons-box hover-likes-reactions p-0 d-flex">
//         <div
//           title=""
//           className="d-xl-flex align-items-center justify-content-center"
//         >
//           {/* Reaction Comment Post Section */}
//           <Reactions
//             eventType={eventTypeComment}
//             handleClickEvent={handleLikeComments}
//             counter={true}
//             totalCount={comment.reactionCount}
//           />
//         </div>
//       </div>
//     </div>
//     <div className="rection-outer-box d-flex align-items-center">
//       <div className="reaction-icons-box hover-likes-reactions p-0 align-items-center d-flex">
//         <div
//           title=""
//           className="d-xl-flex icons-reply-box align-items-center justify-content-center "
//         >
//           <h5
//             className="font-12 ml-1 mt-0 text-gary reaction-icon-text"
//             onClick={(e) => handleOpenReplyPage(e)}
//           >
//             {lang("DASHBOARD.POSTS.COMMENT.REPLY_COMMENT")}
//           </h5>
//         </div>
//       </div>
//       <p className="font-12 mb-0 text-gary reaction-icon-text pl-2">
//         {comment?.commentReplys?.length}
//       </p>
//     </div>
//   </div>

//   {commentReplyLists?.data?.map((replyComment, index) => (
//     <Fragment key={replyComment.id}>
//       <ReplyComment
//         currentUserInfo={currentUserInfo}
//         commentReplyListAPiCall={commentListApiCall}
//         replyComment={replyComment}
//         index={index}
//         postId={postId}
//         handleEditReplyComments={handleEditReplyComments}
//         userInfo={userInfo}
//       />
//     </Fragment>
//   ))}
//   {isDisplayReplyPage ? (
//     <CommentInput
//       reply={true}
//       currentUserInfo={currentUserInfo}
//       setStartComments={setStartReply}
//       startComments={startReply}
//       handleMakeComments={handleMakeReply}
//       handlePostComments={ReplyPost}
//       addEmoji={addEmoji}
//       setAddEmoji={setAddEmoji}
//       handleEmoji={handleEmoji}
//       error={error}
//       isButtonDisabled={isButtonDisabled}
//       commentRef={commentRef}
//       setMentions={setMentions}
//       setTags={setTags}
//       setCommentImage={setCommentReplyImage}
//       commentImage={commentReplyImage}
//       isEditCmnts={isEditReplyCmnts}
//     />
//   ) : null}
//   {commentReplyLists?.total !== commentReplyLists?.data?.length && (
//     <div className="mt-2 mb-3 text-center">
//       <a onClick={loadPreviousReply}>
//         <span
//           className="font-weight-bold"
//           style={{
//             fontsize: "bold",
//             color: "#0f6bbf",
//             fontSize: 14,
//           }}
//         >
//           {lang("DASHBOARD.POSTS.COMMENT.LOAD_PREVIOUS_REPLY")}
//         </span>
//       </a>
//     </div>
//   )}
// </div>
// </div>
