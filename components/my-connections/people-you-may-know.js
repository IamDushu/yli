import React, { Fragment, useEffect, useState, useCallback } from "react";
import { Card, Button, Row, Col, Container, Spinner } from "react-bootstrap";
import Link from "next/link";
import {
  getPeopleYouMayKnowList,
  sendConnectionRequest,
  followUser,
  unfollowUser,
  updateUserInPYMK,
  getSentConnectionsList,
} from "store/actions/connections";
import { useDispatch, useSelector } from "react-redux";
import { onImageError, getFullName } from "utils";
import InfiniteScroll from "react-infinite-scroll-component";
import { useTranslation } from "react-i18next";
import { Follow, UnFollow, Connect } from "components/svg/connections";
const PeopleYouMayKnow = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const list = useSelector((state) => state.connections.peopleYouMayKnowList);
  const [pagination, setPagination] = useState({ page: 1, pagesize: 10 });
  const [isLoading, setIsLoading] = useState(true);
  /**
   * Get user list
   */
  useEffect(async () => {
    await dispatch(
      getPeopleYouMayKnowList({
        ...pagination,
      })
    );
    setIsLoading(false);
  }, [pagination]);
  /**
   * Pagination
   */
  const fetchMoreSuggestion = () => {
    setPagination({
      ...pagination,
      pagesize: pagination.pagesize + 4,
    });
  };
  /**
   * Follow user click listner
   */
  const followUserClick = async (v) => {
    const response = await dispatch(followUser(v.id));
    if (response) {
      dispatch(
        updateUserInPYMK({
          id: v.id,
          isFollow: true,
        })
      );
      dispatch(
        getPeopleYouMayKnowList({
          ...pagination,
        })
      );
    }
  };
  /**
   * Un-Follow user click listner
   */
  const unFollowUserClick = async (v) => {
    const response = await dispatch(unfollowUser(v.id));
    if (response) {
      dispatch(
        updateUserInPYMK({
          id: v.id,
          isFollow: false,
        })
      );
      dispatch(
        getPeopleYouMayKnowList({
          ...pagination,
        })
      );
    }
  };
  return (
    <React.Fragment>
      {/* Sent connections request */}
      <h3 className="font-20 pr-3 mb-3 ">
        {lang("CONNECTIONS.PEOPLE_YOU_MAY_KNOW")}
      </h3>
      <Card className="mb-4">
        <Card.Body className="py-3 px-1">
          <InfiniteScroll
            dataLength={list !== "" && list?.length > 0 ? list?.length : ""}
            next={fetchMoreSuggestion}
            hasMore={list?.length !== list?.total}>
            <Container fluid>
              <Row className="custom-col-box four-grid-spacing-md row-col-10">
                {isLoading ? (
                  <Col
                    md={12}
                    xl={12}
                    className="d-flex justify-content-center align-items-center">
                    <Spinner as="span" animation="border" variant="primary" />
                  </Col>
                ) : list.length > 0 ? (
                  list.map((v, i) => (
                    <Col md={4} xl={3} key={v.id} className="mb-sm-3 ">
                      <Card className="text-center position-relative h-100 myconnection-card">
                        <Card.Header className="p-0">
                          <Link href={`/profile/${v.profileId}`}>
                            <div
                              style={{
                                backgroundImage: `url(${
                                  v?.profileBgURL ??
                                  "../../assets/images/dashboard/cover-background-2.jpg"
                                })`,
                                borderRadius: "8px 8px 0px 0px",
                              }}
                              className="position-relative connection-user-cover-img">
                              <div className="d-flex mx-auto">
                                <div className="user-profile-pic flex-shrink-0 w-h-70 border-0 rounded-pill pointer">
                                  <img
                                    src={v.profilePicURL || ""}
                                    className="d-flex img-fluid w-100 h-100"
                                    onError={(e) => {
                                      onImageError(
                                        e,
                                        "profile",
                                        `${v.firstName} ${v.lastName}`
                                      );
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </Link>
                        </Card.Header>
                        <Card.Body className="d-flex flex-column h-100 p-0 pt-1 myconnection-body">
                          <Card.Title className="mb-1">
                            <Link href={`/profile/${v.profileId}`}>
                              <h5 className="text-body-14 mb-0 text-ellipsis pointer p-1">
                                {getFullName(v)}
                              </h5>
                            </Link>
                          </Card.Title>
                          <div className="mb-0 px-2">
                            <p className="mb-1 text-gray-darker font-12 text-ellipsis">
                              {v?.currentPosition
                                ? v?.currentPosition
                                : "No Position Added"}
                            </p>
                            <p className="text-body-12 mb-2 text-gray-darker text-ellipsis">
                              {v.mutualCount}{" "}
                              {lang("CONNECTIONS.MUTUAL_CONTACTS")}
                            </p>
                          </div>
                          <div className="text-gary font-medium mb-2 d-flex px-xl-1 px-2">
                            <Button
                              title= {lang("CONNECTIONS.CONNECT")}
                              variant="btn btn-outline-primary mr-1 btn-small-icon w-100"
                              onClick={async () => {
                                await dispatch(sendConnectionRequest(v.id));
                                await dispatch(
                                  getPeopleYouMayKnowList({
                                    ...pagination,
                                  })
                                );
                                await dispatch(
                                  getSentConnectionsList({
                                    page: 1,
                                    pagesize: 8,
                                  })
                                );
                              }}>
                              <Connect />
                              {lang("CONNECTIONS.CONNECT")}
                            </Button>
                            {v.isFollow && v.isFollow.isFollow ? (
                              <Button
                                variant="btn btn-outline-primary btn-small-icon w-100 text-ellipsis"
                                title={lang("CONNECTIONS.UN_FOLLOW")}
                                onClick={() => unFollowUserClick(v)}>
                                <UnFollow />
                                {lang("CONNECTIONS.UN_FOLLOW")}
                              </Button>
                            ) : (
                              <Button
                                title= {lang("CONNECTIONS.FOLLOW")}
                                variant="btn btn-outline-primary btn-small-icon w-100"
                                onClick={() => followUserClick(v)}>
                                <Follow />
                                {lang("CONNECTIONS.FOLLOW")}
                              </Button>
                            )}
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <li className="listing-box d-flex align-items-center">
                    <em> {lang("CONNECTIONS.NO_SUGGESTIONS_CURRENTLY")}</em>
                  </li>
                )}
              </Row>
            </Container>
          </InfiniteScroll>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};
export default PeopleYouMayKnow;