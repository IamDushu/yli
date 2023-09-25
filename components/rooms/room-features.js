import React, { useState, Fragment } from "react";
import { Card, Button } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { toggleModal, toggleModals } from "store/actions";
import { useTranslation } from "react-i18next";
import moment from "moment";
import momentTimezone from "moment-timezone";
import dynamic from "next/dynamic";
import ManageShare from "./ManageShare";
import { selectUserInfo } from "store/selectors/user";
import { APP_URL } from "config";
import Speakers from "components/common/virtualEvents/Speakers";
import Groups from "components/common/virtualEvents/Groups";
const Joinnow = dynamic(() =>
  import("components/modal").then((mod) => mod.Joinnow)
);
const MainModal = dynamic(() =>
  import("components/modal").then((mod) => mod.MainModal)
);
const AddToGMModal = dynamic(() =>
  import("components/modal").then((mod) => mod.AddToGMModal)
);

const RoomFeatures = (props) => {
  /******************** 
@purpose : Used for use state
@Parameter : { data, dispatch }
@Author : INIC
******************/
  const dispatch = useDispatch();
  const [lang] = useTranslation("language");
   const userInfo = useSelector(selectUserInfo);
  const { roomDetail } = useSelector((state) => state?.room);
  const [isReadDesc, setIsReadDesc] = useState(true);
  const [isReadGoal, setIsReadGoal] = useState(true);

  const { joinnow, manageShare } = useSelector(
    ({ ui }) => ui.modals,
    shallowEqual
  );
  const initGModalData = {
    activityCategory: roomDetail?.virtualEventType,
    activityTitle: "",
    activityId: "",
    activityLink: "",
  };

  const [gmodalData, setGmodalData] = useState(initGModalData);
  const { addtoGrowthModel } = useSelector(({ ui }) => ui.modals, shallowEqual);

  /******************** 
  @purpose :  Add to GM toggle
  @Parameter : {}
  @Author : INIC
  ******************/

  const addToGModalToggle = (id = "", title = "", postLink) => {
    if (id !== "") {
      setGmodalData((state) => ({
        ...state,
        activityId: id,
        activityTitle: title,
        activityLink: postLink,
      }));
      dispatch(toggleModals({ addtoGrowthModel: true }));
    } else {
      setGmodalData({ ...initGModalData });
      dispatch(toggleModals({ addtoGrowthModel: false }));
    }
  };

  const addtoGrowthM = () => {
    let postLink = `${APP_URL}/virtual-events/${roomDetail?.id}`;
    addToGModalToggle(roomDetail?.id, roomDetail?.title, postLink);
  };

  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  return (
    <Fragment>
      <Card className="border-0">
        <Card.Body className="px-sm-4 px-2 pt-2 pt-sm-4">
          <div className="border-bottom-blueberry-whip mb-4 pb-3 profile-summary-wrap">
            <div className="mb-3">
              <h4 className="font-32">{roomDetail?.title}</h4>
              <small className="font-14 w-100 d-block">
                Event by{" "}
                <b className="cursor-pointer" onClick={()=>{
                    window.open(roomDetail?.instituteDetails?.id
                      ? `/profile/institute-profile?instituteId=${roomDetail?.instituteDetails?.id}&name=${roomDetail?.instituteDetails?.name}&userId=${roomDetail?.instituteDetails?.userId}`
                      : roomDetail?.companyDetails?.id
                      ? `/profile/company-profile?companyId=${roomDetail?.companyDetails?.id}&name=${roomDetail?.companyDetails?.companyName}&userId=${roomDetail?.companyDetails?.userId}`
                      : `/profile/${roomDetail?.UserDetails?.profileId}`,"_blank")
                  }}>
                  {roomDetail?.instituteDetails
                    ? roomDetail?.instituteDetails?.name
                    : roomDetail?.companyDetails
                    ? roomDetail?.companyDetails?.companyName
                    : roomDetail?.UserDetails?.firstName +
                      " " +
                      roomDetail?.UserDetails?.lastName}
                </b>
              </small>
              <small className="font-14 text-secondary d-block">
                {userInfo?.timezone
                  ? momentTimezone(roomDetail?.startDate)
                      .tz(userInfo?.timezone)
                      .format("ddd, MMM D, YYYY, h:mm A")
                  : moment(roomDetail?.startDate).format(
                      "ddd, MMM D, YYYY, h:mm A"
                    )}
              </small>
            </div>
            <div className="d-md-flex">
              {roomDetail &&
                roomDetail?.UserDetails?.id !== props?.userData?.id &&
                roomDetail?.purchaseDetails === null &&
                !roomDetail?.isSpecialGuest &&
                roomDetail?.purchaseCount < roomDetail?.maxParticipants && (
                  <Button
                    onClick={() => dispatch(toggleModals({ joinnow: true }))}
                    variant="primary"
                    className="btn-yliway-enroll px-4 my-auto"
                  >
                    {lang("ROOMS.JOIN")}
                  </Button>
                )}
              <span
                className="ml-3 share-btn align-items-center justify-content-center d-inline-flex"
                onClick={() => dispatch(toggleModal(true, "manageShare"))}
              >
                <i class="bx bx-share-alt"></i>
              </span>
              {roomDetail?.gmDetails === null ||
              roomDetail?.gmDetails === undefined ? (
                <span
                  className="ml-3 add-to-gm-btn align-items-center justify-content-center d-inline-flex"
                  title="Add to GM"
                  onClick={addtoGrowthM}
                >
                  <i class="bx bx-plus"></i>
                </span>
              ) : (
                roomDetail?.gmDetails !== null && (
                  <span className="ml-3 add-to-gm-btn" title="Added to GM">
                    <i class="bx bx-check"></i>
                  </span>
                )
              )}

              <ul className="d-flex list-unstyled room-fee mt-3 mt-md-0">
                <li className="ml-0">
                  <p className="font-12">{lang("COMMON.FREE")}</p>
                  <p className="font-18 font-weight-bold">
                    {roomDetail?.freePrice}
                  </p>
                </li>
                <li>
                  <p className="font-12">{lang("COMMON.LITE")}</p>
                  <p className="font-18 font-weight-bold">
                    {roomDetail?.litePrice}
                  </p>
                </li>
                <li>
                  <p className="font-12">{lang("COMMON.PREMIUM")}</p>
                  <p className="font-18 font-weight-bold">
                    {roomDetail?.premiumPrice}
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {(roomDetail?.virtualEventType === "training-room" ||
            roomDetail?.virtualEventType === "webinar" ||
            roomDetail?.virtualEventType === "master-class") && (
            <div className="desc border-bottom-blueberry-whip mb-4 pb-3">
              <h3 className="h6 font-24">{lang("ROOMS.GOAL")}</h3>
              <p className="text-body-14 font-weight-normal m-0">
                <p
                  dangerouslySetInnerHTML={{
                    __html: isReadGoal
                      ? roomDetail.enterRoomGoal?.slice(0, 200)
                      : roomDetail.enterRoomGoal,
                  }}
                />

                {roomDetail.enterRoomGoal?.length > 200 && (
                  <a
                    type="button"
                    onClick={() => setIsReadGoal(!isReadGoal)}
                    className="text-blue-dress"
                  >
                    {isReadGoal
                      ? lang("COMMON.READ_MORE")
                      : lang("COMMON.READ_LESS")}
                  </a>
                )}
              </p>
            </div>
          )}

          <div className="border-bottom-blueberry-whip desc mb-4 pb-3">
            <h3 className="h6">{lang("ROOMS.DESCRIPTION")}</h3>
            <p className="text-body-14 font-weight-normal m-0">
              <p
                dangerouslySetInnerHTML={{
                  __html: isReadDesc
                    ? roomDetail.fullDescription?.slice(0, 500)
                    : roomDetail.fullDescription,
                }}
              />

              {roomDetail.fullDescription?.length > 200 && (
                <a
                  type="button"
                  onClick={() => setIsReadDesc(!isReadDesc)}
                  className="text-blue-dress"
                >
                  {isReadDesc
                    ? lang("COMMON.READ_MORE")
                    : lang("COMMON.READ_LESS")}
                </a>
              )}
            </p>
          </div>

          {roomDetail?.specialGuest && roomDetail?.specialGuest?.length > 0 && (
            <Speakers />
          )}

          {roomDetail.joiningGroupLink !== "" &&
            roomDetail.joiningGroupLink !== null && <Groups />}
        </Card.Body>
      </Card>
      <MainModal
        className="manageShare custom-modal-footer "
        show={manageShare}
        keyModal="manageShare"
        header={<h2 className="h6 m-0">Share</h2>}
        body={<ManageShare roomId={roomDetail.id} manageData={roomDetail} />}
        headerClassName="mb-50 block md-mb-30"
      />
      {/* Profile Summary : END */}
      <MainModal
        className="joinnow-modal custom-modal-footer"
        show={joinnow}
        keyModal="joinnow"
        header={<h2 className="h6 m-0 Heading">Join Now</h2>}
        body={
          <Joinnow
            // courseDetail={courseDetail}
            // updateCourseDetails={updateCourseDetails}
            roomDetailsInfo={roomDetail}
          />
        }
        headerClassName="mb-50 block md-mb-30"
      />

      <MainModal
        className="add-to-gmodal modal"
        show={addtoGrowthModel}
        keyModal="addtoGrowthModel"
        body={
          <AddToGMModal
            toggleGMModal={addToGModalToggle}
            data={gmodalData}
            roomId={roomDetail?.id}
            roomData={"roomBanner"}
          />
        }
        headerClassName="mb-50 block md-mb-30"
        header={<h2 className="h6 mb-0">{lang("ROOMS.ADD_TO_GM")}</h2>}
      />
    </Fragment>
  );
};
export default RoomFeatures;
