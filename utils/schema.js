import * as Yup from "yup";
import moment from "moment";
import { INPUT_VALIDATOR } from "@utils";
import { monthNumMap } from ".";

Yup.addMethod(Yup.string, "greaterEndDate", function (errorMessage) {
  return this.test(`test-card-type`, errorMessage, function (val, ctx) {
    const { path, createError } = this;

    const { startMonth, startYear, endYear } = ctx.parent;
    const endMonth = val || ctx.parent.endMonth;
    if (startMonth && startYear && endYear && endMonth) {
      const startDate = moment()
        .set("year", parseInt(startYear))
        .set("month", monthNumMap[startMonth]);
      const endDate = moment()
        .set("year", parseInt(endYear))
        .set("month", monthNumMap[endMonth]);
      if (typeof endDate === "object" && typeof startDate === "object") {
        return (
          endDate.isAfter(startDate) ||
          createError({ path, message: errorMessage })
        );
      }
    }

    return true;
  });
});

/******************* 
@purpose : Login Validation Schema
@Author : INIC
@Parameter : {lang} 
******************/
export const LOGIN_SCHEMA = (lang) =>
  Yup.object().shape({
    auth: Yup.string()
      .trim()
      .required(lang("FORM.EMAIL_MOBILE_REQUIRED"))
      .test("auth", lang("FORM.EMAIL_MOBILE_INVALID"), (value) => {
        return (
          validateEmail(value, lang) ||
          validatePhone(parseInt(value ?? "0"), lang)
        );
      }),
    password: Yup.string()
      .required(lang("FORM.PASSWORD_REQUIRED"))
      .matches(INPUT_VALIDATOR.passwordRegex, lang("FORM.PASSWORD_VALIDATION")),
  });

/**
 * @purpose : Validation for recovery email and phone
 * @Author : YLIWAY
 */

export const RECOVERY_FIELD_EMAIL_VALIDATION = (lang) => {
  return Yup.object().shape({
    recoveryEmail: Yup.string()
      .trim()
      .test("recoveryEmail", lang("FORM.RECOVERY_EMAIL_INVALID"), (value) => {
        if (!value) return true; // if no value, pass validation
        return validateEmail(value, lang);
      }),
    recoveryPhone: Yup.string()
      .trim()
      .matches(/^\+?[0-9]*$/, lang("FORM.RECOVERY_PHONE_INVALID"))
      .test("recoveryPhone", lang("FORM.RECOVERY_PHONE_INVALID"), (value) => {
        if (!value) return true; // if no value, pass validation
        return value.replace("+", "").length >= 8; // replace "+" before checking length
      }),
  });
};

/******************* 
@purpose : Add More in Growth Model Schema
@Author : INIC
 ******************/
export const ADD_MORE_GM_SCHEMA = (lang) =>
  Yup.object().shape({
    skillArea: Yup.string().required(
      lang("FORM.ADD_MORE_GM_VALIDATION.SKILL_AREA")
    ),
    skillType: Yup.string()
      .trim()
      .required(lang("FORM.ADD_MORE_GM_VALIDATION.SKILL_TYPE")),
    title: Yup.string()
      .trim()
      .required(lang("FORM.ADD_MORE_GM_VALIDATION.TITLE")),
    // link: Yup.string()
    //   .trim()
    //   .url(lang("FORM.URL_INVALID"))
    //   .required(lang("FORM.ADD_MORE_GM_VALIDATION.LINK")),
  });

/******************* 
@purpose : Registration Validation Schema
@Author : INIC
 ******************/
export const REGISTRATION_SCHEMA = (lang) =>
  Yup.object().shape({
    auth: Yup.string()
      .trim()
      .required(lang("FORM.EMAIL_MOBILE_REQUIRED"))
      .test("auth", lang("FORM.EMAIL_MOBILE_INVALID"), (value) => {
        return validateEmail(value, lang);
      }),
    password: Yup.string()
      .required(lang("FORM.PASSWORD_REQUIRED"))
      .matches(INPUT_VALIDATOR.passwordRegex, lang("FORM.PASSWORD_VALIDATION")),
  });

const validateEmail = (email, lang) => {
  return Yup.string()
    .email(lang("FORM.EMAIL_INVALID"))
    .matches(INPUT_VALIDATOR.emailRegex, lang("FORM.EMAIL_INVALID"))
    .isValidSync(email);
};

const validatePhone = (phone, lang, type) => {
  if (type === "phone") {
    return Yup.number()
      .integer()
      .positive()
      .test((phone) => {
        return phone &&
          phone.toString().length >= 8 &&
          phone.toString().length <= 14
          ? true
          : false;
      })
      .isValidSync(phone);
  } else if (type === "alternatePhone") {
    return Yup.number();
  } else if (type === undefined) {
    return Yup.number()
      .integer()
      .positive()
      .test((phone) => {
        return phone &&
          phone.toString().length >= 8 &&
          phone.toString().length <= 14
          ? true
          : false;
      })
      .isValidSync(phone);
  }
};

/******************* 
@purpose : Registration Step One Validation Schema
@Author : INIC
 ******************/
export const REGISTRATION_STEP_ONE_SCHEMA = (lang) =>
  Yup.object().shape({
    firstName: Yup.string()
      .trim()
      .required(lang("FORM.SIGN_UP_DETAILS_VALIDATION.FIRST_NAME")),
    lastName: Yup.string()
      .trim()
      .required(lang("FORM.SIGN_UP_DETAILS_VALIDATION.LAST_NAME")),

    currentPosition: Yup.string()
      .trim()
      .required(lang("FORM.SIGN_UP_DETAILS_VALIDATION.CURRENT_POSITION")),
    places: Yup.string()
      .trim()
      .required(lang("FORM.SIGN_UP_DETAILS_VALIDATION.PLACES")),
    email: Yup.string()
      .trim()
      //.email(lang("FORM.EMAIL_INVALID"))
      .required(lang("FORM.EMAIL_REQUIRED")),
    // .matches(INPUT_VALIDATOR.emailRegex, lang("FORM.EMAIL_INVALID")),
    alternateEmail: Yup.string()
      .trim()
      .email(lang("FORM.EMAIL_INVALID"))
      .matches(INPUT_VALIDATOR.emailRegex, lang("FORM.EMAIL_INVALID")),
    phone: Yup.string()
      .required(lang("FORM.SIGN_UP_DETAILS_VALIDATION.PHONE"))
      .test(
        "phone",
        lang("FORM.SIGN_UP_DETAILS_VALIDATION.PHONE_VALIDATION"),
        (value) => {
          return validatePhone(parseInt(value ?? "0"), lang);
        }
      )
      .nullable(),
    // alternatePhone: Yup.string()
    //   .required("Krushnal Soni")
    //   .when(
    //     ["countryCode", "altCountryCode"],
    //     (countryCode, altCountryCode) => {
    //       return countryCode !== altCountryCode;
    //     }
    //   ),
    country: Yup.string()
      .trim()
      .required(lang("FORM.SIGN_UP_DETAILS_VALIDATION.COUNTRY")),
    state: Yup.string()
      .trim()
      .required(lang("FORM.SIGN_UP_DETAILS_VALIDATION.STATE")),
    city: Yup.string()
      .trim()
      .required(lang("FORM.SIGN_UP_DETAILS_VALIDATION.CITY")),
    websiteURL: Yup.string().trim().url(lang("FORM.URL_INVALID")),
    shortDescription: Yup.string()
      .trim()
      .required(lang("FORM.SIGN_UP_DETAILS_VALIDATION.SHORT_DESCRIPTION")),
    shortDescriptionCount: Yup.number().max(
      1000,
      lang("USER_DESCRIPTION.FORM.CHAR_1000")
    ),
    // .transform((value) => value.replace(/\s+/g, " ")),
    briefDescription: Yup.string()
      .trim()
      .required(lang("FORM.SIGN_UP_DETAILS_VALIDATION.BRIEF_DESCRIPTION")),
    briefDescriptionCount: Yup.number().max(
      2000,
      lang("USER_DESCRIPTION.FORM.CHAR_2000")
    ),

    // .transform((value) => value.replace(/\s+/g, " ")),
    zipcode: Yup.string()
      .trim()
      .required(lang("FORM.SIGN_UP_DETAILS_VALIDATION.ZIPCODE"))
      .max(10, lang("USER_DESCRIPTION.FORM.CHAR_10")),

    educationDetails: Yup.array().of(
      Yup.object().shape(
        {
          institute: Yup.string()
            .trim()
            .when(["education"], {
              is: (education) => {
                return education && education.length > 0;
              },
              then: Yup.string().trim().required(lang("FORM.REQUIRED")),
            }),
          education: Yup.string()
            .trim()
            .when(["institute"], {
              is: (institute) => {
                return institute && institute.length > 0;
              },
              then: Yup.string().trim().required(lang("FORM.REQUIRED")),
            }),

          activities: Yup.string()
            .trim()
            .max(2000, lang("USER_DESCRIPTION.FORM.CHAR_2000")),
          description: Yup.string()
            .trim()
            .max(2000, lang("USER_DESCRIPTION.FORM.CHAR_2000")),
        },
        [
          ["institute", "education"],
          ["education", "startDate"],
          ["education", "endDate"],
          ["institute", "startDate"],
          ["institute", "endDate"],
          ["startDate", "endDate"],
        ]
      )
    ),
  });

