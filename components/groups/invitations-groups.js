import { CrossIcon, TickIcon } from "components/svg/connections";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  getGroupsInviteReceived,
  getGroupsJoinedList,
  groupsInviteAction,
} from "store/actions";
import { createdByFunction, debounce, onImageError } from "utils";
import { Link } from "../../routes";
/******************** 
@purpose : Group Invitation
@Parameter : {tabKey}
@Author : INIC
******************/
function InvitationsGroups({ tabKey }) {
  const dispatch = useDispatch();
  const { groupsInviteReceived } = useSelector(({ groups }) => groups);
  const [lang] = useTranslation("language");
  const [page, setPage] = useState(1);
  const [pagesize, setPagesize] = useState(5);
  const [total, setTotal] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (tabKey === "invitations") groupsInvitationsListing();
  }, [tabKey, searchText, page, pagesize]);

  useEffect(() => {
    if (groupsInviteReceived) {
      setTotal(groupsInviteReceived.total);
    }
  }, [groupsInviteReceived]);

  /******************** 
@purpose : Used for get groups list
@Parameter : {}
@Author : INIC
******************/
  const groupsInvitationsListing = () => {
    const body = {
      page,
      pagesize,
      searchText,
    };
    dispatch(getGroupsInviteReceived(body))
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  /******************** 
@purpose : Used for accepted & rejected group
@Parameter : { id }
@Author : INIC
******************/
  const actionHandler = (id, action) => {
    let body = {
      id: id,
      action,
    };

    dispatch(groupsInviteAction(body)).then(() => {
      groupsInvitationsListing();
      dispatch(getGroupsJoinedList({ page, pagesize }, "group"));
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
              <div className="col-md-9 text-center mx-auto">
                <picture className="mb-3 icon-avatar-54">
                  <span className="material-icons">groups</span>
                </picture>
                <h5 className="mb-5">{lang("GROUP.COMMON.LOADING")}</h5>
              </div>
            </div>
          </div>
        ) : (Array.isArray(groupsInviteReceived?.data) &&
            groupsInviteReceived?.data.length === 0) ||
          groupsInviteReceived?.data === undefined ? (
          <div>
            <div className="row">
              <div className="col-md-9 text-center mx-auto">
                <picture className="mb-3 icon-avatar-54">
                  <span className="material-icons">groups</span>
                </picture>
                <h5 className="">
                  {lang("GROUP.INVITATIONS.NO_INVITATIONS_FOUND")}
                </h5>
                <p className="mb-0">
                  {lang("GROUP.INVITATIONS.NO_INVITATIONS_RIGHT_NOW")}
                </p>
              </div>
            </div>
          </div>
        ) : (
          Array.isArray(groupsInviteReceived?.data) &&
          groupsInviteReceived?.data.map((group, i) => (
            <li className="listing-box align-items-start" key={i}>
              <div className="d-md-flex align-items-center w-100">
                <div className="d-md-flex align-items-center w-100">
                  <picture
                    className="user-profile-pic mr-3 w-h-120-68 d-flex align-items-center border-radius-8"
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    <source
                      srcSet={`${group.groupData.imageURL}`}
                      type="image/jpg"
                    />
                    <img
                      src={`${group.groupData.imageURL}`}
                      alt={group.groupData.name}
                      className="w-100 object-fill"
                      height="68"
                      onError={(e) => {
                        onImageError(e);
                      }}
                    />
                  </picture>
                  <div className="mr-2 mt-2 mt-md-0">
                    <Link
                      route={`/groups/${group.groupData.name}/${group.groupId}`}
                    >
                      <a title={group.groupData.name}>
                        <h5 className="text-body-16 m-0 mb-1 text-two-ellipsis">
                          {group.groupData.name}
                        </h5>
                      </a>
                    </Link>
                    <p className="text-body-12 mb-0">
                      <span>
                        <img
                          className="mr-1"
                          src={
                            group?.groupData?.groupType === "private"
                              ? "/assets/images/private-icon.svg"
                              : "/assets/images/public-icon.svg"
                          }
                          alt="public-icon"
                        />
                        {group?.groupData?.groupType === "private"
                          ? "Private"
                          : "Public"}
                        Group
                      </span>
                      <span className="mr-1">|</span>
                      <span className="text-ellipsis groups-members-text">
                        {" "}
                        {`${group.members} members`}
                      </span>
                    </p>
                    <p className="text-body-12 m-0 mt-1">
                      <span>
                        Created on{" "}
                        {moment(group?.groupData?.createdAt).format(
                          "DD MMM YYYY"
                        )}{" "}
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
                <div className="ml-sm-auto mt-md-0 mt-3 d-flex flex align-items-center mt-2">
                  <Button
                    variant="btn btn-outline-gray btn-small-icon w-80-px"
                    onClick={() => actionHandler(group.id, "rejected")}
                  >
                    <CrossIcon />
                    {lang("CONNECTIONS.REJECT")}
                  </Button>
                  <Button
                    variant="btn btn-outline-primary btn-small-icon ml-2 w-80-px"
                    onClick={() => actionHandler(group.id, "accepted")}
                  >
                    <TickIcon />
                    {lang("GROUP.COMMON.GROUP_ACCEPT")}
                  </Button>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
      {groupsInviteReceived?.data?.length < total && (
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

export default InvitationsGroups;
