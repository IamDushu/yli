import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { selectUserInfo } from "store/selectors/user";
import { postImageHandler, postLastNameHandler } from "utils";
import PostDescription from "./PostDescription";
import PostDocument from "./PostDocument";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostPoll from "./PostPoll";
import PostVideo from "./PostVideo";

const SharePost = ({ listData, type, getAllPost }) => {
  const userInfo = useSelector(selectUserInfo);
  /******************* 
  @purpose : Set Image Preference
  @Author : INIC
  ******************/

  return (
    <div className="border-top border-color-primary mt-2 pt-3">
      {listData?.postShareDetails?.userDetails && (
        <PostHeader
          listData={listData}
          type="share"
          imagePreference={postImageHandler(
            listData?.postShareDetails?.userDetails,
            listData?.postShareDetails?.instituteDetails,
            userInfo
          )}
          lastNameFunction={postLastNameHandler(
            listData?.postShareDetails?.userDetails,
            listData?.postShareDetails?.instituteDetails,
            userInfo
          )}
        />
      )}
      {listData?.postShareDetails.postType !== "article" && (
        <h4 className="px-3">{listData?.postShareDetails?.title}</h4>
      )}
      <PostDescription
        description={listData?.postShareDetails?.description}
        isShared={true}
        postType={listData?.postShareDetails?.postType}
      />
      {listData?.postShareDetails?.imageURL && (
        <PostImage listData={listData} type="share" isShared={true} />
      )}
      {listData?.postShareDetails?.videoURL && (
        <PostVideo listData={listData} type="share" isShared={true} />
      )}
      {/* Document Post Section */}
      {listData?.postShareDetails?.documentURL !== undefined &&
      listData?.postShareDetails?.documentURL !== null ? (
        <PostDocument listData={listData} type="share" />
      ) : null}
      {listData?.postShareDetails?.pollDetails
        ? listData?.postShareDetails?.pollDetails?.map((poll, index) => (
            <div className="col-sm-12 mb-3" key={index}>
              <PostPoll poll={poll} getAllPost={getAllPost} />
            </div>
          ))
        : null}
    </div>
  );
};

export default SharePost;