/******************* 
@purpose : Registration Step Two Validation Schema
@Author : INIC
 ******************/
export const REGISTRATION_STEP_TWO_SCHEMA = (lang) =>
  Yup.object().shape({
    languageSkills: Yup.array().of(
      Yup.object().shape(
        {
          name: Yup.string()
            .trim()
            .when("level", {
              is: (level) => level && level.length > 0,
              then: Yup.string().trim().required(lang("FORM.REQUIRED")),
            }),
          level: Yup.string()
            .trim()
            .when("name", {
              is: (name) => name && name.length > 0,
              then: Yup.string().trim().required(lang("FORM.REQUIRED")),
            }),
        },
        ["name", "level"]
      )
    ),
  });

/******************* 
@purpose : Registration Step Three Validation Schema
@Author : INIC
 ******************/
export const REGISTRATION_STEP_THREE_SCHEMA = (lang) =>
  Yup.object().shape({
    experience: Yup.array().of(
      Yup.object().shape(
        {
          role: Yup.string()
            .trim()
            .when(["location", "startDate", "endDate", "description"], {
              is: (location, startDate, endDate, description) => {
                return (
                  (location && location.length > 0) ||
                  (startDate && startDate.length > 0) ||
                  (endDate && endDate.length > 0) ||
                  (description && description.length > 0)
                );
              },
              then: Yup.string().trim().required(lang("FORM.REQUIRED")),
            }),
          location: Yup.string()
            .trim()
            .when(["role", "startDate", "endDate", "description"], {
              is: (role, startDate, endDate, description) => {
                return (
                  (role && role.length > 0) ||
                  (startDate && startDate.length > 0) ||
                  (endDate && endDate.length > 0) ||
                  (description && description.length > 0)
                );
              },
              then: Yup.string().trim().required(lang("FORM.REQUIRED")),
            }),
          startDate: Yup.string()
            .trim()
            .when(["role", "location", "endDate", "description"], {
              is: (role, location, endDate, description) => {
                return (
                  (role && role.length > 0) ||
                  (location && location.length > 0) ||
                  (endDate && endDate.length > 0) ||
                  (description && description.length > 0)
                );
              },
              then: Yup.string().trim().required(lang("FORM.REQUIRED")),
            }),

          description: Yup.string()
            .trim()
            .max(2000, lang("USER_DESCRIPTION.FORM.CHAR_2000"))
            .when(["role", "location", "startDate", "endDate"], {
              is: (role, location, startDate, endDate) => {
                return (
                  (role && role.length > 0) ||
                  (location && location.length > 0) ||
                  (startDate && startDate.length > 0) ||
                  (endDate && endDate.length > 0)
                );
              },
              then: Yup.string().trim().required(lang("FORM.REQUIRED")),
            }),
        },
        [
          ["role", "location"],
          ["role", "startDate"],
          ["role", "endDate"],
          ["role", "description"],
          ["location", "startDate"],
          ["location", "endDate"],
          ["location", "description"],
          ["startDate", "endDate"],
          ["startDate", "description"],
          ["endDate", "description"],
        ]
      )
    ),
    certificate: Yup.array().of(
      Yup.object().shape(
        {
          title: Yup.string()
            .trim()
            .when(["uploadURL", "description"], {
              is: (uploadURL, description) => {
                return (
                  (uploadURL && uploadURL.length > 0) ||
                  (description && description.length > 0)
                );
              },
              then: Yup.string().trim().required(lang("FORM.REQUIRED")),
            }),
          uploadURL: Yup.string()
            .trim()
            .when(["title", "description"], {
              is: (title, description) => {
                return (
                  (title && title.length > 0) ||
                  (description && description.length > 0)
                );
              },
              then: Yup.string().trim().required(lang("FORM.REQUIRED")),
            }),
          url: Yup.string().trim().url(lang("FORM.URL_INVALID")),
          description: Yup.string()
            .trim()
            .max(2000, lang("USER_DESCRIPTION.FORM.CHAR_2000"))
            .when(["title", "uploadURL"], {
              is: (title, uploadURL) => {
                return (
                  (title && title.length > 0) ||
                  (uploadURL && uploadURL.length > 0)
                );
              },
              then: Yup.string().trim().required(lang("FORM.REQUIRED")),
            }),
        },
        [
          ["title", "uploadURL"],
          ["uploadURL", "url"],
          ["uploadURL", "description"],
          ["title", "url"],
          ["title", "description"],
          ["url", "description"],
        ]
      )
    ),
  });

/******************* 
@purpose : Forgot Password Validation Schema
@Author : INIC
******************/
export const FORGOT_PASSWORD_SCHEMA = (lang) =>
  Yup.object().shape({
    auth: Yup.string()
      .trim()
      .required(lang("FORM.EMAIL_MOBILE_REQUIRED"))
      .test("auth", lang("FORM.EMAIL_MOBILE_INVALID"), (value) => {
        return (
          validateEmail(value, lang) ||
          validatePhone(parseInt(value ?? "0"), lang)
        );
      }),
  });

/******************* 
@purpose : Verify OTP Validation Schema
@Author : INIC
******************/
export const VERIFY_OTP_SCHEMA = (lang) =>
  Yup.object().shape({
    otp: Yup.string()
      .required(lang("FORM.OTP_REQUIRED"))
      .matches(INPUT_VALIDATOR.otpRegex, lang("FORM.OTP_INVALID")),
  });

/******************* 
@purpose : Set New-password Validation Schema
@Author : INIC
******************/
export const SET_NEW_PASSWORD_SCHEMA = (lang) =>
  Yup.object().shape({
    password: Yup.string()
      .required(lang("FORM.PASSWORD_REQUIRED"))
      .matches(INPUT_VALIDATOR.passwordRegex, lang("FORM.PASSWORD_VALIDATION")),
    confirmPassword: Yup.string().test(
      "passwords-match",
      lang("FORM.PASSWORD_NOT_MATCH"),
      function (value) {
        return this.parent.password === value;
      }
    ),
  });

/********************************************************
 * Add or Edit Experience Detail Validation Schema
 * @author INIC
 * @param {Function} lang language translations function
 ********************************************************/
export const EDIT_EXPERIENCE_SCHEMA = (lang) =>
  Yup.object().shape({
    experience: Yup.array()
      .of(
        Yup.object().shape({
          role: Yup.string()
            .trim()
            .required(lang("EXPERIENCE.FORM.ROLE_REQUIRED")),
          organisationName: Yup.string().required(
            lang("EXPERIENCE.FORM.COMPANY_NAME_REQUIRED")
          ),
          employmentType: Yup.string().required(lang("FORM.REQUIRED")),
          startDate: Yup.string().required(lang("COMMON.START_DATE_REQUIRED")),
          endDate: Yup.string().when("currentlyWorking", {
            is: true,
            then: Yup.string().trim().optional(),
            otherwise: Yup.string()
              .trim()
              .required(lang("COMMON.END_DATE_REQUIRED")),
          }),
          description: Yup.string()
            .trim()
            .max(2000, lang("USER_DESCRIPTION.FORM.CHAR_2000")),
          url: Yup.string().trim().url(lang("FORM.URL_INVALID")),
        })
      )
      .required(),
  });

/********************************************************
 * Add or Edit User Description Validation Schema
 * @author INIC
 * @param {Function} lang language translations function
 ********************************************************/
