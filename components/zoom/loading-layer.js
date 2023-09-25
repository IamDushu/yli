import React from "react";
import { LoadingOutlined } from "@ant-design/icons";

const LoadingLayer = (props) => {
  const { content } = props;
  return (
    <div className="loading-layer">
      <LoadingOutlined style={{ fontSize: "86px", color: "#fff" }} />
      <p className="loading-text">{content}</p>
    </div>
  );
};
export default LoadingLayer;
