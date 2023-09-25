import React, { Fragment, useState } from "react";
import { Card, Accordion } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { BECOME_BN_HOST } from "routes/urls";

const WorkWithUs = () => {
  const [lang] = useTranslation("language");
  const [accordion, setAccordion] = useState("1");
  return (
    <Fragment>
      {/* Recently Added to gm */}
      <Accordion activeKey={accordion} className="work-with-us">
        <Accordion.Toggle
          variant="link"
          eventKey={"1"}
          className="p-20 w-100 d-flex border-0 accordion-heading-box text-secondary"
          onClick={() => setAccordion(accordion === "0" ? "1" : "0")}
        >
          <Card.Title className="h4 font-18 font-600 mb-0 d-flex text-left align-items-center w-100">
            {lang("CMS.WORK_WITH_US")}
          </Card.Title>
          <em
            className={`icon icon-down-arrow ml-auto font-24 ${
              accordion === "1" ? "rotate-top" : ""
            }`}
          ></em>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={"1"}>
          <Card.Body className="pt-0">
            <ul className="listing-section accordions-listing listing-content-between active-inner">
              <li className="listing-box">
                <a
                  title="Host"
                  href={BECOME_BN_HOST}
                  assName="d-flex align-items-center w-100"
                >
                  {lang("CMS.ROOM_MANAGER")}
                </a>
              </li>
            </ul>
          </Card.Body>
        </Accordion.Collapse>
      </Accordion>
    </Fragment>
  );
};
export default WorkWithUs;