export const EDIT_USER_DESCRIPTION_SCHEMA = (lang) =>
  Yup.object().shape({
    briefDescription: Yup.string()
      .trim()
      .required(lang("USER_DESCRIPTION.FORM.DESCRIPTION_REQUIRED")),
    briefDescriptionCount: Yup.number().max(
      2000,
      lang("USER_DESCRIPTION.FORM.CHAR_2000")
    ),
  });

/********************************************************
 * Add or Edit User Description Validation Schema
 * @author INIC
 * @param {Function} lang language translations function
 ********************************************************/
export const EDIT_USER_SHORT_DESCRIPTION_SCHEMA = (lang) =>
  Yup.object().shape({
    shortDescription: Yup.string()
      .trim()
      .required(lang("FORM.SIGN_UP_DETAILS_VALIDATION.SHORT_DESCRIPTION")),
    shortDescriptionCount: Yup.number().max(
      2000,
      lang("USER_DESCRIPTION.FORM.CHAR_2000")
    ),
  });

/********************************************************
 * Add or Edit Certificate Detail Validation Schema
 * @author INIC
 * @param {Function} lang language translations function
 ********************************************************/
export const EDIT_CERTIFICATE_SCHEMA = (lang) =>
  Yup.object().shape({
    certificate: Yup.array()
      .of(
        Yup.object().shape({
          title: Yup.string()
            .trim()
            .max(250, lang("CERTIFICATE.FORM.CHAR_250"))
            .required(lang("CERTIFICATE.FORM.TITLE_REQUIRED")),
          issuingOrganization: Yup.string()
            .trim()
            .max(250, lang("CERTIFICATE.FORM.CHAR_250"))
            .required(lang("CERTIFICATE.FORM.ISSUING_ORGANIZATION_REQUIRED")),
          issuedDate: Yup.string()
            .trim()
            .required(lang("Issued date is required")),
          // skills: Yup.array(),
          expirationDate: Yup.string()
            .trim()
            .max(2000, lang("USER_DESCRIPTION.FORM.CHAR_2000")),
          credentialUrl: Yup.string().trim().url(lang("FORM.URL_INVALID")),
          organisationType: Yup.string()
            .trim()
            .max(250, lang("CERTIFICATE.FORM.CHAR_250")),
          description: Yup.string()
            .trim()
            .max(2000, lang("FORM.MAX_LENGTH_2000")),
        })
      )

      .required(),
  });

/********************************************************
 * Add or Edit Language Detail Validation Schema
 * @author INIC
 * @param {Function} lang language translations function
 ********************************************************/
export const EDIT_LANGUAGE_SCHEMA = (lang) =>
  Yup.object().shape({
    name: Yup.string().trim().required(lang("LANGUAGE.FORM.LANGUAGE_REQUIRED")),
    proficiency: Yup.string()
      .trim()
      .required(lang("LANGUAGE.FORM.PROFICIENCY_REQUIRED")),
  });

/********************************************************
 * Add or Edit Education Detail Validation Schema
 * @author INIC
 * @param {Function} lang language translations function
 ********************************************************/
export const EDIT_EDUCATION_SCHEMA = (lang) =>
  Yup.object().shape({
    educationDetails: Yup.array()
      .of(
        Yup.object().shape({
          instituteName: Yup.string()
            .trim()
            .max(150, lang("EDUCATION.FORM.CHAR_150"))
            .required(lang("EDUCATION.FORM.UNIVERSITY_REQUIRED")),
          degree: Yup.string()
            .trim()
            .max(100, lang("EDUCATION.FORM.CHAR_100"))
            .required(lang("EDUCATION.FORM.DEGREE_REQUIRED")),
          grade: Yup.string()
            .trim()
            .max(80, lang("EDUCATION.FORM.CHAR_80"))
            .optional(lang("EDUCATION.FORM.GRADE_REQUIRED")),
          // skills: Yup.array(),
          startDate: Yup.string()
            .trim()
            .required(lang("COMMON.START_DATE_REQUIRED")),
          // endDate: Yup.string()
          //   .trim()
          //   .required(lang("COMMON.END_DATE_REQUIRED")),
          activities: Yup.string()
            .trim()
            .max(2000, lang("USER_DESCRIPTION.FORM.CHAR_2000")),
          description: Yup.string()
            .trim()
            .max(2000, lang("USER_DESCRIPTION.FORM.CHAR_2000")),
          url: Yup.string().trim().url(lang("FORM.URL_INVALID")),
        })
      )

      .required(),
  });

/********************************************************
 * Add or Edit Education Detail Validation Schema
 * @author INIC
 * @param {Function} lang language translations function
 ********************************************************/
export const CHANGE_PASSWORD_SCHEMA = (lang) =>
  Yup.object().shape({
    oldPassword: Yup.string()
      .required("Old password is required")
      .matches(INPUT_VALIDATOR.passwordRegex, lang("FORM.PASSWORD_VALIDATION")),
    password: Yup.string()
      .required(lang("FORM.PASSWORD_REQUIRED"))
      .matches(INPUT_VALIDATOR.passwordRegex, lang("FORM.PASSWORD_VALIDATION")),
    confirmPassword: Yup.string().test(
      "passwords-match",
      lang("FORM.PASSWORD_NOT_MATCH"),
      function (value) {
        return this.parent.password === value;
      }
    ),
  });

/********************************************************
 * Add or Edit Education Detail Validation Schema
 * @author INIC
 * @param {Function} lang language translations function
 ********************************************************/
export const CHANGE_ACCOUNT_ACCESS_EMAIL_SCHEMA = (lang) =>
  Yup.object().shape({
    alternateEmail: Yup.string()
      .trim()
      .email(lang("FORM.EMAIL_INVALID"))
      .required(lang("FORM.EMAIL_REQUIRED"))
      .matches(INPUT_VALIDATOR.emailRegex, lang("FORM.EMAIL_INVALID"))
      .notOneOf([Yup.ref("email")], lang("FORM.INVALID_EMAIL_ID")),
  });

/********************************************************
 * Add or Edit Education Detail Validation Schema
 * @author INIC
 * @param {Function} lang language translations function
 ********************************************************/
export const CHANGE_ACCOUNT_ACCESS_PHONE_SCHEMA = (lang) =>
  Yup.object().shape({
    phone: Yup.string()
      .required("Phone number required")
      .test(
        "phone",
        lang("FORM.SIGN_UP_DETAILS_VALIDATION.PHONE_VALIDATION"),
        (value) => {
          let type = "phone";
          return validatePhone(parseInt(value ?? "0"), lang, type);
        }
      ),
  });
export const CHANGE_ACCOUNT_ACCESS_ALT_PHONE_SCHEMA = (lang) =>
  Yup.object().shape({
    alternatePhone: Yup.string().test(
      "alternatePhone",
      lang("FORM.SIGN_UP_DETAILS_VALIDATION.PHONE_VALIDATION"),
      (value) => {
        let type = "alternatePhone";
        return validatePhone(parseInt(value ?? "0"), lang, type);
      }
    ),
  });

/********************************************************
 * Add or Edit Education Detail Validation Schema
 * @author INIC
 * @param {Function} lang language translations function
 ********************************************************/
