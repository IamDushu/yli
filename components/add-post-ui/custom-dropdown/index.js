import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Menu, MenuItem, Radio } from "@mui/material";
import { useDispatch } from "react-redux";
import { toggleModals } from "store/actions";

export const CustomDropDowns = ({
  options,
  anchorRef,
  defaultValue = "",
  menuOpen = false,
  selectedRadioColor = "#6750A4",
  menuTextColor = "#1C1B1E",
  callback,
}) => {
  const dispatch = useDispatch();
  const [currentValue, setValue] = useState(defaultValue);

  const handleClose = () => {
    dispatch(
      toggleModals({
        postPrivacyDropdown: false,
      })
    );
  };

  useEffect(() => {
    if (callback) callback(currentValue);
  }, [currentValue]);
  return (
    <Menu
      anchorEl={anchorRef.current}
      open={menuOpen}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      {options.map(({ label, value }, index) => (
        <MenuItem
          value={value}
          key={index}
          style={{ color: menuTextColor }}
          onClick={() => setValue(value)}
        >
          <Radio
            checked={currentValue === value}
            color="primary"
            style={value === currentValue ? { color: selectedRadioColor } : {}}
          />
          {label}
        </MenuItem>
      ))}
    </Menu>
  );
};

CustomDropDowns.propTypes = {
  /*
  options for dropdown
  */
  options: PropTypes.array,
  /*
  default value
  */
  defaultValue: PropTypes.string,
  /*
  selected radio color
  */
  selectedRadioColor: PropTypes.string,
  /*
  menu text color
  */
  menuTextColor: PropTypes.string,
};
