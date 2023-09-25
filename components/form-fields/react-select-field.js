import React from "react";
import Select from "react-select";
import WithFormikField from "../with-formik-field/with-formik-field";

/********************************************************
 * Render Select Form field
 * @author INIC
 * @returns {JSX.Element}
 ********************************************************/
const ReactSelectField = ({ name, formik, ...otherProps }) => {
  return (
    <Select
      name={name}
      {...otherProps}
      value={formik?.values[name]}
      onChange={(selected) => {
        formik?.setFieldValue(name, selected);
      }}
    />
  );
};

export default WithFormikField(ReactSelectField);
