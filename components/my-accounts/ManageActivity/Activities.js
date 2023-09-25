import React, { Fragment } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { deleteActivity } from "store/actions/manageActivities";
import moment from "moment";
import { selectUserInfo } from "store/selectors/user";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { onImageError } from "utils";
/******************** 
  @purpose : Manage all Activities
  @Parameter : {}
  @Author : INIC
  ******************/
const Activities = ({ fetchMoreActivities }) => {
  const dispatch = useDispatch();
  const { manageActivity } = useSelector((state) => state.manageActivity);
  const userInfo = useSelector(selectUserInfo);
  const router = useRouter();
  const [lang] = useTranslation("language");
  return (
    <Fragment>
      <InfiniteScroll
        dataLength={
          manageActivity !== "" && manageActivity?.length > 0
            ? manageActivity?.length
            : ""
        }
        next={fetchMoreActivities}
        hasMore={manageActivity?.length != 100}
      >
        <Row>
          {manageActivity?.length === 0 ? (
            <div className="col-12 text-center mx-auto">
              <picture className="mb-3 icon-manage-activities">
                <span className="material-icons mb-3">checklist</span>
              </picture>
              <h5 className="">
                {" "}
                {lang("MY_ACCOUNTS.MANAGE_ACTIVITIES.ACTIVITIES.NO_ACTIVITIES")}
              </h5>
              <p className="mb-0">
                {lang(
                  "MY_ACCOUNTS.MANAGE_ACTIVITIES.ACTIVITIES.NO_ACTIVITIES_DESCRIPTION"
                )}
              </p>
            </div>
          ) : (
            manageActivity?.map((item, index) => (
              <Col lg={6} key={index}>
                <Card className="mb-4">
                  <div className="position-absolute r-0 mt-4 pr-3">
                    <em
                      className="icon icon-delete-line reaction-icons font-22"
                      onClick={() => dispatch(deleteActivity(item.id))}
                    ></em>
                  </div>
                  <div className="listing-section border-first-0 pt-first-0 pb-last-0 p-3">
                    <li className="listing-box d-flex">
                      <picture className="user-profile-pic rounded-pill mr-2 flex-shrink-0">
                        <source
                          srcSet={
                            userInfo.profilePicURL ? userInfo.profilePicURL : ""
                          }
                          type="image/jpg"
                        />
                        <img
                          src={
                            userInfo.profilePicURL ? userInfo.profilePicURL : ""
                          }
                          width="40"
                          height="40"
                          onError={(e) =>
                            onImageError(
                              e,
                              "profile",
                              `${userInfo?.firstName} ${userInfo?.lastName}`
                            )
                          }
                        />
                      </picture>
                      <div
                        className="position-relative mr-sm-5 mr-4 notification-listing"
                        onClick={() => {
                          if (item?.newsFeedId)
                            router.push(
                              `/post/${item?.newsFeedId}?activityType=${item?.activityType}&commentId=${item?.commentId}`
                            );
                        }}
                      >
                        <h5
                          className={`font-16  font-semibold mb-1 ${
                            item?.newsFeedId
                              ? " text-primary  cursor-pointer"
                              : "text-gray"
                          }`}
                        >
                          {item.content}
                        </h5>
                        <p className="font-14 mt-1 text-gray font-weight-light mb-0">
                          {moment(item.createdAt).format("DD MMM yyyy")}
                        </p>
                      </div>
                    </li>
                  </div>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </InfiniteScroll>
    </Fragment>
  );
};

export default Activities;
