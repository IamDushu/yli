import { post } from "api";
import { GROUPS_PRIVATE_ACTION } from "api/routes";
import { CrossIcon, TickIcon } from "components/svg/connections";
import { USER_API_URL } from "config";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, ListGroup, ListGroupItem } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getRequestedGroupsList, groupRequestReceived } from "store/actions";
import { createdByFunction, debounce, onImageError } from "utils";
import { Link } from "../../routes";
/******************** 
@purpose : Requested Groups
@Parameter : {tabKey}
@Author : INIC
******************/
function Requested({ tabKey }) {
  const dispatch = useDispatch();
  const { requestReceivedGroup } = useSelector(({ groups }) => groups);

  const { requestedGroupsList } = useSelector(({ groups }) => groups);
  const [lang] = useTranslation("language");
  const [page, setPage] = useState(1);
  const [pagesize, setPagesize] = useState(10);
  const [total, setTotal] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [showSubList, setShowSubList] = useState(
    new Array(requestedGroupsList?.data?.data?.length).fill(false)
  );

  const [subList, setSUbList] = useState([]);

  useEffect(() => {
    if (tabKey === "requested") groupsRequestedListing();
  }, [tabKey, searchText, page, pagesize]);

  useEffect(() => {
    if (requestedGroupsList) {
      setTotal(requestedGroupsList.total);
    }
  }, [requestedGroupsList]);

  /******************** 
@purpose : Used for get groups list
@Parameter : {}
@Author : INIC
******************/
  const groupsRequestedListing = async () => {
    const body = {
      page,
      pagesize,
      searchText,
    };
    dispatch(getRequestedGroupsList(body))
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  /******************** 
    @purpose : Used for group search
    @Parameter : { group }
    @Author : INIC
    ******************/
  const searchGroup = useCallback(
    debounce((value) => {
      setSearchText(value);
    }, 500)
  );

  const requestHandler = async (id, action, index, groupId) => {
    let data = {
      id,
      action,
    };
    try {
      const response = await post(
        { serviceURL: USER_API_URL },
        GROUPS_PRIVATE_ACTION,
        true,
        data,
        true
      );
      if (response.status === 1) {
        let data = {
          groupId: groupId,
        };
        await dispatch(groupRequestReceived(data)).then((data) => {
          setSUbList((prevState) => {
            const newSubList = [...prevState];
            newSubList[index] = data;
            return newSubList;
          });
        }); // subList
        await groupsRequestedListing(); // Main List
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <div className="common-searchbar mb-4 px-12">
        <Form.Group controlId="formSearch" className="position-relative mb-0">
          <Form.Control
            type="text"
            placeholder="Search by group name..."
            onChange={(e) => {
              setPage(1);
              searchGroup(e.target.value);
            }}
          />
          <div className="search-inner-icon">
            <em className="bx bx-search"></em>
          </div>
        </Form.Group>
      </div>
      <ul className="listing-section border-first-0 pt-first-0 px-12 pb-4">
        {isLoading ? (
          <div>
            <div className="row">
              <div className="col-md-9 text-center mx-auto ">
                <picture className="mb-3 icon-avatar-54">
                  <span className="material-icons">groups</span>
                </picture>
                <h5 className="mb-5">{lang("GROUP.COMMON.LOADING")}</h5>
              </div>
            </div>
          </div>
        ) : (Array.isArray(requestedGroupsList?.data?.data) &&
            requestedGroupsList?.data?.data?.length === 0) ||
          requestedGroupsList?.data === undefined ? (
          <div>
            <div className="row">
              <div className="col-md-9 text-center mx-auto">
                <picture className="mb-3 icon-avatar-54">
                  <span className="material-icons">groups</span>
                </picture>
                <h5 className="">
                  {lang("GROUP.REQUESTED.NO_REQUESTED_GROUP_FOUND")}
                </h5>
                <p className="mb-0">
                  {lang("GROUP.REQUESTED.ANY_REQUEST_TO_JOIN")}
                </p>
              </div>
            </div>
          </div>
        ) : (
          Array.isArray(requestedGroupsList?.data?.data) &&
          requestedGroupsList?.data?.data?.map((group, index) => (
            <>
              <li className={`listing-box align-items-start`} key={group?.id}>
                <div className="d-flex align-items-center w-100 flex-md-nowrap flex-wrap">
                  <picture
                    className="user-profile-pic mr-3 w-h-120-68 d-flex align-items-center border-radius-8 order-1 order-md-0 mb-2 mb-md-0"
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    <source srcSet={`${group?.imageURL}`} type="image/jpg" />
                    <img
                      src={`${group?.imageURL}`}
                      alt=""
                      className="w-100 object-fill"
                      height="68"
                      onError={(e) => {
                        onImageError(e);
                      }}
                    />
                  </picture>
                  <div className="d-sm-flex align-items-center w-100 order-3  order-md-0">
                    <div>
                      <Link route={`/groups/${group.name}/${group.id}`}>
                        <a title={group?.name}>
                          <h5 className="text-body-16 text-two-ellipsis">
                            {group?.name}
                          </h5>
                        </a>
                      </Link>
                      <p className="text-body-12 m-0">
                        <span>
                          <img
                            className="mr-1"
                            src={
                              group?.groupType === "private"
                                ? "/assets/images/private-icon.svg"
                                : "/assets/images/public-icon.svg"
                            }
                            alt="public-icon"
                          />
                          {group?.groupType === "private"
                            ? "Private"
                            : "Public"}
                          Group
                        </span>
                        <span className="mr-1">|</span>
                        <span className="text-ellipsis groups-members-text">{`${group.members} members`}</span>
                      </p>
                      <p className="text-body-12 m-0 mt-1">
                        <span>
                          Created on{" "}
                          {moment(group?.createdAt).format("DD MMM YYYY")}{" "}
                        </span>
                        <span className="mr-1">|</span>
                        Created By
                        <span className="ml-1 text-primary pointer">
                          <Link href={createdByFunction(group?.createdBy)}>
                            <a className="text-primary">
                              {group?.createdBy?.name}
                            </a>
                          </Link>
                        </span>
                      </p>
                    </div>
                  </div>
                  <div
                    className="order-2 ml-auto order-md-0"
                    onClick={() => {
                      dispatch(
                        groupRequestReceived({ groupId: group.id })
                      ).then((data) => {
                        setSUbList((prevState) => {
                          const newSubList = [...prevState];
                          newSubList[index] = data;
                          return newSubList;
                        });
                      });
                      setShowSubList((prevState) => {
                        const newState = [...prevState];
                        newState[index] = !newState[index];
                        return newState;
                      });
                    }}
                  >
                    <img
                      className="ml-2 pointer"
                      src="/assets/images/cap-icon.svg"
                      alt="cap-icon"
                      style={{
                        transition: "0.3s ease",
                        transform: showSubList[index]
                          ? "rotate(0deg)"
                          : "rotate(180deg)",
                      }}
                    />
                  </div>
                </div>
              </li>
              {showSubList[index] &&
                Array.isArray(subList) &&
                subList[index]?.map((list) => (
                  <ListGroup className="mb-2">
                    <ListGroupItem className="px-2">
                      <div className="d-md-flex ">
                        <img
                          src={
                            list?.userDetails?.type == "user"
                              ? list?.userDetails?.profilePicURL || ""
                              : list?.userDetails?.type == "Company"
                              ? list?.userDetails?.companyDetail?.logo || ""
                              : list?.userDetails?.instituteDetail?.logo || ""
                          }
                          style={{ borderRadius: "50%" }}
                          alt="user"
                          width="40"
                          height="40"
                          onError={(e) =>
                            onImageError(
                              e,
                              "profile",
                              `${
                                list?.userDetails?.type == "user"
                                  ? list?.userDetails?.firstName || ""
                                  : list?.userDetails?.type == "Company"
                                  ? list?.userDetails?.companyDetail
                                      ?.companyName || ""
                                  : list?.userDetails?.instituteDetail?.name ||
                                    ""
                              } ${
                                list?.userDetails?.type == "user"
                                  ? list?.userDetails?.lastName || ""
                                  : ""
                              }`
                            )
                          }
                        />

                        <Link href={`/profile/${list.userDetails.profileId}`}>
                          <a className="text-primary">
                            <p className="ml-2 mt-2 text-body-13 text-primary ">
                              {`${
                                list?.userDetails?.type == "user"
                                  ? list?.userDetails?.firstName || ""
                                  : list?.userDetails?.type == "Company"
                                  ? list?.userDetails?.companyDetail
                                      ?.companyName || ""
                                  : list?.userDetails?.instituteDetail?.name ||
                                    ""
                              } ${
                                list?.userDetails?.type == "user"
                                  ? list?.userDetails?.lastName || ""
                                  : ""
                              }`}
                            </p>
                          </a>
                        </Link>
                        <div className="d-inline-flex ml-auto align-items-center">
                          <Button
                            variant="btn btn-outline-gray btn-small-icon w-80-px"
                            onClick={() =>
                              requestHandler(
                                list.id,
                                "rejected",
                                index,
                                list.groupId
                              )
                            }
                          >
                            <CrossIcon />
                            Reject
                          </Button>
                          <Button
                            variant="btn btn-outline-primary btn-small-icon ml-2 w-80-px"
                            onClick={() =>
                              requestHandler(
                                list.id,
                                "accepted",
                                index,
                                list.groupId
                              )
                            }
                          >
                            <TickIcon />
                            Accept
                          </Button>
                        </div>
                      </div>
                    </ListGroupItem>
                  </ListGroup>
                ))}
            </>
          ))
        )}
      </ul>
      {requestedGroupsList?.data?.length < total && (
        <div className="people-tab-view-all-button my-2 border-top border-geyser pt-2">
          <span
            className="people-tab-view-all-button-text"
            onClick={() => setPagesize(pagesize + 5)}
          >
            {lang("COMMON.LOAD_MORE")}
          </span>
        </div>
      )}
    </>
  );
}

export default Requested;
