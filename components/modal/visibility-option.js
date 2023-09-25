import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Form } from "react-bootstrap";
import { toggleModals } from "store/actions";
import { addVisibilityProfile, getSetting } from "store/actions/visibility";
import { showMessageNotification } from "utils";

/*******************   
@purpose : User Set Thankyou
@Author : INIC
******************/
export const VisibilityOption = () => {
  const dispatch = useDispatch();

  const { profileOptions } = useSelector(({ visibility }) => visibility);

  useEffect(() => {
    let body = {
      key: "profile_options",
    };
    dispatch(getSetting(body));
  }, []);

  useEffect(() => {
    setVisibilityList({
      myConnection: {
        name: "My Connections",
        isChecked: profileOptions.myConnection,
      },
      myGrowthConnection: {
        name: "My Growth Connections",
        isChecked: profileOptions.myGrowthConnection,
      },
      followers: { name: "Followers", isChecked: profileOptions.followers },
      teachers: { name: "Teachers", isChecked: profileOptions.teachers },
      coach: { name: "Coach", isChecked: profileOptions.coach },
      host: { name: "Host", isChecked: profileOptions.host },
      trainer: { name: "Trainer", isChecked: profileOptions.trainer },
      companies: { name: "Companies", isChecked: profileOptions.companies },
    });
  }, [profileOptions]);

  const [visibilityList, setVisibilityList] = useState({});
  const [search, setSearch] = useState("");

  /******************** 
@purpose : Used for checkbox change 
@Parameter : {}
@Author : INIC
******************/
  const handleChange = (e) => {
    const { name, checked } = e.target;
    let tempList = Object.keys(visibilityList).map((key) =>
      key === name
        ? { ...visibilityList[key], isChecked: checked }
        : visibilityList[key]
    );

    const [
      myConnection,
      myGrowthConnection,
      followers,
      teachers,
      coach,
      host,
      trainer,
      companies,
    ] = tempList;

    const myObj = {
      myConnection,
      myGrowthConnection,
      followers,
      teachers,
      coach,
      host,
      trainer,
      companies,
    };

    setVisibilityList(myObj);
  };

  /******************** 
@purpose : Used for validation 
@Parameter : {}
@Author : INIC
******************/
  const validation = () => {
    if (
      visibilityList.myConnection.isChecked === false &&
      visibilityList.myGrowthConnection.isChecked === false &&
      visibilityList.followers.isChecked === false &&
      visibilityList.teachers.isChecked === false &&
      visibilityList.coach.isChecked === false &&
      visibilityList.host.isChecked === false &&
      visibilityList.trainer.isChecked === false &&
      visibilityList.companies.isChecked === false
    ) {
      showMessageNotification("Please select option", "error");
      return false;
    } else if (
      visibilityList.myConnection.isChecked === profileOptions.myConnection &&
      visibilityList.myGrowthConnection.isChecked ===
        profileOptions.myGrowthConnection &&
      visibilityList.followers.isChecked === profileOptions.followers &&
      visibilityList.teachers.isChecked === profileOptions.teachers &&
      visibilityList.coach.isChecked === profileOptions.coach &&
      visibilityList.host.isChecked === profileOptions.host &&
      visibilityList.trainer.isChecked === profileOptions.trainer &&
      visibilityList.companies.isChecked === profileOptions.companies
    ) {
      showMessageNotification("Already Updated");
      return false;
    } else {
      return true;
    }
  };

  /******************** 
@purpose : Used for save handler
@Parameter : {}
@Author : INIC
******************/
  const saveHandler = () => {
    if (validation()) {
      let data = {
        myConnection: visibilityList.myConnection.isChecked,
        myGrowthConnection: visibilityList.myGrowthConnection.isChecked,
        followers: visibilityList.followers.isChecked,
        teachers: visibilityList.teachers.isChecked,
        coach: visibilityList.coach.isChecked,
        host: visibilityList.host.isChecked,
        trainer: visibilityList.trainer.isChecked,
        companies: visibilityList.companies.isChecked,
      };
      dispatch(addVisibilityProfile(data));
      dispatch(toggleModals({ visibilityoption: false }));
    }
  };

  const filteredPfOptions = Object.keys(visibilityList).filter((pf) => {
    let title = pf.replace(/([A-Z])/g, " $1").toLowerCase();
    return title.includes(search.toLowerCase());
  });

  return (
    <>
        <Modal.Body className="p-4">
          <div className="common-searchbar mb-4">
            <Form.Group
              controlId="formSearch"
              className="position-relative mb-0"
            >
              <Form.Control
                type="text"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="search-inner-icon">
                <em className="bx bx-search"></em>
              </div>
            </Form.Group>
          </div>
          <PerfectScrollbar>
            <Row>
              <Col lg={12}>
                <div>
                  <ul className="list-unstyled model-listing-box">
                    {filteredPfOptions.map((key, i) => {
                      return (
                        <li className="model-common-listing" key={i}>
                          <div className="custom-checkbox checkbox-blue d-flex justify-content-between">
                            <div>
                              <h5 className="text-body-14 mb-0">
                                {visibilityList[key]?.name}
                              </h5>
                            </div>
                            <label
                              htmlFor={key}
                              className="mb-0 mr-0 pr-0 ml-3"
                            >
                              <input
                                type="checkbox"
                                name={key}
                                id={key}
                                onChange={handleChange}
                                autoComplete="off"
                                checked={visibilityList[key]?.isChecked}
                              />
                              <span></span>
                            </label>                            
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Col>
            </Row>
          </PerfectScrollbar>
        </Modal.Body>
        <Modal.Footer className="custom-footer text-center d-flex border-top border-geyser justify-content-between">
          <Button
            variant="btn btn-btn btn-dark font-weight-semibold"
            onClick={() => dispatch(toggleModals({ visibilityoption: false }))}
          >
            Cancel
          </Button>
          <Button
            variant="btn btn-btn btn-info font-weight-semibold px-30"
            onClick={() => saveHandler()}
          >
            Save
          </Button>
        </Modal.Footer>
    </>
  );
};
