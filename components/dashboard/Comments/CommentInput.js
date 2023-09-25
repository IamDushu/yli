import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { onImageError } from "utils";
import { useTranslation } from "react-i18next";
import Picker from "@emoji-mart/react";
import { Mention, MentionsInput } from "react-mentions";
import { tagFunctionality, tagSearch, uploadPostImage } from "store/actions";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import reactMentionsStyle from "../../modal/add-your-post/react-mention-style";

const CommentInput = ({
  currentUserInfo,
  startComments,
  handleMakeComments,
  handlePostComments,
  reply,
  addEmoji,
  setAddEmoji,
  handleEmoji,
  error,
  isButtonDisabled,
  commentRef,
  setMentions,
  setTags,
  commentImage,
  setCommentImage,
  isEditCmnts,
}) => {
  const router = useRouter();
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  let postDescription = startComments;
  if (postDescription.includes("#")) {
    postDescription = postDescription
      .split('<a href="/search-result')
      .join("$$$$__");
  }

  const descriptionTag = postDescription.includes("~+~")
    ? postDescription.split("~+~")[0] + "$$$~~~"
    : postDescription;
  postDescription = descriptionTag.split('<a href="/profile/').join("$$$__");
  postDescription = postDescription.split(`">`).join("~~~__");
  postDescription = postDescription.split("</a>").join("$$$~~~");

  const fetchUsers = async (query, callback) => {
    const body = {
      page: 1,
      pagesize: 5,
      searchText: query,
    };
    if (query) {
      const res = await dispatch(tagSearch(body))
        .then((res) =>
          res && res?.data && res?.data?.length > 0
            ? res.data.map((user) => ({ display: user.title, id: user.title }))
            : [{ display: `#${query}`, id: `#${query}` }]
        )
        .then(callback);
    }
  };
  const fetchTagUsers = async (query, callback) => {
    const body = {
      page: 1,
      pagesize: 5,
      searchText: query,
    };
    if (query) {
      await dispatch(tagFunctionality(body))
        .then((res) =>
          res.data.map((user) => ({
            display: user.name + "~+~" + user.avatar,
            id: user.userId,
          }))
        )
        .then(callback);
    }
  };
  const commentImageHandler = async (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const videoData = new FormData();
      videoData.append("file", event.target.files[0]);
      const res = await dispatch(uploadPostImage(videoData));
      setCommentImage(res?.fileUrl);
    }
  };
  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  return (
    <div className="d-flex my-3  px-2">
      <div
        className="mr-2 rounded-pill overflow-hidden flex-shrink-0 border border-geyser w-h-40"
        onClick={() => router.push(`/profile/${currentUserInfo.profileId}`)}
      >
        <picture onContextMenu={(e) => e.preventDefault()}>
          <source srcSet={currentUserInfo.profilePicURL} type="image/jpg" />
          <img
            src={currentUserInfo.profilePicURL || ""}
            onError={(e) => {
              onImageError(
                e,
                "profile",
                `${currentUserInfo.firstName} ${currentUserInfo.lastName}`
              );
            }}
            width="40"
            height="40"
            className="img-fluid h-40 "
          />
        </picture>
      </div>
      <div className="w-100">
        <Form.Group controlId="" className="mb-0">
          <div className="position-relative comment-post-box">
            <MentionsInput
              allowSpaceInQuery={true}
              className="py-2 px-12 font-14 comment-post input-shadow form-control h1-magic  bg-paper-white rounded-8 comment-input"
              inputRef={commentRef}
              style={reactMentionsStyle}
              spellCheck="false"
              placeholder={lang("DASHBOARD.POSTS.COMMENT.INPUT_PLACEHOLDER")}
              value={postDescription}
              onChange={(event, newValue, newPlainTextValue, mentions) => {
                if (postDescription.includes("#")) {
                  setTags(
                    mentions?.map((mention) => mention?.id?.replace("#", ""))
                  );
                } else {
                  setMentions(mentions?.map((mention) => mention?.id));
                }

                handleMakeComments(event);
              }}
            >
              <Mention
                trigger="@"
                data={fetchTagUsers}
                markup="$$$____id__~~~____display__$$$~~~"
                style={{
                  backgroundColor: "#daf4fa",
                }}
                renderSuggestion={(suggestion) => (
                  <div className="d-flex mt-2">
                    <img
                      className="user-profile-pic rounded-pill "
                      src={
                        loaded
                          ? suggestion.display.split("~+~")[1]
                          : "/assets/images/user-no-img.jpg"
                      }
                      onError={(e) =>
                        onImageError(
                          e,
                          "profile",
                          suggestion.display.split("~+~")[0]
                        )
                      }
                      onLoad={() => {
                        setLoaded(true);
                      }}
                      height={50}
                      width={50}
                    />
                    <div className="d-flex pl-2 pt-3">
                      {suggestion.display.split("~+~")[0]}
                    </div>
                  </div>
                )}
              />
              <Mention
                trigger="#"
                data={fetchUsers}
                markup="$$$$____id__~~~____display__$$$~~~"
                style={{
                  backgroundColor: "#daf4fa",
                }}
              />
            </MentionsInput>

            {commentImage !== null && commentImage?.length > 0 && (
              <div className="uploaded-image-preview">
                <div className="uploaded-img">
                  <em
                    className="bx custom-bx bx-x pointer close-icon"
                    onClick={() => setCommentImage(null)}
                  ></em>
                  <img src={commentImage} className="img-fluid" />
                </div>
              </div>
            )}
            <div className="comment-emojy pointer">
              <i
                onClick={() => setAddEmoji(!addEmoji)}
                className="bx bx-smile text-gray-darker"
              ></i>
              {commentImage === null && (
                <label className="upload-image-comment">
                  <input
                    type="file"
                    className="d-none"
                    onChange={(e) => commentImageHandler(e)}
                  />
                  <em className="icon icon-gallery-gray-darker font-18 pl-2 pointer"></em>
                </label>
              )}
            </div>
            <div className="emoji-mart">
              {addEmoji && (
                <Picker
                  onEmojiSelect={(e) => handleEmoji(e, commentRef)}
                  onClickOutside={() => setAddEmoji(false)}
                  theme="light"
                  previewPosition="none"
                />
              )}
            </div>

            {error && (
              <p className="text-right d-flex align-items-center mb-0">
                {error.error && (
                  <span className="text-danger font-14">
                    {`${lang("DASHBOARD.POSTS.COMMENT.MAX_CHAR_3000")} `}
                  </span>
                )}
                <span
                  className={
                    error.length < 3000
                      ? "text-muted ml-auto font-14"
                      : error.length > 3000
                        ? "text-danger ml-auto font-14"
                        : "text-muted ml-auto font-14"
                  }
                >
                  {error.length}/
                </span>
                <span className="text-success">3000</span>
              </p>
            )}
            {(commentImage !== null && commentImage?.length > 0) ||
              startComments?.length > 0 ? (
              <Button
                className="button-post mt-2 btn-sm btn-primary py-1 px-3"
                onClick={handlePostComments}
                disabled={isButtonDisabled || error.error}
              >
                {reply === true
                  ? lang("DASHBOARD.POSTS.COMMENT.REPLY_COMMENT")
                  : lang("DASHBOARD.POSTS.COMMENT.POST_COMMENT")}
              </Button>
            ) : null}
          </div>
        </Form.Group>
      </div>
    </div>
  );
};

export default CommentInput;
