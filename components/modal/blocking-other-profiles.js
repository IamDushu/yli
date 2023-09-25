import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Form, Row, Col } from "react-bootstrap";
import { getMyConnectionsList } from "store/actions/connections";
import { blockUser, blockUserList } from "store/actions/visibility";
import { showMessageNotification } from "utils";
import { toggleModals } from "store/actions";

/*******************   
@purpose : User Set Thankyou
@Author : INIC
******************/
export const BlockingOtherProfiles = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();

  const myConnectionList = useSelector(
    (state) => state.connections.myConnectionList
  );

  const { blockUserListing } = useSelector(({ visibility }) => visibility);

  const [userList, setUserList] = useState([]);
  const [listCheck, setListCheck] = useState([]);

  const [connectionSearch, setConnectionSearch] = useState("");
  const [blockUserSearch, setBlockUserSearch] = useState("");

  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    let data = {
      page: 1,
      pagesize: 100,
      type: "all",
      search: connectionSearch,
    };
    dispatch(getMyConnectionsList(data));
  }, [connectionSearch]);

  useEffect(() => {
    let blockData = {
      search: blockUserSearch,
    };
    dispatch(blockUserList(blockData));
  }, [blockUserSearch]);

  useEffect(() => {
    if (blockUserListing.length > 0) {
      let blockList = [];
      blockUserListing.forEach((list) => {
        blockList.push(list.id);
      });
      setUserList(blockList);
      setListCheck(blockList);
    } else {
      setUserList([]);
    }
  }, [blockUserListing]);

  useEffect(() => {
    return () => {
      setScroll(true);
    };
  }, []);

  /******************** 
@purpose : Used for debounce
@Parameter : {  }
@Author : INIC
******************/
  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  /******************** 
@purpose : Used for my connection serach
@Parameter : {  }
@Author : INIC
******************/
  const searchConnection = useCallback(
    debounce((e) => {
      setConnectionSearch(e.target.value);
    })
  );

  /******************** 
@purpose : Used for block user serach
@Parameter : {  }
@Author : INIC
******************/
  const searchBlockUser = useCallback(
    debounce((e) => {
      setBlockUserSearch(e.target.value);
    })
  );

  /******************** 
@purpose : Used for unblock user select
@Parameter : { e }
@Author : INIC
******************/
  const handleChangeBlock = (e) => {
    const { name, checked } = e.target;
    let newUser = [...userList];
    if (myConnectionList.length > 0 || myConnectionList !== undefined) {
      myConnectionList.forEach((list) => {
        if (list.userId === name) {
          if (checked) {
            newUser.push(name);
          } else {
            const index = newUser.indexOf(name);
            newUser.splice(index, 1);
          }
        }
      });
    }

    setUserList(newUser);
  };

  /******************** 
@purpose : Used for block user select
@Parameter : { e }
@Author : INIC
******************/
  const handleChangeUnblock = (e) => {
    const { name, checked } = e.target;
    let newUser = [...userList];
    if (blockUserListing.length > 0 || blockUserListing !== undefined) {
      blockUserListing.forEach((list) => {
        if (list.id === name) {
          if (checked) {
            const index = newUser.indexOf(name);
            newUser.splice(index, 1);
          } else {
            newUser.push(name);
          }
        }
      });
    }

    setUserList(newUser);
  };

  /******************** 
@purpose : Used for save button 
@Parameter : { e }
@Author : INIC
******************/
  const saveHandler = async () => {
    if (userList.sort().join(",") === listCheck.sort().join(",")) {
      showMessageNotification("Already Updated");
    } else {
      let body = {
        userList,
      };
      dispatch(blockUser(body));
      dispatch(toggleModals({ blockingotherprofiles: false }));
    }
  };

  return (
    <>
      {/* <Form> */}
      <Modal.Body className="p-4">
        <Row>
          <Col md={6}>
            <div className="mb-3">
              <span className="font-weight-bold">
                {lang("MY_ACCOUNTS.COMMON.USER_PROFILE")}
              </span>
              <div className="common-searchbar mt-3">
                <Form.Group
                  controlId="formSearch"
                  className="position-relative mb-0"
                >
                  <Form.Control
                    type="text"
                    placeholder={lang("MY_ACCOUNTS.COMMON.SEARCH")}
                    onChange={searchConnection}
                  />
                  <div className="search-inner-icon">
                    <em className="bx bx-search"></em>
                  </div>
                </Form.Group>
              </div>
            </div>
            {/* <PerfectScrollbar className={scroll && "on-view-scroll mt-4"}> */}
              <ul className="list-unstyled model-listing-box">
                {(Array.isArray(myConnectionList) &&
                  myConnectionList.length === 0) ||
                myConnectionList === undefined ? (
                  <p className="mb-0 p-3" style={{ color: "red" }}>
                    {lang("MY_ACCOUNTS.COMMON.NO_RECORD")}
                  </p>
                ) : (
                  Array.isArray(myConnectionList) &&
                  myConnectionList.map((list) => (
                    <li className="model-common-listing" key={list.id}>
                      <div className="custom-checkbox checkbox-blue d-flex justify-content-between">
                        <div>
                          <h5 className="text-body-14 mb-0">
                            {`${
                              list?.firstName?.charAt(0).toUpperCase() +
                              list?.firstName?.slice(1)
                            } ${
                              list?.lastName?.charAt(0).toUpperCase() +
                              list?.lastName?.slice(1)
                            }`}
                          </h5>
                        </div>
                        <label
                          htmlFor={list.userId}
                          className="mb-0 mr-0 pr-0 ml-3"
                        >
                          <input
                            type="checkbox"
                            name={list.userId}
                            id={list.userId}
                            autoComplete="off"
                            onChange={(e) => handleChangeBlock(e)}
                          />
                          <span></span>
                        </label>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            {/* </PerfectScrollbar> */}
          </Col>
          <Col md={6}>
            <div className="mb-3">
              <span className="font-weight-bold">
                {" "}
                {lang("MY_ACCOUNTS.COMMON.BLOCKED_PROFILE")}
              </span>
              <div className="common-searchbar mt-3">
                <Form.Group
                  controlId="formSearch"
                  className="position-relative mb-0"
                >
                  <Form.Control
                    type="text"
                    placeholder={lang("MY_ACCOUNTS.COMMON.SEARCH")}
                    onChange={searchBlockUser}
                  />
                  <div className="search-inner-icon">
                    <em className="bx bx-search"></em>
                  </div>
                </Form.Group>
              </div>
            </div>
            {/* <PerfectScrollbar className={scroll && "on-view-scroll mt-4"}> */}
              <ul className="list-unstyled model-listing-box">
                {(Array.isArray(blockUserListing) &&
                  blockUserListing.length === 0) ||
                blockUserListing === undefined ? (
                  <p className="mb-0 p-3" style={{ color: "red" }}>
                    {lang("MY_ACCOUNTS.COMMON.NO_RECORD")}
                  </p>
                ) : (
                  Array.isArray(blockUserListing) &&
                  blockUserListing.map((list) => (
                    <li className="model-common-listing" key={list.id}>
                      <div className="custom-checkbox checkbox-blue d-flex justify-content-between">
                        <div>
                          <h5 className="text-body-14 mb-0">
                            {`${
                              list?.firstName?.charAt(0).toUpperCase() +
                              list?.firstName?.slice(1)
                            } ${
                              list?.lastName?.charAt(0).toUpperCase() +
                              list?.lastName?.slice(1)
                            }`}
                          </h5>
                        </div>
                        <label
                          htmlFor={list.id}
                          className="mb-0 mr-0 pr-0 ml-3"
                        >
                          <input
                            type="checkbox"
                            name={list.id}
                            id={list.id}
                            autoComplete="off"
                            onChange={(e) => handleChangeUnblock(e)}
                          />
                          <span></span>
                        </label>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            {/* </PerfectScrollbar> */}
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer className="custom-footer text-center d-flex border-top border-geyser justify-content-between">
        <Button
          variant="btn btn-dark font-weight-semibold"
          onClick={() =>
            dispatch(toggleModals({ blockingotherprofiles: false }))
          }
        >
          {lang("COMMON.BACK")}
        </Button>
        <Button
          variant="btn btn-info font-weight-semibold px-30"
          onClick={() => saveHandler()}
        >
          {lang("COMMON.SAVE")}
        </Button>
      </Modal.Footer>
      {/* </Form> */}
    </>
  );
};
