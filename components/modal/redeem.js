import React, { useCallback, useEffect, useState } from "react";
import { Button, Row, Col, Modal } from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
// import { CardElement } from "@stripe/react-stripe-js";
import { Elements, ElementsConsumer } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { debounce, REDEEM_CREDIT_SCHEMA } from "../../utils";
import { PAYMENT_API_URL, STRIPE_PUBLIC_KEY } from "../../config";
import { SelectField, TextField } from "../form-fields";
import { get, post } from "../../api";
import { useFormik } from "formik";
import {
  VERIFY_CAPTCHA_TOKEN,
  CONVERT_CREDIT,
  CREATE_EXTERNAL_ACCOUNT,
  LINK_STRIPE_ACCOUNT,
  REDEEM_CREDIT,
  CHECK_CAPABILITY,
} from "../../api/routes";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../../store/selectors/user";
import { UPDATE_CURRENT_USER_INFO } from "../../store/actions";

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const RedeemForm = ({ stripe, elements }) => {
  const [lang] = useTranslation("language");
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const [token, setToken] = useState(null);
  const [errMsg, setErrMsg] = useState(null);
  const [errCreditMsg, setErrCreditMsg] = useState(null);
  const [credit, setCredit] = useState(0);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const router = useRouter();

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      return false;
    }

    try {
      const token = await executeRecaptcha("redeem");
      if (!token) {
        setErrMsg("Captcha verification failed");
        return false;
      }
      setToken(token);

      const response = await get(
        { serviceURL: PAYMENT_API_URL },
        `${VERIFY_CAPTCHA_TOKEN}${token}`,
        false,
        {},
        true
      );
      if (response.status === 1) {
        setToken(null);
        return true;
      }

      setErrMsg("Captcha verification failed");
      return false;
    } catch (error) {
      setErrMsg(error.message);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      amount: "",
      credits: "",
      country: "",
      routing_number: "",
      account_number: "",
      account_holder_name: "",
    },
    validationSchema: REDEEM_CREDIT_SCHEMA(lang),
    onSubmit: async (values) => {
      if (errMsg) return;
      try {
        const { error: tokenError, token } = await stripe.createToken(
          "bank_account",
          {
            country: values.country,
            currency: "usd",
            routing_number: values.routing_number,
            account_number: values.account_number,
            account_holder_name: values.account_holder_name,
          }
        );

        if (tokenError) return setErrMsg(tokenError.message);

        const createExternalAccountResponse = await post(
          { serviceURL: PAYMENT_API_URL },
          CREATE_EXTERNAL_ACCOUNT,
          false,
          { token: token.id },
          true
        );
        if (createExternalAccountResponse.status === 0)
          return setErrMsg(response.message);

        const response = await post(
          { serviceURL: PAYMENT_API_URL },
          REDEEM_CREDIT,
          true,
          { amount: values.amount, credits: credit },
          true
        );
        if (response.status === 0) return setErrMsg(response.message);

        setErrMsg(null);
        dispatch({
          type: UPDATE_CURRENT_USER_INFO,
          payload: { credits: response.data.credits },
        });
        dispatch(toggleModals({ redeem: true }));
      } catch (error) {}
    },
  });

  const handleConversion = useCallback(
    debounce(async (amount) => {
      if (!(Number(amount) > 0)) return;

      const response = await post(
        { serviceURL: PAYMENT_API_URL },
        CONVERT_CREDIT,
        false,
        { unit: amount, convert: "credit" },
        true
      );
      if (response.status === 1) setCredit(response.data.credits || 100);
    }, 500),
    []
  );

  useEffect(() => {
    handleConversion(formik.values.amount);
  }, [formik.values.amount]);

  useEffect(() => {
    if (!userInfo?.credits)
      return setErrCreditMsg("You do not have enough credits");

    if (userInfo?.credits && Number(userInfo?.credits) < Number(credit)) {
      setErrCreditMsg("You do not have enough credits");
    } else setErrCreditMsg("");
  }, [credit]);

  useEffect(() => {
    handleReCaptchaVerify();
  }, [handleReCaptchaVerify]);

  return (
    <>
      <Modal.Body>
        <PerfectScrollbar>
          <div>
            <h5 className="text-right font-16 font-weight-semibold font-md-14 mb-30">
              (1 {lang("MY_ACCOUNTS.FORM.ADD_CREDIT.EURO")} = 1{" "}
              {lang("MY_ACCOUNTS.FORM.ADD_CREDIT.CREDIT")})
            </h5>
            <div className="mb-3">
              <Form>
                <Row>
                  <Col md={12}>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicYourCredits"
                    >
                      <Form.Label>
                        {lang("MY_ACCOUNTS.FORM.REDEEM.YOUR_CREDITS")}
                      </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder={lang(
                          "MY_ACCOUNTS.FORM.REDEEM.YOUR_CREDITS"
                        )}
                        readOnly={true}
                        value={userInfo?.credits}
                      />

                      <span
                        style={{ color: "red", fontSize: "10px" }}
                        className="mt-1"
                      >
                        {errCreditMsg}
                      </span>
                    </Form.Group>
                  </Col>
                  <Col md={5}>
                    <Form.Group className="mb-3" controlId="formBasicAmount">
                      <TextField
                        type="number"
                        label={lang("MY_ACCOUNTS.FORM.REDEEM.ENTER_AMOUNT")}
                        placeholder={lang(
                          "MY_ACCOUNTS.FORM.REDEEM.ENTER_AMOUNT"
                        )}
                        name="amount"
                        formik={formik}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={7}>
                    <Form.Group className="mb-3" controlId="formBasicAmount">
                      <Form.Label></Form.Label>
                      <Form.Control
                        type="number"
                        className="mt-1"
                        placeholder=""
                        readOnly={true}
                        value={credit}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3" controlId="formBasicCountry">
                      <TextField
                        type="text"
                        label={lang("MY_ACCOUNTS.FORM.REDEEM.COUNTRY")}
                        required={true}
                        placeholder={lang("MY_ACCOUNTS.FORM.REDEEM.COUNTRY")}
                        name="country"
                        formik={formik}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicRoutingNumber"
                    >
                      <TextField
                        type="text"
                        label={lang("MY_ACCOUNTS.FORM.REDEEM.ROUTING_NUMBER")}
                        placeholder={lang(
                          "MY_ACCOUNTS.FORM.REDEEM.ROUTING_NUMBER"
                        )}
                        name="routing_number"
                        formik={formik}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicAccountNumber"
                    >
                      <TextField
                        type="text"
                        label={lang("MY_ACCOUNTS.FORM.REDEEM.ACCOUNT_NUMBER")}
                        placeholder={lang(
                          "MY_ACCOUNTS.FORM.REDEEM.ACCOUNT_NUMBER"
                        )}
                        name="account_number"
                        formik={formik}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicAccountHolderName"
                    >
                      <TextField
                        type="text"
                        label={lang(
                          "MY_ACCOUNTS.FORM.REDEEM.ACCOUNT_HOLDER_NAME"
                        )}
                        placeholder={lang(
                          "MY_ACCOUNTS.FORM.REDEEM.ACCOUNT_HOLDER_NAME"
                        )}
                        name="account_holder_name"
                        formik={formik}
                      />
                    </Form.Group>
                  </Col>
                  {/* <Col md={12}>
                    <Form.Group className="mb-3" controlId="formBasicNumber">
                      <CardElement className="form-control" />
                    </Form.Group>
                  </Col> */}
                </Row>
              </Form>
              <span style={{ color: "red", fontSize: "10px" }} className="mt-1">
                {errMsg}
              </span>
            </div>

            <div className="text-center d-flex mt-5">
              <Button
                variant="btn btn-info btn-sm font-weight-semibold text-uppercase w-100"
                onClick={formik.handleSubmit}
                disabled={formik.isSubmitting || errMsg || errCreditMsg}
              >
                {formik.isSubmitting
                  ? lang("COMMON.PROCESSING")
                  : lang("COMMON.SAVE")}
              </Button>
            </div>
          </div>
        </PerfectScrollbar>
      </Modal.Body>
    </>
  );
};

const InjectRedeemForm = () => (
  <ElementsConsumer>
    {({ stripe, elements }) => (
      <RedeemForm stripe={stripe} elements={elements} />
    )}
  </ElementsConsumer>
);
export const Redeem = () => {
  return (
    <Elements stripe={stripePromise}>
      <InjectRedeemForm />
    </Elements>
  );
};
