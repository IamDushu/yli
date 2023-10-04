import React from "react";
import Datetime from "react-datetime";
import WithFormikField from "../with-formik-field/with-formik-field";

/********************************************************
 * Render Date Time Form field
 * @author INIC
 * @returns {JSX.Element}
 ********************************************************/
const DateTimePickerField = ({
  name,
  formik,
  validateDateFn = "",
  type,
  isClearable = false,
  ...otherProps
}) => {
  const renderInput = (props) => {
    const fieldNames = name.split(".");
    let value = formik.values;

    for (const fieldName of fieldNames) {
      if (value && typeof value === "object" && fieldName in value) {
        value = value[fieldName];
      } else {
        value = undefined; // Field not found
        break;
      }
    }
    const clear = () => {
      props.onChange({ target: { value: "" } });
    };

    return (
      <div>
        <input {...props} />
        {value && (
          <em className="icon icon-deny mr-4 pr-1" onClick={clear}></em>
        )}
      </div>
    );
  };

  return (
    <div className="calendar-wrap">
      <Datetime
        isValidDate={(currentDate) =>
          validateDateFn === ""
            ? otherProps.maxDate
              ? currentDate.isBefore(otherProps.maxDate)
              : otherProps.minDate
              ? currentDate.isSameOrAfter(otherProps.minDate)
              : true
            : validateDateFn(currentDate)
        }
        name={name}
        closeOnSelect
        {...otherProps}
        utc={true}
        dateFormat="DD/MM/YYYY"
        onChange={(value) => {
          if (typeof value === "string") {
            formik?.setFieldValue(name, "");
            return;
          }
          if (type === "stakeholder") {
            formik?.setFieldValue(name, value?.format("YYYY-MM-DD"));
          } else {
            formik?.setFieldValue(name, value?.format("DD-MM-YYYY"));
          }
        }}
        {...(isClearable ? { renderInput: renderInput } : {})}
      />
      <em className="icon icon-calendar"></em>
    </div>
  );
};

export default WithFormikField(DateTimePickerField);
