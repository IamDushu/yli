import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import customTextFieldStyles from "./custom-text-field.module.scss";

export const CustomInputField = ({
  defaultValue = "",
  label = "Comment Rights",
  name,
  formik,
  formikKey,
  labelBgColor = "#FDF8FD",
  labelPadding = "0px 4px 0px 4px",
  placeholder = "Enter here",
  required = false,
  inputValueColor = "#49454E",
  textarea = false,
  maxTextCount = null,
  rows,
  callback,
}) => {

  const theme = createTheme({
    palette: {
      primary: {
        main: "#7A757F",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className={customTextFieldStyles["custom-text-field-container"]}>
        <TextField
          fullWidth
          label={label}
          value={formik?.values[formikKey] || ""}
          onChange={(e) => {
            formik.setFieldValue(formikKey,e.target.value)
          }}
          InputLabelProps={{
            style: {
              backgroundColor: labelBgColor,
              padding: labelPadding,
            },
            shrink: true,
          }}
          InputProps={{
            style: { color: inputValueColor },
          }}
          placeholder={placeholder}
          required={required}
          multiline={textarea}
          rows={textarea ? rows : 1} // adjust rows as needed
        />
        {maxTextCount && (
          <div
            style={{ textAlign: "right", marginTop: 5 }}
            className={customTextFieldStyles["text-counter"]}
          >
            {`${(formik.values[formikKey] || "").length} / ${maxTextCount}`}
          </div>
        )}
      </div>
     </ThemeProvider>
  );
};

CustomInputField.propTypes = {
  defaultValue: PropTypes.string,
  label: PropTypes.string,
  labelBgColor: PropTypes.string,
  labelPadding: PropTypes.string,
  inputValueColor: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  textarea: PropTypes.bool,
  maxTextCount: PropTypes.number,
};