export const ADD_CREDIT_SCHEMA = (lang) =>
  Yup.object().shape({
    amount: Yup.number().required(lang("ADD_CREDIT.AMOUNT")).min(1),
    pmId: Yup.string().required(lang("ADD_CREDIT.SELECT_CARD")),
    places: Yup.string()
      .trim()
      .required(lang("FORM.SIGN_UP_DETAILS_VALIDATION.PLACES")),
    accountTypeFiscal: Yup.string().trim().required(lang("FORM.REQUIRED")),
    tin: Yup.string()
      .trim()
      .when("accountTypeFiscal", {
        is: "business",
        then: Yup.string()
          .trim()
          .min(4, lang("CREATE_LEARNING_INSTITUTE_VALIDATION.VAT_NO_MINIMUM"))
          .max(15, lang("CREATE_LEARNING_INSTITUTE_VALIDATION.VAT_NO_MAXIMUM"))
          .required(lang("FORM.SIGN_UP_DETAILS_VALIDATION.VAT_NUMBER")),
        otherwise: Yup.string()
          .trim()
          .min(4, lang("CREATE_LEARNING_INSTITUTE_VALIDATION.VAT_NO_MINIMUM"))
          .max(15, lang("CREATE_LEARNING_INSTITUTE_VALIDATION.VAT_NO_MAXIMUM"))
          .optional(lang("FORM.SIGN_UP_DETAILS_VALIDATION.VAT_NUMBER")),
      }),
    accountTypeFiscal: Yup.string().trim().required(lang("FORM.REQUIRED")),
    tin: Yup.string()
      .trim()
      .when("accountTypeFiscal", {
        is: "business",
        then: Yup.string()
          .trim()
          .min(4, lang("CREATE_LEARNING_INSTITUTE_VALIDATION.VAT_NO_MINIMUM"))
          .max(15, lang("CREATE_LEARNING_INSTITUTE_VALIDATION.VAT_NO_MAXIMUM"))
          .required(lang("FORM.SIGN_UP_DETAILS_VALIDATION.VAT_NUMBER")),
        otherwise: Yup.string()
          .trim()
          .min(4, lang("CREATE_LEARNING_INSTITUTE_VALIDATION.VAT_NO_MINIMUM"))
          .max(15, lang("CREATE_LEARNING_INSTITUTE_VALIDATION.VAT_NO_MAXIMUM"))
          .optional(lang("FORM.SIGN_UP_DETAILS_VALIDATION.VAT_NUMBER")),
      }),
    fiscalNumber: Yup.string()
      .trim()
      .when("accountTypeFiscal", {
        is: "private",
        then: Yup.string()
          .trim()
          .min(10, "Minimum character limit is 10")
          .max(16, "Maximum character limit is 16")
          .required(lang("FORM.SIGN_UP_DETAILS_VALIDATION.FISCAL_NUMBER")),
        otherwise: Yup.string()
          .trim()
          .min(10, "Minimum character limit is 10")
          .max(16, "Maximum character limit is 16")
          .optional(lang("FORM.SIGN_UP_DETAILS_VALIDATION.FISCAL_NUMBER")),
      }),
  });

/********************************************************
 * Add or Edit Education Detail Validation Schema
 * @author INIC
 * @param {Function} lang language translations function
 ********************************************************/
export const REDEEM_CREDIT_SCHEMA = (lang) =>
  Yup.object().shape({
    amount: Yup.number().required(lang("REDEEM.AMOUNT_REQUIRED")).min(50),
    country: Yup.string().trim().required(lang("REDEEM.COUNTRY_NAME")),
    routing_number: Yup.number().required(lang("REDEEM.ROUTING_NUMBER")),
    account_number: Yup.number().required(lang("REDEEM.ACCOUNT_NUMBER")),
    account_holder_name: Yup.string()
      .trim()
      .required(lang("REDEEM.HOLDER_NAME")),
  });
/********************************************************
 * Add or Edit Experience Detail Validation Schema
 * @author INIC
 * @param {Function} lang language translations function
 ********************************************************/
export const EDIT_INTRO_SCHEMA = (lang) => {
  const valdiationFields = {
    firstName: Yup.string()
      .trim()
      .max(100, "Maximum character limit is 50")
      .required(lang("FORM.FIRST_NAME_REQUIRED")),
    lastName: Yup.string()
      .trim()
      .max(100, "Maximum character limit is 50")
      .required(lang("FORM.LAST_NAME_REQUIRED")),
    shortDescription: Yup.string()
      .trim()
      .required(lang("FORM.SIGN_UP_DETAILS_VALIDATION.SHORT_DESCRIPTION")),
    shortDescriptionCount: Yup.number().max(
      1000,
      lang("USER_DESCRIPTION.FORM.CHAR_1000")
    ),

    briefDescription: Yup.string()
      .trim()
      .required(lang("FORM.SIGN_UP_DETAILS_VALIDATION.BRIEF_DESCRIPTION")),
    briefDescriptionCount: Yup.number().max(
      2000,
      lang("USER_DESCRIPTION.FORM.CHAR_2000")
    ),

    currentPosition: Yup.string()
      .trim()
      .max(100, "Maximum character limit is 100")
      .optional("Current position name is required"),
    places: Yup.string()
      .trim()
      .required(lang("FORM.SIGN_UP_DETAILS_VALIDATION.PLACES")),
    contactInfo: Yup.string()
      .optional(lang("Contact info is required"))
      .matches(INPUT_VALIDATOR.numberRegx, lang("Please enter valid number"))
      .min(10)
      .max(12),
    accountTypeFiscal: Yup.string().trim().required(lang("FORM.REQUIRED")),
    tin: Yup.string()
      .trim()
      .when("accountTypeFiscal", {
        is: "business",
        then: Yup.string()
          .trim()
          .min(4, lang("CREATE_LEARNING_INSTITUTE_VALIDATION.VAT_NO_MINIMUM"))
          .max(15, lang("CREATE_LEARNING_INSTITUTE_VALIDATION.VAT_NO_MAXIMUM"))
          .required(lang("FORM.SIGN_UP_DETAILS_VALIDATION.VAT_NUMBER")),
        otherwise: Yup.string()
          .trim()
          .min(4, lang("CREATE_LEARNING_INSTITUTE_VALIDATION.VAT_NO_MINIMUM"))
          .max(15, lang("CREATE_LEARNING_INSTITUTE_VALIDATION.VAT_NO_MAXIMUM"))
          .optional(lang("FORM.SIGN_UP_DETAILS_VALIDATION.VAT_NUMBER")),
      }),
    fiscalNumber: Yup.string()
      .trim()
      .when("accountTypeFiscal", {
        is: "private",
        then: Yup.string()
          .trim()
          .min(10, "Minimum character limit is 10")
          .max(16, "Maximum character limit is 16")
          .required(lang("FORM.SIGN_UP_DETAILS_VALIDATION.FISCAL_NUMBER")),
        otherwise: Yup.string()
          .trim()
          .min(10, "Minimum character limit is 10")
          .max(16, "Maximum character limit is 16")
          .optional(lang("FORM.SIGN_UP_DETAILS_VALIDATION.FISCAL_NUMBER")),
      }),
    country: Yup.string()
      .trim()
      .required(lang("FORM.SIGN_UP_DETAILS_VALIDATION.COUNTRY")),
    state: Yup.string()
      .trim()
      .required(lang("FORM.SIGN_UP_DETAILS_VALIDATION.STATE")),
    city: Yup.string()
      .trim()
      .required(lang("FORM.SIGN_UP_DETAILS_VALIDATION.CITY")),
    zipcode: Yup.string()
      .trim()
      .required(lang("FORM.SIGN_UP_DETAILS_VALIDATION.ZIPCODE"))
      .max(10, lang("USER_DESCRIPTION.FORM.CHAR_10")),

    timezone: Yup.string().required(
      lang("FORM.SIGN_UP_DETAILS_VALIDATION.TIMEZONE")
    ),
  };
  return Yup.object().shape(valdiationFields);
};

/********************************************************
 * Create Poll Post Validation Schema
 * @author INIC
 * @param {Function} lang language translations function
 ********************************************************/
export const CREATE_POLL_SCHEMA = (lang) =>
  Yup.object().shape({
    pollAnswers: Yup.array()
      .of(
        Yup.object().shape({
          answer: Yup.string()
            .trim()
            .when("keyIndex", {
              is: (index) => index <= 1, // Validate only first 2 answers
              then: Yup.string()
                .trim()
                .required(lang("POLL.POLL_ANSWER_REQUIRED")),
              otherwise: Yup.string().trim(), // Optional for additional answers
            }),
        })
      )
      .test("no-duplicates", function (answers) {
        const answerValues = answers
          .map((item) => (item.answer ? item.answer.trim() : ""))
          .filter(Boolean);
        const duplicatedAnswers = [];

        answerValues.forEach((value, index) => {
          if (
            answerValues.indexOf(value) !== index &&
            !duplicatedAnswers.includes(value)
          ) {
            duplicatedAnswers.push(value);
            throw new Yup.ValidationError(
              lang("POLL.DUPLICATE_ANSWER"),
              null,
              `pollAnswers[${index}].answer`
            );
          }
        });

        return true;
      })
      .min(2, lang("POLL.MIN_ANSWERS_REQUIRED"))
      .required(),
    pollQuestion: Yup.object().shape({
      question: Yup.string()
        .trim()
        .max(300, lang("FORM.MAX_LENGTH_300"))
        .required(lang("POLL.POLL_QUESTION_REQUIRED")),
      pollExpiryDate: Yup.string().required(
        lang("POLL.POLL_EXPIRY_DATE_REQUIRED")
      ),
    }),
  });

