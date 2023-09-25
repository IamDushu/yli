import React, { Fragment } from "react";
import { Card, Button } from "react-bootstrap";
import { toggleModals } from "../../../store/actions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import { selectUserInfo } from "store/selectors/user";
import { CATEGORY } from "utils";
const MainModal = dynamic(() =>
  import("components/modal").then((mod) => mod.MainModal)
);
const AddPreferenceTags = dynamic(() => import("components/modal/add-tag"));
const PurchaseFeatureAndPlans = dynamic(() =>
  import("components/modal").then((mod) => {
    return mod.PurchaseFeatureAndPlans;
  })
);
const NoSufficientCreadit = dynamic(() =>
  import("components/modal").then((mod) => mod.NoSufficientCreadit)
);
const MonetisationPlans = dynamic(() =>
  import("components/modal").then((mod) => mod.MonetisationPlans)
);
/******************** 
  @purpose : Set Preferences 
  @Parameter : {}
  @Author : INIC
  ******************/
const Preference = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const {
    preferenceTag,
    purchaseFeaturesPlans,
    nosufficientcreadit,
    monetisationPlan,
    monetisationPlanDetails,
  } = useSelector(({ ui }) => ui.modals, shallowEqual);
  const userInfo = useSelector(selectUserInfo);
  return (
    <Fragment>
      <Card className="mb-10">
        <Card.Body className="d-sm-flex align-items-center justify-content-between">
          <div className="pr-md-3">
            <h4 className="text-body-16">
              {lang("MY_ACCOUNTS.ACCOUNT_SETTINGS.PREFERENCES")}
            </h4>
            <p className="text-body-14 font-weight-normal m-0">
              {lang("MY_ACCOUNTS.ACCOUNT_SETTINGS.PREFERENCES_DESCRIPTION")}
            </p>
          </div>
          <div className="mt-sm-0 mt-3">
            <Button
              variant="outline-info ml-sm-3 w-sm-100"
              size="sm"
              onClick={() => dispatch(toggleModals({ preferenceTag: true }))}
            >
              {lang("MY_ACCOUNTS.COMMON.ADD_TAGS")}
            </Button>
          </div>
        </Card.Body>
      </Card>
      {/******************* 
           @purpose : Links for My accounts Modal
           @Author : INIC
           ******************/}
      <MainModal
        className="preferenceTag custom-modal-footer"
        show={preferenceTag}
        keyModal="preferenceTag"
        centered
        body={<AddPreferenceTags userInfo={userInfo} />}
        headerClassName="mb-50 block md-mb-30"
        header={
          <div>
            <h2 className="h6 m-0">{lang("MY_ACCOUNTS.COMMON.ADD_TAGS")}</h2>
          </div>
        }
      />
      <MainModal
        className="preferenceTag custom-modal-footer"
        show={purchaseFeaturesPlans}
        keyModal="purchaseFeaturesPlans"
        centered
        body={
          <PurchaseFeatureAndPlans
            userInfo={userInfo}
            category={CATEGORY.HASHTAGS}
          />
        }
        headerClassName="mb-50 block md-mb-30"
        header={
          <div>
            <h2 className="h6 m-0">
              {lang("FEATURESPLANS.PREFERENCESTAG")} {lang("COMMON.PLANS")}
            </h2>
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

      {/******************* 
      @purpose : Monetisation Plan details
      @Author : INIC
      ******************/}
      <MainModal
        className="preferenceTag custom-modal-footer"
        show={monetisationPlan}
        keyModal="monetisationPlan"
        body={<MonetisationPlans plan={monetisationPlanDetails} />}
        headerClassName="mb-50 block md-mb-30"
        header={
          <div>
            <h2 className="h6 m-0">
              {lang("FEATURESPLANS.PREFERENCESTAG")} {lang("COMMON.PLANS")}
            </h2>
          </div>
        }
      />
    </Fragment>
  );
};
export default Preference;
