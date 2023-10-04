import React from "react";
import { DatePicker as DatePickerComponent } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Stack, Typography } from "@mui/material";
import { get } from "lodash";
import moment from "moment";

const DatePicker = ({
  formik,
  valueFormatString = "DD-MM-YYYY",
  onChange,
  value,
  ...restProps
}) => {
  const { name } = restProps;
  const finalValue = value ?? get(formik, `values.${name}`, "");
  const error = get(formik, `errors.${name}`, "");
  const touched = get(formik, "touched", {});
  const isTouched = get(formik, `touched.${name}`, false);
  const showError = Boolean(error) && isTouched;

  return (
    <Stack>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePickerComponent
          className="fixed-label"
          {...(formik?.getFieldProps(name) || {})}
          onOpen={() => {
            formik?.setTouched({ ...touched, [name]: true });
          }}
          onChange={(val) => {
            if (onChange) {
              onChange(val);
            }
            formik?.setFieldValue(name, val?.format(valueFormatString));
          }}
          value={moment(finalValue, valueFormatString)}
          {...restProps}
        />
      </LocalizationProvider>
      {showError && (
        <Typography
          whiteSpace="pre-wrap"
          color="#ff0000"
          fontSize="0.75rem"
          marginTop="4px"
        >
          {error}
        </Typography>
      )}
    </Stack>
  );
};

export default DatePicker;
