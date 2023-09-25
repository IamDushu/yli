import React from "react";
import { Card, Button, Col, Container, Row } from "react-bootstrap";
import { imagePreferenceHandler, lastNameHandler, onImageError } from "utils";
import { Link } from "../../routes";
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
                <Row className="custom-col-box four-grid-spacing-md row-col-10">
                  {searchData?.searchResults?.users?.rows?.map((user, key) => {
                    return (
                      key <= 3 &&
                      !showAll.people && (
                        <Col md={4} xl={3} key={user?.id} className="mb-sm-3">
                          <Card className="text-center position-relative h-100 myconnection-card overflow-hidden">
                            <Card.Header className="p-0">
                              <Link route={`/profile/${user.profileId}`}>
                                <div
                                  style={{
                                    backgroundImage: `url(${
                                      user?.profileBgURL ??
                                      "../../assets/images/dashboard/cover-background-2.jpg"
                                    })`,
                                    borderRadius: "8px 8px 0px 0px",
                                  }}
                                  className="position-relative connection-user-cover-img"
                                >
                                  <div className="d-flex mx-auto">
                                    <div className="user-profile-pic flex-shrink-0 w-h-70 border-0 rounded-pill pointer">
                                      <img
                                        src={user?.profilePicURL || ""}
                                        className="d-flex img-fluid w-100 h-100"
                                        onError={(e) => {
                                          onImageError(
                                            e,
                                            "profile",
                                            `${user?.firstName} ${user?.lastName}`
                                          );
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </Card.Header>
                            <Card.Body className="d-flex flex-column h-100 p-0 pt-1 myconnection-body">
                              {/* <div className="d-flex flex-column h-100"> */}
                              <Card.Title className="mb-1">
                                <Link route={`/profile/${user.profileId}`}>
                                  {/* <h5 className="text-body-14 mb-1 text-ellipsis pointer"> */}
                                  <h5 className="text-body-14 mb-0 text-ellipsis pointer">
                                    {user.firstName}{" "}
                                    {lastNameHandler(
                                      user,
                                      user.lastNameVisibility,
                                      userData
                                    )
                                      ? user.lastName
                                      : ""}
                                  </h5>
                                </Link>
                              </Card.Title>
                              {/* <p className="text-body-12 font-weight-normal text-secondary mb-2 text-ellipsis">
                                    {user?.role?.join(",")}
                                  </p> */}
                              <div className="mb-0 px-2">
                                <p className="mb-1 text-gray-darker font-12 text-ellipsis">
                                  {user?.currentPosition ?? "No Position Added"}
                                </p>
                                <p className="text-body-12 mb-2 text-gray-darker text-ellipsis">
                                  {user?.mutualCount}{" "}
                                  {lang("CONNECTIONS.MUTUAL_CONTACTS")}
                                </p>
                              </div>

                              {user.id !== userId && (
                                <div className="text-gary font-medium mb-2 d-flex px-2">
                                  {user?.connectionDetails?.isConnection && (
                                    <>
                                      {/* <Button
                                        variant="btn btn-outline-info mb-2 w-100"
                                        onClick={() =>
                                          deleteConnection(user?.id)
                                        }
                                      >
                                        {lang("COMMON.MESSAGE")}
                                      </Button>
                                      <Button
                                        variant="btn btn-outline-info mb-2 w-100"
                                        onClick={() =>
                                          history.push(
                                            `/profile/${user.profileId}`
                                          )
                                        }
                                      >
                                        {lang("HEADER.VIEW_PROFILE")}
                                      </Button> */}
                                    </>
                                  )}
                                  {!user?.connectionDetails?.isConnection &&
                                    user?.connectionDetails?.status ===
                                      null && (
                                      <Button
                                        className="mb-1"
                                        title="Connect"
                                        variant="btn btn-outline-primary mr-1 btn-small-icon w-100"
                                        onClick={() => {
                                          sendConnection(user?.id);
                                        }}
                                      >
                                        <Connect />
                                        <span> {lang("COMMON.CONNECT")} </span>
                                      </Button>
                                    )}
                                  {user?.connectionDetails?.status ===
                                    "requested" &&
                                    user?.connectionDetails?.isConnection ===
                                      false && (
                                      <Button
                                        title="Withdraw"
                                        variant="btn btn-outline-primary mr-1 btn-small-icon w-100"
                                        onClick={() => {
                                          withdrawRequest(
                                            user?.connectionDetails?.id
                                          );
                                        }}
                                      >
                                        <CrossIcon />
                                        {lang("COMMON.WITHDRAW")}
                                      </Button>
                                    )}
                                  {!user?.connectionDetails?.isfollow && (
                                    <Button
                                      title="Follow"
                                      variant="btn btn-outline-primary btn-small-icon w-100"
                                      onClick={() => {
                                        followRequest(user?.id);
                                      }}
                                    >
                                      <Follow />
                                      {lang("COMMON.FOLLOW")}
                                    </Button>
                                  )}

                                  {user?.connectionDetails?.isfollow && (
                                    <Button
                                      title="Unfollow"
                                      variant="btn btn-outline-primary btn-small-icon w-100"
                                      onClick={() => {
                                        unfollowRequest(user?.id);
                                      }}
                                    >
                                      <UnFollow />
                                      {lang("COMMON.UNFOLLOW")}
                                    </Button>
                                  )}
                                </div>
                              )}
                              {/* </div> */}
                            </Card.Body>
                          </Card>
                        </Col>
                      )
                    );
                  })}
                  {searchData?.searchResults?.users?.rows?.map((user, key) => {
                    return (
                      showAll.people && (
                        <Col md={4} xl={3} key={user?.id} className="mb-sm-3">
                          <Card className="text-center position-relative h-100 myconnection-card overflow-hidden">
                            <Card.Header className="p-0">
                              <Link route={`/profile/${user.profileId}`}>
                                <div
                                  style={{
                                    backgroundImage: `url(${
                                      user?.profileBgURL ??
                                      "../../assets/images/dashboard/cover-background-2.jpg"
                                    })`,
                                    borderRadius: "8px 8px 0px 0px",
                                  }}
                                  className="position-relative connection-user-cover-img"
                                >
                                  <div className="d-flex mx-auto">
                                    <div className="user-profile-pic flex-shrink-0 w-h-70 border-0 rounded-pill pointer">
                                      <img
                                        src={user?.profilePicURL || ""}
                                        className="d-flex img-fluid w-100 h-100"
                                        onError={(e) => {
                                          onImageError(
                                            e,
                                            "profile",
                                            `${user?.firstName} ${user?.lastName}`
                                          );
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </Card.Header>
                            <Card.Body className="d-flex flex-column h-100 p-0 pt-1 myconnection-body">
                              {/* <div className="d-flex flex-column h-100"> */}
                              <Card.Title className="mb-1">
                                <Link route={`/profile/${user.profileId}`}>
                                  <h5 className="text-body-14 mb-0 text-ellipsis pointer">
                                    {user.firstName}{" "}
                                    {lastNameHandler(
                                      user,
                                      user.lastNameVisibility,
                                      userData
                                    )
                                      ? user.lastName
                                      : ""}
                                  </h5>
                                </Link>
                              </Card.Title>
                              <div className="mb-0 px-2">
                                <p className="mb-1 text-gray-darker font-12 text-ellipsis">
                                  {user?.currentPosition ?? "No Position Added"}
                                </p>
                                <p className="text-body-12 mb-2 text-gray-darker text-ellipsis">
                                  {user?.mutualCount}{" "}
                                  {lang("CONNECTIONS.MUTUAL_CONTACTS")}
                                </p>
                              </div>

                              {user.id !== userId && (
                                <div className="text-gary font-medium mb-3 d-flex px-2">
                                  {user?.connectionDetails?.isConnection && (
                                    <>
                                      {/* <Button
                                        variant="btn btn-outline-info mb-2 w-100"
                                        onClick={() =>
                                          deleteConnection(user?.id)
                                        }
                                      >
                                        {lang("COMMON.MESSAGE")}
                                      </Button>
                                      <Button
                                        variant="btn btn-outline-info mb-2 w-100"
                                        onClick={() =>
                                          history.push(
                                            `/profile/${user.profileId}`
                                          )
                                        }
                                      >
                                        {lang("HEADER.VIEW_PROFILE")}
                                      </Button> */}
                                    </>
                                  )}
                                  {!user?.connectionDetails?.isConnection &&
                                    user?.connectionDetails?.status ===
                                      null && (
                                      <Button
                                        title="Follow"
                                        variant="btn btn-outline-primary mr-1 btn-small-icon w-100"
                                        onClick={() => {
                                          sendConnection(user?.id);
                                        }}
                                      >
                                        <Connect />
                                        {lang("COMMON.CONNECT")}
                                      </Button>
                                    )}
                                  {user?.connectionDetails?.status ===
                                    "requested" &&
                                    user?.connectionDetails?.isConnection ===
                                      false && (
                                      <Button
                                        title="Withdraw"
                                        variant="btn btn-outline-primary mr-1 btn-small-icon w-100"
                                        onClick={() => {
                                          withdrawRequest(
                                            user?.connectionDetails?.id
                                          );
                                        }}
                                      >
                                        <CrossIcon />
                                        {lang("COMMON.WITHDRAW")}
                                      </Button>
                                    )}
                                  {!user?.connectionDetails?.isfollow && (
                                    <Button
                                      variant="btn btn-outline-primary btn-small-icon w-100"
                                      onClick={() => {
                                        followRequest(user?.id);
                                      }}
                                    >
                                      <Follow />
                                      {lang("COMMON.FOLLOW")}
                                    </Button>
                                  )}

                                  {user?.connectionDetails?.isfollow && (
                                    <Button
                                      title="Unfollow"
                                      variant="btn btn-outline-primary btn-small-icon w-100"
                                      onClick={() => {
                                        unfollowRequest(user?.id);
                                      }}
                                    >
                                      <UnFollow />
                                      {lang("COMMON.UNFOLLOW")}
                                    </Button>
                                  )}
                                </div>
                              )}
                            </Card.Body>
                          </Card>
                        </Col>
                      )
                    );
                  })}
                </Row>
              </Container>

              {searchData?.searchResults?.users?.rows.length > 4 && (
                <div className="people-tab-view-all-button border-top border-geyser mt-2">
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
