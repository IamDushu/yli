import React, { Fragment } from "react";
import { Card, Accordion } from "react-bootstrap";
import { Link } from "@routes";
import { useTranslation } from "react-i18next";

const Visibility = ({
  visibilitySubMenu,
  visHandleChange,
  accordion,
  setAccordion,
}) => {
  const [lang] = useTranslation("language");
  return (
    <Fragment>
      {/* growth modal listing */}
      <Accordion
        activeKey={accordion.visibility}
        className="upgrade-your-profile border-bottom border-geyser"
      >
        <Accordion.Toggle
          variant="link"
          eventKey={"1"}
          className="p-20 w-100 align-items-center d-flex border-0 accordion-heading-box text-secondary"
          onClick={() => {
            setAccordion((state) => ({
              ...state,
              visibility: state.visibility === "0" ? "1" : "0",
            }));
          }}
        >
          <Card.Title className="text-body-16 mb-0">
            {lang("MY_ACCOUNTS.TITLE.VISIBILITY")}
          </Card.Title>
          <em
            className={`icon icon-down-arrow ml-auto font-24 ${
              accordion.visibility === "1" ? "rotate-top" : ""
            }`}
          ></em>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={"1"}>
          <Card.Body className="pt-0">
            <ul className="listing-section accordions-listing listing-content-between active-inner">
              <li
                className={`${
                  visibilitySubMenu ===
                  lang("MY_ACCOUNTS.TABS.VISIBILITY.PROFILE_VISIBILITY")
                    ? "listing-box active"
                    : "listing-box"
                }`}
                onClick={() =>
                  visHandleChange(
                    lang("MY_ACCOUNTS.TABS.VISIBILITY.PROFILE_VISIBILITY")
                  )
                }
              >
                <a
                  title={lang("MY_ACCOUNTS.TABS.VISIBILITY.PROFILE_VISIBILITY")}
                  className="d-flex align-items-center w-100"
                >
                  {lang("MY_ACCOUNTS.TABS.VISIBILITY.PROFILE_VISIBILITY")}
                </a>
              </li>
              <li
                className={`${
                  visibilitySubMenu ===
                  lang("MY_ACCOUNTS.TABS.VISIBILITY.ACTIVITIES_VISIBILITY")
                    ? "listing-box active"
                    : "listing-box"
                }`}
                onClick={() =>
                  visHandleChange(
                    lang("MY_ACCOUNTS.TABS.VISIBILITY.ACTIVITIES_VISIBILITY")
                  )
                }
              >
                <a
                  title={lang(
                    "MY_ACCOUNTS.TABS.VISIBILITY.ACTIVITIES_VISIBILITY"
                  )}
                  className="d-flex align-items-center w-100"
                >
                  {lang("MY_ACCOUNTS.TABS.VISIBILITY.ACTIVITIES_VISIBILITY")}
                </a>
              </li>
            </ul>
          </Card.Body>
        </Accordion.Collapse>
      </Accordion>
    </Fragment>
  );
};
export default Visibility;
