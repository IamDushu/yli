import React, { Fragment, useCallback, useState } from "react";
import { Button, Row, Col, Modal, Table, FormText } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Elements, ElementsConsumer } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import {
  ADD_CREDIT,
  CONVERT_CREDIT,
  RECHARGE_LIST,
  SAVE_CREDIT,
} from "../../api/routes";
import {
  accountTypeFiscalType,
  ADD_CREDIT_SCHEMA,
  debounce,
  getCookie,
  GOOGLE_PLACE,
  setCookie,
  showMessageNotification,
} from "../../utils";
import { useEffect } from "react";
import { get, post } from "../../api";
import { SelectField, TextField } from "../form-fields";
import { useFormik } from "formik";
import {
  GOOGLE_MAP_API_KEY,
  PAYMENT_API_URL,
  STRIPE_PUBLIC_KEY,
  USER_API_URL,
} from "../../config";
import {
  UPDATE_CURRENT_USER_INFO,
  getBillingInfo,
  toggleModals,
} from "../../store/actions";
import { selectUserInfo } from "store/selectors/user";
import {
  cardListing,
  deleteCard,
  updateUserIntro,
} from "store/actions/my-account";
import ReactGoogleAutocomplete from "react-google-autocomplete";

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const AddCreditForm = ({ stripe, elements }) => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const [recharge, setRecharge] = useState([]);
  const [credit, setCredit] = useState(0);
  const [errMsg, setErrMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [billingInfo, setBillingInfo] = useState({
    fiscalNumber: "",
    tin: "",
    iban: "",
    bicSwiftNumber: "",
    pec: "",
    cuuipa: "",
    paypalAccountId: "",
    accountTypeFiscal: userInfo?.accountTypeFiscal || "",
  });

  const { cards } = useSelector((state) => state.accountSetting);
  const formik = useFormik({
    initialValues: {
      accountTypeFiscal: userInfo?.accountTypeFiscal || "",
      fiscalNumber: billingInfo?.fiscalNumber || "",
      tin: billingInfo?.tin || "",
      places: userInfo?.places || "",
      countryShortName: userInfo?.countryShortName || "",
      country: userInfo?.country || "",
      amount: "",
      pmId: "",
      selected_pmId: null,
    },
    validationSchema: ADD_CREDIT_SCHEMA(lang),
    enableReinitialize: true,
    onSubmit: async (values) => {
      delete values.selected_pmId;
      if (!billingInfo?.fiscalNumber && !billingInfo?.tin) {
        const userObj = {
          firstName: userInfo?.firstName,
          lastName: userInfo?.lastName,
          country: values?.country,
          countryShortName: values.countryShortName,
          accountTypeFiscal: values?.accountTypeFiscal,
          places: values.places,
          fiscalNumber: values?.fiscalNumber || "",
          tin: values?.tin || "",
        };
        await dispatch(updateUserIntro(userObj));
        let user = JSON.parse(getCookie("userInfo"));

        user["country"] = values.country;
        user["countryShortName"] = values.countryShortName;
        user["places"] = values.places;
        user["accountTypeFiscal"] = values.accountTypeFiscal;
        setCookie("userInfo", user);
        await submitCreditHandler(values);
      } else {
        submitCreditHandler(values);
      }
    },
  });
  const onPlaceSelected = async (place) => {
    await formik.setFieldValue("places", place?.formatted_address);
    await formik.setFieldValue("countryShortName", "");

    for (const component of place.address_components) {
      const componentType = component?.types[0];
      switch (componentType) {
        case "country":
          let country = component.long_name;
          await formik.setFieldValue("country", country);
          await formik.setFieldValue("countryShortName", component.short_name);
          continue;
      }
    }
  };
  const submitCreditHandler = async (values) => {
    try {
      const response = await post(
        { serviceURL: PAYMENT_API_URL },
        ADD_CREDIT,
        false,
        values,
        true
      );
      if (response.status !== 1) return setErrMsg(response.message);

      const { paymentIntent, error: stripeError } =
        await stripe.confirmCardPayment(response.data.client_secret);
      if (stripeError) return setErrMsg(stripeError.message);

      if (paymentIntent) {
        const addCreditResponse = await post(
          { serviceURL: PAYMENT_API_URL },
          SAVE_CREDIT,
          true,
          { piId: paymentIntent.id },
          true
        );
        if (addCreditResponse.status !== 1)
          return setErrMsg(addCreditResponse.message);

        setErrMsg(null);
        dispatch({
          type: UPDATE_CURRENT_USER_INFO,
          payload: addCreditResponse.data,
        });
        dispatch(toggleModals({ addcredit: false }));
        dispatch(toggleModals({ nosufficientcreadit: false }));
      }
    } catch (error) {
      setErrMsg(error.message);
    }
  };
  const handleConversion = useCallback(
    debounce(async (amount) => {
      if (!(Number(amount) > 0)) return;

      const response = await post(
        { serviceURL: PAYMENT_API_URL },
        CONVERT_CREDIT,
        false,
        { unit: amount, convert: "currency" },
        true
      );
      if (response.status === 1) setCredit(response.data.credits);
    }, 500),
    []
  );

  useEffect(() => {
    dispatch(cardListing());

    rechargeListing();
  }, []);

  const rechargeListing = async () => {
    try {
      const response = await get(
        { serviceURL: USER_API_URL },
        RECHARGE_LIST,
        false,
        {},
        true
      );
      if (response.status === 1) {
        let amount = [];
        response?.data?.rows.map((v) => {
          amount.push(v?.amount);
        });
        amount.sort((a, b) => {
          return a - b;
        });
        setRecharge(amount);
      }
    } catch (error) {}
  };

  /******************** 
  @purpose : used for delete card
  @Parameter : {id}
  @Author : INIC
******************/
  const deleteCardHandler = (id) => {
    dispatch(deleteCard({ pmId: id })).then((res) => {
      dispatch(cardListing());
      showMessageNotification(res.message);
    });
  };

  useEffect(() => {
    handleConversion(formik.values.amount);
  }, [formik.values.amount]);

  useEffect(() => {
    getBillingInfo().then((res) => {
      setBillingInfo({ ...res });
    });
  }, []);

  const credits = +userInfo?.credits;
  return (
    <>
      <Modal.Body>
        {/* <PerfectScrollbar> */}
        <div>
          <div className="row mb-3">
            <div className="col-md-6">
              <span>
                {lang("MY_ACCOUNTS.FORM.ADD_CREDIT.TOTAL_CREDITS")} :
                {userInfo.credits === "0" ? "0" : credits.toFixed(2)}
              </span>
            </div>
            <div className="col-md-6 text-right">
              <span
                className="text-primary cursor-pointer"
                onClick={() => dispatch(toggleModals({ addcard: true }))}
              >
                {lang("COMMON.ADD_CARD")}
              </span>
              <h5 className="text-right text-body-14 font-weight-normal mb-4 mt-2">
                (1 {lang("MY_ACCOUNTS.FORM.ADD_CREDIT.EURO")} = 1{" "}
                {lang("MY_ACCOUNTS.FORM.ADD_CREDIT.CREDIT")})
              </h5>
            </div>
          </div>

          <Fragment>
            <div className="mb-3">
              <Form>
                <Row>
                  {!billingInfo?.fiscalNumber && !billingInfo?.tin && (
                    <>
                      <Col md={12}>
                        <Form.Group>
                          <Row>
                            <Col md={6}>
                              <input
                                name="accountTypeFiscal"
                                type="radio"
                                value="private"
                                checked={
                                  formik.values.accountTypeFiscal ===
                                  accountTypeFiscalType.PRIVATE
                                }
                                onChange={(e) => {
                                  if (e.target.checked)
                                    formik.setFieldValue(
                                      "accountTypeFiscal",
                                      e.target.value
                                    );
                                }}
                              />
                              <span className="font-weight-bold ml-1 text-secondary">
                                {lang("COMMON.PRIVATE")}
                              </span>
                            </Col>
                            <Col md={6}>
                              <input
                                name="accountTypeFiscal"
                                type="radio"
                                value="business"
                                checked={
                                  formik.values.accountTypeFiscal ===
                                  accountTypeFiscalType.BUSINESS
                                }
                                onChange={(e) => {
                                  if (e.target.checked)
                                    formik.setFieldValue(
                                      "accountTypeFiscal",
                                      e.target.value
                                    );
                                }}
                              />
                              <span className="font-weight-bold ml-1 text-secondary">
                                {lang("COMMON.BUSINESS")}
                              </span>
                            </Col>
                          </Row>
                        </Form.Group>
                        {formik?.touched["accountTypeFiscal"] &&
                          formik?.errors["accountTypeFiscal"] && (
                            <FormText className="error">
                              {formik?.errors["accountTypeFiscal"]}
                            </FormText>
                          )}
                      </Col>

                      <Col sm={6}>
                        <Form.Label>
                          {lang("SIGN_UP.PLACES")}
                          <sup className="text-danger">*</sup>
                        </Form.Label>
                        <Form.Group controlId="signupCountry">
                          <ReactGoogleAutocomplete
                            apiKey={GOOGLE_MAP_API_KEY}
                            type="text"
                            className="floating-input form-control"
                            placeholder="Search Places ..."
                            name="places"
                            onPlaceSelected={onPlaceSelected}
                            options={{
                              fields: GOOGLE_PLACE.fields,
                              types: GOOGLE_PLACE.types,
                            }}
                            value={formik.values["places"]}
                            onChange={(e) =>
                              formik?.setFieldValue("places", e?.target?.value)
                            }
                            onBlur={formik?.handleBlur}
                          />
                          {formik?.touched["places"] &&
                            formik?.errors["places"] && (
                              <FormText className={"error"}>
                                {formik?.errors["places"]}
                              </FormText>
                            )}
                        </Form.Group>
                      </Col>

                      {formik.values.accountTypeFiscal ===
                      accountTypeFiscalType.PRIVATE ? (
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <TextField
                              type="text"
                              label={lang(
                                "MY_ACCOUNTS.FORM.EDIT_INTRO.FISCAL_NUMBER"
                              )}
                              placeholder={lang(
                                "MY_ACCOUNTS.FORM.EDIT_INTRO.WRITE_HERE"
                              )}
                              required={
                                formik?.values?.accountTypeFiscal == "private"
                                  ? true
                                  : false
                              }
                              name="fiscalNumber"
                              formik={formik}
                              onKeyPress={(e) => {
                                if (new RegExp(/[a-zA-Z0-9]/).test(e.key)) {
                                } else e.preventDefault();
                              }}
                            />
                          </Form.Group>
                        </Col>
                      ) : (
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <TextField
                              type="text"
                              label={lang("LEARNING_INSTITUTE_FORM.VAT_NO")}
                              placeholder={lang(
                                "MY_ACCOUNTS.FORM.EDIT_INTRO.WRITE_HERE"
                              )}
                              required={
                                formik?.values?.accountTypeFiscal == "business"
                                  ? true
                                  : false
                              }
                              name="tin"
                              formik={formik}
                            />
                          </Form.Group>
                        </Col>
                      )}
                    </>
                  )}
                  <Col md={5}>
                    <Form.Group className="mb-3" controlId="formBasicNumber">
                      <div className="custom-selectpicker custom-select-addcredit">
                        <SelectField
                          menuPortalTarget={document?.querySelector("body")}
                          classNamePrefix={"custom-select"}
                          options={recharge.map((amount) => ({
                            value: amount,
                            label: amount,
                          }))}
                          label={lang(
                            "MY_ACCOUNTS.FORM.ADD_CREDIT.SELECT_AMOUNT"
                          )}
                          name="amount"
                          formik={formik}
                          placeholder={lang("COMMON.SELECT")}
                        />
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={7}>
                    <Form.Group className="mb-3" controlId="formBasicNumber">
                      <Form.Label></Form.Label>
                      <Form.Control
                        type="number"
                        className="mt-2"
                        placeholder=""
                        readOnly={true}
                        value={credit}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3" controlId="formBasicNumber">
                      <div className="custom-selectpicker">
                        <SelectField
                          noOptionsMessage={() => lang("COMMON.NO_OPTIONS")}
                          readOnly={true}
                          options={
                            cards?.length > 0
                              ? cards?.map(({ id, card }) => ({
                                  value: id,
                                  label: card,
                                }))
                              : []
                          }
                          formatOptionLabel={({ label, value }) => (
                            <>
                              <span className="d-flex align-items-center">
                                <em
                                  className="bx bx-credit-card mr-1"
                                  style={{ fontSize: "25px" }}
                                ></em>
                                <b className="mr-1 text-capitalize">
                                  {label.brand}
                                </b>{" "}
                                {lang("MY_ACCOUNTS.FORM.ADD_CREDIT.ENDING_IN")} <b className="ml-1">{label.last4}</b>
                              </span>
                            </>
                          )}
                          label={lang(
                            "MY_ACCOUNTS.FORM.ADD_CREDIT.SELECT_CARD"
                          )}
                          maxMenuHeight={170}
                          required={false}
                          name="pmId"
                          placeholder={lang(
                            "MY_ACCOUNTS.FORM.ADD_CREDIT.SELECT_CARD"
                          )}
                          formik={formik}
                        />
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
              <span style={{ color: "red", fontSize: "14px" }}>
                {errMsg ||
                  (!isLoading && !cards?.length
                    ? lang("MY_ACCOUNTS.FORM.ADD_CREDIT.ADD_CARD_FIRST")
                    : "")}
              </span>
            </div>
          </Fragment>

          {Array.isArray(cards) && cards?.length > 0 && (
            <Table
              className="video-listed-item-table font-14 mt-2"
              responsive="lg"
            >
              <thead>
                <tr>
                  <th>{lang("MY_ACCOUNTS.FORM.PAYMENTS.SR_NO")}</th>
                  <th>{lang("COMMON.CARDS")}</th>
                </tr>
              </thead>
              <tbody>
                {cards?.map((label, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <b className="mr-1 text-capitalize">
                        {label?.card?.brand}
                      </b>{" "}
                      {lang("MY_ACCOUNTS.FORM.ADD_CREDIT.ENDING_IN")} <b className="ml-1">{label?.card?.last4}</b>
                    </td>
                    <td>
                      <em
                        className="icon icon-delete font-16 pointer"
                        onClick={() => deleteCardHandler(label?.id)}
                      ></em>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
        {/* </PerfectScrollbar> */}
      </Modal.Body>
      <Modal.Footer className="custom-footer text-center d-flex border-top border-geyser justify-content-between">
        <Button
          variant="btn btn-dark font-weight-semibold"
          onClick={() => dispatch(toggleModals({ addcredit: false }))}
        >
          {lang("COMMON.CANCEL")}
        </Button>
        <Button
          variant="btn btn-info font-weight-semibold px-30"
          disabled={cards?.length === 0 || formik.isSubmitting}
          onClick={formik.handleSubmit}
        >
          {formik.isSubmitting
            ? lang("COMMON.PROCESSING")
            : lang("COMMON.SAVE")}
        </Button>
      </Modal.Footer>
    </>
  );
};

const InjectedAddCreditForm = () => (
  <ElementsConsumer>
    {({ stripe, elements }) => (
      <AddCreditForm stripe={stripe} elements={elements} />
    )}
  </ElementsConsumer>
);

export const AddCredit = () => {
  return (
    <Elements stripe={stripePromise}>
      <InjectedAddCreditForm />
    </Elements>
  );
};
