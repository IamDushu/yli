import React from "react";
import WithFormikField from "../with-formik-field/with-formik-field";
import CropImagesProfile from "components/CropImages/CropImagesProfile";

/********************************************************
 * Render File Upload Form field
 * @author INIC
 * @returns {JSX.Element}
 ********************************************************/
const ImageSelectFieldSignUp = ({ name, formik, field, ...otherProps }) => {
  const handleChange = (fileUrl) => {
    formik?.setFieldValue(name, fileUrl);
  };

  return (
    <>
      <CropImagesProfile
        name={name}
        type="signUp"
        handleChange={handleChange}
        formik={formik}
        {...otherProps}
      />
    </>
  );
};

export default WithFormikField(ImageSelectFieldSignUp);
