import React, { Fragment } from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { useState } from "react";
import { toggleModals } from "../../store/actions";
import {
  changeAccountAccess,
  verifyChangeNumberOTP,
} from "../../store/actions/my-account";
import OTPInput from "components/OTPInput";
import { useFormik } from "formik";
import { VERIFY_OTP_SCHEMA } from "utils";

/*******************   
@purpose : User Set Thankyou
@Author : INIC
******************/
export const EnterOtp = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const { phone, alternatePhone } = useSelector(
    (state) => state.accountSetting
  );

  const [count, setCount] = useState(1);

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: VERIFY_OTP_SCHEMA(lang),
    onSubmit: (values, { resetForm }) => {
      if (phone) {
        dispatch(
          verifyChangeNumberOTP(
            { otp: values.otp, phone: phone.toString() },
            () => {
              dispatch(
                changeAccountAccess({ phone }, () => {
                  dispatch(toggleModals({ accountaccessphone: false }));
                  dispatch(toggleModals({ enterotp: false }));
                })
              );
            }
          )
        );
        resetForm({ values: "" });
      } else {
        dispatch(
          verifyChangeNumberOTP(
            { otp: values.otp, phone: alternatePhone.toString() },
            () => {
              dispatch(
                changeAccountAccess({ alternatePhone }, () => {
                  dispatch(toggleModals({ accountaccessphone: false }));
                  dispatch(toggleModals({ enterotp: false }));
                })
              );
            }
          )
        );
        resetForm({ values: "" });
      }
    },
  });
  return (
    <Fragment>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <h3 className="font-28 font-md-18 font-weight-semibold text-secondary mb-30">
            Enter OTP of {count === 1 && phone} {count === 2 && alternatePhone}
          </h3>

          <Form.Group className="mb-0" controlId="">
            <Form.Label className="d-block">Enter your OTP</Form.Label>
            <OTPInput
              autoFocus
              isNumberInput
              length={6}
              values={formik.values.otp}
              onChangeOTP={(otp) => {
                formik.setFieldValue("otp", otp);
              }}
              onPasteOTP={(otp) => formik.setFieldValue("otp", otp)}
            />
          </Form.Group>
          {formik.errors && formik.errors.otp && (
            <span className="text-danger">{formik.errors.otp}</span>
          )}
        </Modal.Body>
        <Modal.Footer className="text-center d-flex py-2 ">
          <Button
            variant="btn btn-dark font-weight-semibold btn-sm text-uppercase py-12 mr-3"
            onClick={() => dispatch(toggleModals({ enterotp: false }))}
          >
            Back
          </Button>
          <Button
            variant="btn btn-info btn-sm font-weight-semibold text-uppercase py-12 ml-3"
            type="submit"
          >
            Done
          </Button>
        </Modal.Footer>
      </Form>
    </Fragment>
  );
};
