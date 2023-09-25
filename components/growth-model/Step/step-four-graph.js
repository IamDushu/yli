import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { PieChart } from "react-minimal-pie-chart";
import { useDispatch, useSelector } from "react-redux";
import { getGrowthModelActivitiesStatus } from "store/actions";

const StepFourGraph = () => {
  const dispatch = useDispatch();
  const growthData = useSelector((state) => state?.growth?.growthModelDetail);

  useEffect(() => {
    dispatch(getGrowthModelActivitiesStatus(growthData?.id));
  }, []);

  const activitiesStatus = useSelector(
    (state) => state?.growth?.growthModelActivitiesstatus
  );

  

  return (
  
    <Row className="pt-4">
      {activitiesStatus && activitiesStatus["Hard Skill"] ? (
        <Col md={6} sm={6} className="pb-4">
          <div className="border border-geyser rounded-8">
            <div className="p-3 bg-box-blue rounded-t-8">
              <h3 className="text-body-16">Hard Skills</h3>
              <div className="d-flex">
                <h6 className="text-body-12 text-secondary d-flex align-items-center mr-5">
                  <span className="w-h-10 mr-1 bg-cyan-cobalt-blue d-inline-block rounded-pill"></span>{" "}
                  Completed
                </h6>
                <h6 className="text-body-12 text-secondary mr-5">
                  <span className="w-h-10 mr-1 bg-midnight-melancholia d-inline-block rounded-pill"></span>{" "}
                  In Progress
                </h6>
                <h6 className="text-body-12 text-secondary">
                  <span className="w-h-10 mr-1 bg-blue-jay d-inline-block rounded-pill"></span>{" "}
                  Lost
                </h6>
              </div>
            </div>
            <div className="px-xl-5 px-lg-3 p-3">
              <div className="px-sm-3 px-5 chart-text-white">
                {activitiesStatus && (
                  <PieChart
                    data={[
                      {
                        title: "One",
                        value: activitiesStatus["Hard Skill"]?.completed
                          ? activitiesStatus["Hard Skill"]?.completed
                          : 0,
                        color: "#2B53A3",
                      },
                      {
                        title: "Two",
                        value: activitiesStatus["Hard Skill"]?.inProgress
                          ? activitiesStatus["Hard Skill"]?.inProgress
                          : 0,
                        color: "#002060",
                      },
                      {
                        title: "Three",
                        value: activitiesStatus["Hard Skill"]?.lost
                          ? activitiesStatus["Hard Skill"]?.lost
                          : 0,
                        color: "#6089DC",
                      },
                    ]}
                    label={({ dataEntry }) => dataEntry.value}
                    labelStyle={{
                      fill: "#FFFFFF",
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </Col>
      ) : (
        ""
      )}
      {activitiesStatus && activitiesStatus["Soft Skill"] ? (
        <Col md={6} sm={6} className="pb-4">
          <div className="border border-geyser rounded-8">
            <div className="p-3 bg-box-skyblue rounded-t-8">
              <h3 className="text-body-16 font-weight-semibold pb-2 mb-0">
                Soft Skills
              </h3>
              <div className="d-flex">
                <h6 className="text-body-12 text-secondary d-flex align-items-center mr-5">
                  <span className="w-h-10 mr-1 bg-out-of-the-blue d-inline-block rounded-pill"></span>{" "}
                  Completed
                </h6>
                <h6 className="text-body-12 text-secondary mr-5">
                  <span className="w-h-10 mr-1 bg-adamantine-blue d-inline-block rounded-pill"></span>{" "}
                  In Progress
                </h6>
                <h6 className="text-body-12 text-secondary">
                  <span className="w-h-10 mr-1 bg-pacific-ocean d-inline-block rounded-pill"></span>{" "}
                  Lost
                </h6>
              </div>
            </div>
            <div className="px-xl-5 px-lg-3 p-3">
              <div className="px-sm-3 px-5 chart-text-white">
                {activitiesStatus && (
                  <PieChart
                    data={[
                      {
                        title: "One",
                        value: activitiesStatus["Soft Skill"]?.completed
                          ? activitiesStatus["Soft Skill"]?.completed
                          : 0,
                        color: "#0F92E8",
                      },
                      {
                        title: "Two",
                        value: activitiesStatus["Soft Skill"]?.inProgress
                          ? activitiesStatus["Soft Skill"]?.inProgress
                          : 0,
                        color: "#4DB3F5",
                      },
                      {
                        title: "Three",
                        value: activitiesStatus["Soft Skill"]?.lost
                          ? activitiesStatus["Soft Skill"]?.lost
                          : 0,
                        color: "#8ECCF4",
                      },
                    ]}
                    label={({ dataEntry }) => dataEntry.value}
                    labelStyle={{
                      fill: "#FFFFFF",
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </Col>
      ) : (
        ""
      )}

      {activitiesStatus && activitiesStatus?.Mindset ? (
        <Col md={6} sm={6} className="pb-4">
          <div className="border border-geyser rounded-8">
            <div className="p-3 bg-box-pink rounded-t-8">
              <h3 className="text-body-16 font-weight-semibold pb-2 mb-0">
                Mindset
              </h3>
              <div className="d-flex">
                <h6 className="text-body-12 text-secondary d-flex align-items-center mr-5">
                  <span className="w-h-10 mr-1 bg-apple-ii-magenta d-inline-block rounded-pill"></span>{" "}
                  Completed
                </h6>
                <h6 className="text-body-12 text-secondary mr-5">
                  <span className="w-h-10 mr-1 bg-apple-ii-magenta d-inline-block rounded-pill"></span>{" "}
                  In Progress
                </h6>
                <h6 className="text-body-12 text-secondary">
                  <span className="w-h-10 mr-1 bg-bubble-gum d-inline-block rounded-pill"></span>{" "}
                  Lost
                </h6>
              </div>
            </div>
            <div className="px-xl-5 px-lg-3 p-3">
              <div className="px-sm-3 px-5 chart-text-white">
                {activitiesStatus && (
                  <PieChart
                    data={[
                      {
                        title: "One",
                        value: activitiesStatus?.Mindset?.completed
                          ? activitiesStatus?.Mindset?.completed
                          : 0,
                        color: "#E944E9",
                      },
                      {
                        title: "Two",
                        value: activitiesStatus?.Mindset?.inProgress
                          ? activitiesStatus?.Mindset?.inProgress
                          : 0,
                        color: "#CC00CC",
                      },
                      {
                        title: "Three",
                        value: activitiesStatus?.Mindset?.lost
                          ? activitiesStatus?.Mindset?.lost
                          : 0,
                        color: "#FF83FF",
                      },
                    ]}
                    label={({ dataEntry }) => dataEntry.value}
                    labelStyle={{
                      fill: "#FFFFFF",
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </Col>
      ) : (
        ""
      )}

      {activitiesStatus && activitiesStatus?.Traction ? (
        <Col md={6} sm={6} className="pb-4">
          <div className="border border-geyser rounded-8">
            <div className="p-3 bg-box-yellow rounded-t-8">
              <h3 className="text-body-16 font-weight-semibold pb-2 mb-0">
                Traction
              </h3>
              <div className="d-flex">
                <h6 className="text-body-12 text-secondary d-flex align-items-center mr-5">
                  <span className="w-h-10 mr-1 bg-sweet-grass d-inline-block rounded-pill"></span>{" "}
                  Completed
                </h6>
                <h6 className="text-body-12 text-secondary mr-5">
                  <span className="w-h-10 mr-1 bg-starship d-inline-block rounded-pill"></span>{" "}
                  In Progress
                </h6>
                <h6 className="text-body-12 text-secondary">
                  <span className="w-h-10 mr-1 bg-mellow-green d-inline-block rounded-pill"></span>{" "}
                  Lost
                </h6>
              </div>
            </div>
            <div className="px-xl-5 px-lg-3 p-3">
              <div className="px-sm-3 px-5 chart-text-white">
                {activitiesStatus && (
                  <PieChart
                    data={[
                      {
                        title: "One",
                        value: activitiesStatus?.Traction?.completed
                          ? activitiesStatus?.Traction?.completed
                          : 0,
                        color: "#B5B589",
                      },
                      {
                        title: "Two",
                        value: activitiesStatus?.Traction?.inProgress
                          ? activitiesStatus?.Traction?.inProgress
                          : 0,
                        color: "#DFDF38",
                      },
                      {
                        title: "Three",
                        value: activitiesStatus?.Traction?.lost
                          ? activitiesStatus?.Traction?.lost
                          : 0,
                        color: "#D3D392",
                      },
                    ]}
                    label={({ dataEntry }) => dataEntry.value}
                    labelStyle={{
                      fill: "#FFFFFF",
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </Col>
      ) : (
        ""
      )}

      {activitiesStatus && activitiesStatus?.Distribution ? (
        <Col md={6} sm={6} className="pb-4">
          <div className="border border-geyser rounded-8">
            <div className="p-3 bg-box-orange rounded-t-8">
              <h3 className="text-body-16 font-weight-semibold pb-2 mb-0">
                Distribution
              </h3>
              <div className="d-flex">
                <h6 className="text-body-12 text-secondary d-flex align-items-center mr-5">
                  <span className="w-h-10 mr-1 bg-squash-blossom d-inline-block rounded-pill"></span>{" "}
                  Completed
                </h6>
                <h6 className="text-body-12 text-secondary mr-5">
                  <span className="w-h-10 mr-1 bg-soft-saffron d-inline-block rounded-pill"></span>{" "}
                  In Progress
                </h6>
                <h6 className="text-body-12 text-secondary">
                  <span className="w-h-10 mr-1 bg-indian-saffron d-inline-block rounded-pill"></span>{" "}
                  Lost
                </h6>
              </div>
            </div>
            <div className="px-xl-5 px-lg-3 p-3">
              <div className="px-sm-3 px-5 chart-text-white">
                {activitiesStatus && (
                  <PieChart
                    data={[
                      {
                        title: "One",
                        value: activitiesStatus?.Distribution?.completed
                          ? activitiesStatus?.Distribution?.completed
                          : 0,
                        color: "#F6B83F",
                      },
                      {
                        title: "Two",
                        value: activitiesStatus?.Distribution?.inProgress
                          ? activitiesStatus?.Distribution?.inProgress
                          : 0,
                        color: "#FFD37D",
                      },
                      {
                        title: "Three",
                        value: activitiesStatus?.Distribution?.lost
                          ? activitiesStatus?.Distribution?.lost
                          : 0,
                        color: "#FF9933",
                      },
                    ]}
                    label={({ dataEntry }) => dataEntry.value}
                    labelStyle={{
                      fill: "#FFFFFF",
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </Col>
      ) : (
        ""
      )}

      {activitiesStatus && activitiesStatus?.Support ? (
        <Col md={6} sm={6} className="pb-4">
          <div className="border border-geyser rounded-8">
            <div className="p-3 bg-box-green rounded-t-8">
              <h3 className="text-body-16 font-weight-semibold pb-2 mb-0">
                Support
              </h3>
              <div className="d-flex">
                <h6 className="text-body-12 text-secondary d-flex align-items-center mr-5">
                  <span className="w-h-10 mr-1 bg-scorpion-venom d-inline-block rounded-pill"></span>{" "}
                  Completed
                </h6>
                <h6 className="text-body-12 text-secondary mr-5">
                  <span className="w-h-10 mr-1 bg-wicked-green d-inline-block rounded-pill"></span>{" "}
                  In Progress
                </h6>
                <h6 className="text-body-12 text-secondary">
                  <span className="w-h-10 mr-1 bg-greenery d-inline-block rounded-pill"></span>{" "}
                  Lost
                </h6>
              </div>
            </div>
            <div className="px-xl-5 px-lg-3 p-3">
              <div className="px-sm-3 px-5 chart-text-white">
                {activitiesStatus && (
                  <PieChart
                    data={[
                      {
                        title: "One",
                        value: activitiesStatus?.Support?.completed
                          ? activitiesStatus?.Support?.completed
                          : 0,
                        color: "#9DEE1A",
                      },
                      {
                        title: "Two",
                        value: activitiesStatus?.Support?.inProgress
                          ? activitiesStatus?.Support?.inProgress
                          : 0,
                        color: "#9CCE4C",
                      },
                      {
                        title: "Three",
                        value: activitiesStatus?.Support?.lost
                          ? activitiesStatus?.Support?.lost
                          : 0,
                        color: "#89AF4B",
                      },
                    ]}
                    label={({ dataEntry }) => dataEntry.value}
                    labelStyle={{
                      fill: "#FFFFFF",
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </Col>
      ) : (
        ""
      )}
    </Row>
  );
};

export default StepFourGraph;
