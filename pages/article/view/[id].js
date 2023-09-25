import PostFooter from "components/dashboard/Posts/PostFooter";
import { Layout } from "components/layout";
import { Loader } from "components/ui/loader";
import WithAuth from "components/with-auth/with-auth";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePost } from "store/actions";
import { selectUserInfo } from "store/selectors/user";
import { onImageError } from "utils";

function ArticleById() {
  const router = useRouter();
  const dispatch = useDispatch();
  const postId = router.query.id;

  const [loading, setLoading] = useState(true);

  const { singlePost } = useSelector((state) => state.post);
  const userInfo = useSelector(selectUserInfo);
  const firstName =
    singlePost?.postDetails?.companyId ?? singlePost?.postDetails?.instituteId
      ? singlePost?.postDetails?.companyDetails?.name ??
        singlePost?.postDetails?.instituteDetails?.name
      : singlePost?.postDetails?.userDetails?.firstName;
  const lastName =
    singlePost?.postDetails?.companyId ?? singlePost?.postDetails?.instituteId
      ? ""
      : singlePost?.postDetails?.userDetails?.lastName;
  useEffect(() => {
    getPostById();
  }, []);

  useEffect(() => {
    if (singlePost) {
      setLoading(false);
    }
  }, [singlePost]);

  async function getPostById() {
    await dispatch(getSinglePost(postId));
  }

  if (loading) {
    return (
      <Layout>
        <Container className="mt-2">
          <Loader />
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <div
        className="inner-wrapper"
        style={{
          backgroundColor: "#FFFFFF",
        }}
      >
        <div className="overflow-hidden" style={{ position: "relative" }}>
          <div
            className="w-100 mb-1 article-bg-image"
            style={{
              backgroundImage: `url(${singlePost?.postDetails?.imageURL})`,
            }}
          ></div>
          <Image
            src={singlePost?.postDetails?.imageURL}
            className="article-image"
            height="400"
          />
        </div>

        <Container className="h-auto">
          <Row>
            <Col md={8} lg={6} className="mx-auto">
              <div
                id="article-subtitle-container"
                className="mt-4"
                style={{
                  fontWeight: 700,
                  color: "#051F4E",
                  fontSize: "1.5rem",
                }}
              >
                {singlePost?.postDetails?.title}
              </div>

              <div id="article-author-details" className="">
                <hr />
                <Row>
                  <Col md={6}>
                    <div className="article-author-info-container mb-3 mb-md-0">
                      <span className="pic-wrap ml-0">
                        <picture onContextMenu={(e) => e.preventDefault()}>
                          <source
                            srcSet={
                              singlePost?.postDetails?.companyId ??
                              singlePost?.postDetails?.instituteId
                                ? singlePost?.postDetails?.companyDetails
                                    ?.logo ??
                                  singlePost?.postDetails?.instituteDetails
                                    ?.logo
                                : singlePost?.postDetails?.userDetails
                                    ?.profilePicURL
                            }
                            type="image/png"
                          />
                          <img
                            src={
                              singlePost?.postDetails?.companyId ??
                              singlePost?.postDetails?.instituteId
                                ? singlePost?.postDetails?.companyDetails
                                    ?.logo ??
                                  singlePost?.postDetails?.instituteDetails
                                    ?.logo ??
                                  ""
                                : singlePost?.postDetails?.userDetails
                                    ?.profilePicURL
                            }
                            alt="Upload Profile Pic"
                            onError={(e) => {
                              onImageError(
                                e,
                                "profile",
                                `${firstName} ${lastName}`
                              );
                            }}
                            className="img-fluid h-100"
                          />
                        </picture>
                      </span>
                      <div className="d-flex flex-column">
                        <span id="article-author-name">
                          {firstName} {lastName}
                        </span>
                        <span id="article-author-position">
                          {singlePost?.postDetails?.userDetails
                            ?.currentPosition ?? ""}
                        </span>
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div
                      className="d-flex justify-content-md-end"
                      id="article-date"
                    >
                      <span>
                        {moment(singlePost?.postDetails?.createdAt).format(
                          "DD/MM/YYYY"
                        )}
                      </span>
                    </div>
                  </Col>
                </Row>
                <hr />
                <div>
                  <span className="pt-2 pb-4 d-flex article-subtitle">
                    {singlePost?.postDetails?.subTitle}
                  </span>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: singlePost?.postDetails?.description || "",
                    }}
                  />
                </div>
              </div>
              <PostFooter
                postData={singlePost}
                currentUserInfo={userInfo}
                type={singlePost?.postDetails?.postType}
                getAllPost={getPostById}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}

export default WithAuth(ArticleById);
