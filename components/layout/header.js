import React, { useContext, useEffect, useMemo, useState } from "react";
import { useRouter, withRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { slide as Menuu } from "react-burger-menu";
import { Container, Avatar, Card, Link as MuiLink } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Form, FormControl, Button, Dropdown } from "react-bootstrap";
// import { FormControl, Dropdown, Button } from '@mui/base';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import SearchIcon from "@mui/icons-material/Search";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Link } from "../../routes";
import { HeaderProfile } from "components/header/header-profile-section";
import { Logo } from "components/header/logo";
import { HeaderLabel } from "components/header/main-menu-label";
import { SearchBar } from "components/header/search-bar";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import {
  toggleModals,
  logout,
  setSocketDetails,
  getUserProfileData,
  getPendingConnectionsList,
  getEntityDetails,
  updateEvents,
  removeEvents,
  // setEntityDetails,
} from "../../store/actions";
import { getCommunication } from "store/actions/communication";
import {
  // getSearchResults,
  getRecentSearchList,
  clearRecentSearchList,
  clearSearchList,
  saveSearchText,
  getSearchedUsersList,
  _getSearchedUsersList,
} from "../../store/actions/search-result";
import {
  HOME,
  GROUPS,
  MY_CONNECTIONS,
  DASHBOARD,
  MESSAGES,
  NOTIFICATIONS,
  EVENTS,
} from "../../routes/urls"; // Link Urls
import {
  getCookie,
  setCookie,
  onImageError,
  createImageFromInitials,
  postTokenUnix,
  showToast,
  SOCKET_EVENTS,
  setSession,
  getSession,
  removeSession,
} from "utils";
import {
  searchedUsersList,
  selectRecentSearchData,
  selectSearchText,
} from "store/selectors/searchResult";
import socketIOClient from "socket.io-client";
import { SOCKET_END_POINT } from "../../config";
import { getNotificationsList } from "store/actions/notifications";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { ChatContext } from "context/ChatContext";
import { useYchat } from "hooks/useYchat";
import dynamic from "next/dynamic";
const ChatList = dynamic(() => import("components/messagesV2/ChatList"));
const CurrentChannel = dynamic(() =>
  import("components/messages/CurrentChannel")
);
const Header = (props) => {
  const [lang] = useTranslation("language");
  const globalSearchName = getSession("globalSearchName");
  const dispatch = useDispatch();
  const router = useRouter();
  const token = getCookie("token");
  /***** MM Ychat ******/
  const { connectYchat } = useYchat();
  const { currentChannel, unreadMessageCount } = useContext(ChatContext);
  const showSignup = useSelector((state) => state.user.allowSignup);
  const user = useSelector(({ user }) => user);
  const entityData = useSelector((state) => state?.user?.userEntityDetails);
  const entityDetails =
    entityData.length && typeof entityData === "string"
      ? JSON.parse(entityData)
      : entityData;

  const list = useSelector((state) => state.connections.pendingConnectionList);
  const searchData = useSelector(selectRecentSearchData);
  const recentVisitorDetails = useMemo(
    () => searchData.filter((obj) => obj.recentVisitorDetails !== null),
    [searchData]
  );
  const globalSearchText = useSelector(selectSearchText);
  const notificationData = useSelector(
    ({ notifications }) => notifications.notifications
  );
  const searchedUserList = useSelector(searchedUsersList);
  useEffect(() => {
    if (token) {
      dispatch(getUserProfileData());
      dispatch(getCommunication());
      dispatch(
        getPendingConnectionsList({
          page: 1,
          pagesize: 8,
          search: "",
        })
      );
      dispatch(
        getNotificationsList({
          isBadgeClicked:
            props.router.pathname === "/notifications/notifications"
              ? true
              : false,
          page: 1,
          pagesize: 20,
        })
      );
      connectYchat();
    }
  }, []);

  /******************* 
  @purpose : Used fetching entity detials
  @Parameter : {}
  @Author : INIC
  ******************/
  useEffect(() => {
    if (user?.userInfo?.type && !entityDetails?.id) {
      dispatch(getEntityDetails({ name: _.startCase(user?.userInfo?.type) }));
    }
  }, [user?.userInfo?.type]);

  /******************* 
@purpose : Used for all useState
@Parameter : {}
@Author : INIC
******************/
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchList, setSearchList] = useState([]);

  const [close, setClose] = useState(true);

  const [unreadMessageCountState, setUnreadMessageCountState] = useState(0);

  /******************** 
@purpose : User Info
@Parameter : {}
@Author : INIC
******************/
  let userData = user?.userInfo || {};
  if (user?.userInfo && typeof user.userInfo === "string")
    userData = JSON.parse(user.userInfo);

  /******************** 
@purpose : Get Notification List
@Parameter : {}
@Author : INIC
******************/
  useEffect(() => {
    if (currentChannel) {
      setClose(false);
    }
  }, [currentChannel]);

  useEffect(() => {
    setUnreadMessageCountState(unreadMessageCount);
  }, [unreadMessageCount]);

  useEffect(() => {
    if (userData?.id) {
      const socket = socketIOClient(SOCKET_END_POINT);
      let data = {
        userId: userData?.id,
        socketId: socket?.id,
      };

      dispatch(setSocketDetails(socket));

      socket.on(SOCKET_EVENTS.ONLINE_USER_SAVED, (data) => {
        console.log(data, "from socket onlineUserSaved");
      });

      socket.emit(SOCKET_EVENTS.NEW_USER, data);

      socket.on(SOCKET_EVENTS.TEST, (data) => {
        showToast({ message: data });
      });

      socket.on(SOCKET_EVENTS.NOT_FOUND, (data) => {});

      socket.on(SOCKET_EVENTS.GET_NOTIFICATION, (data) => {
        dispatch(
          getNotificationsList({
            page: 1,
            pagesize: 20,
          })
        );
        if (
          data.type !== "Peer Producer" &&
          data.type !== "Admin Peer Producer"
        ) {
          showToast({ message: data?.message });
        }

        if (data.notificationData && data.notificationData.mType) {
          if (data.notificationData.mType == "calendarEventUpdate") {
            const event = JSON.parse(data.notificationData.event);
            dispatch(updateEvents(event));
          } else if (data.notificationData.mType == "calendarEventDelete") {
            dispatch(removeEvents(data.notificationData.eventId));
          }
        }
      });

      return () => socket.disconnect();
    }
  }, []);

  /******************** 
@purpose : Search List
@Parameter : {}
@Author : INIC
******************/
  useEffect(() => {
    if (searchData) {
      setSearchList(searchData);
    }
  }, [searchData]);

  useEffect(() => {
    if (
      userData?.showHeaderMenu === undefined &&
      userData?.isSignUpDetailsCompleted !== true
    ) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }

    if (
      userData?.["otherSettings"] !== undefined &&
      userData?.["otherSettings"] !== null &&
      userData?.["otherSettings"]["language"] !== undefined
    ) {
      changeLanguage(userData["otherSettings"]["language"]);
    }
  }, [userData?.id, userData?.otherSettings?.language]);

  /******************* 
  @purpose : Used to set preferred language
  @Parameter : {language}
  @Author : YLIWAY
  ******************/
  const changeLanguage = async (lang) => {
    await i18next.changeLanguage(lang);
    setCookie("language", lang);
  };

  /******************** 
@purpose : Used for logout
@Parameter : {}
@Author : INIC
******************/
  useEffect(() => {
    if (userData?.isDeleted === true || userData?.status === false) {
      dispatch(logout());
    }
  }, [userData?.isDeleted, userData?.status]);

  useEffect(async () => {
    let token = getCookie("token");
    token && (await dispatch(getRecentSearchList()));
  }, []);

  const getSearchedUserLists = async (text) => {
    await dispatch(
      _getSearchedUsersList({
        page: 1,
        pagesize: 10,
        searchText: text,
      })
    );
  };

  const handleSubmit = (e, text) => {
    e.preventDefault();
    let body = {
      page: 1,
      pagesize: 10,
      searchText: text ? text : searchText,
    };

    if (body.searchText !== "") {
      dispatch(saveSearchText(body.searchText));
      // dispatch(getSearchResults(body));
      router.push("/search-result");
    }
    props.setShowSearchList("mega-search d-none");
  };

  const clearRecentSearchResult = () => {
    dispatch(clearRecentSearchList(lang));
    dispatch(clearSearchList());
    setSearchList([]);
    props.setShowSearchList("mega-search d-none");
  };

  /******************* 
  @purpose : Last Name Handler
  @Author : INIC
  ******************/
  const lastNameHandler = (item, lastNameVisibility) => {
    if (
      lastNameVisibility === null ||
      lastNameVisibility?.settings?.all ||
      (item?.connectionData &&
        item?.connectionData[0]?.isConnection &&
        lastNameVisibility?.settings?.myConnection) ||
      (item?.followData &&
        item?.followData[0]?.isFollow &&
        lastNameVisibility?.settings?.followers) ||
      (item?.growthConnectionData &&
        item?.growthConnectionData?.isGrowthConnection &&
        lastNameVisibility?.settings?.myGrowthConnection)
    ) {
      return true;
    }
  };
  /******************* 
  @purpose : Image Preference Handler 
  @Author : INIC
  ******************/
  const imagePreferencHandler = (item, profilePicShowData) => {
    if (
      profilePicShowData === null ||
      profilePicShowData?.all ||
      (item?.connectionData &&
        item?.connectionData[0]?.isConnection &&
        profilePicShowData?.myConnections) ||
      (item?.followData &&
        item?.followData[0]?.isFollow &&
        profilePicShowData?.followers) ||
      (item?.growthConnectionData &&
        item?.growthConnectionData?.isGrowthConnection &&
        profilePicShowData?.myGrowthConnections) ||
      (userData.role &&
        ((userData.role.includes("Teacher") && profilePicShowData.teachers) ||
          (userData.role.includes("Trainer") && profilePicShowData.trainer) ||
          (userData.role.includes("Coach") && profilePicShowData.coach) ||
          (userData.role.includes("Host") && profilePicShowData.hosts)))
    ) {
      return true;
    }
  };
  /************************************** 
  @purpose : Search Text in Header 
  @Author : YLIWAY
  *************************************/
  useEffect(() => {
    if (globalSearchName && router.pathname === "/search-result") {
      setSearchText(globalSearchName);
    } else if (router.pathname !== "/search-result") {
      removeSession("globalSearchName");
      setSearchText("");
    }
  }, [globalSearchName, router]);
  useEffect(() => {
    if (router.pathname === "/search-result" && globalSearchText) {
      setSession("globalSearchName", globalSearchText);
    } else if (
      router.pathname === "/search-result" &&
      router.asPath.startsWith("/search-result#")
    ) {
      setSession(
        "globalSearchName",
        router.asPath.replace("/search-result", "")
      );
    }
  }, [globalSearchText, router.pathname]);

  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header>
      <Grid
        container
        maxWidth="1160px"
        marginLeft={"auto"}
        marginRight={"auto"}
        paddingLeft={{ md: 2, xs: 1 }}
        paddingRight={{ md: 2, xs: 1 }}
      >
        <div
          className={
            isLoggedIn
              ? "d-flex justify-content-between w-100"
              : "d-flex justify-content-between w-100 signup-option"
          }
        >
          {/* signup-option this class add condition base when user not logged */}
          <div className="header-left-wrap d-flex justify-content-between align-items-sm-center flex-shrink-0">
            <div className="header-logo">
              <Link route={HOME}>
                <a role="button" className="navbar-brand">
                  <Logo logoUrl={"/assets/images/brand-logo.svg"} />
                </a>
              </Link>
            </div>
            {/* <Image
                    src={"/assets/images/brand-logo.svg"}
                    alt="Yliway"
                    width={170}
                    height={33.16}
                  /> */}
            <Form
              inline
              className="d-sm-none searchbar-wrap"
              onSubmit={() => {
                handleSubmit();
              }}
            >
              {isSearchActive && (
                <SearchBar
                  handleInput={(e) => {
                    setSearchText(e);
                    getSearchedUserLists(e);
                  }}
                  searchLogoUrl={"/assets/images/search-icon.svg"}
                  handleClick={() => setIsSearchActive(!isSearchActive)}
                  placeHolderText={lang(
                    "HEADER.GLOBAL_SEARCH.INPUT_PLACEHOLDER"
                  )}
                />
              )}
              {/* {isSearchActive && (
                <FormControl
                  type="text"
                  placeholder={lang("HEADER.GLOBAL_SEARCH.INPUT_PLACEHOLDER")}
                  className="mr-sm-2"
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                    getSearchedUserLists(e.target.value);
                  }}
                  autoComplete="off"
                  onFocus={() => props.setShowSearchList("mega-search")}
                />
              )}
              <i
                className="bx bx-search"
                onClick={() => setIsSearchActive(!isSearchActive)}
              /> */}
              <div className={props.showSearchList}>
                {searchText !== "" &&
                  searchedUserList &&
                  searchedUserList.rows?.length > 0 && (
                    <Card className="p-0">
                      <ul className="list-unstyled mb-0">
                        {searchedUserList.rows.map((itm, index) => (
                          <li
                            className="py-2 px-3 d-flex align-items-center bg-hover"
                            key={index}
                          >
                            <em className="icon icon-search reaction-icons"></em>
                            <Link route={`/profile/${itm?.profileId}`}>
                              <a
                                role="button"
                                className="text-body-14 pl-2 d-flex jusitify-content-center align-items-center w-100"
                              >
                                {itm.firstName}{" "}
                                {lastNameHandler(itm, itm.lastNameVisibility)
                                  ? itm.lastName
                                  : ""}{" "}
                                {itm?.role}
                                <img
                                  src={
                                    imagePreferencHandler(
                                      itm,
                                      itm.profilePicShowData
                                    )
                                      ? itm.profilePicURL || ""
                                      : ""
                                  }
                                  onError={(e) => {
                                    onImageError(
                                      e,
                                      "profile",
                                      `${itm.firstName} ${
                                        lastNameHandler(
                                          itm,
                                          itm.lastNameVisibility
                                        )
                                          ? itm.lastName
                                          : ""
                                      }`
                                    );
                                  }}
                                  width="32"
                                  height="32"
                                  className="border ml-auto rounded-pill overflow-hidden w-h-32 img-fluid object-cover"
                                  alt={itm.firstName}
                                />
                              </a>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <div className="border-top border-geyser text-center px-3 py-2">
                        <a
                          role="button"
                          className="text-body-12 text-primary font-weight-semibold pointer"
                          onClick={(e) => handleSubmit(e, searchText)}
                        >
                          {lang("HEADER.GLOBAL_SEARCH.SEE_ALL")}
                        </a>
                      </div>
                    </Card>
                  )}
              </div>
              <div className={props.showSearchList}>
                {searchText == "" && searchList && searchList.length > 0 && (
                  <Card className="p-0">
                    <div className="border-bottom border-geyser d-flex align-items-center justify-content-between p-3">
                      <h4 className="text-body-16 mb-0">
                        {lang("HEADER.GLOBAL_SEARCH.RECENT_SEARCHES")}
                      </h4>{" "}
                      <a
                        role="button"
                        className="text-body-12 text-secondary font-weight-semibold pointer"
                        onClick={clearRecentSearchResult}
                      >
                        {lang("HEADER.GLOBAL_SEARCH.CLEAR_ALL")}
                      </a>
                    </div>
                    {recentVisitorDetails &&
                      recentVisitorDetails?.length > 0 && (
                        <div className="header-search-box">
                          {searchList &&
                            searchList.map((item, i) => {
                              return (
                                item?.recentVisitorDetails &&
                                Object.keys(item?.recentVisitorDetails).length >
                                  0 && (
                                  <Card
                                    key={i}
                                    className="flex-shrink-0 header-search-list cursor-pointer"
                                    onClick={() =>
                                      window.open(
                                        `/profile/${item?.recentVisitorDetails?.profileId}`,
                                        "_self"
                                      )
                                    }
                                  >
                                    <img
                                      src={
                                        imagePreferencHandler(
                                          item?.recentVisitorDetails &&
                                            item?.recentVisitorDetails,
                                          item?.recentVisitorDetails &&
                                            item?.recentVisitorDetails
                                              ?.profilePicShowData
                                        )
                                          ? item.recentVisitorDetails
                                              ?.profilePicURL || ""
                                          : ""
                                      }
                                      className="m-auto rounded-pill overflow-hidden w-h-40 img-fluid object-cover"
                                      alt={
                                        item.recentVisitorDetails.firstName +
                                        " " +
                                        item.recentVisitorDetails.lastName
                                      }
                                      width="40"
                                      hegiht="40"
                                      onError={(e) =>
                                        onImageError(
                                          e,
                                          "profile",
                                          `${
                                            item.recentVisitorDetails.firstName
                                          } ${
                                            lastNameHandler(
                                              item.recentVisitorDetails &&
                                                item.recentVisitorDetails,
                                              item.recentVisitorDetails &&
                                                item.recentVisitorDetails
                                                  .lastNameVisibility
                                            )
                                              ? item.recentVisitorDetails
                                                  .lastName
                                              : ""
                                          }`
                                        )
                                      }
                                    />
                                    <h6 className="text-body-12 font-weight-semibold text-secondary mt-2 mb-0">
                                      {item.recentVisitorDetails.firstName}{" "}
                                      {lastNameHandler(
                                        item.recentVisitorDetails &&
                                          item.recentVisitorDetails,
                                        item.recentVisitorDetails &&
                                          item.recentVisitorDetails
                                            .lastNameVisibility
                                      )
                                        ? item.recentVisitorDetails.lastName
                                        : ""}
                                    </h6>
                                  </Card>
                                )
                              );
                            })}
                        </div>
                      )}
                    <ul className="list-unstyled mb-0">
                      {searchList &&
                        searchList.map((item, i) => {
                          return (
                            item.recentVisitorDetails === null && (
                              <li
                                key={i}
                                className="py-12 px-3 d-flex bg-hover"
                                onClick={(e) => {
                                  setSearchText(item.searchText);
                                  handleSubmit(e, item.searchText);
                                  props.setShowSearchList("mega-search d-none");
                                }}
                              >
                                <em className="icon icon-time reaction-icons"></em>
                                <a
                                  role="button"
                                  // href="javascript(0);"
                                  className="text-body-14 pl-2"
                                >
                                  {item.searchText &&
                                    item.searchText.trim() !== "" &&
                                    item.searchText}
                                </a>
                              </li>
                            )
                          );
                        })}
                    </ul>
                  </Card>
                )}
              </div>
            </Form>
            {/* <Form.Control
                    type="text"
                    placeholder={lang("HEADER.GLOBAL_SEARCH.INPUT_PLACEHOLDER")}
                    value={searchText}
                    onChange={(e) => {
                      setSearchText(e.target.value);
                      getSearchedUserLists(e.target.value);
                    }}
                    autoComplete="off"
                    onFocus={() => props.setShowSearchList("mega-search")}
                    className="input-shadow rounded-lg"
                  />
                  <em className="bx bx-search"></em> */}
            {userData?.showHeaderMenu !== false && (
              <Form className="header-searchbar" onSubmit={handleSubmit}>
                <Form.Group
                  controlId="formSearch"
                  className="position-relative m-0"
                >
                  <SearchBar
                    handleInput={(e) => {
                      setSearchText(e);
                      getSearchedUserLists(e);
                    }}
                    handleClick={() => setIsSearchActive(!isSearchActive)}
                    searchLogoUrl={"/assets/images/search-icon.svg"}
                    onFocus={() => props.setShowSearchList("mega-search")}
                    autoComplete="off"
                    placeHolderText={lang(
                      "HEADER.GLOBAL_SEARCH.INPUT_PLACEHOLDER"
                    )}
                  />
                  <div className={props.showSearchList}>
                    {searchText !== "" && searchedUserList && (
                      <Card className="p-0">
                        <ul className="list-unstyled mb-0">
                          {[
                            ...(searchedUserList?.users?.rows || []),
                            ...(searchedUserList?.teacher?.rows || []),
                            ...(searchedUserList?.trainer?.rows || []),
                            ...(searchedUserList?.coach?.rows || []),
                            ...(searchedUserList?.host?.rows || []),
                          ].map(
                            (itm, index) =>
                              itm.firstName !== null && (
                                <ListItem
                                  className="py-2 px-3 d-flex align-items-center bg-hover"
                                  key={index}
                                >
                                  <ListItemIcon style={{ minWidth: 0 }}>
                                    <SearchIcon className="icon icon-search reaction-icons" />
                                  </ListItemIcon>
                                  <MuiLink
                                    href={`/profile/${itm?.profileId}`}
                                    underline="none"
                                  >
                                    <ListItemText
                                      primary={
                                        <div className="text-body-14 pl-2 d-flex justify-content-center align-items-center w-100">
                                          {itm.firstName}{" "}
                                          {lastNameHandler(
                                            itm,
                                            itm.lastNameVisibility
                                          )
                                            ? itm.lastName
                                            : ""}{" "}
                                          {itm?.role}
                                        </div>
                                      }
                                    />
                                  </MuiLink>
                                  <Avatar
                                    src={
                                      imagePreferencHandler(
                                        itm,
                                        itm.profilePicShowData
                                      )
                                        ? itm.profilePicURL || ""
                                        : ""
                                    }
                                    onError={(e) => {
                                      onImageError(
                                        e,
                                        "profile",
                                        `${itm.firstName} ${
                                          lastNameHandler(
                                            itm,
                                            itm.lastNameVisibility
                                          )
                                            ? itm.lastName
                                            : ""
                                        }`
                                      );
                                    }}
                                    width="32"
                                    height="32"
                                    className="border ml-auto rounded-pill overflow-hidden w-h-32 img-fluid object-cover"
                                    alt={itm.firstName}
                                  />
                                </ListItem>
                              )
                          )}
                          {searchedUserList?.institute?.rows?.length
                            ? searchedUserList?.institute?.rows?.map(
                                (itm, index) => {
                                  return (
                                    <ListItem
                                      className="py-2 px-3 d-flex align-items-center bg-hover"
                                      key={itm?.id}
                                    >
                                      <ListItemIcon style={{ minWidth: 0 }}>
                                        <SearchIcon className="icon icon-search reaction-icons" />
                                      </ListItemIcon>
                                      <MuiLink
                                        href={`/profile/institute-profile?instituteId=${itm?.id}`}
                                        underline="none"
                                      >
                                        <ListItemText
                                          primary={
                                            <div className="text-body-14 pl-2 d-flex justify-content-center align-items-center w-100">
                                              {itm.name} {itm?.orgType}
                                            </div>
                                          }
                                        />
                                      </MuiLink>
                                      <Avatar
                                        src={
                                          itm.logo === null
                                            ? createImageFromInitials(
                                                500,
                                                itm.name,
                                                "#FFFFFF"
                                              )
                                            : itm.logo
                                        }
                                        onError={(e) => {
                                          onImageError(
                                            e,
                                            "instituteprofile",
                                            itm.name
                                          );
                                        }}
                                        width="32"
                                        height="32"
                                        className="border ml-auto rounded-pill overflow-hidden w-h-32 img-fluid object-cover"
                                        alt={itm.name}
                                      />
                                    </ListItem>
                                  );
                                }
                              )
                            : null}
                          {searchedUserList?.companies?.rows?.length
                            ? searchedUserList?.companies?.rows?.map(
                                (itm, index) => {
                                  return (
                                    <ListItem
                                      className="py-2 px-3 d-flex align-items-center bg-hover"
                                      key={itm?.id}
                                    >
                                      <ListItemIcon style={{ minWidth: 0 }}>
                                        <SearchIcon className="icon icon-search reaction-icons" />
                                      </ListItemIcon>
                                      <MuiLink
                                        href={`/profile/company-profile?companyId=${itm?.id}`}
                                        underline="none"
                                      >
                                        <ListItemText
                                          primary={
                                            <div className="text-body-14 pl-2 d-flex justify-content-center align-items-center w-100">
                                              {itm.companyName} {itm?.industry}
                                            </div>
                                          }
                                        />
                                      </MuiLink>
                                      <Avatar
                                        src={
                                          itm.logo === null
                                            ? createImageFromInitials(
                                                500,
                                                itm.companyName,
                                                "#FFFFFF"
                                              )
                                            : itm.logo
                                        }
                                        onError={(e) => {
                                          onImageError(
                                            e,
                                            "companies",
                                            itm.companyName
                                          );
                                        }}
                                        width="32"
                                        height="32"
                                        className="border ml-auto rounded-pill overflow-hidden w-h-32 img-fluid object-cover"
                                        alt={itm.name}
                                      />
                                    </ListItem>
                                  );
                                }
                              )
                            : null}

                          {searchedUserList?.courses?.rows?.length
                            ? searchedUserList?.courses?.rows?.map(
                                (itm, index) => {
                                  return (
                                    <ListItem
                                      className="py-2 px-3 d-flex align-items-center bg-hover"
                                      key={itm?.id}
                                    >
                                      <ListItemIcon style={{ minWidth: 0 }}>
                                        <SearchIcon className="icon icon-search reaction-icons" />
                                      </ListItemIcon>
                                      <MuiLink
                                        href={`/course-detail/${itm?.id}`}
                                        underline="none"
                                      >
                                        <ListItemText
                                          primary={
                                            <div className="text-body-14 pl-2 d-flex justify-content-center align-items-center w-100">
                                              {itm.title} {itm?.courseType}
                                            </div>
                                          }
                                        />
                                      </MuiLink>
                                      <Avatar
                                        src={
                                          itm.imageURL === null
                                            ? createImageFromInitials(
                                                500,
                                                itm.title,
                                                "#FFFFFF"
                                              )
                                            : itm.imageURL
                                        }
                                        onError={(e) => {
                                          onImageError(e, "courses", itm.name);
                                        }}
                                        width="32"
                                        height="32"
                                        className="border ml-auto rounded-pill overflow-hidden w-h-32 img-fluid object-cover"
                                        alt={itm.name}
                                      />
                                    </ListItem>
                                  );
                                }
                              )
                            : null}

                          {searchedUserList?.groups?.rows?.length
                            ? searchedUserList?.groups?.rows?.map(
                                (itm, index) => {
                                  return (
                                    <ListItem
                                      className="py-2 px-3 d-flex align-items-center bg-hover"
                                      key={itm?.id}
                                    >
                                      <ListItemIcon style={{ minWidth: 0 }}>
                                        <SearchIcon className="icon icon-search reaction-icons" />
                                      </ListItemIcon>
                                      <MuiLink
                                        href={`/groups/${encodeURIComponent(
                                          itm.name
                                        )}/${itm?.id}`}
                                        underline="none"
                                      >
                                        <ListItemText
                                          primary={
                                            <div className="text-body-14 pl-2 d-flex justify-content-center align-items-center w-100">
                                              {itm.name}{" "}
                                            </div>
                                          }
                                        />
                                      </MuiLink>
                                      <Avatar
                                        src={
                                          itm.imageURL === null
                                            ? createImageFromInitials(
                                                500,
                                                itm.name,
                                                "#FFFFFF"
                                              )
                                            : itm.imageURL
                                        }
                                        onError={(e) => {
                                          onImageError(
                                            e,
                                            "instituteprofile",
                                            itm.name
                                          );
                                        }}
                                        width="32"
                                        height="32"
                                        className="border ml-auto rounded-pill overflow-hidden w-h-32 img-fluid object-cover"
                                        alt={itm.name}
                                      />
                                    </ListItem>
                                  );
                                }
                              )
                            : null}
                        </ul>
                        <div className="border-top border-geyser text-center px-3 py-2">
                          <a
                            role="button"
                            className="text-body-12 text-primary font-weight-semibold pointer"
                            onClick={(e) => handleSubmit(e, searchText)}
                          >
                            {lang("HEADER.GLOBAL_SEARCH.SEE_ALL")}
                          </a>
                        </div>
                      </Card>
                    )}
                  </div>
                  <div className={props.showSearchList}>
                    {searchText == "" &&
                      searchList &&
                      searchList.length > 0 && (
                        <Card className="p-0">
                          <div className=" border-geyser d-flex align-items-center justify-content-between p-3">
                            <h4 className="text-body-16 mb-0">
                              {lang("HEADER.GLOBAL_SEARCH.RECENT_SEARCHES")}
                            </h4>{" "}
                            <a
                              role="button"
                              className="text-body-12 text-secondary font-weight-semibold pointer"
                              onClick={clearRecentSearchResult}
                            >
                              {lang("HEADER.GLOBAL_SEARCH.CLEAR_ALL")}
                            </a>
                          </div>
                          {recentVisitorDetails &&
                            recentVisitorDetails.length > 0 && (
                              <div className="header-search-box">
                                {searchList &&
                                  searchList.length &&
                                  searchList.map((item, i) => {
                                    return (
                                      item?.recentVisitorDetails &&
                                      Object.keys(item?.recentVisitorDetails)
                                        .length > 0 && (
                                        <Card
                                          key={i}
                                          className="flex-shrink-0 header-search-list cursor-pointer"
                                          onClick={() =>
                                            window.open(
                                              `/profile/${item?.recentVisitorDetails?.profileId}`,
                                              "_self"
                                            )
                                          }
                                        >
                                          <img
                                            src={
                                              imagePreferencHandler(
                                                item?.recentVisitorDetails &&
                                                  item?.recentVisitorDetails,
                                                item?.recentVisitorDetails &&
                                                  item?.recentVisitorDetails
                                                    ?.profilePicShowData
                                              )
                                                ? item.recentVisitorDetails
                                                    ?.profilePicURL || ""
                                                : ""
                                            }
                                            className="m-auto rounded-pill overflow-hidden w-h-40 img-fluid object-cover"
                                            alt={
                                              item.recentVisitorDetails
                                                .firstName +
                                              " " +
                                              item.recentVisitorDetails.lastName
                                            }
                                            width="40"
                                            hegiht="40"
                                            onError={(e) =>
                                              onImageError(
                                                e,
                                                "profile",
                                                `${
                                                  item.recentVisitorDetails
                                                    .firstName
                                                } ${
                                                  lastNameHandler(
                                                    item.recentVisitorDetails &&
                                                      item.recentVisitorDetails,
                                                    item.recentVisitorDetails &&
                                                      item.recentVisitorDetails
                                                        .lastNameVisibility
                                                  )
                                                    ? item.recentVisitorDetails
                                                        .lastName
                                                    : ""
                                                }`
                                              )
                                            }
                                          />
                                          <h6 className="text-body-12 font-weight-semibold text-secondary mt-3 mb-0">
                                            {
                                              item.recentVisitorDetails
                                                .firstName
                                            }{" "}
                                            {lastNameHandler(
                                              item.recentVisitorDetails &&
                                                item.recentVisitorDetails,
                                              item.recentVisitorDetails &&
                                                item.recentVisitorDetails
                                                  .lastNameVisibility
                                            )
                                              ? item.recentVisitorDetails
                                                  .lastName
                                              : ""}
                                          </h6>
                                        </Card>
                                      )
                                    );
                                  })}
                              </div>
                            )}
                          <ul className="list-unstyled mb-0">
                            {searchList &&
                              searchList.map((item, i) => {
                                return (
                                  item.recentVisitorDetails === null && (
                                    <ListItem
                                      key={i}
                                      className="py-12 px-3 d-flex bg-hover"
                                      onClick={(e) => {
                                        setSearchText(item.searchText);
                                        handleSubmit(e, item.searchText);
                                        props.setShowSearchList(
                                          "mega-search d-none"
                                        );
                                      }}
                                    >
                                      <AccessTimeIcon className="reaction-icons" />
                                      <ListItemText
                                        className="text-body-14 pl-2"
                                        primary={
                                          item.searchText &&
                                          item.searchText.trim() !== "" &&
                                          item.searchText
                                        }
                                      />
                                    </ListItem>
                                  )
                                );
                              })}
                          </ul>
                        </Card>
                      )}
                  </div>
                </Form.Group>
              </Form>
            )}
          </div>
          {router.pathname !== "/account/sign-up" && (
            <div className="login-buttons d-none">
              <Button
                variant="outline-primary"
                type="button"
                className="font-14"
                onClick={() => dispatch(toggleModals({ login: true }))}
              >
                <span className="font-medium">{lang("COMMON.SIGN_IN")}</span>
              </Button>
              {showSignup && (
                <Button
                  variant="primary"
                  type="button"
                  onClick={() => dispatch(toggleModals({ register: true }))}
                  className="px-md-3 font-14 ml-3"
                >
                  {/* className="signup-btn" */}
                  {lang("COMMON.SIGN_UP")}
                </Button>
              )}
            </div>
          )}
          {router.pathname !== "/account/sign-up" &&
          userData?.showHeaderMenu !== false ? (
            <Menuu
              menuClassName={"header-menu"}
              customBurgerIcon={
                <svg
                  width="18px"
                  height="14px"
                  viewBox="0 0 18 14"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>mobile-menu</title>
                  <desc>Created with Sketch.</desc>
                  <g
                    id="Page-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <g
                      id="mobile-menu"
                      transform="translate(9.000000, 7.000000) scale(-1, 1) translate(-9.000000, -7.000000) translate(1.000000, 0.000000)"
                      stroke="#a400ff"
                      strokeWidth="2"
                    >
                      <path
                        d="M0,1 L16,1 M0,7 L16,7 M0,13 L7,13"
                        id="Shape"
                      ></path>
                    </g>
                  </g>
                </svg>
              }
            >
              <Link route={DASHBOARD}>
                <a
                  role="button"
                  className={
                    props.router.pathname === DASHBOARD
                      ? "menu-item active"
                      : "menu-item"
                  }
                  onClick={() =>
                    setCookie("postToken", postTokenUnix(new Date()))
                  }
                  target={props?.isJoinRoom ? "_blank" : undefined}
                >
                  <HeaderLabel
                    role="button"
                    className={props.router.pathname === DASHBOARD && "active"}
                    handleClick={() =>
                      setCookie("postToken", postTokenUnix(new Date()))
                    }
                    target={props?.isJoinRoom ? "_blank" : undefined}
                    labelText={lang("HEADER.HOME")}
                  />
                </a>
                {/* <a
                  role="button"
                  className={
                    props.router.pathname === DASHBOARD
                      ? "menu-item active"
                      : "menu-item"
                  }
                  onClick={() =>
                    setCookie("postToken", postTokenUnix(new Date()))
                  }
                  target={props?.isJoinRoom ? "_blank" : undefined}
                > */}
                {/* <em className="icon icon-home"></em>
                  {lang("HEADER.HOME")}
                </a> */}
              </Link>
              <Link route={MY_CONNECTIONS}>
                <a
                  role="button"
                  className={
                    props.router.pathname === MY_CONNECTIONS
                      ? "menu-item active"
                      : "menu-item"
                  }
                  target={props?.isJoinRoom ? "_blank" : undefined}
                >
                  <HeaderLabel
                    className={
                      props.router.pathname === MY_CONNECTIONS && "active"
                    }
                    target={props?.isJoinRoom ? "_blank" : undefined}
                    labelText={lang("HEADER.CONNECTIONS")}
                  />
                  {list && list?.total && (
                    <span className="notif-icon-popup">{list?.total}</span>
                  )}{" "}
                </a>
                {/* <a
                  role="button"
                  className={
                    props.router.pathname === MY_CONNECTIONS
                      ? "menu-item active"
                      : "menu-item"
                  }
                  target={props?.isJoinRoom ? "_blank" : undefined}
                > */}
                {/* <em className="icon icon-connections-h"></em> */}
                {/* {lang("HEADER.CONNECTIONS")}
                  {list && list?.total && (
                    <span className="notif-icon-popup">{list?.total}</span>
                  )} */}
                {/* </a> */}
              </Link>
              <Link route={EVENTS}>
                <a
                  role="button"
                  className={
                    props.router.pathname === EVENTS
                      ? "menu-item active"
                      : "menu-item"
                  }
                >
                  <HeaderLabel
                    className={props.router.pathname === EVENTS && "active"}
                    target={props?.isJoinRoom ? "_blank" : undefined}
                    labelText={lang("HEADER.EVENTS")}
                  />
                </a>
                {/* <a
                  role="button"
                  className={
                    props.router.pathname === EVENTS
                      ? "menu-item active"
                      : "menu-item"
                  }
                >
                  {lang("HEADER.EVENTS")}
                </a> */}
              </Link>
              <Link route={GROUPS}>
                <a
                  role="button"
                  className={
                    props.router.pathname === "/groups/groups"
                      ? "menu-item active"
                      : "menu-item"
                  }
                >
                  <HeaderLabel
                    className={
                      (props.router.pathname === "/groups/groups" ||
                        props.router.pathname === "/groups/create-groups" ||
                        props.router.pathname === "/groups/edit-groups" ||
                        props.router.pathname ===
                          "/groups/group-members/[groupId]" ||
                        props.router.pathname === "/groups/[...params]") &&
                      "active"
                    }
                    target={props?.isJoinRoom ? "_blank" : undefined}
                    labelText={lang("HEADER.GROUPS")}
                  />
                </a>
              </Link>
              <Link route={MESSAGES}>
                <a
                  role="button"
                  className={
                    props.router.pathname === "/messages"
                      ? "menu-item cursor-pointer active"
                      : "menu-item cursor-pointer"
                  }
                  target={props?.isJoinRoom ? "_blank" : undefined}
                >
                  <HeaderLabel
                    className={
                      props.router.pathname === "/messages" && "active"
                    }
                    target={props?.isJoinRoom ? "_blank" : undefined}
                    labelText={lang("HEADER.MESSAGES")}
                  />
                  {unreadMessageCountState > 0 && (
                    <span className="notif-icon-popup">
                      {unreadMessageCountState}
                    </span>
                  )}
                </a>
                {/* <a
                  role="button"
                  className={
                    props.router.pathname === "/messages"
                      ? "menu-item cursor-pointer active"
                      : "menu-item cursor-pointer"
                  }
                  target={props?.isJoinRoom ? "_blank" : undefined}
                > */}
                {/* <em className="icon icon-messages"></em> */}
                {/* {lang("HEADER.MESSAGES")}
                  {unreadMessageCountState > 0 && (
                    <span className="notif-icon-popup">
                      {unreadMessageCountState}
                    </span>
                  )}
                </a> */}
              </Link>
              <Link route={NOTIFICATIONS}>
                <a
                  role="button"
                  className={
                    props.router.pathname === "/notifications/notifications"
                      ? "menu-item active"
                      : "menu-item"
                  }
                  target={props?.isJoinRoom ? "_blank" : undefined}
                >
                  <HeaderLabel
                    className={
                      props.router.pathname ===
                        "/notifications/notifications" && "active"
                    }
                    target={props?.isJoinRoom ? "_blank" : undefined}
                    labelText={lang("HEADER.NOTIFICATION")}
                  />
                </a>
                {/* <a
                  role="button"
                  className={
                    props.router.pathname === "/notifications/notifications"
                      ? "menu-item active"
                      : "menu-item"
                  }
                  target={props?.isJoinRoom ? "_blank" : undefined}
                > */}
                {/* <em className="icon icon-notification"></em> */}
                {/* {lang("HEADER.NOTIFICATION")}
                  {notificationData?.unseenNotiCount > 0 && (
                    <span className="notif-icon-popup">
                      {notificationData?.unseenNotiCount}
                    </span>
                  )}
                </a> */}
              </Link>

              {/* <Link route={NOTIFICATIONS}> */}
              {/* <a
                role="button"
                className={
                  props.router.pathname === "/notifications/business"
                    ? "menu-item active d-inline-flex align-items-center "
                    : "menu-item d-inline-flex align-items-center "
                }
                onClick={() => dispatch(toggleModals({ teacheroption: true }))}
                target={props?.isJoinRoom ? "_blank" : undefined}
              > */}
              {/* <em className="icon icon-notification"></em> */}
              {/* {lang("HEADER.BUSINESS")}
                <span className="material-icons font-18 ms-1">expand_more</span>
              </a> */}
              <a
                role="button"
                className={
                  props.router.pathname === "/notifications/business"
                    ? "menu-item active d-inline-flex align-items-center "
                    : "menu-item d-inline-flex align-items-center "
                }
                onClick={() => dispatch(toggleModals({ teacheroption: true }))}
                target={props?.isJoinRoom ? "_blank" : undefined}
              >
                <HeaderLabel
                  className={
                    props.router.pathname === "/notifications/business" &&
                    "active"
                  }
                  handleClick={() =>
                    dispatch(toggleModals({ teacheroption: true }))
                  }
                  target={props?.isJoinRoom ? "_blank" : undefined}
                  labelText={lang("HEADER.BUSINESS")}
                />
                {/* <span className='material-icons f\nt-18 ms-1'>expand_more</span> */}
              </a>
              {/* </Link> */}

              <div className="theme-dropdown header-user-dropdown">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  className={
                    props.router.pathname === `/profile/[profileId]`
                      ? "user-profile d-inline-flex align-items-center active"
                      : "user-profile d-inline-flex align-items-center"
                  }
                >
                  <HeaderProfile
                    onContextMenu={(e) => e.preventDefault()}
                    onError={(e) => {
                      onImageError(
                        e,
                        "profile",
                        `${userData?.firstName} ${userData?.lastName}`
                      );
                    }}
                    imageUrl={userData?.profilePicURL || ""}
                  />
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  disableScrollLock={true}
                  onClose={handleClose}
                  onClick={handleClose}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: 50, vertical: "bottom" }}
                  className="dropdown-inner-left"
                >
                  <Link
                    href={`/profile/${userData?.profileId || "me"}`}
                    className="d-flex align-items-center"
                  >
                    <MenuItem>
                      <ListItemIcon>
                        <AccountCircleIcon />
                      </ListItemIcon>

                      <span class="item-text">
                        {lang("HEADER.VIEW_PROFILE")}
                      </span>
                    </MenuItem>
                  </Link>

                  <Divider style={{ margin: "0" }} />
                  <Link
                    href={`/my-activities/`}
                    className="d-flex align-items-center"
                  >
                    <MenuItem>
                      <ListItemIcon>
                        <SchoolOutlinedIcon />
                      </ListItemIcon>
                      <span class="item-text">
                        {lang("HEADER.MY_LEARNING")}
                      </span>
                    </MenuItem>
                  </Link>

                  <Divider style={{ margin: "0" }} />
                  <Link
                    href={`/accounts/`}
                    className="d-flex align-items-center "
                  >
                    <MenuItem>
                      <ListItemIcon>
                        <SettingsOutlinedIcon />
                      </ListItemIcon>
                      <span class="item-text">
                        {lang("HEADER.ACCOUNT_SETTINGS")}
                      </span>
                    </MenuItem>
                  </Link>

                  <Divider style={{ margin: "0" }} />

                  <MenuItem
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(logout());
                    }}
                    className="d-flex align-items-center"
                  >
                    <ListItemIcon>
                      <LogoutOutlinedIcon />
                    </ListItemIcon>
                    <span class="item-text">{lang("COMMON.LOGOUT")}</span>
                  </MenuItem>
                </Menu>
              </div>
            </Menuu>
          ) : (
            <Menuu
              menuClassName={"header-menu"}
              customBurgerIcon={
                <svg
                  width="18px"
                  height="14px"
                  viewBox="0 0 18 14"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>mobile-menu</title>
                  <desc>Created with Sketch.</desc>
                  <g
                    id="Page-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <g
                      id="mobile-menu"
                      transform="translate(9.000000, 7.000000) scale(-1, 1) translate(-9.000000, -7.000000) translate(1.000000, 0.000000)"
                      stroke="#CC00CC"
                      strokeWidth="2"
                    >
                      <path
                        d="M0,1 L16,1 M0,7 L16,7 M0,13 L7,13"
                        id="Shape"
                      ></path>
                    </g>
                  </g>
                </svg>
              }
            >
              <a
                role="button"
                className="menu-item"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(logout());
                }}
              >
                <em className="bx bx-log-out"></em>
                Logout
              </a>
            </Menuu>
          )}
        </div>
      </Grid>
      {router.pathname !== "/account/sign-up" &&
        userData?.isSignUpDetailsCompleted === true &&
        isLoggedIn &&
        router.pathname !== "/messages" && (
          <>
            <ChatList isFloatMessage={true} />
            {!close && currentChannel && (
              <CurrentChannel
                currentChannel={currentChannel}
                close={close}
                setClose={setClose}
              />
            )}
          </>
        )}
    </header>
  );
};
export default withRouter(Header);
