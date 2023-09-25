import React from "react";
import WithFormikField from "../with-formik-field/with-formik-field";
import CropImagesProfile from "components/CropImages/CropImagesProfile";
/********************************************************
 * Render File Upload Form field
 * @author INIC
 * @returns {JSX.Element}
 ********************************************************/
const ImageSelectField = ({
  name,
  formik,
  closePopupHandler,
  isSelfProfile,
  field,
  viewmode,
  fullname,
  ...otherProps
}) => {
  delete otherProps.value;
  const handleChange = (fileUrl) => {
    if (field === "profile") {
      otherProps.onProfilePicChange(fileUrl);
    } else {
      formik?.setFieldValue(name, fileUrl);
    }
  };

  return (
    <div className="position-relative d-inline-block">
      <CropImagesProfile
        name={name}
        type="myProfile"
        handleChange={handleChange}
        isSelfProfile={isSelfProfile}
        fullname={fullname}
        formik={formik}
        {...otherProps}
        viewmode={viewmode}
      />
    </div>
  );
};

export default WithFormikField(ImageSelectField);
