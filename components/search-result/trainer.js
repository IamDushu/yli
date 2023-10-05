import React from "react";
import { Card, Button, Col, Container, Row } from "react-bootstrap";
import { getFullName } from "utils";
import UserCard from "../UserCard";
import { YliwayButton } from "../button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import NoSearchResult from "./noSearchResult";

const Trainer = ({
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
        selectedFilters.includes(lang("GLOBAL_SEARCH.FILTER.TRAINER"))) &&
        searchData?.searchResults?.trainer?.rows.length > 0 && (
          <Card className="mb-4">
            <Card.Body
              className={
                searchData?.searchResults?.trainer?.rows.length > 4
                  ? "p-0"
                  : "p-0 pb-3"
              }
            >
              <h3
                className="mb-0 pl-2 py-1"
                style={{
                  fontSize: "16px",
                  color: "#001551",
                  fontWeight: "500",
                  lineHeight: "24px",
                }}
              >
                {lang("GLOBAL_SEARCH.FILTER.TRAINER")}
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
                        searchData?.searchResults?.trainer?.rows.length > 4
                          ? "space-between"
                          : "flex-start",
                    }}
                  >
                    {searchData?.searchResults?.trainer?.rows?.map(
                      (trainer, key) => {
                        return (
                          key <= 4 &&
                          !showAll.trainer && (
                            <UserCard
                              key={key}
                              coverImage={trainer?.profileBgURL}
                              profileImage={trainer?.profilePicURL}
                              name={getFullName(trainer)}
                              position={
                                trainer?.currentPosition ||
                                lang("COMMON.NO_POSITION_ADDED")
                              }
                              mutualCountText={`${trainer?.mutualCount} ${lang(
                                "CONNECTIONS.MUTUAL_CONTACTS"
                              )}`}
                              profileurl={`/profile/${trainer?.profileId}`}
                              renderFooter={() => (
                                <React.Fragment>
                                  {!trainer?.connectionDetails?.isConnection &&
                                    trainer?.connectionDetails?.status ===
                                      null && (
                                      <YliwayButton
                                        title={lang("CONNECTIONS.CONNECT")}
                                        primary
                                        handleClick={() => {
                                          sendConnection(trainer?.id);
                                        }}
                                        label={lang("CONNECTIONS.CONNECT")}
                                        size="extra-small"
                                        style={{
                                          padding: !trainer?.connectionDetails
                                            ?.isConnection
                                            ? "0.05rem 0.2rem"
                                            : "0.05rem 0.4rem",
                                        }}
                                      />
                                    )}
                                  {trainer?.connectionDetails?.status ===
                                    "requested" &&
                                    trainer?.connectionDetails?.isConnection ===
                                      false && (
                                      <YliwayButton
                                        title={lang("CONNECTIONS.WITHDRAW")}
                                        primary
                                        handleClick={() => {
                                          withdrawRequest(
                                            trainer?.connectionDetails?.id
                                          );
                                        }}
                                        label={lang("CONNECTIONS.WITHDRAW")}
                                        size="extra-small"
                                        style={{
                                          padding: !trainer?.connectionDetails
                                            ?.isConnection
                                            ? "0.05rem 0.2rem"
                                            : "0.05rem 0.4rem",
                                        }}
                                      />
                                    )}

                                  <YliwayButton
                                    title={
                                      trainer?.connectionDetails?.isfollow
                                        ? lang("CONNECTIONS.UN_FOLLOW")
                                        : lang("CONNECTIONS.FOLLOW")
                                    }
                                    handleClick={() =>
                                      trainer?.connectionDetails?.isfollow
                                        ? unfollowRequest(trainer?.id)
                                        : followRequest(trainer?.id)
                                    }
                                    label={
                                      trainer?.connectionDetails?.isfollow
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
                    {searchData?.searchResults?.trainer?.rows?.map(
                      (trainer, key) => {
                        return (
                          showAll.trainer && (
                            <UserCard
                              key={key}
                              coverImage={trainer?.profileBgURL}
                              profileImage={trainer?.profilePicURL}
                              name={getFullName(trainer)}
                              position={
                                trainer?.currentPosition ||
                                lang("COMMON.NO_POSITION_ADDED")
                              }
                              mutualCountText={`${trainer?.mutualCount} ${lang(
                                "CONNECTIONS.MUTUAL_CONTACTS"
                              )}`}
                              profileurl={`/profile/${trainer?.profileId}`}
                              renderFooter={() => (
                                <React.Fragment>
                                  {!trainer?.connectionDetails?.isConnection &&
                                    trainer?.connectionDetails?.status ===
                                      null && (
                                      <YliwayButton
                                        title={lang("CONNECTIONS.CONNECT")}
                                        primary
                                        handleClick={() => {
                                          sendConnection(trainer?.id);
                                        }}
                                        label={lang("CONNECTIONS.CONNECT")}
                                        size="extra-small"
                                        style={{
                                          padding: !trainer?.connectionDetails
                                            ?.isConnection
                                            ? "0.05rem 0.3rem"
                                            : "0.05rem 0.5rem",
                                        }}
                                      />
                                    )}
                                  {trainer?.connectionDetails?.status ===
                                    "requested" &&
                                    trainer?.connectionDetails?.isConnection ===
                                      false && (
                                      <YliwayButton
                                        title={lang("CONNECTIONS.WITHDRAW")}
                                        primary
                                        handleClick={() => {
                                          withdrawRequest(
                                            trainer?.connectionDetails?.id
                                          );
                                        }}
                                        label={lang("CONNECTIONS.WITHDRAW")}
                                        size="extra-small"
                                        style={{
                                          padding: !trainer?.connectionDetails
                                            ?.isConnection
                                            ? "0.05rem 0.3rem"
                                            : "0.05rem 0.5rem",
                                        }}
                                      />
                                    )}

                                  <YliwayButton
                                    title={
                                      trainer?.connectionDetails?.isfollow
                                        ? lang("CONNECTIONS.UN_FOLLOW")
                                        : lang("CONNECTIONS.FOLLOW")
                                    }
                                    handleClick={() =>
                                      trainer?.connectionDetails?.isfollow
                                        ? unfollowRequest(trainer?.id)
                                        : followRequest(trainer?.id)
                                    }
                                    label={
                                      trainer?.connectionDetails?.isfollow
                                        ? lang("CONNECTIONS.UN_FOLLOW")
                                        : lang("CONNECTIONS.FOLLOW")
                                    }
                                    size="extra-small"
                                    style={{
                                      color: "#6750a4",
                                      boxShadow: "none",
                                      padding: trainer?.connectionDetails
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
                          )
                        );
                      }
                    )}
                  </div>
                </Container>
              </div>

              {searchData?.searchResults?.trainer?.rows.length > 4 && (
                <div className="people-tab-view-all-button border-geyser d-flex justify-content-center">
                  <span
                    className="people-tab-view-all-button-text py-3 d-flex ml-2 align-items-center"
                    onClick={() => {
                      setShowAll({
                        ...showAll,
                        trainer: !showAll.trainer,
                      });
                    }}
                  >
                    {!showAll.trainer ? (
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

      {selectedFilters.includes(lang("GLOBAL_SEARCH.FILTER.TRAINER")) &&
        searchData?.searchResults?.trainer?.rows.length === 0 && (
          <NoSearchResult lang={lang} />
        )}
    </div>
  );
};

export default Trainer;
