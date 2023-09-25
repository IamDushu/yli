import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Row,
  Col,
  Form,
  FormText,
  Card,
  Accordion,
} from "react-bootstrap";
import { FieldArray, FormikProvider, useFormik } from "formik";
import {
  GOOGLE_PLACE,
  REGISTRATION_STEP_ONE_SCHEMA,
  USER_IMAGE_TYPES,
  setCookie,
} from "./../../utils";

import { ImageSelectFieldSignUp, TextField } from "../form-fields";
import EducationDetails from "./education-details";
import { useDispatch } from "react-redux";
import {
  chatSignupUser,
  signUpDetails,
  toggleModals,
} from "../../store/actions";
import PhoneInput from "components/form-fields/react-phone-input";
import CkEditorField from "components/form-fields/ck-editor-field";
import { GOOGLE_MAP_API_KEY } from "config";
import ReactGoogleAutocomplete from "react-google-autocomplete";
/******************** 
  @purpose :Sign Up Step 1
  @Parameter : {}
  @Author : INIC
  ******************/
const SignUpStep1 = ({ changeStep, email }) => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const [accordianState, setAccordianState] = useState(["1", "2", "3", "4"]);

  /******************** 
  @purpose :Clean text
  @Parameter : {code}
  @Author : Yliway
  ******************/

  const cleanText = (text) => {
    // Replace &nbsp; characters with regular spaces
    text = text.replace(/&nbsp;/g, " ");

    // Remove consecutive newline characters and excessive spaces
    const regexNewLine = /\n{2,}/g;
    const regexExtraSpaces = / +/g;
    text = text.replace(regexNewLine, "\n");
    text = text.replace(regexExtraSpaces, " ");

    // Remove consecutive <br> tags
    const regexBr = /(<br\s*\/?>\s*){2,}/gi;
    text = text.replace(regexBr, "<br>");

    // Remove empty <p> tags
    const regexEmptyP = /<p>\s*<\/p>/gi;
    text = text.replace(regexEmptyP, "");

    // Remove empty <h1> to <h3> tags
    const regexEmptyH = /<h[1-3][^>]*>\s*<\/h[1-3]>/gi;
    text = text.replace(regexEmptyH, "");

    // Remove excessive spaces within tags
    const regexSpacesWithinTags =
      /(<(p|br|h[1-6])[^>]*>)\s+|\s+(<\/(p|br|h[1-6])>)/gi;
    text = text.replace(regexSpacesWithinTags, "$1$3");

    // Trim leading and trailing white spaces
    text = text.trim();

    return text;
  };

  /******************** 
  @purpose :Registration Step 1
  @Parameter : {code}
  @Author : INIC
  ******************/
  const formik = useFormik({
    initialValues: {
      profilePic: "",
      firstName: "",
      lastName: "",
      email,
      alternateEmail: "",
      phone: "",
      countryCode: "",
      zipcode: "",
      alternatePhone: "",
      alternateCountryCode: "",
      country: "",
      countryShortName: "",
      state: "",
      city: "",
      placeCountry: "",
      placeState: "",
      placeCity: "",
      places: "",
      currentPosition: "",
      websiteURL: "",
      shortDescription: "",
      briefDescription: "",
      educationDetails: [
        {
          institute: "",
          education: "",
          fieldOfStudy: "",
          startDate: "",
          endDate: "",
          grade: "",
          activities: "",
          description: "",
          instituteId: "",
        },
      ],
    },
    validationSchema: REGISTRATION_STEP_ONE_SCHEMA(lang),
    onSubmit: async (values) => {
      const cleanedShortDescription = cleanText(values.shortDescription);

      const cleanedBriefdescription = cleanText(values.briefDescription);

      let {
        // selected_city,
        // selected_country,
        // selected_state,
        profilePic,
        educationDetails,
        ...rest
      } = values;

      const placeArray = values.places.includes(",")
        ? values.places.split(",")
        : values.places.split("-");
      rest.country = placeArray[placeArray.length - 1];
      rest.websiteURL =
        rest.websiteURL !== ""
          ? [
            {
              url: rest.websiteURL,
              type: { value: "Personal", label: "Personal" },
            },
          ]
          : [];
      rest.alternatePhone = formik.values.alternatePhone;
      rest.countryShortName = formik.values.countryShortName;
      rest.profilePicURL = profilePic;
      rest.educationDetails = checkArrayEmpty(educationDetails);
      dispatch(chatSignupUser({ email }));
      dispatch(
        signUpDetails({
          ...rest,
          shortDescription: cleanedShortDescription,
          briefDescription: cleanedBriefdescription,
        })
      );
      setCookie("sortBy", "Growth");
      localStorage.setItem("groupTab", "groups");
      dispatch(toggleModals({ thankyou: true }));
    },
  });

  const handlePlacesChange = (e) => {
    formik?.setFieldValue("places", e?.target?.value);
    formik?.setFieldValue("country", ""); // clear country value
    formik?.setFieldValue("state", ""); // clear state value
  };

  const checkArrayEmpty = (arr) => {
    let x = [];
    arr.forEach((element) => {
      if (element.institute !== "" || element.education !== "") {
        x.push(element);
      }
    });
    return x;
  };
  /*******************
  @Purpose : Google API Hook to handle place search
   @Parameter : {}
   @Author : INIC
 *******************/
  const onPlaceSelected = async (place) => {

    const zipCode = extractZipCodeFromPlace(place);
    if (!zipCode) {
      await formik.setFieldValue("zipcode", "");
    }
    else await formik.setFieldValue("zipcode", zipCode);
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
  return (
    <Fragment>
      <Card className="mb-4" style={{ padding: 0 }}>
        <Accordion
          className=""
          defaultActiveKey="1"
          activeKey={accordianState[0]}
        >
          <Accordion.Toggle
            variant="link"
            eventKey={"1"}
            className="p-0 w-100 d-flex align-items-center accordion-signup-header  text-secondary "
          // onClick={() => {
          //   const activeStates = [...accordianState];
          //   activeStates[0] = activeStates[0] == "1" ? "" : "1";
          //   setAccordianState(activeStates);
          // }}
          >
            <div
              className={
                "bg-coaching-room-accordian rounded-0 w-100 d-flex align-items-center justify-content-between py-3 px-4"
              }
            >
              <Card.Title className="mb-0">
                <h6 className="color-sky-blue mb-0">Personal information</h6>
              </Card.Title>
              {/* { accordianState[1] == "2"
                    ? "icon icon-down-arrow-secondary-primary ml-auto font-12 rotate-top"
                    :} */}
              <em
                className={
                  accordianState[0] == "1"
                    ? "icon icon-down-arrow ml-auto font-24 rotate-top"
                    : "icon icon-down-arrow ml-auto font-24"
                }
              ></em>
            </div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={"1"}>
            <Card.Body>
              <Row>
                <Col sm={6}>
                  <Form.Group controlId="signupFirstName">
                    <TextField
                      type="text"
                      label={lang("SIGN_UP.NAME")}
                      placeholder={lang("SIGN_UP.ENTER_NAME")}
                      name="firstName"
                      formik={formik}
                    />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group controlId="signupSurName">
                    <TextField
                      type="text"
                      label={lang("SIGN_UP.SURNAME")}
                      placeholder={lang("SIGN_UP.ENTER_SURNAME")}
                      name="lastName"
                      formik={formik}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col sm={6}>
                  <Form.Group controlId="signupWebsiteURL">
                    <TextField
                      type="text"
                      label={lang(
                        "MY_ACCOUNTS.FORM.EDIT_INTRO.CURRENT_POSITION"
                      )}
                      required={true}
                      placeholder={lang("SIGN_UP.ENTER_CURRENT_POSITION")}
                      name="currentPosition"
                      formik={formik}
                    />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <div className="d-flex flex-wrap flex-lg-nowrap align-items-start">
                    <div className="position-relative sign-up-picture flex-shrink-0">
                      <ImageSelectFieldSignUp
                        name="profilePic"
                        formik={formik}
                      />
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Accordion.Collapse>
        </Accordion>
      </Card>

      <Card className="mb-4" style={{ padding: 0 }}>
        <Accordion
          className=""
          defaultActiveKey="1"
          activeKey={accordianState[1]}
        >
          <Accordion.Toggle
            variant="link"
            eventKey={"2"}
            className="p-0 w-100 d-flex align-items-center accordion-signup-header  text-secondary "
          // onClick={() => {
          //   const activeStates = [...accordianState];
          //   activeStates[1] = activeStates[1] == "2" ? "" : "2";
          //   setAccordianState(activeStates);
          // }}
          >
            <div
              className={
                "bg-coaching-room-accordian rounded-0 w-100 d-flex align-items-center justify-content-between py-3 px-4"
              }
            >
              <Card.Title className="mb-0">
                <h6 className="color-sky-blue mb-0">Contact information</h6>
              </Card.Title>
              {/* { accordianState[1] == "2"
                    ? "icon icon-down-arrow-secondary-primary ml-auto font-12 rotate-top"
                    :} */}
              <em
                className={
                  accordianState[1] == "2"
                    ? "icon icon-down-arrow ml-auto font-24 rotate-top"
                    : "icon icon-down-arrow ml-auto font-24"
                }
              ></em>
            </div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={"2"}>
            <Card.Body>
              <Row>
                <Col sm={6}>
                  <Form.Group controlId="signupEmail">
                    <TextField
                      type="email"
                      label={lang("FORM.EMAIL")}
                      placeholder={lang("SIGN_UP.ENTER_EMAIL")}
                      name="email"
                      formik={formik}
                      disabled={email ? true : false}
                    />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group controlId="signupAlternateEmail">
                    <TextField
                      type="email"
                      label={lang("SIGN_UP.ALTERNATE_EMAIL")}
                      placeholder={lang("SIGN_UP.ENTER_EMAIL")}
                      name="alternateEmail"
                      required={false}
                      formik={formik}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col sm={6}>
                  <Form.Group>
                    <PhoneInput
                      label={lang(
                        "USER_PROFILE_SUMMARY.TEXT.CONTACT_INFO_PHONE"
                      )}
                      required={true}
                      formik={formik}
                      name="phone"
                      countryCode="countryCode"
                      type="signUp"
                    />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group controlId="signupAlternatePhoneNo">
                    <PhoneInput
                      label={lang(
                        "MY_ACCOUNTS.FORM.ACCOUNT_ACCESS.ALTERNATE_PHONE_NUMBER"
                      )}
                      placeholder="Enter alternate phone no"
                      required={false}
                      formik={formik}
                      name="alternatePhone"
                      type="signUp"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Accordion.Collapse>
        </Accordion>
      </Card>

      <Card className="mb-4" style={{ padding: 0 }}>
        <Accordion
          className=""
          defaultActiveKey="1"
          activeKey={accordianState[2]}
        >
          <Accordion.Toggle
            variant="link"
            eventKey={"3"}
            className="p-0 w-100 d-flex align-items-center accordion-signup-header  text-secondary "
          // onClick={() => {
          //   const activeStates = [...accordianState];
          //   activeStates[2] = activeStates[2] == "3" ? "" : "3";
          //   setAccordianState(activeStates);
          // }}
          >
            <div
              className={
                "bg-coaching-room-accordian rounded-0 w-100 d-flex align-items-center justify-content-between py-3 px-4"
              }
            >
              <Card.Title className="mb-0">
                <h6 className="color-sky-blue mb-0">Location</h6>
              </Card.Title>
              {/* { accordianState[1] == "2"
                    ? "icon icon-down-arrow-secondary-primary ml-auto font-12 rotate-top"
                    :} */}
              <em
                className={
                  accordianState[2] == "3"
                    ? "icon icon-down-arrow ml-auto font-24 rotate-top"
                    : "icon icon-down-arrow ml-auto font-24"
                }
              ></em>
            </div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={"3"}>
            <Card.Body>
              <Row>
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
                      placeholder="Search Place ..."
                      name="places"
                      onPlaceSelected={onPlaceSelected}
                      options={{
                        fields: GOOGLE_PLACE.fields,
                        types: GOOGLE_PLACE.types,
                      }}
                      value={formik.values["places"]}
                      onChange={handlePlacesChange}
                      onBlur={formik?.handleBlur}
                    />
                    {formik?.touched["places"] && formik?.errors["places"] && (
                      <FormText className={"error"}>
                        {formik?.errors["places"]}
                      </FormText>
                    )}
                    {formik?.touched["places"] &&
                      !formik?.errors["places"] &&
                      (formik?.errors["country"] ||
                        formik?.errors["state"] ||
                        formik?.errors["city"]) && (
                        <FormText className={"error"}>
                          {lang(
                            "MY_ACCOUNTS.FORM.EDIT_INTRO.PRECISE_LOCATION"
                          )}
                        </FormText>
                      )}
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group controlId="signupZipcode">
                    <TextField
                      type="text"
                      label={lang("FORM.ZIPCODE")}
                      placeholder={lang("SIGN_UP.ENTER_ZIPCODE")}
                      name="zipcode"
                      formik={formik}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Accordion.Collapse>
        </Accordion>
      </Card>

      <Card style={{ padding: 0 }}>
        <Accordion
          className=""
          defaultActiveKey="1"
          activeKey={accordianState[3]}
        >
          <Accordion.Toggle
            variant="link"
            eventKey={"4"}
            className="p-0 w-100 d-flex align-items-center accordion-signup-header  text-secondary "
          // onClick={() => {
          //   const activeStates = [...accordianState];
          //   activeStates[3] = activeStates[3] == "4" ? "" : "4";
          //   setAccordianState(activeStates);
          // }}
          >
            <div
              className={
                "bg-coaching-room-accordian rounded-0 w-100 d-flex align-items-center justify-content-between py-3 px-4"
              }
            >
              <Card.Title className="mb-0">
                <h6 className="color-sky-blue mb-0">Profile information</h6>
              </Card.Title>
              {/* { accordianState[1] == "2"
                    ? "icon icon-down-arrow-secondary-primary ml-auto font-12 rotate-top"
                    :} */}
              <em
                className={
                  accordianState[3] == "4"
                    ? "icon icon-down-arrow ml-auto font-24 rotate-top"
                    : "icon icon-down-arrow ml-auto font-24"
                }
              ></em>
            </div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={"4"}>
            <Card.Body>
              <Row>
                <Col sm={12}>
                  <Form.Group controlId="signupShortDescription">
                    <Form.Label>
                      {lang("USER_DESCRIPTION.TEXT.SHORT_DESCRIPTION")}
                      <sup>*</sup>
                    </Form.Label>
                    <CkEditorField
                      name="shortDescription"
                      formik={formik}
                      count={1000}
                      countName="shortDescriptionCount"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col sm={12}>
                  <Form.Group controlId="signupBriefDescription">
                    <Form.Label>
                      {lang("USER_DESCRIPTION.TEXT.DESCRIPTION")}
                      <sup>*</sup>
                    </Form.Label>
                    <CkEditorField
                      name="briefDescription"
                      formik={formik}
                      count={2000}
                      countName="briefDescriptionCount"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Accordion.Collapse>
        </Accordion>
      </Card>

      <div className="text-center mt-4 pt-2">
        <Button
          variant="info"
          className="btn-xl"
          onClick={() => {
            formik.handleSubmit();
          }}
        >
          Go to Dashboard
        </Button>
      </div>
    </Fragment>
  );
};
export default SignUpStep1;
