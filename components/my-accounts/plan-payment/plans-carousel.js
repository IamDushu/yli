import React, { useEffect, useState } from "react";
import { Button, Card, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getLastPurchasePlanDetails,
  toggleModals,
  unsubscribeMonetisationPlan,
} from "store/actions";
import Swal from "sweetalert2";
import {
  PURCHASE_MODE_ONETIME,
  PURCHASE_MODE_RECURRING,
  brandLogoOnly,
  responsiveSizes,
} from "utils";

const PlanCarousel = ({ getPlans }) => {
  const dispatch = useDispatch();
  const [lang] = useTranslation("language");
  const planList = useSelector(
    (state) => state?.user?.monetisationPlanList?.rows
  );
  const lastPurchasedPlanDetails = useSelector(
    (state) => state.user.lastPurchasedPlanDetails
  );
  const [planData, setPlanData] = useState([]);

  /******************** 
  @purpose : To set planData
  @Parameter : {plan}
  @Author : INIC
  ******************/
  useEffect(() => {
    if (planList?.length) {
      const freePlans = planList.filter((record) => record.monthCredits === 0);
      const purchasedPlans = planList.filter(
        (record) => record.planModeDetails && record.planModeDetails.id
      );
      const otherPLans = planList?.filter(
        (record) => record.monthCredits !== 0 && !record?.planModeDetails?.id
      );

      setPlanData(
        [...freePlans, ...purchasedPlans, ...otherPLans].map((data) => {
          if (!data?.planModeDetails?.id) {
            return {
              ...data,
              planModeDetails: { validity: "year" },
            };
          } else {
            return data;
          }
        })
      );
      dispatch(getLastPurchasePlanDetails());
    }
  }, [planList]);

  /******************** 
  @purpose : To manage the upgrade details
  @Parameter : {planList, lastPurchasedPlanDetails}
  @Author : INIC
  ******************/
  useEffect(() => {
    if (
      planData?.length &&
      lastPurchasedPlanDetails?.allPurchasedPlan?.length
    ) {
      const updatedPlanData = planData.map((plan) => {
        const matchingLastPurchasedPlan =
          lastPurchasedPlanDetails?.allPurchasedPlan?.find(
            (lastPlan) => lastPlan.planCategory === plan.planCategory
          );

        if (matchingLastPurchasedPlan) {
          if (plan.priority < matchingLastPurchasedPlan.priority) {
            return { ...plan, isInferior: true, isSuperior: false };
          } else if (plan.priority > matchingLastPurchasedPlan.priority) {
            return { ...plan, isInferior: false, isSuperior: true };
          }
        }

        return { ...plan, isInferior: false, isSuperior: false };
      });

      setPlanData(updatedPlanData);
    }
  }, [lastPurchasedPlanDetails]);

  /******************** 
  @purpose : Handles year/month switch
  @Parameter : {plan}
  @Author : INIC
  ******************/
  const handlePlanValidity = (validity, index) => {
    const updatedPlan = [...planData];
    updatedPlan[index].planModeDetails = { validity };
    setPlanData(updatedPlan);
  };

  /******************** 
  @purpose : Used for plan unsubscribe
  @Parameter : { userInfo }
  @Author : INIC
  ******************/
  const handlePlanUnsubscribe = (plan) => {
    if (
      plan?.planModeDetails?.id &&
      plan?.planModeDetails?.purchaseMode === PURCHASE_MODE_RECURRING
    ) {
      let body = {
        purchaseMode: "oneTime",
      };
      dispatch(
        unsubscribeMonetisationPlan(plan?.planModeDetails?.id, body)
      ).then((res) => {
        if (res.status === 1) {
          Swal.fire(lang("COMMON.SAVED"), "", "success");
          getPlans();
        }
      });
    }
  };

  /******************** 
  @purpose : Handles plan upgradation
  @Parameter : {plan}
  @Author : INIC
  ******************/
  const handlePlanAction = (plan) => {
    if (plan?.planModeDetails?.purchaseMode === PURCHASE_MODE_RECURRING) {
      Swal.fire({
        title: lang("PLANS.UNSUBSCRIBE_MESSAGE"),
        showCancelButton: true,
        confirmButtonText: lang("COMMON.CONFIRM"),
        cancelButtonText: lang("COMMON.CANCEL"),
      }).then((result) => {
        if (result.isConfirmed) {
          handlePlanUnsubscribe(plan);
        }
      });
    } else if (plan?.monthCredits !== 0) {
      const { priority, planCategory } = plan;
      const purchasedChildPlan =
        lastPurchasedPlanDetails?.allPurchasedPlan?.find(
          (data) =>
            data.planCategory === planCategory && data.priority < priority
        );

      dispatch(
        toggleModals({
          monetisationPlan: true,
          monetisationPlanDetails: { ...plan, purchasedChildPlan },
        })
      );
    }
  };

  return (
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlaySpeed={3000}
      centerMode={false}
      className=""
      containerClass="container-with-dots"
      dotListClass="m-2"
      draggable
      focusOnSelect={false}
      // infinite
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      renderButtonGroupOutside={false}
      renderDotsOutside={true}
      responsive={responsiveSizes}
      showDots={true}
      sliderClass=""
      slidesToSlide={1}
      swipeable
    >
      {planData
        ?.filter((fplan) => {
          if (fplan?.monthCredits < 0 || fplan?.yearCredits < 0) {
            return false;
          }
          return true;
        })
        ?.map((plan, index) => (
          <Card className="border-radius-8 overflow-hidden mx-2 w-100 ">
            <Card.Header className="border-bottom border-geyser">
              <Card.Title className="mb-3 d-flex align-items-center font-weight-bold">
                <img
                  src={brandLogoOnly}
                  alt="log"
                  className="mr-2"
                  width="34"
                />
                {plan?.subscriptionType}
              </Card.Title>
              <p className="font-12 mb-3">{plan?.description}</p>
              {plan?.monthCredits === 0 ? (
                <div className="plan-btn-group mb-3">
                  <Button variant="btn btn-plan">
                    <span className="plan-btn-discount d-block font-weight-bold">
                      {lang("PLANS.RECOMMEND_FRIEND")}
                    </span>
                    <span className="plan-btn-discount d-block font-weight-bold">
                      {lang("PLANS.ITS_FREE")}
                    </span>
                  </Button>
                </div>
              ) : (
                <div className="plan-btn-group mb-3">
                  <Button
                    variant={`btn btn-plan ${
                      plan?.planModeDetails?.validity === "month" && "active"
                    }`}
                    onClick={() => {
                      handlePlanValidity("month", index);
                    }}
                    disabled={plan?.planModeDetails?.id}
                  >
                    <span>{lang("PLANS.PAY_MONTHLY")}</span>
                  </Button>
                  <Button
                    variant={`btn btn-plan ${
                      plan?.planModeDetails?.validity === "year" && "active"
                    }`}
                    onClick={() => {
                      handlePlanValidity("year", index);
                    }}
                    disabled={plan?.planModeDetails?.id}
                  >
                    <span className="d-block font-weight-bold">
                      {lang("PLANS.PAY_UPFRONT")}
                    </span>
                    <span className="plan-btn-discount d-block font-weight-bold">
                      {lang("COMMON.SAVE")}{" "}
                      {`${parseFloat(
                        ((plan?.monthCredits * 12 - plan?.yearCredits) /
                          (plan?.monthCredits * 12)) *
                          100
                      ).toFixed(2)}%`}
                    </span>
                    <span className="plan-btn-small d-block font-weight-normal">
                      {lang("PLANS.COMMIT_ANNUALY")}
                    </span>
                  </Button>
                </div>
              )}
              <p className="text-gray-dark font-12 mb-2">
                {lang("PLANS.START_AT")}
              </p>
              <h5 className="mb-2 font-14">
                <span className="font-28">{plan?.monthCredits}</span>{" "}
                {lang("PLANS.YC_PER_MONTH")}
              </h5>
              <p className="mb-3 text-gray-dark font-14">
                {lang("PLANS.MONTHLY_PACK")}
              </p>
              <Button
                variant="btn btn-light-primary w-100"
                onClick={() => {
                  handlePlanAction(plan);
                }}
                disabled={
                  plan?.planModeDetails?.purchaseMode ===
                    PURCHASE_MODE_ONETIME ||
                  plan?.monthCredits === 0 ||
                  plan?.isInferior
                }
              >
                {plan?.monthCredits === 0
                  ? lang("PLANS.FREE_FOR_YOU")
                  : plan?.planModeDetails?.purchaseMode ===
                    PURCHASE_MODE_RECURRING
                  ? lang("PLANS.UNSUBSCRIBE")
                  : plan?.planModeDetails?.purchaseMode ===
                    PURCHASE_MODE_ONETIME
                  ? lang("PLANS.UNSUBSCRIBED")
                  : lang("PLANS.UPGRADE_NOW")}
              </Button>
            </Card.Header>
            <Card.Body>
              <ul className="list-unstyled mb-0 plan-fea-scroll">
                {plan?.derivationPlanDetails?.planDetails?.id && (
                  <li className="d-flex font-14 text-secondary mb-3">
                    <span className="material-icons mr-2 text-primary font-18">
                      done
                    </span>
                    {lang("PLANS.INCLUDES_PLAN")}{" "}
                    {plan?.derivationPlanDetails?.planDetails?.subscriptionType}{" "}
                    {lang("PLANS.AND_MORE")}
                  </li>
                )}
                {plan?.featurePlanDetails?.map((feature, index) => (
                  <li
                    className="d-flex font-14 text-secondary mb-3"
                    key={index}
                  >
                    <span className="material-icons mr-2 text-primary font-18">
                      done
                    </span>
                    {feature?.featureDetails?.name}
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        ))}
    </Carousel>
  );
};

export default PlanCarousel;
