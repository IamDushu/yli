import React, { Fragment } from "react";
import PostImage from "./PostImage";
import PostVideo from "./PostVideo";
import PostDocument from "./PostDocument";
import PostPoll from "./PostPoll";
import SharePost from "./SharePost";
import PostDescription from "./PostDescription";
import { Card } from "react-bootstrap";
import ReactHtmlParser from "react-html-parser";
import { urlify } from "utils";
import { LinkPreviewGenerator } from "components/ui/link-preview";
import { APP_URL } from "config";

const PostBody = ({ listData, getAllPost, isEdit, type }) => {
  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  return (
    <div className="mb-0">
      {listData?.postDetails?.title &&
        listData?.postDetails?.postType !== "article" && (
          <h4 className="px-3 pt-3 text-center">
            {listData?.postDetails?.title}
          </h4>
        )}
      {(type === "courseShare" || type === "virtualShare") && (
        <PostDescription
          description={listData?.postDetails?.description}
          isEdit={isEdit}
          type={type}
        />
      )}
      {(listData?.postDetails?.postType === "virtualShare" ||
        listData?.postDetails?.postType === "courseShare") && (
        <Fragment>
          <LinkPreviewGenerator
            url={
              listData?.postDetails?.eventExternalLink
                ? listData?.postDetails?.eventExternalLink
                : `${APP_URL}/${
                    listData?.postDetails?.postType === "courseShare"
                      ? `course-detail/${listData?.postDetails?.courseId}`
                      : `virtual-events/${listData?.postDetails?.virtualEventId}/false`
                  }`
            }
            image={
              listData?.postDetails?.courseDetails?.imageURL ||
              listData?.postDetails?.virtualDetails?.imageURL ||
              ""
            }
            title={
              listData?.postDetails?.courseDetails?.title ||
              listData?.postDetails?.virtualDetails?.title ||
              ""
            }
          />
        </Fragment>
      )}
      <div>
        {type !== "article" &&
          type !== "courseShare" &&
          type !== "virtualShare" && (
            <PostDescription
              description={listData?.postDetails?.description}
              isEdit={isEdit}
              type={type}
            />
          )}

        {/* Image Post Section */}
        {listData?.postDetails?.imageURL && <PostImage listData={listData} />}
        {/* Video Post Section */}
        {listData?.postDetails?.videoURL !== null ? (
          <PostVideo listData={listData} />
        ) : null}
        {/* Document Post Section */}
        {listData?.postDetails?.documentURL !== null ? (
          <PostDocument listData={listData} />
        ) : null}
        {/* Poll Post Section */}
        {listData?.pollDetails
          ? listData?.pollDetails?.map((poll, index) => (
              <div className="col-sm-12 p-0" key={index}>
                <PostPoll
                  poll={poll}
                  getAllPost={getAllPost}
                  postUserId={listData.postDetails.userId}
                />
              </div>
            ))
          : null}
        {type === "article" && (
          <PostDescription
            description={listData?.postDetails?.description}
            isEdit={isEdit}
            type={type}
            articleSubtitle={listData?.postDetails?.subTitle}
          />
        )}
      </div>

      {listData.postShareDetails !== null && (
        <div className="">
          <SharePost listData={listData} getAllPost={getAllPost} type="share" />
        </div>
      )}
    </div>
  );
};

export default PostBody;
