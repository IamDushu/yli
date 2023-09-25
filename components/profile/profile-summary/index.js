import { ImageSelectField } from "components/form-fields";
import {
  Connect,
  CrossIcon,
  Follow,
  MessageIcon,
  RejectRequest,
  RemoveConnectionIcon,
  UnFollow,
} from "components/svg/connections";
import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, Dropdown, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  changeConnectionStatus,
  followUser,
  sendConnectionRequest,
  unfollowUser,
} from "store/actions/connections";
import {
  chatCreateUser,
  chatSignupUser,
  checkPendingRequest,
  getUserById,
  toggleModals,
  updateUserImage,
  updateUserInfo,
} from "../../../store/actions";
import {
  CheckPendingRequest,
  selectUserCountData,
  selectUserInfo,
} from "../../../store/selectors/user";
import {
  USER_IMAGE_TYPES,
  availableForOptions,
  compactNumber,
  getCookie,
  getLocalStorage,
  onImageError,
  setCookie,
  showMessageNotification,
} from "../../../utils";
import WithPopup from "../../with-popup/with-popup";
import ProfileSummaryDetail from "./profile-summary-detail";
import ProfileSummaryForm from "./profile-summary-form";

import { get } from "api";
import { GET_OTHER_PROFILE } from "api/routes";
import { USER_API_URL } from "config";
import { useYchat } from "hooks/useYchat";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Select from "react-select";
import {
  getContactInfoVisibilityData,
  updateProfileVisibilityData,
} from "store/actions/visibilityContactInfo";
import { selectLanguageData } from "store/selectors/language";
import Swal from "sweetalert2";
import { visibilityOptions } from "utils";
import CertificateForm from "../certifications/certification-form";
import EducationForm from "../education/education-form";
import ExperienceForm from "../experience/experience-form";
import LanguageForm from "../languages/language-form";

const ConnectionList = dynamic(() =>
  import("components/modal/connectionList").then((mod) => mod.ConnectionList)
);
const GrowthConnectionList = dynamic(() =>
  import("components/modal/growthConnectionList").then(
    (mod) => mod.GrowthConnectionList
  )
);

const MainModal = dynamic(() =>
  import("components/modal").then((mod) => mod.MainModal)
);
/******************** 
  @purpose :Profile Summary
  @Parameter : { }
  @Author : INIC
  ******************/
