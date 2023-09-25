import React from "react";

const CourseText = ({ text }) => {
  return (
    <h1
      dangerouslySetInnerHTML={{
        __html: text,
      }}
      className="pr-3"
    />
  );
};

export default CourseText;
