import { Layout } from "components/layout";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useTranslation } from "react-i18next";
import { Accordion, Card, Container, Row, Col, Button } from "react-bootstrap";
import moment from "moment";
import { getRecentlyNewLogins, getSecurityActivities } from "store/actions";
const MainModal = dynamic(() =>
  import("components/modal").then((mod) => mod.MainModal)
);
const VerfiyPasswordModal = dynamic(() =>
  import("components/modal").then((mod) => mod.VerfiyPasswordModal)
);

const RecoveryFieldModal = dynamic(() =>
  import("components/modal").then((mod) => mod.RecoveryFieldModal)
);

import { toggleModals } from "store/actions";
import { selectUserInfo } from "store/selectors/user";
import WithAuth from "components/with-auth/with-auth";

const SecurityCheckUp = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const { verifyPassword } = useSelector(({ ui }) => ui.modals, shallowEqual);
  const { recoveryFieldEdit } = useSelector(({ ui }) => ui.modals, shallowEqual);
  const [accordianState, setAccordianState] = useState(["1", "2", "3", "4"]);
  const [newLoginsList, setNewLoginsList] = useState([]);
  const [securityActivitiesList, setSecurityActivitiesList] = useState([]);
  const [newLoginsPagesize, setNewLoginsPagesize] = useState(10);
  const [securityActivitiesPagesize, setSecurityActivitiesPagesize] =
    useState(10);
  // set total Security activities
  const [totalSA, setTotalSA] = useState(0);
  // set total new Logins
  const [totalNL, setTotalNL] = useState(0);

  useEffect(() => {
    getRecentlyNewLogins({ page: 1, pagesize: newLoginsPagesize }).then(
      (data) => {
        setNewLoginsList(data?.data);
        setTotalNL(data?.total);
      }
    );
  }, [newLoginsPagesize]);

  useEffect(() => {
    getSecurityActivities({
      page: 1,
      pagesize: securityActivitiesPagesize,
    }).then((data) => {
      setSecurityActivitiesList(data?.data);
      setTotalSA(data?.total);
    });
  }, [securityActivitiesPagesize]);
  return (
    <Layout>
      <div className="inner-wrapper">
        <Container>
          <Row>
            <Col md={8} lg={6} className="mx-auto">
              <Card>
                <Card.Header className="text-center">
                  <div className="icon-avatar-54 bg-warning-light mb-2">
                    <span className="material-icons font-32 text-warning">
                      warning
                    </span>
                  </div>
                  <h4 className="font-20 mb-2 font-weight-bold">
                    {lang("SECURITY.YOURE_SIGNED_IN")}{" "}
                  </h4>
                  <p className="font-12 mb-0">
                    {lang("SECURITY.SECURITY_SUB_HEADING")}
                  </p>
                </Card.Header>
                <Card.Body>
                  <Accordion
                    activeKey={accordianState[0]}
                    className="security-accordion mb-3"
                  >
                    <Accordion.Toggle
                      variant="link"
                      eventKey={"1"}
                      className="p-3 d-flex align-items-center accodion-btn-title"
                      onClick={() => {
                        const activeStates = [...accordianState];
                        activeStates[0] = activeStates[0] == "1" ? "" : "1";
                        setAccordianState(activeStates);
                      }}
                    >
                      {" "}
                      <span class="bx bxs-info-circle mr-2 font-20 text-warning"></span>
                      <h5 className="mb-0 font-16 font-weight-bold font-sm-14">
                        {lang("SECURITY.SIGN_IN_RECOVERY")}
                      </h5>
                      <em
                        className={
                          accordianState[0]
                            ? "icon icon-down-arrow ml-auto font-18 rotate-top"
                            : "icon icon-down-arrow ml-auto font-18"
                        }
                      ></em>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={"1"} className="p-3">
                      <div className="">
                        <h6 className="font-14 font-weight-bold mb-2">
                          {lang("SECURITY.RECOVERY_TEXT")}
                        </h6>
                        <p className="font-12 mb-3">
                          {lang("SECURITY.RECOVERY_SUB_TEXT")}
                        </p>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <div className="d-flex justify-content-center align-items-center">
                          <div className="material-icons mr-2 font-24 text-gray-darker">
                            phone
                          </div>
                          <div className="d-flex flex-column">
                          <p className="font-14-500 mb-0 flex-grow-1">
                            {lang("SECURITY.RECOVERY_NUMBER")}
                          </p>
                          <p className="font-14 mb-0 flex-grow-1 text-gray-darker">
                           {(userInfo?.recoveryPhone || lang("COMMON.NOT_PROVIDED"))}
                          </p>
                          </div>
                          </div>
                          <Button
                            variant="btn btn-primary btn-sm py-2 px-3 font-12"
                            onClick={() => {
                              dispatch(toggleModals({ verifyPassword: true,recoverType:"phone" }));
                            }}
                          >
                             {(userInfo?.recoveryPhone)?lang("COMMON.UPDATE"):lang("SECURITY.ADD")}
                          </Button>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <div className="d-flex justify-content-center align-items-center">
                          <div className="material-icons mr-2 font-24 text-gray-darker">
                            email
                          </div>
                          <div className="d-flex flex-column">
                          <p className="font-14-500 mb-0 flex-grow-1">
                            {lang("SECURITY.RECOVERY_EMAIL")}
                          </p>
                          <p className="font-14 mb-0 flex-grow-1 text-gray-darker">
                           {(userInfo?.recoveryEmail || lang("COMMON.NOT_PROVIDED"))}
                          </p>
                          </div>
                          </div>
                          <Button
                            variant="btn btn-primary btn-sm py-2 px-3 font-12"
                            onClick={() => {
                              dispatch(toggleModals({ verifyPassword: true,recoverType:"email" }));
                            }}
                          >
                            {(userInfo?.recoveryEmail)?lang("COMMON.UPDATE"):lang("SECURITY.ADD")}
                          </Button>
                        </div>

                      </div>
                    </Accordion.Collapse>
                  </Accordion>

                  <Accordion
                    activeKey={accordianState[2]}
                    className="security-accordion mb-3"
                  >
                    <Accordion.Toggle
                      variant="link"
                      eventKey={"3"}
                      className="p-3 d-flex align-items-center accodion-btn-title"
                      onClick={() => {
                        const activeStates = [...accordianState];
                        activeStates[2] = activeStates[2] == "3" ? "" : "3";
                        setAccordianState(activeStates);
                      }}
                    >
                      {" "}
                      <span class="bx bxs-check-circle mr-2 font-20 text-primary"></span>
                      <h5 className="mb-0 font-16 font-weight-bold font-sm-14">
                        {lang("SECURITY.YOUR_DEVICES")}
                      </h5>
                      <em
                        className={
                          accordianState[2]
                            ? "icon icon-down-arrow ml-auto font-18 rotate-top"
                            : "icon icon-down-arrow ml-auto font-18"
                        }
                      ></em>
                    </Accordion.Toggle>
                    <Accordion.Collapse
                      eventKey={"3"}
                      className="px-3 pt-3 pb-2"
                    >
                      <>
                        <div>
                          <h6 className="font-14 font-weight-bold mb-2">
                            {lang("SECURITY.WHERE_YOU_SIGNED_IN")}
                          </h6>
                          <ul className="list-unstyled mb-0">
                            {newLoginsList?.map((loginData) => (
                              <li className="py-12 font-14 d-flex align-items-center">
                                <p className="mb-0 flex-grow-1">
                                  <b>
                                    {moment(loginData?.date).format("MMM D")}
                                  </b>{" "}
                                  {`${lang("COMMON.NEW_SIGN_IN_ON")} ${
                                    loginData?.deviceType
                                  }`}
                                </p>
                                <span className="font-12 text-gray-darker">
                                  {`${loginData?.country}`}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        {newLoginsList.length < totalNL && (
                          <div
                            className="font-14px-primary font-weight-600 text-center pointer"
                            onClick={() => {
                              setNewLoginsPagesize((prev) => prev + 10);
                            }}
                          >
                            {lang("COMMON.LOAD_MORE")}
                          </div>
                        )}
                      </>
                    </Accordion.Collapse>
                  </Accordion>

                  <Accordion
                    activeKey={accordianState[3]}
                    className="security-accordion"
                  >
                    <Accordion.Toggle
                      variant="link"
                      eventKey={"4"}
                      className="p-3 d-flex align-items-center accodion-btn-title"
                      onClick={() => {
                        const activeStates = [...accordianState];
                        activeStates[3] = activeStates[3] == "4" ? "" : "4";
                        setAccordianState(activeStates);
                      }}
                    >
                      {" "}
                      <span class="bx bxs-check-circle mr-2 font-20 text-primary"></span>
                      <h5 className="mb-0 font-16 font-weight-bold font-sm-14">
                        {lang("SECURITY.RECENT_SECURITY_ACTIVITY")}
                      </h5>
                      <em
                        className={
                          accordianState[3]
                            ? "icon icon-down-arrow ml-auto font-18 rotate-top"
                            : "icon icon-down-arrow ml-auto font-18"
                        }
                      ></em>
                    </Accordion.Toggle>
                    <Accordion.Collapse
                      eventKey={"4"}
                      className="px-3 pt-3 pb-2"
                    >
                      <>
                        <div>
                          <h6 className="font-14 font-weight-bold mb-2">
                            {" "}
                            {lang("SECURITY.ACTIVITY_FROM_28_DAYS")}
                          </h6>
                          <ul className="list-unstyled mb-0">
                            {securityActivitiesList?.map((saDetail) => (
                              <li className="py-12 font-14 d-flex align-items-center">
                                <p className="mb-0 flex-grow-1">
                                  <b>
                                    {moment(saDetail?.date).format("MMM D")}
                                  </b>{" "}
                                  {saDetail?.activityType == "new_login"
                                    ? `${lang("COMMON.NEW_SIGN_IN_ON")} ${
                                        saDetail?.deviceType
                                      }`
                                    : `${lang("COMMON.PASSWORD_CHANGED_ON")} ${
                                        saDetail?.deviceType
                                      }`}
                                </p>
                                <span className="font-12 text-gray-darker">
                                  {`${saDetail?.country}`}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        {securityActivitiesList.length < totalSA && (
                          <div
                            className="font-14px-primary font-weight-600 text-center pointer"
                            onClick={() => {
                              setSecurityActivitiesPagesize(
                                (prev) => prev + 10
                              );
                            }}
                          >
                            {lang("COMMON.LOAD_MORE")}
                          </div>
                        )}
                      </>
                    </Accordion.Collapse>
                  </Accordion>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <MainModal
          className="add-to-gmodal modal"
          show={verifyPassword}
          keyModal="verifyPassword"
          body={<VerfiyPasswordModal />}
          headerClassName="mb-50 block md-mb-30"
          header={
            <h2 className="h6 mb-0">{lang("COMMON.PASSWORD_VERIFICATION")}</h2>
          }
        />
         <MainModal
          className="add-to-gmodal modal"
          show={recoveryFieldEdit}
          keyModal="recoveryFieldEdit"
          body={<RecoveryFieldModal />}
          headerClassName="mb-50 block md-mb-30"
          header={
            <h2 className="h6 mb-0">{lang("COMMON.RECOVERY_FIELD_UPDATION")}</h2>
          }
        />
      </div>
    </Layout>
  );
};

export default WithAuth(SecurityCheckUp);
