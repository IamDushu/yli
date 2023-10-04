import React from "react";
import { onImageError } from "utils";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
/******************** 
@purpose :  Dashboard Post Image
@Parameter : {listData, type}
@Author : INIC
******************/
const PostImage = ({ listData, type, isShared }) => {
  const articleSubTitle = listData?.postDetails?.postType
    ? listData?.postDetails?.title || listData?.postShareDetails?.title
    : null;
  const shouldShowImageOverlay =
    (listData?.postDetails?.postType === "article" ||
      listData?.postShareDetails?.postType === "article") &&
    !!articleSubTitle;

  const router = useRouter();

  function navigateToArticle() {
    router.push(`/article/view/${listData?.id}`);
  }

  return (
    <Box mb={isShared ? 1 : 0}>
      {listData?.postDetails ? (
        <picture width="100%" onContextMenu={(e) => e.preventDefault()}>
          <source
            srcSet={
              type
                ? listData?.postShareDetails?.imageURL
                : listData?.postDetails?.imageURL
            }
            type="image/jpg"
          />
          <img
            src={
              type
                ? listData?.postShareDetails?.imageURL
                : listData?.postDetails?.imageURL
            }
            onError={(e) => {
              onImageError(e);
            }}
            width="100%"
            height="100%"
          />
        </picture>
      ) : null}
    </Box>
  );
};

export default PostImage;
