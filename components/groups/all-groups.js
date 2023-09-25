import { APP_URL } from "config";
import React, { useCallback, useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import CopyToClipboard from "react-copy-to-clipboard";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  getAllGroupsList,
  getGroupsJoinedList,
  groupJoinRequest,
  groupsInviteAction,
} from "store/actions";
import { createdByFunction, debounce, onImageError } from "utils";
import { Link } from "../../routes";
import { useTranslation } from "react-i18next";

function AllGroups({ tabKey }) {
  const dispatch = useDispatch();
  const [lang] = useTranslation("language");
  const [page, setPage] = useState(1);
  const [pagesize, setPagesize] = useState(5);
  const [total, setTotal] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { allGroupsList } = useSelector(({ groups }) => groups);

  useEffect(() => {
    if (tabKey === "groups") allGroupsListing();
  }, [tabKey, searchText, page, pagesize]);

  useEffect(() => {
    if (allGroupsList) {
      setTotal(allGroupsList.total);
    }
  }, [allGroupsList]);

  /******************** 
@purpose : Used for get groups joined list
@Parameter : {}
@Author : INIC
******************/
  const allGroupsListing = async () => {
    const body = {
      page,
      pagesize,
      searchText,
    };
    await dispatch(getAllGroupsList(body))
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
    await dispatch(getGroupsJoinedList(body));
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

  /******************** 
@purpose : Used for join Group
@Parameter : { }
@Author : INIC
******************/
  const joinRequest = async (groupId) => {
    let data = {
      groupId,
    };
    dispatch(groupJoinRequest(data)).then(() => {
      allGroupsListing();
      const body = {
        page,
        pagesize,
      };
      dispatch(getGroupsJoinedList(body, "group"));
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
      allGroupsListing();
    });
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
              <div className="col-md-9 text-center mx-auto">
                <picture className="mb-3 icon-avatar-54">
                  <span className="material-icons">groups</span>
                </picture>
                <h5 className="mb-5">{lang("GROUP.COMMON.LOADING")}</h5>
              </div>
            </div>
          </div>
        ) : (Array.isArray(allGroupsList.data) &&
          allGroupsList.data.length === 0) ||
          allGroupsList.data === undefined ? (
          <p style={{ color: "red" }}>
            {lang("GROUP.COMMON.NO_RECORDS_FOUND")}
          </p>
        ) : (
          Array.isArray(allGroupsList.data) &&
          allGroupsList.data.map((group) => (
            <li className="listing-box align-items-start" key={group?.id}>
              <div className="d-flex align-items-center w-100 flex-md-nowrap flex-wrap">
                <picture
                  className="user-profile-pic mr-3 w-h-120-68 d-flex align-items-center border-radius-8 order-1 order-md-0 mb-2 mb-md-0"
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <source srcSet={`${group.imageURL}`} type="image/jpg" />
                  <img
                    src={`${group.imageURL}`}
                    alt={group.name}
                    className="w-100 object-fill"
                    height="68"
                    onError={(e) => {
                      onImageError(e);
                    }}
                  />
                </picture>
                <div className="order-3 w-100 order-md-0 ">
                  <Link route={`/groups/ ${encodeURIComponent(group.name)}/${group.id}`}>
                    <a title={group.name}>
                      <h5 className="font-14 m-0 mb-1 text-two-ellipsis">
                        {group.name}
                      </h5>
                    </a>
                  </Link>
                  <p className="text-body-12 m-0">
                    <span className="mr-1">
                      <img
                        className="mr-1"
                        src={
                          group?.groupType === "private"
                            ? "/assets/images/private-icon.svg"
                            : "/assets/images/public-icon.svg"
                        }
                        alt="public-icon"
                      />
                      {group?.groupType === "private" ? "Private" : "Public"}
                      Group
                    </span>
                    <span className="mr-1">|</span>
                    <span className="text-ellipsis groups-members-text">{`${group.members} members`}</span>
                  </p>
                  <p className="text-body-12 m-0 mt-1">
                    <span>
                      {lang("COMMON.CREATED_ON")}{" "}
                      {moment(group?.createdAt).format("DD MMM YYYY")}{" "}
                    </span>
                    <span className="mr-1">|</span>
                    {lang("COMMON.CREATED_BY")}
                    <span className="ml-1 text-primary pointer">
                      <Link href={createdByFunction(group?.createdBy)}>
                        <a className="text-primary">{group?.createdBy?.name}</a>
                      </Link>
                    </span>
                  </p>
                </div>
                <div className="ml-auto d-flex order-2 order-md-0">
                  <Dropdown className="theme-dropdown">
                    <Dropdown.Toggle>
                      <em className="icon icon-ellipsis-h font-24 text-black"></em>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <CopyToClipboard
                        text={`${APP_URL}/groups/${group.name}/${group.id}`}
                        onCopy={() => setCopied(true)}
                      >
                        <Dropdown.Item
                          href="#/action-2"
                          className="d-flex align-items-center"
                        >
                          <em className="icon icon-copy-link reaction-icons pr-2 font-24"></em>
                          <span>
                            {lang("GROUP.COMMON.GROUP_COPY_CLIPBOARD")}
                          </span>
                        </Dropdown.Item>
                      </CopyToClipboard>
                      {group.isUserInvited ? (
                        <>
                          <Dropdown.Item
                            className="d-flex align-items-center"
                            onClick={() =>
                              actionHandler(group.isInvitedData.id, "accepted")
                            }
                          >
                            <em className="icon icon-approve font-24 pr-2"></em>
                            {lang("GROUP.COMMON.GROUP_ACCEPT")}
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="d-flex align-items-center"
                            onClick={() =>
                              actionHandler(group.isInvitedData.id, "rejected")
                            }
                          >
                            <em className="iicon icon-deny font-24 pr-2"></em>
                            {lang("GROUP.COMMON.GROUP_DENY")}
                          </Dropdown.Item>
                        </>
                      ) : group.isGroupMember === null ? (
                        <Dropdown.Item
                          className="d-flex align-items-center"
                          onClick={() => joinRequest(group.id)}
                        >
                          <em className="icon icon-approve font-24 pr-2"></em>
                          {`${group.groupType === "public"
                            ? lang("GROUP.COMMON.JOIN_THIS_GROUP")
                            : group?.requestSent === 1
                              ? lang("GROUP.COMMON.GROUP_REQUESTED")
                              : lang("GROUP.COMMON.REQUEST_TO_JOIN")
                            }`}
                        </Dropdown.Item>
                      ) : (
                        ""
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
      {allGroupsList?.data?.length < total && (
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

export default AllGroups;
