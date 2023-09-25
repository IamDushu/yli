import React from "react";
import { FormCheck } from "react-bootstrap";
const Radio = ({ value, title, disabled = false, name, className, formik, ...others }) => {
  return (
    <FormCheck
      className={className}
      label={title}
      name={name}
      type="radio"
      id={title}
      disabled={disabled}
      value={value}
      checked={value === formik?.values[name]}
      onChange={(e) => formik?.setFieldValue(name, e.target.value)}
      {...others}
    />
  );
};

export default Radio;
