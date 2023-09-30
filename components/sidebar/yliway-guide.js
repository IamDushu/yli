import React from "react";
import { Card } from "react-bootstrap";
import Button from "@mui/material/Button";
// import "../../components/sidebar/sidebar.scss"

const YliwayGuide = (props) => {
  const { title, bgImage, buttonText, onButtonClick } = props;

  return (
    <Card className="yliway-guide-wrapper">
      <div
        style={{
          backgroundImage: `url("${bgImage}")`,
        }}
        className="bg-image-wrapper">
        <div className="p-sidebar-add position-relative z-index-99 text-white text-center">
          <h2 className="yliway-guide-title">{title}</h2>
          <Button
            variant="contained"
            className="yliway-guide-button"
            onClick={onButtonClick}>
            {buttonText}
          </Button>
        </div>
      </div>
    </Card>
  );
};
export default YliwayGuide;
