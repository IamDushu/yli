import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
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
import { SidebarLayout } from "components/layout";

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
          // POP AFTER DRAFTED
          Swal.fire({
            html: '<div style="font-size: 22px; font-weight: 400; line-height: 28px; letter-spacing: 0em; text-align: center; color: #001551;">Article Saved</div>',
            imageUrl: "/assets/images/tick-modal-icon.svg",
            imageWidth: 60,
            imageHeight: 60,
            showDenyButton: true,
            confirmButtonText: lang("COMMON.VIEW"),
            denyButtonText: lang("COMMON.BACK"),
          }).then((result) => {
            if (result.isConfirmed) {
              router.push(redirectRoute);
            }
          });
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
    <SidebarLayout removeSidebar="footer" removeRightSidebar>
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
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M15 16L11 20H21V16H15Z" fill="#6750A4" />
                <path
                  d="M12.06 7.19L3 16.25V20H6.75L15.81 10.94L12.06 7.19ZM5.92 18H5V17.08L12.06 10.02L12.98 10.94L5.92 18Z"
                  fill="#6750A4"
                />
                <path
                  d="M18.71 8.04C19.1 7.65 19.1 7.02 18.71 6.63L16.37 4.29C16.17 4.09 15.92 4 15.66 4C15.41 4 15.15 4.1 14.96 4.29L13.13 6.12L16.88 9.87L18.71 8.04Z"
                  fill={(formik?.values?.status?.value == "newArticle")?"#6750A4":"#49454E"}
                />
              </svg>
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
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM4 12C4 11.39 4.08 10.79 4.21 10.22L8.99 15V16C8.99 17.1 9.89 18 10.99 18V19.93C7.06 19.43 4 16.07 4 12ZM17.89 17.4C17.63 16.59 16.89 16 15.99 16H14.99V13C14.99 12.45 14.54 12 13.99 12H7.99V10H9.99C10.54 10 10.99 9.55 10.99 9V7H12.99C14.09 7 14.99 6.1 14.99 5V4.59C17.92 5.77 20 8.65 20 12C20 14.08 19.19 15.98 17.89 17.4Z"
                  fill={(formik?.values?.status?.value == "published")?"#6750A4":"#49454E"}
                />
              </svg>
            </div>
            <div>{`${lang("ATRICLE.PUBLISHED")} (${publishedCount})`}</div>
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
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.5 1H4.5C3.4 1 2.5 1.9 2.5 3V17H4.5V3H16.5V1ZM15.5 5H8.5C7.4 5 6.51 5.9 6.51 7L6.5 21C6.5 22.1 7.39 23 8.49 23H19.5C20.6 23 21.5 22.1 21.5 21V11L15.5 5ZM8.5 21V7H14.5V12H19.5V21H8.5Z"
                  fill={(formik?.values?.status?.value == "drafted")?"#6750A4":"#49454E"}
                />
              </svg>
            </div>
            <div>{`${lang("ATRICLE.DRAFTS")} (${draftCount})`}</div>
          </div>
          <div
            className={`tab-itms ${
              formik?.values?.status?.value == "deleted"
                ? "article-tab-selected"
                : ""
            }`}
            onClick={() => handleStatusChange(statusList[3])}
          >
            <div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.5 10V9H14.5V10H12V11.5H13V15.5C13 16.33 13.67 17 14.5 17H16.5C17.33 17 18 16.33 18 15.5V11.5H19V10H16.5ZM16.5 15.5H14.5V11.5H16.5V15.5ZM20 6H12L10 4H4C2.89 4 2.01 4.89 2.01 6L2 18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V8C22 6.89 21.11 6 20 6ZM20 18H4V6H9.17L11.17 8H20V18Z"
                  fill={(formik?.values?.status?.value == "deleted")?"#6750A4":"#49454E"}
                />
              </svg>
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
                      {
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
                      }

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
                                      onClick={() => removeArticle(article.id)}
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
          <>
            <div className="article-published-container">
              <div className="published-article-heading">
                {lang("ARTICLE_CARD.PUBLISHED_ARTICLES")}
              </div>
              <div className="article-cards-wrapper">
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
            </div>
          </>
        ) : (
          <></>
        )}
        {!formik.values.isAdd &&
        !formik.values.isEdit &&
        formik?.values?.status?.value == "drafted" ? (
          <div className="article-published-container">
            <div className="draft-article-heading">{lang("ARTICLE_CARD.DRAFTED_ARTICLES")}</div>
            {articles &&
              articles.articleList &&
              articles.articleList.rows &&
              articles.articleList.rows.length > 0 &&
              articles.articleList.rows.map((article, i) => {
                return (
                  <DraftCardUi
                    article={article}
                    lastIndex={articles?.articleList?.rows?.length - 1}
                    index={i}
                    handleEdit={() => {
                      if (formik.values.status.value === "drafted") {
                        formik.setFieldValue("id", article?.id);
                        formik.setFieldValue("postId", article?.postId);
                        formik.setFieldValue("title", article?.title);
                        formik.setFieldValue("selectedFile", article?.imageURL);
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
                        return router.push(`/article?draftedId=${article.id}`);
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
          <DeletedArticleListing setUpdateCount={setUpdateCount} />
        ) : (
          <></>
        )}
      </div>
    </SidebarLayout>
  );
}

export default WithAuth(Article);
