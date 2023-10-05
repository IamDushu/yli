import React from "react";
import { Card, Button, Col, Container, Row } from "react-bootstrap";
import { getFullName } from "utils";
import UserCard from "../UserCard";
import { YliwayButton } from "../button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

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
    <div style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}>
      {(selectedFilters.length === 0 ||
        selectedFilters.includes(lang("GLOBAL_SEARCH.FILTER.PEOPLE"))) &&
        searchData?.searchResults?.users?.rows.length > 0 && (
          <Card className="mb-4">
            <Card.Body
              className={
                searchData?.searchResults?.users?.rows.length > 4
                  ? "p-0"
                  : "p-0 pb-3"
              }
            >
              <h3
                className="mb-0 pl-3 pt-20"
                style={{
                  fontSize: "16px",
                  color: "#001551",
                  fontWeight: "500",
                  lineHeight: "24px",
                }}
              >
                {lang("GLOBAL_SEARCH.FILTER.PEOPLE")}
              </h3>

              <div className="d-flex justify-content-around  mt-2 pl-4 pr-21">
                <Container fluid className="p-0">
                  <div
                    style={{
                      columnGap: "0.5rem",
                      rowGap: "1.5rem",
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent:
                        searchData?.searchResults?.users?.rows.length > 4
                          ? "space-between"
                          : "flex-start",
                    }}
                  >
                    {searchData?.searchResults?.users?.rows?.map(
                      (user, key) => {
                        return (
                          key <= 4 &&
                          !showAll.people && (
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
                                    user?.connectionDetails?.status ===
                                      null && (
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
                                            ? "0.05rem 0.2rem"
                                            : "0.05rem 0.4rem",
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
                                            ? "0.05rem 0.2rem"
                                            : "0.05rem 0.4rem",
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
                                      padding: "0rem",
                                      "min-width": "30px",
                                    }}
                                  />
                                </React.Fragment>
                              )}
                            />
                          )
                        );
                      }
                    )}
                    {searchData?.searchResults?.users?.rows?.map(
                      (user, key) => {
                        return (
                          showAll.people && (
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
                                    user?.connectionDetails?.status ===
                                      null && (
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
                                      color: "#6750a4",
                                      boxShadow: "none",
                                      padding: "0rem",
                                      "min-width": "30px",
                                    }}
                                  />
                                </React.Fragment>
                              )}
                            />
                          )
                        );
                      }
                    )}
                  </div>
                </Container>
              </div>

              {searchData?.searchResults?.users?.rows.length > 4 && (
                <div className="people-tab-view-all-button border-geyser d-flex justify-content-center">
                  <span
                    className="people-tab-view-all-button-text py-3 d-flex ml-2 align-items-center"
                    onClick={() => {
                      setShowAll({
                        ...showAll,
                        people: !showAll.people,
                      });
                    }}
                  >
                    {!showAll.people ? (
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

      {selectedFilters.includes(lang("GLOBAL_SEARCH.FILTER.PEOPLE")) &&
        searchData?.searchResults?.users?.rows.length === 0 && <></>}
    </div>
  );
};

export default People;
