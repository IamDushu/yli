import React, { useEffect, useState } from "react";
import {
  DateTimePickerField,
  SelectField,
  FileSelectFieldSignUp,
  TextField,
} from "components/form-fields";
import { Row, Col, Form, FormText } from "react-bootstrap";
import moment from "moment";
import { TextAreaField } from "../form-fields";
import SkillsComponent from "components/skills/skills-component";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  addOrganisation,
  getLearningInstituteList,
  getOrganizationList,
} from "store/actions/experience";
import Select from "react-select";
import { CreatableSelectField } from "components/form-fields/select-field";
const EducationDetails = ({ formik, i, type, data }) => {
  const [lang] = useTranslation("language");
  const inputProps = {
    placeholder: lang("COMMON.DATE_PLACEHOLDER"),
    readOnly: true,
  };
  const dispatch = useDispatch();
  const { organizationList } = useSelector((state) => state.experience);
  const [instituteOptions, setInstituteOptions] = useState([]);
  /******************** 
  @purpose :Validate Function Start Date and End Date 
  @Parameter : {}
  @Author : INIC
  ******************/
  const validateDateFnStartDate = (date) => {
    let endDate = formik.values?.educationDetails[i]?.endDate;
    return (
      date.isSameOrBefore(moment(new Date(), "DD/MM/YYYY")) &&
      (!endDate || date.isBefore(moment(endDate, "DD/MM/YYYY")))
    );
  };

  const validateDateFnEndDate = (date) => {
    let startDate = formik.values?.educationDetails[i]?.startDate;
    return (
      date.isSameOrBefore(moment(new Date(), "DD/MM/YYYY")) &&
      (!startDate ||
        moment(date.format("DD/MM/YYYY"), "DD/MM/YYYY").isAfter(
          moment(startDate, "DD/MM/YYYY")
        ))
    );
  };

  useEffect(() => {
    dispatch(getOrganizationList());
  }, []);
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
        logo: ele?.logo,
      });
    });

    setInstituteOptions(listArray);
  };

  return (
    <Row>
      <Col sm={12}>
        <Form.Label>
          {lang("EDUCATION.FORM.ADD_UNIVERSITY")}
          {type === "profile" && <sup className="text-danger">*</sup>}
        </Form.Label>
        <Form.Group controlId="signupInstitute">
          <CreatableSelectField
            defaultValue={{
              value: data?.instituteId,
              label: data?.instituteName,
            }}
            options={instituteOptions}
            name={`educationDetails.${i}.instituteName`}
            onMenuOpen={getInstituteList}
            onChange={(opt) => {
              const isAddedByUser = opt.__isNew__;
              if (isAddedByUser) {
                addOrganisation({
                  name: opt.value,
                  type: "LearningInstitute",
                }).then((res) => {
                  const liDetails = res.li;
                  formik?.setFieldValue(
                    `educationDetails.${i}.instituteName`,
                    opt?.label
                  );
                  formik?.setFieldValue(
                    `educationDetails.${i}.instituteId`,
                    liDetails?.id
                  );
                  formik?.setFieldValue(`educationDetails.${i}.uploadUrl`, "");
                });
                dispatch(getOrganizationList());
              } else {
                if (opt?.logo) {
                  formik?.setFieldValue(
                    `educationDetails.${i}.uploadUrl`,
                    opt?.logo
                  );
                }
                formik.setFieldValue(
                  `educationDetails.${i}.instituteName`,
                  opt?.label
                );
                formik.setFieldValue(
                  `educationDetails.${i}.instituteId`,
                  opt?.value
                );
              }
            }}
          />
          {formik?.touched["educationDetails"]?.[i]?.instituteName &&
            formik?.errors["educationDetails"]?.[i]?.instituteName && (
              <FormText className={"error"}>
                {formik?.errors["educationDetails"]?.[i]?.instituteName}
              </FormText>
            )}
        </Form.Group>
      </Col>

      <Col sm={12}>
        <Form.Label>{lang("CERTIFICATE.FORM.UPLOAD")}</Form.Label>
        <Form.Group controlId="signupUploadCertificate" className="file-area">
          <FileSelectFieldSignUp
            className="fullwidth-dropzone sm-6 md-6 lg-6 mb-3"
            name={`educationDetails.${i}.uploadUrl`}
            formik={formik}
            i={i}
            isEdit={true}
            isEducation={true}
          />
          {formik?.touched["educationDetails"]?.[i]?.uploadUrl &&
            formik?.errors["educationDetails"]?.[i]?.uploadUrl && (
              <FormText className={"error"}>
                {formik?.errors["educationDetails"]?.[i]?.uploadUrl}
              </FormText>
            )}
        </Form.Group>
      </Col>

      <Col sm={12}>
        <Form.Group controlId="signupEducation">
          <TextField
            type="text"
            label={lang("EDUCATION.FORM.ADD_DEGREE")}
            placeholder={lang("EDUCATION.FORM.ADD_DEGREE_PLACEHOLDER")}
            required={type === "profile" && true}
            name={`educationDetails.${i}.degree`}
            formik={formik}
          />
          {formik?.touched["educationDetails"]?.[i]?.degree &&
            formik?.errors["educationDetails"]?.[i]?.degree && (
              <FormText className={"error"}>
                {formik?.errors["educationDetails"]?.[i]?.degree}
              </FormText>
            )}
        </Form.Group>
      </Col>
      <Col sm={12}>
        <Form.Group controlId="signupRole">
          <div className="custom-selectpicker">
            <SkillsComponent
              skills={`educationDetails.${i}.skills`}
              formik={formik}
              skillValue={formik?.values?.educationDetails?.[i]?.skills}
            />
          </div>
        </Form.Group>
      </Col>
      <Col sm={6}>
        <Form.Group controlId="signupEducation">
          <TextField
            type="text"
            label={lang("EDUCATION.FORM.ADD_FIELD_OF_STUDY")}
            placeholder={lang("EDUCATION.FORM.ADD_FIELD_OF_STUDY_PLACEHOLDER")}
            name={`educationDetails.${i}.fieldOfStudy`}
            required={false}
            formik={formik}
          />
        </Form.Group>
      </Col>
      <Col sm={6}>
        <Form.Group controlId="signupEducation">
          <TextField
            type="text"
            label={lang("EDUCATION.FORM.ADD_GRADE")}
            placeholder={lang("EDUCATION.FORM.ADD_GRADE_PLACEHOLDER")}
            name={`educationDetails.${i}.grade`}
            required={false}
            formik={formik}
          />
        </Form.Group>
      </Col>

      <Col sm={6}>
        <Form.Group controlId="signupStartDate">
          <Form.Label>
            {lang("COMMON.START_DATE")} <sup className="text-danger">*</sup>
            {/* {type === "profile" && <sup className="text-danger">*</sup>} */}
          </Form.Label>
          <DateTimePickerField
            inputProps={inputProps}
            timeFormat={false}
            validateDateFn={validateDateFnStartDate}
            formik={formik}
            name={`educationDetails.${i}.startDate`}
          />
          {formik?.touched["educationDetails"]?.[i]?.startDate &&
            formik?.errors["educationDetails"]?.[i]?.startDate && (
              <FormText className={"error"}>
                {formik?.errors["educationDetails"]?.[i]?.startDate}
              </FormText>
            )}
        </Form.Group>
      </Col>

      <Col sm={6}>
        <Form.Group controlId="signupEndDate">
          <Form.Label>
            {lang("COMMON.END_DATE")}
            {/* {type === "profile" && <sup className="text-danger">*</sup>} */}
          </Form.Label>
          <DateTimePickerField
            inputProps={inputProps}
            timeFormat={false}
            validateDateFn={validateDateFnEndDate}
            formik={formik}
            name={`educationDetails.${i}.endDate`}
            isClearable={true}
          />
          {formik?.touched["educationDetails"]?.[i]?.endDate &&
            formik?.errors["educationDetails"]?.[i]?.endDate && (
              <FormText className={"error"}>
                {formik?.errors["educationDetails"]?.[i]?.endDate}
              </FormText>
            )}
        </Form.Group>
      </Col>

      <Col sm={12}>
        <Form.Group controlId="signupShortDescription" className="mb-2">
          <TextAreaField
            label={lang("EDUCATION.FORM.ADD_ACTIVITIES")}
            placeholder={lang("EDUCATION.FORM.ADD_ACTIVITIES_PLACEHOLDER")}
            rows={4}
            name={`educationDetails.${i}.activities`}
            formik={formik}
            required={false}
            type="signup"
          />
          <p className="text-right d-flex align-items-center">
            {formik?.touched["educationDetails"]?.[i]?.activities &&
              formik?.errors["educationDetails"]?.[i]?.activities && (
                <FormText className={"error"}>
                  {formik?.errors["educationDetails"]?.[i]?.activities}
                  {/* {formik.values["educationDetails"]?.[i]?.activities &&
                  formik.values["educationDetails"]?.[i]?.activities?.length >
                    2000 && (
                    <span>
                      - limit exceeded{" "}
                      {formik.values["educationDetails"]?.[i]?.activities
                        ?.length - 2000}{" "}
                      characters
                    </span>
                  )} */}
                </FormText>
              )}
            <span
              className={
                formik.values["educationDetails"]?.[i]?.activities?.length <
                2000
                  ? "text-muted ml-auto font-14"
                  : formik.values["educationDetails"]?.[i]?.activities?.length >
                    2000
                  ? "text-dange ml-auto font-14r"
                  : "text-muted ml-auto font-14"
              }
            >
              {formik.values["educationDetails"]?.[i]?.activities?.length}/
            </span>
            <span className="text-success">{2000}</span>
          </p>
        </Form.Group>
      </Col>

      <Col sm={12}>
        <Form.Group controlId="signupShortDescription" className="mb-2">
          <TextAreaField
            label={lang("EDUCATION.FORM.ADD_DESCRIPTION")}
            placeholder={lang("EDUCATION.FORM.ADD_ACTIVITIES_PLACEHOLDER")}
            rows={4}
            name={`educationDetails.${i}.description`}
            formik={formik}
            required={false}
            type="signup"
          />
          <p className="text-right d-flex align-items-center">
            {formik?.touched["educationDetails"]?.[i]?.description &&
              formik?.errors["educationDetails"]?.[i]?.description && (
                <FormText className={"error"}>
                  {formik?.errors["educationDetails"]?.[i]?.description}
                  {/* {formik.values["educationDetails"]?.[i]?.description &&
                  formik.values["educationDetails"]?.[i]?.description?.length >
                    2000 && (
                    <span>
                      - limit exceeded{" "}
                      {formik.values["educationDetails"]?.[i]?.description
                        ?.length - 2000}{" "}
                      characters
                    </span>
                  )} */}
                </FormText>
              )}
            <span
              className={
                formik.values["educationDetails"]?.[i]?.description?.length <
                2000
                  ? "text-muted ml-auto font-14"
                  : formik.values["educationDetails"]?.[i]?.description
                      ?.length > 2000
                  ? "text-dange ml-auto font-14r"
                  : "text-muted ml-auto font-14"
              }
            >
              {formik.values["educationDetails"]?.[i]?.description?.length}/
            </span>
            <span className="text-success">{2000}</span>
          </p>
        </Form.Group>
      </Col>
    </Row>
  );
};

export default EducationDetails;
