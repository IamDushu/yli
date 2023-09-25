import React, { Fragment, useEffect, useState } from "react";
import { Button, Row, Col, Form, Card, FormText } from "react-bootstrap";
import { Link } from "routes";
import Select from "react-select";
import PerfectScrollbar from "react-perfect-scrollbar";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
  getCookie,
  instantMessageOptions,
  monthDayNumMap,
  monthNumMap,
  monthOptions,
  PROFILE_CONTACT_INFO,
  setCookie,
  websiteTypeOptions,
} from "../../../utils";
import { updateUserInfo } from "../../../store/actions";
import { APP_URL, PUBLIC_PROFILE_URL } from "../../../config";
import PhoneInput2 from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useTranslation } from "react-i18next";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { TextField } from "components/form-fields";

/******************** 
  @purpose :Profile Summary Form  
  @Parameter : { }
  @Author : INIC
  ******************/
const ProfileSummaryForm = ({
  closePopupHandler,
  popupInfo: { data },
  showVisibilitySelect,
}) => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const {
    websiteURL,
    socialMediaUrl,
    phone,
    alternatePhone,
    email,
    dateOfBirth,
    profileId,
    countryCode,
  } = data;

  const [errorMsgs, setErrorMsgs] = useState({
    birthDay: "",
    birthMonth: "",
    websiteURL: [],
  });
  const [website, setWebsite] = useState([]);
  const [instantM, setInstantM] = useState([]);

  const [birthMonth, setBirthMonth] = useState(() => {
    if (dateOfBirth) {
      const month = moment(dateOfBirth).format("MMMM");
      return { value: month, label: month };
    }
    // return { value: "", label: "" };
    return null;
  });
  const [birthDay, setBirthDay] = useState(() => {
    if (dateOfBirth) {
      const day = moment(dateOfBirth).format("D");
      return { value: day, label: day };
    }
    return null;
  });

  const dayOptions = [];
  const numDays = monthDayNumMap[birthMonth?.value] || 31;
  for (let i = 1; i <= numDays; i++) {
    dayOptions.push({ value: i, label: i });
  }

  const initialValues = {
    dateOfBirth: dateOfBirth || "",
    websiteURL: websiteURL || [
      { url: "", type: { value: "Personal", label: "Personal" } },
    ],
    phone:
      phone && phone?.indexOf("+") === 0 ? phone : countryCode + phone || "",
    alternatePhone:
      alternatePhone && alternatePhone?.indexOf("+") === 0
        ? alternatePhone
        : countryCode + phone || "",
    countryCode: countryCode || "",
    socialMediaUrl: socialMediaUrl || [
      { url: "", type: { value: "Skype", label: "Skype" } },
    ],
  };
  const getWebsiteOptions = () => {
    const websiteOptions = [];
    websiteTypeOptions.map((websiteData) => {
      websiteOptions.push(websiteData);
      setWebsite(websiteOptions);
    });
  };
  const websiteTypeTranslation = {
    Personal: lang("FORM.WEBSITE_TYPES.PERSONAL"),
    Company: lang("FORM.WEBSITE_TYPES.COMPANY"),
    Blog: lang("FORM.WEBSITE_TYPES.BLOG"),
    RSS_Feed: lang("FORM.WEBSITE_TYPES.RSS_FEED"),
    Portfolio: lang("FORM.WEBSITE_TYPES.PORTFOLIO"),
    Other: lang("FORM.WEBSITE_TYPES.OTHER"),
  };
  const monthTranslation = {
    "": lang("FORM.MONTH.NONE"),
    January: lang("FORM.MONTH.JANUARY"),
    February: lang("FORM.MONTH.FEBRUARY"),
    March: lang("FORM.MONTH.MARCH"),
    April: lang("FORM.MONTH.APRIL"),
    May: lang("FORM.MONTH.MAY"),
    June: lang("FORM.MONTH.JUNE"),
    July: lang("FORM.MONTH.JULY"),
    August: lang("FORM.MONTH.AUGUST"),
    September: lang("FORM.MONTH.SEPTEMBER"),
    October: lang("FORM.MONTH.OCTOBER"),
    November: lang("FORM.MONTH.NOVEMBER"),
    December: lang("FORM.MONTH.DECEMBER"),
  };
  const getIMOptions = () => {
    const imOptions = [];
    instantMessageOptions.map((imData) => {
      imOptions.push(imData);
      setInstantM(imOptions);
    });
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: () => PROFILE_CONTACT_INFO(lang),
    onSubmit: (values) => {
      let newDOB = null;
      if (birthDay && birthMonth) {
        newDOB = moment()
          .set("date", birthDay.value)
          .set("month", monthNumMap[birthMonth.value]);
      }

      values.dateOfBirth = newDOB;

      dispatch(updateUserInfo(values, () => closePopupHandler()));
      let user = JSON.parse(getCookie("userInfo"));
      user["phone"] = data.phone;
      setCookie("userInfo", user);
    },
  });

  return (
    <>
      <div className="card-md">
        {/* <PerfectScrollbar> */}
        <Card.Body className="p-3 card-scroll">
          <Form>
            <div className="mb-3">
              <h5 className="d-block font-14">
                {lang("USER_PROFILE_SUMMARY.TEXT.CONTACT_INFO_PROFILE_URL")}{" "}
              </h5>
              {profileId ? (
                <Link route={`${APP_URL}/profile/${profileId}`}>
                  <Row>
                    <Col sm={7} lg={7}>
                      <span className="cursor-pointer text-primary font-14 truncate-text">
                        {`${PUBLIC_PROFILE_URL}/${profileId}`}
                      </span>
                    </Col>
                    <Col sm={5} lg={5}>
                      <em className="cursor-pointer text-primary font-16 bx bx-link-external align-middle"></em>{" "}
                    </Col>
                  </Row>
                </Link>
              ) : (
                <span className="font-14">Not added yet</span>
              )}
            </div>
            <div>
              <Row>
                <Col sm={7} lg={7} className="py-3 py-lg-0">
                  <h5 className="d-block font-14 mb-0 mb-lg-2">
                    <Form.Label>
                      {lang(
                        "USER_PROFILE_SUMMARY.TEXT.CONTACT_INFO_EMAIL_ADDRESS"
                      )}
                    </Form.Label>
                  </h5>
                  {/* <Link route="/"> */}
                  <a className="text-primary font-14" href={`mailto:${email}`}>
                    {email}{" "}
                    <em className="bx bx-link-external align-middle"></em>{" "}
                  </a>
                </Col>
                {/* </Link> */}
                <Col sm={5} lg={5} className="py-3 py-lg-0 mb-0">
                  {showVisibilitySelect("EMAIL", false)}
                </Col>
              </Row>
            </div>
            <FormikProvider value={formik}>
              <FieldArray
                name="websiteURL"
                validateOnChange={true}
                render={(arrayHelpers) => {
                  const websiteArray = formik.values.websiteURL;
                  return (
                    <>
                      {websiteArray && websiteArray.length > 0
                        ? websiteArray.map((websiteDetail, index) => (
                            <Row className="mb-2 mt-2" key={index}>
                              <Col lg={5} sm={7}>
                                <Form.Group
                                  className="mb-2"
                                  controlId="institutecontact"
                                >
                                  <label className="form-label">
                                    {lang(
                                      "USER_PROFILE_SUMMARY.TEXT.CONTACT_INFO_WEBSITE_URL"
                                    )}
                                  </label>
                                  <TextField
                                    name={`websiteURL.${index}.url`}
                                    placeholder={lang(
                                      "USER_PROFILE_SUMMARY.TEXT.ENTER_WEBSITE_URL"
                                    )}
                                    formik={formik}
                                    required={false}
                                  />
                                  {formik?.touched["websiteURL"]?.[index]
                                    ?.url &&
                                    formik?.errors["websiteURL"]?.[index]
                                      ?.url && (
                                      <FormText className={"error"}>
                                        {
                                          formik?.errors["websiteURL"]?.[index]
                                            ?.url
                                        }
                                      </FormText>
                                    )}
                                </Form.Group>
                              </Col>
                              <Col lg={3} sm={5}>
                                <Form.Group
                                  controlId="contactEditWebUrlType1"
                                  size="sm"
                                  className="m-sm-0 mb-0"
                                >
                                  <Form.Label className="">
                                    {lang("FORM.WEBSITE_TYPES.PERSONAL")}
                                  </Form.Label>
                                  <div className="custom-selectpicker-xs">
                                    <Select
                                      defaultValue={
                                        (formik.values.websiteURL &&
                                          formik.values.websiteURL[index]
                                            .type) ||
                                        (websiteURL && websiteURL[index]?.type)
                                      }
                                      options={website.map((wb) => ({
                                        value: wb.value,
                                        label: websiteTypeTranslation[wb.value],
                                      }))}
                                      onChange={(e) =>
                                        formik.setFieldValue(
                                          `websiteURL.${index}.type`,
                                          e
                                        )
                                      }
                                      onMenuOpen={getWebsiteOptions}
                                      styles={{
                                        placeholder: (provided) => ({
                                          ...provided,
                                          color: "#D6E1EC",
                                        }),
                                      }}
                                    />
                                  </div>
                                </Form.Group>
                              </Col>
                              <Col lg={4} sm={7}>
                                {showVisibilitySelect("WEBSITE", false)}
                                <div className="text-right">
                                  <p
                                    className="text-primary  pointer mb-0 mt-1 d-inline-block"
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    {lang(
                                      "USER_PROFILE_SUMMARY.TEXT.CONTACT_INFO_REMOVE_WEBSITE"
                                    )}
                                  </p>
                                </div>
                              </Col>
                            </Row>
                          ))
                        : null}
                      {websiteArray.length < 5 && (
                        <div className="add-website-wrap my-3">
                          <a
                            className="text-primary font-14"
                            onClick={() =>
                              arrayHelpers.push({
                                url: "",
                                type: {
                                  value: "Personal",
                                  label: "Personal",
                                },
                              })
                            }
                          >
                            <i className="bx bx-plus"></i>
                            {lang(
                              "USER_PROFILE_SUMMARY.TEXT.CONTACT_INFO_ADD_WEBSITE"
                            )}
                          </a>
                        </div>
                      )}
                    </>
                  );
                }}
              />
            </FormikProvider>

            <Row>
              <Col lg={4} sm={7}>
                <Form.Group controlId="contactEditPhone">
                  <Form.Label>
                    {lang("USER_PROFILE_SUMMARY.TEXT.CONTACT_INFO_PHONE")}
                    <sup className="text-danger">*</sup>
                  </Form.Label>
                  <PhoneInput2
                    className="react-phone-input"
                    country={"it"}
                    masks={""}
                    countryCodeEditable={false}
                    onChange={(phoneNumber, country) => {
                      formik.setFieldValue(
                        "phone",
                        phoneNumber.replace(country.dialCode, "")
                      );
                      formik.setFieldValue(
                        "countryCode",
                        `+${country.dialCode}`
                      );
                    }}
                    value={
                      phone && phone?.indexOf("+") === 0
                        ? phone
                        : countryCode + phone
                    }
                  />
                  {formik?.touched["phone"] && formik?.errors["phone"] && (
                    <FormText className={"error"}>
                      {formik?.errors["phone"]}
                    </FormText>
                  )}
                </Form.Group>
              </Col>
              <Col lg={4} sm={7}>
                <Form.Group controlId="contactEditPhone">
                  <Form.Label>
                    {/* {lang("USER_PROFILE_SUMMARY.TEXT.CONTACT_INFO_PHONE")} */}
                    Alternate Phone No
                  </Form.Label>
                  <PhoneInput2
                    className="react-phone-input"
                    country={"it"}
                    masks={""}
                    countryCodeEditable={false}
                    onChange={(phoneNumber, country) => {
                      formik.setFieldValue(
                        "alternatePhone",
                        phoneNumber.replace(country.dialCode, "")
                      );
                      formik.setFieldValue(
                        "countryCode",
                        `+${country.dialCode}`
                      );
                    }}
                    value={
                      alternatePhone && alternatePhone?.indexOf("+") === 0
                        ? alternatePhone
                        : countryCode + alternatePhone
                    }
                  />
                </Form.Group>
              </Col>
              <Col lg={4} sm={5}>
                {showVisibilitySelect("PHONE", false)}
              </Col>
            </Row>

            <Row className="mt-2 mt-sm-0">
              <Col sm={7} lg={4}>
                <Form.Group controlId="contactEditBirthdayMonth" size="sm">
                  <Form.Label>{lang("COMMON.MONTH")}</Form.Label>
                  <div className="custom-selectpicker-xs">
                    <Select
                      placeholder={lang("COMMON.MONTH")}
                      options={monthOptions.map((mo) => ({
                        value: mo.value,
                        label: monthTranslation[mo.value],
                      }))}
                      maxMenuHeight={170}
                      onChange={(selected) => {
                        if (!selected.value) {
                          setBirthDay(null);
                          setBirthMonth(null);
                        } else {
                          setBirthDay({
                            value: 1,
                            label: 1,
                          });
                          setBirthMonth(selected);
                        }
                      }}
                      value={birthMonth}
                      styles={{
                        placeholder: (provided) => ({
                          ...provided,
                          color: "#D6E1EC",
                        }),
                      }}
                    />
                    <span style={{ color: "red", fontSize: "10px" }}>
                      {errorMsgs.birthMonth}
                    </span>
                  </div>
                </Form.Group>
              </Col>
              <Col sm={5} lg={3}>
                <Form.Group controlId="contactEditBirthdayDay" size="sm">
                  <Form.Label className="opacity-0 d-sm-d-none">
                    {lang("FORM.DAY")}
                  </Form.Label>
                  <div className="custom-selectpicker-xs">
                    <Select
                      // defaultValue={"Month"}
                      isDisabled={!birthMonth}
                      placeholder={lang("FORM.DAY")}
                      options={dayOptions}
                      maxMenuHeight={170}
                      onChange={(selected) => {
                        setBirthDay(selected);
                      }}
                      value={birthDay}
                      styles={{
                        placeholder: (provided) => ({
                          ...provided,
                          color: "#D6E1EC",
                        }),
                      }}
                    />
                    <span style={{ color: "red", fontSize: "10px" }}>
                      {errorMsgs.birthDay}
                    </span>
                  </div>
                </Form.Group>
              </Col>
              <Col lg={5} sm={7}>
                {showVisibilitySelect("BIRTHYEAR", false)}
              </Col>
            </Row>
            <Row></Row>

            <FormikProvider value={formik}>
              <FieldArray
                name="socialMediaUrl"
                validateOnChange={true}
                render={(arrayHelpers) => {
                  const socialMediaUrlArray = formik.values.socialMediaUrl;
                  return (
                    <>
                      {socialMediaUrlArray && socialMediaUrlArray.length > 0
                        ? socialMediaUrlArray.map((websiteDetail, index) => (
                            <Row className="mb-4" key={index}>
                              <Col lg={5} sm={7}>
                                <Form.Group
                                  className="mb-4"
                                  controlId="institutecontact"
                                >
                                  <label className="form-label">
                                    {lang(
                                      "USER_PROFILE_SUMMARY.TEXT.CONTACT_INFO_INSTANT_MESSENGER"
                                    )}
                                  </label>
                                  <TextField
                                    name={`socialMediaUrl.${index}.url`}
                                    placeholder={lang(
                                      "USER_PROFILE_SUMMARY.TEXT.ENTER_WEBSITE_URL"
                                    )}
                                    formik={formik}
                                    required={false}
                                  />
                                  {formik?.touched["socialMediaUrl"]?.[index]
                                    ?.url &&
                                    formik?.errors["socialMediaUrl"]?.[index]
                                      ?.url && (
                                      <FormText className={"error"}>
                                        {
                                          formik?.errors["socialMediaUrl"]?.[
                                            index
                                          ]?.url
                                        }
                                      </FormText>
                                    )}
                                </Form.Group>
                              </Col>
                              <Col lg={3} sm={5}>
                                <Form.Group
                                  controlId="contactEditWebUrlType1"
                                  size="sm"
                                  className="m-sm-0"
                                >
                                  <Form.Label className="opacity-0 d-sm-d-none">
                                    {lang(
                                      "USER_PROFILE_SUMMARY.TEXT.CONTACT_INFO_WEBSITE_URL"
                                    )}
                                  </Form.Label>
                                  <div className="custom-selectpicker-xs">
                                    <Select
                                      defaultValue={
                                        (formik.values.socialMediaUrl &&
                                          formik.values.socialMediaUrl[index]
                                            .type) ||
                                        (socialMediaUrl &&
                                          socialMediaUrl[index]?.type)
                                      }
                                      options={instantM}
                                      onChange={(e) =>
                                        formik.setFieldValue(
                                          `socialMediaUrl.${index}.type`,
                                          e
                                        )
                                      }
                                      onMenuOpen={getIMOptions}
                                    />
                                  </div>
                                </Form.Group>
                              </Col>
                              <Col lg={4} sm={7}>
                                {showVisibilitySelect("IM", false)}
                                <div className="text-right">
                                  <p
                                    className="text-primary pointer m-0 d-inline-block"
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    {lang(
                                      "USER_PROFILE_SUMMARY.TEXT.CONTACT_INFO_REMOVE_IM"
                                    )}
                                  </p>
                                </div>
                              </Col>
                            </Row>
                          ))
                        : null}
                      <Row className="mb-2">
                        <Col lg={12} sm={7}>
                          {socialMediaUrlArray.length < 5 && (
                            <div className="add-website-wrap mb-3 mt-2">
                              <a
                                className="text-primary font-14"
                                onClick={() =>
                                  arrayHelpers.push({
                                    url: "",
                                    type: { value: "Skype", label: "Skype" },
                                  })
                                }
                              >
                                <i className="bx bx-plus"></i>
                                {lang(
                                  "USER_PROFILE_SUMMARY.TEXT.CONTACT_INFO_ADD_MESSENGER"
                                )}
                              </a>
                            </div>
                          )}
                        </Col>
                      </Row>
                    </>
                  );
                }}
              />
            </FormikProvider>
          </Form>
          <Row></Row>
        </Card.Body>
        {/* </PerfectScrollbar> */}
      </div>
      <div className="custom-footer d-flex justify-content-end">
        <Button
          variant="btn border-divider-color font-weight-semibold mb-md-0 mr-3"
          onClick={() => closePopupHandler()}
        >
          {lang("COMMON.CANCEL")}
        </Button>
        <Button
          onClick={formik.handleSubmit}
          variant="btn btn-info font-weight-semibold px-24"
          type="button"
        >
          {lang("COMMON.UPDATE")}
        </Button>
      </div>
    </>
  );
};

export default ProfileSummaryForm;
