import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { TextField, MenuItem, InputAdornment, Radio } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import customSelectStyles from "./custom-select-comment-right.module.scss";

export const CustomSelectWithRadio = ({
  options,
  formik,
  formikKey,
  defaultValue = "",
  placeholder = "",
  label = "Comment Rights",
  selectedRadioColor = "#6750A4",
  labelBgColor = "#FDF8FD",
  labelPadding = "0px 4px 0px 4px",
  inputValueColor = "#49454E",
  menuTextColor = "#1C1B1E",
  required=false,
  callback,
}) => {
  const [currentValue, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const ArrowDropDownIcon = () => (
    <div className={customSelectStyles["yliway-arrow-icon"]}>
      <img src="assets/images/add-post/comment-rights/comment-rights-arrow-down.svg" />
    </div>
  );
  const ArrowDropUpIcon = () => (
    <div className={customSelectStyles["yliway-arrow-icon"]}>
      <img
        src="assets/images/add-post/comment-rights/comment-rights-arrow-down.svg"
        className={customSelectStyles["arrow-up"]}
      />
    </div>
  );
  const customMuiSelectStyles = {
    "& .MuiSelect-icon": {
      display: "none",
    },
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: "#7A757F",
      },
    },
  });

  // callback trigger
  useEffect(() => {
    if (callback) callback(currentValue);
    if (formik) {
      formik.setFieldValue(formikKey, currentValue);
    }
  }, [currentValue]);

  return (
    <ThemeProvider theme={theme}>
      <TextField
        fullWidth
        select
        required={required}
        label={label}
        value={currentValue ? currentValue : ""}
        onChange={(e) => setValue(e.target.value)}
        InputLabelProps={{
          style: {
            backgroundColor: labelBgColor,
            padding: labelPadding,
          },
        }}
        InputProps={{
          style: { color: inputValueColor },
        }}
        SelectProps={{
          open,
          displayEmpty: true, // <-- This allows for the display of an empty option
          onOpen: () => setOpen(true),
          onClose: () => setOpen(false),
          startAdornment: (
            <InputAdornment position="start">
              {!open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </InputAdornment>
          ),
          sx: customMuiSelectStyles,
          renderValue: (selectedValue) => {
            if (!selectedValue) {
              return placeholder; // <-- Return placeholder when value is empty
            }
            const selectedOption = options.find(
              (option) => option.value === selectedValue
            );
            return selectedOption ? selectedOption.label : "";
          },
        }}
      >
        {/* Placeholder menu item */}
        <MenuItem value="" disabled>
          <em>{placeholder}</em>
        </MenuItem>

        {options.map(({ label, value }, index) => (
          <MenuItem value={value} key={index} style={{ color: menuTextColor }}>
            <Radio
              checked={currentValue === value}
              color="primary"
              style={
                value === currentValue ? { color: selectedRadioColor } : {}
              }
            />
            {label}
          </MenuItem>
        ))}
      </TextField>
    </ThemeProvider>
  );
};

CustomSelectWithRadio.propTypes = {
  /*
  options for dropdown
  */
  options: PropTypes.array,
  /*
  default value
  */
  defaultValue: PropTypes.string,
  /*
  label
  */
  label: PropTypes.string,
  /*
  selected radio color
  */
  selectedRadioColor: PropTypes.string,
  /*
  label bg color
  */
  labelBgColor: PropTypes.string,
  /*
  label pdading
  */
  labelPadding: PropTypes.string,
  /*
  input value color
  */
  inputValueColor: PropTypes.string,
  /*
  menu text color
  */
  menuTextColor: PropTypes.string,
};
