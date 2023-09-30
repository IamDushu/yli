import React from "react";
import { Card, Button, Col, Container, Row } from "react-bootstrap";
import { getFullName } from "utils";
import UserCard from "../UserCard";
import { YliwayButton } from "../button";

import {
  Follow,
  UnFollow,
  Connect,
  CrossIcon,
} from "components/svg/connections";

const People = ({
  lang,
  selectedFilters,
  searchData,
  followRequest,
  unfollowRequest,
  deleteConnection,
  sendConnection,
  router,
  setShowAll,
  showAll,
  withdrawRequest,
  userId,
  userData,
}) => {
  return (
    <div>
      {(selectedFilters.length === 0 ||
        selectedFilters.includes(lang("GLOBAL_SEARCH.FILTER.PEOPLE"))) &&
        searchData?.searchResults?.users?.rows.length > 0 && (
          <Card className="mb-3">
            <Card.Body className="p-0">
              <h3 className="h6 mb-0 px-3 py-12">
                {lang("GLOBAL_SEARCH.FILTER.PEOPLE")}
              </h3>
              <Container fluid>
                <Row className="custom-col-box two-grid-spacing-md row-col-4">
                  {searchData?.searchResults?.users?.rows?.map((user, key) => {
                    return (
                      key <= 3 &&
                      !showAll.people && (
                        <Col
                          xs={6}
                          md={4}
                          lg={3}
                          key={user?.id}
                          className="mb-sm-3"
                        >
                          <UserCard
                            key={key}
                            coverImage={user?.profileBgURL}
                            profileImage={user?.profilePicURL}
                            name={getFullName(user)}
                            position={
                              user?.currentPosition || "No Position Added"
                            }
                            mutualCountText={`${user?.mutualCount} ${lang(
                              "CONNECTIONS.MUTUAL_CONTACTS"
                            )}`}
                            profileurl={`/profile/${user?.profileId}`}
                            renderFooter={() => (
                              <React.Fragment>
                                {!user?.connectionDetails?.isConnection &&
                                  user?.connectionDetails?.status === null && (
                                    <YliwayButton
                                      title={lang("CONNECTIONS.CONNECT")}
                                      primary
                                      handleClick={() => {
                                        sendConnection(user?.id);
                                      }}
                                      label={lang("CONNECTIONS.CONNECT")}
                                      size="extra-small"
                                      style={{
                                        padding: !user?.connectionDetails
                                          ?.isConnection
                                          ? "0.05rem 0.3rem"
                                          : "0.05rem 0.5rem",
                                      }}
                                    />
                                  )}
                                {user?.connectionDetails?.status ===
                                  "requested" &&
                                  user?.connectionDetails?.isConnection ===
                                    false && (
                                    <YliwayButton
                                      title={lang("CONNECTIONS.WITHDRAW")}
                                      primary
                                      handleClick={() => {
                                        withdrawRequest(
                                          user?.connectionDetails?.id
                                        );
                                      }}
                                      label={lang("CONNECTIONS.WITHDRAW")}
                                      size="extra-small"
                                      style={{
                                        padding: !user?.connectionDetails
                                          ?.isConnection
                                          ? "0.05rem 0.3rem"
                                          : "0.05rem 0.5rem",
                                      }}
                                    />
                                  )}

                                <YliwayButton
                                  title={
                                    user?.connectionDetails?.isfollow
                                      ? lang("CONNECTIONS.UN_FOLLOW")
                                      : lang("CONNECTIONS.FOLLOW")
                                  }
                                  handleClick={() =>
                                    user?.connectionDetails?.isfollow
                                      ? unfollowRequest(user?.id)
                                      : followRequest(user?.id)
                                  }
                                  label={
                                    user?.connectionDetails?.isfollow
                                      ? lang("CONNECTIONS.UN_FOLLOW")
                                      : lang("CONNECTIONS.FOLLOW")
                                  }
                                  size="extra-small"
                                  style={{
                                    color: "#6750a4",
                                    boxShadow: "none",
                                    padding: user?.connectionDetails?.isfollow
                                      ? "0.05rem 0.2rem"
                                      : "0.05rem 0.5rem",
                                  }}
                                />
                              </React.Fragment>
                            )}
                          />
                        </Col>
                      )
                    );
                  })}
                  {searchData?.searchResults?.users?.rows?.map((user, key) => {
                    return (
                      showAll.people && (
                        <Col xs={6} md={4} lg={3} key={user?.id}>
                          <UserCard
                            key={key}
                            coverImage={user?.profileBgURL}
                            profileImage={user?.profilePicURL}
                            name={getFullName(user)}
                            position={
                              user?.currentPosition || "No Position Added"
                            }
                            mutualCountText={`${user?.mutualCount} ${lang(
                              "CONNECTIONS.MUTUAL_CONTACTS"
                            )}`}
                            profileurl={`/profile/${user?.profileId}`}
                            renderFooter={() => (
                              <React.Fragment>
                                {!user?.connectionDetails?.isConnection &&
                                  user?.connectionDetails?.status === null && (
                                    <YliwayButton
                                      title={lang("CONNECTIONS.CONNECT")}
                                      primary
                                      handleClick={() => {
                                        sendConnection(user?.id);
                                      }}
                                      label={lang("CONNECTIONS.CONNECT")}
                                      size="extra-small"
                                      style={{
                                        padding: !user?.connectionDetails
                                          ?.isConnection
                                          ? "0.05rem 0.3rem"
                                          : "0.05rem 0.5rem",
                                      }}
                                    />
                                  )}
                                {user?.connectionDetails?.status ===
                                  "requested" &&
                                  user?.connectionDetails?.isConnection ===
                                    false && (
                                    <YliwayButton
                                      title={lang("CONNECTIONS.WITHDRAW")}
                                      primary
                                      handleClick={() => {
                                        withdrawRequest(
                                          user?.connectionDetails?.id
                                        );
                                      }}
                                      label={lang("CONNECTIONS.WITHDRAW")}
                                      size="extra-small"
                                      style={{
                                        padding: !user?.connectionDetails
                                          ?.isConnection
                                          ? "0.05rem 0.3rem"
                                          : "0.05rem 0.5rem",
                                      }}
                                    />
                                  )}

                                <YliwayButton
                                  title={
                                    user?.connectionDetails?.isfollow
                                      ? lang("CONNECTIONS.UN_FOLLOW")
                                      : lang("CONNECTIONS.FOLLOW")
                                  }
                                  handleClick={() =>
                                    user?.connectionDetails?.isfollow
                                      ? unfollowRequest(user?.id)
                                      : followRequest(user?.id)
                                  }
                                  label={
                                    user?.connectionDetails?.isfollow
                                      ? lang("CONNECTIONS.UN_FOLLOW")
                                      : lang("CONNECTIONS.FOLLOW")
                                  }
                                  size="extra-small"
                                  style={{
                                    color: "#6750a4",
                                    boxShadow: "none",
                                    padding: user?.connectionDetails?.isfollow
                                      ? "0.05rem 0.2rem"
                                      : "0.05rem 0.5rem",
                                  }}
                                />
                              </React.Fragment>
                            )}
                          />
                        </Col>
                      )
                    );
                  })}
                </Row>
              </Container>

              {searchData?.searchResults?.users?.rows.length > 4 && (
                <div className="people-tab-view-all-button border-geyser mt-2">
                  <span
                    className="people-tab-view-all-button-text py-2 d-block"
                    onClick={() => {
                      setShowAll({
                        ...showAll,
                        people: !showAll.people,
                      });
                    }}
                  >
                    {!showAll.people
                      ? lang("COMMON.VIEW_ALL")
                      : lang("COMMON.VIEW_LESS")}
                  </span>
                </div>
              )}
            </Card.Body>
          </Card>
        )}

      {selectedFilters.includes(lang("GLOBAL_SEARCH.FILTER.PEOPLE")) &&
        searchData?.searchResults?.users?.rows.length === 0 && (
          <p>No People Found</p>
        )}
    </div>
  );
};

export default People;
