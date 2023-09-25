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
    <div>
      {(selectedFilters.length === 0 ||
        selectedFilters.includes(lang("GLOBAL_SEARCH.FILTER.TRAINER"))) &&
        searchData?.searchResults?.trainer?.rows.length > 0 && (
          <Card className="mb-3">
            <Card.Body className="p-0">
              <h3 className="h6 mb-0 px-3 py-12">
                {lang("GLOBAL_SEARCH.FILTER.TRAINER")}
              </h3>
              <Container fluid>
                <Row className="custom-col-box four-grid-spacing-md row-col-10">
                  {searchData?.searchResults?.trainer?.rows?.map(
                    (teacher, key) => {
                      return (
                        (key <= 3) & !showAll.trainer && (
                          <Col
                            md={4}
                            xl={3}
                            key={teacher?.id}
                            className="mb-sm-3"
                          >
                            <Card className="text-center position-relative h-100 myconnection-card overflow-hidden">
                              <Card.Header className="p-0">
                                <Link route={`/profile/${teacher?.profileId}`}>
                                  <div
                                    style={{
                                      backgroundImage: `url(${
                                        teacher?.profileBgURL ??
                                        "../../assets/images/dashboard/cover-background-2.jpg"
                                      })`,
                                      borderRadius: "8px 8px 0px 0px",
                                    }}
                                    className="position-relative connection-user-cover-img"
                                  >
                                    <div className="d-flex mx-auto">
                                      <div className="user-profile-pic flex-shrink-0 w-h-70 border-0 rounded-pill pointer">
                                        <img
                                          src={teacher?.profilePicURL || ""}
                                          className="d-flex img-fluid w-100 h-100"
                                          onError={(e) => {
                                            onImageError(
                                              e,
                                              "profile",
                                              `${teacher?.firstName} ${teacher?.lastName}`
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
                                {/* <div> */}
                                <Card.Title className="mb-1">
                                  <Link route={`/profile/${teacher.profileId}`}>
                                    <h5 className="text-body-14 mb-0 text-ellipsis pointer">
                                      {teacher.firstName}{" "}
                                      {lastNameHandler(
                                        teacher,
                                        teacher.lastNameVisibility,
                                        userData
                                      )
                                        ? teacher.lastName
                                        : ""}
                                    </h5>
                                  </Link>
                                </Card.Title>
                                <div className="mb-0 px-2">
                                  <p className="mb-1 text-gray-darker font-12 text-ellipsis">
                                    {teacher?.currentPosition?.trim()
                                      ? teacher?.currentPosition
                                      : "No Position Added"}
                                  </p>
                                  <p className="text-body-12 mb-2 text-gray-darker text-ellipsis">
                                    {teacher?.mutualCount}{" "}
                                    {lang("CONNECTIONS.MUTUAL_CONTACTS")}
                                  </p>
                                </div>

                                {teacher.id !== userId && (
                                  <div className="text-gary font-medium mb-2 d-flex px-2">
                                    {teacher?.connectionDetails
                                      ?.isConnection && (
                                      <>
                                        {/* <Button
                                          variant="btn btn-outline-primary mr-1  btn-small-icon w-100"
                                          onClick={() =>
                                            router.push("/messages")
                                          }
                                        >
                                          {lang("COMMON.MESSAGE")}
                                        </Button>
                                        <Button
                                          variant="btn btn-outline-primary  btn-small-icon w-100"
                                          onClick={() =>
                                            router.push(
                                              `/profile/${teacher.profileId}`
                                            )
                                          }
                                        >
                                          {lang("HEADER.VIEW_PROFILE")}
                                        </Button> */}
                                      </>
                                    )}
                                    {!teacher?.connectionDetails
                                      ?.isConnection &&
                                      teacher?.connectionDetails?.status ===
                                        null && (
                                        <Button
                                          title="Connect"
                                          variant="btn btn-outline-primary mr-1 btn-small-icon w-100"
                                          onClick={() => {
                                            sendConnection(teacher?.id);
                                          }}
                                        >
                                          <Connect />
                                          {lang("COMMON.CONNECT")}
                                        </Button>
                                      )}
                                    {teacher?.connectionDetails?.status ===
                                      "requested" &&
                                      teacher?.connectionDetails
                                        ?.isConnection === false && (
                                        <Button
                                          title="Withdraw"
                                          variant="btn btn-outline-primary mr-1 btn-small-icon w-100"
                                          onClick={() => {
                                            withdrawRequest(
                                              teacher?.connectionDetails?.id
                                            );
                                          }}
                                        >
                                          <CrossIcon />
                                          {lang("COMMON.WITHDRAW")}
                                        </Button>
                                      )}
                                    {!teacher?.connectionDetails?.isfollow && (
                                      <Button
                                        title="Follow"
                                        variant="btn btn-outline-primary btn-small-icon w-100"
                                        onClick={() => {
                                          followRequest(teacher?.id);
                                        }}
                                      >
                                        <Follow />
                                        {lang("COMMON.FOLLOW")}
                                      </Button>
                                    )}

                                    {teacher?.connectionDetails?.isfollow && (
                                      <Button
                                        title="Unfollow"
                                        variant="btn btn-outline-primary btn-small-icon w-100"
                                        onClick={() => {
                                          unfollowRequest(teacher?.id);
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
                    }
                  )}
                  {searchData?.searchResults?.trainer?.rows?.map(
                    (teacher, key) => {
                      return (
                        showAll.trainer && (
                          <Col
                            md={4}
                            xl={3}
                            key={teacher?.id}
                            className="mb-sm-3"
                          >
                            <Card className="text-center position-relative h-100 myconnection-card overflow-hidden">
                              <Card.Header className="p-0">
                                <Link route={`/profile/${teacher?.profileId}`}>
                                  <div
                                    style={{
                                      backgroundImage: `url(${
                                        teacher?.profileBgURL ??
                                        "../../assets/images/dashboard/cover-background-2.jpg"
                                      })`,
                                      borderRadius: "8px 8px 0px 0px",
                                    }}
                                    className="position-relative connection-user-cover-img"
                                  >
                                    <div className="d-flex mx-auto">
                                      <div className="user-profile-pic flex-shrink-0 w-h-70 border-0 rounded-pill pointer">
                                        <img
                                          src={teacher?.profilePicURL || ""}
                                          className="d-flex img-fluid w-100 h-100"
                                          onError={(e) => {
                                            onImageError(
                                              e,
                                              "profile",
                                              `${teacher?.firstName} ${teacher?.lastName}`
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
                                {/* <div> */}
                                <Card.Title className="mb-1">
                                  <Link route={`/profile/${teacher.profileId}`}>
                                    <h5 className="text-body-14 mb-0 text-ellipsis pointer">
                                      {teacher.firstName}{" "}
                                      {lastNameHandler(
                                        teacher,
                                        teacher.lastNameVisibility,
                                        userData
                                      )
                                        ? teacher.lastName
                                        : ""}
                                    </h5>
                                  </Link>
                                </Card.Title>
                                <div className="mb-0 px-2">
                                  <p className="mb-1 text-gray-darker font-12 text-ellipsis">
                                    {teacher?.currentPosition?.trim()
                                      ? teacher?.currentPosition
                                      : "No Position Added"}
                                  </p>
                                  <p className="text-body-12 mb-2 text-gray-darker text-ellipsis">
                                    {teacher?.mutualCount}{" "}
                                    {lang("CONNECTIONS.MUTUAL_CONTACTS")}
                                  </p>
                                </div>

                                {teacher.id !== userId && (
                                  <div className="text-gary font-medium mb-3 d-flex px-2">
                                    {teacher?.connectionDetails
                                      ?.isConnection && (
                                      <>
                                        {/* <Button
                                          variant="btn btn-outline-primary mr-1  btn-small-icon w-100"
                                          onClick={() =>
                                            router.push("/messages")
                                          }
                                        >
                                          {lang("COMMON.MESSAGE")}
                                        </Button>
                                        <Button
                                          variant="btn btn-outline-primary  btn-small-icon w-100"
                                          onClick={() =>
                                            router.push(
                                              `/profile/${teacher.profileId}`
                                            )
                                          }
                                        >
                                          {lang("HEADER.VIEW_PROFILE")}
                                        </Button> */}
                                      </>
                                    )}
                                    {!teacher?.connectionDetails
                                      ?.isConnection &&
                                      teacher?.connectionDetails?.status ===
                                        null && (
                                        <Button
                                          title="Connect"
                                          variant="btn btn-outline-primary mr-1 btn-small-icon w-100"
                                          onClick={() => {
                                            sendConnection(teacher?.id);
                                          }}
                                        >
                                          <Connect />
                                          {lang("COMMON.CONNECT")}
                                        </Button>
                                      )}
                                    {teacher?.connectionDetails?.status ===
                                      "requested" &&
                                      teacher?.connectionDetails
                                        ?.isConnection === false && (
                                        <Button
                                          title="Withdraw"
                                          variant="btn btn-outline-primary mr-1 btn-small-icon w-100"
                                          onClick={() => {
                                            withdrawRequest(
                                              teacher?.connectionDetails?.id
                                            );
                                          }}
                                        >
                                          <CrossIcon />
                                          {lang("COMMON.WITHDRAW")}
                                        </Button>
                                      )}
                                    {!teacher?.connectionDetails?.isfollow && (
                                      <Button
                                        title="Follow"
                                        variant="btn btn-outline-primary btn-small-icon w-100"
                                        onClick={() => {
                                          followRequest(teacher?.id);
                                        }}
                                      >
                                        <Follow />
                                        {lang("COMMON.FOLLOW")}
                                      </Button>
                                    )}

                                    {teacher?.connectionDetails?.isfollow && (
                                      <Button
                                        title="Unfollow"
                                        variant="btn btn-outline-primary btn-small-icon w-100"
                                        onClick={() => {
                                          unfollowRequest(teacher?.id);
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
                    }
                  )}
                </Row>
              </Container>
              {searchData?.searchResults?.trainer?.rows.length > 4 && (
                <div className="people-tab-view-all-button my-2 border-top border-geyser pt-2">
                  <span
                    className="people-tab-view-all-button-text"
                    onClick={() => {
                      setShowAll({
                        ...showAll,
                        trainer: !showAll.trainer,
                      });
                    }}
                  >
                    {!showAll.trainer
                      ? lang("COMMON.VIEW_ALL")
                      : lang("COMMON.VIEW_LESS")}
                  </span>
                </div>
              )}
            </Card.Body>
          </Card>
        )}

      {selectedFilters.includes(lang("GLOBAL_SEARCH.FILTER.TRAINER")) &&
        searchData?.searchResults?.trainer?.rows.length === 0 && (
          <p>No Trainers Found</p>
        )}
    </div>
  );
};

export default Trainer;
