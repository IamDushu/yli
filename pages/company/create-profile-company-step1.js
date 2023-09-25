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
  CREATE_COMPANY_STEP_ONE,
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

const CreateProfileCompany = ({ next, setData, data }) => {
  const inputProps = {
    placeholder: "Select",
    readOnly: true,
  };
  const router = useRouter();
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const { userRole } = useSelector((state) => state.faqReducer);
  const { sectors } = useSelector((state) => state.learningInstitute);

  const [companyRole, setCompanyRoles] = useState([]);
  const [sector, setSectors] = useState([]);
  const [scrollToError, setScrollToError] = useState(false);

  useEffect(() => {
    dispatch(getRoleInfo());
  }, []);

  useEffect(() => {
    if (userRole) {
      let list = [];
      userRole?.data?.map((role) => {
        list.push({ value: role.name, label: role.name });
      });
      setCompanyRoles(list);
    }
  }, [userRole]);

  useEffect(() => {
    if (sectors && sectors?.length > 0) {
      let list = [];
      sectors.map((item) => {
        list.push({
          value: item?.name || item?.sector,
          label: item?.name || item?.sector,
        });
      });
      setSectors(list);
    }
  }, [sectors]);

  useEffect(() => {
    if (scrollToError) {
      const errorField = document.querySelector(".error");
      if (errorField) {
        errorField.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      setScrollToError(false);
    }
  }, [scrollToError]);

  const companyStrengthOptions = [
    { value: "small", label: "Small Company (<200 Employees)" },
    { value: "medium", label: "Medium or Large (>200 Employees)" },
    { value: "no-profit-organization", label: "Non Profit Organization" },
    { value: "public-institute", label: "Public Institute" },
  ];

  const formik = useFormik({
    initialValues: {
      companyStrength: data?.companyStrength,
      companyName: data?.companyName,
      industry: data?.industry,
      roleInCompany: data?.roleInCompany,
      companyEmail: data?.companyEmail,
      companyContact: data?.companyContact,
      // foundedOn: data?.foundedOn,
      // companyURL: data?.companyURL,
      tin: data?.tin,
      // iban: data?.iban,
      // bicSwiftNumber: data?.bicSwiftNumber,
      // pec: data?.pec,
      // cu: data?.cu,
      tags: data?.tags,
      headquarter: data?.headquarter,
      countryShortName: data?.countryShortName,
      country: data?.country,
      state: data?.state,
      city: data?.city,
      branches: data?.branches,
      accountTypeFiscal: accountTypeFiscalType.BUSINESS,
    },
    validationSchema: CREATE_COMPANY_STEP_ONE(lang),
    onSubmit: async (values) => {
      let obj = {
        email: values.companyEmail.toLowerCase(),
        tin: values.tin,
        countryShortName: values.countryShortName,
      };
      const res = await dispatch(getValidateEmail(obj));
      if (res.status === 1) {
        setData({ ...data, ...values });
        next();
      }
    },
  });
  /*******************
  @Purpose : Google API Hook to handle place search
   @Parameter : {}
   @Author : YLIWAY
 *******************/
  const onPlaceSelected = async (place) => {
    formik.setFieldValue("headquarter", place.formatted_address);
    await formik.setFieldValue("country", "");
    await formik.setFieldValue("countryShortName", "");
    for (const component of place.address_components) {
      const componentType = component?.types[0];
      switch (componentType) {
        case "country":
          let country = component.long_name;
          await formik.setFieldValue("country", country);
          await formik.setFieldValue("countryShortName", component.short_name);
          continue;
        case "locality":
          let city = component.long_name;
          await formik.setFieldValue("city", city);
          break;

        case "administrative_area_level_1": {
          let stateName = component.long_name;
          await formik.setFieldValue("state", stateName);
          break;
        }
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
                {lang("COMPANY_FORM.STEP")} 1/2
              </h5>
              <h6 className="mb-md-4">
                {lang("COMPANY_FORM.COMPANY_DETAILS")}
              </h6> */}
              <Form onSubmit={handleFormSubmit}>
                <div className=" pt-0">
                  <Row>
                    {/* First Row */}
                    <Col md={4}>
                      <div className="mb-3">
                        <span className="form-label">
                          {lang("COMPANY_FORM.COMPANY_STRENGTH")}
                          <sup>*</sup>
                        </span>

                        <Form.Group className="mb-0">
                          <div className="custom-selectpicker-xs custom-selectpicker-grey">
                            <SelectField
                              defaultValue={
                                data?.selected_companyStrength || ""
                              }
                              name="companyStrength"
                              options={companyStrengthOptions}
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
                          {lang("COMPANY_FORM.COMPANY_NAME")}
                          <sup>*</sup>
                        </span>

                        <Form.Group>
                          <TextField
                            type="text"
                            id="companyName"
                            placeholder={lang("LEARNING_INSTITUTE_FORM.ENTER")}
                            name="companyName"
                            formik={formik}
                          />
                        </Form.Group>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="mb-3">
                        <span className="form-label">
                          {lang("COMPANY_FORM.INDUSTRY")}
                          <sup>*</sup>
                        </span>

                        <Form.Group className="mb-0">
                          <div className="custom-selectpicker-xs custom-selectpicker-grey">
                            <SelectField
                              defaultValue={data?.selected_industry || ""}
                              name="industry"
                              options={sector}
                              placeholder={lang("COMMON.SELECT")}
                              formik={formik}
                            />
                          </div>
                        </Form.Group>
                      </div>
                    </Col>
                    {/* Second Row */}
                    <Col md={4}>
                      <div className="mb-3">
                        <span className="form-label">
                          {lang("COMPANY_FORM.ROLE")}
                          <sup>*</sup>
                        </span>

                        <Form.Group className="mb-0">
                          <div className="custom-selectpicker-xs custom-selectpicker-grey">
                            <CreatableSelectField
                              defaultValue={
                                data?.roleInCompany
                                  ? {
                                      label: data?.roleInCompany,
                                      value: data?.roleInCompany,
                                    }
                                  : undefined
                              }
                              maxMenuHeight={110}
                              name="roleInCompany"
                              options={companyRole}
                              formik={formik}
                              onChange={(selected) => {
                                formik?.setFieldValue(
                                  "roleInCompany",
                                  selected?.value
                                );
                                formik?.setFieldValue(
                                  "selected_roleInCompany",
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
                        <span className="form-label">
                          {lang("COMPANY_FORM.YOUR_EMAIL")}
                          <sup>*</sup>
                        </span>

                        <Form.Group className="mb-0">
                          <TextField
                            type="email"
                            id="email"
                            name="companyEmail"
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
                            label={lang("COMPANY_FORM.CONTACT_NO")}
                            value={formik.values.companyContact}
                            required={true}
                            formik={formik}
                            name="companyContact"
                            type="accountSettings"
                          />
                        </Form.Group>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="mb-3">
                        <Form.Group className="mb-0">
                          <Form.Label>
                            {lang("COMPANY_FORM.HEADQUARTER_ADD")}
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
                            onChange={formik.handleChange}
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
                            placeholder={lang("LEARNING_INSTITUTE_FORM.ENTER")}
                            label={lang("COMPANY_FORM.VAT_NO")}
                            required={true}
                            formik={formik}
                          />
                        </Form.Group>
                      </div>
                    </Col>
                    {/* Third Row */}

                    {/* <Col md={4}>
                      <div className="mb-3">
                        <span className="form-label">
                          {lang("COMPANY_FORM.FOUNDED_ON")}
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
                            label={lang("COMPANY_FORM.SITE_URL")}
                            required={true}
                            id="companyURL"
                            name="companyURL"
                            formik={formik}
                          />
                        </Form.Group>
                      </div>
                    </Col>
                    

                    <Col md={4}>
                      <div className="mb-3">
                        <span className="form-label">
                          {lang("COMPANY_FORM.IBAN")}
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

                    <Col md={4}>
                      <div className="mb-3">
                        <span className="form-label">
                          {lang("COMPANY_FORM.BIC_SWIFT_NUMBER")}
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
                   

                    <Col md={4}>
                      <div className="mb-3">
                        <Form.Group className="mb-0">
                          <TextField
                            type="text"
                            label={lang("COMPANY_FORM.PEC")}
                            id="pec"
                            name="pec"
                            required={true}
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
                            id="cu"
                            name="cu"
                            label={lang("COMPANY_FORM.CU")}
                            required={true}
                            formik={formik}
                          />
                        </Form.Group>
                      </div>
                    </Col>
                     */}
                    <Col md={12}>
                      <div className="mb-3">
                        <span className="form-label">
                          {lang("COMPANY_FORM.TAGS")}
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
                        {lang("COMPANY_FORM.ADD_BRANCHES")}
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
                              {branchesDetails && branchesDetails?.length > 0
                                ? branchesDetails.map((branchDetail, index) => (
                                    <div className="mb-4" key={branchDetail.id}>
                                      <Form.Group
                                        className="mb-4"
                                        controlId="institutecontact"
                                      >
                                        <label className="form-label">
                                          {lang(
                                            "COMPANY_FORM.OTHER_BRANCH_ADD"
                                          )}{" "}
                                          {index + 1}
                                          {branchesDetails?.length > 1 && (
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
                              {branchesDetails?.length < 5 && (
                                <>
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
                                      {lang("COMPANY_FORM.ADD_BRANCHES")}
                                    </a>
                                  </div>
                                </>
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
                        onClick={() =>
                          router.push("company/company-introduction")
                        }
                      >
                        {lang("COMMON.CANCEL")}
                      </Button>
                      <Button
                        type="submit"
                        variant="info"
                        className="d-flex font-weight-semibold"
                      >
                        {lang("COMMON.NEXT")}
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
export default WithAuth(CreateProfileCompany);
