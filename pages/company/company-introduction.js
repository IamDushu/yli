import React, { useState } from "react";
import { Layout } from "@components/layout";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { Link } from "../../routes";
import { CREATE_PROFILE_COMPANY } from "routes/urls";
import { useRouter } from "next/router";
import SlickSlider from "components/Slider/Slider";
import Faq from "components/Faqs/Faq";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { toggleModals, requestStatus } from "store/actions";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";
const MainModal = dynamic(() =>
  import("components/modal").then((mod) => mod.MainModal)
);
const RequestToAdmin = dynamic(() =>
  import("components/modal").then((mod) => mod.RequestToAdmin)
);
const CompanyIntroduction = () => {
  const [lang] = useTranslation("language");
  const { userInfo } = useSelector(({ user }) => user);
  const [applicationApproved, setApplicationApproved] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const { requesttoadmin } = useSelector(({ ui }) => ui.modals, shallowEqual);

  const teacherHandler = async () => {
    router.push(CREATE_PROFILE_COMPANY);
  };

  /*******************
  @purpose : Rander HTML/ React Components
  @Author : YLIWAY
  ******************/
  return (
    <Layout>
      <div className="inner-wrapper teacher-info-box pt-2 pb-0">
        {/* Company section */}

        {/* Intro */}
        <section className="bg-white pt-60">
          <Container>
            <Row className="align-items-end">
              <Col md={8} lg={7} className="pb-60">
                <h1 className="font-weight-bold font-md-36 mb-md-4 mb-2">
                  {lang("PEER_PRODUCER_INTRO.OPEN_YOUR_COMPANY")}
                </h1>
                <h5 className="h4 font-weight-bold mb-md-4 mb-2">
                  {lang("PEER_PRODUCER_INTRO.COMPANY_SUBTITLE")}
                </h5>
                <span className="secondary-purple-divider d-block mb-md-4 mb-2"></span>
                <Button
                  variant="btn btn-secondary-purple mb-3"
                  onClick={() => {
                    if (userInfo === undefined) {
                      dispatch(toggleModals({ login: true }));
                    } else {
                      teacherHandler();
                    }
                  }}
                >
                  {lang("PEER_PRODUCER_INTRO.START_NOW")}
                </Button>
              </Col>
              <Col className="text-md-right text-center">
                <picture className="people-image">
                  <source
                    srcSet={"../assets/images/company/company-intro-image.png"}
                    type="image/png"
                  />
                  <img
                    src={"../assets/images/company/company-intro-image.png"}
                    alt="knowledge sharing people"
                    className="img-fluid"
                  />
                </picture>
              </Col>
            </Row>
          </Container>

        </section>

        {/* How Company Works */}
        <section className="py-60 bg-step-gray">
          <Container>
            <Row>
              <Col md={12} className="text-center">
                <h2 className="font-weight-bold mb-md-4 mb-3">
                  {lang("PEER_PRODUCER_INTRO.COMPANY_PAGE_WORK")}
                </h2>
              </Col>
              <Col md={4} className="text-center d-flex mb-md-0 mb-3">
                <div className="bg-white p-3 d-flex flex-column overflow-hidden">
                  <div className="mb-3">
                    <picture>
                      <source
                        srcSet={
                          "../assets/images/business/identify-knowledge.svg"
                        }
                        type="image/svg"
                      />
                      <img
                        src={
                          "../assets/images/business/identify-knowledge.svg"
                        }
                        alt="yliway"
                        width="60"
                        height="60"
                      />
                    </picture>
                  </div>
                  <h3 className="h5 font-weight-bold mb-2 font-18">
                    {lang("PEER_PRODUCER_INTRO.DISC_COMPANY_TITLE")}
                  </h3>
                  <p className="text-body-14 font-weight-normal mb-0 text-secondary-75">
                    {lang("PEER_PRODUCER_INTRO.DISC_COMPANY_DESC")}
                  </p>
                </div>
              </Col>
              <Col md={4} className="text-center d-flex mb-md-0 mb-3">
                <div className="bg-white p-3 d-flex flex-column rounded-8 overflow-hidden">
                  <div className="mb-3">
                    <picture>
                      <source
                        srcSet={
                          "../assets/images/business/create-training-icon.svg"
                        }
                        type="image/png"
                      />
                      <img
                        src={
                          "../assets/images/business/create-training-icon.svg"
                        }
                        alt="yliway"
                        width="60"
                        height="60"
                      />
                    </picture>
                  </div>
                  <h3 className="h5 font-weight-bold mb-2 font-18">
                    {lang(
                      "PEER_PRODUCER_INTRO.OPEN_COMPANY_PAGE"
                    )}{" "}
                  </h3>
                  <p className="text-body-14 font-weight-normal mb-0 text-secondary-75">
                    {lang("PEER_PRODUCER_INTRO.OPEN_COMPANY_DESC")}
                  </p>
                </div>
              </Col>
              <Col md={4} className="text-center d-flex mb-md-0">
                <div className="bg-white p-3 p-md-10 d-flex flex-column rounded-8 overflow-hidden">
                  <div className="mb-3">
                    <picture>
                      <source
                        srcSet={
                          "../assets/images/business/start-earning.svg"
                        }
                        type="image/png"
                      />
                      <img
                        src={"../assets/images/business/start-earning.svg"}
                        alt="yliway"
                        width="60"
                        height="60"
                      />
                    </picture>
                  </div>
                  <h3 className="h5 font-weight-bold mb-2 font-18">
                    {lang("PEER_PRODUCER_INTRO.BOOST_COMPANY_TITLE")}
                  </h3>
                  <p className="text-body-14 font-weight-normal mb-0 text-secondary-75">
                    {lang("PEER_PRODUCER_INTRO.BOOST_COMPANY_DESC")}
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Company */}
        <section className="py-120 teacher-pattern-bg"
          style={{
            backgroundImage: `url("../../assets/images/business/teacher-pattern-bg.png")`,
          }}
        >
          <Container>
            <Row>
              <Col xl={7} className="text-center text-white mx-auto">
                <h2 className="text-white font-weight-bold font-24">
                  {lang("PEER_PRODUCER_INTRO.THANKS_COMPANY_TITLE")}
                </h2>
                <p className="mb-0 font-18 font-weight-light">{lang("PEER_PRODUCER_INTRO.BEING_A_TEACHER_DESC")}</p>
              </Col>
            </Row>
          </Container>
        </section>

        {/* FAQ */}
        <section className="py-60 bg-secondary-purple">
          <Container>
            <Row className="justify-content-center align-items-center">
              <Col md={6} className="text-center text-md-left mb-3 mb-md-0">
                <h2 className="h4 text-white font-weight-bold mb-2 mb-md-3">
                  {lang("PEER_PRODUCER_INTRO.READY_TO_BECOME_A_YLIWAY_CO")}
                </h2>
                <p className="text-white mb-0">
                  {lang("PEER_PRODUCER_INTRO.GET_IN_TOUCH_CO")}
                </p>
              </Col>
              <Col md={3} className="text-center text-md-left">
                <Button
                  variant="btn btn-white py-12 px-24 text-secondary-purple "
                  onClick={() => {
                    if (userInfo === undefined) {
                      dispatch(toggleModals({ login: true }));
                    } else {
                      teacherHandler();
                    }
                  }}
                >
                  {lang("PEER_PRODUCER_INTRO.START_NOW")}
                </Button>
              </Col>
            </Row>
          </Container>
        </section>
      </div>

      {/*******************
         @purpose : Add To Request To Admin Modal
        @Author : YLIWAY
        ******************/}
      <MainModal
        className="request-to-admin only-body-modal-view"
        show={requesttoadmin}
        keyModal="requesttoadmin"
        body={<RequestToAdmin apply={!applicationApproved} role={"Teacher"} />}
        headerClassName="mb-50 block md-mb-30"
        backdrop="static"
        closeIcon={false}
      />
    </Layout>
  );
};
export default CompanyIntroduction;
