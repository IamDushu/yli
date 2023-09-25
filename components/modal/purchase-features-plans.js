import { Button, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  getLastPurchasePlanDetails,
  getMonetisationFeatures,
  getMonetisationPlans,
  getPurchasedFeatureList,
  purchaseMonetisationFeature,
  toggleModals,
} from "store/actions";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { Loader } from "./../../components/ui";
import _ from "lodash";

export const PurchaseFeatureAndPlans = ({
  userInfo,
  category,
  handleSuccess = () => {},
}) => {
  const [lang] = useTranslation("language");
  const { accountType, type } = userInfo;
  const dispatch = useDispatch();
  const [feature, setfeature] = useState(null);
  const [featureLoading, setfeatureLoading] = useState(false);
  const [planLoading, setPlanLoading] = useState(false);

  const featureList = useSelector(
    (state) => state?.user?.monetisationFeatureList?.rows
  );
  const planList = useSelector(
    (state) => state?.user?.monetisationPlanList?.rows
  );
  const entityData = useSelector((state) => state?.user?.userEntityDetails);
  const entityDetails =
    entityData.length && typeof entityData === "string"
      ? JSON.parse(entityData)
      : entityData;
  const lastPurchasedPlanDetails = useSelector(
    (state) => state.user.lastPurchasedPlanDetails
  );

  /******************** 
  @purpose : Used for get monetisation features list
  @Parameter : { userInfo }
  @Author : INIC
  ******************/
  useEffect(() => {
    dispatch(getLastPurchasePlanDetails());
  }, []);

  /******************** 
  @purpose : Used for get monetisation features list
  @Parameter : { userInfo }
  @Author : INIC
  ******************/
  useEffect(() => {
    if (lastPurchasedPlanDetails?.planId?.id) {
      setfeatureLoading(true);
      setPlanLoading(true);
      try {
        const body = {
          category,
          entityId: entityDetails?.id,
        };
        if (lastPurchasedPlanDetails?.planId?.id) {
          body.planId = lastPurchasedPlanDetails?.planId?.id;
        }
        dispatch(getMonetisationFeatures(body)).then(() => {
          setfeatureLoading(false);
        });
        dispatch(getMonetisationPlans(body)).then(() => {
          setPlanLoading(false);
        });
      } catch (error) {
        setfeatureLoading(false);
        setPlanLoading(false);
        throw error;
      }
    }
  }, [lastPurchasedPlanDetails]);

  /******************** 
  @purpose : Used for feature radio actions
  @Parameter : { e, feature }
  @Author : INIC
  ******************/
  const handleFeatureRadio = (e, feature) => {
    const { checked } = e.target;
    if (checked) {
      setfeature(feature);
    }
  };

  /******************** 
  @purpose : Used for make a purchase
  @Parameter : { }
  @Author : INIC
  ******************/
  const handlePurchase = () => {
    if (feature?.id) {
      let body = {
        featureId: feature?.id,
        entityId: feature?.priceDetails?.entityPriceAssociationId,
      };
      dispatch(purchaseMonetisationFeature(body)).then((res) => {
        if (res.status === 1) {
          if (res?.data?.insufficientCredit) {
            dispatch(toggleModals({ nosufficientcreadit: true }));
          } else {
            dispatch(getPurchasedFeatureList(category));
            dispatch(toggleModals({ purchaseFeaturesPlans: false }));
            dispatch(toggleModals({ preferenceTag: false }));
            handleSuccess();
          }
        }
      });
    }
  };

  return (
    <Modal.Body className="p-4">
      {!planList?.length &&
        !featureList?.length &&
        !featureLoading &&
        !planLoading && (
          <h5 className=" mb-2 font-weight-normal text-center">
            {lang("FEATURESPLANS.NOFEATURESPLAN")}
          </h5>
        )}
      <Form>
        {featureLoading && !featureList?.length ? (
          <Loader contentType={"planFeatures"} />
        ) : (
          featureList?.length > 0 && (
            <React.Fragment>
              <p className="mb-2">{lang("FEATURESPLANS.INDIVIDUALFEATURES")}</p>
              {featureList?.map((data, index) => (
                <div
                  className={`custom-radio custom-radio-outline mb-3 border p-2 ${
                    data?.id === feature?.id
                      ? "border-primary"
                      : "border-geyser"
                  }`}
                  key={`feature-${index + 1}`}
                >
                  <div className="row">
                    <div className="col-md-10">
                      <label
                        htmlFor={`feature-${index + 1}`}
                        className="text-body-14 mb-1 font-weight-normal"
                      >
                        <input
                          type="radio"
                          id={`feature-${index + 1}`}
                          autoComplete="off"
                          value={data?.id}
                          name="individualfeatures"
                          onChange={(e) => handleFeatureRadio(e, data)}
                        />
                        <span></span>
                        {data?.name}
                      </label>
                    </div>
                    <div className="col-md-2">
                      <span className="text-secondary-purple">
                        {data?.priceDetails?.price} {lang("PLANS.CREDITS")}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )
        )}

        {planLoading && !planList?.length ? (
          <Loader contentType={"planFeatures"} />
        ) : (
          planList?.length > 0 && (
            <React.Fragment>
              <p className="mb-2">{lang("FEATURESPLANS.PLANS")}</p>
              <div className="custom-radio custom-radio-outline mb-3 p-2">
                {planList?.map((plan, index) => (
                  <div className="row border border-geyser p-2">
                    <div className="col-md-10 ml-0">
                      <label
                        htmlFor={`plan${index}`}
                        className="text-body-14 mb-1 font-weight-normal"
                        key={`plan-${index}`}
                      >
                        {/* <input
                          type="radio"
                          id={`plan${index}`}
                          autoComplete="off"
                          value={plan?.id}
                          name="plan"
                        />
                        <span></span> */}
                        {plan?.subscriptionType}
                      </label>
                    </div>
                    <div className="col-md-2 float-right">
                      <span
                        className="text-secondary-purple pointer"
                        onClick={() =>
                          dispatch(
                            toggleModals({
                              monetisationPlan: true,
                              monetisationPlanDetails: plan,
                            })
                          )
                        }
                      >
                        {lang("COMMON.VIEW")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </React.Fragment>
          )
        )}

        <div className="custom-footer d-md-flex justify-content-between">
          <Button
            variant="btn btn-dark font-weight-semibold mb-3 mb-md-0"
            onClick={() => {
              dispatch(toggleModals({ purchaseFeaturesPlans: false }));
            }}
          >
            {lang("COMMON.CANCEL")}
          </Button>

          <div className="d-flex justify-content-between">
            {feature && (
              <Button
                variant="btn btn-info font-weight-semibold"
                onClick={handlePurchase}
              >
                {lang("PLANS.SUBSCRIBE")}
              </Button>
            )}
          </div>
        </div>
      </Form>
    </Modal.Body>
  );
};

// export default PurchaseFeatureAndPlans;
