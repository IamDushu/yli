import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { useFormik } from "formik";
import { selectUserInfo } from "../../store/selectors/user";
import { CHANGE_ACCOUNT_ACCESS_EMAIL_SCHEMA } from "../../utils";
import { TextField } from "../form-fields";
import { changeAccountAccess } from "../../store/actions/my-account";
import { toggleModals } from "../../store/actions";

/*******************   
@purpose : User Set Thankyou
@Author : INIC
******************/
export const AccountAccessEmail = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const formik = useFormik({
    initialValues: {
      email: userInfo?.email || "",
      alternateEmail: userInfo?.alternateEmail || "",
    },
    validationSchema: () => CHANGE_ACCOUNT_ACCESS_EMAIL_SCHEMA(lang),
    onSubmit: (values) => {
      delete values.email;
      dispatch(
        changeAccountAccess(values, () =>
          dispatch(toggleModals({ accountaccessemail: false }))
        )
      );
    },
  });
  return (
    <>
      {/* <Form> */}
      <Modal.Body className="p-4">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmailAddress">
            <TextField
              type="email"
              label={lang("MY_ACCOUNTS.FORM.ACCOUNT_ACCESS.EMAIL")}
              placeholder={lang("MY_ACCOUNTS.FORM.ACCOUNT_ACCESS.EMAIL")}
              name="email"
              readOnly={true}
              formik={formik}
            />
          </Form.Group>
          <Form.Group
            className="mb-0"
            controlId="formBasicAlternateEmailAddress"
          >
            <TextField
              type="email"
              label={lang("MY_ACCOUNTS.FORM.ACCOUNT_ACCESS.ALTERNATE_EMAIL")}
              placeholder={lang(
                "MY_ACCOUNTS.FORM.ACCOUNT_ACCESS.ALTERNATE_EMAIL"
              )}
              name="alternateEmail"
              formik={formik}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer className="custom-footer text-center d-flex border-top border-geyser justify-content-between">
        <Button
          variant="btn btn-dark font-weight-semibold"
          onClick={() => dispatch(toggleModals({ accountaccessemail: false }))}
        >
          {lang("COMMON.CANCEL")}
        </Button>
        <Button
          variant="btn btn-info font-weight-semibold px-30"
          onClick={formik.handleSubmit}
        >
          {lang("COMMON.SAVE")}
        </Button>
      </Modal.Footer>
      {/* </Form> */}
    </>
  );
};
