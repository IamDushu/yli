import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import PostFooter from "components/dashboard/Posts/PostFooter";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { toggleModals } from "store/actions";
import { postImageHandler, timeAgo } from "utils";
import { Avatar, Stack, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

// videoURL
export default function ViewPost({
  viewpostData,
  open,
  onClose,
  userInfo,
  getAllPost,
  searchText,
}) {
  const [shareopen, setShareopen] = useState(false);
  const { addtoGrowthModel } = useSelector(({ ui }) => ui.modals, shallowEqual);
  const { addtoGrowthModelLi } = useSelector(
    ({ ui }) => ui.modals,
    shallowEqual
  );
  const { addtoGrowthModelArticle } = useSelector(
    ({ ui }) => ui.modals,
    shallowEqual
  );
  const { sharepost } = useSelector(({ ui }) => ui.modals, shallowEqual);
  useEffect(() => {
    if (
      sharepost === true ||
      addtoGrowthModel === true ||
      addtoGrowthModelLi === true ||
      addtoGrowthModelArticle === true
    ) {
      setShareopen(true);
    } else {
      setShareopen(false);
    }
  }, [
    sharepost,
    addtoGrowthModel,
    addtoGrowthModelLi,
    addtoGrowthModelArticle,
  ]);
  const apostData = {
    userProfilePicture:
      viewpostData?.postDetails?.userDetails?.profilePicURL ||
      viewpostData?.postDetails?.companyDetails?.logo,
    username: viewpostData?.postDetails?.userDetails?.firstName,
    location: viewpostData?.postDetails?.userDetails?.currentPosition,
    postImage: "assets/images/post1.png",
    caption: "The comment caption",
    postDetails:
      viewpostData?.postDetails?.description ||
      viewpostData?.postShareDetails?.description,
    comments: [
      { username: "user1", text: "cool" },
      { username: "user2", text: "cool" },
    ],
  };
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
  const imagePreference = postImageHandler(
    viewpostData?.postDetails?.userDetails,
    viewpostData?.postDetails?.instituteDetails,
    userInfo
  );
  let type = viewpostData?.postDetails?.postType;
  return (
    <>
      <Modal
        open={shareopen === true ? false : open}
        onClose={onClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{ ...style }}
          className={
            viewpostData?.postDetails?.imageURL === null &&
            viewpostData?.postDetails?.videoURL === null
              ? "no-image"
              : "post-detail"
          }
        >
          {/* Post Image: viewpostData?.postDetails?.videoURL?.length === undefined ? "no-image" */}
          <div
            className={"post-image"}
            style={{
              display:
                viewpostData?.postDetails?.imageURL &&
                viewpostData?.postDetails?.videoURL === null
                  ? "no-image"
                  : "block",
            }}
          >
            {viewpostData?.postDetails?.imageURL !== null ? (
              <img src={viewpostData?.postDetails?.imageURL} alt="Post" />
            ) : null}
            {viewpostData?.postDetails?.videoURL !== null ? (
              <video controls>
                <source
                  src={viewpostData?.postDetails?.videoURL}
                  type="video/mp4"
                />
              </video>
            ) : null}
          </div>
          {/* Sidebar */}
          <div className={"post-side"}>
            <Stack
              width={"100%"}
              direction={"row"}
              gap={2}
              alignItems={"center"}
            >
              <Avatar
                sx={{ width: 56, height: 56 }}
                src={apostData.userProfilePicture}
                alt="Profile"
              />
              <Stack gap={0} width={"100%"}>
                <Stack direction={"row"} alignItems={"center"} width={"100%"}>
                  <Box flex={1}>
                    <Typography variant="titleMedium">
                      {apostData.username} {""}{" "}
                      {viewpostData?.postDetails?.userDetails?.lastName
                        ? viewpostData?.postDetails?.userDetails?.lastName
                        : ""}
                    </Typography>
                  </Box>
                  <Typography variant="labelSmall">
                    {timeAgo(viewpostData?.postDetails?.createdAt)} ago
                  </Typography>
                </Stack>
                {apostData.location && (
                  <Typography variant={"bodyMedium"}>
                    {apostData.location}
                  </Typography>
                )}
              </Stack>
            </Stack>
            <div className={"post-actions"}>
              <p
                className={"post-details-d"}
                dangerouslySetInnerHTML={{ __html: apostData.postDetails }}
              />
              <PostFooter
                postData={viewpostData}
                currentUserInfo={userInfo}
                getAllPost={getAllPost}
                toggleGMModal={addToGModalToggle}
                toggleGMModalLI={addToGModalToggleLi}
                toggleGMModalArticle={addToGModalToggleArticle}
                imagePreference={imagePreference}
                searchText={searchText}
                type={type}
              />
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}
