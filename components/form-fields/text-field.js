import React, { Fragment } from "react";
import { FormControl, FormLabel, FormText } from "react-bootstrap";
import ReactTextareaAutosize from "react-textarea-autosize";
const TextField = ({
  label,
  required = true,
  name,
  labelClassName,
  formik,
  feedbackClassName,
  count,
  resizeable = false,
  maxRow = 3,
  ...others
}) => {
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
        {resizeable ? (
          <ReactTextareaAutosize
            maxRows={maxRow}
            {...formik?.getFieldProps(name)}
            {...others}
            className="form-control"
          />
        ) : (
          <FormControl {...formik?.getFieldProps(name)} {...others} />
        )}
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
      {count && (
        <p className="text-right d-flex align-items-center">
          <span
            className={
              formik?.values[name]?.length < count
                ? "text-muted ml-auto font-14"
                : formik?.values[name]?.length > count
                  ? "text-danger ml-auto font-14"
                  : "text-muted ml-auto font-14"
            }
          >
            {formik?.values[name]?.length}/
          </span>
          <span className="text-success">{count}</span>
        </p>
      )}
    </Fragment>
  );
};

export default TextField;
