import React from "react";
import { Row, Col, Form, FormText, Button } from "react-bootstrap";
import {
  TextField,
  TextAreaField,
  FileSelectFieldSignUp,
  DateTimePickerField,
  SelectField,
} from "components/form-fields";
import moment from "moment";
import SkillsComponent from "components/skills/skills-component";
import { useTranslation } from "react-i18next";

const isValidDate = (currentDate) => currentDate.isBefore(new Date());

/******************** 
  @purpose :Certifications 
  @Parameter : {i, formik, isEdit, type}
  @Author : INIC
  ******************/
const Certifications = ({ i, formik, isEdit, type, data }) => {
  const [lang] = useTranslation("language");
  const inputProps = {
    placeholder: lang("COMMON.DATE_PLACEHOLDER"),
    readOnly: false,
  };
  /******************** 
  @purpose :Validate Function Start Date and End Date 
  @Parameter : {}
  @Author : INIC
  ******************/
  const validateDateFnStartDate = (date) => {
    let x = formik.values?.certificate[i]?.expirationDate;
    if (x !== "") {
      return date.isBefore(moment(x, "DD/MM/YYYY"));
    }
    return true;
  };
  const validateDateFnEndDate = (date) => {
    let y = formik.values?.certificate[i]?.issuedDate;
    if (y !== "") {
      return moment(date.format("DD/MM/YYYY"), "DD/MM/YYYY").isAfter(
        moment(y, "DD/MM/YYYY")
      );
    }
    return true;
  };
  return (
    <Row>
      <Col sm={12}>
        <Form.Group controlId="signupUploadCertificate" className="file-area">
          <Form.Label>{lang("CERTIFICATE.FORM.UPLOAD")}</Form.Label>
          <FileSelectFieldSignUp
            name={`certificate.${i}.url`}
            formik={formik}
            i={i}
            isEdit={isEdit}
          />
          {formik?.touched["certificate"]?.[i]?.url &&
            formik?.errors["certificate"]?.[i]?.url && (
              <FormText className={"error"}>
                {formik?.errors["certificate"]?.[i]?.url}
              </FormText>
            )}
        </Form.Group>
      </Col>

      <Col sm={12}>
        <Form.Group controlId="signupCertificateTitle">
          <TextField
            type="text"
            label={lang("CERTIFICATE.FORM.TITLE")}
            placeholder={lang("CERTIFICATE.FORM.TITLE_PLACEHOLDER")}
            required={type === "profile" && true}
            name={`certificate.${i}.title`}
            formik={formik}
          />
          <p className="text-right d-flex align-items-center">
            {formik?.touched["certificate"]?.[i]?.title &&
              formik?.errors["certificate"]?.[i]?.title && (
                <FormText className={"error"}>
                  {formik?.errors["certificate"]?.[i]?.title}
                </FormText>
              )}
            <span
              className={
                formik.values["certificate"]?.[i]?.title?.length < 250
                  ? "text-muted ml-auto font-14"
                  : formik.values["certificate"]?.[i]?.title?.length > 250
                  ? "text-dange ml-auto font-14r"
                  : "text-muted ml-auto font-14"
              }
            >
              {formik.values["certificate"]?.[i]?.title?.length}/
            </span>
            <span className="text-success">{250}</span>
          </p>
        </Form.Group>
      </Col>
      <Col sm={12}>
        <Form.Group controlId="signupRole">
          <div className="custom-selectpicker">
            <SkillsComponent
              skills={`certificate.${i}.skills`}
              formik={formik}
              skillValue={formik?.values?.certificate?.[i]?.skills}
            />
          </div>
        </Form.Group>
      </Col>

      <Col sm={12}>
        <Form.Group controlId="signupCertificateUrl">
          <TextField
            type="text"
            label={lang("CERTIFICATE.FORM.ORGANIZATION_TYPE")}
            placeholder={lang("CERTIFICATE.FORM.ORGANIZATION_TYPE_PLACEHOLDER")}
            required={false}
            name={`certificate.${i}.organisationType`}
            formik={formik}
          />
          <p className="text-right d-flex align-items-center">
            {formik?.touched["certificate"]?.[i]?.organisationType &&
              formik?.errors["certificate"]?.[i]?.organisationType && (
                <FormText className={"error"}>
                  {formik?.errors["certificate"]?.[i]?.organisationType}
                </FormText>
              )}
            <span
              className={
                formik.values["certificate"]?.[i]?.organisationType?.length <
                250
                  ? "text-muted ml-auto font-14"
                  : formik.values["certificate"]?.[i]?.organisationType
                      ?.length > 250
                  ? "text-dange ml-auto font-14r"
                  : "text-muted ml-auto font-14"
              }
            >
              {formik.values["certificate"]?.[i]?.organisationType?.length}/
            </span>
            <span className="text-success">{250}</span>
          </p>
        </Form.Group>
      </Col>

      <Col sm={12}>
        <Form.Group controlId="signupCertificateUrl">
          <TextField
            type="text"
            label={lang("CERTIFICATE.FORM.ISSUING_ORGANIZATION")}
            placeholder={lang(
              "CERTIFICATE.FORM.ISSUING_ORGANIZATION_PLACEHOLDER"
            )}
            required={type === "profile" && true}
            name={`certificate.${i}.issuingOrganization`}
            formik={formik}
          />
          <p className="text-right d-flex align-items-center">
            {formik?.touched["certificate"]?.[i]?.issuingOrganization &&
              formik?.errors["certificate"]?.[i]?.issuingOrganization && (
                <FormText className={"error"}>
                  {formik?.errors["certificate"]?.[i]?.issuingOrganization}
                </FormText>
              )}
            <span
              className={
                formik.values["certificate"]?.[i]?.issuingOrganization?.length <
                250
                  ? "text-muted ml-auto font-14"
                  : formik.values["certificate"]?.[i]?.issuingOrganization
                      ?.length > 250
                  ? "text-dange ml-auto font-14r"
                  : "text-muted ml-auto font-14"
              }
            >
              {formik.values["certificate"]?.[i]?.issuingOrganization?.length}/
            </span>
            <span className="text-success">{250}</span>
          </p>
        </Form.Group>
      </Col>

      <Col sm={6}>
        <Form.Group controlId="signupStartDate">
          <Form.Label>
            Issued Date
            {type === "profile" && <sup className="text-danger">*</sup>}
          </Form.Label>
          <DateTimePickerField
            isValidDate={isValidDate}
            inputProps={inputProps}
            timeFormat={false}
            validateDateFn={validateDateFnStartDate}
            formik={formik}
            name={`certificate.${i}.issuedDate`}
          />
          {formik?.touched["certificate"]?.[i]?.issuedDate &&
            formik?.errors["certificate"]?.[i]?.issuedDate && (
              <FormText className={"error"}>
                {formik?.errors["certificate"]?.[i]?.issuedDate}
              </FormText>
            )}
        </Form.Group>
      </Col>

      <Col sm={6}>
        <Form.Group controlId="signupEndDate">
          <Form.Label>Expiration Date</Form.Label>
          <DateTimePickerField
            inputProps={inputProps}
            timeFormat={false}
            validateDateFn={validateDateFnEndDate}
            formik={formik}
            name={`certificate.${i}.expirationDate`}
          />
          {formik?.touched["certificate"]?.[i]?.expirationDate &&
            formik?.errors["certificate"]?.[i]?.expirationDate && (
              <FormText className={"error"}>
                {formik?.errors["certificate"]?.[i]?.expirationDate}
              </FormText>
            )}
        </Form.Group>
      </Col>

      <Col sm={6}>
        <Form.Group controlId="signupCertificateUrl">
          <TextField
            type="text"
            label={lang("CERTIFICATE.FORM.CREDENTIAL_ID")}
            placeholder={lang("CERTIFICATE.FORM.CREDENTIAL_ID")}
            required={false}
            name={`certificate.${i}.credentialId`}
            formik={formik}
          />
        </Form.Group>
      </Col>
      <Col sm={6}>
        <Form.Group controlId="signupCertificateUrl">
          <TextField
            type="text"
            label={lang("CERTIFICATE.FORM.CREDENTIAL_URL")}
            placeholder={lang("CERTIFICATE.FORM.CREDENTIAL_URL")}
            required={false}
            name={`certificate.${i}.credentialUrl`}
            formik={formik}
          />
          {formik?.touched["certificate"]?.[i]?.credentialUrl &&
            formik?.errors["certificate"]?.[i]?.credentialUrl && (
              <FormText className={"error"}>
                {formik?.errors["certificate"]?.[i]?.credentialUrl}
              </FormText>
            )}
        </Form.Group>
      </Col>
      <Col sm={12}>
        <Form.Group controlId="signupCertificateDescription">
          <TextAreaField
            label={lang("CERTIFICATE.FORM.DESCRIPTION")}
            placeholder={lang("CERTIFICATE.FORM.DESCRIPTION_PLACEHOLDER")}
            required={false}
            rows={4}
            name={`certificate.${i}.description`}
            formik={formik}
          />
          <p className="text-right d-flex align-items-center">
            {formik?.touched["certificate"]?.[i]?.description &&
              formik?.errors["certificate"]?.[i]?.description && (
                <FormText className={"error"}>
                  {formik?.errors["certificate"]?.[i]?.description}{" "}
                  {/* {formik.values["certificate"]?.[i]?.description &&
                  formik.values["certificate"]?.[i]?.description?.length >
                    2000 && (
                    <span>
                      - limit exceeded{" "}
                      {formik.values["certificate"]?.[i]?.description?.length -
                        2000}{" "}
                      characters
                    </span>
                  )} */}
                </FormText>
              )}
            <span
              className={
                formik.values["certificate"]?.[i]?.description?.length < 2000
                  ? "text-muted ml-auto font-14"
                  : formik.values["certificate"]?.[i]?.description?.length >
                    2000
                  ? "text-dange ml-auto font-14r"
                  : "text-muted ml-auto font-14"
              }
            >
              {formik.values["certificate"]?.[i]?.description?.length}/
            </span>
            <span className="text-success">{2000}</span>
          </p>
        </Form.Group>
      </Col>
    </Row>
  );
};
export default Certifications;
