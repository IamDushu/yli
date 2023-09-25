import React, { Fragment, useEffect, useState } from "react";
import { Card, Accordion } from "react-bootstrap";
import { Link } from "@routes";

const BillingInformation = ({
    billinginformationSubMenu,
  handlebillinginformation,
  accordion,
  setAccordion,
}) => {
  return (
    <Fragment>
      <div className="upgrade-your-profile border-bottom border-geyser accordion">
      <button variant="link" className="p-20 w-100 align-items-center d-flex border-0 accordion-heading-box text-secondary" type="button" onClick={handlebillinginformation}>
        <div className="text-body-16 mb-0 card-title h5">Billing Information</div>
        </button>
      </div>
     
    </Fragment>
  );
};
export default BillingInformation;
