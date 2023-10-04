import React from "react";
import Button from "@mui/material/Button";

const YliwayGuide = (props) => {
  const { title, buttonText, onButtonClick } = props;

  return (
    <div className="yliway-guide-wrapper">
      <div className="bg-image-wrapper">
        <div className="yliway-guide-content">
          <h2 className="yliway-guide-title">{title}</h2>
          <Button
            variant="contained"
            className="yliway-guide-button"
            onClick={onButtonClick}>
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default YliwayGuide;
