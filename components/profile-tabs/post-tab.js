import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postListing } from "store/actions";
import { selectUserInfo } from "store/selectors/user";
import Posts from "../dashboard/Posts";
import { useRouter } from "next/router";

const PostTabs = ({ groupId }) => {
  const dispatch = useDispatch();

  /******************* 
  @Purpose : Used for useSelectors
  @Parameter : 
  @Author : INIC
  ******************/

  const { postListData } = useSelector((state) => state.post);
  const userInfo = useSelector(selectUserInfo);
  const router = useRouter();
  const { instituteId, companyId } = router.query;

  /******************* 
  @Purpose : Used for useState
  @Parameter : {}
  @Author : INIC
  ******************/
  const [body, setBody] = useState({
    page: 1,
    pagesize: 10,
    groupId: groupId ? groupId : "",
    postType: "",
    instituteId: instituteId,
    ...(companyId !== undefined &&
      companyId !== null &&
      companyId !== "" && { companyId }),
  });

  useEffect(() => {
    if (instituteId) {
      setBody({ ...body, instituteId: instituteId });
    }
    if (companyId) {
      setBody({ ...body, companyId });
    }
  }, [instituteId, companyId]);

  /******************* 
  @Purpose : Used for useEffect
  @Parameter : {}
  @Author : INIC
  ******************/

  useEffect(() => {
    if (body.instituteId || body.companyId) {
      getAllPost();
    }
  }, [body]);

  /******************* 
  @Purpose : Used for get All post
  @Parameter : {}
  @Author : INIC
  ******************/
  const getAllPost = async () => {
    setTimeout(() => {
      dispatch(postListing(body, false));
    }, 1000);
  };

  /******************* 
  @Purpose : Used for get more post
  @Parameter : 
  @Author : INIC
  ******************/

  const fetchMorePost = () => {
    setBody({ ...body, pagesize: body.pagesize + 10 });
  };

  return (
    <Fragment>
      <Posts
        postListData={postListData}
        userInfo={userInfo}
        getAllPost={getAllPost}
        fetchMorePost={fetchMorePost}
      />
    </Fragment>
  );
};
export default PostTabs;
