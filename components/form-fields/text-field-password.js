import React, { Fragment, useState } from "react";
import { FormControl, FormLabel, FormText, InputGroup } from "react-bootstrap";
const TextField = ({
  label,
  required = true,
  name,
  labelClassName,
  formik,
  feedbackClassName,
  ...others
}) => {
  const [show, setShow] = useState(false);
  const getValidateClass = () => {
    if (!formik?.touched[name]) {
      return "w-100";
    } else if (formik?.touched[name] && formik?.errors[name]) {
      return "w-100 error-block";
    }
    return " w-100 success-block";
  };
  return (
    <Fragment>
      {label && (
        <FormLabel className={labelClassName}>
          {label} {required && <sup className="text-danger">*</sup>}
        </FormLabel>
      )}
      <div className={getValidateClass()}>
        <InputGroup>
          <FormControl
            type={show ? "text" : "password"}
            {...formik?.getFieldProps(name)}
            {...others}
          />
          <InputGroup.Append>
            <InputGroup.Text
            className="px-3 py-0"
              onClick={() => {
                setShow(!show);
              }}
            >
              <em
                className={`icon ${
                  show ? "icon-blue-eyes font-12 text-secondary" : "icon-eye-close"
                } pointer`}
              ></em>
            </InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>

        {formik?.touched[name] && formik?.errors[name] && (
          <span className="icon-error-icon error-icon"></span>
        )}
        {formik?.touched[name] && !formik?.errors[name] && (
          <span className="icon-ic-check-mark error-icon"></span>
        )}
      </div>
      {formik?.touched[name] && formik?.errors[name] && (
        <FormText className={(feedbackClassName, "error")}>
          {formik?.errors[name]}
        </FormText>
      )}
    </Fragment>
  );
};

export default TextField;
