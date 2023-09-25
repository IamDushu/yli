import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Form, Card, Row, Col, Button } from "react-bootstrap";
import WithAuth from "components/with-auth/with-auth";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "components/form-fields";
import {
  learningInstituteStepTwo,
  CREATE_LEARNING_INSTITUTE_STEP_TWO,
} from "utils";
import CropImages from "components/CropImages/CropImages";
import { addLearningInstitute } from "store/actions/learningInstitute";
import { useRouter } from "next/router";
import { getInstituteDetails } from "store/actions";
import CkEditorField from "components/form-fields/ck-editor-field";

const CreateProfileInstituteStep2 = ({ setData, data, prev }) => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const router = useRouter();

  const { bannerImage } = useSelector((state) => state.room);

  const formik = useFormik({
    initialValues: learningInstituteStepTwo,
    validationSchema: CREATE_LEARNING_INSTITUTE_STEP_TWO(lang),
    onSubmit: async (values) => {
      setData({ ...data, ...values });
      const obj = { ...data, ...values };
      obj.instituteEmail = obj.instituteEmail.toLowerCase();
      obj.orgType = obj.selected_orgType.label;
      // obj.sector = obj.selected_sector.label;
      obj.roleInInstitute = obj.selected_roleInInstitute.label;
      obj.logo = formik.values.logo;
      obj.cover = formik.values.cover;

      const response = await dispatch(addLearningInstitute(obj));

      if (response.status === 1) {
        dispatch(getInstituteDetails());
        setTimeout(
          () =>
            router.push({
              pathname: "/dashboard",
            }),
          2000
        );
      }
    },
  });


  /******************* 
  @purpose : Banner upload
  @Parameter : 
  @Author : INIC
  ******************/
  const handlePhotoChange = (fileUrl, name) => {
    formik?.setFieldValue(name, fileUrl);
  };

  return (
    <>
      <Container className="p-0">
        <Card className="border-0">
          <Card.Body className="p-0">
            <div className="container-fluid p-0">
            {/*   <h6 className=" mt-3 mb-md-4">
                {lang("LEARNING_INSTITUTE_FORM.INSTITUTE_PAGE_DETAILS")}
              </h6> */}
              <Form onSubmit={formik.handleSubmit}>
                <div className=" pt-0">
                  <Row>
                    {/* upload image */}
                    <Col lg={3} md={5} sm={6}>
                      <Form.Group
                        controlId="uploadTrainingImg"
                        className="mb-4"
                      >
                        <span className="form-label">
                          {lang("LEARNING_INSTITUTE_FORM.UPLOAD_LOGO")}
                        </span>
                        <div name="logo" formik={formik}>
                          <CropImages
                            name={"logo"}
                            handleChange={(e) => handlePhotoChange(e, "logo")}
                            formik={formik}
                            withDelete={true}
                            type="coach"
                            logoSize={true}
                          />
                          {formik?.touched["logo"] &&
                            formik?.errors["logo"] && (
                              <FormText className={"error"}>
                                {formik?.errors["logo"]}
                              </FormText>
                            )}
                        </div>
                      </Form.Group>
                    </Col>

                    <Col xl={12} lg={12}>
                      <Form.Group
                        controlId="uploadTrainingImg2"
                        className="mb-4"
                      >
                        <span className="form-label">
                          {lang("LEARNING_INSTITUTE_FORM.COVER_IMAGE")}
                        </span>
                        <div name="cover" formik={formik}>
                          <CropImages
                            name={"cover"}
                            handleChange={(e) => handlePhotoChange(e, "cover")}
                            formik={formik}
                            type="coach"
                            withDelete={true}
                          />
                          {formik?.touched["cover"] &&
                            formik?.errors["cover"] && (
                              <FormText className={"error"}>
                                {formik?.errors["cover"]}
                              </FormText>
                            )}
                        </div>
                      </Form.Group>
                    </Col>
                    <Col xl={12} lg={12}>
                      {bannerImage && (
                        <div className="overflow-hidden flex-shrink-0 mb-3  ">
                          <picture onContextMenu={(e) => e.preventDefault()}>
                            <source srcSet={bannerImage} type="image/*" />
                            <img
                              src={bannerImage}
                              alt="User"
                              width="550"
                              height="250"
                              className="object-cover "
                            />
                          </picture>
                        </div>
                      )}
                    </Col>
                    <Col md={12}>
                      <div className="mb-3">
                        <span className="form-label">
                          {lang("LEARNING_INSTITUTE_FORM.SLOGAN")}
                          <sup className="text-danger">*</sup>
                        </span>

                        <Form.Group className="mb-0">
                          <TextField
                            name="slogan"
                            type="text"
                            id="Slogan"
                            placeholder={lang("LEARNING_INSTITUTE_FORM.ENTER")}
                            formik={formik}
                            count={220}
                            // resizeable={true}
                          />
                        </Form.Group>
                      </div>
                    </Col>
                    <Col md={12}>
                      <div className="mb-3">
                        <span className="form-label">
                          {lang("LEARNING_INSTITUTE_FORM.OVERVIEW")}
                          <sup className="text-danger">*</sup>
                        </span>

                        <Form.Group>
                          <CkEditorField
                            name="overview"
                            formik={formik}
                            count={2000}
                            countName="overviewCount"
                          />
                        </Form.Group>
                      </div>
                    </Col>
                    <Col md={12}>
                      <div className="mb-3">
                        <span className="form-label">
                          {lang("LEARNING_INSTITUTE_FORM.FULL_DESCRIPTION")}
                          <sup className="text-danger">*</sup>
                        </span>
                        <Form.Group>
                          <CkEditorField
                            name="description"
                            formik={formik}
                            count={4000}
                            countName="descriptionCount"
                          />
                        </Form.Group>
                      </div>
                    </Col>
                  </Row>
                </div>
                <Row>
                  <Col md={12} className="border-top border-geyser py-4">
                    <div className="justify-content-between d-flex ">
                      <Button
                        variant="btn btn-btn btn-dark-bt-secondary btn-sm font-weight-noramal "
                        onClick={prev}
                      >
                        {lang("LEARNING_INSTITUTE_FORM.PREVIOUS")}
                      </Button>
                      <Button
                        type="submit"
                        variant="btn btn-info font-weight-semibold"
                      >
                        {lang("LEARNING_INSTITUTE_FORM.SUBMIT")}
                        <span className="bx bx-right-arrow-alt next-icon"></span>
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};
export default WithAuth(CreateProfileInstituteStep2);
