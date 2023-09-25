import React, { useEffect, useState } from "react";
import { Layout } from "@components/layout";
import { Container } from "react-bootstrap";
import GrowthModelStepsLayout from "components/growth-model/Step/steps-layout";
import { useDispatch, useSelector } from "react-redux";
import { getGrowthModel, setGrowthProject } from "store/actions/growth";
import WithAuth from "components/with-auth/with-auth";
import { GrowthModal } from "components/sidebar";
import { MyProfile } from "components/sidebar";
import Department from 'components/growth-model/Step/Department';

const GrowthModel = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const dispatch = useDispatch();
  const { growthProject, growthModelDetail } = useSelector(({ growth }) => growth);
  const [showDepartment, setShowDepartment] = useState(false)

  useEffect(() => {
    dispatch(getGrowthModel());
  }, []);

  useEffect(() => {
    if (!growthModelDetail || !(growthModelDetail?.length > 1)) {
      dispatch(setGrowthProject("", ""));
    }
  }, [growthModelDetail]);

  useEffect(() => {
    if (growthProject?.step !== "" || growthProject?.step > 0) {
      if (growthProject?.step > 3) {
        setCurrentStep(2);
      } else {
        setCurrentStep(growthProject?.step - 1);
      }
    } else {
      setCurrentStep(0);
    }
  }, [growthProject]);

  return (
    <Layout>
      <div className="inner-wrapper create-growth-model">
        <Container>
          <div className="d-flex flex-md-nowrap flex-wrap inner-right-full-orsidebar">
            <div className="profile-left-bar d-xl-block d-none">
              <MyProfile />
              <GrowthModal />
            </div>
            <div className="profile-right-bar">
              {showDepartment ? (
                <Department setShowDepartment={setShowDepartment} />
              ) : (
                currentStep >= 0 && currentStep < 3 && (
                  <GrowthModelStepsLayout pagevalue={currentStep} setShowDepartment={setShowDepartment} />
                )
              )}

            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default WithAuth(GrowthModel);