import React, { useEffect, useState } from "react";
import { Row, Col, Form, FormText } from "react-bootstrap";
import {
  DateTimePickerField,
  TextField,
  TextAreaField,
  FileSelectFieldSignUp,
  SelectField,
} from "components/form-fields";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { addRoleInfo, getRoleInfo } from "store/actions/faq";
import SkillsComponent from "components/skills/skills-component";
import { useTranslation } from "react-i18next";
import { CreatableSelectField } from "components/form-fields/select-field";
import { addOrganisation, addUserCompany, getOrganizationList } from "store/actions/experience";
import { GOOGLE_PLACE } from "utils";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import { GOOGLE_MAP_API_KEY } from "config";

/******************** 
  @purpose :Experience
  @Parameter : {i, formik, type, data}
  @Author : INIC
  ******************/
const Experience = ({ i, formik, type, data }) => {
  const dispatch = useDispatch();
  const { userRole } = useSelector((state) => state.faqReducer);
  const { organizationList } = useSelector((state) => state.experience);

  const [lang] = useTranslation("language");
  const [langOptions, setLangOptions] = useState([]);
  const [instituteOptions, setInstituteOptions] = useState([]);
  const [employmentOptions, setEmploymentOptions] = useState([]);
  const options = [
    { value: "full-time", label: "Full-time" },
    { value: "part-time", label: "Part-time" },
    { value: "self-employed", label: "Self-employed" },
    { value: "freelance", label: "Freelance" },
    { value: "internship", label: "Internship" },
  ];

  /******************** 
  @purpose :Get Role Info 
  @Parameter : {}
  @Author : INIC
  ******************/
  useEffect(() => {
    const body = { page: 1, pagesize: 100 };
    dispatch(getRoleInfo());

    dispatch(getOrganizationList());
  }, []);
  const inputPropsStartDate = {
    placeholder: lang("COMMON.DATE_PLACEHOLDER"),
    readOnly: true,
  };
  const inputPropsEndDate = {
    placeholder: lang("COMMON.DATE_PLACEHOLDER"),
    readOnly: true,
    disabled: formik.values.experience[i].currentlyWorking,
    value: formik?.values?.experience[i]?.currentlyWorking
      ? ""
      : formik?.values?.experience[i]?.endDate !== "Invalid date"
      ? formik?.values?.experience[i]?.endDate
      : "",
  };
  /******************** 
  @purpose :Validate Function Start Date and End Date 
  @Parameter : {}
  @Author : INIC
  ******************/
  const validateDateFnStartDate = (date) => {
    const endDate = formik.values?.experience?.[i]?.endDate;
    return (
      date.isSameOrBefore(moment(new Date(), "DD/MM/YYYY")) &&
      (!endDate || date.isBefore(moment(endDate, "DD/MM/YYYY")))
    );
  };

  const validateDateFnEndDate = (date) => {
    const startDate = formik.values?.experience?.[i]?.startDate;
    return (
      date.isSameOrBefore(moment(new Date(), "DD/MM/YYYY")) &&
      (!startDate ||
        moment(date.format("DD/MM/YYYY"), "DD/MM/YYYY").isSameOrAfter(
          moment(startDate, "DD/MM/YYYY")
        ))
    );
  };

  /******************** 
@purpose : Used for get user roles
@Parameter : {  }
@Author : INIC
******************/
  const getUserRoles = () => {
    const userRoleArray = [];
    userRole?.data?.map((langData) => {
      userRoleArray.push({
        label: langData.name,
        value: langData.name,
      });
      setLangOptions(userRoleArray);
    });
  };

  /******************** 
@purpose : Used for get Learning Institute List
@Parameter : {  }
@Author : INIC
******************/
  const getInstituteList = () => {
    const listArray = [];
    organizationList?.rows?.map((ele) => {
      listArray.push({
        label: ele?.name,
        value: ele?.id,
        type: ele?.type,
        logo: ele?.logo,
      });
    });

    setInstituteOptions(listArray);
  };

  /******************** 
  @purpose : Used for get user roles
  @Parameter : {  }
  @Author : INIC
  ******************/
  const getEmployment = () => {
    const employmentArray = [];
    options.map((langData) => {
      employmentArray.push({
        label: langData.label,
        value: langData.value,
      });
      setEmploymentOptions(employmentArray);
    });
  };

  return (
    <Row>
      <Col sm={12}>
        <Form.Group controlId="signupRole">
          <Form.Label>
            {lang("EXPERIENCE.FORM.ROLE")}
            {type === "profile" && <sup className="">*</sup>}
          </Form.Label>
          <div className="custom-selectpicker">
            <CreatableSelectField
              defaultValue={{
                value: data?.role,
                label: data?.role,
              }}
              options={langOptions}
              onMenuOpen={getUserRoles}
              maxMenuHeight={110}
              name={`experience.${i}.role`}
              formik={formik}
              onChange={(selected) => {
                formik?.setFieldValue(`experience.${i}.role`, selected?.value);
                formik?.setFieldValue(
                  `selected_experience.${i}.role`,
                  selected
                );
                if (selected?.__isNew__) {
                  dispatch(
                    addRoleInfo({ status: true, name: selected?.value })
                  );
                }
              }}
            />
          </div>
          {formik?.touched["experience"]?.[i]?.role &&
            formik?.errors["experience"]?.[i]?.role && (
              <FormText className={"error"}>
                {formik?.errors["experience"]?.[i]?.role}
              </FormText>
            )}
        </Form.Group>
      </Col>

      <Col sm={12}>
        <Form.Group>
          <Form.Label>
            {lang("EXPERIENCE.FORM.COMPANY_NAME")}
            {type === "profile" && <sup className="">*</sup>}
          </Form.Label>
          <CreatableSelectField
            defaultValue={{
              value: data?.organisationId,
              label: data?.organisationName,
            }}
            options={instituteOptions}
            onMenuOpen={getInstituteList}
            maxMenuHeight={110}
            name={`experience.${i}.organisationName`}
            formik={formik}
            onChange={(selected) => {
              const isAddedByUser = !selected.type;
              if (isAddedByUser) {
                console.log("yes", selected);

                addOrganisation({
                  name: selected.value,
                  type:"company"
                }).then((res)=>{
                  const coDetails = res.co;
                  formik?.setFieldValue(
                    `experience.${i}.organisationName`,
                    selected?.label
                  );
                  formik?.setFieldValue(
                    `experience.${i}.organisationId`,
                    coDetails?.id
                  );
                  formik?.setFieldValue(
                    `experience.${i}.uploadUrl`,
                    ""
                  );
                  formik?.setFieldValue(
                    `experience.${i}.organisationType`,
                    "Company"
                  );
                  formik?.setFieldValue(
                    `selected_experience.${i}.organisationName`,
                    selected
                  );
                })
                dispatch(getOrganizationList());
              } else {
                formik?.setFieldValue(
                  `experience.${i}.organisationName`,
                  selected?.label
                );
                if (selected?.logo) {
                  formik?.setFieldValue(
                    `experience.${i}.uploadUrl`,
                    selected?.logo
                  );
                }
                formik?.setFieldValue(
                  `experience.${i}.organisationId`,
                  selected?.value
                );
                formik?.setFieldValue(
                  `experience.${i}.organisationType`,
                  selected?.type
                );
                formik?.setFieldValue(
                  `selected_experience.${i}.organisationName`,
                  selected
                );
              }
            }}
          />
          {formik?.touched["experience"]?.[i]?.organisationName &&
            formik?.errors["experience"]?.[i]?.organisationName && (
              <FormText className={"error"}>
                {formik?.errors["experience"]?.[i]?.organisationName}
              </FormText>
            )}
        </Form.Group>
      </Col>
      <Col sm={12}>
        <Form.Group controlId="signupUploadCertificate" className="file-area">
          <Form.Label>{lang("CERTIFICATE.FORM.UPLOAD")}</Form.Label>
          <FileSelectFieldSignUp
            name={`experience.${i}.uploadUrl`}
            formik={formik}
            i={i}
            isEdit={true}
            isExperience={true}
          />
          {formik?.touched["experience"]?.[i]?.uploadUrl &&
            formik?.errors["experience"]?.[i]?.uploadUrl && (
              <FormText className={"error"}>
                {formik?.errors["experience"]?.[i]?.uploadUrl}
              </FormText>
            )}
        </Form.Group>
      </Col>
      <Col sm={12}>
        <Form.Group controlId="signupRole">
          <div className="custom-selectpicker">
            <SkillsComponent
              skills={`experience.${i}.skills`}
              formik={formik}
              skillValue={formik?.values?.experience?.[i]?.skills}
            />
          </div>
        </Form.Group>
      </Col>

      <Col sm={6}>
        <Form.Label>{lang("EXPERIENCE.FORM.LOCATION")}</Form.Label>
        <Form.Group controlId="signupLocation">
          <ReactGoogleAutocomplete
            apiKey={GOOGLE_MAP_API_KEY}
            type="text"
            className="floating-input form-control"
            placeholder={lang("EXPERIENCE.FORM.LOCATION_PLACEHOLDER")}
            required={type === "profile" && true}
            name={`experience.${i}.location`}
            onPlaceSelected={(place) =>
              formik.setFieldValue(
                `experience.${i}.location`,
                place.formatted_address
              )
            }
            options={{
              fields: GOOGLE_PLACE.fields,
              types: GOOGLE_PLACE.types,
            }}
            value={formik?.values["experience"]?.[i]?.location}
            onChange={formik.handleChange}
            onBlur={formik?.handleBlur}
          />

          {formik?.touched["experience"]?.[i]?.location &&
            formik?.errors["experience"]?.[i]?.location && (
              <FormText className={"error"}>
                {formik?.errors["experience"]?.[i]?.location}
              </FormText>
            )}
        </Form.Group>
      </Col>

      <Col sm={6}>
        <Form.Group controlId="formEditExpEmpType">
          <Form.Label>
            {lang("EXPERIENCE.FORM.EMPLOYMENT_TYPE")} <sup>*</sup>
          </Form.Label>
          <div className="custom-selectpicker">
            <SelectField
              defaultValue={{
                value: data?.employmentType,
                label: data?.employmentType,
              }}
              options={employmentOptions}
              onMenuOpen={getEmployment}
              maxMenuHeight={170}
              name={`experience.${i}.employmentType`}
              formik={formik}
            />
            {formik?.touched["experience"]?.[i]?.employmentType &&
              formik?.errors["experience"]?.[i]?.employmentType && (
                <FormText className={"error"}>
                  {formik?.errors["experience"]?.[i]?.employmentType}
                </FormText>
              )}
          </div>
        </Form.Group>
      </Col>

      <Col sm={6}>
        <Form.Group controlId="signupStartDate">
          <Form.Label>
            {lang("COMMON.START_DATE")}
            {type === "profile" && <sup className="text-danger">*</sup>}
          </Form.Label>
          <DateTimePickerField
            inputProps={inputPropsStartDate}
            timeFormat={false}
            validateDateFn={validateDateFnStartDate}
            formik={formik}
            name={`experience.${i}.startDate`}
          />
          {formik?.touched["experience"]?.[i]?.startDate &&
            formik?.errors["experience"]?.[i]?.startDate && (
              <FormText className={"error"}>
                {formik?.errors["experience"]?.[i]?.startDate}
              </FormText>
            )}
        </Form.Group>
      </Col>

      <Col sm={6}>
        <Form.Group controlId="signupEndDate">
          <Form.Label>
            {lang("COMMON.END_DATE")}{" "}
            {!formik?.values?.experience[i]?.currentlyWorking && <sup>*</sup>}
          </Form.Label>
          <DateTimePickerField
            inputProps={inputPropsEndDate}
            timeFormat={false}
            validateDateFn={validateDateFnEndDate}
            formik={formik}
            name={`experience.${i}.endDate`}
            currentlyWorking={formik?.values?.experience[i]?.currentlyWorking}
          />
          {formik?.touched["experience"]?.[i]?.endDate &&
            formik?.errors["experience"]?.[i]?.endDate && (
              <FormText className={"error"}>
                {formik?.errors["experience"]?.[i]?.endDate}
              </FormText>
            )}
        </Form.Group>
      </Col>

      <div className="col-sm-12 custom-checkbox checkbox-blue d-flex mb-3">
        <label className="mr-2 font-14">
          <input
            type="checkbox"
            defaultChecked={data?.currentlyWorking}
            onChange={(e) =>
              formik.setFieldValue(
                `experience.${i}.currentlyWorking`,
                e.target.checked
              )
            }
          ></input>
          <span></span>
          Currently Working
        </label>
      </div>

      <Col sm={6}>
        <Form.Group>
          <TextField
            type="text"
            label={lang("EXPERIENCE.FORM.HEADLINE")}
            placeholder={lang("EXPERIENCE.FORM.HEADLINE")}
            required={false}
            name={`experience.${i}.headline`}
            formik={formik}
          />
        </Form.Group>
      </Col>
      <Col sm={6}>
        <Form.Group>
          <TextField
            type="text"
            label={lang("EXPERIENCE.FORM.INDUSTRY")}
            placeholder={lang("EXPERIENCE.FORM.INDUSTRY")}
            required={false}
            name={`experience.${i}.industry`}
            formik={formik}
          />
        </Form.Group>
      </Col>

      <Col sm={12}>
        <Form.Group controlId="signupExperienceDescription" className="mb-2">
          <TextAreaField
            label={lang("EXPERIENCE.FORM.DESCRIPTION")}
            placeholder={lang("EXPERIENCE.FORM.DESCRIPTION_PLACEHOLDER")}
            rows={4}
            required={false}
            name={`experience.${i}.description`}
            formik={formik}
          />
          <p className="text-right d-flex align-items-center">
            {formik?.touched["experience"]?.[i]?.description &&
              formik?.errors["experience"]?.[i]?.description && (
                <FormText className={"error"}>
                  {formik?.errors["experience"]?.[i]?.description}
                </FormText>
              )}
            <span
              className={
                formik.values["experience"]?.[i]?.description?.length < 2000
                  ? "text-muted ml-auto font-14"
                  : formik.values["experience"]?.[i]?.description?.length > 2000
                  ? "text-dange ml-auto font-14r"
                  : "text-muted ml-auto font-14"
              }
            >
              {formik.values["experience"]?.[i]?.description?.length}/
            </span>
            <span className="text-success">{2000}</span>
          </p>
        </Form.Group>
      </Col>
    </Row>
  );
};

export default Experience;
