import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toggleModals } from "../../store/actions";
import {
  CHANGE_ACCOUNT_ACCESS_ALT_PHONE_SCHEMA,
  CHANGE_ACCOUNT_ACCESS_PHONE_SCHEMA,
} from "../../utils";
import { sendOTP, setNumbers } from "../../store/actions/my-account";
import { useFormik } from "formik";
import { selectUserInfo } from "../../store/selectors/user";
import PhoneInput from "components/form-fields/react-phone-input";
import { useEffect } from "react";
import { startsWith } from "lodash";

/*******************   
@purpose : User Set Thankyou
@Author : INIC
******************/
export const AccountAccessPhone = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const [disableNumber, setDisableNumber] = useState(true);
  const [disableAlternateNumber, setDisableAlternateNumber] = useState(true);
  let phoneNumber =
    userInfo?.phone && userInfo?.phone?.indexOf("+") === 0
      ? userInfo?.phone
      : userInfo?.countryCode + userInfo?.phone;
  let alternatePhone =
    userInfo?.alternatePhone && userInfo?.alternatePhone?.indexOf("+") === 0
      ? userInfo?.alternatePhone
      : userInfo?.countryCode + userInfo?.alternatePhone;

  const phoneFormik = useFormik({
    initialValues: {
      phone: phoneNumber || "",
    },
    validationSchema: CHANGE_ACCOUNT_ACCESS_PHONE_SCHEMA(lang),
    onSubmit: (values) => {
      dispatch(
        sendOTP(values, () => {
          dispatch(setNumbers(values));
          dispatch(toggleModals({ enterotp: true, phoneno: values }));
        })
      );
    },
  });
  const alternateFormik = useFormik({
    initialValues: {
      alternatePhone: alternatePhone || "",
    },
    validationSchema: CHANGE_ACCOUNT_ACCESS_ALT_PHONE_SCHEMA(lang),
    onSubmit: (values) => {
      dispatch(
        sendOTP(values, () => {
          dispatch(setNumbers(values));
          dispatch(toggleModals({ enterotp: true, phoneno: values }));
        })
      );
    },
  });

  return (
    <>
      <Modal.Body className="p-4">
        <div>
          <PhoneInput
            label={lang("MY_ACCOUNTS.FORM.ACCOUNT_ACCESS.PHONE_NUMBER")}
            required={true}
            formik={phoneFormik}
            name="phone"
            value={phoneNumber}
            type="accountSettings"
            isValid={(inputNumber, country) => {
              if (inputNumber.length - country.countryCode.length >= 10) {
                setDisableNumber(false);
              } else {
                setDisableNumber(true);
              }
            }}
          />
          <div className="d-flex justify-content-end">
            <Button
              className="mt-2"
              variant="btn btn-info font-weight-semibold "
              onClick={phoneFormik.handleSubmit}
              disabled={disableNumber}
            >
              {lang("MY_ACCOUNTS.FORM.ACCOUNT_ACCESS.SEND_OTP")}
            </Button>
          </div>
        </div>
        <div>
          <PhoneInput
            label={lang(
              "MY_ACCOUNTS.FORM.ACCOUNT_ACCESS.ALTERNATE_PHONE_NUMBER"
            )}
            required={false}
            formik={alternateFormik}
            name="alternatePhone"
            value={alternatePhone}
            type="accountSettings"
            isValid={(inputNumber, country) => {
              if (inputNumber.length - country.countryCode.length >= 10) {
                setDisableAlternateNumber(false);
              } else {
                setDisableAlternateNumber(true);
              }
            }}
          />
          <div className="d-flex justify-content-end">
            <Button
              className="mt-2"
              variant="btn btn-info font-weight-semibold "
              onClick={alternateFormik.handleSubmit}
              disabled={disableAlternateNumber}
            >
              {lang("MY_ACCOUNTS.FORM.ACCOUNT_ACCESS.SEND_OTP")}
            </Button>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className="custom-footer text-center d-flex border-top border-geyser justify-content-between">
        <Button
          variant="btn btn-btn btn-dark font-weight-semibold"
          onClick={() => dispatch(toggleModals({ accountaccessphone: false }))}
        >
          {lang("COMMON.BACK")}
        </Button>
      </Modal.Footer>
    </>
  );
};
