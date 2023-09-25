// external packages
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PhoneInput2 from "react-phone-input-2";
import { useFormik } from "formik";
import {
  Button,
  Row,
  Col,
  Form,
  Modal,
  Card,
  FormLabel,
} from "react-bootstrap";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

// internal packages
// import { GROWTH_CONNECTIONS_ACTIVITY_SCHEMA } from "utils";
import { TextField } from "components/form-fields";
import { toggleModals, updateUserInfo } from "store/actions";
import { RECOVERY_FIELD_EMAIL_VALIDATION } from "utils";
// toggleModals
export const RecoveryFieldModal = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const { recoveryDetails } = useSelector(({ ui }) => ui.modals, shallowEqual);

  const { recoveryEmail, recoveryPhone, countryCode, recoverType } =
    recoveryDetails;
  /******************** 
  @purpose : To intialize formik
  @Parameter : {}
  @Author : YLIWAY
  ******************/
  const formik = useFormik({
    initialValues:
      recoverType == "phone"
        ? {
            recoveryPhone:
              recoveryPhone && recoveryPhone?.indexOf("+") === 0
                ? recoveryPhone
                : countryCode + recoveryPhone || "",
          }
        : {
            recoveryEmail: recoveryEmail,
          },
    validationSchema: RECOVERY_FIELD_EMAIL_VALIDATION(lang),
    enableReinitialize: true,
    onSubmit: (values) => {
      const payload = {};
      if (recoverType == "email")
        payload.recoveryEmail = values.recoveryEmail || "";
      else
        payload.recoveryPhone = values.recoveryPhone
          ? (values.countryCode || "") + values.recoveryPhone
          : "";
      dispatch(updateUserInfo(payload)).then(() => {
        dispatch(
          toggleModals({
            recoveryFieldEdit: false,
          })
        );
      });
    },
  });
  return (
    <>
      <Modal.Body>
        <Card className="card-md border-0">
          <Card.Body>
            <Row className="mb-4">
              {recoverType == "email" && (
                <Col xl={12}>
                  <Form.Group>
                    <TextField
                      type="text"
                      label={`${lang("SECURITY.RECOVERY_EMAIL")}`}
                      placeholder={`${lang("FORM.ENTER_YOUR_RECOVERY_EMAIL")}`}
                      name="recoveryEmail"
                      formik={formik}
                      required={false}
                    />
                  </Form.Group>
                </Col>
              )}
              {recoverType == "phone" && (
                <Col xl={12}>
                  <Form.Group controlId="contactEditPhone">
                    <Form.Label>
                      {lang("SECURITY.RECOVERY_NUMBER_LABEL")}
                    </Form.Label>
                    <PhoneInput2
                      className="react-recoveryPhone-input"
                      country={"it"}
                      masks={""}
                      countryCodeEditable={false}
                      onChange={(phoneNumber, country) => {
                        formik.setFieldValue(
                          "recoveryPhone",
                          phoneNumber.replace(country.dialCode, "")
                        );
                        formik.setFieldValue(
                          "countryCode",
                          `+${country.dialCode}`
                        );
                      }}
                      value={
                        recoveryPhone && recoveryPhone?.indexOf("+") === 0
                          ? recoveryPhone
                          : countryCode + recoveryPhone
                      }
                    />
                    {formik?.touched["recoveryPhone"] &&
                      formik?.errors["recoveryPhone"] && (
                        <p className="text-danger">
                          {formik?.errors["recoveryPhone"]}
                        </p>
                      )}
                  </Form.Group>
                </Col>
              )}
            </Row>
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer className="custom-footer text-center d-flex">
        <Button
          onClick={formik.handleSubmit}
          variant="btn btn-info font-weight-semibold px-5 ml-auto"
        >
          {lang("COMMON.UPDATE")}
        </Button>
      </Modal.Footer>
    </>
  );
};
