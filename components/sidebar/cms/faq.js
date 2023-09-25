import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { Card, Accordion } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FAQ } from "routes/urls";

const Faq = () => {
  const [lang] = useTranslation("language");
  const router = useRouter();
  return (
    <Fragment>
      {/* Recently Added to gm */}
      <Accordion
        defaultActiveKey="0"
        className="faqs border-bottom border-geyser"
      >
        <div onClick={() => router.push(FAQ)}>
          <Accordion.Toggle
            variant="link"
            eventKey="0"
            className="p-20 w-100 d-flex border-0 accordion-heading-box text-secondary"
          >
            <Card.Title className="h4 font-18 font-600 mb-0 d-flex text-left align-items-center w-100">
              {lang("CMS.FAQS")}
            </Card.Title>
          </Accordion.Toggle>
        </div>
      </Accordion>
    </Fragment>
  );
};
export default Faq;
