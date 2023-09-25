import React, { useState } from "react";
import { Accordion, Button, Card, Modal, ToggleButton } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  growthModelResourceFilterOptions,
  showMessageNotification,
} from "@utils";
import { addGrowthModelActivities, changePostGMStatus } from "store/actions";

import { Form } from "react-bootstrap";
import { growthModelTypeFilterOptionschange } from "utils";
/******************* 
@purpose : User Set AddToGm
@Author : INIC
******************/
export const AddToGm = ({ toggleGMModal, data: data1 }) => {
  const getActivityType = (value) => {
    switch (value) {
      case "Hard Skill":
        return growthModelTypeFilterOptionschange;
      case "Soft Skill":
        return growthModelTypeFilterOptionschange;
      case "Mindset":
        return growthModelTypeFilterOptionschange;
      case "Traction":
        return growthModelTypeFilterOptionschange;
      case "Distribution":
        return growthModelTypeFilterOptionschange;
      case "Support":
        return growthModelTypeFilterOptionschange;
      default:
        return [];
    }
  };

  const [checked, setChecked] = useState(false);
  const [fullSize, setFullSize] = useState(false);

  const [searchText, setSearchText] = useState("");

  const [skillSettings, setSkillSettings] = useState({
    skillArea: "",
    skillType: "",
  });

  const dispatch = useDispatch();

  const saveToGM = async () => {
    if (skillSettings.skillArea === "" || skillSettings.skillType === "") {
      showMessageNotification("Please select Skill Area & Skill Type", "error");
    } else {
      let data = {
        activities: [
          {
            skillArea: skillSettings.skillArea,
            skillTypes: [
              {
                typeName: skillSettings.skillType,
                data: [{ ...data1 }],
              },
            ],
          },
        ],
      };
      const response = await Promise.resolve(
        dispatch(addGrowthModelActivities(data))
      );
      if (response) {
        if (data1.activityCategory === "post") {
          dispatch(
            changePostGMStatus(data1.activityId, { isPostAddedGM: true })
          );
          toggleGMModal();
        } else {
          toggleGMModal("", "", "success");
        }
      } else {
        showMessageNotification("Error Occured.", "error");
      }
    }
  };
  return (
    <>
      <Modal.Body>
        <Card className="border-0 p-0">
          <div className="common-searchbar mb-4">
            <Form.Group
              controlId="formSearch"
              className="position-relative mb-0"
            >
              <Form.Control
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <div className="search-inner-icon">
                <em className="bx bx-search"></em>
              </div>
            </Form.Group>
          </div>
          <Card.Body className="model-listing-box p-0 overflow-hidden">
            {growthModelResourceFilterOptions.map((v, i) => (
              <Accordion defaultActiveKey="1" key={i}>
                <Card.Header className="p-0 border-bottom border-geyser">
                  <Accordion.Toggle
                    variant="link"
                    eventKey="0"
                    className="px-3 padding-y-12 w-100 d-flex border-0 bg-white text-secondary"
                  >
                    <Card.Title className="h4 font-14 mb-0 d-flex text-left align-items-center w-100">
                      {v.value}
                    </Card.Title>
                    <em
                      className={
                        fullSize
                          ? "icon icon-down-arrow ml-auto font-24 rotate-top"
                          : "icon icon-down-arrow ml-auto font-24"
                      }
                      onClick={() => setFullSize(!fullSize)}
                    ></em>
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body className="bg-step-gray border-geyser p-0">
                    <ul className="listing-section listing-content-between border-first-0">
                      {getActivityType(v.value).map((v1, index) => (
                        <li
                          className={
                            v1.value === skillSettings.skillType
                              ? `listing-box selected border-0 p-3`
                              : "listing-box border-0 p-3"
                          }
                        >
                          <div
                            className="d-flex justify-content-between align-items-center font-14 w-100"
                            onClick={() => {
                              setSkillSettings({
                                skillArea: v.value,
                                skillType: v1.value,
                              });
                            }}
                          >
                            <span className="font-light">{v1.value}</span>
                            <ToggleButton
                              className="mb-2 p-0"
                              id={`radio-${index}`}
                              key={index}
                              type="radio"
                              variant="link"
                              checked={skillSettings?.skillType === v1.value}
                              value={v1.value}
                              onChange={(e) =>
                                setChecked(e.currentTarget.checked)
                              }
                            ></ToggleButton>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </Card.Body>
                </Accordion.Collapse>
              </Accordion>
            ))}
          </Card.Body>
        </Card>
        <div className="text-center d-flex mt-5"></div>
      </Modal.Body>
      <Modal.Footer className="custom-footer text-center d-flex border-geyser justify-content-between pt-4 border-top">
        <button
          type="button"
          className="btn btn-btn btn-dark font-weight-semibold"
        >
          Cancel
        </button>
        <button
          disabled=""
          onClick={() => {
            saveToGM();
          }}
          type="button"
          className="btn btn-btn btn-info font-weight-semibold px-30"
        >
          Submit
        </button>
      </Modal.Footer>
    </>
  );
};
