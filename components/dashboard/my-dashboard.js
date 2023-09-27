import { Link } from "@routes";
import React, { Fragment, useEffect, useState } from "react";
import { Card, Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ARTICLE, CREATE_GROUPS } from "routes/urls";
import {
  editDashboardPost,
  postGroupId,
  postListing,
  posttype,
  toggleModals,
} from "store/actions";
import { selectUserInfo } from "store/selectors/user";
import { getCookie, onImageError, setCookie } from "utils";
import Posts from "./Posts";
import { AssistChips } from "components/assist-chips";
import { useRouter } from "next/router";

const MainModal = dynamic(() =>
  import("./../modal").then((mod) => mod.MainModal)
);
const AddPost = dynamic(() =>
  import("components/modal/add-your-post/add-post")
);

const MyDashboard = ({ groupId, page }) => {
  const dispatch = useDispatch();
  const sortByPost = getCookie("sortBy");
  const [lang] = useTranslation("language");
  const [sortBy, setSortBy] = useState(sortByPost || "Recent");
  const [newPostCount, setNewPostCount] = useState(0);
  const { addpost} = useSelector(({ ui }) => ui.modals, shallowEqual);
  const router = useRouter()

  /******************* 
  @Purpose : for triggering post poll
  @Parameter : 
  @Author : YLIWAY
  ******************/

  const handlePostPoll = () => {
    dispatch(toggleModals({ createpoll: true }));
    dispatch(posttype("poll"));
    //dispatch(toggleModals({ addpost: true }));
  };

  /******************* 
  @Purpose : Used for useSelectors
  @Parameter : 
  @Author : INIC
  ******************/
  const { postListData } = useSelector((state) => state.post);
  const userInfo = useSelector(selectUserInfo);
  /******************* 
  @Purpose : Used for useState
  @Parameter : {}
  @Author : INIC
  ******************/
  const [body, setBody] = useState({
    page: 1,
    pagesize: 10,
    groupId: groupId ? groupId : undefined,
    filter: null,
  });

  /******************* 
  @Purpose : Used for useEffect
  @Parameter : {}
  @Author : INIC
  ******************/
  useEffect(() => {
    setCookie("sortBy", sortBy);
  }, [sortBy]);

  useEffect(() => {
    getAllPost();
  }, [body, newPostCount]);

  useEffect(() => {
    setNewPostCount(postListData?.newPost);
  }, [postListData?.newPost]);

  /******************* 
  @Purpose : Used for get All post
  @Parameter : {}
  @Author : INIC
  ******************/
  const getAllPost = () => {
    setTimeout(async () => {
      await dispatch(postListing(body, sortBy));
    }, 1000);
  };

  /******************* 
  @Purpose : Used for handle post photo
  @Parameter : 
  @Author : INIC
  ******************/
  const handlePostPhoto = () => {
    dispatch(toggleModals({ photopost: true }));
    dispatch(posttype("photo"));
  };

  /******************* 
  @Purpose : Used for handle post photo v2
  @Parameter : 
  @Author : INIC
  ******************/
  const handlePostPhotoV2 = () => {
    dispatch(toggleModals({ photopostv2: true }));
    dispatch(posttype("photo"));
  };

  /******************* 
  @Purpose : Used for handle post video
  @Parameter : 
  @Author : INIC
  ******************/
  const handlePostVideo = () => {
    dispatch(toggleModals({ videopost: true }));
    dispatch(posttype("video"));
  };

  /******************* 
  @Purpose : Used for get more post
  @Parameter : 
  @Author : INIC
  ******************/
  const fetchMorePost = () => {
    setBody({
      ...body,
      pagesize: body.pagesize + 10,
    });
  };

  /******************** 
  @purpose : Used for call getUserProfileData
  @Parameter : { data, dispatch }
  @Author : INIC
  ******************/
  const addArticle = () => {
    dispatch(postGroupId(groupId));
  };

  return (
    <Fragment>
      {/* Dashboard page */}
      <Card className="mb-2 post-upload border-bottom-dark-2 border-0 rounded-lg-0">
        <Card.Body className="pb-0">
          <div className="d-flex">
            <div className="mr-2 w-h-40 rounded-pill border-geyser overflow-hidden flex-shrink-0">
              <Link route="/">
                <a>
                  <img
                    src={
                      userInfo.profilePicURL !== null
                        ? userInfo.profilePicURL
                        : userInfo.firstName !== null
                        ? userInfo.firstName.charAt(0).toUpperCase()
                        : ""
                    }
                    onError={(e) => {
                      onImageError(
                        e,
                        "profile",
                        `${userInfo.firstName} ${userInfo.lastName}`
                      );
                    }}
                    width="40"
                    height="40"
                    className="img-fluid w-100 h-100"
                  />
                </a>
              </Link>
            </div>
            <div className="input-post-option-container">
              <div className="w-100">
                <div className="position-relative"></div>
                <input
                  type="text"
                  className="rounded-lg write-post w-100 text-body-14 text-gray border-geyser font-weight-lighter h-40 bg-paper-white"
                  placeholder={lang("DASHBOARD.ADD_POST.INPUT_PLACEHOLDER")}
                  readOnly={true}
                  onClick={() => {
                    dispatch(postGroupId(groupId));
                    dispatch(toggleModals({ addpost: true }));
                    dispatch(editDashboardPost({}));
                  }}
                />
              </div>
              <div className="post-type-icons-box-wrap">
                <AssistChips
                  border="none"
                  iconName="postPhoto"
                  tooltip={lang("DASHBOARD.ADD_POST.POST_PHOTO")}
                  paddingX="10px"
                  paddingY="16px"
                  label={lang("DASHBOARD.ADD_POST.POST_PHOTO")}
                  handleClick={handlePostPhotoV2}
                />
                <AssistChips
                  border="none"
                  iconName="postVideo"
                  tooltip={lang("DASHBOARD.ADD_POST.POST_VIDEO")}
                  paddingX="10px"
                  paddingY="16px"
                  label={lang("DASHBOARD.ADD_POST.POST_VIDEO")}
                  handleClick={handlePostVideo}
                />
                <AssistChips
                  border="none"
                  iconName="postPoll"
                  tooltip={lang("DASHBOARD.ADD_POST.POST_POLL")}
                  paddingX="10px"
                  paddingY="16px"
                  label={lang("DASHBOARD.ADD_POST.POST_POLL")}
                  handleClick={handlePostPoll}
                />
                <AssistChips
                  border="none"
                  iconName="postArticle"
                  tooltip={lang("DASHBOARD.ADD_POST.POST_ARTICLE")}
                  paddingX="10px"
                  paddingY="16px"
                  label={lang("DASHBOARD.ADD_POST.POST_ARTICLE")}
                  handleClick={() => {
                    addArticle();
                    router.push(ARTICLE);
                  }}
                />
              </div>
            </div>
          </div>

          {/* <div className="reaction-icons-sections pl-xl-5 d-flex justify-content-between">
            <div className="reaction-icons-box post-box-width pl-0   ">
              <label
                className=" rounded-lg d-xl-flex align-items-center justify-content-center mb-0 border-blueberry-whip py-2 px-12 w-100"
                onClick={handlePostPhoto}
              >
                <em className="icon font-18 icon-add-gallery reaction-icons"></em>
                <h5 className="font-12 reaction-icon-text">
                  {lang("DASHBOARD.ADD_POST.BUTTON.IMAGE")}
                </h5>
              </label>
            </div>
            <div className="reaction-icons-box post-box-width pl-0   ">
              <label
                className=" rounded-lg d-xl-flex align-items-center justify-content-center mb-0 border-blueberry-whip py-2 px-12 w-100"
                onClick={handlePostPhotoV2}
              >
                <em className="icon font-18 icon-add-gallery reaction-icons"></em>
                <h5 className="font-12 reaction-icon-text">
                  {lang("DASHBOARD.ADD_POST.BUTTON.IMAGEV2")}
                </h5>
              </label>
            </div>
            <div className="reaction-icons-box post-box-width pl-0  ">
              <form>
                <label
                  className="rounded-lg d-xl-flex align-items-center justify-content-center mb-0 border-blueberry-whip py-2 px-12 w-100"
                  onClick={handlePostVideo}
                >
                  <em className="icon font-18 icon-add-video reaction-icons"></em>
                  <h5 className="font-12 reaction-icon-text">
                    {lang("DASHBOARD.ADD_POST.BUTTON.VIDEO")}
                  </h5>
                </label>
              </form>
            </div>
            {groupId !== undefined && (
              <div className="reaction-icons-box "></div>
            )}
            {groupId === undefined && (
              <>
                <div className="reaction-icons-box post-box-width pl-0 mb-sm-0 mb-3">
                  <Link route={CREATE_GROUPS}>
                    <div className="rounded-lg border-blueberry-whip py-2 px-12">
                      <a className="d-xl-flex align-items-center justify-content-center">
                        <em className="icon font-18 icon-create-group reaction-icons"></em>
                        <h5 className="font-12 reaction-icon-text">
                          {lang("DASHBOARD.ADD_POST.BUTTON.CREATE_GROUP")}
                        </h5>
                      </a>
                    </div>
                  </Link>
                </div>
                <div className="reaction-icons-box post-box-width pl-0 pr-md-0 mb-sm-0 mb-3">
                  <Link route={ARTICLE}>
                    <div className="rounded-lg border-blueberry-whip py-2 px-12">
                      <a
                        className=" d-xl-flex align-items-center justify-content-center"
                        onClick={addArticle}
                      >
                        <em className="icon font-18 icon-write-article reaction-icons"></em>
                        <h5 className="font-12 reaction-icon-text">
                          {lang("DASHBOARD.ADD_POST.BUTTON.WRITE_AN_ARTICLE")}
                        </h5>
                      </a>
                    </div>
                  </Link>
                </div>
              </>
            )}
          </div> */}
        </Card.Body>
      </Card>

      {groupId === undefined && (
        <div className="d-flex justify-content-end recent-post-line position-relative">
          <div className="mb-2 rounded-lg-8 d-inline-block">
            <div className="d-flex align-items-center justify-content-end text-right">
              <h6 className="text-body-12 mb-0 text-gray-darker">
                {lang("DASHBOARD.SORT_BY.SORT_BY")}
                <span className="pl-2 font-weight-bold text-secondary">
                  {sortBy}
                </span>
              </h6>
              <Dropdown
                className="theme-dropdown ml-2"
                onSelect={(e) => setSortBy(e)}
              >
                <Dropdown.Toggle>
                  <span className="down-arrow-rotate font-20">
                    <em className="icon icon-down-arrow"></em>
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  className="dropdown-inner-left"
                  defaultValue={sortBy}
                >
                  <Dropdown.Item
                    eventKey={lang("DASHBOARD.SORT_BY.GROWTH_PARTNERS")}
                    onSelect={() => setBody({ ...body, filter: null })}
                  >
                    {lang("DASHBOARD.SORT_BY.GROWTH_PARTNERS")}
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey={lang("DASHBOARD.SORT_BY.FROM_CONNECTIONS")}
                    onSelect={() => setBody({ ...body, filter: "connection" })}
                  >
                    {lang("DASHBOARD.SORT_BY.FROM_CONNECTIONS")}
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey={lang("DASHBOARD.SORT_BY.RECENT_POSTS")}
                    onSelect={() => setBody({ ...body, filter: null })}
                  >
                    {lang("DASHBOARD.SORT_BY.RECENT_POSTS")}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      )}

      {/* post view */}

      <Posts
        postListData={postListData}
        userInfo={userInfo}
        getAllPost={getAllPost}
        fetchMorePost={fetchMorePost}
        setNewPostCount={setNewPostCount}
        newPostCount={newPostCount}
        page={page}
      />
      {/******************* 
           @purpose : Dashboard page add post Modal
           @Author : YLIWAY
           ******************/}
      <MainModal
        className="addpost img-view custom-modal-footer"
        show={addpost}
        keyModal="addpost"
        hideHeader={true}
        closeIcon={false}
        body={<AddPost modelKey={"addpost"} />}
      />
    </Fragment>
  );
};
export default MyDashboard;
