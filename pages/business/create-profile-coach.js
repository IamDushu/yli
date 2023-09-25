import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "@components/layout";
import {
  Container,
  Form,
  Card,
  Row,
  Col,
  Button,
  FormText,
  Spinner,
} from "react-bootstrap";
import WithAuth from "components/with-auth/with-auth";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  requestRole,
  requestStatus,
  toggleModal,
  uploadPostDocument,
} from "store/actions";
import { useFormik } from "formik";
import { BECOME_A_COACH, otherPlatforms } from "utils";
import { Radio, SelectField, TextAreaField } from "components/form-fields";
import { FileUploader } from "react-drag-drop-files";
import { selectUserInfo } from "store/selectors/user";
import AddInformation from "components/business/add-information";
import dynamic from "next/dynamic";
import { DASHBOARD } from "routes/urls";
import { useRouter } from "next/router";
const MainModal = dynamic(() =>
  import("components/modal").then((mod) => mod.MainModal)
);
const RequestToAdmin = dynamic(() =>
  import("components/modal").then((mod) => mod.RequestToAdmin)
);
const CreateProfileCoach = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const router = useRouter();
  const userInfo = useSelector(selectUserInfo);

  const { requesttoadmin } = useSelector(({ ui }) => ui.modals, shallowEqual);

  const [selectFile, setSelectFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [applicationApproved, setApplicationApproved] = useState(false);
  const [scrollToError, setScrollToError] = useState(false);

  useEffect(() => {
    if (userInfo.role && userInfo.role.includes("Coach")) {
      router.push(DASHBOARD);
    }
  }, []);

  useEffect(async () => {
    const response = await requestStatus({ requestFor: "Coach" });
    if (response) {
      setApplicationApproved(response);
      dispatch(toggleModal(true, "requesttoadmin"));
    }
  }, []);
  useEffect(() => {
    if (scrollToError) {
      const errorField = document.querySelector(".error");
      if (errorField) {
        errorField.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      setScrollToError(false);
    }
  }, [scrollToError]);

  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/

  const formik = useFormik({
    initialValues: {
      professionalCoach: "",
      // coachCertificateURL: "",
      offerOtherPlatform: "No",
      offerWhichPlatform: [],
      whyYouAreGood: "",
      coachAreAvailableDiscuss: "",
      coachReasonForNo: "",
      remarks: "",
      cv: "",
      // availableDate: "",
    },
    validationSchema: BECOME_A_COACH(lang),
    onSubmit: async (values) => {
      setLoader(true);
      const { selected_offerWhichPlatform, ...rest } = values;
      let offerWhichPlatform =
        selected_offerWhichPlatform?.length > 0
          ? selected_offerWhichPlatform.map((v) => v.value)
          : [];
      let input = {
        ...rest,
        requestFor: "Coach",
        offerWhichPlatform,
      };

      const response = await requestRole(input);
      if (response) {
        setLoader(false);
        dispatch(toggleModal(true, "requesttoadmin"));
      }
    },
  });

  const handleFileChange = async (event) => {
    const documentData = new FormData();
    documentData.append("file", event);
    setLoading(true);
    const response = await dispatch(uploadPostDocument(documentData));
    if (response) {
      formik?.setFieldValue("cv", response.fileUrl);
      setSelectFile(response.fileUrl);
      setLoading(false);
    }
  };

  const handleCertificateChange = (fileUrl) => {
    formik?.setFieldValue("coachCertificateURL", fileUrl);
  };

  const fileTypes = ["PDF"];
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    formik.handleSubmit();
    if (Object.keys(formik.errors).length > 0) {
      setScrollToError(true);
    }
  };

  useEffect(() => {
    if(formik.values["offerOtherPlatform"] === 'No' && formik.values?.['selected_offerWhichPlatform']?.length > 0){
      formik.setFieldValue("selected_offerWhichPlatform", []);
      formik.setFieldValue("offerWhichPlatform", []);
    }
  }, [formik.values["offerOtherPlatform"]])
  
  return (
    <Layout>
      <div className="inner-wrapper profile-coach-box">
        <Container>
          <div className="mb-3">
            <h1 className="font-weight-bold font-23 d-flex heading-text mb-0">
              {lang("COACH_FORM.BECOME_A_COACH")}
            </h1>
          </div>

          <Card>
            <Card.Body className="p-0">
              <div className="border-bottom border-geyser p-4 position-relative d-flex justify-content-between">
                <div className="mr-4 pt-sm-0 pt-4">
                  <h5>
                    {lang("COMMON.WELCOME")} ‘{userInfo.firstName}{" "}
                    {userInfo.lastName}’
                  </h5>
                  <p className="text-body-16 mb-0 font-weight-normal">
                    {lang("LEARNING_INSTITUTE_FORM.JUST_A_FEW_QUESTIONS")}
                  </p>
                </div>
                <div className="role-defination-box flex-shrink-0">
                  <h3 className="h5 font-weight-normal m-0">
                    <span className="font-weight-semibold role-span">
                      {lang("EXPERIENCE.FORM.ROLE")}
                    </span>{" "}
                    : {lang("GLOBAL_SEARCH.FILTER.COACH")}
                  </h3>
                </div>
                <AddInformation dispatch={dispatch} userInfo={userInfo} />
              </div>

              <div className="container-fluid">
                <Form onSubmit={handleFormSubmit}>
                  <div className="px-2 pt-4">
                    <Row>
                      <Col md={12}>
                        <div className="mb-4">
                          <span className="form-label">
                            {lang("COACH_FORM.ARE_YOU_COACH")}
                            <sup>*</sup>
                          </span>
                          <div className="d-flex custom-new-check">
                            <Radio
                              title={lang("COMMON.YES")}
                              name="professionalCoach"
                              id="yes-professional-coach"
                              formik={formik}
                              className="mr-5"
                              value="Yes"
                            />
                            <Radio
                              title={lang("COMMON.NO")}
                              name="professionalCoach"
                              id="no-professional-coach"
                              formik={formik}
                              className="mr-5"
                              value={"No"}
                            />
                          </div>
                          {formik?.touched["professionalCoach"] &&
                            formik?.errors["professionalCoach"] && (
                              <FormText className={"error"}>
                                {formik?.errors["professionalCoach"]}
                              </FormText>
                            )}
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-4">
                          <span className="form-label">
                            {lang("COACH_FORM.DO_YOU_ALREADY_COACH")}
                          </span>
                          <div className="d-flex custom-new-check">
                            <Radio
                              title={lang("COMMON.YES")}
                              name="offerOtherPlatform"
                              id="yes-offer-coaching"
                              formik={formik}
                              className="mr-5"
                              value="Yes"
                            />
                            <Radio
                              title={lang("COMMON.NO")}
                              name="offerOtherPlatform"
                              id="no-offer-coaching"
                              formik={formik}
                              className="mr-5"
                              value={"No"}
                            />
                          </div>
                          {formik?.touched["offerOtherPlatform"] &&
                            formik?.errors["offerOtherPlatform"] && (
                              <FormText className={"error"}>
                                {formik?.errors["offerOtherPlatform"]}
                              </FormText>
                            )}
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-4">
                          <span className="form-label">
                            {lang("COACH_FORM.IF_YES_PLATFORM")}
                            <sup>*</sup>
                          </span>
                          <Form.Group className="mb-0">
                            <div className="custom-selectpicker-xs custom-selectpicker-grey">
                              <SelectField
                                name="offerWhichPlatform"
                                options={otherPlatforms}
                                formik={formik}
                                isMulti
                                placeholder={lang("COMMON.SELECT")}
                                isDisabled={
                                  formik.values["offerOtherPlatform"] === "Yes"
                                    ? false
                                    : true
                                }
                              />
                            </div>
                          </Form.Group>
                        </div>
                      </Col>
                      <Col md={12}>
                        <div className="mb-4">
                          <span className="form-label">
                            {lang("COACH_FORM.WHY_GOOD_COACH")}
                            <sup>*</sup>
                          </span>
                          <Form.Group>
                            <TextAreaField
                              name="whyYouAreGood"
                              rows={4}
                              placeholder={lang(
                                "TEACHER_FORM.TEACHER_FORM_PLACEHOLDER"
                              )}
                              formik={formik}
                              count={2000}
                            />
                          </Form.Group>
                        </div>
                      </Col>
                      <Col md={12}>
                        <div className="mb-4">
                          <span className="form-label">
                            {lang("COACH_FORM.ARE_YOU_AVAILABLE")}
                            <sup>*</sup>
                          </span>
                          <div className="d-flex custom-new-check">
                            <Radio
                              title={lang("COMMON.YES")}
                              name="coachAreAvailableDiscuss"
                              id="yes-coachAre-Available-Discuss"
                              formik={formik}
                              className="mr-5"
                              value="Yes"
                            />
                            <Radio
                              title={lang("COMMON.NO")}
                              name="coachAreAvailableDiscuss"
                              id="no-coachAre-Available-Discuss"
                              formik={formik}
                              className="mr-5"
                              value={"No"}
                            />
                          </div>
                          {formik?.touched["coachAreAvailableDiscuss"] &&
                            formik?.errors["coachAreAvailableDiscuss"] && (
                              <FormText className={"error"}>
                                {formik?.errors["coachAreAvailableDiscuss"]}
                              </FormText>
                            )}
                        </div>
                      </Col>
                      <Col md={12}>
                        <div className="mb-4">
                          <span className="form-label">
                            {lang("COACH_FORM.IF_NO_WHY")}
                          </span>
                          <div className="form-group">
                            <TextAreaField
                              name="coachReasonForNo"
                              rows={4}
                              placeholder={lang(
                                "TEACHER_FORM.TEACHER_FORM_PLACEHOLDER"
                              )}
                              formik={formik}
                              count={2000}
                              readOnly={
                                formik.values["coachAreAvailableDiscuss"] ===
                                "No"
                                  ? false
                                  : true
                              }
                            />
                          </div>
                        </div>
                      </Col>
                      <Col md={6}></Col>
                      <Col md={12}>
                        <div>
                          <span className="form-label">
                            {lang("COACH_FORM.REMARKS_IF_ANY")}
                          </span>
                          <Form.Group>
                            <TextAreaField
                              name="remarks"
                              placeholder={lang(
                                "TEACHER_FORM.TEACHER_FORM_PLACEHOLDER"
                              )}
                              rows={4}
                              count={2000}
                              formik={formik}
                            />
                          </Form.Group>
                        </div>
                      </Col>
                      <Col md={12}>
                        <div>
                          <span className="form-label">
                            {lang("COACH_FORM.CAN_YOU_SEND_CV")}
                            <sup>*</sup>
                          </span>
                          <Form.Group className="w-xl-75-100">
                            <div className="fullwidth-dropzone sm-6 md-6 lg-6 mb-3">
                              <FileUploader
                                handleChange={handleFileChange}
                                children={
                                  <div className="dropzone-wrap-xl text-center pointer w-100">
                                    <em className="icon icon-upload-cloud font-44 pb-0"></em>
                                    <p className="m-0 font-16 text-geyser font-medium">
                                      {lang("DASHBOARD.UPLOAD_FILE_HERE")}
                                    </p>
                                  </div>
                                }
                                name={"cv"}
                                types={fileTypes}
                                maxSize={10}
                                style="Width: 100%"
                                formik={formik}
                              />
                              {formik?.touched["cv"] &&
                                formik?.errors["cv"] && (
                                  <FormText className={"error"}>
                                    {formik?.errors["cv"]}
                                  </FormText>
                                )}
                            </div>

                            {loading ? (
                              <center>
                                <Spinner
                                  as="span"
                                  animation="border"
                                  variant="primary"
                                />
                              </center>
                            ) : (
                              <div className="fullwidth-dropzone sm-6 md-6 lg-6 mb-3">
                                {selectFile !== "" && (
                                  <object
                                    data={selectFile}
                                    type="application/pdf"
                                    className="previewImage w-100"
                                  />
                                )}
                              </div>
                            )}
                          </Form.Group>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <Row>
                    <Col md={12} className="border-top border-geyser py-4">
                      <div className="text-center form-submit-btn">
                        {loader ? (
                          <center>
                            <Spinner
                              as="span"
                              animation="border"
                              variant="primary"
                            />
                          </center>
                        ) : (
                          <Button
                            type="submit"
                            variant="btn btn-info font-weight-semibold text-uppercase"
                            disabled={loading}
                          >
                            {lang("LEARNING_INSTITUTE_FORM.SUBMIT")}
                          </Button>
                        )}
                      </div>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>
      {/******************* 
           @purpose : Add To Request To Admin Modal
           @Author : INIC
           ******************/}
      <MainModal
        className="request-to-admin only-body-modal-view"
        show={requesttoadmin}
        keyModal="requesttoadmin"
        body={<RequestToAdmin apply={!applicationApproved} role={"Coach"} />}
        headerClassName="mb-50 block md-mb-30"
        backdrop="static"
        closeIcon={false}
      />
    </Layout>
  );
};
export default WithAuth(CreateProfileCoach);
