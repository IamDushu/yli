import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "@components/layout";
import { Container, Card } from "react-bootstrap";
import { Steps } from "antd";
import WithAuth from "components/with-auth/with-auth";
import { useDispatch } from "react-redux";
import CreateProfileInstituteStep2 from "./create-profile-institute-step2";
import CreateProfileInstituteStep1 from "./create-profile-institute-step1";
import { learningInstituteStepOne, learningInstituteStepTwo } from "utils";
import { getLearningInstituteSectors } from "store/actions/learningInstitute";
import dynamic from "next/dynamic";
const MainModal = dynamic(() =>
  import("components/modal").then((mod) => mod.MainModal)
);
const SuccessModel = dynamic(() =>
  import("components/modal").then((mod) => mod.SuccessModel)
);
const { Step } = Steps;

const CreateProfileInstitute = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(0);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let data = {
      industry: "Education",
    };
    dispatch(getLearningInstituteSectors(data));
  }, []);

  const [data, setData] = useState({
    ...learningInstituteStepOne,
    ...learningInstituteStepTwo,
  });

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: lang("LEARNING_INSTITUTE_FORM.COMPANY_INFORMATION"),
    },
    {
      title: lang("LEARNING_INSTITUTE_FORM.COMPANY_INFORMATION_2"),
    },
  ];

  const _renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <CreateProfileInstituteStep1
            next={next}
            prev={prev}
            current={current}
            setCurrent={setCurrent}
            setData={setData}
            data={data}
          />
        );
      case 1:
        return (
          <CreateProfileInstituteStep2
            next={next}
            prev={prev}
            current={current}
            setCurrent={setCurrent}
            setData={setData}
            data={data}
          />
        );
    }
  };

  return (
    <Layout>
      <div className="inner-wrapper profile-teacher-box">
        <Container className="p-0">
        {/*   <div className="mb-3">
            <h1 className="h5 px-xl-0 px-3">
              {lang("LEARNING_INSTITUTE_FORM.CREATE_YOUR_OWN_LI_PAGE")}
            </h1>
          </div> */}

          <Card>
            <Card.Body className="p-0">
              <div className="border-bottom border-geyser p-4 position-relative d-flex justify-content-lg-between flex-lg-row flex-column flex-lg-wrap">
                <div className="mr-4 pt-sm-0 pt-4">
                  <h5 className=" mb-2">
                    {lang("LEARNING_INSTITUTE_FORM.FILL_YOUR_LI_PAGE")}
                  </h5>
                  <p className="text-body-16 mb-0 font-weight-normal">
                    {lang("LEARNING_INSTITUTE_FORM.JUST_A_FEW_QUESTIONS")}
                  </p>
                </div>
              </div>
              <div className="p-4">
                <Steps current={current}>
                  {steps.map((item) => (
                    <Step key={item.title} title={item.title} />
                  ))}
                </Steps>
                <div className="steps-content mt-4">
                  {_renderStepContent(current)}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>
      {/******************* 
          @purpose : Success modal
          @Author : INIC
          ******************/}
      <MainModal
        className="success-model"
        show={success}
        keyModal="success"
        body={<SuccessModel />}
        headerClassName="mb-50 block md-mb-30"
      />
    </Layout>
  );
};
export default WithAuth(CreateProfileInstitute);