export const CREATE_EVENT_SCHEMA = (lang) =>
  Yup.object().shape({
    eventName: Yup.string().trim().required(lang("EVENT.EVENT_NAME_REQUIRED")),
    eventTimezone: Yup.string().required(lang("EVENT.EVENT_TIMEZONE_REQUIRED")),
    eventStartDate: Yup.string().required(
      lang("EVENT.EVENT_START_DATE_REQUIRED")
    ),
    eventStartTime: Yup.string().required(
      lang("EVENT.EVENT_START_TIME_REQUIRED")
    ),
  });

/******************* 
@purpose : Upload Offline Validation Schema
@Author : INIC
 ******************/
export const UPLOAD_OFFLINE_COURSE = (lang) =>
  Yup.object().shape({
    title: Yup.string()
      .trim()
      .required(lang("FORM.UPLOAD_COURSE_VALIDATION.TITLE")),
    skillArea: Yup.string()
      .trim()
      .required(lang("FORM.UPLOAD_COURSE_VALIDATION.SKILL_AREA")),
    skillType: Yup.string()
      .trim()
      .required(lang("FORM.UPLOAD_COURSE_VALIDATION.SKILL_TYPE")),
    imageURL: Yup.string().required(
      lang("FORM.UPLOAD_COURSE_VALIDATION.IMAGE_URL")
    ),
    professionalField: Yup.array()
      .min(1, "Pick at least 1 option")
      .of(
        Yup.object().shape({
          label: Yup.string().required(
            lang("FORM.BECOME_A_TEACHER_VALIDATION.OPTION_SELECT")
          ),
          value: Yup.string().required(
            lang("FORM.BECOME_A_TEACHER_VALIDATION.OPTION_SELECT")
          ),
        })
      ),
    profession: Yup.array()
      .min(1, "Pick at least 1 option")
      .of(
        Yup.object().shape({
          label: Yup.string().required(
            lang("FORM.BECOME_A_TEACHER_VALIDATION.OPTION_SELECT")
          ),
          value: Yup.string().required(
            lang("FORM.BECOME_A_TEACHER_VALIDATION.OPTION_SELECT")
          ),
        })
      ),
    courseLevel: Yup.string()
      .trim()
      .required(lang("FORM.UPLOAD_COURSE_VALIDATION.COURSE_LEVEL")),
    language: Yup.string()
      .trim()
      .required(lang("FORM.UPLOAD_COURSE_VALIDATION.LANGUAGE")),
    personalWebsiteLink: Yup.string()
      .trim()
      .required(lang("FORM.UPLOAD_COURSE_VALIDATION.PERSONAL_WEBSITE_LINK")),
    enterPrice: Yup.string()
      .trim()
      .required(lang("FORM.UPLOAD_COURSE_VALIDATION.PRICE")),
    durationHour: Yup.array(),
    durationMonth: Yup.array(),
    courseGoal: Yup.string()
      .trim()
      .required(lang("FORM.UPLOAD_COURSE_VALIDATION.COURSE_GOAL")),
    courseContent: Yup.string()
      .trim()
      .required(lang("FORM.UPLOAD_COURSE_VALIDATION.COURSE_CONTENT")),
    requirement: Yup.string()
      .trim()
      .required(lang("FORM.UPLOAD_COURSE_VALIDATION.REQUIREMENT")),
    description: Yup.string()
      .trim()
      .required(lang("FORM.UPLOAD_COURSE_VALIDATION.DESCRIPTION")),
    tags: Yup.array()
      .min(1, lang("COMMON.MIN_ONE_TAG_REQUIRED"))
      .max(3, lang("COMMON.MAX_THREE_TAG_ALLOWED")),
    previewVideo: Yup.string().required(
      lang("FORM.UPLOAD_COURSE_VALIDATION.PREVIEW_VIDEO")
    ),
  });

/******************* 
@purpose : Upload ONLINE Validation Schema
@Author : INIC
 ******************/
export const UPLOAD_ONLINE_COURSE = (lang) =>
  Yup.object().shape({
    title: Yup.string()
      .trim()
      .required(lang("FORM.UPLOAD_COURSE_VALIDATION.TITLE")),
    skillArea: Yup.string()
      .trim()
      .required(lang("FORM.UPLOAD_COURSE_VALIDATION.SKILL_AREA")),
    skillType: Yup.string()
      .trim()
      .required(lang("FORM.UPLOAD_COURSE_VALIDATION.SKILL_TYPE")),
    imageURL: Yup.string().required(
      lang("FORM.UPLOAD_COURSE_VALIDATION.IMAGE_URL")
    ),
    professionalField: Yup.array()
      .min(1, "Pick at least 1 option")
      .of(
        Yup.object().shape({
          label: Yup.string().required(
            lang("FORM.BECOME_A_TEACHER_VALIDATION.OPTION_SELECT")
          ),
          value: Yup.string().required(
            lang("FORM.BECOME_A_TEACHER_VALIDATION.OPTION_SELECT")
          ),
        })
      ),
    profession: Yup.array()
      .min(1, "Pick at least 1 option")
      .of(
        Yup.object().shape({
          label: Yup.string().required(
            lang("FORM.BECOME_A_TEACHER_VALIDATION.OPTION_SELECT")
          ),
          value: Yup.string().required(
            lang("FORM.BECOME_A_TEACHER_VALIDATION.OPTION_SELECT")
          ),
        })
      ),
    courseLevel: Yup.string()
      .trim()
      .required(lang("FORM.UPLOAD_COURSE_VALIDATION.COURSE_LEVEL")),
    language: Yup.string()
      .trim()
      .required(lang("FORM.UPLOAD_COURSE_VALIDATION.LANGUAGE")),
    subtitles: Yup.boolean().required(
      lang("FORM.UPLOAD_COURSE_VALIDATION.SUBTITLES")
    ),
    subtitleLanguage: Yup.string().when(["subtitles"], {
      is: (sck) => {
        return sck;
      },
      then: Yup.string()
        .trim()
        .required(lang("FORM.UPLOAD_COURSE_VALIDATION.SUBTITLES_LANGUAGE")),
      otherwise: Yup.string(),
    }),
    freePrice: Yup.string()
      .trim()
      .required(lang("FORM.UPLOAD_COURSE_VALIDATION.PRICE")),
    litePrice: Yup.string()
      .trim()
      .required(lang("FORM.UPLOAD_COURSE_VALIDATION.PRICE")),
    premiumPrice: Yup.string()
      .trim()
      .required(lang("FORM.UPLOAD_COURSE_VALIDATION.PRICE")),
    courseGoal: Yup.string()
      .trim()
      .required(lang("FORM.UPLOAD_COURSE_VALIDATION.COURSE_GOAL")),
    courseContent: Yup.string()
      .trim()
      .required(lang("FORM.UPLOAD_COURSE_VALIDATION.COURSE_CONTENT")),
    requirement: Yup.string()
      .trim()
      .required(lang("FORM.UPLOAD_COURSE_VALIDATION.REQUIREMENT")),
    description: Yup.string()
      .trim()
      .required(lang("FORM.UPLOAD_COURSE_VALIDATION.DESCRIPTION")),
    tags: Yup.array()
      .min(1, lang("COMMON.MIN_ONE_TAG_REQUIRED"))
      .max(3, lang("COMMON.MAX_THREE_TAG_ALLOWED")),
    previewVideo: Yup.string().required(
      lang("FORM.UPLOAD_COURSE_VALIDATION.PREVIEW_VIDEO")
    ),
    certificateTitle: Yup.string()
      .trim()
      .required(lang("FORM.UPLOAD_COURSE_VALIDATION.CERTIFICATE_TITLE")),
  });

/******************* 
@purpose : Become a Teacher Schema
@Author : INIC
 ******************/
