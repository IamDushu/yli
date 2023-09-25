import { Link } from "@routes";
import moment from "moment";
import momentTz from "moment-timezone";
import React, { Fragment } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { onImageError } from "utils";

export const WelcomeRoom = ({
  total,
  setPagesize,
  pagesize,
  myLearningWelcome,
  userInfo
}) => {
  const [lang] = useTranslation("language");

  return (
    <Card.Body className="m-0 p-0 mb-4">
      <h5 className="h6 border-geyser border-bottom px-3 pt-3 pb-3 mb-0">
        Welcome Room
      </h5>
      <Row className="px-2 px-sm-3 py-3  row-col-10 three-grid-spacing">
        {myLearningWelcome && myLearningWelcome?.rows?.length > 0 ? (
          myLearningWelcome?.rows?.map((WelcomeRoomListData, index) => {
            return (
              <Fragment key={index}>
                <Col
                  lg={4}
                  sm={6}
                  key={WelcomeRoomListData?.id}
                  className="d-flex w-100 pr-lg-3 px-2"
                >
                  <Card className="secondary-card abstract-card-v2 h-100">
                    <Card.Body className="d-flex flex-column h-100">
                      <Link
                        route={
                          "/my-learning/room/" +
                          WelcomeRoomListData?.virtualEventDetails?.id
                        }
                      >
                        <a>
                          <div className="position-relative pointer">
                            <picture onContextMenu={(e) => e.preventDefault()}>
                              <source
                                srcSet={
                                  WelcomeRoomListData?.virtualEventDetails
                                    ?.imageURL
                                }
                                type="image/png"
                              />
                              <img
                                src={
                                  WelcomeRoomListData?.virtualEventDetails
                                    ?.imageURL
                                }
                                alt="Training Room"
                                height="155"
                                className="w-100"
                                onError={(e) => onImageError(e)}
                              />
                            </picture>
                          </div>
                        </a>
                      </Link>

                      <div className="courses-info px-3 py-3 d-flex flex-column">
                        <Link
                          route={
                            "/my-learning/room/" +
                            WelcomeRoomListData?.virtualEventDetails?.id
                          }
                        >
                          <a>
                            <div className="title-container">
                              <h6 className="font-weight-bold text-body-16 mb-0 pointer ellipsis">
                                {
                                  WelcomeRoomListData?.virtualEventDetails
                                    ?.title
                                }
                              </h6>
                            </div>
                          </a>
                        </Link>

                        <div className="text-ellipsis d-flex align-items-center justify-content-between">
                          <small className="font-weight-semi-bold text-card-name text-body-12">
                            {
                              WelcomeRoomListData?.virtualEventDetails
                                ?.UserDetails?.firstName
                            }{" "}
                            {
                              WelcomeRoomListData?.virtualEventDetails
                                ?.UserDetails?.lastName
                            }
                          </small>
                        </div>

                        <div className="package-info mt-1">
                          <div className="d-flex justify-content-between">
                            {WelcomeRoomListData?.virtualEventDetails
                              ?.startDate !== null ? (
                              <div className="">
                                <small className="font-12 font-weight-semibold">
                                  {userInfo?.timezone
                                    ? momentTz(
                                        WelcomeRoomListData?.virtualEventDetails
                                          ?.startDate
                                      )
                                        .tz(userInfo?.timezone)
                                        .format("DD MMM YYYY")
                                    : moment(
                                        WelcomeRoomListData?.virtualEventDetails
                                          ?.startDate
                                      ).format("DD MMM YYYY")}{" "}
                                  &bull;{" "}
                                  {userInfo?.timezone
                                    ? momentTz(
                                        WelcomeRoomListData?.virtualEventDetails
                                          ?.startDate
                                      )
                                        .tz(userInfo?.timezone)
                                        .format("h:mm a")
                                    : moment(
                                        WelcomeRoomListData?.virtualEventDetails
                                          ?.startDate
                                      ).format("h:mm a")}
                                </small>
                              </div>
                            ) : (
                              <small className="font-14 text-secondary-75">
                                {`${
                                  WelcomeRoomListData?.virtualEventDetails
                                    ?.joinedEvent === null
                                    ? 0
                                    : 100
                                }% Completed`}
                              </small>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Fragment>
            );
          })
        ) : (
          <div className="px-3">{lang("COMMON.NO_DATA_FOUND")}</div>
        )}
      </Row>
      {total.totalWelcomeRooms >= pagesize?.pagesizeWelcome && (
        <div className="text-right d-flex border-top border-geyser people-tab-view-all-button mb-4">
          <small
            className="font-weight-bold text-primary text-body-14 m-auto pointer people-tab-view-all-button-text load-more-color py-2"
            onClick={() => {
              setPagesize({
                ...pagesize,
                pagesizeWelcome: pagesize?.pagesizeWelcome + 3,
              });
            }}
          >
            {lang("COMMON.VIEW_MORE")}
          </small>
        </div>
      )}
    </Card.Body>
  );
};
