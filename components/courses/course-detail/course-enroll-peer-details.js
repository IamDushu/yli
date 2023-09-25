import { APP_URL } from "config";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { toggleModal, toggleModals } from "store/actions";
import { onImageError } from "utils";
const MainModal = dynamic(() =>
  import("components/modal").then((mod) => mod.MainModal)
);
const Joinnow = dynamic(() =>
  import("components/modal").then((mod) => mod.Joinnow)
);
const AddToGMModal = dynamic(() =>
  import("components/modal").then((mod) => mod.AddToGMModal)
);
const ManageShare = dynamic(() => import("components/rooms/ManageShare"));

const CourseEnrollPeerDetails = ({
  isOwner,
  updateCourseDetails,
  userInfo,
}) => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const router = useRouter();
  const { joinnow, manageShare, addtoGrowthModel, quizmodal } = useSelector(
    ({ ui }) => ui.modals,
    shallowEqual
  );
  const courseDetail = useSelector((state) => state?.courses?.courseDetail);
  const initGModalData = {
    activityCategory: "course",
    activityTitle: "",
    activityId: "",
    activityLink: "",
  };
  const [gmodalData, setGmodalData] = useState(initGModalData);

  /**
   * @Purpose: To toggle growth modal dialog
   * @Author: YLIWAY
   */
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

  /**
   * @Purpose: To add course to growth modal
   * @Author: YLIWAY
   */
  const addtoGrowthM = () => {
    let postLink = `${APP_URL}/course-detail/${courseDetail?.id}`;
    addToGModalToggle(courseDetail?.id, courseDetail?.title, postLink);
  };
  return (
    <>
      <div className="course-peer-details mt-5">
        <Container className="py-4">
          <div className="d-lg-flex flex-wrap">
            {courseDetail?.UserDetails?.id !== isOwner && (
              <>
                {/* Enroll Button */}
                {courseDetail.purchaseDetails === null &&
                  courseDetail.courseType === "online" && (
                    <Button
                      onClick={() => dispatch(toggleModals({ joinnow: true }))}
                      variant="primary"
                      className="btn-yliway-enroll px-4 my-auto"
                    >
                      {lang("COURSES.ENROLL")}
                    </Button>
                  )}
                {courseDetail.purchaseDetails !== null &&
                courseDetail.purchaseDetails?.userId === userInfo.id ? (
                  <Button
                    variant="primary"
                    className="btn-yliway-enroll px-4 my-auto"
                  >
                    {lang("COURSES.ENROLLED")}
                  </Button>
                ) : (
                  <Button
                    onClick={() => dispatch(toggleModals({ joinnow: true }))}
                    variant="primary"
                    className="btn-yliway-enroll px-4 my-auto"
                  >
                    {lang("COURSES.ENROLL")}
                  </Button>
                )}
                {/* Share Button */}
                <span
                  className="ml-3 share-btn align-items-center justify-content-center d-inline-flex"
                  onClick={() => dispatch(toggleModal(true, "manageShare"))}
                >
                  <i class="bx bx-share-alt"></i>
                </span>

                {/* Add to GM Button */}
                {courseDetail?.gmDetails === null ||
                courseDetail?.gmDetails === undefined ? (
                  <span
                    className="ml-3 add-to-gm-btn align-items-center justify-content-center d-inline-flex"
                    title="Add to GM"
                    onClick={addtoGrowthM}
                  >
                    <i class="bx bx-plus"></i>
                  </span>
                ) : (
                  courseDetail?.gmDetails !== null && (
                    <span className="ml-3 add-to-gm-btn " title="Added to GM">
                      <i class="bx bx-check"></i>
                    </span>
                  )
                )}
              </>
            )}

            {/* Peer Details */}
            <div className="peer-details ml-auto d-flex ml-3 my-3 my-lg-0">
              <div className="my-auto order-2 order-lg-1 ml-2">
                <h5
                  className="text-body-14 mb-0 pointer"
                  onClick={() => {
                    window.open(
                      courseDetail?.instituteDetails
                        ? `${APP_URL}/profile/institute-profile?instituteId=${
                            courseDetail?.instituteDetails?.id
                          }${
                            courseDetail?.instituteDetails?.name
                              ? "&name=" + courseDetail?.instituteDetails?.name
                              : ""
                          }`
                        : `${APP_URL}/profile/${courseDetail?.UserDetails?.profileId}`,
                      "_blank"
                    );
                  }}
                >
                  {courseDetail?.instituteDetails?.id
                    ? courseDetail?.instituteDetails?.name
                    : courseDetail?.UserDetails?.firstName +
                      " " +
                      courseDetail?.UserDetails?.lastName}
                </h5>
                <span className="peer-rating">
                  <em className="icon icon-star-fill font-16"></em>
                  <span className="pl-2 font-weight-normal text-body-14">
                    {courseDetail?.rating}
                  </span>
                </span>
              </div>
              <div className="border border-dark ml-lg-3 overflow-hidden rounded-pill order-1 order-lg-2 m-0">
                <picture onContextMenu={(e) => e.preventDefault()}>
                  <source
                    srcSet={
                      courseDetail?.instituteDetails?.id
                        ? courseDetail?.instituteDetails?.logo || ""
                        : courseDetail?.UserDetails?.profilePicURL || ""
                    }
                    type="image/png"
                  />
                  <img
                    src={
                      courseDetail?.instituteDetails?.id
                        ? courseDetail?.instituteDetails?.logo || ""
                        : courseDetail?.UserDetails?.profilePicURL || ""
                    }
                    alt="User"
                    width="52"
                    height="52"
                    onError={(e) => {
                      onImageError(
                        e,
                        "profile",
                        `${
                          courseDetail?.instituteDetails?.id
                            ? courseDetail?.instituteDetails?.name || ""
                            : courseDetail?.UserDetails?.firstName ||
                              "" + " " + courseDetail?.UserDetails?.lastName ||
                              ""
                        }`
                      );
                    }}
                  />
                </picture>
              </div>
            </div>

            {/* Course Fee */}
            <ul className="list-unstyled d-flex course-fee ml-0 ml-lg-4 w-md-100">
              <li>
                <p className="font-12">{lang("COMMON.FREE")}</p>
                <p className="font-18 font-weight-bold">
                  {courseDetail.courseType === "offline"
                    ? courseDetail.enterPrice
                    : courseDetail.freePrice}
                </p>
              </li>
              <li>
                <p className="font-12">{lang("COMMON.LITE")}</p>
                <p className="font-18 font-weight-bold">
                  {courseDetail.courseType === "offline"
                    ? courseDetail.enterPrice
                    : courseDetail.litePrice}
                </p>
              </li>
              <li>
                <p className="font-12">{lang("COMMON.PREMIUM")}</p>
                <p className="font-18 font-weight-bold">
                  {courseDetail.courseType === "offline"
                    ? courseDetail.enterPrice
                    : courseDetail.premiumPrice}
                </p>
              </li>
            </ul>
          </div>
        </Container>
      </div>
      {/* Enroll Course */}
      <MainModal
        className="joinnow-modal custom-modal-footer"
        show={joinnow}
        keyModal="joinnow"
        header={<h2 className="h6 m-0 Heading">{lang("COURSES.JOIN_NOW")}</h2>}
        body={
          <Joinnow
            courseDetail={courseDetail}
            updateCourseDetails={updateCourseDetails}
          />
        }
        headerClassName="mb-50 block md-mb-30"
      />
      {/* Course share */}
      <MainModal
        className="manageShare custom-modal-footer"
        show={manageShare}
        keyModal="manageShare"
        header={<h2 className="h6 m-0"> {lang("COMMON.SHARE")}</h2>}
        body={
          <ManageShare courseId={courseDetail.id} manageData={courseDetail} />
        }
        headerClassName="mb-50 block md-mb-30"
        backdrop="static"
      />
      {/* Add to GM */}
      <MainModal
        className="add-to-gmodal modal"
        show={addtoGrowthModel}
        keyModal="addtoGrowthModel"
        body={
          <AddToGMModal
            toggleGMModal={addToGModalToggle}
            data={gmodalData}
            courseId={courseDetail?.id}
            courseBanner={"courseBanner"}
          />
        }
        headerClassName="mb-50 block md-mb-30"
        header={
          <h2 className="h6 mb-0">
            {lang("DASHBOARD.POSTS.POST_FOOTER.ADD_TO_GM")}
          </h2>
        }
      />
    </>
  );
};

export default CourseEnrollPeerDetails;
