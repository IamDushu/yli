import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

const RadioOptions = ({ setTypeFn, value, id, label, name, jobType }) => {
  const [classes, setClasses] = useState("profession-jobtype");

  useEffect(() => {
    if (jobType === value) {
      setClasses("profession-jobtype active");
    } else {
      setClasses("profession-jobtype");
    }
  }, [jobType]);

  return (
    <Form.Check
      type={"radio"}
      label={label}
      className={classes}
      name={name}
      id={id}
      checked={value === jobType}
      onClick={() => setTypeFn(value)}
    />
  );
};

export default RadioOptions;
