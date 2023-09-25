import React, { Fragment } from "react";
import { Card, Accordion } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const AccountSettings = ({
  currentSubMenu,
  handleChange,
  accordion,
  setAccordion,
}) => {
  const [lang] = useTranslation("language");
  return (
    <Fragment>
      {/* growth modal listing */}
      <Accordion
        // defaultActiveKey="0"
        activeKey={accordion.account}
        className="upgrade-your-profile border-bottom border-geyser"
      >
        <Accordion.Toggle
          variant="link"
          eventKey={"1"}
          className="p-3 w-100 d-flex align-items-center border-0 accordion-heading-box text-secondary"
          onClick={() => {
            setAccordion((state) => ({
              ...state,
              account: state.account === "0" ? "1" : "0",
            }));
          }}
        >
          <Card.Title className="text-body-16 mb-0">
            {lang("MY_ACCOUNTS.TITLE.ACCOUNT_SETTINGS")}
          </Card.Title>
          <em
            className={`icon icon-down-arrow ml-auto font-24 ${
              accordion.account === "1" ? "rotate-top" : ""
            }`}
          ></em>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={"1"}>
          <Card.Body className="pt-0">
            <ul className="listing-section accordions-listing listing-content-between active-inner">
              {[
                lang("MY_ACCOUNTS.TABS.ACCOUNT_SETTINGS.PROFILE_INFORMATION"),
                lang("MY_ACCOUNTS.TABS.ACCOUNT_SETTINGS.LANGUAGE"),
                lang("MY_ACCOUNTS.TABS.ACCOUNT_SETTINGS.ROLES"),
                lang("MY_ACCOUNTS.TABS.ACCOUNT_SETTINGS.CREDITS_PLAN_PAYMENT"),
                lang("MY_ACCOUNTS.TABS.ACCOUNT_SETTINGS.PREFERENCES"),
                lang("MY_ACCOUNTS.TABS.ACCOUNT_SETTINGS.ACCOUNT_ACCESS"),
                lang("MY_ACCOUNTS.TABS.ACCOUNT_SETTINGS.SECURITY"),
                lang("MY_ACCOUNTS.TABS.ACCOUNT_SETTINGS.ACCOUNT_SUSPENTION"),
              ].map((menuItem, idx) => (
                <li
                  className={`${
                    currentSubMenu === menuItem
                      ? "listing-box active"
                      : "listing-box"
                  }`}
                  key={idx}
                  onClick={() => handleChange(menuItem)}
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
export default AccountSettings;
