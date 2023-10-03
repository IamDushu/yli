import React, { useRef } from "react";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import Picker from "@emoji-mart/react";
import { tagFunctionality, tagSearch, uploadPostImage } from "store/actions";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AddReactionOutlinedIcon from "@mui/icons-material/AddReactionOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import YliwayMention from "components/yliway-mention";
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
  const inputFileRef = useRef();
  const router = useRouter();
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();

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
    <Stack direction={"row"} my={2} px={3} gap={2}>
      <Avatar
        sx={{ width: 56, height: 56 }}
        src={currentUserInfo.profilePicURL || ""}
      >
        {currentUserInfo.firstName} {currentUserInfo.lastName}
      </Avatar>

      <Box width={"100%"} position={"relative"}>
        <YliwayMention
          multiline
          allowSpaceInQuery={true}
          inputRef={commentRef}
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
          trigger="@"
          data={fetchTagUsers}
          helperText={
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Typography
                component={"span"}
                color={"#79767A"}
                fontSize={"11px"}
                fontWeight={500}
                lineHeight={"16px"}
              >
                {error.error ? (
                  <span className="text-danger font-14">
                    {`${lang("DASHBOARD.POSTS.COMMENT.MAX_CHAR_3000")} `}
                  </span>
                ) : (
                  "Press enter to post"
                )}
              </Typography>

              <div>
                <Typography
                  component={"span"}
                  color={"#79767A"}
                  fontSize={"11px"}
                  fontWeight={500}
                  lineHeight={"16px"}
                >
                  {error.length}/
                </Typography>
                <Typography
                  component={"span"}
                  color={"#79767A"}
                  fontSize={"11px"}
                  fontWeight={500}
                  lineHeight={"16px"}
                >
                  3000
                </Typography>
              </div>
            </Stack>
          }
          markup="$$$____id__~~~____display__$$$~~~"
          renderSuggestion={(suggestion) => (
            <Stack direction={"row"} alignItems={"center"} gap={2}>
              <Avatar
                src={
                  suggestion.display.split("~+~")[1] ||
                  "/assets/images/user-no-img.jpg"
                }
                height={50}
                width={50}
              ></Avatar>
              <Typography variant="body2">
                {suggestion.display.split("~+~")[0]}
              </Typography>
            </Stack>
          )}
        />

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

        <Stack
          direction={"row"}
          gap={0}
          position={"absolute"}
          right={16}
          top={10}
        >
          <IconButton size="small" onClick={() => setAddEmoji(!addEmoji)}>
            <AddReactionOutlinedIcon />
          </IconButton>
          {!commentImage && (
            <>
              <IconButton
                size="small"
                onClick={() => inputFileRef.current.click()}
              >
                <AddPhotoAlternateOutlinedIcon />
              </IconButton>

              <input
                ref={inputFileRef}
                type="file"
                hidden
                onChange={(e) => commentImageHandler(e)}
              />
            </>
          )}
        </Stack>
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

        {(commentImage !== null && commentImage?.length > 0) ||
        startComments?.length > 0 ? (
          <Stack direction={"row"} justifyContent={"flex-end"} mt={2}>
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: "100px" }}
              onClick={handlePostComments}
              disabled={isButtonDisabled || error.error}
            >
              {reply === true
                ? lang("DASHBOARD.POSTS.COMMENT.REPLY_COMMENT")
                : lang("DASHBOARD.POSTS.COMMENT.POST_COMMENT")}
            </Button>
          </Stack>
        ) : null}
      </Box>
    </Stack>
  );
};

export default CommentInput;
