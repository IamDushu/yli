import React, { useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import { Stack } from "@mui/material";
import OutsideClickHandler from "react-outside-click-handler";

const TextEditField = ({ type, value, onSave, onChange }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [editedValue, setEditedValue] = useState(value);

  const handleChange = (e) => {
    if (onChange) onChange(e);
    setEditedValue(e.target.value);
  };

  const getEditField = () => {
    switch (type) {
      case "TEXT":
        return (
          <input
            value={editedValue}
            onChange={handleChange}
            style={{ height: "18px" }}
          />
        );
      case "TEXTAREA":
        return (
          <textarea value={editedValue} onChange={handleChange} rows={2} />
        );
    }
  };

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        if (!showEdit) return;
        onSave(editedValue);
        setShowEdit(false);
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        gap={showEdit ? "2px" : "10px"}
      >
        <Image
          src={
            showEdit
              ? "/assets/images/edit-text-icon-active.svg"
              : "/assets/images/edit-text-icon.svg"
          }
          height="12px"
          width="12px"
          style={{ cursor: "pointer" }}
          onClick={() => {
            if (showEdit) {
              setEditedValue(value);
            }
            setShowEdit((prev) => !prev);
          }}
        />
        <div className="edit-text-field-wrapper">
          {showEdit ? (
            getEditField()
          ) : (
            <span className={type === "TEXTAREA" ? "textarea-content" : ""}>
              {value}
            </span>
          )}
        </div>
      </Stack>
    </OutsideClickHandler>
  );
};

export default TextEditField;

TextEditField.propTypes = {
  type: PropTypes.oneOf(["TEXT", "TEXTAREA"]),
  value: PropTypes.string,
  onSave: PropTypes.func,
};
