import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleComment from "./SingleComment";
import CommentInput from "./CommentInput";
import { commentList, commentPost, setCommentData } from "store/actions";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { getSearchResults } from "store/actions/search-result";
import SingleCommentActivity from "./SingleCommentActivity";
const Comment = ({
  id,
  currentUserInfo,
  postDetails,
  commentRef,
  searchText,
  commentCount,
  activityType,
  commentId,
}) => {
  const { commentLists, commentData } = useSelector((state) => state.post);
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const router = useRouter();
  const { instituteId } = router.query;
  /******************** 
@purpose : Used for useState
@Parameter : { data, dispatch }
@Author : INIC
******************/
  const [startComments, setStartComments] = useState("");
  const [commentImage, setCommentImage] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isEditCmnts, setIsEditCmnts] = useState(false);
  const [editComentsId, setEditComentsId] = useState("");
  const [addEmoji, setAddEmoji] = useState(false);
  const [mentions, setMentions] = useState([]);
  const [tags, setTags] = useState([]);
  const [error, setError] = useState({ error: false, length: 0 });
  const [commentListBody, setCommentListBody] = useState({
    page: 1,
    pagesize: 3,
    postId: id,
    commentCount,
  });
  useEffect(() => {
    if (startComments.trim() || commentImage !== null) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [startComments, commentImage]);

  const handleMakeComments = (e) => {
    // e.preventDefault();
    if (e.target.value.length <= 3000) {
      setStartComments(e.target.value);
      setError({
        error: false,
        length: e.target.value.length,
      });
    } else {
      setStartComments(e.target.value);
      setError({
        error: true,
        length: e.target.value.length,
      });
    }
  };

  /******************** 
@purpose : Used for useEffect
@Parameter : { data, dispatch }
@Author : INIC
******************/
  useEffect(() => {
    if (commentListBody?.commentCount > 0) {
      commentListApiCall();
    }
  }, [commentListBody]);

  useEffect(() => {
    if (commentLists?.rows !== undefined) {
      let data = { ...commentData };
      data[id] = commentLists.rows;
      dispatch(setCommentData(data));
    }
  }, [commentLists]);
  /******************** 
@purpose : Used for comment list api call 
@Parameter : { data, dispatch }
@Author : INIC
******************/
  const commentListApiCall = () => {
    setTimeout(() => {
      dispatch(commentList(commentListBody));
    }, 600);
  };

  /******************** 
@purpose : Global search comment handler
@Parameter : { data, dispatch }
@Author : INIC
******************/
  const globalSearchCallback = () => {
    dispatch(getSearchResults({ page: 1, pagesize: 10, searchText }));
    commentListApiCall();
    setIsEditCmnts(false);
    setStartComments("");
  };
  /******************** 
@purpose : Used for Edit comment
@Parameter : { data, dispatch }
@Author : INIC
******************/
  const handleEditComments = (e, cmntData) => {
    let description1 = cmntData.title;
    if(description1 && description1.includes("#")){
      description1 = description1.split("$$$$__").join('<a href="/search-result');
    }
    const descriptionTagAdd = description1.includes("~+~")
    ? description1.split("~+~")[0] + "$$$~~~"
    : description1;
    description1 = descriptionTagAdd.split("$$$__").join('<a href="/profile/');
    description1 = description1.split("~~~__").join(`">`);
    description1 = description1.split("$$$~~~").join("</a>");
    
    setIsEditCmnts(true);
    setEditComentsId(cmntData.id);
    setStartComments(description1);
    setCommentImage(cmntData.imageURL);
    setError({ error: false, length: cmntData.title.length });
  };
  /******************** 
@purpose : Used for post comment
@Parameter : { data, dispatch }
@Author : INIC
******************/
  const handlePostComments = async () => {
    setIsButtonDisabled(true);
    let description = startComments;
    if(description && description.includes("#")){
      description = description.split("$$$$__").join('<a href="/search-result');
    }
    const descriptionTagAdd = description.includes("~+~")
    ? description.split("~+~")[0] + "$$$~~~"
    : description;
    description = descriptionTagAdd.split("$$$__").join('<a href="/profile/');
    description = description.split("~~~__").join(`">`);
    description = description.split("$$$~~~").join("</a>");
    if (isEditCmnts) {
      await dispatch(
        commentPost(
          {
            id: editComentsId,
            postId: id,
            title: description,
            // commented (instituteId) since RTF FRONT 
            // instituteId,
            imageURL: commentImage,
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
      setCommentImage(null);
      commentListApiCall();
      setIsEditCmnts(false);
      setStartComments("");
    } else {
      await dispatch(
        commentPost(
          {
            postId: id,
            title: description,
            // commented (instituteId) since RTF FRONT 
            // instituteId,
            imageURL: commentImage,
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
      commentListApiCall();
      setCommentImage(null);
      setIsEditCmnts(false);
      setStartComments("");
    }
  };
  const handleEmoji = (e, commentRef) => {
    const cursor = commentRef.current.selectionStart;
    const text =
      startComments.slice(0, cursor) + e.native + startComments.slice(cursor);
    if (text.length <= 3000) {
      setStartComments(text);
      setError({
        error: false,
        length: text.length,
      });
    } else {
      setStartComments(text);
      setError({
        error: true,
        length: text.length,
      });
    }

    setStartComments(text);
  };

  const loadMoreComment = () => {
    setCommentListBody({
      ...commentListBody,
      pagesize: commentListBody.pagesize + 10,
    });
  };
  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  return (
    <Fragment>
      <CommentInput
        currentUserInfo={currentUserInfo}
        setStartComments={setStartComments}
        startComments={startComments}
        handleMakeComments={handleMakeComments}
        handlePostComments={handlePostComments}
        addEmoji={addEmoji}
        setAddEmoji={setAddEmoji}
        handleEmoji={handleEmoji}
        error={error}
        isButtonDisabled={isButtonDisabled}
        commentRef={commentRef}
        setMentions={setMentions}
        setTags={setTags}
        setCommentImage={setCommentImage}
        commentImage={commentImage}
        isEditCmnts={isEditCmnts}
      />

      {activityType !== "comment" &&
      activityType !== "commentReply" &&
      activityType !== "commentLike" ? (
        <>
          {commentData &&
            commentData?.[id]?.map((comment, index) => (
              <Fragment key={comment.id}>
                <SingleComment
                  postId={id}
                  currentUserInfo={currentUserInfo}
                  comment={comment}
                  index={index}
                  postDetails={postDetails}
                  commentListApiCall={commentListApiCall}
                  handleEditComments={handleEditComments}
                  commentRef={commentRef}
                  searchText={searchText}
                  router={router}
                />
              </Fragment>
            ))}
        </>
      ) : (
        <>
          {commentData &&
            commentData?.[id]?.map((comment, index) => (
              <Fragment key={comment.id}>
                <SingleCommentActivity
                  postId={id}
                  currentUserInfo={currentUserInfo}
                  comment={comment}
                  commentId={commentId}
                  activityType
                  index={index}
                  postDetails={postDetails}
                  commentListApiCall={commentListApiCall}
                  handleEditComments={handleEditComments}
                  commentRef={commentRef}
                  searchText={searchText}
                  router={router}
                />
              </Fragment>
            ))}
        </>
      )}
      {commentLists?.rows?.length !== commentLists.count && (
        <div className="text-center mb-3">
          <a onClick={loadMoreComment}>
            <span
              className="font-weight-bold"
              style={{ fontsize: "bold", color: "#0f6bbf", fontSize: 14 }}
            >
              {lang("DASHBOARD.POSTS.COMMENT.LOAD_MORE_COMMENT")}
            </span>
          </a>
        </div>
      )}
    </Fragment>
  );
};

export default Comment;
