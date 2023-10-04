import React, { useEffect, useState } from "react";
import { Card, Col, Spinner } from "react-bootstrap";
import {
  getPeopleYouMayKnowList,
  sendConnectionRequest,
  followUser,
  unfollowUser,
  updateUserInPYMK,
  getSentConnectionsList,
} from "store/actions/connections";
import { useDispatch, useSelector } from "react-redux";
import { getFullName } from "utils";
import InfiniteScroll from "react-infinite-scroll-component";
import { useTranslation } from "react-i18next";
import UserCard from "../UserCard";
import { YliwayButton } from "../button";
import LogoIcon from "public/assets/images/logo-grey-blue.svg";
import Image from "next/image";

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
      <Card
        className="mb-4 p-4"
        style={{
          boxShadow:
            "0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)",
          border: "none",
        }}
      >
        <h3 className="people-may-know-title">
          <Image src={LogoIcon} height={24} width={24} />
          {lang("CONNECTIONS.PEOPLE_YOU_MAY_KNOW")}
        </h3>

        <InfiniteScroll
          dataLength={list !== "" && list?.length > 0 ? list?.length : ""}
          next={fetchMoreSuggestion}
          hasMore={list?.length !== list?.total}
        >
          <div
            style={{
              columnGap: "0.5rem",
              rowGap: "1.5rem",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {isLoading ? (
              <Col
                md={12}
                xl={12}
                className="d-flex justify-content-center align-items-center"
              >
                <Spinner as="span" animation="border" variant="primary" />
              </Col>
            ) : list?.length ? (
              list.map((listItem, index) => {
                const {
                  profileBgURL,
                  profilePicURL,
                  currentPosition,
                  mutualCount,
                  profileId,
                  id,
                  isFollow: _isFollow,
                } = listItem;
                const { isFollow = false } = _isFollow || {};

                return (
                  <UserCard
                    key={index}
                    coverImage={profileBgURL}
                    profileImage={profilePicURL}
                    name={getFullName(listItem)}
                    position={currentPosition || lang("CONNECTIONS.NO_POSTION")}
                    mutualCountText={`${mutualCount} ${lang(
                      "CONNECTIONS.MUTUAL_CONTACTS"
                    )}`}
                    profileurl={`/profile/${profileId}`}
                    renderFooter={() => (
                      <React.Fragment>
                        <YliwayButton
                          title={lang("CONNECTIONS.CONNECT")}
                          primary
                          handleClick={async () => {
                            await dispatch(sendConnectionRequest(id));
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
                          }}
                          label={lang("CONNECTIONS.CONNECT")}
                          size="extra-small"
                          style={{
                            padding: isFollow
                              ? "0.05rem 0.3rem"
                              : "0.05rem 0.5rem",
                          }}
                        />
                        <YliwayButton
                          title={
                            isFollow
                              ? lang("CONNECTIONS.UN_FOLLOW")
                              : lang("CONNECTIONS.FOLLOW")
                          }
                          handleClick={() =>
                            isFollow
                              ? unFollowUserClick(listItem)
                              : followUserClick(listItem)
                          }
                          label={
                            isFollow
                              ? lang("CONNECTIONS.UN_FOLLOW")
                              : lang("CONNECTIONS.FOLLOW")
                          }
                          size="extra-small"
                          style={{
                            color: "#6750a4",
                            boxShadow: "none",
                            padding: isFollow
                              ? "0.05rem 0.2rem"
                              : "0.05rem 0.5rem",
                          }}
                        />
                      </React.Fragment>
                    )}
                  />
                );
              })
            ) : (
              <li className="listing-box d-flex align-items-center">
                <em> {lang("CONNECTIONS.NO_SUGGESTIONS_CURRENTLY")}</em>
              </li>
            )}
          </div>
        </InfiniteScroll>
      </Card>
    </React.Fragment>
  );
};
export default PeopleYouMayKnow;
