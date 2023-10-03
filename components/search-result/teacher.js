import React from "react";
import { Card, Button, Col, Container, Row } from "react-bootstrap";
import { getFullName } from "utils";
import UserCard from "../UserCard";
import { YliwayButton } from "../button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Teacher = ({
  lang,
  selectedFilters,
  searchData,
  followRequest,
  unfollowRequest,
  deleteConnection,
  sendConnection,
  setShowAll,
  showAll,
  withdrawRequest,
  userId,
  userData,
  router,
}) => {
  return (
    <div style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}>
      {(selectedFilters.length === 0 ||
        selectedFilters.includes(lang("GLOBAL_SEARCH.FILTER.TEACHER"))) &&
        searchData?.searchResults?.teacher?.rows.length > 0 && (
          <Card className="mb-4">
            <Card.Body className="p-3">
              <h3
                className="mb-0 pl-2 py-1"
                style={{
                  fontSize: "16px",
                  color: "#001551",
                  fontWeight: "500",
                  lineHeight: "24px",
                }}
              >
                {lang("GLOBAL_SEARCH.FILTER.TEACHER")}
              </h3>

              <div className="d-flex justify-content-around pl-2 pr-1 mt-2">
                <Container fluid>
                  <Row className="custom-col-box two-grid-spacing-md row-col-4">
                    {searchData?.searchResults?.teacher?.rows?.map(
                      (teacher, key) => {
                        return (
                          key <= 5 &&
                          !showAll.teacher && (
                            <Col
                              xs={4}
                              md={4}
                              lg={2}
                              key={key}
                              className="p-0 d-flex justify-content-center mb-2 "
                            >
                              <UserCard
                                key={key}
                                coverImage={teacher?.profileBgURL}
                                profileImage={teacher?.profilePicURL}
                                name={getFullName(teacher)}
                                position={
                                  teacher?.currentPosition ||
                                  "No Position Added"
                                }
                                mutualCountText={`${
                                  teacher?.mutualCount
                                } ${lang("CONNECTIONS.MUTUAL_CONTACTS")}`}
                                profileurl={`/profile/${teacher?.profileId}`}
                                renderFooter={() => (
                                  <React.Fragment>
                                    {!teacher?.connectionDetails
                                      ?.isConnection &&
                                      teacher?.connectionDetails?.status ===
                                        null && (
                                        <YliwayButton
                                          title={lang("CONNECTIONS.CONNECT")}
                                          primary
                                          handleClick={() => {
                                            sendConnection(teacher?.id);
                                          }}
                                          label={lang("CONNECTIONS.CONNECT")}
                                          size="extra-small"
                                          style={{
                                            padding: !teacher?.connectionDetails
                                              ?.isConnection
                                              ? "0.05rem 0.2rem"
                                              : "0.05rem 0.4rem",
                                          }}
                                        />
                                      )}
                                    {teacher?.connectionDetails?.status ===
                                      "requested" &&
                                      teacher?.connectionDetails
                                        ?.isConnection === false && (
                                        <YliwayButton
                                          title={lang("CONNECTIONS.WITHDRAW")}
                                          primary
                                          handleClick={() => {
                                            withdrawRequest(
                                              teacher?.connectionDetails?.id
                                            );
                                          }}
                                          label={lang("CONNECTIONS.WITHDRAW")}
                                          size="extra-small"
                                          style={{
                                            padding: !teacher?.connectionDetails
                                              ?.isConnection
                                              ? "0.05rem 0.2rem"
                                              : "0.05rem 0.4rem",
                                          }}
                                        />
                                      )}

                                    <YliwayButton
                                      title={
                                        teacher?.connectionDetails?.isfollow
                                          ? lang("CONNECTIONS.UN_FOLLOW")
                                          : lang("CONNECTIONS.FOLLOW")
                                      }
                                      handleClick={() =>
                                        teacher?.connectionDetails?.isfollow
                                          ? unfollowRequest(teacher?.id)
                                          : followRequest(teacher?.id)
                                      }
                                      label={
                                        teacher?.connectionDetails?.isfollow
                                          ? lang("CONNECTIONS.UN_FOLLOW")
                                          : lang("CONNECTIONS.FOLLOW")
                                      }
                                      size="extra-small"
                                      style={{
                                        color: "#6750a4",
                                        boxShadow: "none",
                                        padding: "0rem",
                                        "min-width": "30px",
                                      }}
                                    />
                                  </React.Fragment>
                                )}
                              />
                            </Col>
                          )
                        );
                      }
                    )}
                    {searchData?.searchResults?.teacher?.rows?.map(
                      (teacher, key) => {
                        return (
                          showAll.teacher && (
                            <Col
                              xs={4}
                              md={4}
                              lg={2}
                              key={key}
                              className="p-0 d-flex justify-content-center mb-2"
                            >
                              <UserCard
                                key={key}
                                coverImage={teacher?.profileBgURL}
                                profileImage={teacher?.profilePicURL}
                                name={getFullName(teacher)}
                                position={
                                  teacher?.currentPosition ||
                                  "No Position Added"
                                }
                                mutualCountText={`${
                                  teacher?.mutualCount
                                } ${lang("CONNECTIONS.MUTUAL_CONTACTS")}`}
                                profileurl={`/profile/${teacher?.profileId}`}
                                renderFooter={() => (
                                  <React.Fragment>
                                    {!teacher?.connectionDetails
                                      ?.isConnection &&
                                      teacher?.connectionDetails?.status ===
                                        null && (
                                        <YliwayButton
                                          title={lang("CONNECTIONS.CONNECT")}
                                          primary
                                          handleClick={() => {
                                            sendConnection(teacher?.id);
                                          }}
                                          label={lang("CONNECTIONS.CONNECT")}
                                          size="extra-small"
                                          style={{
                                            padding: !teacher?.connectionDetails
                                              ?.isConnection
                                              ? "0.05rem 0.3rem"
                                              : "0.05rem 0.5rem",
                                          }}
                                        />
                                      )}
                                    {teacher?.connectionDetails?.status ===
                                      "requested" &&
                                      teacher?.connectionDetails
                                        ?.isConnection === false && (
                                        <YliwayButton
                                          title={lang("CONNECTIONS.WITHDRAW")}
                                          primary
                                          handleClick={() => {
                                            withdrawRequest(
                                              teacher?.connectionDetails?.id
                                            );
                                          }}
                                          label={lang("CONNECTIONS.WITHDRAW")}
                                          size="extra-small"
                                          style={{
                                            padding: !teacher?.connectionDetails
                                              ?.isConnection
                                              ? "0.05rem 0.3rem"
                                              : "0.05rem 0.5rem",
                                          }}
                                        />
                                      )}

                                    <YliwayButton
                                      title={
                                        teacher?.connectionDetails?.isfollow
                                          ? lang("CONNECTIONS.UN_FOLLOW")
                                          : lang("CONNECTIONS.FOLLOW")
                                      }
                                      handleClick={() =>
                                        teacher?.connectionDetails?.isfollow
                                          ? unfollowRequest(teacher?.id)
                                          : followRequest(teacher?.id)
                                      }
                                      label={
                                        teacher?.connectionDetails?.isfollow
                                          ? lang("CONNECTIONS.UN_FOLLOW")
                                          : lang("CONNECTIONS.FOLLOW")
                                      }
                                      size="extra-small"
                                      style={{
                                        color: "#6750a4",
                                        boxShadow: "none",
                                        padding: teacher?.connectionDetails
                                          ?.isfollow
                                          ? "0.05rem 0.2rem"
                                          : "0.05rem 0.5rem",
                                        color: "#6750a4",
                                        boxShadow: "none",
                                        padding: "0rem",
                                        "min-width": "30px",
                                      }}
                                    />
                                  </React.Fragment>
                                )}
                              />
                            </Col>
                          )
                        );
                      }
                    )}
                  </Row>
                </Container>
              </div>

              {searchData?.searchResults?.teacher?.rows.length > 4 && (
                <div className="people-tab-view-all-button border-geyser d-flex justify-content-center">
                  <span
                    className="people-tab-view-all-button-text py-2 d-flex ml-2 align-items-center"
                    onClick={() => {
                      setShowAll({
                        ...showAll,
                        teacher: !showAll.teacher,
                      });
                    }}
                  >
                    {!showAll.teacher ? (
                      <>
                        <AddIcon fontSize="small" />
                        <span className="ml-2">{lang("COMMON.VIEW_ALL")}</span>
                      </>
                    ) : (
                      <>
                        <RemoveIcon fontSize="small" />
                        <span className="ml-2">{lang("COMMON.VIEW_LESS")}</span>
                      </>
                    )}
                  </span>
                </div>
              )}
            </Card.Body>
          </Card>
        )}

      {selectedFilters.includes(lang("GLOBAL_SEARCH.FILTER.TEACHER")) &&
        searchData?.searchResults?.teacher?.rows.length === 0 && <></>}
    </div>
  );
};

export default Teacher;
