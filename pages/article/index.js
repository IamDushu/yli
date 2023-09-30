import React, { useEffect, useState } from "react";
import { Layout } from "@components/layout";
import Grid from "@mui/material/Grid";
import CustomCkEditor from "components/form-fields/ckEditor/CkEditor";
import WithAuth from "components/with-auth/with-auth";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Container,
  Button,
  Dropdown,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import Select from "react-select";
import {
  RecentAddedGM,
  MostFollowedContents,
  GrowthPartners,
  GrowthModal,
  UpgradeYourProfile,
  FollowedGroup,
} from "components/sidebar";
import { getGroupDetailsByID, toggleModals } from "store/actions";
import { shareArticleModal } from "../../store/actions/ui";
import {
  selectArticleData,
  selectGetArticleData,
} from "../../store/selectors/article";
import CropImages from "components/CropImages/CropImages";
import {
  createArticle,
  articleListing,
  deleteArticle,
  getArticleData,
} from "../../store/actions/article";
import { useTranslation } from "react-i18next";
import TagsComponent from "components/courses/upload-course/tags-field";
import { useFormik } from "formik";
import { ARTICLE_VALIDATION } from "utils";
import { TextField } from "components/form-fields";
import { CustomInputField } from "components/add-post-ui/custom-text-field";
import { CustomAutocomplete } from "components/add-post-ui/custom-autocomplete";
import { YliwayButton } from "components/button";
import Image from "next/image";
import { ArticleCard } from "components/add-post-ui/article-card";
import { selectUserInfo } from "store/selectors/user";
import { DraftCardUi } from "components/add-post-ui/draft-card-ui";
import DeletedArticleListing from "components/article-components/deleted-articles";

/******************** 
  @purpose :  Article
  @Parameter : {}
  @Author : INIC
  ******************/
