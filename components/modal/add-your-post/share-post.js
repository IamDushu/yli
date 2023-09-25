import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@routes";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Form, Button, Modal } from "react-bootstrap";
import { addPost } from "@actions";
import {
  toggleModals,
  postListing,
  clearAddPostData,
  tagSearch,
  setPostImage,
  tagFunctionality,
} from "../../../store/actions";
import {
  detectURLs,
  getCookie,
  onImageError,
  postImageHandler,
  postLastNameHandler,
  postTokenUnix,
  setCookie,
} from "utils";
import PostBody from "components/dashboard/Posts/PostBody";
import PostHeader from "components/dashboard/Posts/PostHeader";
import { MentionsInput, Mention } from "react-mentions";
import { LinkPreviewGenerator } from "components/ui/link-preview";
import Picker from "@emoji-mart/react";
import reactMentionsStyle from "./react-mention-style";

/*******************   
@purpose : User Set Thankyou
@Author : INIC
******************/
const AddPost = () => {
  const sortBy = getCookie("sortBy");
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const { postGroupId, editDshbrdPost } = useSelector((state) => state.post);
  const descriptionRef = useRef();
  const [loaded, setLoaded] = useState(false);
  const [tags, setTags] = useState([]);
  const [groupId, setGroupId] = useState(postGroupId);
  // const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const { sharePost } = useSelector((state) => state.ui);
  const [postPreviewUrl, setPostPreviewUrl] = useState([]);
  const [editPost, setEditPost] = useState(editDshbrdPost);
  const [isEditDshBordPost, setIsEditDashboardPost] = useState(
    Object.keys(editDshbrdPost).length > 0
  );
  const [postData, setPostData] = useState({
    status: isEditDshBordPost ? editPost?.postShareDetails?.status : true,
    description: isEditDshBordPost ? editPost?.postDetails?.description : "",
    imageURL: isEditDshBordPost ? editPost?.postShareDetails?.imageURL : "",
    videoURL: isEditDshBordPost ? editPost?.postShareDetails?.videoURL : "",
    privacy: isEditDshBordPost
      ? editPost?.postShareDetails?.privacy
      : lang("DASHBOARD.ADD_POST.PRIVACY.ANYONE"),
    profilePicURL: isEditDshBordPost
      ? editPost?.postShareDetails?.profilePicURL
      : "",
    documentURL: isEditDshBordPost
      ? editPost?.postShareDetails?.documentURL
      : "",
    postType: isEditDshBordPost ? editPost?.postShareDetails?.postType : "",
    whoCanComment: isEditDshBordPost
      ? editPost?.postShareDetails?.whoCanComment
      : lang("DASHBOARD.ADD_POST.PRIVACY.ANYONE"),
  });

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [error, setError] = useState({ error: false, length: 0 });
  const [mentions, setMentions] = useState([]);
  const [addEmoji, setAddEmoji] = useState(false);

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

  /******************* 
@purpose : Used for select UserMode
@Parameter : {e}
@Author : INIC
******************/

  const selectUserMode = (e) => {
    setPostData({ ...postData, privacy: e });
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
          }))
        )
        .then(callback);
    }
  };

  /******************* 
@purpose : Used for handle Emoji
@Parameter : {}
@Author : INIC
******************/
  const handleEmoji = (e) => {
    const text = postData.description + e.native;
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

    if (isEditDshBordPost) {
      let body = {
        id: editDshbrdPost.postId,
        status: true,
        description: description,
        whoCanComment: postData.whoCanComment,

        privacy: postData.privacy,
        profileId: postData.profileId,
        postType: "postShare",
        postShareId: sharePost.postId,
        tags,
        taggedId: mentions.length > 0 ? mentions : null,
      };
      await dispatch(addPost(body));
      setIsEditDashboardPost(false);
    } else {
      let body = {
        status: true,
        description: description,
        whoCanComment: postData.whoCanComment,

        privacy: postData.privacy,
        profileId: postData.profileId,
        postType: "postShare",
        postShareId: sharePost.postId,
        tags,
        taggedId: mentions.length > 0 ? mentions : null,
      };
      await dispatch(addPost(body));
    }

    setCookie("postToken", postTokenUnix(new Date()));
    postListingAPiCall();

    dispatch(toggleModals({ sharepost: false }));
  };

  /******************* 
@purpose : Used for linkPreview
@Parameter : {}
@Author : INIC
******************/

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
@purpose : Used for select CommentMode
@Parameter : {e}
@Author : INIC
******************/

  const selectCommentMode = (e) => {
    setPostData({ ...postData, whoCanComment: e });
  };

  useEffect(() => {
    return () => {
      dispatch(clearAddPostData());
      setPostData({
        status: true,
        description: "",
        privacy: postData.privacy,
        postType: "",
        whoCanComment: "Anyone",
      });
      setIsEditDashboardPost(false);
    };
  }, []);

  return (
    <>
      <Modal.Body className="p-4">
        {/* <PerfectScrollbar> */}
        <div className="body">
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
                  title={`${userInfo && userInfo.firstName !== null
                      ? userInfo.firstName
                      : "john"
                    } ${userInfo && userInfo.lastName !== null
                      ? userInfo.lastName
                      : "dev"
                    }`}
                >
                  <span className="font-weight-semibold">{`${userInfo &&
                    userInfo.firstName !== null &&
                    userInfo.firstName
                    }
                    ${userInfo &&
                    userInfo.lastName !== null &&
                    userInfo.lastName
                    }
                    `}</span>
                </a>
                <p className="mb-2">
                  {`${userInfo && userInfo.currentPosition !== null
                      ? userInfo.currentPosition
                      : ""
                    }
                    `}
                </p>
              </div>
              <div c></div>
              <div className="reaction-icons-sections d-inline-block">
                <div className="py-1 px-2 reaction-icons-box border rounded-8 border-geyser mr-3">
                  <Dropdown
                    className="theme-dropdown ml-2"
                    onSelect={selectUserMode}
                  >
                    <Dropdown.Toggle className="d-flex align-items-center">
                      <em className="icon icon-web pr-2 text-charcoal-grey"></em>
                      <h5 className="font-14 mb-0">{postData.privacy}</h5>
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
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
          <Form.Group className="mb-0">
            <Form.Label></Form.Label>

            <div className="position-relative post-view pr-3">
              <MentionsInput
                allowSpaceInQuery={true}
                className="mentions-box"
                inputRef={descriptionRef}
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
                // appendSpaceOnAdd={true}
                />
              </MentionsInput>
            </div>

            {postPreviewUrl.length > 0 && (
              <LinkPreviewGenerator url={postPreviewUrl[0]} />
            )}

            <div onClick={() => setAddEmoji(!addEmoji)}>
              <div className="pointer">
                <i className="bx bx-smile"></i>
              </div>

              {addEmoji && (
                <Picker
                  onEmojiSelect={handleEmoji}
                  onClickOutside={() => setAddEmoji(false)}
                  theme="light"
                  previewPosition="none"
                />
              )}
            </div>
            {error && (
              <p className="pr-3 text-right d-flex align-items-center">
                {error.error && (
                  <span style={{ color: "red", fontSize: "14px" }}>
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

            <div className="mt-4">
              {!isEditDshBordPost && (
                <PostHeader
                  listData={sharePost}
                  imagePreference={postImageHandler(
                    sharePost?.postDetails?.userDetails,
                    sharePost?.postDetails?.instituteDetails,
                    userInfo
                  )}
                  lastNameFunction={postLastNameHandler(
                    sharePost?.postDetails?.userDetails,
                    sharePost?.postDetails?.instituteDetails,
                    userInfo
                  )}
                  // type="share"
                  isModal={true}
                />
              )}
              <PostBody
                listData={isEditDshBordPost ? editDshbrdPost : sharePost}
                isEdit={isEditDshBordPost}
              />
            </div>
          </Form.Group>
          <div>
            <Button
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
            </Button>
          </div>
        </div>
        {/* </PerfectScrollbar> */}
      </Modal.Body>
      <Modal.Footer className="footer border-top border-geyser p-4 pt-3">
        <div className="reaction-icons-sections d-lg-flex align-items-center justify-content-between">
          <div className="py-1 reaction-icons-box d-flex align-items-center border rounded-8 border-geyser mr-3">
            <em className="icon icon-message text-secondary font-20"></em>
            <h5 className="font-14 mb-0 pl-2 text-left">
              {postData.whoCanComment}
            </h5>
            <Dropdown
              className="theme-dropdown ml-2"
              onSelect={selectCommentMode}
            >
              <Dropdown.Toggle>
                <em className="icon icon-down-arrow text-charcoal-grey"></em>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  eventKey="Anyone"
                >
                  {lang("DASHBOARD.ADD_POST.PRIVACY.ANYONE")}
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Connections only"
                >
                  {lang("DASHBOARD.ADD_POST.PRIVACY.CONNECTION_ONLY")}
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Growth connections only"
                >
                  {lang("DASHBOARD.ADD_POST.PRIVACY.GROWTH_CONNECTION_ONLY")}
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="No one"
                >
                  {lang("DASHBOARD.ADD_POST.PRIVACY.NO_ONE")}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="d-flex ml-auto pl-3 border-left-1">
          <Button
            variant="btn btn-info px-5 w-lg-100"
            onClick={postAdd}
            // disabled={isButtonDisabled || error.error}
            disabled={error.error}
          >
            {lang("DASHBOARD.ADD_POST.BUTTON.POST")}
          </Button>
        </div>
      </Modal.Footer>
    </>
  );
};
export default AddPost;
