import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Form, Card, Row, Col, Button } from "react-bootstrap";
import WithAuth from "components/with-auth/with-auth";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "components/form-fields";
import { companyStepTwo, CREATE_COMPANY_STEP_TWO } from "utils";
import CropImages from "components/CropImages/CropImages";
import { useRouter } from "next/router";
import { getCompanyDetails } from "store/actions";
import CkEditorField from "components/form-fields/ck-editor-field";
import { addCompany } from "store/actions/company";

const CreateProfileCompanyStep2 = ({ setData, data, prev }) => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const router = useRouter();

  const { bannerImage } = useSelector((state) => state.room);

  const formik = useFormik({
    initialValues: companyStepTwo,
    validationSchema: CREATE_COMPANY_STEP_TWO(lang),
    onSubmit: async (values) => {
      try {
        setData({ ...data, ...values });
        const obj = { ...data, ...values };
        obj.companyEmail = obj.companyEmail.toLowerCase();
        obj.companyStrength = obj.selected_companyStrength.value;
        obj.industry = obj.selected_industry.label;
        obj.roleInCompany = obj.selected_roleInCompany.label;
        obj.logo = formik.values.logo;
        obj.cover = formik.values.cover;

        const response = await Promise.resolve(addCompany(obj));
        if (response.status === 1) {
          dispatch(getCompanyDetails());

          setTimeout(() => router.push("/dashboard"), 2000);
        }
      } catch (err) {
        console.error(err);
      }
    },
  });

  /******************* 
  @purpose : Banner upload
  @Parameter : 
  @Author : YLIWAY
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
              {/* <h6 className=" mt-3 mb-md-4">
                {lang("COMPANY_FORM.COMPANY_PAGE_INFO")}
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
                          {lang("COMPANY_FORM.UPLOAD_LOGO")}
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
                          {lang("COMPANY_FORM.COVER_IMAGE")}
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
                          {lang("COMPANY_FORM.SLOGAN")}
                          <sup className="text-danger">*</sup>
                        </span>

                        <Form.Group className="mb-0">
                          <TextField
                            name="slogan"
                            type="text"
                            id="Slogan"
                            placeholder={lang("COMPANY_FORM.ENTER")}
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
                          {lang("COMPANY_FORM.OVERVIEW")}
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
                          {lang("COMPANY_FORM.FULL_DESCRIPTION")}
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
                        {lang("COMPANY_FORM.PREVIOUS")}
                      </Button>
                      <Button
                        type="submit"
                        variant="info"
                        className="d-flex font-weight-semibold"
                      >
                        {lang("COMPANY_FORM.SUBMIT")}
                        <span className="bx bx-right-arrow-alt next-icon mt-0"></span>
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
export default WithAuth(CreateProfileCompanyStep2);
