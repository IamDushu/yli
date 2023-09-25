import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const ManualCourseCard = ({
  type,
  index,
  addToGM,
  skillArea,
  selectedActivitiesIds,
}) => {
  const router = useRouter();

  return (
    <>
      <div
        className={
          "d-flex flex-wrap flex-md-nowrap justify-content-between " +
          (index > 0 ? "mt-4" : "")
        }
        key={index}
      >
        {/* <h6>{type.typeName}</h6> */}
        <h6>Courses</h6>
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
        {type.data.map((activity) => (
          <Col lg={4} md={6} sm={4} key={activity?.activityId}>
            <Card className="secondary-card h-100">
              <Card.Body>
                <div
                  className="courses-img position-relative pointer"
                  onClick={() => {
                    router.push({
                      pathname: "/course-detail/" + activity?.activityId,
                    });
                  }}
                >
                  <picture onContextMenu={(e) => e.preventDefault()}>
                    <img
                      src={activity?.imageUrl}
                      alt={activity?.activityTitle}
                      width=""
                      height="120"
                      className="img-fluid w-100"
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = "../assets/images/user-no-img.jpg";
                      }}
                    />
                  </picture>
                  <div className="online-status-center d-flex justify-content-between w-100">
                    <span className=" text-uppercase px-2 py-1 font-12 rounded-pill text-info bg-white font-weight-semibold">
                      {activity?.courseType.toUpperCase()}
                    </span>
                    <div className="m-0 d-flex align-items-center">
                      <em className="icon icon-star-fill font-18 pr-2"></em>
                      <span className="text-white text-body-12">4.3</span>
                    </div>
                  </div>
                </div>
                <div className="courses-info p-2 p-lg-3">
                  <h6
                    className="text-ellipsis text-body-16 pointer"
                    onClick={() => {
                      router.push({
                        pathname: "/course-detail/" + v.id,
                      });
                    }}
                  >
                    {activity?.activityTitle}
                  </h6>
                  <div className="text-ellipsis">
                    <small className="font-weight-normal text-gray text-body-14">
                      {activity?.authorName}
                    </small>
                  </div>
                  <div className="package-info mt-2">
                    <div className="mn-h-60">
                      <div className="d-flex justify-content-between mb-2">
                        <small className="text-body-12">
                          {activity?.courseType === "offline"
                            ? "Price"
                            : "Free"}
                        </small>
                        <small className="font-weight-semibold text-secondary text-body-12">
                          <span className="font-medium">
                            {activity?.courseType === "offline"
                              ? activity?.enterPrice
                              : activity?.freePrice}
                          </span>{" "}
                          <span className="font-weight-semibold text-secondary text-body-12">
                            &euro;
                          </span>
                        </small>
                      </div>
                      {activity?.courseType === "online" && (
                        <>
                          <div className="d-flex justify-content-between mb-2">
                            <small className="text-body-12">Lite</small>
                            <small className="text-body-12">
                              <span className="font-weight-semibold text-secondary text-body-12">
                                {" "}
                                {activity?.litePrice}
                              </span>
                              <span className="font-weight-semibold text-secondary text-body-12">
                                {" "}
                                &euro;
                              </span>
                            </small>
                          </div>
                          <div className="d-flex justify-content-between mb-3">
                            <small className="text-body-12">Premium</small>
                            <small className="text-body-12">
                              <span className="font-weight-semibold text-secondary text-body-12">
                                {" "}
                                {activity?.premiumPrice}
                              </span>
                              <span className="font-weight-semibold text-secondary text-body-12">
                                {" "}
                                &euro;
                              </span>
                            </small>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="text-center mt-3">
                      <div className="mb-2">
                        <Button
                          variant="info btn-sm w-100"
                          size="sm"
                          type="button"
                          onClick={() => {
                            router.push({
                              pathname: "/course-detail/" + v.id,
                            });
                          }}
                        >
                          Do it Now
                        </Button>
                      </div>
                      <div>
                        {selectedActivitiesIds.includes(
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
                        ) : (
                          <Button
                            variant="outline-info btn-sm w-100"
                            size="sm"
                            type="button"
                            // onClick={() => {
                            //   addToGM(skillArea, type.typeName, activity);
                            // }}
                            onClick={() => {
                              addToGM(skillArea, type.typeName, activity);
                            }}
                          >
                            <em className="icon icon-plus-primary font-12 mr-2 ml-auto hover-white"></em>
                            Add to GM
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ManualCourseCard;
