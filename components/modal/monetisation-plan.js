import { Button, Col, Modal, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  getMonetisationPlanDetails,
  getPurchasedFeatureList,
  purchaseMonetisationPlan,
  toggleModals,
  unsubscribeMonetisationPlan,
} from "store/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  PURCHASE_MODE_ONETIME,
  PURCHASE_MODE_RECURRING,
  SUBSCRIPTION_TYPE_FREE,
} from "utils";
import { Loader } from "components/ui";
export const MonetisationPlans = ({ plan, handleSuccess = () => {} }) => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();

  const [planValidity, setPlanValidity] = useState("");
  const [loading, setLoading] = useState(false);
  const data = useSelector((state) => state?.user?.monetisationPlanDetails);
  const entityData = useSelector((state) => state?.user?.userEntityDetails);
  const entityDetails =
    entityData.length && typeof entityData === "string"
      ? JSON.parse(entityData)
      : entityData;
  /******************** 
  @purpose : Used for set featurids
  @Parameter : { userInfo }
  @Author : INIC
  ******************/
  useEffect(() => {
    setLoading(true);
    if (plan) {
      const body = {
        entityId: entityDetails?.id,
        planId: plan?.id,
      };
      if (plan?.purchasedChildPlan?.id) {
        body.lastPurchasedPlanId = plan?.purchasedChildPlan?.id;
      }
      dispatch(getMonetisationPlanDetails(body))
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    }
  }, [plan]);
  /******************** 
  @purpose : Used for set featurids
  @Parameter : { userInfo }
  @Author : INIC
  ******************/
  useEffect(() => {
    if (data) {
      if (data?.planModeDetails?.validity)
        setPlanValidity(data?.planModeDetails?.validity);
    }
    if (plan?.planModeDetails?.validity)
      setPlanValidity(plan?.planModeDetails?.validity);
  }, [data]);

  /******************** 
  @purpose : Used for plan purchase
  @Parameter : { userInfo }
  @Author : INIC
  ******************/
  const handlePlanPurchase = () => {
    let body = {
      planId: data?.id,
      planValidity,
      entityId: entityDetails?.id,
    };
    dispatch(purchaseMonetisationPlan(body)).then((res) => {
      if (res.status === 1) {
        if (res?.data?.insufficientCredit) {
          dispatch(toggleModals({ nosufficientcreadit: true }));
        } else {
          dispatch(getPurchasedFeatureList());
          dispatch(toggleModals({ monetisationPlan: false }));
          // dispatch(toggleModals({ preferenceTag: false }));
          dispatch(toggleModals({ purchaseFeaturesPlans: false }));
          handleSuccess();
        }
      }
    });
  };

  /******************** 
  @purpose : Used for plan unsubscribe
  @Parameter : { userInfo }
  @Author : INIC
  ******************/
  const handlePlanUnsubscribe = () => {
    if (
      data?.planModeDetails?.id &&
      data?.planModeDetails?.purchaseMode === PURCHASE_MODE_RECURRING
    ) {
      let body = {
        purchaseMode: "oneTime",
      };
      dispatch(
        unsubscribeMonetisationPlan(data?.planModeDetails?.id, body)
      ).then((res) => {
        if (res.status === 1) {
          handleSuccess();
          dispatch(toggleModals({ monetisationPlan: false }));
        }
      });
    }
  };

  return (
    <Modal.Body>
      <Row>
        {!loading ? (
          <Col lg={12} className="mb-lg-0 mb-5">
            <div className="border border-geyser pb-4 h-100 position-relative">
              <div className="bg-info p-3">
                <h6 className="text-white mb-0 text-center text-capitalize">
                  {data?.subscriptionType}
                </h6>
              </div>
              {data?.subscriptionType !== SUBSCRIPTION_TYPE_FREE &&
                data?.planModeDetails?.purchaseMode !==
                  PURCHASE_MODE_ONETIME && (
                  <div className="bg-gary-light p-3">
                    <div className="d-xl-flex d-lg-block d-flex align-items-center mb-xl-2 mb-lg-3 mb-2 justify-content-between">
                      <label
                        htmlFor="month"
                        className="text-body-14 font-weight-normal"
                      >
                        <input
                          type="radio"
                          name="planValidity"
                          id="month"
                          value="month"
                          autoComplete="off"
                          onChange={(e) => {
                            if (e.target.checked)
                              setPlanValidity(e.target.value);
                          }}
                          checked={planValidity === "month"}
                          disabled={
                            data?.planModeDetails?.id ||
                            parseInt(data?.discountedMonthCredits) < 0
                          }
                        />
                        <span className="text-body-14 mb-xl-0 mb-lg-2 mb-0 mr-2 ml-2">
                          {lang("PLANS.MONTHLY_PACK")}
                        </span>
                      </label>

                      <div
                        className={`text-body-16 border border-geyser  p-2 font-weight-semibold rounded-8  
                    ${planValidity === "month" ? "bg-primary" : "bg-white"}`}
                      >
                        {data?.discountedMonthCredits
                          ? parseFloat(data?.discountedMonthCredits).toFixed(2)
                          : parseFloat(data?.monthCredits).toFixed(2)}{" "}
                        {lang("PLANS.CREDITS")}
                      </div>
                    </div>

                    <div
                      className={
                        "d-xl-flex d-lg-block  d-flex align-items-center"
                      }
                    >
                      <label
                        htmlFor="year"
                        className="text-body-14 font-weight-normal mr-auto"
                      >
                        <input
                          type="radio"
                          name="planValidity"
                          id="year"
                          value="year"
                          autoComplete="off"
                          onChange={(e) => {
                            if (e.target.checked)
                              setPlanValidity(e.target.value);
                          }}
                          checked={planValidity === "year"}
                          disabled={data?.planModeDetails?.id}
                        />
                        <span className="text-body-14 mb-xl-0 mb-lg-2 mb-0 mr-2 ml-2">
                          {lang("PLANS.YEARLY_PACK")}
                        </span>
                      </label>
                      <div
                        className={`text-body-16 border border-geyser p-2 font-weight-semibold rounded-8  bg-white mr-2`}
                      >
                        {data?.discountedYearCredits
                          ? parseFloat(
                              data?.discountedYearCredits / 12
                            ).toFixed(2)
                          : parseFloat(data?.yearCredits / 12).toFixed(2)}{" "}
                        {lang("PLANS.CREDITS")}
                        <span className="text-body-14">
                          / {lang("PLANS.MONTH")}
                        </span>
                      </div>
                      <div
                        className={`text-body-16 border border-geyser p-2 font-weight-semibold rounded-8  ${
                          planValidity === "year" ? "bg-primary" : "bg-white"
                        }`}
                      >
                        {data?.discountedYearCredits
                          ? parseFloat(data?.discountedYearCredits).toFixed(2)
                          : parseFloat(data?.yearCredits).toFixed(2)}{" "}
                        {lang("PLANS.CREDITS")}
                        <span className="text-body-14">
                          / {12} {lang("PLANS.MONTH")}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

              <ul className="list-unstyled listing-section border-none p-3">
                {plan?.purchasedChildPlan?.id && (
                  <li className="listing-box align-items-start text-body-14 py-2 font-weight-bold">
                    <span className="icon-info font-20 mr-2"></span>
                    {lang("PLANS.PREVIOUS_CREDITS")}{" "}
                    {parseFloat(
                      data?.yearCredits - data?.discountedYearCredits
                    ).toFixed(2)}{" "}
                    {lang("PLANS.CREDITS")}
                  </li>
                )}
                <PerfectScrollbar>
                  {data?.derivationPlanDetails?.planDetails?.id && (
                    <li className="listing-box align-items-start text-body-14 py-2 font-weight-normal">
                      <span className="icon-approve font-20 mr-2"></span>
                      {lang("PLANS.INCLUDES_PLAN")}{" "}
                      {
                        data?.derivationPlanDetails?.planDetails
                          ?.subscriptionType
                      }{" "}
                      {lang("PLANS.AND_MORE")}
                    </li>
                  )}
                  {data?.featurePlanDetails?.map((feature, index) => (
                    <li
                      className="listing-box align-items-start text-body-14 py-2 font-weight-normal"
                      key={`feature${index}`}
                    >
                      <span className="icon-approve font-20 mr-2"></span>
                      {feature?.featureDetails?.name}
                    </li>
                  ))}
                </PerfectScrollbar>
              </ul>

              {data?.planModeDetails?.purchaseMode !== PURCHASE_MODE_ONETIME &&
                data?.subscriptionType !== SUBSCRIPTION_TYPE_FREE && (
                  <div className="text-center w-100">
                    {data?.planModeDetails?.purchaseMode ===
                    PURCHASE_MODE_RECURRING ? (
                      <Button
                        variant="info px-30 font-weight-semibold"
                        disabled={!planValidity}
                        onClick={handlePlanUnsubscribe}
                      >
                        {lang("PLANS.UNSUBSCRIBE")}
                      </Button>
                    ) : (
                      <Button
                        variant="info px-30 font-weight-semibold"
                        disabled={
                          !planValidity ||
                          (parseInt(data?.discountedMonthCredits) < 0 &&
                            planValidity === "month")
                        }
                        onClick={handlePlanPurchase}
                      >
                        {lang("PLANS.SUBSCRIBE")}
                      </Button>
                    )}
                  </div>
                )}
            </div>
          </Col>
        ) : (
          <Col lg={12} className="mb-lg-0 mb-5">
            <Loader contentType={"planFeatures"} />
          </Col>
        )}
      </Row>
    </Modal.Body>
  );
};