export const BECOME_A_TEACHER = (lang) =>
  Yup.object().shape({
    teacherActivity: Yup.array()
      .min(1, "Pick at least 1 option")
      .of(
        Yup.object().shape({
          label: Yup.string().required(
            lang("FORM.BECOME_A_TEACHER_VALIDATION.OPTION_SELECT")
          ),
          value: Yup.string().required(
            lang("FORM.BECOME_A_TEACHER_VALIDATION.OPTION_SELECT")
          ),
        })
      ),
    teacherTopic: Yup.array()
      .min(1, "Pick at least 1 option")
      .of(
        Yup.object().shape({
          label: Yup.string().required(
            lang("FORM.BECOME_A_TEACHER_VALIDATION.OPTION_SELECT")
          ),
          value: Yup.string().required(
            lang("FORM.BECOME_A_TEACHER_VALIDATION.OPTION_SELECT")
          ),
        })
      ),
    teacherIsAvailble: Yup.string()
      .trim()
      .required(lang("FORM.BECOME_A_TEACHER_VALIDATION.REQUIRED"))
      .max(2000, lang("USER_DESCRIPTION.FORM.CHAR_2000")),
    offerOtherPlatform: Yup.string().trim().required(),
    offerWhichPlatform: Yup.array().when(["offerOtherPlatform"], {
      is: (sck) => {
        return sck === "No" ? false : true;
      },
      then: Yup.array()
        .min(1, "Pick at least 1 option")
        .of(
          Yup.object().shape({
            label: Yup.string().required(
              lang("FORM.BECOME_A_TEACHER_VALIDATION.OPTION_SELECT")
            ),
            value: Yup.string().required(
              lang("FORM.BECOME_A_TEACHER_VALIDATION.OPTION_SELECT")
            ),
          })
        ),
      otherwise: Yup.array(),
    }),
    whyYouAreGood: Yup.string()
      .trim()
      .required(lang("FORM.BECOME_A_TEACHER_VALIDATION.REQUIRED"))
      .max(2000, lang("USER_DESCRIPTION.FORM.CHAR_2000")),
    remarks: Yup.string().max(2000, lang("USER_DESCRIPTION.FORM.CHAR_2000")),
    cv: Yup.string()
      .trim()
      .required(lang("FORM.BECOME_A_TEACHER_VALIDATION.UPLOAD_CV")),
  });

/******************* 
@purpose : Become a Trainer Schema
@Author : INIC
 ******************/
export const BECOME_A_TRAINER = (lang) =>
  Yup.object().shape({
    trainerTopic: Yup.array()
      .min(1, "Pick at least 1 option")
      .of(
        Yup.object().shape({
          label: Yup.string().required(
            lang("FORM.BECOME_A_TEACHER_VALIDATION.OPTION_SELECT")
          ),
          value: Yup.string().required(
            lang("FORM.BECOME_A_TEACHER_VALIDATION.OPTION_SELECT")
          ),
        })
      ),
    offerOtherPlatform: Yup.string().trim().required(),
    offerWhichPlatform: Yup.array().when(["offerOtherPlatform"], {
      is: (sck) => {
        return sck === "No" ? false : true;
      },
      then: Yup.array()
        .min(1, "Pick at least 1 option")
        .of(
          Yup.object().shape({
            label: Yup.string().required(
              lang("FORM.BECOME_A_TEACHER_VALIDATION.OPTION_SELECT")
            ),
            value: Yup.string().required(
              lang("FORM.BECOME_A_TEACHER_VALIDATION.OPTION_SELECT")
            ),
          })
        ),
      otherwise: Yup.array(),
    }),
    whyYouAreGood: Yup.string()
      .trim()
      .required(lang("FORM.BECOME_A_TEACHER_VALIDATION.REQUIRED")),
    whyYouAreGoodCount: Yup.number().max(
      2000,
      lang("USER_DESCRIPTION.FORM.CHAR_2000")
    ),
    remarks: Yup.string(),
    remarksCount: Yup.number().max(
      2000,
      lang("USER_DESCRIPTION.FORM.CHAR_2000")
    ),
    cv: Yup.string()
      .trim()
      .required(lang("FORM.BECOME_A_TEACHER_VALIDATION.UPLOAD_CV")),
    // availableDate: Yup.string()
    //   .trim()
    //   .required(lang("FORM.BECOME_A_TEACHER_VALIDATION.REQUIRED")),
  });

/******************* 
@purpose : Become a Coach Schema
@Author : INIC
 ******************/
export const BECOME_A_COACH = (lang) =>
  Yup.object().shape({
    professionalCoach: Yup.string()
      .trim()
      .required(lang("FORM.BECOME_A_TEACHER_VALIDATION.REQUIRED")),
    offerOtherPlatform: Yup.string().trim().required(),
    offerWhichPlatform: Yup.array().when(["offerOtherPlatform"], {
      is: (sck) => {
        return sck === "No" ? false : true;
      },
      then: Yup.array()
        .min(1, "Pick at least 1 option")
        .of(
          Yup.object().shape({
            label: Yup.string().required(
              lang("FORM.BECOME_A_TEACHER_VALIDATION.OPTION_SELECT")
            ),
            value: Yup.string().required(
              lang("FORM.BECOME_A_TEACHER_VALIDATION.OPTION_SELECT")
            ),
          })
        ),
      otherwise: Yup.array(),
    }),
    whyYouAreGood: Yup.string()
      .trim()
      .required(lang("FORM.BECOME_A_TEACHER_VALIDATION.REQUIRED"))
      .max(2000, lang("USER_DESCRIPTION.FORM.CHAR_2000")),
    coachAreAvailableDiscuss: Yup.string()
      .trim()
      .required(lang("FORM.BECOME_A_TEACHER_VALIDATION.REQUIRED")),
    coachReasonForNo: Yup.string().when(["coachAreAvailableDiscuss"], {
      is: (sck) => {
        return sck === "No" ? true : false;
      },
      then: Yup.string()
        .trim()
        .max(2000, lang("USER_DESCRIPTION.FORM.CHAR_2000"))
        .required(lang("FORM.BECOME_A_TEACHER_VALIDATION.REQUIRED")),
      otherwise: Yup.string(),
    }),
    remarks: Yup.string().max(2000, lang("USER_DESCRIPTION.FORM.CHAR_2000")),

    cv: Yup.string()
      .trim()
      .required(lang("FORM.BECOME_A_TEACHER_VALIDATION.UPLOAD_CV")),
  });

/******************* 
@purpose : Become a Host Schema
@Author : INIC
 ******************/
export const BECOME_A_HOST = (lang) =>
  Yup.object().shape({
    hadHostExperiance: Yup.string()
      .trim()
      .required(lang("FORM.BECOME_A_TEACHER_VALIDATION.REQUIRED")),
    hostManyRoomCanRun: Yup.string().required(
      lang("FORM.BECOME_A_TEACHER_VALIDATION.REQUIRED")
    ),
    offerOtherPlatform: Yup.string().trim().required(),
    offerWhichPlatform: Yup.array().when(["offerOtherPlatform"], {
      is: (sck) => {
        return sck === "No" ? false : true;
      },
      then: Yup.array()
        .min(1, "Pick at least 1 option")
        .of(
          Yup.object().shape({
            label: Yup.string().required(
              lang("FORM.BECOME_A_TEACHER_VALIDATION.OPTION_SELECT")
            ),
            value: Yup.string().required(
              lang("FORM.BECOME_A_TEACHER_VALIDATION.OPTION_SELECT")
            ),
          })
        ),
      otherwise: Yup.array(),
    }),
    whyYouAreGood: Yup.string()
      .trim()
      .required(lang("FORM.BECOME_A_TEACHER_VALIDATION.REQUIRED"))
      .max(2000, lang("USER_DESCRIPTION.FORM.CHAR_2000")),
    hostAreAvailableDiscuss: Yup.string()
      .trim()
      .required(lang("FORM.BECOME_A_TEACHER_VALIDATION.REQUIRED")),
    hostReasonForNo: Yup.string().when(["hostAreAvailableDiscuss"], {
      is: (sck) => {
        return sck === "No" ? true : false;
      },
      then: Yup.string()
        .trim()
        .max(2000, lang("USER_DESCRIPTION.FORM.CHAR_2000"))
        .required(lang("FORM.BECOME_A_TEACHER_VALIDATION.REQUIRED")),
      otherwise: Yup.string(),
    }),
    remarks: Yup.string().max(2000, lang("USER_DESCRIPTION.FORM.CHAR_2000")),
    cv: Yup.string()
      .trim()
      .required(lang("FORM.BECOME_A_TEACHER_VALIDATION.UPLOAD_CV")),
  });
/******************* 
@purpose : Create Learning Institute step one
@Author : INIC
 ******************/
