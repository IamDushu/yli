import React, { Fragment, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PostHeader from "./PostHeader";
import PostBody from "./PostBody";
import PostFooter from "./PostFooter";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { toggleModals } from "store/actions";
import { postImageHandler, postLastNameHandler, setCookie } from "utils";
import moment from "moment";
import { Loader } from "components/ui";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import ViewPost from "components/modal/viewPost";
import Card from "@mui/material/Card";
import { Button, Divider, Stack } from "@mui/material";
const AddToGMModal = dynamic(() =>
  import("@components/modal").then((mod) => mod.AddToGMModal)
);
const MainModal = dynamic(() =>
  import("@components/modal").then((mod) => mod.MainModal)
);
const DashboardPost = ({
  postListData,
  userInfo,
  fetchMorePost,
  getAllPost,
  setNewPostCount,
  newPostCount,
  searchText,
  page,
}) => {
  const [open, setOpen] = useState(false);
  const [viewpostData, setViewpostData] = useState([]);
  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    if (open === true) {
      setOpen(false);
    }
  }, []);
  const [lang] = useTranslation("language");
  const { addtoGrowthModel } = useSelector(({ ui }) => ui.modals, shallowEqual);
  const { addtoGrowthModelLi } = useSelector(
    ({ ui }) => ui.modals,
    shallowEqual
  );
  const { addtoGrowthModelArticle } = useSelector(
    ({ ui }) => ui.modals,
    shallowEqual
  );
  const isLoading = useSelector(({ ui }) => ui.isLoading, shallowEqual);
  const dispatch = useDispatch();
  const [instId, setInstid] = useState();
  const [postTypeState, setpostTypeState] = useState();

  const initGModalData = {
    activityCategory: "post",
    activityTitle: "",
    activityId: "",
    activityLink: "",
  };

  const [gmodalData, setGmodalData] = useState(initGModalData);

  const addToGModalToggle = (id = "", title = "", postLink, postDetails) => {
    if (id !== "") {
      setGmodalData((state) => ({
        ...state,
        activityId: id,
        activityTitle: title,
        activityLink: postLink,
        postDetails: postDetails,
      }));
      dispatch(toggleModals({ addtoGrowthModel: true }));
    } else {
      setGmodalData({ ...initGModalData });
      dispatch(toggleModals({ addtoGrowthModel: false }));
    }
  };
  const addToGModalToggleLi = (
    id = "",
    title = "",
    postLink,
    postDetails,
    instituteId
  ) => {
    setInstid(instituteId);
    if (id !== "") {
      setGmodalData((state) => ({
        ...state,
        activityId: id,
        activityTitle: title,
        activityLink: postLink,
        postDetails: postDetails,
        instituteId: instituteId,
      }));
      dispatch(toggleModals({ addtoGrowthModelLi: true }));
    } else {
      setGmodalData({ ...initGModalData });
      dispatch(toggleModals({ addtoGrowthModelLi: false }));
    }
  };

  const initGModalDataArticle = {
    activityCategory: "article",
    activityTitle: "",
    activityId: "",
    activityLink: "",
  };

  const [gmodalDataArt, setGmodalDataArt] = useState(initGModalDataArticle);

  const addToGModalToggleArticle = (
    id = "",
    title = "",
    postLink,
    postDetails,
    postTyp,
    instituteId
  ) => {
    setpostTypeState(postTyp);
    if (id !== "") {
      setGmodalDataArt((state) => ({
        ...state,
        activityId: id,
        activityTitle: title,
        activityLink: postLink,
        postDetails: postDetails,
        instituteId: instituteId,
      }));
      dispatch(toggleModals({ addtoGrowthModelArticle: true }));
    } else {
      setGmodalDataArt({ ...initGModalData });
      dispatch(toggleModals({ addtoGrowthModelArticle: false }));
    }
  };
  if (page === "groups" && !postListData) {
    return null;
  }
  if (isLoading && !postListData?.rows?.length) {
    return <Loader />;
  }

  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/

  const handleOpenPostModal = (data) => {
    setViewpostData(data);
    setOpen(true);
  };
  return (
    <Fragment>
      <InfiniteScroll
        dataLength={
          postListData?.rows !== "" && postListData?.rows?.length > 0
            ? postListData?.rows?.length
            : ""
        }
        next={fetchMorePost}
        hasMore={postListData?.rows?.length !== postListData?.total}
        loader={<Loader />}
      >
        {postListData?.rows?.length > 0 && (
          <Stack gap={3}>
            {postListData?.rows?.map((listData) => {
              const imagePreference = postImageHandler(
                listData?.postDetails?.userDetails,
                listData?.postDetails?.instituteDetails,
                userInfo
              );
              const lastNameFunction = postLastNameHandler(
                listData?.postDetails?.userDetails,
                listData?.postDetails?.instituteDetails,
                userInfo
              );
              let type = listData?.postDetails?.postType;
              return (
                <Card key={listData.id}>
                  {newPostCount === 10 && (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        setCookie(
                          "postToken",
                          moment(new Date()).utc().valueOf()
                        );
                        setNewPostCount(0);
                      }}
                    >
                      {lang("DASHBOARD.POSTS.LOAD_MORE")}
                    </Button>
                  )}

                  <PostHeader
                    listData={listData}
                    userInfo={userInfo}
                    imagePreference={imagePreference}
                    lastNameFunction={lastNameFunction}
                  />

                  <PostBody
                    listData={listData}
                    getAllPost={getAllPost}
                    isEdit={false}
                    type={type}
                    handleOpenPostModal={handleOpenPostModal}
                  />
                  <Divider sx={{ mx: 2 }} />

                  <PostFooter
                    postData={listData}
                    currentUserInfo={userInfo}
                    getAllPost={getAllPost}
                    toggleGMModal={addToGModalToggle}
                    toggleGMModalLI={addToGModalToggleLi}
                    toggleGMModalArticle={addToGModalToggleArticle}
                    imagePreference={imagePreference}
                    searchText={searchText}
                    type={type}
                  />
                </Card>
              );
            })}
          </Stack>
        )}
      </InfiniteScroll>
      {/******************* 
           @purpose : View Post Modal
           @Author : YLIWAY
          ******************/}
      {viewpostData && (
        <ViewPost
          getAllPost={getAllPost}
          // toggleGMModal={addToGModalToggle}
          // toggleGMModalLI={addToGModalToggleLi}
          // toggleGMModalArticle={addToGModalToggleArticle}
          searchText={searchText}
          userInfo={userInfo}
          viewpostData={viewpostData}
          open={open}
          onClose={handleClose}
        />
      )}

      {/******************* 
           @purpose : Add To Gm Modal
           @Author : INIC
           ******************/}

      {instId !== undefined && postTypeState === undefined ? (
        <MainModal
          className="add-to-gmodal modal"
          show={addtoGrowthModelLi}
          keyModal="addtoGrowthModelLi"
          body={
            <AddToGMModal
              toggleGMModal={addToGModalToggleLi}
              data={gmodalData}
              postLI={"postLI"}
              searchText={searchText}
            />
          }
          headerClassName="mb-50 block md-mb-30"
          header={<h2 className="h6 mb-0">{lang("ROOMS.ADD_TO_GM")}</h2>}
        />
      ) : instId === undefined && postTypeState === undefined ? (
        <MainModal
          className="add-to-gmodal modal"
          show={addtoGrowthModel}
          keyModal="addtoGrowthModel"
          body={
            <AddToGMModal
              toggleGMModal={addToGModalToggle}
              data={gmodalData}
              postDash={"postDash"}
              searchText={searchText}
            />
          }
          headerClassName="mb-50 block md-mb-30"
          header={
            <h2 className="h6 mb-0 font-16">{lang("ROOMS.ADD_TO_GM")}</h2>
          }
        />
      ) : postTypeState === "article" ||
        postTypeState === "Article" ||
        postTypeState === "ARTICLE" ? (
        <MainModal
          className="add-to-gmodal modal"
          show={addtoGrowthModelArticle}
          keyModal="addtoGrowthModelArticle"
          body={
            <AddToGMModal
              toggleGMModal={addToGModalToggleArticle}
              data={gmodalDataArt}
              postArticle={"postArticle"}
              searchText={searchText}
            />
          }
          headerClassName="mb-50 block md-mb-30"
          header={<h2 className="h6 mb-0">{lang("ROOMS.ADD_TO_GM")}</h2>}
        />
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default DashboardPost;
