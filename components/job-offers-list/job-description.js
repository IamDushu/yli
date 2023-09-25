import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function JobDescription({ jobDescription }) {
  const [lang] = useTranslation("language");
  const [readMore, setReadMore] = useState(true);
  return (
    <Card className="my-4">
      <Card.Body className="p-3">
        <h6 className="mb-3">{lang("JOBS.JOB_OFFERS.DESCRIPTION")}</h6>
        <p className="text-body-14 font-weight-normal m-0">
          {readMore ? jobDescription : jobDescription.slice(0, 200)}
        </p>
        {(jobDescription !== jobDescription.slice(0, 200)) && <div
          className="read-more-button cursor-pointer"
          onClick={() => setReadMore((prev) => !prev)}
        >
          {(!readMore)?'Read more':'Read less'}
        </div>}
      </Card.Body>
    </Card>
  );
}

export default JobDescription;
