import React, { Fragment, useEffect, useState } from "react";
import { Card, Button, Form, Row, Col, Modal, FormText } from "react-bootstrap";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../../../store/selectors/user";
import { TextField } from "../../form-fields";
import momentTz from "moment-timezone";
import Select from "react-select";
import {
  accountTypeFiscalType,
  EDIT_INTRO_SCHEMA,
  getCookie,
  GOOGLE_PLACE,
  setCookie,
} from "../../../utils";
import { useTranslation } from "react-i18next";
import { updateUserIntro } from "../../../store/actions/my-account";
import { getUserProfileData, getBillingInfo } from "store/actions";
import CkEditorField from "components/form-fields/ck-editor-field";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import { GOOGLE_MAP_API_KEY } from "config";

/******************** 
  @purpose : Edit Intro
  @Parameter : {}
  @Author : INIC
  ******************/
const EditIntro = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const description = getCookie("description");
  /******************** 
  @purpose : All the usestates
  @Parameter : {}
  @Author : INIC
  ******************/
  const [showForm, setShowForm] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [scrollToError, setScrollToError] = useState(false);
  const [billingInfo, setBillingInfo] = useState({
    tin: "",
    fiscalNumber: "",
  });
  const [initialValues, setInitialValues] = useState({
    firstName: userInfo?.firstName || "",
    lastName: userInfo?.lastName || "",
    shortDescription: userInfo?.shortDescription || "",
    briefDescription: description || "",
    currentPosition: userInfo?.currentPosition || "",
    country: userInfo?.country || "",
    countryShortName: userInfo?.countryShortName || "",
    state: userInfo?.state || "",
    city: userInfo?.city || "",
    placeCountry: userInfo?.country || "",
    placeState: userInfo?.state || "",
    placeCity: userInfo?.city || "",
    places: userInfo?.places || "",
    contactInfo: userInfo?.contactInfo || "",
    fiscalNumber: billingInfo?.fiscalNumber || "",
    pec: userInfo?.pec || "",
    cuuipa: userInfo?.cuuipa || "",
    timezone: userInfo?.timezone || "",
    zipcode: userInfo?.zipcode || "",
    accountTypeFiscal: userInfo?.accountTypeFiscal || "",
    tin: billingInfo?.tin || "",
  });

  const timezoneLists = momentTz.tz.names();

  /******************** 
  @purpose : Edit Intro Form
  @Parameter : {}
  @Author : INIC
  ******************/
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: () => {
      return EDIT_INTRO_SCHEMA(lang, true);
    },
    onSubmit: async (values) => {
      const { ...rest } = values;
      const res = await dispatch(
        updateUserIntro({ ...rest }, () => {
          setShowForm(!showForm);
          window.scrollTo({ top: 0, behavior: "smooth" });
        })
      );
      setCookie("description", rest.briefDescription);
      let user = JSON.parse(getCookie("userInfo"));

      user["firstName"] = rest.firstName;
      user["lastName"] = rest.lastName;
      user["shortDescription"] = rest.shortDescription;
      user["currentPosition"] = rest.currentPosition;
      user["country"] = rest.country;
      user["countryShortName"] = rest.countryShortName;
      user["state"] = rest.state;
      user["city"] = rest.city;
      user["places"] = rest.places;
      user["contactInfo"] = rest.contactInfo;
      user["fiscalNumber"] = rest.fiscalNumber;
      user["pec"] = rest.pec;
      user["cuuipa"] = rest.cuuipa;
      user["timezone"] = rest.timezone;
      user["zipcode"] = rest.zipcode;
      user["accountTypeFiscal"] = rest.accountTypeFiscal;
      setCookie("userInfo", user);
      await dispatch(getUserProfileData());
      setShow(false);
    },
  });

  /*******************
  @Purpose : Google API Hook to handle place search
   @Parameter : {}
   @Author : INIC
 *******************/
  const onPlaceSelected = async (place) => {
    const zipCode = extractZipCodeFromPlace(place);
    if (!zipCode) {
      await formik.setFieldValue("zipcode", "");
    } else await formik.setFieldValue("zipcode", zipCode);
    await formik.setFieldValue("places", place?.formatted_address);
    await formik.setFieldValue("city", "");
    await formik.setFieldValue("country", "");
    await formik.setFieldValue("countryShortName", "");
    await formik.setFieldValue("state", "");
    formik.setFieldValue("placeCountry", "");
    formik.setFieldValue("placeState", "");
    formik.setFieldValue("placeCity", "");

    for (const component of place.address_components) {
      const componentType = component?.types[0];
      switch (componentType) {
        case "country":
          let country = component.long_name;

          await formik.setFieldValue("country", country);
          await formik.setFieldValue("countryShortName", component.short_name);
          await formik.setFieldValue("placeCountry", country);
          continue;

        case "locality":
          let city = component.long_name;
          await formik.setFieldValue("city", city);
          await formik.setFieldValue("placeCity", city);
          break;

        case "administrative_area_level_1": {
          let stateName = component.long_name;
          await formik.setFieldValue("state", stateName);
          await formik.setFieldValue("placeState", stateName);
          break;
        }
      }
    }
  };

  const extractZipCodeFromPlace = (place) => {
    const addressComponents = place.address_components;
    for (let i = 0; i < addressComponents.length; i++) {
      const component = addressComponents[i];
      if (component.types.includes("postal_code")) {
        return component.long_name;
      }
    }
    return null;
  };

  useEffect(() => {
    if (scrollToError) {
      const errorField = document.querySelector(".error");
      if (errorField) {
        errorField.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      setScrollToError(false);
    }
  }, [scrollToError]);

  useEffect(() => {
    getBillingInfo().then((res) => {
      setBillingInfo({
        ...billingInfo,
        tin: res?.tin,
        fiscalNumber: res?.fiscalNumber ?? "",
      });
      setInitialValues({
        ...initialValues,
        tin: res?.tin,
        fiscalNumber: res?.fiscalNumber ?? "",
      });
    });
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    formik.handleSubmit();
    if (Object.keys(formik.errors).length > 0) {
      setScrollToError(true);
    }
  };

  console.log("values -> ", formik.values);

  return (
    <Fragment>
      <Card className="mb-10">
        <Card.Body className="d-sm-flex align-items-center justify-content-between">
          <div className="pr-md-3">
            <h4 className="text-body-16">
              {lang("MY_ACCOUNTS.ACCOUNT_SETTINGS.PROFILE_INTRODUCTION")}
            </h4>
            <p className="text-body-14 font-weight-normal m-0">
              {lang(
                "MY_ACCOUNTS.ACCOUNT_SETTINGS.PROFILE_INTRODUCTION_DESCRIPTION"
              )}
            </p>
          </div>

          <div className="mt-sm-0 mt-3">
            <Button
              variant="outline-info ml-sm-3 w-sm-100"
              onClick={handleShow}
              size="sm"
            >
              {lang("MY_ACCOUNTS.COMMON.CHANGE")}
            </Button>
          </div>
        </Card.Body>
      </Card>
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="modal-dialog-scrollable modal-lg"
      >
        <Modal.Header closeButton>
          {/* <Modal.Title className="mb-0"></Modal.Title> */}
          <h3 className="h6 m-0 font-18">
            {lang("MY_ACCOUNTS.POPUP.EDIT_INTRO")}
          </h3>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <TextField
                    type="text"
                    label={lang("MY_ACCOUNTS.FORM.EDIT_INTRO.FIRST_NAME")}
                    placeholder={lang("MY_ACCOUNTS.FORM.EDIT_INTRO.FIRST_NAME")}
                    name="firstName"
                    formik={formik}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <TextField
                    type="text"
                    label={lang("MY_ACCOUNTS.FORM.EDIT_INTRO.LAST_NAME")}
                    placeholder={lang("MY_ACCOUNTS.FORM.EDIT_INTRO.LAST_NAME")}
                    name="lastName"
                    formik={formik}
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <TextField
                    type="text"
                    label={lang("MY_ACCOUNTS.FORM.EDIT_INTRO.CURRENT_POSITION")}
                    required={false}
                    placeholder={lang(
                      "MY_ACCOUNTS.FORM.EDIT_INTRO.CURRENT_POSITION"
                    )}
                    name="currentPosition"
                    formik={formik}
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>
                    {lang("MY_ACCOUNTS.FORM.EDIT_INTRO.OVERVIEW")} <sup>*</sup>
                  </Form.Label>
                  <CkEditorField
                    name="shortDescription"
                    formik={formik}
                    count={1000}
                    countName="shortDescriptionCount"
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>
                    {lang("USER_DESCRIPTION.POPUP.DESCRIPTION")} <sup>*</sup>
                  </Form.Label>
                  <CkEditorField
                    name="briefDescription"
                    formik={formik}
                    count={2000}
                    countName="briefDescriptionCount"
                  />
                </Form.Group>
              </Col>
              <Col sm={12}>
                <Form.Label>
                  {lang("SIGN_UP.PLACES")}
                  <sup className="text-danger">*</sup>
                </Form.Label>
                <Form.Group>
                  <ReactGoogleAutocomplete
                    apiKey={GOOGLE_MAP_API_KEY}
                    type="text"
                    className="floating-input form-control"
                    placeholder="Search Place ..."
                    name="places"
                    onPlaceSelected={onPlaceSelected}
                    options={{
                      fields: GOOGLE_PLACE.fields,
                      types: GOOGLE_PLACE.types,
                    }}
                    value={formik.values.places}
                    onChange={formik.handleChange}
                    onBlur={formik?.handleBlur}
                  />
                  {formik?.touched["places"] && formik?.errors["places"] && (
                    <FormText className={"error"}>
                      {formik?.errors["places"]}
                    </FormText>
                  )}
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group controlId="signupCountry">
                  <Form.Label>
                    {lang("MY_ACCOUNTS.FORM.EDIT_INTRO.COUNTRY")}{" "}
                    <sup className="text-danger">*</sup>
                  </Form.Label>
                  <div className="custom-selectpicker">
                    <input
                      className="form-control"
                      value={formik.values.country}
                      disabled={formik.values.placeCountry.length > 0 && true}
                      placeholder={lang(
                        "MY_ACCOUNTS.FORM.EDIT_INTRO.SELECT_COUNTRY"
                      )}
                      onChange={(e) => {
                        formik.setFieldValue("country", e.target.value);
                      }}
                    />
                    {formik?.touched["country"] &&
                      formik?.errors["country"] && (
                        <FormText className={"error"}>
                          {formik?.errors["country"]}
                        </FormText>
                      )}
                  </div>
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group controlId="signupState">
                  <Form.Label>
                    {lang("SIGN_UP.PROVINCE_STATE")}
                    <sup className="text-danger">*</sup>
                  </Form.Label>
                  <div className="custom-selectpicker">
                    <input
                      className="form-control"
                      value={formik.values.state}
                      disabled={formik.values.placeState.length > 0 && true}
                      placeholder={lang(
                        "MY_ACCOUNTS.FORM.EDIT_INTRO.SELECT_STATE"
                      )}
                      onChange={(e) => {
                        formik.setFieldValue("state", e.target.value);
                      }}
                    />
                    {formik?.touched["state"] && formik?.errors["state"] && (
                      <FormText className={"error"}>
                        {formik?.errors["state"]}
                      </FormText>
                    )}
                  </div>
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group controlId="signupCity">
                  <Form.Label>
                    {lang("MY_ACCOUNTS.FORM.EDIT_INTRO.CITY")}{" "}
                    <sup className="text-danger">*</sup>
                  </Form.Label>
                  <div className="custom-selectpicker">
                    <input
                      className="form-control"
                      value={formik.values.city}
                      disabled={formik.values.placeCity.length > 0 && true}
                      placeholder={lang(
                        "MY_ACCOUNTS.FORM.EDIT_INTRO.SELECT_CITY"
                      )}
                      classNamePrefix="select-box"
                      onChange={(e) => {
                        formik.setFieldValue("city", e.target.value);
                      }}
                    />
                    {formik?.touched["city"] && formik?.errors["city"] && (
                      <FormText className={"error"}>
                        {formik?.errors["city"]}
                      </FormText>
                    )}
                  </div>
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group>
                  <Form.Label>
                    {lang("MY_ACCOUNTS.FORM.EDIT_INTRO.TIMEZONE")}{" "}
                  </Form.Label>
                  <sup className="text-danger">*</sup>
                  <div className="custom-selectpicker-xs">
                    <Select
                      value={
                        formik?.values?.timezone
                          ? {
                              value: formik?.values?.timezone,
                              label: formik?.values?.timezone,
                            }
                          : null
                      }
                      options={timezoneLists.map((item) => ({
                        label: item,
                        value: item,
                      }))}
                      onChange={(selected) => {
                        formik.setFieldValue("timezone", selected?.value);
                      }}
                    />
                  </div>
                  {formik?.touched["timezone"] &&
                    formik?.errors["timezone"] && (
                      <FormText className={"error"}>
                        {formik?.errors["timezone"]}
                      </FormText>
                    )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <TextField
                    type="text"
                    label={lang("MY_ACCOUNTS.FORM.EDIT_INTRO.ZIPCODE")}
                    placeholder={lang("MY_ACCOUNTS.FORM.EDIT_INTRO.WRITE_HERE")}
                    required={true}
                    name="zipcode"
                    formik={formik}
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>
                    {lang("MY_ACCOUNTS.FORM.EDIT_INTRO.ACCOUNT_TYPE")}{" "}
                    <sup>*</sup>
                  </Form.Label>
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
              {formik.values.accountTypeFiscal ===
                accountTypeFiscalType.PRIVATE && (
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <TextField
                      type="text"
                      label={lang("MY_ACCOUNTS.FORM.EDIT_INTRO.FISCAL_NUMBER")}
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
              )}
              <Col md={12}>
                <Form.Group className="mb-3">
                  <TextField
                    type="text"
                    label={lang("MY_ACCOUNTS.FORM.EDIT_INTRO.PEC")}
                    placeholder={lang("MY_ACCOUNTS.FORM.EDIT_INTRO.WRITE_HERE")}
                    required={false}
                    name="pec"
                    formik={formik}
                  />
                </Form.Group>
              </Col>
              {formik.values.accountTypeFiscal ===
                accountTypeFiscalType.BUSINESS && (
                <Col md={12}>
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
              <Col md={12}>
                <Form.Group className="mb-3">
                  <TextField
                    type="text"
                    label={lang("MY_ACCOUNTS.FORM.EDIT_INTRO.SDI_NUMBER")}
                    placeholder={lang("MY_ACCOUNTS.FORM.EDIT_INTRO.WRITE_HERE")}
                    required={false}
                    name="cuuipa"
                    formik={formik}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className="custom-footer text-center d-flex border-top border-geyser justify-content-between p-3">
          <button
            type="button"
            className="btn btn-btn btn-dark font-weight-semibold"
            onClick={() => setShow(false)}
          >
            {lang("COMMON.CANCEL")}
          </button>
          <button
            disabled=""
            type="button"
            className="btn btn-btn btn-info font-weight-semibold"
            onClick={handleFormSubmit}
          >
            {lang("COMMON.UPDATE")}
          </button>
          {/* </div> */}
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};
export default EditIntro;