export const CREATE_LEARNING_INSTITUTE_STEP_ONE = (lang) =>
  Yup.object().shape({
    tags: Yup.array()
      .min(1, lang("COMMON.MIN_ONE_TAG_REQUIRED"))
      .max(3, lang("COMMON.MAX_THREE_TAG_ALLOWED"))
      .required(lang("TRAINING_ROOM.TAGS_REQUIRED")),
    name: Yup.string()
      .trim()
      .max(50, "Business/Institute Name must be at most 50 characters")
      .required(lang("CREATE_LEARNING_INSTITUTE_VALIDATION.REQUIRED")),
    // sector: Yup.string().required(
    //   lang("CREATE_LEARNING_INSTITUTE_VALIDATION.OPTION_SELECT")
    // ),
    roleInInstitute: Yup.string().required(
      lang("CREATE_LEARNING_INSTITUTE_VALIDATION.OPTION_SELECT")
    ),
    orgType: Yup.string().required(
      lang("CREATE_LEARNING_INSTITUTE_VALIDATION.OPTION_SELECT")
    ),

    instituteURL: Yup.string()
      .trim()
      .url(lang("FORM.URL_INVALID"))
      .required(lang("FORM.ADD_MORE_GM_VALIDATION.LINK")),
    twitter: Yup.string().trim().url(lang("FORM.URL_INVALID")),
    facebook: Yup.string().trim().url(lang("FORM.URL_INVALID")),
    instagram: Yup.string().trim().url(lang("FORM.URL_INVALID")),
    pinterest: Yup.string().trim().url(lang("FORM.URL_INVALID")),
    linkedin: Yup.string().trim().url(lang("FORM.URL_INVALID")),
    tiktok: Yup.string().trim().url(lang("FORM.URL_INVALID")),
    youtube: Yup.string().trim().url(lang("FORM.URL_INVALID")),
    accountTypeFiscal: Yup.string().required(
      lang("CREATE_LEARNING_INSTITUTE_VALIDATION.REQUIRED")
    ),
    fiscalNumber: Yup.string()
      .trim()
      .min(10, lang("CREATE_LEARNING_INSTITUTE_VALIDATION.MIN_10"))
      .max(16, lang("CREATE_LEARNING_INSTITUTE_VALIDATION.MAX_16")),
    tin: Yup.string()
      .trim()
      .min(4, lang("CREATE_LEARNING_INSTITUTE_VALIDATION.VAT_NO_MINIMUM"))
      .max(15, lang("CREATE_LEARNING_INSTITUTE_VALIDATION.VAT_NO_MAXIMUM"))
      .required(lang("FORM.SIGN_UP_DETAILS_VALIDATION.VAT_NUMBER")),
    // cu: Yup.string()
    //   .trim()
    //   .max(20, "SDI Name must be at most 20 characters")
    //   .required(lang("CREATE_LEARNING_INSTITUTE_VALIDATION.REQUIRED")),
    // pec: Yup.string()
    //   .trim()
    //   .email(lang("FORM.EMAIL_INVALID"))
    //   .required("PEC  is required"),
    instituteEmail: Yup.string()
      .trim()
      .email(lang("FORM.EMAIL_INVALID"))
      .required(lang("FORM.EMAIL_REQUIRED"))
      .matches(INPUT_VALIDATOR.emailRegex, lang("FORM.EMAIL_INVALID")),

    instituteContact: Yup.string()
      .required(lang("FORM.SIGN_UP_DETAILS_VALIDATION.PHONE"))
      .test(
        "instituteContact",
        lang("FORM.SIGN_UP_DETAILS_VALIDATION.PHONE_VALIDATION"),
        (value) => {
          return validatePhone(parseInt(value ?? "0"), lang);
        }
      )
      .nullable(),
    headquarter: Yup.string().trim().required(lang("FORM.REQUIRED")),
    countryShortName: Yup.string().trim().required(lang("FORM.REQUIRED")),
    country: Yup.string().trim().required(lang("FORM.REQUIRED")),
  });

export const PROFILE_CONTACT_INFO = (lang) =>
  Yup.object().shape({
    websiteURL: Yup.array()
      .of(
        Yup.object().shape({
          url: Yup.string()
            .trim()
            .url(lang("FORM.URL_INVALID"))
            .required(lang("FORM.REQUIRED")),

          // type: Yup.string().when("url", {
          //   is: (url) => url,
          //   then: Yup.string().required("Field is required"),
          //   otherwise: Yup.string(),
          // }),
        })
      )
      .required(),
    phone: Yup.string()
      .required(lang("FORM.SIGN_UP_DETAILS_VALIDATION.PHONE"))
      .test(
        "phone",
        lang("FORM.SIGN_UP_DETAILS_VALIDATION.PHONE_VALIDATION"),
        (value) => {
          return validatePhone(parseInt(value ?? "0"), lang);
        }
      )
      .nullable(),
    socialMediaUrl: Yup.array()
      .of(
        Yup.object().shape({
          url: Yup.string()
            .trim()
            .url(lang("FORM.URL_INVALID"))
            .required(lang("FORM.REQUIRED")),

          // type: Yup.string().when("url", {
          //   is: (url) => url,
          //   then: Yup.string().required("Field is required"),
          //   otherwise: Yup.string(),
          // }),
        })
      )
      .required(),
  });
/******************* 
@purpose : Create Learning Institute step two
@Author : INIC
******************/
export const CREATE_LEARNING_INSTITUTE_STEP_TWO = (lang) =>
  Yup.object().shape({
    overview: Yup.string()
      .trim()
      .required(lang("CREATE_LEARNING_INSTITUTE_VALIDATION.REQUIRED")),
    overviewCount: Yup.number().max(
      2000,
      lang("USER_DESCRIPTION.FORM.CHAR_2000")
    ),
    slogan: Yup.string()
      .trim()
      .required(lang("CREATE_LEARNING_INSTITUTE_VALIDATION.REQUIRED"))
      .max(220, lang("CREATE_LEARNING_INSTITUTE_VALIDATION.SLOGAN_220")),

    description: Yup.string()
      .trim()
      .required(lang("CREATE_LEARNING_INSTITUTE_VALIDATION.REQUIRED")),
    descriptionCount: Yup.number().max(
      4000,
      lang("USER_DESCRIPTION.FORM.CHAR_4000")
    ),
  });

/******************* 
@purpose : Upload PDF in Courses
@Author : INIC
******************/

export const UPLOAD_PDF_COURSES = (lang) =>
  Yup.object().shape({
    pdf: Yup.string().trim().required("Please upload your PDF"),
  });

/******************* 
@purpose : Apply for job validation
@Author : INIC
******************/
export const APPLY_FOR_JOB = (lang) =>
  Yup.object().shape({
    resume: Yup.string().trim().required("Please upload your PDF"),
    reason: Yup.string()
      .trim()
      .required(lang("FORM.REQUIRED"))
      .min(300, lang("JOBS.JOB_OFFERS.MIN_300"))
      .max(3000, lang("JOBS.JOB_OFFERS.MAX_3000")),
  });

/******************* 
@purpose : Create Learning Institute step two
@Author : INIC
******************/
export const ADD_RATING_FORM = (lang) =>
  Yup.object().shape({
    review: Yup.string()
      .trim()
      .required(lang("CREATE_LEARNING_INSTITUTE_VALIDATION.REQUIRED")),
  });

/******************* 
@purpose : Preference Tags
@Author : INIC
 ******************/
export const PREFERENCE_TAGS = (lang) =>
  Yup.object().shape({
    tags: Yup.array()
      .min(1, lang("COMMON.MIN_ONE_TAG_REQUIRED"))
      .required(lang("TRAINING_ROOM.TAGS_REQUIRED")),
  });

/******************* 
@purpose : Preference Tags With Limit
@Author : INIC
 ******************/
export const PREFERENCE_TAGS_WITH_LIMIT = (lang, limit) =>
  Yup.object().shape({
    tags: Yup.array()
      .min(1, lang("COMMON.MIN_ONE_TAG_REQUIRED"))
      .max(
        limit,
        `${lang("COMMON.MAXIMUM")} ${limit} ${lang("COMMON.TAG_ALLOWED")}`
      )
      .required(lang("TRAINING_ROOM.TAGS_REQUIRED")),
  });

/******************* 
@purpose : Create Learning Institute step two
@Author : INIC
******************/
export const ADD_SKILL_FORM = (lang) =>
  Yup.object().shape({
    skillArea: Yup.string().trim().required(lang("FORM.REQUIRED")),
    skillType: Yup.string().trim().required(lang("FORM.REQUIRED")),
  });

