import { LinkPreviewGenerator } from "components/ui/link-preview";
import { replace } from "lodash";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import ReactHtmlParser from "react-html-parser";
import { detectURLs, urlify } from "utils";
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

  return (
    <Fragment>
      {!isEdit && (
        <div
          className={
            type === "postShare"
              ? `font-14 overflow-auto w-100 link-blue ${
                  articleSubtitle ? "" : "pb-3"
                }`
              : `font-14 overflow-auto w-100 link-blue ${
                  articleSubtitle ? "" : "pb-3"
                }`
          }
        >
          {type === "article" &&
            router.pathname === "/profile/institute-profile" && (
              <>
                <div className="px-3 pt-3">
                  <h4 className="mb-3 font-16 font-weight-bold">
                    {articleSubtitle}
                  </h4>
                  {isReadMore
                    ? ReactHtmlParser(`${description?.slice(0, 500)}`)
                    : ReactHtmlParser(description)}
                  {description?.length > 500 && (
                    <span
                      className="ml-1 text-primary font-weight-semibold cursor-pointer"
                      onClick={toggleReadMore}
                    >
                      {isReadMore ? "Read more" : "Read less"}
                    </span>
                  )}
                </div>
              </>
            )}
          {type === "article" || postType === "article" ? (
            <></>
          ) : (
            <>
              <div className="px-3 text-secondary">
                {isReadMore && description?.length > 500 ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `${replaceLinkWithAnchorTag(
                        description?.slice(0, 500)
                      )}...`,
                    }}
                  />
                ) : (
                  <div>
                    {!isEdit && (
                      <Card.Text className="font-14 mb-3">
                        {ReactHtmlParser(
                          description?.replaceAll("\n", "<br />")
                        )}
                      </Card.Text>
                    )}
                  </div>
                )}
                {description?.length > 500 && (
                  <span
                    className="ml-1 text-primary font-weight-semibold cursor-pointer"
                    onClick={toggleReadMore}
                  >
                    {isReadMore ? "Read more" : "Read less"}
                  </span>
                )}
              </div>
              {postPreviewUrl.length > 0 && (
                <LinkPreviewGenerator url={postPreviewUrl[0]} />
              )}
            </>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default PostDescription;
