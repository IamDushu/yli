import React, { Fragment } from "react";
import { FormCheck, FormText } from "react-bootstrap";
const CheckBox = ({ title, name, className, feedbackClassName, formik, ...others }) => {
  return (
    <Fragment>
      <FormCheck
        className={className}
        label={title}
        type="checkbox"
        id={name}
        defaultChecked={formik?.values[name]}
        {...formik?.getFieldProps(name)}
        {...others}
      />
      <span className="checkmark"></span>
      {formik?.touched[name] && formik?.errors[name] && (
        <FormText className={(feedbackClassName, "error")}>
          {formik?.errors[name]}
        </FormText>
      )}
    </Fragment>
  );
};
export default CheckBox;