function Article() {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const router = useRouter();
  const userInfo = useSelector(selectUserInfo);
  const articles = useSelector(selectArticleData);
  const data = useSelector(selectGetArticleData);
  const [draftCount,setDraftCount] = useState(0);
  const [publishedCount,setPublishedCount] = useState(0);
  const [scrollToError, setScrollToError] = useState(false);
  const [updateCount,setUpdateCount] = useState(0);

  const statusList = [
    {
      value: "newArticle",
      label: lang("ATRICLE.NEW_ARTICLE"),
    },
    {
      value: "published",
      label: lang("ATRICLE.PUBLISHED_ARTICLE"),
    },
    {
      value: "drafted",
      label: lang("ATRICLE.DRAFTED_ARTICLE"),
    },
    {
      value: "deleted",
      label: lang("ATRICLE.DRAFTED_ARTICLE"),
    },
  ];

  const initialValues = {
    id: "",
    groupId: "",
    postId: "",
    tags: [],
    title: "",
    subTitle: "",
    description: "",
    articleStatus: "",
    publishedStatus: "",
    selectedFile: null,
    status: statusList[0],
    isAdd: true,
    isEdit: false,
    articleType: "",
    type: "",
  };

  useEffect(() => {
    if (scrollToError) {
      const errorField = document.querySelector(".error");
      if (errorField && errorField.textContent.trim().length > 0) {
        const { top, bottom } = errorField.getBoundingClientRect();
        const isFullyVisible = top >= 0 && bottom <= window.innerHeight;

        if (!isFullyVisible) {
          errorField.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      } else {
        // Scroll to top of the form if there are no visible error fields
        const form = document.querySelector(".form");
        form.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setScrollToError(false);
    }
  }, [scrollToError]);

  useEffect(() => {
    const isEditOrDrafted = router?.query?.id || router?.query?.draftedId;
    if (!isEditOrDrafted) {
      setDefaultDataForArticle();
    }
  }, []);

  useEffect(() => {
    let payload = {
      page: 1,
      pagesize: 10,
      publishedStatus: "published",
      ...(router.query?.groupId !== undefined &&
        router.query?.groupId !== "" && { groupId: router.query?.groupId }),
    };
    dispatch(articleListing(payload)).then((res) => {
      setPublishedCount(res?.total);
    });

    payload = {
      page: 1,
      pagesize: 10,
      publishedStatus: "drafted",
      ...(router.query?.groupId !== undefined &&
        router.query?.groupId !== "" && { groupId: router.query?.groupId }),
    };

    dispatch(articleListing(payload)).then((res) => {
      setDraftCount(res?.total);
    });
  }, [updateCount]);

  useEffect(() => {
    if (router?.query?.id || router?.query?.draftedId) {
      const isDraftedArticle = !!router?.query?.draftedId;
      dispatch(
        getArticleData(
          router?.query?.id || router?.query?.draftedId,
          isDraftedArticle
        )
      );
      formik.setFieldValue("status", {
        value: "published",
        label: lang("ATRICLE.PUBLISHED_ARTICLE"),
      });
      formik.setFieldValue("isEdit", true);
    } else {
      setDefaultDataForArticle();
    }
  }, [router.query]);

  function setDefaultDataForArticle() {
    setTimeout(() => {
      const isEditOrDrafted = router?.query?.id || router?.query?.draftedId;
      if (isEditOrDrafted) {
        return;
      }

      formik.setFieldValue("id", "");
      formik.setFieldValue("postId", "");
      formik.setFieldValue("title", "");
      formik.setFieldValue("subTitle", "");
      formik.setFieldValue("selectedFile", "");
      formik.setFieldValue("description", "");
      formik.setFieldValue("articleStatus", "");
      formik.setFieldValue("tags", []);
      formik.setFieldValue("isAdd", true);
      formik.setFieldValue("isEdit", false);
      formik.setFieldValue("status", {
        value: "newArticle",
        label: lang("ATRICLE.NEW_ARTICLE"),
      });
    }, 0);
  }

  useEffect(() => {
    if (data) {
      const postDetails = data?.postDetails?.[0];
      formik.setFieldValue("id", data?.id);
      formik.setFieldValue("postId", data?.postId);
      formik.setFieldValue("title", data?.title);
      formik.setFieldValue("selectedFile", data?.imageURL);
      formik.setFieldValue("description", data?.description);
      formik.setFieldValue("publishedStatus", data?.publishedStatus);
      data?.groupId !== undefined &&
        data?.groupId !== "" &&
        formik.setFieldValue("groupId", data?.groupId);
      formik.setFieldValue("subTitle", data?.subTitle);

      if (postDetails) {
        formik.setFieldValue("subTitle", postDetails?.subTitle);
        if (
          postDetails.tags &&
          postDetails.tags?.length &&
          Array.isArray(postDetails.tags)
        ) {
          formik.setFieldValue("tags", postDetails.tags);
        }
      } else if (data?.tags) {
        formik.setFieldValue("tags", (data?.tags || []));
      }
    }
  }, [data]);

  const formik = useFormik({
    initialValues,
    validationSchema: ARTICLE_VALIDATION(lang),
    onSubmit: async (values) => {
      let data = {
        ...(values !== "" && {
          id: values?.id !== "" ? values?.id : undefined,
        }),
        title: values?.title,
        subTitle: values?.subTitle,
        description: values?.description,
        imageURL: values?.selectedFile ?? "",
        publishedStatus:
          values?.type === "drafted" ? "drafted" : values?.articleStatus,
        ...(!values?.postId == "" && { postId: values?.postId }),
        ...(router.query?.groupId !== undefined &&
          router.query?.groupId !== "" && { groupId: router.query?.groupId }),
        ...(values?.groupId !== undefined &&
          values?.groupId !== "" && { groupId: values?.descriptiongroupId }),
        tags: values?.tags,
      };

      if (values.type === "drafted") {
        await createArticle(data);

        setTimeout(async () => {
          let redirectRoute = "/dashboard";
          if (data?.groupId !== undefined && data?.groupId !== "") {
            let groupDetails = await getGroupDetailsByID(data?.groupId);
            if (groupDetails?.name !== undefined) {
              redirectRoute = `/groups/${groupDetails.name}/${data?.groupId}`;
            }
          }
          router.push(redirectRoute);
        }, 1000);
      } else {
        dispatch(shareArticleModal(data));
        dispatch(toggleModals({ publishArticle: true }));
      }
    },
  });

  /******************* 
  @purpose : Image file upload
  @Parameter : 
  @Author : INIC
  ******************/
  const handleChange = (src) => {
    formik.setFieldValue("selectedFile", src);
  };
  /******************** 
  @purpose : Handle Status Change
  @Parameter : {}
  @Author : INIC
  ******************/

  const handleStatusChange = async (e) => {
    formik.setFieldValue("id", "");
    formik.setFieldValue("groupId", "");
    formik.setFieldValue("postId", "");
    formik.setFieldValue("title", "");
    formik.setFieldValue("subTitle", "");
    formik.setFieldValue("selectedFile", "");
    formik.setFieldValue("description", "");
    formik.setFieldValue("articleStatus", "");
    formik.setFieldValue("tags",[]);

    if (e.value === "newArticle") {
      formik.setFieldValue("isAdd", true);
      formik.setFieldValue("isEdit", false);
    } else {
      formik.setFieldValue("isAdd", false);
      formik.setFieldValue("isEdit", false);
    }
    formik.setFieldValue("status", e);
    formik.setFieldValue("publishedStatus", e.value);
    let payload = {
      page: 1,
      pagesize: 10,
      publishedStatus: e.value,
      ...(router.query?.groupId !== undefined &&
        router.query?.groupId !== "" && { groupId: router.query?.groupId }),
    };
    e.value !== "newArticle" && dispatch(articleListing(payload));
  };

  const handleEditArticle = (article) => {
    formik.setFieldValue("id", article.id);
    formik.setFieldValue("isEdit", true);
    formik.setFieldValue("isAdd", false);
    formik.setFieldValue("title", article.title);
    formik.setFieldValue("description", article.description);
    formik.setFieldValue("subTitle", article.subTitle);
    formik.setFieldValue("tags", article.tags);
    formik.setFieldValue("selectedFile", article.imageURL);
    formik.setFieldValue("articleStatus", article.publishedStatus);
    article?.groupId !== undefined &&
      article?.groupId !== "" &&
      formik.setFieldValue("groupId", article?.groupId);
  };

  const removeArticle = (id) => {
    dispatch(deleteArticle(id));
    const currentStatus = formik?.values?.status?.value;
    let payload = {
      page: 1,
      pagesize: 10,
      publishedStatus: formik?.values?.publishedStatus,
    };
    setTimeout(() => {
      dispatch(articleListing(payload));
    }, [500]);
    if(currentStatus=="published"){
      formik?.setFieldValue("isEdit",false);
      formik?.setFieldValue("isAdd",false);
    }
    setUpdateCount((prev)=>!prev);
  };

  return (
    <Layout>
      <div className="inner-wrapper dashboard-box inner-left-full-orsidebar">
        <Grid
          container
          maxWidth="1160px"
          marginLeft={"auto"}
          marginRight={"auto"}
          paddingLeft={{ sm: 2, xs: 1 }}
          paddingRight={{ sm: 2, xs: 1 }}
        >
          <Grid item md={3} xs={12} paddingRight={{ md: "10px", sm: 0 }}>
            <div className="profile-left-bar">
              {/*  left section */}
              <UpgradeYourProfile />

              <GrowthModal />

              <GrowthPartners />

              <RecentAddedGM />

              <FollowedGroup />
              <MostFollowedContents />
            </div>
          </Grid>
          <Grid item md={9} xs={12} paddingLeft={{ md: "6px", sm: 0 }}>
            {/* right section*/}
            <div className="profile-right-bar">
              <div className="article-publish-tab">
                <div
                  className={`tab-itms ${
                    formik?.values?.status?.value == "newArticle" ||
                    formik.values.isAdd ||
                    formik.values.isEdit
                      ? "article-tab-selected"
                      : ""
                  }`}
                  onClick={() => handleStatusChange(statusList[0])}
                >
                  <div>
                    <Image
                      src="/assets/images/add-post/article-publish-icon.svg"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div>{lang("ATRICLE.WRITE")}</div>
                </div>
                <div
                  className={`tab-itms ${
                    formik?.values?.status?.value == "published" &&
                    !formik.values.isAdd &&
                    !formik.values.isEdit
                      ? "article-tab-selected"
                      : ""
                  }`}
                  onClick={() => handleStatusChange(statusList[1])}
                >
                  <div>
                    <Image
                      src="/assets/images/add-post/article-public-icon.svg"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div>{`${lang(
                    "ATRICLE.PUBLISHED"
                  )} (${publishedCount})`}</div>
                </div>

                <div
                  className={`tab-itms ${
                    formik?.values?.status?.value == "drafted"
                      ? "article-tab-selected"
                      : ""
                  }`}
                  onClick={() => handleStatusChange(statusList[2])}
                >
                  <div>
                    <Image
                      src="/assets/images/add-post/article-drafted-icon.svg"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div>{`${lang("ATRICLE.DRAFTS")} (${draftCount})`}</div>
                </div>
                <div className={`tab-itms ${
                    formik?.values?.status?.value == "deleted"
                      ? "article-tab-selected"
                      : ""
                  }`} onClick={() => handleStatusChange(statusList[3])}>
                  <div>
                    <Image
                      src="/assets/images/add-post/article-delete-icon.svg"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div>{lang("ATRICLE.DELETED")}</div>
                </div>
              </div>
              {(formik.values.isAdd || formik.values.isEdit) && (
                <Card className="mb-3">
                  <Card.Header className="pb-0 px-4 pt-4">
                    {(formik.values.isAdd || formik.values.isEdit) && (
                      <div className="mb-0 article-header">
                        {lang("ATRICLE.WRITE_AN_ARTICLE")}
                      </div>
                    )}
                  </Card.Header>
                  <Card.Body className="p-4">
                    {/* <Form.Group className="mb-4">
                    <Form.Label>{lang("ATRICLE.PUBLISHING_MENU")}</Form.Label>
                    <div className="custom-selectpicker-xs custom-selectpicker-grey">
                      <Select
                        options={statusList}
                        value={formik.values.status}
                        onChange={(e) => handleStatusChange(e)}
                      />
                    </div>
                  </Form.Group> */}
                    {(formik.values.isAdd || formik.values.isEdit) && (
                      <Form onSubmit={formik.handleSubmit} className="form">
                        <Row>
                          <Col sm={12}>
                            <Form.Group className="mb-4">
                              {/* <TextField
                              label={lang("ATRICLE.TITLE")}
                              placeholder={lang("ATRICLE.TITLE_PLACEHOLDER")}
                              name="title"
                              count={220}
                              formik={formik}
                              required={true}
                            /> */}
                              <CustomInputField
                                label={lang("ATRICLE.TITLE")}
                                placeholder={lang("ATRICLE.TITLE_PLACEHOLDER")}
                                required={true}
                                defaultValue={formik?.values?.title || ""}
                                formik={formik}
                                formikKey={"title"}
                                maxTextCount={220}
                              />
                            </Form.Group>
                            <Form.Group className="mb-4">
                              {/* <TextField
                              label={lang("ATRICLE.SUB_TITLE")}
                              placeholder={lang("ATRICLE.SUBTITLE_PLACEHOLDER")}
                              name="subTitle"
                              count={220}
                              formik={formik}
                              required={true}
                            /> */}

                              <CustomInputField
                                label={lang("ATRICLE.SUB_TITLE")}
                                placeholder={lang(
                                  "ATRICLE.SUBTITLE_PLACEHOLDER"
                                )}
                                required={true}
                                defaultValue={formik?.values?.subTitle || ""}
                                formik={formik}
                                formikKey={"subTitle"}
                                maxTextCount={220}
                              />
                            </Form.Group>
                            <Form.Group
                              controlId="uploadTrainingAddTags"
                              className="mb-4"
                            >
                              {/* <Form.Label className="text-secondary">
                                {lang("ATRICLE.MAX_3_TAGS")}
                                <sup>*</sup>
                              </Form.Label> */}
                              {false && (
                                <div className="custom-selectpicker-multi">
                                  <TagsComponent
                                    maxTags={3}
                                    name="tags"
                                    formik={formik}
                                  />
                                </div>
                              )}
                              <CustomAutocomplete
                                formik={formik}
                                formikKey={"tags"}
                                placeholder={lang("ATRICLE.ENTER_TAG")}
                                label={lang("ATRICLE.MAX_3_TAGS")}
                              />
                            </Form.Group>
                            <Form.Group
                              controlId="createGroupUploadPhoto"
                              className="mb-4"
                            >
                              <div className="article-form-label">
                                {lang("COMMON.UPLOAD_COVER_IMAGE")}
                                <sup>*</sup>
                              </div>
                              {formik.values.isEdit ? (
                                <CropImages
                                  handleChange={handleChange}
                                  groupImage={formik.values.selectedFile}
                                  isEdit={formik.values.isEdit}
                                  type="articles"
                                />
                              ) : (
                                <>
                                  <CropImages
                                    handleChange={handleChange}
                                    isArticleFormUi={true}
                                    groupImage={formik.values.selectedFile}
                                    type="articles"
                                  />
                                  {formik?.touched?.selectedFile &&
                                    formik?.errors?.selectedFile && (
                                      <span
                                        className="error"
                                        style={{
                                          color: "red",
                                          fontSize: "14px",
                                        }}
                                      >
                                        {formik?.errors?.selectedFile}
                                      </span>
                                    )}
                                </>
                              )}
                            </Form.Group>
                            {((formik.values.isEdit &&
                              formik?.values?.description &&
                              formik?.values?.description?.length) ||
                              !formik.values.isEdit) && (
                              <>
                                <div className="article-form-label">
                                  {lang("COMMON.WRITE")}
                                  <sup>*</sup>
                                </div>
                                <div
                                  style={{
                                    position: "relative",
                                    zIndex: 0,
                                  }}
                                >
                                  <CustomCkEditor
                                    initData={formik?.values?.description || ""}
                                    onChange={(value) => {
                                      if (!value) {
                                        return;
                                      }
                                      formik.setFieldValue(
                                        "description",
                                        value || ""
                                      );
                                    }}
                                    className="article-form-ckeditor"
                                    allowImageUpload={true}
                                  />
                                </div>
                              </>
                            )}

                            {formik?.touched?.description &&
                              formik?.errors?.description && (
                                <span
                                  className="error"
                                  style={{ color: "red", fontSize: "14px" }}
                                >
                                  {formik?.errors?.description}
                                </span>
                              )}
                          </Col>
                        </Row>
                        <div className="article-creation-button-box">
                          <div className="article-creation-button-box-left">
                            <div>
                              <YliwayButton
                                label={lang("ATRICLE.SAVE_AS_DRAFT")}
                                size={"medium"}
                                fontWeight={500}
                                primaryOutlined={true}
                                // disabled={isButtonDisabled || error.error}
                                handleClick={() => {
                                  formik.setFieldValue("type", "drafted");
                                  if (Object.keys(formik.errors).length > 0) {
                                    setScrollToError(true);
                                  }
                                  formik.handleSubmit();
                                }}
                              />
                            </div>
                            {formik?.values?.id && (
                              <div>
                                <YliwayButton
                                  label={lang("COMMON.DELETE")}
                                  size={"medium"}
                                  fontWeight={500}
                                  primaryOutlined={true}
                                  // disabled={isButtonDisabled || error.error}
                                  handleClick={() => {
                                    removeArticle(formik?.values?.id);
                                  }}
                                />
                              </div>
                            )}
                          </div>

                          <div className="article-creation-button-box-right">
                            <div>
                              <YliwayButton
                                label={lang("ATRICLE.PUBLISH")}
                                size="medium"
                                primary={true}
                                fontWeight={500}
                                //disabled={isButtonDisabled || error.error}
                                handleClick={() => {
                                  formik.setFieldValue("type", "publish");
                                  if (Object.keys(formik.errors).length > 0) {
                                    setScrollToError(true);
                                  }
                                  formik.handleSubmit();
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </Form>
                    )}
                    {false &&
                      !formik.values.isAdd &&
                      !formik.values.isEdit &&
                      articles &&
                      articles.articleList &&
                      articles.articleList.rows &&
                      articles.articleList.rows.length > 0 && (
                        <ul>
                          {articles.articleList.rows.map((article, i) => {
                            return (
                              <Card
                                key={`article-${i}`}
                                className={`mb-3 
                              ${
                                formik.values.status.value === "published"
                                  ? article?.newsFeedId
                                    ? "cursor-pointer"
                                    : ""
                                  : "cursor-pointer"
                              }`}
                                onClick={() => {
                                  if (
                                    formik.values.status.value === "drafted"
                                  ) {
                                    formik.setFieldValue("id", article?.id);
                                    formik.setFieldValue(
                                      "postId",
                                      article?.postId
                                    );
                                    formik.setFieldValue(
                                      "title",
                                      article?.title
                                    );
                                    formik.setFieldValue(
                                      "selectedFile",
                                      article?.imageURL
                                    );
                                    formik.setFieldValue(
                                      "description",
                                      article?.description
                                    );
                                    formik.setFieldValue(
                                      "articleStatus",
                                      article?.publishedStatus
                                    );
                                    formik.setFieldValue("isAdd", true);
                                    formik.setFieldValue("tags", article.tags);
                                    return router.push(
                                      `/article?draftedId=${article.id}`
                                    );
                                  }
                                  if (
                                    formik.values.status.value ===
                                      "published" &&
                                    article?.newsFeedId
                                  ) {
                                    return router.push(
                                      `/article/view/${article?.newsFeedId}`
                                    );
                                  }
                                }}
                              >
                                <Card.Body>
                                  <Row>
                                    <Col sm={11}>{article.title}</Col>
                                    <Col sm={1}>
                                      <Dropdown className="theme-dropdown d-flex align-items-start">
                                        <Dropdown.Toggle>
                                          <em className="icon icon-ellipsis-h font-24"></em>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                          <Dropdown.Item
                                            onClick={() =>
                                              removeArticle(article.id)
                                            }
                                            className="d-flex align-items-center"
                                          >
                                            <em className="icon icon-delete-line reaction-icons pr-2 font-26"></em>
                                            <span>
                                              {lang("ATRICLE.DELETE_ARTICLE")}
                                            </span>
                                          </Dropdown.Item>
                                          {/* Edit Post Section */}
                                          <Dropdown.Item
                                            onClick={(e) =>
                                              handleEditArticle(article)
                                            }
                                            className="d-flex align-items-center"
                                          >
                                            <em className="icon icon-write reaction-icons pr-2 font-22"></em>
                                            <span>
                                              {lang("ATRICLE.EDIT_ARTICLE")}
                                            </span>
                                          </Dropdown.Item>
                                        </Dropdown.Menu>
                                      </Dropdown>
                                    </Col>
                                  </Row>
                                  {article.imageURL && (
                                    <img
                                      src={article.imageURL}
                                      width="100%"
                                      height="100%"
                                      className="img-fluid"
                                    />
                                  )}
                                  {/*<p
                                  dangerouslySetInnerHTML={{
                                    __html: article.description,
                                  }}
                                />*/}
                                </Card.Body>
                              </Card>
                            );
                          })}
                        </ul>
                      )}
                  </Card.Body>
                </Card>
              )}
              {!formik.values.isAdd &&
              !formik.values.isEdit &&
              formik?.values?.status?.value == "published" ? (
                <div className="article-published-container">
                  <div className="published-article-heading">
                    Published Articles
                  </div>
                  {articles &&
                    articles.articleList &&
                    articles.articleList.rows &&
                    articles.articleList.rows.length > 0 &&
                    articles.articleList.rows.map((article, i) => {
                      return (
                        <ArticleCard
                          article={article}
                          handleEditArticle={handleEditArticle}
                          userInfo={userInfo}
                          key={i}
                          redirectHandle={() => {
                            if (
                              formik.values.status.value === "published" &&
                              article?.newsFeedId
                            ) {
                              return router.push(
                                `/article/view/${article?.newsFeedId}`
                              );
                            }
                          }}
                        />
                      );
                    })}
                </div>
              ) : (
                <></>
              )}
              {!formik.values.isAdd &&
              !formik.values.isEdit &&
              formik?.values?.status?.value == "drafted" ? (
                <div className="article-published-container">
                  <div className="published-article-heading">Drafts</div>
                  {articles &&
                    articles.articleList &&
                    articles.articleList.rows &&
                    articles.articleList.rows.length > 0 &&
                    articles.articleList.rows.map((article, i) => {
                      return (
                        <DraftCardUi
                          article={article}
                          handleEdit={() => {
                            if (formik.values.status.value === "drafted") {
                              formik.setFieldValue("id", article?.id);
                              formik.setFieldValue("postId", article?.postId);
                              formik.setFieldValue("title", article?.title);
                              formik.setFieldValue(
                                "selectedFile",
                                article?.imageURL
                              );
                              formik.setFieldValue(
                                "description",
                                article?.description
                              );
                              formik.setFieldValue(
                                "articleStatus",
                                article?.publishedStatus
                              );
                              formik.setFieldValue("isAdd", true);
                              formik.setFieldValue("tags", article.tags);
                              return router.push(
                                `/article?draftedId=${article.id}`
                              );
                            }
                          }}
                          handleDelete={() => {
                            removeArticle(article.id);
                          }}
                          key={i}
                        />
                      );
                    })}
                </div>
              ) : (
                <></>
              )}


              {!formik.values.isAdd &&
              !formik.values.isEdit &&
              formik?.values?.status?.value == "deleted" ? (
                <DeletedArticleListing/>
              ) : (
                <></>
              )}

            </div>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
}

export default WithAuth(Article);
