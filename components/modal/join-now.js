import dynamic from "next/dynamic";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  getCourseDetail,
  joinCourse,
  setCourseDetail,
  toggleModals,
} from "store/actions";
import { joinRoom, roomDetails } from "store/actions/room";
import { showMessageNotification } from "utils";
const NoSufficientCreadit = dynamic(() =>
  import("./../modal").then((mod) => mod.NoSufficientCreadit)
);
const MainModal = dynamic(() =>
  import("./../modal").then((mod) => mod.MainModal)
);

/*******************   
@purpose : User Set joinnow
@Author : INIC
******************/
export const Joinnow = ({
  courseDetail,
  updateCourseDetails,
  roomDetailsInfo,
}) => {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);
  let userData = user?.userInfo || {};
  if (user?.userInfo && typeof user.userInfo === "string")
    userData = JSON.parse(user.userInfo);
  const { nosufficientcreadit } = useSelector(
    ({ ui }) => ui.modals,
    shallowEqual
  );
  const [lang] = useTranslation("language");
  /*******************   
  @purpose : Join Course Function
  @Author : INIC
  ******************/
  const join = async (element) => {
    if (
      (userData.accountType === "free" &&
        parseFloat(userData.credits) < parseFloat(courseDetail.freePrice)) ||
      (userData.accountType === "lite" &&
        parseFloat(userData.credits) < parseFloat(courseDetail.litePrice)) ||
      (userData.accountType === "premium" &&
        parseFloat(userData.credits) < parseFloat(courseDetail.premiumPrice))
    ) {
      dispatch(toggleModals({ nosufficientcreadit: true }));
      return;
    } else {
      let target = element.target;
      target.innerHTML = "Loading...";
      target.disabled = true;
      const res = await joinCourse(courseDetail.id);
      showMessageNotification(res?.message);

      if (res.status === 1) {
        dispatch(getCourseDetail(courseDetail.id)).then((response) => {
          if (res.status === 1) {
            setCourseDetail(() => ({ ...response.data }));
            dispatch(toggleModals({ joinnow: false }));
          }
        });
      }
      updateCourseDetails({
        purchaseDetails: { ...res },
      });
    }
  };

  /*******************   
  @purpose : Join Rooms function
  @Author : INIC
  ******************/

  const roomJoin = async (element) => {
    if (
      (userData.accountType === "free" &&
        parseFloat(userData.credits) < parseFloat(roomDetailsInfo.freePrice)) ||
      (userData.accountType === "lite" &&
        parseFloat(userData.credits) < parseFloat(roomDetailsInfo.litePrice)) ||
      (userData.accountType === "premium" &&
        parseFloat(userData.credits) < parseFloat(roomDetailsInfo.premiumPrice))
    ) {
      dispatch(toggleModals({ nosufficientcreadit: true }));
      return;
    } else {
      let target = element.target;
      target.innerHTML = lang("COMMON.LOADING");
      target.disabled = true;
      joinRoom(roomDetailsInfo.id, roomDetailsInfo?.mmChannelId).then(() => {
        dispatch(roomDetails(roomDetailsInfo.id));
        dispatch(toggleModals({ joinnow: false }));
      }).finally(() => {
        target.innerHTML = lang("COURSES.JOIN_NOW");
        target.disabled = false;
      })
    }
  };

  const joinFunc = (element) => {
    if (courseDetail) {
      join(element);
    } else if (roomDetailsInfo) {
      roomJoin(element);
    }
  };

  const credits = +userData?.credits;
  return (
    <>
      <Modal.Body className="credit-list p-4">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="m-0 font-weight-semibold font-18">
            {lang("COURSES.YOUR_CREDIT")}
          </h5>
          <div className="credit-option d-flex align-items-center">
            <div className="font-16 font-weight-semibold rounded-8 border border-geyser bg-gary-light gary-light-btn">
              {credits.toFixed(2)} &euro;
            </div>
            <span
              className="text-primary font-medium font-14 ml-4 pointer"
              onClick={() => {
                dispatch(toggleModals({ addcredit: true }));
              }}
            >
              {lang("COURSES.ADD_CREDIT")}
            </span>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center my-3">
          <h6 className="m-0 font-medium font-16 position-relative">
            <em
              className={
                userData?.accountType === "free"
                  ? "icon icon-checked pr-2 font-20 align-middle"
                  : "icon icon-checked gray-icon pr-2 font-20 align-middle"
              }
            ></em>
            {lang("COURSES.CREDIT_FREE_USER")}
          </h6>
          <div className="credit-option d-flex align-items-center flex-shrink-0">
            <div className="font-16 font-weight-semibold rounded-8 border border-geyser bg-gary-light gary-light-btn">
              {courseDetail
                ? courseDetail.freePrice
                : roomDetailsInfo
                  ? roomDetailsInfo.freePrice
                  : ""}{" "}
              &euro;
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center my-3">
          <h6 className="m-0 font-medium font-16 position-relative">
            <em
              className={
                userData?.accountType === "lite"
                  ? "icon icon-checked pr-2 font-20 align-middle"
                  : "icon icon-checked gray-icon pr-2 font-20 align-middle"
              }
            ></em>
            {lang("COURSES.CREDIT_LITE_USER")}
          </h6>
          <div className="credit-option d-flex align-items-center flex-shrink-0">
            <div className="font-16 font-weight-semibold rounded-8 border border-geyser bg-gary-light gary-light-btn">
              {courseDetail
                ? courseDetail.litePrice
                : roomDetailsInfo
                  ? roomDetailsInfo.litePrice
                  : ""}{" "}
              &euro;
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center my-3">
          <h6 className="m-0 font-medium font-16 position-relative">
            <em
              className={
                userData?.accountType === "premium"
                  ? "icon icon-checked pr-2 font-20 align-middle"
                  : "icon icon-checked gray-icon pr-2 font-20 align-middle"
              }
            ></em>
            {lang("COURSES.CREDIT_PREMIUM_USER")}
          </h6>
          <div className="credit-option d-flex align-items-center flex-shrink-0">
            <div className="font-16 font-weight-semibold rounded-8 border border-geyser bg-gary-light gary-light-btn">
              {courseDetail
                ? courseDetail.premiumPrice
                : roomDetailsInfo
                  ? roomDetailsInfo.premiumPrice
                  : ""}{" "}
              &euro;
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="text-center text-sm-left d-flex justify-content-between custom-footer border-top border-geyser">
        <Button
          variant="btn"
          type="button"
          onClick={() => dispatch(toggleModals({ joinnow: false }))}
          className="mb-50 md-mb-30 mr-1 mr-sm-3 btn btn-dark border-0"
        >
          {lang("COURSES.CANCEL")}
        </Button>
        <Button
          onClick={joinFunc}
          variant="info"
          type="submit"
          className="mb-50 md-mb-30 ml-1 px-4 ml-sm-3"
        >
          {lang("COURSES.JOIN_NOW")}
        </Button>
      </Modal.Footer>

      {/******************* 
          @purpose : No Sufficient Creadit
          @Author : INIC
          ******************/}
      <MainModal
        className="nosufficient-creadit-modal only-body-modal"
        show={nosufficientcreadit}
        keyModal="nosufficientcreadit"
        body={<NoSufficientCreadit />}
        headerClassName="mb-50 block md-mb-30"
      />
    </>
  );
};
