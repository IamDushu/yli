import React, { useState } from "react";
import { useDispatch } from "react-redux";
import WithFormikField from "../with-formik-field/with-formik-field";
import CropImages from "components/CropImages/CropImages";

/********************************************************
 * Render File Upload Form field
 * @author INIC
 * @returns {JSX.Element}
 ********************************************************/
const FileSelectFieldSignUp = ({
  name,
  isEdit,
  formik,
  i,
  field,
  isExperience=false,
  isEducation=false,
  ...otherProps
}) => {
  delete otherProps?.value;
  const handleChange = (fileUrl) => {
    formik?.setFieldValue(name, fileUrl);
  };

  const fileTypes = ["JPEG", "PNG", "PDF"];

  return (
    <>
      <CropImages
        type="groups"
        isEdit={isEdit}
        groupImage={
          (isExperience)?formik?.values?.experience[i]?.uploadUrl:(isEducation)?formik?.values?.educationDetails[i]?.uploadUrl: formik?.values?.certificate[i]?.url
        }
        handleChange={handleChange}
      />
    </>
  );
};

export default WithFormikField(FileSelectFieldSignUp);
