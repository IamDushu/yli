import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Container,
  Form,
  Card,
  Row,
  Col,
  Button,
  FormText,
} from "react-bootstrap";
import "antd/dist/antd.css";
import { addRoleInfo, getRoleInfo } from "../../store/actions/faq";
import WithAuth from "components/with-auth/with-auth";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  DateTimePickerField,
  SelectField,
  TextField,
} from "components/form-fields";

import {
  CREATE_LEARNING_INSTITUTE_STEP_ONE,
  GOOGLE_PLACE,
  accountTypeFiscalType,
} from "utils";

import { TagComponent } from "components/courses/upload-course";
import { useRouter } from "next/router";
import PhoneInput from "components/form-fields/react-phone-input";
import { getValidateEmail } from "store/actions";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import { GOOGLE_MAP_API_KEY } from "config";
import { CreatableSelectField } from "components/form-fields/select-field";

const CreateProfileInstitute = ({ next, setData, data }) => {
  const router = useRouter();
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const { userRole } = useSelector((state) => state.faqReducer);
  // const { sectors } = useSelector((state) => state.learningInstitute);

  const [instituteRole, setInstituteRoles] = useState([]);
  // const [sector, setSectors] = useState([]);
  const [scrollToError, setScrollToError] = useState(false);
  const inputProps = {
    placeholder: lang("LEARNING_INSTITUTE_FORM.ENTER"),
    readOnly: true,
  };
  useEffect(() => {
    const body = { page: 1, pagesize: 100 };
    dispatch(getRoleInfo());
  }, []);

  useEffect(() => {
    if (userRole) {
      let list = [];
      userRole?.data?.map((role) => {
        list.push({ value: role.name, label: role.name });
      });
      setInstituteRoles(list);
    }
  }, [userRole]);

  // useEffect(() => {
  //   if (sectors && sectors.length > 0) {
  //     let list = [];
  //     sectors.map((item) => {
  //       list.push({ value: item.sector, label: item.sector });
  //     });
  //     setSectors(list);
  //   }
  // }, [sectors]);
  useEffect(() => {
    if (scrollToError) {
      const errorField = document.querySelector(".error");
      if (errorField) {
        errorField.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      setScrollToError(false);
    }
  }, [scrollToError]);
  const orgType = [
    { value: "University", label: "University" },
    { value: "Learning Institute", label: "Learning Institute" },
  ];

  const formik = useFormik({
    initialValues: {
      name: data.name,
      orgType: data.orgType,
      // sector: data.sector,
      roleInInstitute: data.roleInInstitute,
      instituteEmail: data.instituteEmail,
      instituteContact: data.instituteContact,
      foundedOn: data.foundedOn,
      twitter: data.twitter,
      facebook: data.facebook,
      instagram: data.instagram,
      pinterest: data.pinterest,
      linkedin: data.linkedin,
      tiktok: data.tiktok,
      youtube: data.youtube,
      instituteURL: data.instituteURL,
      tin: data.tin,
      // iban: data.iban,
      // bicSwiftNumber: data.bicSwiftNumber,
      // pec: data.pec,
      // cu: data.cu,
      tags: data.tags,
      headquarter: data.headquarter,
      countryShortName: data.countryShortName,
      country: data.country,
      branches: data.branches,
      accountTypeFiscal: accountTypeFiscalType.BUSINESS,
    },
    validationSchema: CREATE_LEARNING_INSTITUTE_STEP_ONE(lang),
    onSubmit: async (values) => {
      let obj = {
        email: values.instituteEmail.toLowerCase(),
        tin: values.tin,
        countryShortName: values.countryShortName,
      };
      const res = await dispatch(getValidateEmail(obj));
      if (res.status === 1) {
        next();
        setData({ ...data, ...values });
      }
    },
  });

  /*******************
  @Purpose : Google API Hook to handle place search
   @Parameter : {}
   @Author : INIC
 *******************/
  const onPlaceSelected = async (place) => {
    formik.setFieldValue("headquarter", place.formatted_address);
    await formik.setFieldValue("countryShortName", "");
    await formik.setFieldValue("country", "");

    for (const component of place.address_components) {
      const componentType = component?.types[0];
      switch (componentType) {
        case "country":
          await formik.setFieldValue("countryShortName", component.short_name);
          await formik.setFieldValue("country", component.long_name);
          continue;
      }
    }
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    formik.handleSubmit();
    if (Object.keys(formik.errors).length > 0) {
      setScrollToError(true);
    }
  };
  return (
    <>
      <Container className="p-0">
        <Card className="border-0">
          <Card.Body className="p-0 ">
            <div className="container-fluid p-0">
              {/*   <h5 className="text-body-12 mb-1 font-weight-semibold text-uppercase text-primary">
                {lang("LEARNING_INSTITUTE_FORM.STEP")} 1/2
              </h5>
              <h6 className="mb-md-4">
                {lang("LEARNING_INSTITUTE_FORM.COMPANY_INFORMATION")}
              </h6> */}
              <Form onSubmit={handleFormSubmit}>
                <div className=" pt-0">
                  <Row>
                    <Col md={4}>
                      <div className="mb-3">
                        <span className="form-label">
                          {lang("LEARNING_INSTITUTE_FORM.BUSINESS_NAME")}
                          <sup>*</sup>
                        </span>

                        <Form.Group>
                          <TextField
                            type="text"
                            id="bussness"
                            name="name"
                            placeholder={lang("LEARNING_INSTITUTE_FORM.ENTER")}
                            formik={formik}
                          />
                        </Form.Group>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="mb-3">
                        <span className="form-label">
                          {lang(
                            "LEARNING_INSTITUTE_FORM.CHOOSE_YOUR_ORGANIZATION_TYPE"
                          )}
                          <sup>*</sup>
                        </span>

                        <Form.Group className="mb-0">
                          <div className="custom-selectpicker-xs custom-selectpicker-grey">
                            <SelectField
                              defaultValue={
                                data.orgType
                                  ? {
                                      label: data.orgType,
                                      value: data.orgType,
                                    }
                                  : undefined
                              }
                              name="orgType"
                              options={orgType}
                              placeholder={lang("COMMON.SELECT")}
                              formik={formik}
                            />
                          </div>
                        </Form.Group>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="mb-3">
                        <span className="form-label">
                          {lang(
                            "LEARNING_INSTITUTE_FORM.YOUR_ROLE_IN_THE_INSTITUTE"
                          )}
                          <sup>*</sup>
                        </span>

                        <Form.Group>
                          <div className="custom-selectpicker-xs custom-selectpicker-grey">
                            <CreatableSelectField
                              defaultValue={
                                data?.roleInInstitute
                                  ? {
                                      label: data?.roleInInstitute,
                                      value: data?.roleInInstitute,
                                    }
                                  : undefined
                              }
                              maxMenuHeight={110}
                              name="roleInInstitute"
                              options={instituteRole}
                              formik={formik}
                              onChange={(selected) => {
                                formik?.setFieldValue(
                                  "roleInInstitute",
                                  selected?.value
                                );
                                formik?.setFieldValue(
                                  "selected_roleInInstitute",
                                  selected
                                );
                                if (selected?.__isNew__) {
                                  dispatch(
                                    addRoleInfo({
                                      status: true,
                                      name: selected?.value,
                                    })
                                  );
                                }
                              }}
                            />
                          </div>
                        </Form.Group>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="mb-3">
                        <Form.Group className="mb-0">
                          <TextField
                            type="text"
                            label={lang(
                              "LEARNING_INSTITUTE_FORM.INSTITUTE_URL"
                            )}
                            required={true}
                            id="instituteurl"
                            name="instituteURL"
                            placeholder={lang(
                              "LEARNING_INSTITUTE_FORM.ENTER_LINK"
                            )}
                            formik={formik}
                          />
                        </Form.Group>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="mb-3">
                        <span className="form-label">
                          {lang(
                            "LEARNING_INSTITUTE_FORM.YOUR_INSTITUTE_EMAIL_ADD"
                          )}
                          <sup>*</sup>
                        </span>

                        <Form.Group className="mb-0">
                          <TextField
                            type="email"
                            id="email"
                            name="instituteEmail"
                            placeholder={lang("LEARNING_INSTITUTE_FORM.ENTER")}
                            formik={formik}
                          />
                        </Form.Group>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="mb-3">
                        <Form.Group className="mb-0">
                          <PhoneInput
                            label={lang(
                              "LEARNING_INSTITUTE_FORM.INSTITUTE_CONTACT_NO"
                            )}
                            value={formik.values.instituteContact}
                            required={true}
                            formik={formik}
                            name="instituteContact"
                            type="accountSettings"
                            placeholder={lang("LEARNING_INSTITUTE_FORM.ENTER")}
                          />
                        </Form.Group>
                      </div>
                    </Col>
                    {/*       <Col md={6}>
                      <div className="mb-3">
                        <span className="form-label">
                          {lang("LEARNING_INSTITUTE_FORM.CHOOSE_SECTOR")}
                          <sup>*</sup>
                        </span>

                        <Form.Group className="mb-0">
                          <div className="custom-selectpicker-xs custom-selectpicker-grey">
                            <SelectField
                              defaultValue={{
                                label: data.sector,
                                value: data.sector,
                              }}
                              name="sector"
                              options={sector}
                              placeholder={lang("COMMON.SELECT")}
                              formik={formik}
                            />
                          </div>
                        </Form.Group>
                      </div>
                    </Col> */}

                    <Col md={6}>
                      <div className="mb-3">
                        <Form.Group className="mb-0">
                          <Form.Label>
                            {lang("LEARNING_INSTITUTE_FORM.HEADQUARTER_ADD")}{" "}
                            <sup>*</sup>
                          </Form.Label>
                          <ReactGoogleAutocomplete
                            apiKey={GOOGLE_MAP_API_KEY}
                            type="text"
                            className="floating-input form-control"
                            placeholder={lang("LEARNING_INSTITUTE_FORM.ENTER")}
                            name="headquarter"
                            onPlaceSelected={(place) => {
                              onPlaceSelected(place);
                            }}
                            options={{
                              fields: GOOGLE_PLACE.fields,
                              types: GOOGLE_PLACE.types,
                            }}
                            value={formik.values.headquarter}
                            onChange={(e) => {
                              formik.setFieldValue(
                                "headquarter",
                                e.target.value
                              );
                              formik.setFieldValue("countryShortName", "");
                              formik.setFieldValue("country", "");
                            }}
                            onBlur={formik?.handleBlur}
                          />
                          {formik?.touched?.headquarter &&
                            formik?.errors?.headquarter && (
                              <FormText className={"error"}>
                                {formik?.errors?.headquarter}
                              </FormText>
                            )}

                          {(formik?.errors?.country ||
                            formik?.errors?.countryShortName) &&
                            !formik?.errors?.headquarter && (
                              <FormText className={"error"}>
                                {lang(
                                  "LEARNING_INSTITUTE_FORM.HEADQUARTER_VALIDATION"
                                )}
                              </FormText>
                            )}
                        </Form.Group>
                      </div>
                    </Col>

                    <Col md={6}>
                      <div className="mb-3">
                        <Form.Group className="mb-0">
                          <TextField
                            type="text"
                            id="vat"
                            name="tin"
                            label={lang("LEARNING_INSTITUTE_FORM.VAT_NO")}
                            placeholder={lang("LEARNING_INSTITUTE_FORM.ENTER")}
                            required={true}
                            formik={formik}
                          />
                        </Form.Group>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="mb-3">
                        <span className="form-label">
                          {lang("LEARNING_INSTITUTE_FORM.FOUNDED_ON")}
                        </span>
                        <Form.Group className="mb-0">
                          <DateTimePickerField
                            inputProps={inputProps}
                            timeFormat={false}
                            formik={formik}
                            name="foundedOn"
                            type="stakeholder"
                          />
                        </Form.Group>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="mb-3">
                        <Form.Group className="mb-0">
                          <TextField
                            type="text"
                            label={lang("LEARNING_INSTITUTE_FORM.LINKEDIN")}
                            required={false}
                            placeholder={lang("LEARNING_INSTITUTE_FORM.ENTER")}
                            id="linkedin"
                            name="linkedin"
                            formik={formik}
                          />
                        </Form.Group>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="mb-3">
                        <Form.Group className="mb-0">
                          <TextField
                            type="text"
                            label={lang("LEARNING_INSTITUTE_FORM.TWITTER")}
                            required={false}
                            placeholder={lang("LEARNING_INSTITUTE_FORM.ENTER")}
                            id="twitter"
                            name="twitter"
                            formik={formik}
                          />
                        </Form.Group>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="mb-3">
                        <Form.Group className="mb-0">
                          <TextField
                            type="text"
                            label={lang("LEARNING_INSTITUTE_FORM.YOUTUBE")}
                            required={false}
                            placeholder={lang("LEARNING_INSTITUTE_FORM.ENTER")}
                            id="youtube"
                            name="youtube"
                            formik={formik}
                          />
                        </Form.Group>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="mb-3">
                        <Form.Group className="mb-0">
                          <TextField
                            type="text"
                            label={lang("LEARNING_INSTITUTE_FORM.FACEBOOK")}
                            required={false}
                            placeholder={lang("LEARNING_INSTITUTE_FORM.ENTER")}
                            id="facebook"
                            name="facebook"
                            formik={formik}
                          />
                        </Form.Group>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="mb-3">
                        <Form.Group className="mb-0">
                          <TextField
                            type="text"
                            label={lang("LEARNING_INSTITUTE_FORM.INSTAGRAM")}
                            required={false}
                            placeholder={lang("LEARNING_INSTITUTE_FORM.ENTER")}
                            id="instagram"
                            name="instagram"
                            formik={formik}
                          />
                        </Form.Group>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="mb-3">
                        <Form.Group className="mb-0">
                          <TextField
                            type="text"
                            label={lang("LEARNING_INSTITUTE_FORM.TIKTOK")}
                            required={false}
                            placeholder={lang("LEARNING_INSTITUTE_FORM.ENTER")}
                            id="tiktok"
                            name="tiktok"
                            formik={formik}
                          />
                        </Form.Group>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="mb-3">
                        <Form.Group className="mb-0">
                          <TextField
                            type="text"
                            label={lang("LEARNING_INSTITUTE_FORM.PINTEREST")}
                            required={false}
                            id="pinterest"
                            placeholder={lang("LEARNING_INSTITUTE_FORM.ENTER")}
                            name="pinterest"
                            formik={formik}
                          />
                        </Form.Group>
                      </div>
                    </Col>

                    {/*  <Col md={6}>
                      <div className="mb-3">
                        <span className="form-label">
                          {lang("LEARNING_INSTITUTE_FORM.IBAN")}
                        </span>

                        <Form.Group className="mb-0">
                          <TextField
                            type="text"
                            id="iban"
                            name="iban"
                            formik={formik}
                          />
                        </Form.Group>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="mb-3">
                        <span className="form-label">
                          {lang("LEARNING_INSTITUTE_FORM.BIC_SWIFT_NUMBER")}
                        </span>

                        <Form.Group className="mb-0">
                          <TextField
                            type="text"
                            id="bci number"
                            name="bicSwiftNumber"
                            formik={formik}
                          />
                        </Form.Group>
                      </div>
                    </Col>

                    <Col md={6}>
                      <div className="mb-3">
                        <Form.Group className="mb-0">
                          <TextField
                            type="text"
                            label={lang("LEARNING_INSTITUTE_FORM.PEC")}
                            id="pec"
                            name="pec"
                            required={true}
                            formik={formik}
                          />
                        </Form.Group>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="mb-3">
                        <Form.Group className="mb-0">
                          <TextField
                            type="text"
                            id="cu"
                            name="cu"
                            label={lang("LEARNING_INSTITUTE_FORM.CU")}
                            required={true}
                            formik={formik}
                          />
                        </Form.Group>
                      </div>
                    </Col> */}
                    <Col md={12}>
                      <div className="mb-3">
                        <span className="form-label">
                          {lang("LEARNING_INSTITUTE_FORM.TAGS")}
                          <sup>*</sup>
                        </span>

                        <Form.Group className="mb-0">
                          <div className="custom-selectpicker-xs custom-selectpicker-grey custom-selectpicker-multi">
                            <TagComponent
                              name="tags"
                              formik={formik}
                              type="institute"
                            />
                          </div>
                        </Form.Group>
                      </div>
                    </Col>

                    <Col md={12}>
                      <hr />
                      <h6 className="mt-3 mb-md-3">
                        {" "}
                        {lang("LEARNING_INSTITUTE_FORM.ADD_BRANCHES")}
                      </h6>
                    </Col>

                    <FormikProvider value={formik}>
                      <FieldArray
                        name="branches"
                        validateOnChange={true}
                        render={(arrayHelpers) => {
                          const branchesDetails = formik.values.branches;
                          return (
                            <Col md={12}>
                              {branchesDetails && branchesDetails.length > 0
                                ? branchesDetails.map((branchDetail, index) => (
                                    <div className="mb-4" key={branchDetail.id}>
                                      <Form.Group
                                        className="mb-4"
                                        controlId="institutecontact"
                                      >
                                        <label className="form-label">
                                          {lang(
                                            "LEARNING_INSTITUTE_FORM.OTHER_BRANCH_ADD"
                                          )}{" "}
                                          {index + 1}
                                          {branchesDetails.length > 1 && (
                                            <em
                                              className="bx custom-bx bx-x pointer pl-5 float-right"
                                              onClick={() =>
                                                arrayHelpers.remove(index)
                                              }
                                            ></em>
                                          )}
                                        </label>
                                        <ReactGoogleAutocomplete
                                          apiKey={GOOGLE_MAP_API_KEY}
                                          type="text"
                                          className="floating-input form-control"
                                          placeholder={lang(
                                            "LEARNING_INSTITUTE_FORM.ENTER"
                                          )}
                                          name={`branches.${index}.otherBranchAddress`}
                                          onPlaceSelected={(place) => {
                                            formik.setFieldValue(
                                              `branches.${index}.otherBranchAddress`,
                                              place.formatted_address
                                            );
                                          }}
                                          options={{
                                            fields: GOOGLE_PLACE.fields,
                                            types: GOOGLE_PLACE.types,
                                          }}
                                          value={
                                            formik.values.branches[index]
                                              .otherBranchAddress
                                          }
                                          onChange={formik.handleChange}
                                          onBlur={formik?.handleBlur}
                                        />
                                      </Form.Group>
                                    </div>
                                  ))
                                : null}
                              {branchesDetails.length < 5 && (
                                <div className="pb-4">
                                  <a
                                    role="button"
                                    className="text-primary font-weight-bold font-14"
                                    onClick={() =>
                                      arrayHelpers.push({
                                        otherBranchAddress: "",
                                      })
                                    }
                                  >
                                    <i className="bx bx-plus font-weight-bold"></i>
                                    {lang(
                                      "LEARNING_INSTITUTE_FORM.ADD_BRANCHES"
                                    )}
                                  </a>
                                </div>
                              )}
                            </Col>
                          );
                        }}
                      />
                    </FormikProvider>
                  </Row>
                </div>

                <Row>
                  <Col md={12} className="border-top border-geyser py-4">
                    <div className="justify-content-between d-flex ">
                      <Button
                        variant="btn btn-btn btn-dark-bt-secondary btn-sm font-weight-noramal "
                        onClick={() => router.push("/institute-introduction")}
                      >
                        {lang("COMMON.CANCEL")}
                      </Button>
                      <Button
                        type="submit"
                        variant="btn btn-info font-weight-semibold"
                      >
                        {lang("COMMON.NEXT")}
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
export default WithAuth(CreateProfileInstitute);
