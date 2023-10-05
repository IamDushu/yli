import React from "react";
import { Card, Button, Col, Container, Row } from "react-bootstrap";
import { getFullName } from "utils";
import UserCard from "../UserCard";
import { YliwayButton } from "../button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import NoSearchResult from "./noSearchResult";
const Host = ({
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
        selectedFilters.includes(lang("GLOBAL_SEARCH.FILTER.YLI_GUIDES"))) &&
        searchData?.searchResults?.host?.rows.length > 0 && (
          <Card className="mb-4">
            <Card.Body
              className={
                searchData?.searchResults?.host?.rows.length > 4
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
                {lang("GLOBAL_SEARCH.FILTER.YLI_GUIDES")}
              </h3>

              <div className="d-flex justify-content-around mt-2 pl-4 pr-21">
                <Container fluid className="p-0">
                  <div
                    style={{
                      columnGap: "0.5rem",
                      rowGap: "1.5rem",
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent:
                        searchData?.searchResults?.trainer?.rows.length > 4
                          ? "space-between"
                          : "flex-start",
                    }}
                  >
                    {searchData?.searchResults?.host?.rows?.map((host, key) => {
                      return (
                        key <= 4 &&
                        !showAll.host && (
                          <UserCard
                            key={key}
                            coverImage={host?.profileBgURL}
                            profileImage={host?.profilePicURL}
                            rating={host?.rating || 0}
                            name={getFullName(host)}
                            position={
                              host?.currentPosition ||
                              lang("COMMON.NO_POSITION_ADDED")
                            }
                            mutualCountText={`${host?.mutualCount} ${lang(
                              "CONNECTIONS.MUTUAL_CONTACTS"
                            )}`}
                            profileurl={`/profile/${host?.profileId}`}
                            renderFooter={() => (
                              <React.Fragment>
                                {!host?.connectionDetails?.isConnection &&
                                  host?.connectionDetails?.status === null && (
                                    <YliwayButton
                                      title={lang("CONNECTIONS.CONNECT")}
                                      primary
                                      handleClick={() => {
                                        sendConnection(host?.id);
                                      }}
                                      label={lang("CONNECTIONS.CONNECT")}
                                      size="extra-small"
                                      style={{
                                        padding: !host?.connectionDetails
                                          ?.isConnection
                                          ? "0.05rem 0.2rem"
                                          : "0.05rem 0.4rem",
                                      }}
                                    />
                                  )}
                                {host?.connectionDetails?.status ===
                                  "requested" &&
                                  host?.connectionDetails?.isConnection ===
                                    false && (
                                    <YliwayButton
                                      title={lang("CONNECTIONS.WITHDRAW")}
                                      primary
                                      handleClick={() => {
                                        withdrawRequest(
                                          host?.connectionDetails?.id
                                        );
                                      }}
                                      label={lang("CONNECTIONS.WITHDRAW")}
                                      size="extra-small"
                                      style={{
                                        padding: !host?.connectionDetails
                                          ?.isConnection
                                          ? "0.05rem 0.2rem"
                                          : "0.05rem 0.4rem",
                                      }}
                                    />
                                  )}

                                <YliwayButton
                                  title={
                                    host?.connectionDetails?.isfollow
                                      ? lang("CONNECTIONS.UN_FOLLOW")
                                      : lang("CONNECTIONS.FOLLOW")
                                  }
                                  handleClick={() =>
                                    host?.connectionDetails?.isfollow
                                      ? unfollowRequest(host?.id)
                                      : followRequest(host?.id)
                                  }
                                  label={
                                    host?.connectionDetails?.isfollow
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
                    })}
                    {searchData?.searchResults?.host?.rows?.map((host, key) => {
                      return (
                        showAll.host && (
                          <UserCard
                            key={key}
                            coverImage={host?.profileBgURL}
                            profileImage={host?.profilePicURL}
                            rating={host?.rating || 0}
                            name={getFullName(host)}
                            position={
                              host?.currentPosition ||
                              lang("COMMON.NO_POSITION_ADDED")
                            }
                            mutualCountText={`${host?.mutualCount} ${lang(
                              "CONNECTIONS.MUTUAL_CONTACTS"
                            )}`}
                            profileurl={`/profile/${host?.profileId}`}
                            renderFooter={() => (
                              <React.Fragment>
                                {!host?.connectionDetails?.isConnection &&
                                  host?.connectionDetails?.status === null && (
                                    <YliwayButton
                                      title={lang("CONNECTIONS.CONNECT")}
                                      primary
                                      handleClick={() => {
                                        sendConnection(host?.id);
                                      }}
                                      label={lang("CONNECTIONS.CONNECT")}
                                      size="extra-small"
                                      style={{
                                        padding: !host?.connectionDetails
                                          ?.isConnection
                                          ? "0.05rem 0.3rem"
                                          : "0.05rem 0.5rem",
                                      }}
                                    />
                                  )}
                                {host?.connectionDetails?.status ===
                                  "requested" &&
                                  host?.connectionDetails?.isConnection ===
                                    false && (
                                    <YliwayButton
                                      title={lang("CONNECTIONS.WITHDRAW")}
                                      primary
                                      handleClick={() => {
                                        withdrawRequest(
                                          host?.connectionDetails?.id
                                        );
                                      }}
                                      label={lang("CONNECTIONS.WITHDRAW")}
                                      size="extra-small"
                                      style={{
                                        padding: !host?.connectionDetails
                                          ?.isConnection
                                          ? "0.05rem 0.3rem"
                                          : "0.05rem 0.5rem",
                                      }}
                                    />
                                  )}

                                <YliwayButton
                                  title={
                                    host?.connectionDetails?.isfollow
                                      ? lang("CONNECTIONS.UN_FOLLOW")
                                      : lang("CONNECTIONS.FOLLOW")
                                  }
                                  handleClick={() =>
                                    host?.connectionDetails?.isfollow
                                      ? unfollowRequest(host?.id)
                                      : followRequest(host?.id)
                                  }
                                  label={
                                    host?.connectionDetails?.isfollow
                                      ? lang("CONNECTIONS.UN_FOLLOW")
                                      : lang("CONNECTIONS.FOLLOW")
                                  }
                                  size="extra-small"
                                  style={{
                                    color: "#6750a4",
                                    boxShadow: "none",
                                    padding: host?.connectionDetails?.isfollow
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
                    })}
                  </div>
                </Container>
              </div>

              {searchData?.searchResults?.host?.rows.length > 4 && (
                <div className="people-tab-view-all-button border-geyser d-flex justify-content-center">
                  <span
                    className="people-tab-view-all-button-text py-3 d-flex ml-2 align-items-center"
                    onClick={() => {
                      setShowAll({
                        ...showAll,
                        host: !showAll.host,
                      });
                    }}
                  >
                    {!showAll.host ? (
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

      {selectedFilters.includes(lang("GLOBAL_SEARCH.FILTER.YLI_GUIDES")) &&
        searchData?.searchResults?.host?.rows.length === 0 && (
          <NoSearchResult lang={lang} />
        )}
    </div>
  );
};

export default Host;
