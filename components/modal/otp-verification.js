import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { VERIFY_OTP_SCHEMA } from "../../utils";
import { verifyOTP, resendOTP } from "../../store/actions";
import OTPInput from "components/OTPInput";

/******************* 
@purpose : User Set OTP verification
@Author : INIC
******************/
export const OtpVerification = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const { otpData } = useSelector(({ ui }) => ui.modals, shallowEqual);
  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: VERIFY_OTP_SCHEMA(lang),
    onSubmit: (values) => {
      dispatch(verifyOTP({ ...values }));
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit} className="px-3 px-sm-4">
      <h6 className="modal-headingtext mb-15 text-center font-weight-normal font-18 font-sm-16 lh-font-18-34">
        {lang("OTP.ENTER")}{" "}
        <span className="font-medium">{lang("OTP.DIGIT_OTP")}</span>{" "}
        {lang("OTP.OTP_REGISTERED")}
      </h6>
      <div className="my-5 otp-input-wrap">
        <Row className="my-4">
          <Col xl={12}>
            <OTPInput 
              autoFocus
              isNumberInput
              length={6}
              onChangeOTP={(otp) => formik.setFieldValue("otp", otp)}
              onPasteOTP={(otp) => formik.setFieldValue("otp", otp)}
            />
            {formik.errors && formik.errors.otp && (
              <span className="text-danger mt-2 d-block">{formik.errors.otp}</span>
            )}
          </Col>
        </Row>
      </div>

      <div className="text-center">
        <Button
          variant="info"
          type="submit"
          className="w-100"
          title={lang("COMMON.VERIFY")}
        >
          {lang("COMMON.VERIFY")}
        </Button>
        <p className="mt-4 mb-0">
          {lang("OTP.DIDNT_GET_OTP")}
          <a
            onClick={() => resendOTP(otpData)}
            className="text-primary ml-2 font-medium"
          >
            {lang("OTP.RESEND")}
          </a>
        </p>
      </div>
    </Form>
  );
};
