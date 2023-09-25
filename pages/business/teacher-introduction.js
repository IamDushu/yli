import React, { useState } from "react";
import { Layout } from "@components/layout";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { Link } from "../../routes";
import { CREATE_PROFILE_TEACHER } from "routes/urls";
import { useRouter } from "next/router";
import SlickSlider from "components/Slider/Slider";
import Faq from "components/Faqs/Faq";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { toggleModals, requestStatus } from "store/actions";
import { selectUserInfo } from "store/selectors/user";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";
const MainModal = dynamic(() =>
  import("components/modal").then((mod) => mod.MainModal)
);
const RequestToAdmin = dynamic(() =>
  import("components/modal").then((mod) => mod.RequestToAdmin)
);
const TeacherIntroduction = () => {
  const userInfo = useSelector(selectUserInfo);
  const userInfodetail = useSelector(({ user }) => user);
  const [applicationApproved, setApplicationApproved] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [lang] = useTranslation("language");
  const { requesttoadmin } = useSelector(({ ui }) => ui.modals, shallowEqual);

  let userRole = userInfodetail?.userInfo || {};
  if (userInfodetail?.userInfo && typeof userInfodetail.userInfo === "string")
    userRole = JSON.parse(userInfodetail.userInfo);

  const teacherHandler = async () => {
    const response = await requestStatus({ requestFor: "Teacher" });
    if (!response) {
      router.push(CREATE_PROFILE_TEACHER);
    } else {
      setApplicationApproved(response);
      dispatch(toggleModals({ requesttoadmin: true }));
    }
  };
  /*******************
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  return (
    <Layout>
      <div className="inner-wrapper teacher-info-box pt-2 pb-0">
        {/* Teachers section */}

        {/* Intro */}
        <section className="bg-white pt-60">
          <Container>
            <Row className="align-items-end">
              <Col md={8} lg={6} className="pb-60">
                <h1 className="font-weight-bold font-md-36 mb-md-4 mb-2">
                  {lang("PEER_PRODUCER_INTRO.HELP_OTHERS_BY_SHARING")}
                </h1>
                <h5 className="h4 font-weight-bold mb-md-4 mb-2">
                  {lang("PEER_PRODUCER_INTRO.BEING_A_TEACHER")}
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
                    srcSet={"../assets/images/business/teacher-intro-image.png"}
                    type="image/png"
                  />
                  <img
                    src={"../assets/images/business/teacher-intro-image.png"}
                    alt="knowledge sharing people"
                    className="img-fluid"
                  />
                </picture>
              </Col>
            </Row>
          </Container>

        </section>

        {/* How Teaching Works */}
        <section className="py-60 bg-step-gray">
          <Container>
            <Row>
              <Col md={12} className="text-center">
                <h2 className="font-weight-bold mb-md-4 mb-3">
                  {lang("PEER_PRODUCER_INTRO.HOW_TEACHING_WORKS")}
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
                    {lang("PEER_PRODUCER_INTRO.DISCOVER_LOGIC_TITLE")}
                  </h3>
                  <p className="text-body-14 font-weight-normal mb-0 text-secondary-75">
                    {lang("PEER_PRODUCER_INTRO.DISCOVER_LOGIC_DESC")}
                  </p>
                  <Button
                    variant="btn btn-outline-info font-weight-semibold btn-sm py-12 m-0-auto"
                    className="d-none"
                    onClick={() => {
                      if (userInfo === undefined) {
                        dispatch(toggleModals({ login: true }));
                      } else {
                        teacherHandler();
                      }
                    }}
                  >
                    {lang("PEER_PRODUCER_INTRO.LEARN_MORE")}
                  </Button>
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
                      "PEER_PRODUCER_INTRO.CREATE_YOU_TRAINING_PROGRAM"
                    )}{" "}
                  </h3>
                  <p className="text-body-14 font-weight-normal mb-0 text-secondary-75">
                    {lang("PEER_PRODUCER_INTRO.TRAINING_PROGRAM_DESC")}
                  </p>
                  <Button
                    variant="btn btn-outline-info font-weight-semibold btn-sm py-12 m-0-auto"
                    className="d-none"
                    onClick={() => {
                      if (userInfo === undefined) {
                        dispatch(toggleModals({ login: true }));
                      } else {
                        teacherHandler();
                      }
                    }}
                  >
                    {lang("PEER_PRODUCER_INTRO.LEARN_MORE")}
                  </Button>
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
                    {lang("PEER_PRODUCER_INTRO.START_EARNING")}
                  </h3>
                  <p className="text-body-14 font-weight-normal mb-0 text-secondary-75">
                    {lang("PEER_PRODUCER_INTRO.START_EARNING_DESC")}
                  </p>
                  <Button
                    variant="btn btn-outline-info font-weight-semibold btn-sm py-12 m-0-auto"
                    className="d-none"
                    onClick={() => {
                      if (userInfo === undefined) {
                        dispatch(toggleModals({ login: true }));
                      } else {
                        teacherHandler();
                      }
                    }}
                  >
                    {lang("PEER_PRODUCER_INTRO.LEARN_MORE")}
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Teaching */}
        <section className="py-120 teacher-pattern-bg"
          style={{
            backgroundImage: `url("../../assets/images/business/teacher-pattern-bg.png")`,
          }}
        >
          <Container>
            <Row>
              <Col xl={8} className="text-center text-white mx-auto">
                <h2 className="text-white font-weight-bold font-24">
                  {lang("PEER_PRODUCER_INTRO.BEING_PATTERN_BG_TITLE")}
                </h2>
                <p className="mb-0 font-18 font-weight-light">{lang("PEER_PRODUCER_INTRO.BEING_A_TEACHER_DESC")}</p>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Testimonial */}
        <section className="testimonials mb-3 d-none">
          <Card>
            <Card.Body className="w-100">
              <div className="section-box">
                <Container className="px-sm-3 px-1">
                  <h2 className="h4 text-center pb-4 mb-0">
                    {lang(
                      "PEER_PRODUCER_INTRO.TESTIMONIAL_FROM_OUR_TEACHERS"
                    )}{" "}
                  </h2>
                  <SlickSlider role="Teacher" />
                </Container>
              </div>
            </Card.Body>
          </Card>
        </section>

        {/* FAQ */}
        <section className="py-60 bg-secondary-purple">
          <Container>
            <Row className="justify-content-center align-items-center">
              <Col md={6} className="text-center text-md-left mb-3 mb-md-0">
                <h2 className="h4 text-white font-weight-bold mb-2 mb-md-3">
                  {lang("PEER_PRODUCER_INTRO.READY_TO_START_TEACHING")}
                </h2>
                <p className="text-white mb-0">
                  {lang("PEER_PRODUCER_INTRO.CREATE_YOUR_COURSE")} {lang("PEER_PRODUCER_INTRO.SHARE_YOUR_SKILLS")}
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
  @Author : INIC
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
export default TeacherIntroduction;
