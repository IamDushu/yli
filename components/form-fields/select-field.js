import React from "react";
import Select from "react-select";
import WithFormikField from "../with-formik-field/with-formik-field";
import CreatableSelect from "react-select/creatable";

/********************************************************
 * Render Select Form field
 * @author INIC
 * @returns {JSX.Element}
 ********************************************************/
const SelectField = ({
  name,
  formik,
  setSelectedSkillArea,
  type,
  ...otherProps
}) => {
  return (
    <Select
      name={name}
      {...otherProps}
      value={formik?.values[`selected_${name}`]}
      onChange={(selected) => {
        if (type === "multi" || otherProps.isMulti) {
          formik?.setFieldValue(name, selected);
        } else {
          formik?.setFieldValue(name, selected.value);
        }
        formik?.setFieldValue(`selected_${name}`, selected);
        if (setSelectedSkillArea) {
          if (selected.value === "Mindset") setSelectedSkillArea(2);
          if (selected.value === "Hard Skills") setSelectedSkillArea(6);
          if (selected.value === "Soft Skills") setSelectedSkillArea(1);
        }
      }}
    />
  );
};

export const CreatableSelectField = ({
  name,
  formik,
  addRole = false,
  addCompany = false,
  ...otherProps
}) => {
  return (
    <CreatableSelect
      name={name}
      {...otherProps}
      value={formik?.values[`selected_${name}`]}
    />
  );
};
export default WithFormikField(SelectField);
