import React, { Fragment } from "react";
import { Card, Accordion } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const ManageActivities = ({
  activitySubMenu,
  handleActivities,
  accordion,
  setAccordion,
}) => {
  const [lang] = useTranslation("language");
  return (
    <Fragment>
      {/* growth modal listing */}
      <Accordion activeKey={accordion.manage} className="upgrade-your-profile">
        <Accordion.Toggle
          variant="link"
          eventKey={"1"}
          className="p-20 w-100 d-flex align-items-center border-0 accordion-heading-box text-secondary"
          onClick={() => {
            setAccordion((state) => ({
              ...state,
              manage: state.manage === "0" ? "1" : "0",
            }));
          }}
        >
          <Card.Title className="text-body-16 mb-0">
            {lang("MY_ACCOUNTS.TITLE.MANAGE_ACTIVITIES")}
          </Card.Title>
          <em
            className={`icon icon-down-arrow ml-auto font-24 ${
              accordion.manage === "1" ? "rotate-top" : ""
            }`}
          ></em>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={"1"}>
          <Card.Body className="pt-0">
            <ul className="listing-section accordions-listing listing-content-between active-inner">
              {[
                lang("MY_ACCOUNTS.TABS.MANAGE_ACTIVITIES.ACTIVITIES"),
                lang("MY_ACCOUNTS.TABS.MANAGE_ACTIVITIES.SAVED_POSTS"),
              ].map((menuItem, idx) => (
                <li
                  className={`${
                    activitySubMenu === menuItem
                      ? "listing-box active"
                      : "listing-box"
                  }`}
                  key={idx}
                  onClick={() => handleActivities(menuItem)}
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
export default ManageActivities;