/******************* 
@purpose : Job filter validation
@Author : INIC
******************/
export const JOB_FILTERS = (lang) =>
  Yup.object().shape({
    searchText: Yup.string(),
    employementType: Yup.string(),
    jobType: Yup.string(),
    contractType: Yup.string(),
    address: Yup.string(),
  });

/******************* 
@purpose : Create New Channel Schema
@Author : INIC
******************/
export const CREATE_NEW_CHANNEL = (lang) =>
  Yup.object().shape({
    display_name: Yup.string().trim().required(lang("FORM.REQUIRED")),
    purpose: Yup.string().trim().required(lang("FORM.REQUIRED")),
  });

/******************* 
@purpose : Create New YliMeet Channel Schema
@Author : INIC
******************/
export const CREATE_NEW_YLIMEET_CHANNEL = (lang) =>
  Yup.object().shape({
    display_name: Yup.string().trim().required(lang("FORM.REQUIRED")),
  });

/******************* 
@purpose : Create Company step one
@Author : YLIWAY
 ******************/
export const CREATE_COMPANY_STEP_ONE = (lang) =>
  Yup.object().shape({
    tags: Yup.array()
      .min(1, lang("COMMON.MIN_ONE_TAG_REQUIRED"))
      .max(3, lang("COMMON.MAX_THREE_TAG_ALLOWED"))
      .required(lang("TRAINING_ROOM.TAGS_REQUIRED")),
    companyStrength: Yup.string().required(
      lang("CREATE_LEARNING_INSTITUTE_VALIDATION.OPTION_SELECT")
    ),
    companyName: Yup.string()
      .trim()
      .required(lang("CREATE_LEARNING_INSTITUTE_VALIDATION.REQUIRED")),
    industry: Yup.string().required(
      lang("CREATE_LEARNING_INSTITUTE_VALIDATION.OPTION_SELECT")
    ),
    roleInCompany: Yup.string().required(
      lang("CREATE_LEARNING_INSTITUTE_VALIDATION.OPTION_SELECT")
    ),
    // companyURL: Yup.string()
    //   .trim()
    //   .url(lang("FORM.URL_INVALID"))
    //   .required(lang("FORM.ADD_MORE_GM_VALIDATION.LINK")),
    accountTypeFiscal: Yup.string().required(
      lang("CREATE_LEARNING_INSTITUTE_VALIDATION.REQUIRED")
    ),
    fiscalNumber: Yup.string()
      .trim()
      .min(10, lang("CREATE_LEARNING_INSTITUTE_VALIDATION.MIN_10"))
      .max(16, lang("CREATE_LEARNING_INSTITUTE_VALIDATION.MAX_16"))
      .optional(lang("CREATE_LEARNING_INSTITUTE_VALIDATION.FISCAL_REQUIRED")),
    tin: Yup.string()
      .trim()
      .min(4, lang("CREATE_LEARNING_INSTITUTE_VALIDATION.VAT_NO_MINIMUM"))
      .max(15, lang("CREATE_LEARNING_INSTITUTE_VALIDATION.VAT_NO_MAXIMUM"))
      .required(lang("FORM.SIGN_UP_DETAILS_VALIDATION.VAT_NUMBER")),
    // cu: Yup.string()
    //   .trim()
    //   .required(lang("CREATE_LEARNING_INSTITUTE_VALIDATION.REQUIRED")),
    // pec: Yup.string()
    //   .email(lang("FORM.EMAIL_INVALID"))
    //   .required("PEC  is required"),
    headquarter: Yup.string().trim().required(lang("FORM.REQUIRED")),
    companyEmail: Yup.string()
      .trim()
      .email(lang("FORM.EMAIL_INVALID"))
      .required(lang("FORM.EMAIL_REQUIRED"))
      .matches(INPUT_VALIDATOR.emailRegex, lang("FORM.EMAIL_INVALID")),
    companyContact: Yup.string()
      .required(lang("FORM.SIGN_UP_DETAILS_VALIDATION.PHONE"))
      .test(
        "companyContact",
        lang("FORM.SIGN_UP_DETAILS_VALIDATION.PHONE_VALIDATION"),
        (value) => {
          return validatePhone(parseInt(value ?? "0"), lang);
        }
      )
      .nullable(),
    countryShortName: Yup.string().trim().required(lang("FORM.REQUIRED")),
    country: Yup.string().trim().required(lang("FORM.REQUIRED")),
  });

/******************* 
@purpose : Create Company step two
@Author : YLIWAY
******************/
export const CREATE_COMPANY_STEP_TWO = (lang) =>
  Yup.object().shape({
    overview: Yup.string()
      .trim()
      .required(lang("CREATE_LEARNING_INSTITUTE_VALIDATION.REQUIRED")),
    overviewCount: Yup.number().max(
      2000,
      lang("USER_DESCRIPTION.FORM.CHAR_2000")
    ),
    slogan: Yup.string()
      .trim()
      .required(lang("CREATE_LEARNING_INSTITUTE_VALIDATION.REQUIRED"))
      .max(220, lang("CREATE_LEARNING_INSTITUTE_VALIDATION.SLOGAN_220")),

    description: Yup.string()
      .trim()
      .required(lang("CREATE_LEARNING_INSTITUTE_VALIDATION.REQUIRED")),
    descriptionCount: Yup.number().max(
      4000,
      lang("USER_DESCRIPTION.FORM.CHAR_4000")
    ),
  });

export const ARTICLE_VALIDATION = (lang) =>
  Yup.object().shape({
    title: Yup.string()
      .trim()
      .max(220, lang("ATRICLE.MAX_CHAR_220"))
      .required(lang("ATRICLE.TITLE_IS_REQUIRED")),
    subTitle: Yup.string()
      .trim()
      .max(220, lang("ATRICLE.MAX_CHAR_220"))
      .when("type", {
        is: "publish",
        then: Yup.string().required(lang("ATRICLE.SUBTITLE_IS_REQUIRED")),
        otherwise: Yup.string().optional(),
      }),
    selectedFile: Yup.string()
      .trim()
      .when("type", {
        is: "publish",
        then: Yup.string().required(lang("ATRICLE.IMAGE_IS_REQUIRED")),
        otherwise: Yup.string().optional(),
      }),
    description: Yup.string()
      .trim()
      .when("type", {
        is: "publish",
        then: Yup.string().required(lang("ATRICLE.DESCRIPTION_IS_REQUIRED")),
        otherwise: Yup.string().optional(),
      }),
    tags: Yup.array()
      .when("type", {
        is: "publish",
        then: Yup.array()
          .min(1, lang("COMMON.MIN_ONE_TAG_REQUIRED"))
          .required(lang("TRAINING_ROOM.TAGS_REQUIRED"))
          .nullable(),
        otherwise: Yup.array().nullable().min(0).optional(),
      })
      .max(3, lang("COMMON.MAX_THREE_TAG_ALLOWED")),
  });
/********************************************************
 * Add or Edit Experience Detail Validation Schema
 * @author INIC
 * @param {Function} lang language translations function
 ********************************************************/
export const REQUEST_FOR_RECOMMENDATION = (lang) =>
  Yup.object().shape({
    userSkillIds: Yup.array().min(1, lang("FORM.REQUIRED")),
    connectionUserIds: Yup.array().min(1, lang("FORM.REQUIRED")),
  });
/******************* 
@purpose : Growth connection filter schema
@Author : YLIWAY
******************/
export const GROWTH_CONNECTIONS_FILTER_SCHEMA = (lang) =>
  Yup.object().shape({
    name: Yup.string(),
    profession: Yup.array().max(5, lang("COMMON.MAX_5_PROFESSION_ALLOWED")),
    connectionGoals: Yup.array(),
    country: Yup.string(),
    region: Yup.string(),
    province: Yup.string(),
    city: Yup.string(),
  });

/******************* 
@purpose : Growth conneciton Activity schema
@Author : YLIWAY
******************/
export const GROWTH_CONNECTIONS_ACTIVITY_SCHEMA = (lang) =>
  Yup.object().shape({
    activity: Yup.string()
      .trim()
      .max(100, lang("FORM.MAX_LENGTH_100"))
      .required(lang("FORM.REQUIRED")),
    date: Yup.string().trim().required(lang("FORM.REQUIRED")),
    activityGoal: Yup.string()
      .trim()
      .max(100, lang("FORM.MAX_LENGTH_100"))
      .required(lang("FORM.REQUIRED")),
    note: Yup.string().trim().max(3000, lang("FORM.MAX_LENGTH_3000")),
  });
