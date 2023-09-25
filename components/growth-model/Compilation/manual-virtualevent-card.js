import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import moment from "moment";

const ManualVirtualEventCard = ({ type, trainingData }) => {
  return (
    <>
      <div
        className={
          "d-flex flex-wrap flex-md-nowrap justify-content-between "
          // (index > 0 ? "mt-4" : "")
        }
        // key={index}
      >
        {/* <h6>{type.typeName}</h6> */}
        <h6 className="mt-4 ml-4">Training Rooms</h6>
        <div className="custom-search">
          <em className="icon icon-search"></em>
          <input
            type="text"
            className="search-custom"
            placeholder="Search..."
          />
        </div>
      </div>
      <Row className="mt-4 row-col-10 four-grid-spacing">
        {trainingData && trainingData?.rows?.length > 0
          ? trainingData?.rows?.map((roomdata, index) => {
              return (
                <>
                  <Col lg={4} sm={6} key={index}>
                    <Card className="secondary-card h-100 mt-4">
                      <Card.Body className="d-flex flex-column">
                        <div className="courses-img position-relative">
                          <picture onContextMenu={(e) => e.preventDefault()}>
                            <source
                              srcSet={roomdata?.virtualEventDetails?.imageURL}
                              type="image/png"
                            />
                            <img
                              srcSet={roomdata?.virtualEventDetails?.imageURL}
                              alt="My Room"
                              width="250"
                              height="120"
                              // onError={(e) => onImageError(e)}
                              className="w-100"
                            />
                          </picture>
                        </div>
                        <div className="courses-info p-2 p-lg-3 d-flex flex-column h-100">
                          <h6 className="text-ellipsis text-body-16 pointer pb-1">
                            {roomdata?.virtualEventDetails?.title}
                          </h6>
                          <small className="text-secondary-75">
                            {/* {roomdata?.userDetails?.firstName}{" "}
                          {roomdata?.userDetails?.lastName} */}
                          </small>
                          <div className="package-info mt-3">
                            <div className="d-flex">
                              <div className="w-50">
                                <small className="text-secondary">Date</small>
                              </div>
                              {/* <div className="w-50 text-ellipsis">
                              <small className="text-secondary">
                                {moment(roomdata?.virtualEventDateDetails[0]?.eventDate).format(
                                  "MMM DD YYYY"
                                )}
                              </small>
                            </div> */}
                            </div>
                            <div className="d-flex">
                              <div className="w-50">
                                <small className="text-secondary">
                                  Start Time
                                </small>
                              </div>
                              <div className="w-50 text-ellipsis">
                                <small className="text-secondary">
                                  {moment(roomdata?.startDate).format(
                                    "hh:mm a"
                                  )}
                                </small>
                              </div>
                            </div>
                            <div className="d-flex">
                              <div className="w-50">
                                <small className="text-secondary">
                                  Duration
                                </small>
                              </div>
                              <div className="w-50 text-ellipsis">
                                <small className="text-secondary">
                                  {roomdata?.duration / 60} Hours
                                </small>
                              </div>
                            </div>
                          </div>
                          <div className="package-info d-flex flex-column h-100 mt-3">
                            <div className="d-flex justify-content-between">
                              <small className="text-secondary-75">Lite?</small>
                              <small>
                                <span className="text-decoration-line-through text-gary">
                                  {roomdata?.freePrice} &euro;
                                </span>
                                <span className="font-medium">
                                  {" "}
                                  {roomdata?.litePrice}
                                </span>
                                <span className="font-weight-semibold font-14">
                                  &euro;
                                </span>
                              </small>
                            </div>
                            <div className="d-flex justify-content-between">
                              <small className="text-secondary-75">
                                Premium?
                              </small>
                              <small>
                                <span className="text-decoration-line-through text-gary">
                                  {roomdata?.freePrice} &euro;
                                </span>
                                <span className="font-medium">
                                  {" "}
                                  {roomdata?.premiumPrice}
                                </span>
                                <span className="font-weight-semibold font-14">
                                  &euro;
                                </span>
                              </small>
                            </div>
                            <div className="d-flex justify-content-between mt-2 mb-4">
                              <div className="m-0 d-flex align-items-center">
                                <em className="icon icon-star-fill font-20 pr-1"></em>
                                <span className="pt-1 font-medium font-14">
                                  0
                                </span>
                              </div>
                              {/* <Link route="/">
                              <a>
                                <em className="icon icon-add-gm d-block text-center font-24"></em>
                                <span className="font-14 font-weight-semibold text-secondary">
                                  Add to GM
                                </span>
                              </a>
                            </Link> */}
                            </div>
                            <div className="text-center mt-auto">
                              {/* {selectedActivitiesIds.includes(
                                activity?.activityId
                              ) ? (
                                <Button
                                  variant="info btn-sm w-100"
                                  size="sm"
                                  type="button"
                                >
                                  <em className="icon icon-fill-check font-12 mr-2 ml-auto hover-white"></em>
                                  Added to GM
                                </Button>
                              ) : ( */}
                              <Button
                                variant="outline-info py-12 px-4"
                                size="sm"
                                type="button"
                                // onClick={() => {
                                //   addToGM(skillArea, type.typeName, activity);
                                // }}
                              >
                                <em className="icon icon-plus-primary font-12 mr-2 ml-auto hover-white"></em>
                                Add to GM
                              </Button>
                              {/* )} */}
                            </div>
                            <div className="text-center mt-auto">
                              <Button
                                variant="outline-info py-12 px-4 text-uppercase"
                                size="sm"
                                // onClick={() =>
                                //   router.push(
                                //     VIRTUAL_EVENT_DETAILS +
                                //     id +
                                //     "/false"
                                //   )
                                // }
                              >
                                Do it Now
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </>
              );
            })
          : ""}
      </Row>
    </>
  );
};

export default ManualVirtualEventCard;
