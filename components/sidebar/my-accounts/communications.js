import React, { Fragment, useEffect, useState } from "react";
import { Card, Accordion } from "react-bootstrap";
import { Link } from "@routes";
import { useTranslation } from "react-i18next";

const Communications = ({
  communicationSubMenu,
  handleCommunication,
  accordion,
  setAccordion,
}) => {
  const [lang] = useTranslation("language");
  return (
    <Fragment>
      {/* growth modal listing */}
      <Accordion
        activeKey={accordion.communications}
        className="upgrade-your-profile border-bottom border-geyser"
      >
        <Accordion.Toggle
          variant="link"
          eventKey={"1"}
          className="p-20 w-100 align-items-center d-flex border-0 accordion-heading-box text-secondary"
          onClick={() => {
            setAccordion((state) => ({
              ...state,
              communications: state.communications === "0" ? "1" : "0",
            }));
          }}
        >
          <Card.Title className="text-body-16 mb-0">
            {" "}
            {lang("MY_ACCOUNTS.TITLE.COMMUNICATIONS")}
          </Card.Title>
          <em
            className={`icon icon-down-arrow ml-auto font-24 ${
              accordion.communications === "1" ? "rotate-top" : ""
            }`}
          ></em>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={"1"}>
          <Card.Body className="pt-0">
            <ul className="listing-section accordions-listing listing-content-between active-inner">
              {[
                lang(
                  "MY_ACCOUNTS.TABS.COMMUNICATION.HOW_YOU_RECIEVE_NOTIFICATION"
                ),
              ].map((menuItem, idx) => (
                <li
                  className={`${
                    communicationSubMenu === menuItem
                      ? "listing-box active"
                      : "listing-box"
                  }`}
                  key={idx}
                  onClick={() => handleCommunication(menuItem)}
                >
                  <a
                    title={menuItem}
                    className="d-flex align-items-center w-100"
                  >
                    {menuItem}
                  </a>
                </li>
              ))}
            </ul>
          </Card.Body>
        </Accordion.Collapse>
      </Accordion>
    </Fragment>
  );
};
export default Communications;
// lang("MY_ACCOUNTS.TABS.COMMUNICATION.MESSAGING"),