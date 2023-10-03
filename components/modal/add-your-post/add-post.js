import { addPost } from "@actions";
import Picker from "@emoji-mart/react";
import { Link } from "@routes";
import { LinkPreviewGenerator } from "components/ui/link-preview";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dropdown, Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Mention, MentionsInput } from "react-mentions";
import { useDispatch, useSelector } from "react-redux";
import {
  detectURLs,
  getCookie,
  getKeyByValue,
  getValueByKey,
  onImageError,
  postTokenUnix,
  setCookie,
} from "utils";
import { YliwayButton } from "components/button";
import { CustomSelectWithRadio } from "components/add-post-ui/custom-select-comment-right";
import {
  clearAddPostData,
  createPoll,
  postListing,
  posttype,
  setPostImage,
  tagFunctionality,
  tagSearch,
  toggleModals,
} from "../../../store/actions";
import AddPostSelected from "./add-post-selected";
import reactMentionsStyle from "./react-mention-style";
import { AssistChips } from "components/assist-chips";
import { PostOwner } from "components/post-owner";
import { ARTICLE } from "routes/urls";
import { MentionUserUi } from "components/add-post-ui/mention-user-ui";

/*******************   
@purpose : User Add post
@Author : INIC
******************/
const AddPost = ({modelKey}) => {
  
  /******************* 
@purpose : Used for language translation
@Parameter : {}
@Author : INIC
******************/
  const [lang] = useTranslation("language");

  /****
   * @purpose : key-value pair for string translation manipulation
   *
   */
  const transManipObject = {
    "GC only": lang("DASHBOARD.ADD_POST.PRIVACY.GROWTH_CONNECTION_ONLY"),
    "Connections only": lang("DASHBOARD.ADD_POST.PRIVACY.CONNECTION_ONLY"),
    "No one": lang("DASHBOARD.ADD_POST.PRIVACY.NO_ONE"),
    Anyone: lang("DASHBOARD.ADD_POST.PRIVACY.ANYONE"),
  };

  /******************* 
@purpose : Used for useDispatch
@Parameter : {}
@Author : INIC
******************/
  const dispatch = useDispatch();

  /******************* 
@purpose : Used for useSelector
@Parameter : {}
@Author : INIC
******************/

  const { postGroupId } = useSelector((state) => state.post);
  const {
    postImage,
    postImageAlternativeText,
    imageTaggedUserData,
    postVideo,
    postDocument,
    postTypes,
    createPolls,
    createAnEvnt,
    editDshbrdPost,
  } = useSelector((state) => state.post);
  const { userInfo } = useSelector((state) => state.user);

  /******************* 
@purpose : Used to check path has groups
@Parameter : {}
@Author : YLIWAY
******************/

  const router = useRouter();
  const hasGroupsPath = router.asPath.includes("/groups");

  /******************* 
@purpose : Used for useRef
@Parameter : {}
@Author : INIC
******************/
  const descriptionRef = useRef();
  const timeOut = useRef();
  /******************* 
@purpose : Used for all UseState
@Parameter : {}
@Author : INIC
******************/
  const sortBy = getCookie("sortBy");
  const [addEmoji, setAddEmoji] = useState(false);
  const [tags, setTags] = useState([]);
  const [mentions, setMentions] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [isEditDshBordPost, setIsEditDashboardPost] = useState(
    Object.keys(editDshbrdPost).length > 0
  );
  const [isDisabled, setIsDisabled] = useState(false);
  const [groupId, setGroupId] = useState(postGroupId);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [postPreviewUrl, setPostPreviewUrl] = useState([]);
  const [editPost, setEditPost] = useState(editDshbrdPost);
  const [postData, setPostData] = useState({
    status: isEditDshBordPost ? editPost?.postDetails?.status : true,
    description: isEditDshBordPost ? editPost?.postDetails?.description : "",
    imageURL: isEditDshBordPost ? editPost?.postDetails?.imageURL : "",
    videoURL: isEditDshBordPost ? editPost?.postDetails?.videoURL : "",
    privacy: isEditDshBordPost
      ? getValueByKey(transManipObject, editPost?.postDetails?.privacy) || ""
      : lang("DASHBOARD.ADD_POST.PRIVACY.ANYONE"),
    profilePicURL: isEditDshBordPost
      ? editPost?.postDetails?.profilePicURL
      : "",
    documentURL: isEditDshBordPost ? editPost?.postDetails?.documentURL : "",
    postType: isEditDshBordPost ? editPost?.postDetails?.postType : "",
    whoCanComment: isEditDshBordPost
      ? editPost?.postDetails?.whoCanComment
      : "Anyone",
  });

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const errorValue = isEditDshBordPost
    ? { error: false, length: editPost?.postDetails?.description?.length }
    : { error: false, length: 0 };
  const [error, setError] = useState(errorValue);
  /******************* 
@purpose : Used for all useEffect
@Parameter : {}
@Author : INIC
******************/
  useEffect(() => {
    clearTimeout(timeOut.current);
    timeOut.current = setTimeout(() => {
      if (
        postImage ||
        postVideo ||
        postDocument ||
        createPolls ||
        createAnEvnt
      ) {
        setIsDisabled(false);
        setIsButtonDisabled(false);
      } else if (postData.description.trim()) {
        setIsButtonDisabled(false);
      } else {
        setIsDisabled(false);
        setIsButtonDisabled(true);
      }
    }, 500);
  }, [
    postImage,
    postVideo,
    postDocument,
    createPolls,
    createAnEvnt,
    postData.description,
  ]);

  useEffect(() => {
    if (isEditDshBordPost) dispatch(setPostImage(postData?.imageURL));
    // for preview url image

    const postDescription =
      postData?.description.split("~+~")[0] || postData?.description;
    let url = detectURLs(postDescription);
    if (url) {
      setPostPreviewUrl(url);
    } else {
      setPostPreviewUrl([]);
    }
  }, [isEditDshBordPost, postData.description]);

  useEffect(() => {
    if (editPost?.postDetails?.tags?.length) {
      setTags(editPost?.postDetails?.tags);
    }
  }, [editPost]);

  useEffect(() => {
    return () => {
      dispatch(clearAddPostData());
      setPostData({
        status: true,
        description: "",
        imageURL: "",
        videoURL: "",
        privacy: getValueByKey(transManipObject, postData?.privacy) || "",
        profilePicURL: "",
        documentURL: "",
        postType: "",
      });
      setIsEditDashboardPost(false);
    };
  }, []);

  useEffect(() => {
    const emojiMartContainer = document.querySelector(".emoji-mart");
    if (emojiMartContainer) {
      emojiMartContainer.addEventListener("click", (event) => {
        event.stopPropagation();
      });
    }
    return () => {
      if (emojiMartContainer) {
        emojiMartContainer.removeEventListener("click", (event) => {
          event.stopPropagation();
        });
      }
    };
  }, []);

  /******************* 
@purpose : Used for handlePostPhoto
@Parameter : {}
@Author : INIC
******************/
  const handlePostPhoto = () => {
    dispatch(toggleModals({ photopost: true }));
    dispatch(posttype("photo"));
    dispatch(toggleModals({ addpost: true }));
  };
  /******************* 
@purpose : Used for handlePostVideo
@Parameter : {}
@Author : INIC
******************/
  const handlePostVideo = () => {
    dispatch(toggleModals({ videopost: true }));
    dispatch(posttype("video"));
    dispatch(toggleModals({ addpost: true }));
  };
  /******************* 
@purpose : Used for handlePostDocument
@Parameter : {}
@Author : INIC
******************/

  const handlePostDocument = () => {
    dispatch(toggleModals({ documentpost: true }));
    dispatch(posttype("documents"));
    dispatch(toggleModals({ addpost: true }));
  };
  /******************* 
@purpose : Used for handlePostPoll
@Parameter : {}
@Author : INIC
******************/

  const handlePostPoll = () => {
    dispatch(toggleModals({ createpoll: true }));
    dispatch(posttype("poll"));
    dispatch(toggleModals({ addpost: true }));
  };

  /******************* 
@purpose : Used for select UserMode
@Parameter : {e}
@Author : INIC
******************/

  const selectUserMode = (e) => {
    setPostData({ ...postData, privacy: e });
  };
  /******************* 
@purpose : Used for select CommentMode
@Parameter : {e}
@Author : INIC
******************/

  const selectCommentMode = (e) => {
    setPostData({ ...postData, whoCanComment: e });
  };

  /******************* 
@purpose : Used for postListingApiCall
@Parameter : {}
@Author : INIC
******************/

  const postListingAPiCall = async () => {
    await dispatch(
      postListing(
        {
          page: pageNumber,
          pagesize: pageSize,
          groupId,
        },
        sortBy
      )
    );
  };

  let postDescription = postData.description;

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
  /******************* 
@purpose : Used for Post Add Api Call
@Parameter : {}
@Author : INIC
******************/
  const postAdd = async () => {
    let description = postData.description;

    if (description && description.includes("#")) {
      description = description.split("$$$$__").join('<a href="/search-result');
    }
    const descriptionTagAdd = description.includes("~+~")
      ? description.split("~+~")[0] + "$$$~~~"
      : description;
    description = descriptionTagAdd.split("$$$__").join('<a href="/profile/');
    description = description.split("~~~__").join(`">`);
    description = description.split("$$$~~~").join("</a>");

    if (postTypes === "poll") {
      let pollbody;
      if (editPost && editPost.postDetails && editPost.postDetails.id) {
        pollbody = {
          id: editPost.postDetails.id,
          status: true,
          description: description,
          whoCanComment: postData.whoCanComment,
          privacy: postData.privacy,
          postType: postTypes,
          pollAnswers: createPolls.pollAnswers,
          pollQuestion: createPolls.pollQuestion,
          groupId,
          tags: tags.length > 0 ? tags : null,
          taggedId: mentions.length > 0 ? mentions : null,
        };
      } else {
        pollbody = {
          status: true,
          description: description,
          whoCanComment: postData.whoCanComment,
          privacy: postData.privacy,
          postType: postTypes,
          pollAnswers: createPolls.pollAnswers,
          pollQuestion: createPolls.pollQuestion,
          groupId,
          tags: tags.length > 0 ? tags : null,
          taggedId: mentions.length > 0 ? mentions : null,
        };
      }
      setIsButtonDisabled(true);
      await dispatch(addPost(pollbody));
      setCookie("postToken", postTokenUnix(new Date()));
      postListingAPiCall();
      await dispatch(createPoll({}));
    } else {
      if (isEditDshBordPost) {
        let body = {
          id: editPost.postDetails.id,
          status: postData.status,
          description: description,
          whoCanComment: postData.whoCanComment,
          imageURL: postImage,
          videoURL: postData.videoURL,
          privacy: getKeyByValue(transManipObject, postData.privacy) || "",
          documentURL: postData.documentURL,
          postType: postData.postType,
          groupId: editPost.groupId,
          tags: tags.length > 0 ? tags : null,
          taggedId: mentions.length > 0 ? mentions : null,
        };
        setIsButtonDisabled(true);
        await dispatch(addPost(body));
        setEditPost("");
        setCookie("postToken", postTokenUnix(new Date()));
        postListingAPiCall();
        setIsEditDashboardPost(false);
      } else {
        let body = {
          status: true,
          groupId,
          description: description,
          whoCanComment: postData.whoCanComment,
          imageURL: postImage,
          imageAlternativeText: postImageAlternativeText,
          taggedUsers: imageTaggedUserData,
          videoURL: postVideo?.fileUrl,
          privacy: getKeyByValue(transManipObject, postData.privacy) || "",
          profileId: postData.profileId,
          documentURL: postDocument?.fileUrl,
          postType: postTypes,
          tags: tags.length > 0 ? tags : null,
          taggedId: mentions.length > 0 ? mentions : null,
        };
        setIsButtonDisabled(true);
        await dispatch(addPost(body));
        setCookie("postToken", postTokenUnix(new Date()));
        postListingAPiCall();
      }
    }
    dispatch(toggleModals({ addpost: false, isEdit: false }));
  };
  /******************* 
@purpose : Used for handle Emoji
@Parameter : {}
@Author : INIC
******************/
  const handleEmoji = (e) => {
    const { selectionStart, selectionEnd, value } = descriptionRef.current;
    const text =
      value.slice(0, selectionStart) + e.native + value.slice(selectionEnd);
    if (text.length <= 3000) {
      setPostData({
        ...postData,
        description: text,
      });
      setError({
        error: false,
        length: text.length,
      });
    } else {
      setPostData({
        ...postData,
        description: text,
      });
      setError({
        error: true,
        length: text.length,
      });
    }

    setPostData({
      ...postData,
      description: text,
    });
    const newCursorPosition = selectionStart + e.native.length;
    descriptionRef.current.value = text;
    descriptionRef.current.setSelectionRange(
      newCursorPosition,
      newCursorPosition
    );
  };
  /******************* 
@purpose : Used for Fetch users
@Parameter : {}
@Author : INIC
******************/
  const fetchUsers = async (query, callback) => {
    const body = {
      page: pageNumber,
      pagesize: pageSize,
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
      page: pageNumber,
      pagesize: pageSize,
      searchText: query,
    };
    if (postDescription && postDescription?.includes("@")) {
      await dispatch(tagFunctionality(body))
        .then((res) =>
          res.data.map((user) => ({
            display: user.name + "~+~" + user.avatar,
            id: user.userId,
            currentPosition:user.currentPosition || "",
          }))
        )
        .then(callback);
    }
  };

  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  return (
    <Fragment>
      {false && (
        <div className="bg-white p-4">
          <div className="d-flex align-items-center">
            {
              <div className="w-h-54 flex-shrink-0 rounded-pill overflow-hidden">
                <Link route="/">
                  <picture
                    className="user-profile-pic rounded-pill h-100 d-flex"
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    <source srcSet={userInfo.profilePicURL} type="image/jpg" />
                    <img
                      src={userInfo.profilePicURL || ""}
                      onError={(e) => {
                        onImageError(
                          e,
                          "profile",
                          `${userInfo.firstName} ${userInfo.lastName}`
                        );
                      }}
                      width="54"
                      height="54"
                      className="img-fluid flex-shirnk-0 overflow-hidden rounded-pill"
                    />
                  </picture>
                </Link>
              </div>
            }
            <div className="ml-3">
              <div className="mb-0 algin-items-center">
                <a
                  title={`${
                    userInfo && userInfo.firstName !== null
                      ? userInfo.firstName
                      : "john"
                  } ${
                    userInfo && userInfo.lastName !== null
                      ? userInfo.lastName
                      : "dev"
                  }`}
                >
                  <span className="font-weight-semibold">{`${
                    userInfo && userInfo.firstName !== null
                      ? userInfo.firstName
                      : "john"
                  }
                      ${
                        userInfo && userInfo.lastName !== null
                          ? userInfo.lastName
                          : "dev"
                      }
                      `}</span>
                </a>
                <p className="mb-2">
                  {`${
                    userInfo && userInfo.currentPosition !== null
                      ? userInfo.currentPosition
                      : ""
                  }
                      `}
                </p>
              </div>
              <div className="reaction-icons-sections d-inline-block">
                {!hasGroupsPath && (
                  <div className="py-1 px-2 reaction-icons-box border rounded-8 border-geyser mr-3">
                    <Dropdown
                      className="theme-dropdown"
                      onSelect={selectUserMode}
                    >
                      <Dropdown.Toggle className="d-flex align-items-center">
                        <em className="icon icon-web pr-2 text-charcoal-grey"></em>
                        <h5 className="font-14 mb-0 text-secondary">
                          {postData.privacy}
                        </h5>
                        <em className="icon icon-down-arrow text-charcoal-grey pl-2"></em>
                      </Dropdown.Toggle>
                      <Dropdown.Menu defaultValue={postData.privacy}>
                        <Dropdown.Item
                          eventKey={lang("DASHBOARD.ADD_POST.PRIVACY.ANYONE")}
                        >
                          {lang("DASHBOARD.ADD_POST.PRIVACY.ANYONE")}
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey={lang(
                            "DASHBOARD.ADD_POST.PRIVACY.CONNECTION_ONLY"
                          )}
                        >
                          {lang("DASHBOARD.ADD_POST.PRIVACY.CONNECTION_ONLY")}
                        </Dropdown.Item>
                        {/* gc dropdown */}
                        <Dropdown.Item
                          eventKey={lang(
                            "DASHBOARD.ADD_POST.PRIVACY.GROWTH_CONNECTION_ONLY"
                          )}
                        >
                          {lang(
                            "DASHBOARD.ADD_POST.PRIVACY.GROWTH_CONNECTION_ONLY"
                          )}
                        </Dropdown.Item>
                        {/* no one dropdown */}
                        <Dropdown.Item
                          eventKey={lang("DASHBOARD.ADD_POST.PRIVACY.NO_ONE")}
                        >
                          {lang("DASHBOARD.ADD_POST.PRIVACY.NO_ONE")}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <Modal.Body
        className={
          postData?.description?.includes("@")
            ? "px-4 pb-0 pt-0 overflow-visible"
            : "px-4 pb-0 pt-0"
        }
      >
        {/* <div className="post-owner-with-cross"> */}
        <PostOwner
          photoLink={userInfo?.profilePicURL || ""}
          name={`${userInfo?.firstName || ""} ${userInfo?.lastName || ""}`}
          postData={postData}
          privacyOptions={[
            {
              label: lang("DASHBOARD.ADD_POST.PRIVACY.ANYONE"),
              value: lang("DASHBOARD.ADD_POST.PRIVACY.ANYONE"),
            },
            {
              label: lang("DASHBOARD.ADD_POST.PRIVACY.CONNECTION_ONLY"),
              value: lang("DASHBOARD.ADD_POST.PRIVACY.CONNECTION_ONLY"),
            },
            {
              label: lang("DASHBOARD.ADD_POST.PRIVACY.GROWTH_CONNECTION_ONLY"),
              value: lang("DASHBOARD.ADD_POST.PRIVACY.GROWTH_CONNECTION_ONLY"),
            },
            {
              label: lang("DASHBOARD.ADD_POST.PRIVACY.NO_ONE"),
              value: lang("DASHBOARD.ADD_POST.PRIVACY.NO_ONE"),
            },
          ]}
          changePrivacy={selectUserMode}
        />
        {/* <div
            className="add-post-cross"
            onClick={() => {
              dispatch(toggleModals({ [modelKey]: false }));
            }}
          >
            <img src="assets/images/add-post/post-modal-close.svg" />
          </div> */}
        {/* </div> */}
        <div className="body">
          <Form.Group className="mb-0 position-relative">
            <Form.Label></Form.Label>

            <div className="position-relative post-view mentions-tag-box">
              <MentionsInput
                className="mentions-box"
                inputRef={descriptionRef}
                allowSpaceInQuery={true}
                spellCheck="false"
                placeholder={lang("DASHBOARD.ADD_POST.PLACEHOLDER")}
                value={postDescription}
                style={reactMentionsStyle}
                onChange={(event, newValue, newPlainTextValue, mentions) => {
                  if (postDescription.includes("#")) {
                    setTags(
                      mentions?.map((mention) => mention?.id?.replace("#", ""))
                    );
                  } else {
                    setMentions(mentions?.map((mention) => mention?.id));
                  }

                  if (event.target.value.length <= 3000) {
                    setPostData({
                      ...postData,
                      description: event.target.value,
                    });
                    setError({
                      error: false,
                      length: event.target.value.length,
                    });
                  } else {
                    setPostData({
                      ...postData,
                      description: event.target.value,
                    });
                    setError({
                      error: true,
                      length: event.target.value.length,
                    });
                  }
                }}
              >
                <Mention
                  trigger="@"
                  data={fetchTagUsers}
                  markup="$$$____id__~~~____display__$$$~~~"
                  renderSuggestion={(suggestion) => (
                    <>
                      <MentionUserUi
                        imageUrl={suggestion.display.split("~+~")[1]}
                        userName={suggestion.display.split("~+~")[0]}
                        currentPosition={suggestion.currentPosition || ""}
                      />
                    </>
                  )}
                />
                <Mention
                  trigger="#"
                  data={fetchUsers}
                  markup="$$$$____id__~~~____display__$$$~~~"
                  renderSuggestion={(suggestion) => (
                    <>
                      <MentionUserUi
                        isTag={true}
                        tagName={suggestion.display}
                      />
                    </>
                  )}
                />
              </MentionsInput>
            </div>
            {error && (
              <p className="text-right d-flex align-items-center">
                {error.error && (
                  <span className="text-danger font-14">
                    {`${lang("DASHBOARD.POSTS.COMMENT.MAX_CHAR_3000")} `}
                  </span>
                )}
                {/* <span
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
                <span>3000</span> */}
              </p>
            )}
            <div className="d-flex justify-content-between">
              <div
                className="pointer"
                style={{
                  display: "flex",
                  marginRight: "15px",
                  alignItems: "center",
                }}
              >
                {/* <i
                  onClick={() => setAddEmoji(!addEmoji)}
                  className="bx bx-smile"
                ></i> */}
                <span
                  className="pointer"
                  onClick={() => setAddEmoji(!addEmoji)}
                >
                  <img src="assets/images/create-post-emoji-icon.svg" />
                </span>
              </div>
              <div>
                <span
                  className={
                    error.length < 3000
                      ? "text-muted ml-auto font-12"
                      : error.length > 3000
                      ? "text-danger ml-auto font-12"
                      : "text-muted ml-auto font-12"
                  }
                >
                  {error.length}/
                </span>
                <span className="font-12">3000</span>
              </div>
            </div>

            {postPreviewUrl.length > 0 && (
              <LinkPreviewGenerator url={postPreviewUrl[0]} />
            )}
            <AddPostSelected
              postImage={postImage}
              postVideo={isEditDshBordPost ? postData.videoURL : postVideo}
              postDocument={
                isEditDshBordPost ? postData.documentURL : postDocument
              }
              createPolls={createPolls}
              createAnEvnt={createAnEvnt}
              editPost={editPost.postDetails}
              isEditDshBordPost={isEditDshBordPost}
            />
          </Form.Group>
          <div>
            <div style={{ display: "flex", marginBottom: "5px" }}>
              {false && (
                <div
                  className="pointer"
                  style={{
                    display: "flex",
                    marginRight: "15px",
                    alignItems: "center",
                  }}
                >
                  {/* <i
                  onClick={() => setAddEmoji(!addEmoji)}
                  className="bx bx-smile"
                ></i> */}
                  <span
                    className="pointer"
                    onClick={() => setAddEmoji(!addEmoji)}
                  >
                    <img src="assets/images/create-post-emoji-icon.svg" />
                  </span>
                </div>
              )}
              <div>
                {/* <Button
                  variant="btn text-uppercase text-info p-0"
                  onClick={() => {
                    descriptionRef.current.focus();
                    setPostData({
                      ...postData,
                      description: postData.description + "#",
                    });
                  }}
                >
                  {lang("DASHBOARD.ADD_POST.ADD_HASHTAG")}
                </Button> */}
              </div>
            </div>
            <div className="emoji-mart emoji-mart-width">
              {addEmoji && (
                <Picker
                  onEmojiSelect={handleEmoji}
                  onClickOutside={() => setAddEmoji(false)}
                  theme="light"
                  previewPosition="none"
                />
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="footer d-flex p-3">
        {/* <div className="reaction-icons-sections d-lg-flex align-items-center mx-0 justify-content-between mb-lg-0 mb-3">
          <div className="d-flex w-100 justify-content-between">
            <div
              className={
                isDisabled
                  ? "w-h-46 mr-3 bg-paper-white rounded-pill flex-shrink-0 d-flex align-items-center justify-content-center disablebutton"
                  : "w-h-46 mr-3 bg-paper-white rounded-pill flex-shrink-0 d-flex align-items-center justify-content-center"
              }
            >
              <button
                className={
                  isDisabled
                    ? "d-lg-flex outline-none border-0 bg-transparent cursor-not-allowed align-items-center justify-content-center mb-0 disablebutton"
                    : "d-lg-flex outline-none border-0 bg-transparent cursor-not-allowed align-items-center justify-content-center mb-0"
                }
                onClick={handlePostPhoto}
                disabled={isDisabled}
                data-toggle="tooltip"
                data-placement="left"
                title={lang("DASHBOARD.ADD_POST.PHOTO")}
              >
                <em className="icon icon-picture font-20"></em>
              </button>
            </div>
            <div
              className={
                isDisabled
                  ? "w-h-46 mr-3 bg-paper-white rounded-pill flex-shrink-0 d-flex align-items-center justify-content-center disablebutton"
                  : "w-h-46 mr-3 bg-paper-white rounded-pill flex-shrink-0 d-flex align-items-center justify-content-center"
              }
            >
              <button
                className={
                  isDisabled
                    ? "d-lg-flex outline-none border-0 bg-transparent cursor-not-allowed align-items-center justify-content-center mb-0 disablebutton"
                    : "d-lg-flex outline-none border-0 bg-transparent cursor-not-allowed align-items-center justify-content-center mb-0"
                }
                onClick={handlePostVideo}
                data-toggle="tooltip"
                data-placement="left"
                disabled={isDisabled}
                title={lang("DASHBOARD.ADD_POST.VIDEO")}
              >
                <em className="icon icon-add-video font-24 cursor-na reaction-icons"></em>
              </button>
            </div>
            <div
              className={
                isDisabled
                  ? "w-h-46 mr-3 bg-paper-white rounded-pill flex-shrink-0 d-flex align-items-center justify-content-center disablebutton"
                  : "w-h-46 mr-3 bg-paper-white rounded-pill flex-shrink-0 d-flex align-items-center justify-content-center"
              }
            >
              <button
                className={
                  isDisabled
                    ? "d-lg-flex outline-none border-0 bg-transparent cursor-not-allowed align-items-center justify-content-center mb-0 disablebutton"
                    : "d-lg-flex outline-none border-0 bg-transparent cursor-not-allowed align-items-center justify-content-center mb-0"
                }
                onClick={handlePostPoll}
                disabled={isDisabled}
                data-toggle="tooltip"
                data-placement="left"
                title={lang("DASHBOARD.ADD_POST.POLL")}
              >
                <em className="icon icon-graph font-20"></em>
              </button>
            </div>
          </div>
        </div> */}
        <div className="d-flex justify-content-between w-100 flex-wrap footer-content">
          <div className="d-flex align-items-center mb-1">
            <YliwayButton
              // backgroundColor="#6750A4"
              label={lang("COMMON.BACK")}
              size={"medium"}
              fontWeight={500}
              primaryOutlined={true}
              // disabled={isButtonDisabled || error.error}
              handleClick={() => {
                dispatch(toggleModals({ [modelKey]: false }));
              }}
            />
          </div>
          <div className="post-type-icons-box">
            <AssistChips
              border="none"
              iconName="postPhoto"
              tooltip={lang("DASHBOARD.ADD_POST.POST_PHOTO")}
              paddingX="10px"
              paddingY="16px"
              handleClick={handlePostPhoto}
            />
            <AssistChips
              border="none"
              iconName="postVideo"
              tooltip={lang("DASHBOARD.ADD_POST.POST_VIDEO")}
              paddingX="10px"
              paddingY="16px"
              handleClick={handlePostVideo}
            />
            <AssistChips
              border="none"
              iconName="postPoll"
              tooltip={lang("DASHBOARD.ADD_POST.POST_POLL")}
              paddingX="10px"
              paddingY="16px"
              handleClick={handlePostPoll}
            />
            <AssistChips
              border="none"
              iconName="postArticle"
              tooltip={lang("DASHBOARD.ADD_POST.POST_ARTICLE")}
              paddingX="10px"
              paddingY="16px"
              handleClick={() => {
                router.push(ARTICLE);
              }}
            />
          </div>
          {false && (
            <div className="reaction-icons-sections d-lg-flex align-items-center justify-content-between">
              {!hasGroupsPath && (
                <div className="py-1 reaction-icons-box d-flex align-items-center border rounded-8 border-geyser mr-3">
                  <Dropdown
                    className="theme-dropdown"
                    onSelect={selectCommentMode}
                  >
                    <Dropdown.Toggle className="d-flex align-items-center">
                      <em className="icon icon-msg-square text-secondary font-20"></em>
                      <h5 className="font-14 mb-0 pl-2 text-secondary text-left">
                        {postData.whoCanComment}
                      </h5>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="Anyone">
                        {lang("DASHBOARD.ADD_POST.PRIVACY.ANYONE")}
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Connections only">
                        {lang("DASHBOARD.ADD_POST.PRIVACY.CONNECTION_ONLY")}
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Growth connections only">
                        {lang(
                          "DASHBOARD.ADD_POST.PRIVACY.GROWTH_CONNECTION_ONLY"
                        )}
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="No one">
                        {lang("DASHBOARD.ADD_POST.PRIVACY.NO_ONE")}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              )}
            </div>
          )}
          <div className="mx-2">
            <CustomSelectWithRadio
              options={[
                {
                  label: lang("DASHBOARD.ADD_POST.PRIVACY.ANYONE"),
                  value: "Anyone",
                },
                {
                  label: lang("DASHBOARD.ADD_POST.PRIVACY.CONNECTION_ONLY"),
                  value: "Connections only",
                },
                {
                  label: lang(
                    "DASHBOARD.ADD_POST.PRIVACY.GROWTH_CONNECTION_ONLY"
                  ),
                  value: "Growth connections only",
                },
                {
                  label: lang("DASHBOARD.ADD_POST.PRIVACY.NO_ONE"),
                  value: "No one",
                },
              ]}
              defaultValue={postData.whoCanComment}
              callback={selectCommentMode}
            />
          </div>
          <div className="d-flex align-items-center">
            <div>
              <YliwayButton
                label={lang("DASHBOARD.ADD_POST.BUTTON.POST")}
                size="medium"
                primary={true}
                fontWeight={500}
                disabled={isButtonDisabled || error.error}
                handleClick={postAdd}
              />
            </div>
          </div>
        </div>
      </Modal.Footer>
    </Fragment>
  );
};
export default AddPost;
