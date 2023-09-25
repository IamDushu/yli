import React, { Fragment } from 'react';
import { FormLabel, FormText } from 'react-bootstrap';

/********************************************************
 * Build Formik Supported Form Field
 * @author INIC
 * @returns {React.FC}
 ********************************************************/
const WithFormikField = (Component) => (props) => {
  const { label, required = true, name, labelClassName, formik, feedbackClassName } = props;
  const getValidateClass = () => {
    if (!formik?.touched[name]) return 'w-100';
    else if (formik?.touched[name] && formik?.errors[name]) return 'w-100 error-block';
    else return ' w-100 success-block';
  };

  return (
    <Fragment>
      {label && (
        <FormLabel className={labelClassName}>
          {label} {required && '*'}
        </FormLabel>
      )}
      <div className={getValidateClass()}>
        <Component {...props} {...formik?.getFieldProps(name)} />
        {formik?.touched[name] && formik?.errors[name] && <span className="icon-error-icon error-icon"></span>}
        {formik?.touched[name] && !formik?.errors[name] && <span className="icon-ic-check-mark error-icon"></span>}
      </div>
      {formik?.touched[name] && formik?.errors[name] && <FormText className={(feedbackClassName, 'error')}>{formik?.errors[name]}</FormText>}
    </Fragment>
  );
};

export default WithFormikField;
