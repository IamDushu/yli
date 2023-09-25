import { APP_URL } from "config";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toggleModals } from "store/actions";
import {
  groupMuteUnmute,
  setGroupIdToDelete,
  setMyGroupDetails,
} from "store/actions/groups";
import { createdByFunction, debounce, onImageError } from "utils";
import { Link } from "../../routes";
import { getGroupsList } from "../../store/actions/groups";
/******************** 
@purpose : MY groups
@Parameter : {tabKey}
@Author : INIC
******************/
function MyGroups({ tabKey }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { groupsList } = useSelector(({ groups }) => groups);
  const [lang] = useTranslation("language");
  const [page, setPage] = useState(1);
  const [pagesize, setPagesize] = useState(5);
  const [total, setTotal] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (tabKey === "my-groups") groupsListing();
  }, [tabKey, searchText, page, pagesize]);

  useEffect(() => {
    if (groupsList) {
      setTotal(groupsList.total);
    }
  }, [groupsList]);

  /******************** 
@purpose : Used for get groups list
@Parameter : {}
@Author : INIC
******************/
  const groupsListing = () => {
    const body = {
      page,
      pagesize,
      searchText,
    };
    dispatch(getGroupsList(body))
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
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
    dispatch(groupMuteUnmute(body, "myGroup"));
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
        ) : (Array.isArray(groupsList.data) && groupsList.data.length === 0) ||
          groupsList.data === undefined ? (
          <div>
            <div className="row">
              <div className="col-md-9 text-center mx-auto">
                <picture className="mb-3 icon-avatar-54">
                  <span className="material-icons">groups</span>
                </picture>
                <h5 className="">{lang("GROUP.COMMON.NO_GROUPS_FOUND")}</h5>
                <p className="mb-0">{lang("GROUP.MY_GROUPS.ANY_GROUP_YET")}</p>
              </div>
            </div>
          </div>
        ) : (
          Array.isArray(groupsList.data) &&
          groupsList.data.map((group) => (
            <li className="listing-box align-items-start" key={group?.id}>
              <div className="d-flex align-items-center w-100 flex-md-nowrap flex-wrap">
                <picture
                  className="user-profile-pic mr-3 w-h-120-68 d-flex align-items-center border-radius-8 order-1 order-md-0 mb-2 mb-md-0"
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <source srcSet={`${group.imageURL}` || ""} type="image/jpg" />
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
                <div className="order-3 w-100 order-md-0">
                  <Link route={`/groups/${group.name}/${group.id}`}>
                    <a title={group.name}>
                      <h5 className="text-body-16">{group.name}</h5>
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
                  <Dropdown className="theme-dropdown my-groups-dropdown">
                    <Dropdown.Toggle>
                      <em className="icon icon-ellipsis-h font-24 text-black"></em>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <CopyToClipboard
                        text={`${APP_URL}/groups/${group.name}/${group.id}`}
                        onCopy={() => setCopied(true)}
                      >
                        <Dropdown.Item className="d-flex align-items-center">
                          <em className="icon icon-copy-link reaction-icons pr-2 font-24"></em>
                          <span>
                            {lang("GROUP.COMMON.GROUP_COPY_CLIPBOARD")}
                          </span>
                        </Dropdown.Item>
                      </CopyToClipboard>
                      <Dropdown.Item
                        onClick={() => {
                          dispatch(toggleModals({ groupdeleteconfirms: true }));
                          dispatch(setGroupIdToDelete(group.id));
                          dispatch(
                            setMyGroupDetails({ page, pagesize, searchText })
                          );
                        }}
                        className="d-flex align-items-center"
                      >
                        <span className="icon-delete font-16 pr-2 text-info"></span>
                        {lang("COMMON.DELETE")}
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          router.push({
                            pathname: "/groups/edit-groups",
                            query: { id: group.id, isEdit: true },
                          });
                        }}
                        className="d-flex align-items-center"
                      >
                        <span className="icon-write font-16 pr-2 text-info"></span>
                        {lang("COMMON.EDIT")}
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="d-flex align-items-center"
                        onClick={() => {
                          router.push(`/groups/group-members/${group?.id}`);
                        }}
                      >
                        <i className="bx bxs-user reaction-icons pr-2 font-20"></i>
                        <span>{lang("GROUP.COMMON.EXCLUDE_MEMBER")}</span>
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() =>
                          muteUnmuteHandler(
                            group?.id,
                            group?.isGroupMember?.isMuted
                          )
                        }
                        className="d-flex align-items-center"
                      >
                        {group?.isGroupMember?.isMuted === false ? (
                          <em className="icon icon-mute reaction-icons pr-2 font-24"></em>
                        ) : (
                          <i className="bx bx-volume-full pr-2 font-20"></i>
                        )}

                        {group?.isGroupMember?.isMuted === false
                          ? lang("GROUP.GROUP_JOINED.MUTE_THIS_GROUP")
                          : lang("GROUP.GROUP_JOINED.UNMUTE_THIS_GROUP")}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
      {groupsList.data?.length < total && (
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

export default MyGroups;
