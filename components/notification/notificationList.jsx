import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { Button, Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  skillEndorse,
  skillEndorseReject,
  updateRoleInvitationStatus,
} from "store/actions";
import { getNotificationsList } from "store/actions/notifications";
import { CONST_STRING, getNotficationProfilePic, onImageError } from "utils";
// import { Link } from "../../routes";

/******************** 
  @purpose :Notification List
  @Parameter : {singleNotification, index}
  @Author : INIC
  ******************/

const NotificationList = ({
  singleNotification,
  removeNotification,
  turnOffNotification,
  markSeenNotification,
  index,
  lang,
  page,
  pagesize,
}) => {
  const router = useRouter();
  const profile = getNotficationProfilePic(singleNotification);
  const dispatch = useDispatch();
  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/

  const handleUpdateRoleInvitationStatus = async (newStatus) => {
    let auth = singleNotification.notificationData.token;
    let companyRoleId = singleNotification.notificationData.companyRoleId;
    let instituteRoleId = singleNotification.notificationData.instituteRoleId;
    await dispatch(
      updateRoleInvitationStatus(
        singleNotification.notificationData.type,
        newStatus,
        auth,
        companyRoleId || instituteRoleId,
        singleNotification?.id
      )
    );
    dispatch(
      getNotificationsList({
        page,
        pagesize,
      })
    );
  };

  return (
    <>
      <li className="listing-box d-flex flex-column px-3" key={index}>
        <div className="d-flex align-items-start justify-content-between w-100 mb-3">
          <div className="d-flex align-items-center position-relative">
            {
              <span
                className={`active-dot mr-2 flex-shrink-0 ${
                  singleNotification?.isSeen ? "invisible" : ""
                }`}
              ></span>
            }
            <picture className="user-profile-pic rounded-pill mr-2 flex-shrink-0">
              <source srcSet={profile || ""} type="image/jpg" />
              <img
                src={profile || ""}
                width="40"
                height="40"
                onError={(e) =>
                  onImageError(
                    e,
                    "profile",
                    `${
                      singleNotification?.senderData?.type == "user"
                        ? singleNotification?.senderData?.firstName || ""
                        : singleNotification?.senderData?.type == "Company"
                        ? singleNotification?.notificationData?.companyDetails
                            ?.name || ""
                        : singleNotification?.notificationData?.instituteDetails
                            ?.name || ""
                    } ${
                      singleNotification?.senderData?.type == "user"
                        ? singleNotification?.senderData?.lastName || ""
                        : singleNotification?.senderData?.type == "Company"
                        ? ""
                        : ""
                    }`
                  )
                }
              />
            </picture>
            <div className="position-relative mr-sm-5 mr-4 notification-listing">
              {singleNotification?.notificationData &&
              singleNotification?.notificationData?.redirectURL ? (
                <a
                  href={
                    singleNotification?.senderData?.isAnonymProfile
                      ? "javascript:void(0)"
                      : singleNotification?.notificationData?.redirectURL
                  }
                  onClick={() => {
                    markSeenNotification(singleNotification);
                  }}
                  title={singleNotification?.message}
                  target="_self"
                  className="text-body-14"
                >
                  {singleNotification.type === CONST_STRING.ADMIN
                    ? CONST_STRING.ADMIN
                    : `${
                        singleNotification?.senderData?.type == "user"
                          ? singleNotification?.senderData?.firstName || ""
                          : singleNotification?.senderData?.type == "Company"
                          ? singleNotification?.notificationData?.companyDetails
                              ?.name || ""
                          : singleNotification?.notificationData
                              ?.instituteDetails?.name || ""
                      } ${
                        singleNotification?.senderData?.type == "user"
                          ? singleNotification?.senderData?.lastName || ""
                          : singleNotification?.senderData?.type == "Company"
                          ? ""
                          : ""
                      }`}
                  {/* {singleNotification?.message} */}
                </a>
              ) : (
                <span
                  className="text-body-14"
                  onClick={() => {
                    markSeenNotification(singleNotification);
                  }}
                >
                  {" "}
                  {singleNotification.type === CONST_STRING.ADMIN
                    ? CONST_STRING.ADMIN
                    : `${
                        singleNotification?.senderData?.type == "user"
                          ? singleNotification?.senderData?.firstName || ""
                          : singleNotification?.senderData?.type == "Company"
                          ? singleNotification?.notificationData?.companyDetails
                              ?.name || ""
                          : singleNotification?.notificationData
                              ?.instituteDetails?.name || ""
                      } ${
                        singleNotification?.senderData?.type == "user"
                          ? singleNotification?.senderData?.lastName || ""
                          : singleNotification?.senderData?.type == "Company"
                          ? ""
                          : ""
                      }`}
                  {/* {singleNotification?.message} */}
                </span>
              )}
              <p className="notification-sender-position mb-0 mt-0">
                {singleNotification?.senderData?.currentPosition || ""}
              </p>
              <p className="text-body-12 mb-0 mt-1">
                {moment(singleNotification?.createdAt).format("DD MMM YYYY")}
              </p>
            </div>
          </div>
          <div className="d-flex self-align-start">
            <Dropdown className="theme-dropdown d-flex align-items-center ">
              <Dropdown.Toggle>
                <em className="icon icon-ellipsis-h font-24 text-black"></em>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  href={void 0}
                  onClick={() => {
                    removeNotification(singleNotification);
                  }}
                >
                  {lang("NOTIFICATION.REMOVE")}
                </Dropdown.Item>
                <Dropdown.Item
                  href={void 0}
                  onClick={() => {
                    turnOffNotification(singleNotification);
                  }}
                >
                  {lang("NOTIFICATION.TURN_OFF")}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div
          className={`w-100 notification-message ml-4 ${
            singleNotification?.notificationData?.redirectURL
              ? "cursor-pointer"
              : ""
          }`}
        >
          <span
            onClick={() => {
              if (singleNotification?.notificationData?.redirectURL) {
                const notificationType = singleNotification?.type;
                const notificationText = singleNotification?.text;
                let customRedirectUrl = "";
                if (
                  notificationText == "GROUP_REQUEST" &&
                  notificationType == "Group"
                )
                  customRedirectUrl = "/groups?groupTab=requested";
                window.open(
                  customRedirectUrl
                    ? customRedirectUrl
                    : singleNotification?.notificationData?.redirectURL,
                  "_blank"
                );
              }
              markSeenNotification(singleNotification);
            }}
          >
            {singleNotification?.message}
          </span>
          {singleNotification.text === "ENDORSE_REQUEST" &&
            !singleNotification?.actionTaken && (
              <div className="mt-3">
                <Button
                  variant="btn btn-primary btn-sm p-2 mr-2 font-12"
                  onClick={async () => {
                    await dispatch(
                      skillEndorse({
                        notificationId: singleNotification?.id,
                        userSkillId:
                          singleNotification?.notificationData?.userSkillId,
                        isEndorsed: true,
                      })
                    );
                    await dispatch(
                      getNotificationsList({
                        page,
                        pagesize,
                      })
                    );
                  }}
                >
                  {lang("COMMON.CONFIRM")}
                </Button>
                <Button
                  variant="btn btn-dark btn-sm p-2 font-12"
                  onClick={() => {
                    dispatch(
                      skillEndorseReject({
                        notificationId: singleNotification?.id,
                        userSkillId:
                          singleNotification?.notificationData?.userSkillId,
                      })
                    ).then(() => {
                      dispatch(
                        getNotificationsList({
                          page,
                          pagesize,
                        })
                      );
                    });
                  }}
                >
                  {lang("CONNECTIONS.REJECT")}
                </Button>
              </div>
            )}

          {singleNotification.text === "ASSIGNED_ROLE" &&
            !singleNotification?.actionTaken && (
              <div className="w-100">
                <button
                  className="btn-sm btn btn-primary "
                  style={{ margin: "0.5rem 0.5rem 0 0.7rem" }}
                  onClick={() => handleUpdateRoleInvitationStatus(true)}
                >
                  {" "}
                  {lang("ASSIGNED_ROLE.ACCEPT")}{" "}
                </button>
                <button
                  className="btn-sm btn  align-items-center justify-content-center mb-0 border-blueberry-whip py-2 px-12"
                  style={{ margin: "0.5rem 0 0 0" }}
                  onClick={() => handleUpdateRoleInvitationStatus(false)}
                >
                  {" "}
                  {lang("ASSIGNED_ROLE.REJECT")}{" "}
                </button>
              </div>
            )}
        </div>
      </li>
    </>
  );
};
export default NotificationList;
{
  /* <li className="listing-box d-flex flex-column px-3">
        <div className="d-flex align-items-start justify-content-between w-100">
          <div className="d-flex position-relative">
            {
              <span
                className={`active-dot mt-2 mr-2 flex-shrink-0 ${singleNotification?.isSeen ? "invisible" : ""
                  }`}
              ></span>
            }
            <div className="position-relative mr-3 notification-listing">
              <p className="font-weight-normal mb-0">
                <a href="#" className="text-primary font-weight-bold text-body-14">Dennis C Smith</a> requested for confirmation related
                to the <b>Content Writing</b> skill.
              </p>
              <p className="text-body-12 mb-2">
                {moment(singleNotification?.createdAt).format("DD MMM YYYY")}
              </p>
              <div className="d-flex p-2 bg-gary-light mb-2">
                <span className="mr-2 d-inline-flex">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.33268 5.8335L6.66602 9.16683H9.16602V14.1668H4.16602V9.16683L5.83268 5.8335H8.33268ZM14.9993 5.8335L13.3327 9.16683H15.8327V14.1668H10.8327V9.16683L12.4993 5.8335H14.9993Z" fill="#77838F" />
                  </svg>
                </span>
                <p className="mb-0 flex-grow-1 font-weight-normal font-12">Kindly approve my request for content writing skill.</p>
                <span className="ml-2 d-inline-flex">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.666 14.1668H14.166L15.8327 10.8335V5.8335H10.8327V10.8335H13.3327M4.99935 14.1668H7.49935L9.16602 10.8335V5.8335H4.16602V10.8335H6.66602L4.99935 14.1668Z" fill="#77838F" />
                  </svg>
                </span>
              </div>
              <div>
                <Button
                  variant="btn btn-primary btn-sm p-2 mr-2 font-12"
                >
                  Confirm
                </Button>
                <Button
                  variant="btn btn-dark btn-sm p-2 font-12"
                >
                  Reject
                </Button>
              </div>
            </div>
          </div>
          <div className="d-flex self-align-start">
            <Dropdown className="theme-dropdown d-flex align-items-center ">
              <Dropdown.Toggle>
                <em className="icon icon-ellipsis-h font-24 text-black"></em>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  href={void 0}
                  onClick={() => {
                    removeNotification(singleNotification);
                  }}
                >
                  {lang("NOTIFICATION.REMOVE")}
                </Dropdown.Item>
                <Dropdown.Item
                  href={void 0}
                  onClick={() => {
                    turnOffNotification(singleNotification);
                  }}
                >
                  {lang("NOTIFICATION.TURN_OFF")}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </li> */
}