const ProfileSummary = ({
  openPopupHandler,
  renderPopup,
  popupInfo,
  descriptionRef,
  isSelfProfile,
  userCountInfo,
  shortDescriptionRef,
  userDetails,
  otherUserData,
  viewmode,
  setOtherUserData,
  profileId,
  profile,
  profilePicVisibility,
}) => {
  const { connectionlist, growthConnectionList } = useSelector(
    ({ ui }) => ui.modals,
    shallowEqual
  );
  const router = useRouter();
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const { currentChannelHandler } = useYchat();
  const userCountData = useSelector(selectUserCountData);
  const countData = isSelfProfile ? userCountData : userCountInfo;
  const userProfileInfo = useSelector(selectUserInfo);
  const pendingRequest = useSelector(CheckPendingRequest);
  const userInfo = isSelfProfile ? userProfileInfo : userDetails;
  const briefDescription = getCookie("description");
  const [isFlw, setIsFlw] = useState(false);
  const [connectStatus, setConnectStatus] = useState("");
  const [selectedAvailableFor, setSelectedAvailableFor] = useState([]);
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [isAccepted, setIsAccepted] = useState(false);
  const [connectionData, setConnectionData] = useState(false);
  const [visibilitSetting, setVisibilitySetting] = useState("");

  const [popupRender, setPopupRender] = useState("contactInfo");
  const languageData = useSelector(selectLanguageData);
  const { experienceList } = useSelector((state) => state.experience);
  const { educationList } = useSelector((state) => state.education);
  const { certificationList } = useSelector((state) => state.certification);
  const selfUserInfo = useSelector(selectUserInfo);
  let mmLogin = getLocalStorage("mmLogin");
  if (mmLogin && typeof mmLogin === "string") {
    mmLogin = JSON.parse(mmLogin);
  }
  let {
    firstName = "",
    lastName = "",
    profilePicURL = "",
    profileBgURL = "",
    availableFor,
    myGoal,
    currentPosition,
    isFollow,
  } = userInfo || {};

  useEffect(() => {
    setIsFlw(isFollow);
  }, [isFollow]);

  useEffect(() => {
    if (otherUserData) dispatch(checkPendingRequest(otherUserData?.id));
  }, [pendingRequest?.isSentRequest]);

  profilePicURL = profilePicURL || "";
  profileBgURL = profileBgURL || "";
  firstName = firstName || "";
  lastName = lastName || "";
  const onImageChange = (e, field) => {
    const file = e.target.files && e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageData = new FormData();
      imageData.append("file", file);
      dispatch(updateUserImage(imageData, field));
    } else {
      showMessageNotification("Please select an image", "error");
    }
  };

  const onProfilePicChange = async (profileUrl) => {
    const res = await dispatch(
      updateUserInfo({
        profilePicURL: profileUrl,
      })
    );
    let user = JSON.parse(getCookie("userInfo"));
    user["profilePicURL"] = profileUrl;
    setCookie("userInfo", user);
  };
  const onSelectCheckboxChange = (selected, field) => {
    const values = selected.map((item) => item.label);
    const data = {};
    if (field === "availableFor") {
      data.availableFor = values;
    } else if (field === "goal") {
      data.myGoal = values;
    }
    dispatch(updateUserInfo(data));
  };
  const renderContactInfo = (props) => {
    if (isSelfProfile) {
      return popupInfo.isEdit ? (
        <ProfileSummaryForm
          {...props}
          userInfo={userInfo}
          isSelfProfile={isSelfProfile}
          showVisibilitySelect={showVisibilitySelect}
        />
      ) : (
        <ProfileSummaryDetail
          {...props}
          isSelfProfile={isSelfProfile}
          userInfo={userInfo}
          viewmode={viewmode}
          showVisibilitySelect={showVisibilitySelect}
        />
      );
    } else {
      return (
        <ProfileSummaryDetail
          {...props}
          userInfo={userInfo}
          isSelfProfile={isSelfProfile}
          showVisibilitySelect={showVisibilitySelect}
        />
      );
    }
  };
  const renderProfileSummaryForm = (props) => {
    switch (popupRender) {
      case "contactInfo":
        return renderContactInfo(props);
      case "language":
        return (
          <LanguageForm
            {...props}
            popupInfo={{ data: languageData, isEdit: false }}
          />
        );
      case "certificate":
        return (
          <CertificateForm
            {...props}
            popupInfo={{ data: certificationList, isEdit: false }}
            isSelfProfile={isSelfProfile}
          />
        );
      case "experience":
        return (
          <ExperienceForm
            {...props}
            popupInfo={{ data: experienceList, isEdit: false }}
            isSelfProfile={isSelfProfile}
          />
        );
      case "education":
        return (
          <EducationForm
            {...props}
            popupInfo={{ data: educationList, isEdit: false }}
            isSelfProfile={isSelfProfile}
          />
        );
      default:
        return renderContactInfo(props);
    }
  };

  const getDropdownButtonLabel = ({ placeholderButtonLabel }) => {
    return (
      <Fragment>
        {placeholderButtonLabel}{" "}
        <em className="icon icon-down-arrow text-charcoal-grey"></em>
      </Fragment>
    );
  };

  useEffect(() => {
    if (availableFor && availableFor?.length) {
      const selectedAF = availableForOptions.filter((item) => {
        if (availableFor.includes(item.label)) return item;
      });
      setSelectedAvailableFor(selectedAF);
    }
  }, [availableFor]);

  useEffect(() => {
    if (myGoal && myGoal?.length) {
      const selectedG = availableForOptions.filter((item) => {
        if (myGoal.includes(item.label)) return item;
      });
      setSelectedGoals(selectedG);
    }
  }, [myGoal]);

  /******************** 
  @purpose :Reject Connection Request
  @Parameter : {}
  @Author : INIC
  ******************/
  const rejectRequest = async (id) => {
    await dispatch(
      changeConnectionStatus({
        id,
        status: "rejected",
      })
    );

    setIsAccepted(false);
  };
  /******************** 
  @purpose :Accept Connection Request
  @Parameter : {}
  @Author : INIC
  ******************/
  const acceptRequest = async (id) => {
    await dispatch(
      changeConnectionStatus({
        id,
        status: "accepted",
      })
    );
    setConnectStatus(true);
  };
  useEffect(() => {
    otherUserData.visibilitySettings &&
      otherUserData.visibilitySettings.forEach((data) => {
        if (data.key === "links_options") {
          setVisibilitySetting(data.settings);
        }
      });
  }, [otherUserData.visibilitySettings]);
  /******************** 
  @purpose :Visibility Link Handler
  @Parameter : {}
  @Author : INIC
  ******************/

  const [visibilityData, setVisibilityData] = useState();
  useEffect(() => {
    getData();
  }, []);

  const visibilityTranslation = {
    all: lang("VISIBILITY_TRANSLATION.ALL"),
    followers: lang("VISIBILITY_TRANSLATION.FOLLOWERS"),
    none: lang("VISIBILITY_TRANSLATION.NONE"),
    myGrowthConnection: lang("VISIBILITY_TRANSLATION.MYGC"),
    myConnection: lang("VISIBILITY_TRANSLATION.CONNECTION"),
  };

  const getData = () => {
    dispatch(
      getContactInfoVisibilityData({
        key: "contact_info_options",
      })
    ).then((res) => {
      setVisibilityData(res.data);
    });
  };

  const getVisibleSelectedValue = (id) => {
    if (visibilityData !== undefined) {
      const options = visibilityData[id.toLowerCase()] || {};
      const key = Object.keys(options).filter((k) => options[k]);
      const option = Object.keys(options).filter((k) => options[k]);
      let selectedOption = visibilityOptions.filter((k) => {
        if (k.value === option[0]) {
          return k;
        }
      });
      if (selectedOption?.length == 1) {
        selectedOption[0]["label"] =
          visibilityTranslation[selectedOption[0].value];
      }
      return selectedOption;
    }
    return null;
  };

  const setVisibleSelectedValue = (id, selected) => {
    const options = visibilityData[id.toLowerCase()];
    Object.keys(options).forEach((v) => (options[v] = false));
    const updatedData = { ...options, [selected.value]: true };

    const updatedRequestData = {
      [id.toLowerCase()]: updatedData,
    };

    dispatch(updateProfileVisibilityData(updatedRequestData)).then((res) => {
      res.status !== 1
        ? showMessageNotification(
            lang("USER_PROFILE_SUMMARY.TEXT.PRIVACY_UPDATE_FAILURE")
          )
        : showMessageNotification(
            lang("USER_PROFILE_SUMMARY.TEXT.PRIVACY_UPDATE_SUCCESS")
          );
      getData();
    });
  };

  // Rendering the single component for all Visibility options
  const showVisibilitySelect = (
    id,
    isEditable = true,
    menuPlacement = "bottom"
  ) => {
    return (
      <div className="custom-selectpicker-xs">
        <Form.Label>{lang("USER_PROFILE_SUMMARY.TEXT.VISIBILITY")}</Form.Label>
        <Select
          options={visibilityOptions.map((vo) => ({
            value: vo.value,
            label: visibilityTranslation[vo.value],
          }))}
          placeholder={visibilityTranslation["all"]}
          menuPlacement={menuPlacement}
          maxMenuHeight={190}
          isDisabled={isEditable}
          onChange={(selected) => {
            setVisibleSelectedValue(id, selected);
          }}
          value={getVisibleSelectedValue(id)}
        />
      </div>
    );
  };
  const linkHandler = () => {
    if (
      visibilitSetting === null ||
      visibilitSetting === "" ||
      visibilitSetting?.all ||
      (otherUserData?.connectionData &&
        otherUserData?.connectionData[0]?.isConnection &&
        visibilitSetting?.myConnection) ||
      (otherUserData?.followData &&
        otherUserData?.followData[0]?.isFollow &&
        visibilitSetting?.followers) ||
      (otherUserData?.isGrwothConnection &&
        otherUserData?.isGrwothConnection?.isGrowthConnection &&
        visibilitSetting?.myGrowthConnection)
    )
      dispatch(toggleModals({ connectionlist: true }));
    else if (visibilitSetting === "" || visibilitSetting.none) {
      return;
    }
  };

  const growthConnectionListOpen = () => {
    if (
      visibilitSetting === null ||
      visibilitSetting === "" ||
      visibilitSetting?.all ||
      (otherUserData?.connectionData &&
        otherUserData?.connectionData[0]?.isConnection &&
        visibilitSetting?.myConnection) ||
      (otherUserData?.followData &&
        otherUserData?.followData[0]?.isFollow &&
        visibilitSetting?.followers) ||
      (otherUserData?.isGrwothConnection &&
        otherUserData?.isGrwothConnection?.isGrowthConnection &&
        visibilitSetting?.myGrowthConnection)
    )
      dispatch(toggleModals({ growthConnectionList: true }));
    else if (visibilitSetting === "" || visibilitSetting.none) {
      return;
    }
  };

  /******************** 
  @purpose :Lastname Handler
  @Parameter : {}
  @Author : INIC
  ******************/
  const lastNameHandler = () => {
    if (
      isSelfProfile ||
      profile === "otherProfile" ||
      otherUserData?.lastNameVisibility === null ||
      otherUserData?.lastNameVisibility?.settings?.all ||
      (otherUserData?.followData &&
        otherUserData?.followData[0]?.isFollow &&
        otherUserData?.lastNameVisibility?.settings?.followers) ||
      (otherUserData?.connectionData &&
        otherUserData?.connectionData[0]?.isConnection &&
        otherUserData?.lastNameVisibility?.settings?.myConnection) ||
      (otherUserData?.growthConnectionData &&
        otherUserData?.growthConnectionData?.isGrowthConnection &&
        otherUserData?.lastNameVisibility?.settings?.myGrowthConnection)
    ) {
      return true;
    }
  };
  /******************** 
  @purpose :Image preference Handler
  @Parameter : {}
  @Author : INIC
  ******************/
  const imagePreferenceHandler = () => {
    if (
      isSelfProfile ||
      profile === "otherProfile" ||
      otherUserData.profilePicShowData === null ||
      otherUserData?.profilePicShowData?.all ||
      (otherUserData?.followData &&
        otherUserData?.followData[0]?.isFollow &&
        otherUserData.profilePicShowData.followers) ||
      (otherUserData?.connectionData &&
        otherUserData?.connectionData[0]?.isConnection &&
        otherUserData.profilePicShowData.myConnections) ||
      (otherUserData?.growthConnectionData &&
        otherUserData?.growthConnectionData?.isGrowthConnection &&
        otherUserData?.profilePicShowData?.myGrowthConnections) ||
      (selfUserInfo &&
        selfUserInfo.role &&
        ((selfUserInfo.role.includes("Teacher") &&
          otherUserData.profilePicShowData.teachers) ||
          (selfUserInfo.role.includes("Trainer") &&
            otherUserData.profilePicShowData.trainer) ||
          (selfUserInfo.role.includes("Coach") &&
            otherUserData.profilePicShowData.coach) ||
          (selfUserInfo.role.includes("Host") &&
            otherUserData.profilePicShowData.hosts)))
    ) {
      return true;
    }
  };
  return (
    <Card className="mb-4">
      <Card.Body className="p-0">
        <div className="profile-bg position-relative">
          <picture onContextMenu={(e) => e.preventDefault()}>
            <source srcSet={profileBgURL} type="image/jpg" />
            <img
              src={profileBgURL}
              alt="Profile-Banner"
              // className="object-cover"
              width="1133"
              height="250"
              onError={(e) => {
                onImageError(e, "myprofile");
              }}
            />
          </picture>
          {isSelfProfile && !viewmode && (
            <Form>
              <Form.Group
                controlId="formFile"
                className="position-absolute custom-inputwrap"
              >
                <label className="custom-file-input-banner bx bx-camera font-28">
                  <Form.Control
                    className="font-28"
                    type="file"
                    onChange={(e) =>
                      onImageChange(e, USER_IMAGE_TYPES.PROFILE_BG)
                    }
                  />
                </label>
              </Form.Group>
            </Form>
          )}
        </div>
        <div className="profile-summary-wrap">
          <div className="mt-xl-0 mt-0 mb-3 mx-md-4 mx-3 position-relative pt-3 d-md-flex justify-content-between">
            <div className="">
              <div className="d-flex pt-xl-0 pt-4">
                <div className="d-md-flex align-items-center w-100">
                  <div className="profile-box rounded-pill position-relative mb-2 mb-md-0">
                    {((otherUserData?.visibilityDetails?.settings
                      ?.myConnection &&
                      otherUserData?.isConnection?.isConnection) ||
                      (otherUserData?.visibilityDetails?.settings?.followers &&
                        otherUserData?.isFollow) ||
                      (otherUserData?.visibilityDetails?.settings
                        ?.myGrowthConnection &&
                        otherUserData?.isGrwothConnection
                          ?.isGrowthConnection)) &&
                      otherUserData?.isUserOnline &&
                      !isSelfProfile && (
                        <span className="chat-blue-icon-profile w-h-10 mr-2 flex-shrink-0 bg-success rounded-circle"></span>
                      )}
                    <picture onContextMenu={(e) => e.preventDefault()}>
                      <source
                        srcSet={imagePreferenceHandler() ? profilePicURL : ""}
                        type="image/jpg"
                      />
                      {((!isSelfProfile && profile !== "otherProfile") ||
                        (profile === "otherProfile" &&
                          profilePicVisibility)) && (
                        <img
                          src={imagePreferenceHandler() ? profilePicURL : ""}
                          alt="Profile Picture"
                          width="72"
                          height="72"
                          style={{ borderRadius: "180px" }}
                          onError={(e) => {
                            onImageError(
                              e,
                              "profile",
                              `${userDetails?.firstName} ${
                                lastNameHandler() ? userDetails?.lastName : ""
                              }`
                            );
                          }}
                        />
                      )}
                      {isSelfProfile && (
                        <ImageSelectField
                          field={USER_IMAGE_TYPES.PROFILE}
                          name={
                            isSelfProfile
                              ? profilePicURL
                              : userDetails?.profilePicURL
                          }
                          onProfilePicChange={onProfilePicChange}
                          isSelfProfile={isSelfProfile}
                          viewmode={viewmode}
                          fullname={`${userInfo.firstName} ${userInfo.lastName}`}
                        />
                      )}
                    </picture>
                  </div>
                  <div className="profile-info ml-md-3">
                    <h6 className="font-weight-bold mb-1">{`${firstName} ${
                      lastNameHandler() ? lastName : ""
                    }`}</h6>
                    <div className="align-items-center">
                      <h5 className="text-body-14 text-gray mb-0 font-weight-normal">
                        {currentPosition}{" "}
                        {/* {country ? ` ${country},${state},${city}` : ""} */}
                      </h5>

                      <div className="align-items-center">
                        {countData && (
                          <div className="profile-summary list-unstyled d-md-flex mb-md-0 mb-0">
                            <div
                              className="text-md-center d-grid mb-md-0 mb-2"
                              onClick={() =>
                                isSelfProfile
                                  ? router.push(
                                      "/my-connections/connection-list"
                                    )
                                  : linkHandler()
                              }
                            >
                              <h5
                                className={`text-body-14 font-weight-normal ${
                                  profile !== "otherProfile"
                                    ? "text-primary"
                                    : ""
                                } pointer mb-0`}
                              >
                                {countData?.totalConnections
                                  ? compactNumber(countData.totalConnections, 2)
                                  : 0}
                                <span
                                  className={`${
                                    profile !== "otherProfile"
                                      ? "text-primary"
                                      : ""
                                  } pl-1`}
                                >
                                  {lang(
                                    "USER_PROFILE_SUMMARY.TEXT.CONNECTIONS"
                                  )}
                                </span>
                              </h5>
                            </div>

                            {/* others profile growth connections display */}
                            {!isSelfProfile && (
                              <>
                                <div className="px-2 text-gray d-md-block d-none">
                                  |
                                </div>
                                <div
                                  className="text-md-center d-grid mb-md-0 mb-2"
                                  onClick={() => {
                                    growthConnectionListOpen();
                                  }}
                                >
                                  <h5 className="text-body-14 text-primary pointer mb-0 font-weight-normal">
                                    {countData?.totalGrowthConnections
                                      ? compactNumber(
                                          countData?.totalGrowthConnections,
                                          2
                                        )
                                      : 0}
                                    <span className="text-primary pl-1">
                                      {lang(
                                        "USER_PROFILE_SUMMARY.TEXT.GROWTH_CONNECTIONS"
                                      )}
                                    </span>
                                  </h5>
                                </div>
                              </>
                            )}

                            {isSelfProfile && !viewmode && (
                              <>
                                <div className="px-2 text-gray d-md-block d-none">
                                  |
                                </div>

                                <div
                                  className="text-md-center d-grid mb-md-0 mb-2"
                                  onClick={() =>
                                    isSelfProfile &&
                                    router.push("/my-growth-connections")
                                  }
                                >
                                  <h5 className="text-body-14 text-primary font-weight-normal pointer mb-0">
                                    {countData?.totalGrowthConnections
                                      ? compactNumber(
                                          countData?.totalGrowthConnections,
                                          2
                                        )
                                      : 0}
                                    <span className="text-primary pl-1">
                                      {lang(
                                        "USER_PROFILE_SUMMARY.TEXT.GROWTH_CONNECTIONS"
                                      )}
                                    </span>
                                  </h5>
                                </div>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {userInfo && profile !== "otherProfile" && (
                  // make absolute position
                  <a
                    className="text-secondary text-body-14 d-flex justify-content-end pl-15 link-secondary"
                    onClick={(e) => {
                      setPopupRender("contactInfo");
                      openPopupHandler(e);
                    }}
                    style={{
                      position: "absolute",
                      right: "0",
                      top: "16px",
                    }}
                  >
                    {lang("USER_PROFILE_SUMMARY.TEXT.CONTACT_INFO")}
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="profile-set mb-1 mx-md-4 mx-3">
            <div
              className={
                isSelfProfile
                  ? ""
                  : "d-flex flex-wrap flex-xl-nowwrap justify-content-between"
              }
            >
              <div
                className={`d-flex flex-wrap flex-md-nowrap w-100 ${
                  isSelfProfile ? "justify-content-xl-between" : ""
                }`}
              >
                {profile === "otherProfile" && (
                  <Button
                    onClick={() => dispatch(toggleModals({ login: true }))}
                  >
                    Join Now
                  </Button>
                )}

                {/* availableFor dropdowns */}
                {userInfo &&
                  (isSelfProfile && !viewmode ? (
                    <div
                      className="d-flex flex-wrap flex-md-nowrap w-100 justify-content-between pt-3"
                      style={{ borderTop: "1px solid #D1D5DB" }}
                    >
                      <div className="d-sm-flex">
                        <div className="custom-multiselectcheck mr-sm-4 mr-2 mb-sm-2 mb-3 profile-goal-btn">
                          <ReactMultiSelectCheckboxes
                            options={availableForOptions}
                            hideSearch={true}
                            getDropdownButtonLabel={getDropdownButtonLabel}
                            onChange={(selected) =>
                              onSelectCheckboxChange(selected, "availableFor")
                            }
                            defaultValue={selectedAvailableFor}
                            placeholderButtonLabel={lang(
                              "USER_PROFILE_SUMMARY.TEXT.AVAILABLE_FOR"
                            )}
                          />
                        </div>
                        <div className="custom-multiselectcheck mr-sm-4 mr-2 mb-2 mb-3 profile-goal-btn">
                          <ReactMultiSelectCheckboxes
                            options={availableForOptions}
                            hideSearch={true}
                            getDropdownButtonLabel={getDropdownButtonLabel}
                            onChange={(selected) =>
                              onSelectCheckboxChange(selected, "goal")
                            }
                            defaultValue={selectedGoals}
                            placeholderButtonLabel={lang(
                              "USER_PROFILE_SUMMARY.TEXT.MY_GOALS"
                            )}
                          />
                        </div>
                      </div>
                      {(!userInfo?.shortDescription ||
                        !briefDescription ||
                        !experienceList?.rows?.length ||
                        !educationList?.rows?.length ||
                        !certificationList?.rows?.length ||
                        !languageData?.length) && (
                        <Dropdown className="theme-dropdown dropdown-secondary ml-sm-2 mb-2 mb-sm-0">
                          <Dropdown.Toggle className="bg-gary-light">
                            {/* <em className="icon icon-plus-secondary font-14 pr-2"></em> */}
                            {lang("USER_PROFILE_SUMMARY.TEXT.ADD_SECTION")}
                            {/* <em className="icon icon-down-arrow text-charcoal-grey"></em> */}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            {!userInfo?.shortDescription && (
                              <Dropdown.Item
                                onClick={() => {
                                  shortDescriptionRef.current.click();
                                }}
                              >
                                {lang(
                                  "USER_DESCRIPTION.TEXT.SHORT_DESCRIPTION"
                                )}
                              </Dropdown.Item>
                            )}
                            {!briefDescription && (
                              <Dropdown.Item
                                onClick={() => {
                                  descriptionRef.current.click();
                                }}
                              >
                                {lang("USER_DESCRIPTION.TEXT.DESCRIPTION")}
                              </Dropdown.Item>
                            )}
                            {!experienceList?.rows?.length && (
                              <Dropdown.Item
                                onClick={(e) => {
                                  setPopupRender("experience");
                                  openPopupHandler(e);
                                }}
                              >
                                {lang(
                                  "USER_DESCRIPTION.DROPDOWN.WORK_EXPERIENCE"
                                )}
                              </Dropdown.Item>
                            )}
                            {!educationList?.rows?.length && (
                              <Dropdown.Item
                                onClick={(e) => {
                                  setPopupRender("education");
                                  openPopupHandler(e);
                                }}
                              >
                                {lang("USER_DESCRIPTION.DROPDOWN.EDUCATION")}
                              </Dropdown.Item>
                            )}
                            {!certificationList?.rows?.length && (
                              <Dropdown.Item
                                onClick={(e) => {
                                  setPopupRender("certificate");
                                  openPopupHandler(e);
                                }}
                              >
                                {lang(
                                  "USER_DESCRIPTION.DROPDOWN.CERTIFICATIONS"
                                )}
                              </Dropdown.Item>
                            )}
                            {!languageData?.length && (
                              <Dropdown.Item
                                onClick={(e) => {
                                  setPopupRender("language");
                                  openPopupHandler(e);
                                }}
                              >
                                {lang("USER_DESCRIPTION.DROPDOWN.LANGUAGE")}
                              </Dropdown.Item>
                            )}
                          </Dropdown.Menu>
                        </Dropdown>
                      )}
                    </div>
                  ) : (
                    <Fragment>
                      <div
                        className="d-flex justify-content-center w-100 py-3"
                        style={{ borderTop: "1px solid #D1D5DB" }}
                      >
                        <div className="w-100">
                          <div className="d-sm-flex">
                            {(availableFor?.length > 0 ||
                              myGoal?.length > 0) && (
                              <>
                                {availableFor?.length > 0 && (
                                  <div>
                                    <Dropdown className="theme-dropdown dropdown-secondary mr-2 mb-2 mb-sm-0 left-align">
                                      <Dropdown.Toggle className="bg-gary-light">
                                        {lang(
                                          "USER_PROFILE_SUMMARY.TEXT.AVAILABLE_FOR"
                                        )}
                                        <em className="icon icon-down-arrow text-charcoal-grey"></em>
                                      </Dropdown.Toggle>
                                      <Dropdown.Menu>
                                        {!availableFor ? (
                                          <Dropdown.Item>
                                            Not added yet
                                          </Dropdown.Item>
                                        ) : (
                                          availableFor?.length > 0 &&
                                          availableFor.map((item, i) => (
                                            <Dropdown.Item key={i}>
                                              {item}
                                            </Dropdown.Item>
                                          ))
                                        )}
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </div>
                                )}
                                {myGoal?.length > 0 && (
                                  <Dropdown className="theme-dropdown dropdown-secondary ml-2 mb-2 mb-sm-0">
                                    <Dropdown.Toggle className="bg-gary-light">
                                      {lang(
                                        "USER_PROFILE_SUMMARY.TEXT.MY_GOALS"
                                      )}
                                      <em className="icon icon-down-arrow text-charcoal-grey"></em>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                      {!myGoal ? (
                                        <Dropdown.Item>
                                          Not added yet
                                        </Dropdown.Item>
                                      ) : (
                                        myGoal?.length > 0 &&
                                        myGoal.map((item, i) => (
                                          <Dropdown.Item key={i}>
                                            {item}
                                          </Dropdown.Item>
                                        ))
                                      )}
                                    </Dropdown.Menu>
                                  </Dropdown>
                                )}
                              </>
                            )}
                            <div className="ml-auto">
                              {/* // buttons group */}
                              {((!isSelfProfile &&
                                pendingRequest?.isRequested === false) ||
                                viewmode) && (
                                <div className="d-flex justify-content-end align-items-center">
                                  <div className="buttons-group mb-3 mb-lg-0 mr-auto w-md-100 d-inline-flex flex-wrap">
                                    {(((otherUserData?.connectionData
                                      ?.length === 0 ||
                                      connectStatus.status === 1) &&
                                      isAccepted === false) ||
                                      viewmode ||
                                      connectionData) && (
                                      <>
                                        {pendingRequest?.isSentRequest ? (
                                          <Button
                                            variant="btn btn-outline-gray ml-1 btn-small-icon mb-2"
                                            onClick={async () => {
                                              if (!viewmode) {
                                                pendingRequest?.isSentRequest
                                                  ? await dispatch(
                                                      changeConnectionStatus({
                                                        id: pendingRequest?.sentConnectionId,
                                                        status: "withdrawl",
                                                      })
                                                    )
                                                  : await dispatch(
                                                      sendConnectionRequest(
                                                        otherUserData?.id
                                                      )
                                                    );
                                                await dispatch(
                                                  checkPendingRequest(
                                                    otherUserData?.id
                                                  )
                                                );
                                              }
                                            }}
                                          >
                                            <CrossIcon />
                                            Withdraw
                                          </Button>
                                        ) : (
                                          <Button
                                            variant="btn btn-outline-primary ml-1 btn-small-icon"
                                            onClick={async () => {
                                              if (!viewmode) {
                                                pendingRequest?.isSentRequest
                                                  ? await dispatch(
                                                      changeConnectionStatus({
                                                        id: pendingRequest?.sentConnectionId,
                                                        status: "withdrawl",
                                                      })
                                                    )
                                                  : await dispatch(
                                                      sendConnectionRequest(
                                                        otherUserData?.id
                                                      )
                                                    );
                                                await dispatch(
                                                  checkPendingRequest(
                                                    otherUserData?.id
                                                  )
                                                );
                                              }
                                            }}
                                          >
                                            <Connect />
                                            Connect
                                          </Button>
                                        )}
                                      </>
                                    )}
                                    {((!isSelfProfile &&
                                      otherUserData.connectionData &&
                                      otherUserData?.connectionData[0]
                                        ?.isConnection &&
                                      !connectionData) ||
                                      isAccepted) && (
                                      <Button
                                        variant="btn btn-outline-primary ml-1 btn-small-icon mb-2"
                                        onClick={() => {
                                          Swal.fire({
                                            text: "Are you sure you want to remove this connection?",
                                            icon: "warning",
                                            showDenyButton: true,
                                            confirmButtonText: "Yes",
                                            denyButtonText: `No`,
                                          }).then((result) => {
                                            if (result.isConfirmed) {
                                              setIsFlw(false);
                                              dispatch(
                                                changeConnectionStatus({
                                                  id: otherUserData
                                                    ?.isConnection?.id,
                                                  status: "",
                                                })
                                              );
                                              setConnectionData(true);
                                              setIsAccepted(false);
                                            }
                                          });
                                        }}
                                      >
                                        <RemoveConnectionIcon />
                                        {lang("PROFILE_TABS.REMOVE_CONNECTION")}
                                      </Button>
                                    )}
                                    {((!isSelfProfile &&
                                      pendingRequest?.isRequested === false) ||
                                      viewmode) && (
                                      <Fragment>
                                        {isFlw ? (
                                          <Button
                                            variant="btn btn-outline-primary ml-1 btn-small-icon mb-2"
                                            onClick={() => {
                                              if (!viewmode) {
                                                if (isFlw) {
                                                  const response = dispatch(
                                                    unfollowUser(userDetails.id)
                                                  );
                                                  if (response) {
                                                    setIsFlw(false);
                                                  }
                                                } else if (!isFlw) {
                                                  const response = dispatch(
                                                    followUser(userDetails.id)
                                                  );
                                                  if (response) {
                                                    setIsFlw(true);
                                                  }
                                                }
                                              }
                                            }}
                                          >
                                            <UnFollow />
                                            {lang("PROFILE_TABS.UNFOLLOW")}
                                          </Button>
                                        ) : (
                                          <Button
                                            variant="btn btn-outline-primary ml-1 btn-small-icon mb-2"
                                            onClick={() => {
                                              if (!viewmode) {
                                                if (isFlw) {
                                                  const response = dispatch(
                                                    unfollowUser(userDetails.id)
                                                  );
                                                  if (response) {
                                                    setIsFlw(false);
                                                  }
                                                } else if (!isFlw) {
                                                  const response = dispatch(
                                                    followUser(userDetails.id)
                                                  );
                                                  if (response) {
                                                    setIsFlw(true);
                                                  }
                                                }
                                              }
                                            }}
                                          >
                                            <Follow />
                                            Follow
                                          </Button>
                                        )}
                                      </Fragment>
                                    )}
                                    {(!isSelfProfile || viewmode) && (
                                      <Button
                                        variant="btn btn-outline-secondary-purple ml-1 btn-small-icon mb-2"
                                        onClick={async () => {
                                          if (!viewmode) {
                                            if (
                                              otherUserData?.connectionData
                                                ?.length === 0
                                            ) {
                                              showMessageNotification(
                                                "Please Connect First"
                                              );
                                            } else {
                                              let chatRes;
                                              if (otherUserData?.mmRegister) {
                                                let userMmId =
                                                  otherUserData?.mmId;
                                                if (!userMmId) {
                                                  const res = await getUserById(
                                                    otherUserData?.id
                                                  );
                                                  userMmId = res?.mmId;
                                                }
                                                chatRes = await chatCreateUser({
                                                  ids: [
                                                    userMmId,
                                                    mmLogin?.mmId,
                                                  ],
                                                });
                                              } else {
                                                let userEmail =
                                                  otherUserData?.email;
                                                if (
                                                  !userEmail ||
                                                  userEmail === "HIDDEN"
                                                ) {
                                                  const user =
                                                    await getUserById(
                                                      otherUserData?.id
                                                    );
                                                  userEmail = user.email;
                                                }
                                                const res = await dispatch(
                                                  chatSignupUser(
                                                    {
                                                      email: userEmail,
                                                    },
                                                    "profile"
                                                  )
                                                );
                                                chatRes = await chatCreateUser({
                                                  ids: [res?.id, mmLogin?.mmId],
                                                });
                                              }
                                              currentChannelHandler(chatRes);
                                              router.push("/messages");
                                            }
                                          }
                                        }}
                                      >
                                        <MessageIcon />
                                        {lang("PROFILE_TABS.MESSAGE")}
                                      </Button>
                                    )}
                                    {/* here */}
                                  </div>
                                </div>
                              )}
                              {!isSelfProfile &&
                                pendingRequest?.isRequested === true && (
                                  <>
                                    <Button
                                      variant="btn btn-outline-primary ml-1 btn-small-icon mb-2 align-items-center"
                                      onClick={async () => {
                                        await acceptRequest(
                                          pendingRequest.connectionId
                                        );

                                        setIsAccepted(true);
                                        dispatch(
                                          checkPendingRequest(userDetails?.id)
                                        );
                                        const responseProfile = await get(
                                          {
                                            serviceURL: USER_API_URL,
                                          },
                                          `${GET_OTHER_PROFILE}${profileId}`,
                                          false,
                                          {},
                                          true
                                        );
                                        setOtherUserData(responseProfile.data);
                                        setIsFlw(true);
                                      }}
                                    >
                                      {/* <em className="icon icon-approve font-16 pr-2"></em> */}
                                      <Connect />
                                      {lang("CONNECTIONS.ACCEPT")}
                                    </Button>
                                    <Button
                                      variant="btn btn-outline-primary ml-1 btn-small-icon mb-2 align-items-center"
                                      onClick={async () => {
                                        rejectRequest(
                                          pendingRequest.connectionId
                                        );

                                        dispatch(
                                          checkPendingRequest(userDetails?.id)
                                        );
                                      }}
                                    >
                                      <RejectRequest />
                                      {lang("CONNECTIONS.DENY")}
                                    </Button>
                                  </>
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </Card.Body>

      {renderPopup(
        popupInfo.isEdit ? "Edit Info" : `${firstName} ${lastName}`,
        renderProfileSummaryForm
      )}
      {/******************* 
       @purpose : Connection List
      @Author : INIC
      ******************/}
      <MainModal
        className="connection-list header-none-modal"
        show={connectionlist}
        keyModal="connectionlist"
        body={
          <ConnectionList
            isSelfProfile={isSelfProfile}
            userId={otherUserData.id}
          />
        }
        headerClassName="mb-50 block md-mb-30 border-bottom border-geyser"
        header={
          <h2 className="h6 m-0">
            {lang("MY_ACCOUNTS.COMMON.MY_CONNECTIONS")}
          </h2>
        }
      />
      <MainModal
        className="connection-list header-none-modal"
        show={growthConnectionList}
        keyModal="growthConnectionList"
        body={
          <GrowthConnectionList
            isSelfProfile={isSelfProfile}
            userId={otherUserData.id}
          />
        }
        headerClassName="mb-50 block md-mb-30 border-bottom border-geyser"
        header={
          <h2 className="h6 m-0">
            {lang("MY_ACCOUNTS.COMMON.MY_GROWTH_CONNECTIONS")}
          </h2>
        }
      />
    </Card>
  );
};
export default WithPopup(ProfileSummary);
