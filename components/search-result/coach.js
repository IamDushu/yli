import React from "react";
import { Card, Button, Col, Container, Row } from "react-bootstrap";
import { getFullName } from "utils";
import UserCard from "../UserCard";
import { YliwayButton } from "../button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Coach = ({
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
        selectedFilters.includes(lang("GLOBAL_SEARCH.FILTER.COACH"))) &&
        searchData?.searchResults?.coach?.rows.length > 0 && (
          <Card className="mb-4">
            <Card.Body className="p-0 pb-4">
              <h3
                className="mb-0 pl-3 pt-20"
                style={{
                  fontSize: "16px",
                  color: "#001551",
                  fontWeight: "500",
                  lineHeight: "24px",
                }}
              >
                {lang("GLOBAL_SEARCH.FILTER.COACH")}
              </h3>

              <div className="d-flex justify-content-around  mt-2 pl-4 pr-21">
                <Container fluid>
                  <Row className="custom-col-box two-grid-spacing-md row-col-4">
                    {searchData?.searchResults?.coach?.rows?.map(
                      (coach, key) => {
                        return (
                          key <= 5 &&
                          !showAll.coach && (
                            <Col
                              xs={4}
                              md={4}
                              lg={2}
                              key={key}
                              className="p-0 d-flex justify-content-center mb-2 "
                            >
                              <UserCard
                                key={key}
                                coverImage={coach?.profileBgURL}
                                profileImage={coach?.profilePicURL}
                                name={getFullName(coach)}
                                position={
                                  coach?.currentPosition ||
                                  lang("COMMON.NO_POSITION_ADDED")
                                }
                                mutualCountText={`${coach?.mutualCount} ${lang(
                                  "CONNECTIONS.MUTUAL_CONTACTS"
                                )}`}
                                profileurl={`/profile/${coach?.profileId}`}
                                renderFooter={() => (
                                  <React.Fragment>
                                    {!coach?.connectionDetails?.isConnection &&
                                      coach?.connectionDetails?.status ===
                                        null && (
                                        <YliwayButton
                                          title={lang("CONNECTIONS.CONNECT")}
                                          primary
                                          handleClick={() => {
                                            sendConnection(coach?.id);
                                          }}
                                          label={lang("CONNECTIONS.CONNECT")}
                                          size="extra-small"
                                          style={{
                                            padding: !coach?.connectionDetails
                                              ?.isConnection
                                              ? "0.05rem 0.2rem"
                                              : "0.05rem 0.4rem",
                                          }}
                                        />
                                      )}
                                    {coach?.connectionDetails?.status ===
                                      "requested" &&
                                      coach?.connectionDetails?.isConnection ===
                                        false && (
                                        <YliwayButton
                                          title={lang("CONNECTIONS.WITHDRAW")}
                                          primary
                                          handleClick={() => {
                                            withdrawRequest(
                                              coach?.connectionDetails?.id
                                            );
                                          }}
                                          label={lang("CONNECTIONS.WITHDRAW")}
                                          size="extra-small"
                                          style={{
                                            padding: !coach?.connectionDetails
                                              ?.isConnection
                                              ? "0.05rem 0.2rem"
                                              : "0.05rem 0.4rem",
                                          }}
                                        />
                                      )}

                                    <YliwayButton
                                      title={
                                        coach?.connectionDetails?.isfollow
                                          ? lang("CONNECTIONS.UN_FOLLOW")
                                          : lang("CONNECTIONS.FOLLOW")
                                      }
                                      handleClick={() =>
                                        coach?.connectionDetails?.isfollow
                                          ? unfollowRequest(coach?.id)
                                          : followRequest(coach?.id)
                                      }
                                      label={
                                        coach?.connectionDetails?.isfollow
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
                    {searchData?.searchResults?.coach?.rows?.map(
                      (coach, key) => {
                        return (
                          showAll.coach && (
                            <Col
                              xs={4}
                              md={4}
                              lg={2}
                              key={coach?.id}
                              className="p-0 d-flex justify-content-center mb-2"
                            >
                              <UserCard
                                key={key}
                                coverImage={coach?.profileBgURL}
                                profileImage={coach?.profilePicURL}
                                name={getFullName(coach)}
                                position={
                                  coach?.currentPosition ||
                                  lang("CONNECTIONS.UN_FOLLOW")
                                }
                                mutualCountText={`${coach?.mutualCount} ${lang(
                                  "CONNECTIONS.MUTUAL_CONTACTS"
                                )}`}
                                profileurl={`/profile/${coach?.profileId}`}
                                renderFooter={() => (
                                  <React.Fragment>
                                    {!coach?.connectionDetails?.isConnection &&
                                      coach?.connectionDetails?.status ===
                                        null && (
                                        <YliwayButton
                                          title={lang("CONNECTIONS.CONNECT")}
                                          primary
                                          handleClick={() => {
                                            sendConnection(coach?.id);
                                          }}
                                          label={lang("CONNECTIONS.CONNECT")}
                                          size="extra-small"
                                          style={{
                                            padding: !coach?.connectionDetails
                                              ?.isConnection
                                              ? "0.05rem 0.3rem"
                                              : "0.05rem 0.5rem",
                                          }}
                                        />
                                      )}
                                    {coach?.connectionDetails?.status ===
                                      "requested" &&
                                      coach?.connectionDetails?.isConnection ===
                                        false && (
                                        <YliwayButton
                                          title={lang("CONNECTIONS.WITHDRAW")}
                                          primary
                                          handleClick={() => {
                                            withdrawRequest(
                                              coach?.connectionDetails?.id
                                            );
                                          }}
                                          label={lang("CONNECTIONS.WITHDRAW")}
                                          size="extra-small"
                                          style={{
                                            padding: !coach?.connectionDetails
                                              ?.isConnection
                                              ? "0.05rem 0.3rem"
                                              : "0.05rem 0.5rem",
                                          }}
                                        />
                                      )}

                                    <YliwayButton
                                      title={
                                        coach?.connectionDetails?.isfollow
                                          ? lang("CONNECTIONS.UN_FOLLOW")
                                          : lang("CONNECTIONS.FOLLOW")
                                      }
                                      handleClick={() =>
                                        coach?.connectionDetails?.isfollow
                                          ? unfollowRequest(coach?.id)
                                          : followRequest(coach?.id)
                                      }
                                      label={
                                        coach?.connectionDetails?.isfollow
                                          ? lang("CONNECTIONS.UN_FOLLOW")
                                          : lang("CONNECTIONS.FOLLOW")
                                      }
                                      size="extra-small"
                                      style={{
                                        color: "#6750a4",
                                        boxShadow: "none",
                                        padding: coach?.connectionDetails
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

              {searchData?.searchResults?.coach?.rows.length > 4 && (
                <div className="people-tab-view-all-button border-geyser d-flex justify-content-center">
                  <span
                    className="people-tab-view-all-button-text py-2 d-flex ml-2 align-items-center"
                    onClick={() => {
                      setShowAll({
                        ...showAll,
                        coach: !showAll.coach,
                      });
                    }}
                  >
                    {!showAll.coach ? (
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

      {selectedFilters.includes(lang("GLOBAL_SEARCH.FILTER.COACH")) &&
        searchData?.searchResults?.coach?.rows.length === 0 && <></>}
    </div>
  );
};

export default Coach;
