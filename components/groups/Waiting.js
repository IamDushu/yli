import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { GroupWithdraw, getWaitingList } from "store/actions";
import { createdByFunction, onImageError } from "utils";
import { Link } from "../../routes";

const Waiting = ({ tabKey }) => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [pagesize, setPagesize] = useState(10);
  const [total, setTotal] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const groupsWaitingListing = async () => {
    const body = {
      page,
      pagesize,
      searchText,
    };
    dispatch(getWaitingList(body))
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const actionHandler = (id) => {
    dispatch(GroupWithdraw(id)).then(() => {
      groupsWaitingListing();
    });
  };

  useEffect(() => {
    if (tabKey === "waiting") groupsWaitingListing();
  }, [tabKey, searchText, page, pagesize]);

  useEffect(() => {
    if (waitingGroupList) {
      setTotal(waitingGroupList.total);
    }
  }, [waitingGroupList]);

  const { waitingGroupList } = useSelector(({ groups }) => groups);

  return (
    <>
      <div className="common-searchbar mb-4">
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
              <div className="col-md-9 text-center mx-auto">
                <picture className="mb-3 icon-avatar-54">
                  <span className="material-icons">groups</span>
                </picture>
                <h5 className="mb-5">{lang("GROUP.COMMON.LOADING")}</h5>
              </div>
            </div>
          </div>
        ) : (Array.isArray(waitingGroupList?.data) &&
            waitingGroupList?.data?.length === 0) ||
          waitingGroupList?.data === undefined ? (
          <div>
            <div className="row">
              <div className="col-md-9 text-center mx-auto">
                <picture className="mb-3 icon-avatar-54">
                  <span className="material-icons">groups</span>
                </picture>
                <h5 className="">
                  {lang("GROUP.WAITING.NO_WAITING_GROUP_FOUND")}
                </h5>
                <p className="mb-0">
                  {lang("GROUP.WAITING.ANY_REQUEST_TO_JOIN")}
                </p>
              </div>
            </div>
          </div>
        ) : (
          Array.isArray(waitingGroupList?.data) &&
          waitingGroupList?.data?.map((group, index) => (
            <>
              <li className={`listing-box align-items-start`} key={group?.id}>
                <div className="d-flex align-items-center w-100">
                  <picture
                    className="user-profile-pic mr-3 w-h-120-68 d-flex align-items-center border-radius-8"
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    <source
                      srcSet={`${group?.groupDetails[0]?.imageURL}`}
                      type="image/jpg"
                    />
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
                  <div className="d-sm-flex align-items-center w-100">
                    <div>
                      <Link
                        route={`/groups/${group?.groupDetails[0]?.name}/${group?.groupDetails[0]?.id}`}
                      >
                        <a title={group?.name}>
                          <h5 className="text-body-16 text-two-ellipsis">
                            {group?.groupDetails[0]?.name}
                          </h5>
                        </a>
                      </Link>
                      <p className="text-body-12 m-0">
                        <span>
                          <img
                            className="mr-1"
                            src={
                              group?.groupDetails[0]?.groupType === "private"
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
                    <div className="ml-auto mt-sm-0 mt-2 d-flex jusity-content-end align-items-center mt-sm-0 mt-2">
                      <Button
                        variant="btn btn-sm btn-link text-primary d-flex jusity-content-end align-items-center"
                        onClick={() => actionHandler(group?.id)}
                      >
                        {lang("GROUP.WAITING.WITHDRAW")}
                      </Button>
                    </div>
                  </div>
                </div>
              </li>
            </>
          ))
        )}
      </ul>
      {waitingGroupList?.data?.length < total && (
        <div className="people-tab-view-all-button my-2">
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
};

export default Waiting;
