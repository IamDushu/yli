import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Layout } from "@components/layout";
import { Loader } from "components/ui";
import {
  MyProfile,
  RecentAddedGM,
  MostFollowedContents,
  Add,
  GrowthModal,
  OtherViews,
  GrowthPartners,
  FollowedGroup,
} from "components/sidebar";
import { Card } from "react-bootstrap";
import { Helmet } from "react-helmet";
import PostHeader from "components/dashboard/Posts/PostHeader";
import PostBody from "components/dashboard/Posts/PostBody";
import PostFooter from "components/dashboard/Posts/PostFooter";
import withAuth from "../../components/with-auth/with-auth";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePost, toggleModals } from "store/actions";
import { selectUserInfo } from "store/selectors/user";
import { postImageHandler, postLastNameHandler, removeHTMLTags } from "utils";
import NoPermission from "components/no-permission";

const ViewPost = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [lang] = useTranslation("language");
  const { postId } = router.query;
  const { singlePost } = useSelector((state) => state.post);
  const userInfo = useSelector(selectUserInfo);
  const [havePermission, setHavePermission] = useState(true);
  useEffect(() => {
    getsinglePost().then(() => setIsLoading(false));
  }, []);

  /******************* 
  @Purpose : Used for get single post
  @Parameter : {}
  @Author : INIC
  ******************/
  const getsinglePost = async () => {
    const res = await dispatch(getSinglePost(postId));
    if (res.data.havePermission === false) {
      setHavePermission(false);
    }
  };
  const initGMData = {
    activityCategory: "post",
    activityTitle: "",
    activityId: "",
    activityLink: "",
  };
  const [gmData, setGmData] = useState(initGMData);
  const [isLoading, setIsLoading] = useState(true);

  const addToGMToggle = (id = "", title = "") => {
    if (id !== "") {
      setGmData((state) => ({
        ...state,
        activityId: id,
        activityTitle: title,
        activityLink: "/post/" + id,
      }));
      dispatch(toggleModals({ addtogm: true }));
    } else {
      setGmData({ ...initGMData });
      dispatch(toggleModals({ addtogm: false }));
    }
  };

  // Extract necessary data for og:image, og:title, og:description
  const ogImage = singlePost?.postDetails?.imageURL || "post image";
  const ogTitle = singlePost?.postDetails?.title || "post title";
  const ogDescription = singlePost?.postDetails?.description
    ? removeHTMLTags(singlePost?.postDetails?.description).slice(0, 300)
    : "post description";
  return (
    // post detail page
    <Layout>
      <Helmet>
        <meta property="og:image" content={ogImage} />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
      </Helmet>
      <div className="inner-wrapper dashboard-box">
        <Container>
          <div className="d-flex flex-xl-nowrap flex-wrap">
            {/* left profile section */}
            <div className="left-profile-section">
              <MyProfile />
              <GrowthModal />
              <Add />
            </div>
            {/* post view */}
            {isLoading ? (
              <div className="post-section mt-3 mt-md-0">
                <Loader />
              </div>
            ) : singlePost !== "" ? (
              <div className="post-section">
                <Card className="mb-10 post-views">
                  <Card.Body>
                    <PostHeader
                      listData={singlePost}
                      userInfo={userInfo}
                      getAllPost={getsinglePost}
                      imagePreference={postImageHandler(
                        singlePost?.postDetails?.userDetails,
                        singlePost?.postDetails?.instituteDetails,
                        userInfo
                      )}
                      lastNameFunction={postLastNameHandler(
                        singlePost?.postDetails?.userDetails,
                        singlePost?.postDetails?.instituteDetails,
                        userInfo
                      )}
                    />
                    <PostBody
                      listData={singlePost}
                      getAllPost={getsinglePost}
                    />
                    <PostFooter
                      postData={singlePost}
                      currentUserInfo={userInfo}
                      postDetails={singlePost.postDetails}
                      getAllPost={getsinglePost}
                      toggleGMModal={addToGMToggle}
                    />
                  </Card.Body>
                </Card>
              </div>
            ) : (
              <div className="post-section">
                <Card className="mb-10 post-views">
                  <Card.Body className="py-5">
                    <Row>
                      <Col md={8} lg={6} className="mx-auto text-center">
                        <img
                          src="/assets/images/no-permission-img.svg"
                          alt=""
                          className="mb-5"
                        />
                        <h4 className="mb-1 font-weight-bold font-18">
                          {lang("POST_DEATAIL.NO_POST_FOUND")}
                        </h4>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </div>
            )}
            {!havePermission && <NoPermission />}
            {/* right blog section */}
            <div className="right-blog-section">
              <OtherViews />
              <GrowthPartners />
              <RecentAddedGM />
              <FollowedGroup />
              <MostFollowedContents />
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default withAuth(ViewPost);
