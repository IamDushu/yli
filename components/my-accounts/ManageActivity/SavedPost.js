import Posts from "components/dashboard/Posts";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postListing } from "store/actions";
import { selectUserInfo } from "store/selectors/user";
import InfiniteScroll from "react-infinite-scroll-component";
import { useTranslation } from "react-i18next";
const SavedPost = () => {
  const { postListData } = useSelector((state) => state.post);
  const [lang] = useTranslation("language");
  const [loading, setLoading] = useState(false);
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const [body, setBody] = useState({
    page: 1,
    pagesize: 5,

    postType: "savedPost",
  });
  useEffect(() => {
    getAllPost();
  }, [body]);

  useEffect(() => {
    if (!loading) {
      setLoading(true)
    }
  }, [])

  /******************* 
  @Purpose : Used for get All post
  @Parameter : {}
  @Author : INIC
  ******************/
  const getAllPost = async () => {
    setTimeout(async () => {
      try {
        setLoading(true);
        await dispatch(postListing(body));
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false);
      }
    }, 1000);
  };
  /******************* 
  @Purpose : Used for get more post
  @Parameter : 
  @Author : INIC
  ******************/

  const fetchMorePost = () => {
    setBody({ ...body, pagesize: body.pagesize + 5 });
  };
  return (
    <Fragment>
      {postListData?.rows?.length === 0 || (!postListData && !loading) ? (
        <div>
          <div className="row">
            <div className="col-md-9  text-center mx-auto">
              <picture className="mb-3 icon-manage-activities">
                <span className="material-icons mb-3">bookmark</span>
              </picture>
              <h5 className="">
                {lang(
                  "MY_ACCOUNTS.MANAGE_ACTIVITIES.SAVED_POSTS.NO_SAVED_POST"
                )}
              </h5>
              <p className="mb-0">
                {lang(
                  "MY_ACCOUNTS.MANAGE_ACTIVITIES.SAVED_POSTS.NO_SAVED_POST_DESCRIPTION"
                )}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <InfiniteScroll
          dataLength={
            postListData?.rows !== "" && postListData?.rows?.length > 0
              ? postListData?.rows?.length
              : ""
          }
          next={fetchMorePost}
          hasMore={postListData?.total}
        >
          <div className="save-post-list">
            <Posts
              postListData={postListData}
              userInfo={userInfo}
              getAllPost={getAllPost}
              fetchMorePost={fetchMorePost}
            />
          </div>
        </InfiniteScroll>
      )}
    </Fragment>
  );
};

export default SavedPost;
