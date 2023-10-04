import { Box, Button, Stack, Typography, styled } from "@mui/material";
import { LinkPreviewGenerator } from "components/ui/link-preview";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { detectURLs } from "utils";
/******************** 
@purpose : Post Description
@Parameter : { description, isEdit }
@Author : INIC
******************/
const PostDescription = ({
  description,
  isEdit,
  type,
  articleSubtitle,
  postType,
  title,
  id,
}) => {
  const router = useRouter();
  const [postPreviewUrl, setPostPreviewUrl] = useState([]);
  const [isReadMore, setIsReadMore] = useState(true);
  /******************* 
  @purpose : Used for linkPreview
  @Parameter : {}
  @Author : INIC
  ******************/
  useEffect(() => {
    let url = detectURLs(description);
    if (url) {
      setPostPreviewUrl(url);
    } else {
      setPostPreviewUrl([]);
    }
  }, [description]);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  function replaceLinkWithAnchorTag(text = "") {
    if (!text || typeof text !== "string") {
      return "";
    } else {
      const regex =
        /\b((?:https?|ftp):\/\/[^\s/$.?#]+\.[^\s]*)|\b(?:[^\s/$.?#]+\.[^\s/$.?#]+)\b/g;

      return text.replace(regex, (match, protocol, domain) => {
        const url = protocol ? match : `http://${match}`;
        return `<a href="${url}" target="_blank" rel="noopener noreferrer">${match}</a>`;
      });
    }
  }

  const PostContentTypography = styled(Typography)(({ theme }) => ({
    [`& a`]: {
      color: theme.palette.primary["light"],
    },
  }));

  return (
    <Fragment>
      {(title || articleSubtitle) && (
        <Stack mt={2} gap={1}>
          <Link passHref href={`/post/${id}`}>
            <Typography sx={{ cursor: "pointer" }} variant="titleSmall">
              {title}
            </Typography>
          </Link>
          <Link passHref href={`/post/${id}`}>
            <Typography sx={{ cursor: "pointer" }} variant="bodySmall">
              {articleSubtitle}
            </Typography>
          </Link>
        </Stack>
      )}
      {!isEdit && (
        <Box mb={type === "photo" ? 3 : 0}>
          {type === "article" &&
            router.pathname === "/profile/institute-profile" && (
              <>
                <div className="px-3 pt-3">
                  {isReadMore
                    ? ReactHtmlParser(`${description?.slice(0, 500)}`)
                    : ReactHtmlParser(description)}
                  {description?.length > 500 && (
                    <Button
                      sx={{ mt: 1 }}
                      size="small"
                      onClick={toggleReadMore}
                    >
                      {isReadMore ? "Read more" : "Read less"}
                    </Button>
                  )}
                </div>
              </>
            )}
          {type === "article" || postType === "article" ? (
            <></>
          ) : (
            <>
              <Typography variant="bodyMedium">
                {isReadMore && description?.length > 500 ? (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: `${replaceLinkWithAnchorTag(
                        description?.slice(0, 500)
                      )}`,
                    }}
                  />
                ) : (
                  <span>
                    {!isEdit && (
                      <PostContentTypography variant="bodyMedium">
                        {ReactHtmlParser(
                          description?.replaceAll("\n", "<br />")
                        )}
                      </PostContentTypography>
                    )}
                  </span>
                )}
                {description?.length > 500 && (
                  <Typography
                    component={"span"}
                    sx={{ cursor: "pointer" }}
                    onClick={toggleReadMore}
                    color={"primary.light"}
                    variant="bodyMedium"
                    ml={2}
                  >
                    {isReadMore ? "...read more" : "...read less"}
                  </Typography>
                )}
              </Typography>
              {postPreviewUrl.length > 0 && (
                <LinkPreviewGenerator url={postPreviewUrl[0]} />
              )}
            </>
          )}
        </Box>
      )}
    </Fragment>
  );
};

export default PostDescription;
