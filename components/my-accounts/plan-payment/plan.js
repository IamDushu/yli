import React, { Fragment, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Button, Card } from "react-bootstrap";
import { getMonetisationPlans, toggleModals } from "../../../store/actions";
import { PURCHASE_MODE_RECURRING, SUBSCRIPTION_TYPE_FREE } from "utils";
import { useTranslation } from "react-i18next";
import { Loader } from "components/ui";

import dynamic from "next/dynamic";

const PlanCarousel = dynamic(() => import("./plans-carousel"));
const MainModal = dynamic(() =>
  import("components/modal").then((mod) => mod.MainModal)
);
const MonetisationPlans = dynamic(() =>
  import("components/modal").then((mod) => mod.MonetisationPlans)
);
const NoSufficientCreadit = dynamic(() =>
  import("components/modal").then((mod) => mod.NoSufficientCreadit)
);
/******************** 
  @purpose : Lite/Premium Plans
  @Parameter : {currentSubMenu, handleChange}
  @Author : INIC
  ******************/
const Plan = ({ currentSubMenu, handleChange }) => {
  const dispatch = useDispatch();
  const [lang] = useTranslation("language");
  const [loading, setLoading] = useState(false);
  const [showPlans, setShowPlans] = useState(false);
  const planList = useSelector(
    (state) => state?.user?.monetisationPlanList?.rows
  );
  const entityData = useSelector((state) => state?.user?.userEntityDetails);
  const entityDetails =
    entityData.length && typeof entityData === "string"
      ? JSON.parse(entityData)
      : entityData;

  const { monetisationPlan, monetisationPlanDetails, nosufficientcreadit } =
    useSelector(({ ui }) => ui.modals, shallowEqual);
  /******************** 
  @purpose : Set Plans and Set Subscription Data
  @Parameter : {}
  @Author : INIC
  ******************/
  useEffect(() => {
    getPlans();
  }, []);

  /******************** 
  @purpose : get all plans
  @Parameter : {}
  @Author : INIC
  ******************/
  const getPlans = () => {
    setLoading(true);
    const body = {
      entityId: entityDetails?.id,
    };
    dispatch(getMonetisationPlans(body))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  };
  return (
    <Fragment>
      <li className="listing-box d-sm-flex d-block">
        <div className="pr-md-3 mr-auto">
          <h4 className="text-body-16">
            {lang("MY_ACCOUNTS.ACCOUNT_SETTINGS.PLANS")}
          </h4>
          <p className="text-body-14 font-weight-normal m-0">
            {lang("MY_ACCOUNTS.ACCOUNT_SETTINGS.PLANS_DESCRIPTION")}
          </p>
        </div>

        <div className=" d-flex mt-sm-0 mt-3 align-self-end">
          <Button
            variant={`btn btn-outline-primary ml-sm-3 w-sm-100 mb-sm-0 mb-2`}
            size="sm"
            onClick={() => {
              setShowPlans((previousState) => !previousState);
            }}
            disabled={!planList?.length}
          >
            {!planList?.length && loading
              ? lang("COMMON.LOADING")
              : !planList?.length && !loading
              ? lang("PLANS.NO_PLANS")
              : !showPlans
              ? lang("COMMON.UPDATE")
              : lang("COMMON.CANCEL")}
          </Button>
        </div>
      </li>
      {showPlans && (
        <div className="animated-component acc-plans-slider">
          <PlanCarousel getPlans={getPlans} />
        </div>
      )}
      {/******************* 
      @purpose : Monetisation Plan details
      @Author : INIC
      ******************/}
      <MainModal
        className="preferenceTag custom-modal-footer"
        show={monetisationPlan}
        keyModal="monetisationPlan"
        body={
          <MonetisationPlans
            plan={monetisationPlanDetails}
            handleSuccess={getPlans}
          />
        }
        headerClassName="mb-50 block md-mb-30"
        header={
          <div>
            <h2 className="h6 m-0">{lang("FEATURESPLANS.PLANS")}</h2>
            <p>(1 Euro = 1 Credit)</p>
          </div>
        }
      />

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
    </Fragment>
  );
};
export default Plan;
