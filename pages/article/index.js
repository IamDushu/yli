import React, { useEffect, useState } from "react";
import { Layout } from "@components/layout";
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

/******************** 
  @purpose :  Article
  @Parameter : {}
  @Author : INIC
  ******************/
function Article() {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const router = useRouter();
  const articles = useSelector(selectArticleData);
  const data = useSelector(selectGetArticleData);
  const [scrollToError, setScrollToError] = useState(false);

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
    formik.setFieldValue("selectedFile", "");
    formik.setFieldValue("description", "");
    formik.setFieldValue("articleStatus", "");

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
    formik.setFieldValue("selectedFile", article.imageURL);
    formik.setFieldValue("articleStatus", article.publishedStatus);
    article?.groupId !== undefined &&
      article?.groupId !== "" &&
      formik.setFieldValue("groupId", article?.groupId);
  };

  const removeArticle = (id) => {
    dispatch(deleteArticle(id));
    let payload = {
      page: 1,
      pagesize: 10,
      publishedStatus: formik?.values?.publishedStatus,
    };
    setTimeout(() => {
      dispatch(articleListing(payload));
    }, [500]);
  };

  return (
    <Layout>
      <div className="inner-wrapper dashboard-box inner-left-full-orsidebar">
        <Container>
          <div className="d-flex flex-xl-nowrap flex-wrap">
            {/* post view */}
            <div className="profile-left-bar">
              <Card className="mb-3">
                <Card.Header className="pb-0 px-4 pt-4">
                  <h5 className="mb-0">{lang("ATRICLE.WRITE_AN_ARTICLE")}</h5>
                </Card.Header>
                <Card.Body className="p-4">
                  <Form.Group className="mb-4">
                    <Form.Label>{lang("ATRICLE.PUBLISHING_MENU")}</Form.Label>
                    <div className="custom-selectpicker-xs custom-selectpicker-grey">
                      <Select
                        options={statusList}
                        value={formik.values.status}
                        onChange={(e) => handleStatusChange(e)}
                      />
                    </div>
                  </Form.Group>
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
                              placeholder={lang("ATRICLE.SUBTITLE_PLACEHOLDER")}
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
                            <Form.Label>
                              {lang("ATRICLE.UPLOAD_PHOTO")}
                              <sup>*</sup>
                            </Form.Label>
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
                                  groupImage={formik.values.selectedFile}
                                  type="articles"
                                />
                                {formik?.touched?.selectedFile &&
                                  formik?.errors?.selectedFile && (
                                    <span
                                      className="error"
                                      style={{ color: "red", fontSize: "14px" }}
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
                          <Row>
                            {formik.values.isEdit && (
                              <Col sm={6}>
                                <div className="mt-4 pb-2 px-md-4 px-0">
                                  <Button
                                    variant="btn btn-secondary w-50 "
                                    onClick={() => {
                                      router.push("/dashboard");
                                    }}
                                  >
                                    {lang("COMMON.CANCEL")}
                                  </Button>
                                </div>
                              </Col>
                            )}
                            {(!formik.values.isEdit ||
                              router.query.draftedId != null) && (
                              <Col sm={6} className="pr-sm-0">
                                <div className="text-center text-sm-left  mt-4 pb-3 pb-md-1">
                                  <Button
                                    type="submit"
                                    variant="btn btn-secondary w-50 w-100-sm"
                                    onClick={() => {
                                      formik.setFieldValue("type", "drafted");
                                      if (
                                        Object.keys(formik.errors).length > 0
                                      ) {
                                        setScrollToError(true);
                                      }
                                    }}
                                  >
                                    {lang("ATRICLE.SAVE_AS_DRAFT")}
                                  </Button>
                                </div>
                              </Col>
                            )}
                            <Col sm={6} className="pl-sm-0">
                              <div className="text-sm-right text-center mt-0 mt-sm-4 pb-1 ">
                                <Button
                                  type="submit"
                                  variant="btn btn-info w-50 w-100-sm"
                                  onClick={() => {
                                    formik.setFieldValue("type", "publish");
                                    if (Object.keys(formik.errors).length > 0) {
                                      setScrollToError(true);
                                    }
                                  }}
                                >
                                  {lang("ATRICLE.PUBLISH")}
                                </Button>
                              </div>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Form>
                  )}
                  {!formik.values.isAdd &&
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
                                if (formik.values.status.value === "drafted") {
                                  formik.setFieldValue("id", article?.id);
                                  formik.setFieldValue(
                                    "postId",
                                    article?.postId
                                  );
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
                                if (
                                  formik.values.status.value === "published" &&
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
            </div>

            {/* right blog section */}
            <div className="profile-right-bar">
              <UpgradeYourProfile />

              <GrowthModal />

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
}

export default WithAuth(Article);
