import React, { useEffect, useState } from "react";
import { Modal, Button, Card, Form } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { toggleModals } from "../../store/actions";
import {
  getMonetisationPlans,
  getLastPurchasePlanDetails,
} from "../../store/actions";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import { getYliMeetPlanFeature } from "store/actions/yli-meet";

const MainModal = dynamic(() =>
  import("components/modal").then((mod) => mod.MainModal)
);
const PurchaseYlimeetFeatureAndPlans = dynamic(() =>
  import("components/modal").then((mod) => {
    return mod.PurchaseYlimeetFeatureAndPlans;
  })
);

export const UpgradePlan = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const entityData = useSelector((state) => state?.user?.userEntityDetails);
  const planList = useSelector(
    (state) => state?.user?.monetisationPlanList?.rows
  );
  const currentPlanId = useSelector(
    (state) => state?.user?.lastPurchasedPlanDetails?.planId?.id
  );
  const { purchaseYlimeetFeaturesPlans } = useSelector(
    ({ ui }) => ui.modals,
    shallowEqual
  );

  const entityDetails =
    entityData.length && typeof entityData === "string"
      ? JSON.parse(entityData)
      : entityData;

  const [chosePlanList, setChosePlanList] = useState(null);
  const [featurePlan, setFeaturePlan] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
      const body = {
        entityId: entityDetails?.id,
      };
      dispatch(getLastPurchasePlanDetails());
      dispatch(getMonetisationPlans(body));
  }, []);

  useEffect(async () => {
    const data = {
      entityId: entityDetails?.id,
      category: "ylimeet",
      module: "Room",
      planId: currentPlanId,
    };
    if (currentPlanId && featurePlan.length === 0) {
      const res = await dispatch(getYliMeetPlanFeature(data));
      res?.rows.map((row) => {
        featurePlan.unshift(row);
      });
      setLoading(true);
    }
  }, [currentPlanId]);

  const style = {
    height: "auto",
    padding: "11px 12px",
    borderRadius: "8px",
    margin: "5px 0 8px 0",
  };

  return (
    <div>
      {loading && (
        <>
          <Modal.Body className="p-3">
            Unlock user
            <div>
              <ul className="list-unstyled mb-0">
                {featurePlan &&
                  featurePlan.map((itm, index) => {
                    return (
                      <li key={itm?.id}>
                        <Card style={style}>
                          <div className="d-flex justify-content-between">
                            <div className="d-flex">
                              <Form.Check
                                style={{ alignSelf: "center" }}
                                type="radio"
                                name="job-radio"
                                value={itm.name}
                                onClick={() => {
                                  setChosePlanList(itm);
                                }}
                                id={`default-radio-1`}
                              />
                              <span className="ml-3 font-14 font-weight-semibold">
                                {itm.name}
                              </span>
                            </div>
                            <div className="d-flex">
                              <span className="text-secondary-purple font-15 font-weight-bold">
                                1 Month
                              </span>
                              <span className="text-dark ml-2 mr-1">|</span>
                              <span
                                className="ml-1 mr-1 text-secondary-purple font-15 font-weight-bold"
                                style={{ width: "50px" }}
                              >
                                {`${itm.entityPlanDetails[0].price} YC`}
                              </span>
                            </div>
                          </div>
                        </Card>
                      </li>
                    );
                  })}
              </ul>
            </div>
            Choose Plan
            <div className="d-flex" style={{ flexWrap: "wrap" }}>
              {planList &&
                planList.map((itm, index) => {
                  return (
                    <div key={itm?.id} style={{ marginTop: "10px" }}>
                      <Card
                        className="mr-3 ml-3"
                        style={{
                          padding: "8px 8px",
                          borderRadius: "8px",
                        }}
                      >
                        <div className="d-flex">
                          <Form.Check
                            type="radio"
                            name="job-radio"
                            value={itm.subscriptionType}
                            onClick={() => {
                              setChosePlanList(itm);
                            }}
                            id={`default-radio-1`}
                          />
                          <span className="font-14 font-weight-bold">
                            {itm.subscriptionType}
                          </span>
                        </div>
                      </Card>
                    </div>
                  );
                })}
            </div>
          </Modal.Body>

          <Modal.Footer className="custom-footer text-center d-flex border-top border-geyser justify-content-between">
            <Button
              variant="btn btn-dark font-weight-semibold"
              onClick={() => dispatch(toggleModals({ upgradeplans: false }))}
            >
              {lang("COMMON.CANCEL")}
            </Button>
            <Button
              variant="btn btn-info font-weight-semibold px-30"
              onClick={() => {
                chosePlanList &&
                  dispatch(
                    toggleModals({ purchaseYlimeetFeaturesPlans: true })
                  );
              }}
            >
              {lang("YLIMEET.INSTANT_YLIMEET.PURCHASE")}
            </Button>
          </Modal.Footer>

          <MainModal
            className="ylimeetplan custom-modal-footer"
            show={purchaseYlimeetFeaturesPlans}
            keyModal="purchaseYlimeetFeaturesPlans"
            centered
            body={
              <PurchaseYlimeetFeatureAndPlans yliMeetData={chosePlanList} />
            }
            headerClassName="mb-50 block md-mb-30"
            header={
              <div>
                <h2 className="h6 m-0">YLIMEET</h2>
              </div>
            }
          />
        </>
      )}
    </div>
  );
};
