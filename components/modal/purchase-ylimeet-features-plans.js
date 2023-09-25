import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleModals,
  purchaseMonetisationFeature,
  purchaseMonetisationPlan,
  getUserInfo,
} from "../../store/actions";
import { showMessageNotification } from "utils";
import { updateInstantMeeting } from "store/actions/yli-meet";
import { useRouter } from "next/router";

export const PurchaseYlimeetFeatureAndPlans = ({ yliMeetData }) => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const router = useRouter();
  const { ylimeetId } = router.query;
  const user = useSelector(({ user }) => user);
  const [price, setPrice] = useState("");
  const entityData = useSelector((state) => state?.user?.userEntityDetails);
  const currentPlanId = useSelector(
    (state) => state?.user?.lastPurchasedPlanDetails?.planId?.id
  );

  const entityDetails =
    entityData.length && typeof entityData === "string"
      ? JSON.parse(entityData)
      : entityData;

  let userData = user?.userInfo || {};
  if (user?.userInfo && typeof user.userInfo === "string")
    userData = JSON.parse(user.userInfo);
  const credits = +userData?.credits;

  useEffect(() => {
    dispatch(getUserInfo());
    if (yliMeetData && yliMeetData?.entityPlanDetails) {
      setPrice(yliMeetData?.entityPlanDetails[0]?.price);
    } else {
      setPrice(yliMeetData?.monthCredits);
    }
  }, []);

  const purchaseYlimeetFeaturesOrPlans = () => {
    if (price < credits) {
      if (yliMeetData && yliMeetData?.individuallySaleable === true) {
        const data = {
          featureId: yliMeetData?.id,
          entityId: entityDetails?.id,
          planId: currentPlanId,
          planValidity: "month",
        };
        dispatch(purchaseMonetisationFeature(data)).then((res) => {
          if(res.message === lang("YLIMEET.INSTANT_YLIMEET.MODEL.ALREADY_PURCHASE_FEATURE")) return;
          const meetData = {
            id: ylimeetId,
            featureId : res?.data?.featureId,
          };
          dispatch(updateInstantMeeting(meetData));
        });
      } else {
        const data = {
          entityId: entityDetails?.id,
          planId: yliMeetData?.id,
          planValidity: "month",
        };
        dispatch(purchaseMonetisationPlan(data));
      }
      dispatch(toggleModals({ purchaseYlimeetFeaturesPlans: false, upgradeplans: false }));
    } else {
      showMessageNotification("Not Suficianit credit");
    }
  };

  return (
    <>
      <Modal.Body>
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
            {yliMeetData?.name || yliMeetData?.subscriptionType + " Plan" || ""}
          </h6>
          <div className="credit-option d-flex align-items-center flex-shrink-0">
            <div className="font-16 font-weight-semibold rounded-8 border border-geyser bg-gary-light gary-light-btn">
              {price} &euro;
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className="custom-footer text-center d-flex border-top border-geyser justify-content-between">
        <Button
          variant="btn btn-dark font-weight-semibold"
          onClick={() =>
            dispatch(toggleModals({ purchaseYlimeetFeaturesPlans: false }))
          }
        >
          {lang("COMMON.CANCEL")}
        </Button>
        <Button
          variant="btn btn-info font-weight-semibold px-30"
          onClick={() => purchaseYlimeetFeaturesOrPlans()}
        >
          {lang("YLIMEET.INSTANT_YLIMEET.PURCHASE")}
        </Button>
      </Modal.Footer>
    </>
  );
};
