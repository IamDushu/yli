import PhoneInput2 from "react-phone-input-2";
import { FormLabel, FormText } from "react-bootstrap";
import { Fragment } from "react";
import "react-phone-input-2/lib/style.css";
const PhoneInput = ({
  label,
  value,
  required = true,
  name,
  formik,
  touched,
  errors,
  countryCode,
  type,
  ...rest
}) => {
  if (formik) {
    touched = formik.touched[name];
    errors = formik.errors[name];
  }

  /******************* 
    @purpose : Rander HTML/ React Components
    @Author :INIC
    ******************/
  return (
    <Fragment>
      {label && (
        <FormLabel>
          {label} {required && <sup className=" text-danger">*</sup>}
        </FormLabel>
      )}
      <div className={touched && errors ? "error-block position-relative" : ""}>
        <PhoneInput2
          className="react-phone-input"
          name={name}
          country={"it"}
          masks={""}
          countryCodeEditable={false}
          onChange={(phoneNumber, country) => {
            if (type === "signUp") {
              formik.setFieldValue(
                name,
                phoneNumber.replace(country.dialCode, "")
              );
              formik.setFieldValue(countryCode, `+${country.dialCode}`);
            } else if (type === "accountSettings") {
              formik.setFieldValue(name, `+${phoneNumber}`);
            }
          }}
          value={value !== "" && value !== null && value !== undefined && value}
          {...rest}
        />
      </div>
      {required && formik?.touched[name] && formik?.errors[name] && (
        <FormText className="text-danger">{formik?.errors[name]}</FormText>
      )}
    </Fragment>
  );
};

export default PhoneInput;
