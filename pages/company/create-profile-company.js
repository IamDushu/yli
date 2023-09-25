import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "@components/layout";
import { Container, Card } from "react-bootstrap";
import { Steps } from "antd";
import WithAuth from "components/with-auth/with-auth";
import { useDispatch, useSelector } from "react-redux";
import CreateProfileCompanyStep2 from "./create-profile-company-step2";
import CreateProfileCompanyStep1 from "./create-profile-company-step1";
import { companyStepOne, companyStepTwo } from "utils";
import { getLearningInstituteSectors } from "store/actions/learningInstitute";
import dynamic from "next/dynamic";
import { selectCompanyDetails } from "store/selectors/user";
import { useRouter } from "next/router";
const MainModal = dynamic(() =>
  import("components/modal").then((mod) => mod.MainModal)
);
const SuccessModel = dynamic(() =>
  import("components/modal").then((mod) => mod.SuccessModel)
);
const { Step } = Steps;

const CreateProfileCompany = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [success, setSuccess] = useState(false);
  let initialData = {
    ...companyStepOne,
    ...companyStepTwo,
  };
  const [data, setData] = useState({ ...initialData });

  const companyDetails = useSelector(selectCompanyDetails);

  useEffect(() => {
    let data = {
      industry: "Education",
      isOnlyIndustries: true,
    };
    dispatch(getLearningInstituteSectors(data));
  }, []);

  useEffect(() => {
    if (companyDetails?.companyDetails?.id) {
      router.push({
        pathname: "/dashboard",
      });
    }
  }, [JSON.stringify(companyDetails)]);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: lang("COMPANY_FORM.COMPANY_DETAILS"),
    },
    {
      title: lang("COMPANY_FORM.COMPANY_INFORMATION_2"),
    },
  ];

  const _renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <CreateProfileCompanyStep1
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
          <CreateProfileCompanyStep2
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
              {lang("COMPANY_FORM.CREATE_YOUR_OWN_COMPANY_PAGE")}
            </h1>
          </div> */}

          <Card>
            <Card.Body className="p-0">
              <div className="border-bottom border-geyser p-4 position-relative d-flex justify-content-lg-between flex-lg-row flex-column flex-lg-wrap">
                <div className="mr-4 pt-sm-0 pt-4">
                  <h5 className=" mb-2">
                    {lang("COMPANY_FORM.FILL_YOUR_CO_PAGE")}
                  </h5>
                  <p className="text-body-14 mb-0 font-weight-normal">
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
                <div className="steps-content create-company mt-4">
                  {_renderStepContent(current)}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>
      {/******************* 
          @purpose : Success modal
          @Author : YLIWAY
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
export default WithAuth(CreateProfileCompany);
