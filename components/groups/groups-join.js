import { APP_URL } from "config";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  getGroupsJoinedList,
  groupLeave,
  groupMuteUnmute,
} from "store/actions";
import { createdByFunction, debounce, onImageError } from "utils";
import { Link } from "../../routes";
/******************** 
@purpose : Join Group
@Parameter : {tabKey}
@Author : INIC
******************/
function GroupsJoin({ tabKey }) {
  const dispatch = useDispatch();
  const [lang] = useTranslation("language");
  const { groupsJoinedList } = useSelector(({ groups }) => groups);
  const [, setCopied] = useState(false);
  const [page, setPage] = useState(1);
  const [pagesize, setPagesize] = useState(5);
  const [total, setTotal] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (tabKey === "joined") groupsJoinedListing();
  }, [tabKey, searchText, page, pagesize]);

  useEffect(() => {
    if (groupsJoinedList) {
      setTotal(groupsJoinedList.total);
    }
  }, [groupsJoinedList]);

  /******************** 
@purpose : Used for get groups joined list
@Parameter : {}
@Author : INIC
******************/
  const groupsJoinedListing = () => {
    const body = {
      page,
      pagesize,
      searchText,
    };
    dispatch(getGroupsJoinedList(body, "group"))
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  /******************** 
@purpose : Used for group unfollow
@Parameter : { groupId }
@Author : INIC
******************/
  const unfollowHandler = (groupId, userId) => {
    let body = {
      groupId,
      userId,
      removedBy: "self",
    };
    dispatch(groupLeave(body)).then(() => {
      groupsJoinedListing();
    });
  };

  /******************** 
@purpose : Used for group mute & unmute
@Parameter : { groupId, isMuted }
@Author : INIC
******************/
  const muteUnmuteHandler = (groupId, isMuted) => {
    let status = isMuted === false ? true : false;
    let body = {
      groupId,
      status,
    };
    dispatch(groupMuteUnmute(body, "joinGroup"));
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
        ) : (Array.isArray(groupsJoinedList?.data) &&
            groupsJoinedList?.data.length === 0) ||
          groupsJoinedList?.data === undefined ? (
          <div>
            <div className="row">
              <div className="col-md-9 text-center mx-auto">
                <picture className="mb-3 icon-avatar-54">
                  <span className="material-icons">groups</span>
                </picture>
                <h5 className="">{lang("GROUP.COMMON.NO_GROUPS_FOUND")}</h5>
                <p className="mb-0">
                  {lang("GROUP.GROUP_JOINED.NO_JOINED_GROUP")}
                </p>
              </div>
            </div>
          </div>
        ) : (
          Array.isArray(groupsJoinedList?.data) &&
          groupsJoinedList?.data.map((group) => (
            <li className="listing-box align-items-start" key={group?.id}>
              <div className="d-flex align-items-center w-100 flex-md-nowrap flex-wrap">
                <picture
                  className="user-profile-pic mr-3 w-h-120-68 d-flex align-items-center border-radius-8 order-1 order-md-0 mb-2 mb-md-0"
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <source
                    srcSet={`${group.groups.imageURL}`}
                    type="image/jpg"
                  />
                  <img
                    src={`${group.groups.imageURL}`}
                    alt={group.groups.name}
                    className="w-100 object-fill"
                    height="68"
                    onError={(e) => {
                      onImageError(e);
                    }}
                  />
                </picture>
                <div className="order-3 w-100 order-md-0">
                  <Link
                    route={`/groups/${group.groups.name}/${group.groups.id}`}
                  >
                    <a title={group.groups.name}>
                      <h5 className="text-body-16">{group.groups.name}</h5>
                    </a>
                  </Link>
                  <p className="text-body-12 m-0">
                    <span>
                      <img
                        className="mr-1"
                        src={
                          group?.groups?.groupType === "private"
                            ? "/assets/images/private-icon.svg"
                            : "/assets/images/public-icon.svg"
                        }
                        alt="public-icon"
                      />
                      {group?.groups?.groupType === "private"
                        ? " Private "
                        : " Public "}
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
                        text={`${APP_URL}/groups/${group.groups.name}/${group.groups.id}`}
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
                      {group.userId !== group?.groups?.userId && (
                        <>
                          <Dropdown.Item
                            onClick={() =>
                              unfollowHandler(group.groups.id, group.userId)
                            }
                            className="d-flex align-items-center"
                          >
                            <em className="icon icon-unfollow reaction-icons pr-2 font-24"></em>
                            <span>
                              {lang("GROUP.GROUP_JOINED.LEAVE_THIS_GROUP")}
                            </span>
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() =>
                              muteUnmuteHandler(group.groups.id, group.isMuted)
                            }
                            className="d-flex align-items-center"
                          >
                            {group.isMuted === false ? (
                              <em className="icon icon-mute reaction-icons pr-2 font-24"></em>
                            ) : (
                              <i className="bx bx-volume-full pr-2 font-20"></i>
                            )}

                            {group.isMuted === false
                              ? lang("GROUP.GROUP_JOINED.MUTE_THIS_GROUP")
                              : lang("GROUP.GROUP_JOINED.UNMUTE_THIS_GROUP")}
                          </Dropdown.Item>
                        </>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
      {groupsJoinedList?.data?.length < total && (
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

export default GroupsJoin;
