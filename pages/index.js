import React, { useEffect, useState } from "react";
import { Container, Row, Tab, Tabs, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { checkInviteToken } from "store/actions";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { removeCookie, getCookie, showMessageNotification } from "utils";
import { Login } from "components/auth/login";
import { Registration } from "components/auth/registration";
import { LandingPageLayout } from "components/layout/LandingPageLayout";
import CookieConsent from "react-cookie-consent";
import { Link } from "@routes";
import Cookies from "js-cookie";

const Index = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const router = useRouter();
  const { userId } = router.query;
  const inviteToken = router.query.invite;

  const [showCookieBanner, setCookieBanner] = useState(true);

  const consent = getCookie("CookieConsent") ? false : true;
  const [cookieConsent, setCookieConsent] = useState(consent);
  const [tabKey, setTabKey] = useState("login");

  // console.log(cookieConsent, "---cookie consent in index--");

  /******************* 
  @purpose : for define all selectors
  @Author : INIC
  ******************/

  const { userInfo } = useSelector(({ user }) => user);

  /******************* 
  @purpose : for define all effects
  @Author : INIC
  ******************/

  useEffect(() => {
    let x = typeof userInfo === "string" ? JSON.parse(userInfo) : userInfo;
    if (x?.isSignUpDetailsCompleted === true) {
      if (userId) {
        router.push(`/profile/${userId}`);
      } else if (router.query && router.query.from) {
        router.push(`${router.query.from}`);
      } else {
        router.push("/dashboard");
      }
      removeCookie("profileId");
    } else if (
      x?.isSignUpDetailsCompleted === false &&
      x?.isVerified === true
    ) {
      router.push("/account/sign-up", undefined, { shallow: true });
    }
  }, [userInfo]);

  /******************** 
    @purpose : Check token validity
    @Parameter : {}
    @Author : INIC
    ******************/
  useEffect(async () => {
    if (inviteToken) dispatch(checkInviteToken(inviteToken));
    if (router.query && router.query.notificationText) {
      showMessageNotification(router.query.notificationText);
    }
  }, []);

  const handleAccept = () => {
    // here I have set Cookie
    // console.log("Accept");
    Cookies.set("CookieConsent", true, { expires: 365 });

    setCookieConsent(false);
    setCookieBanner(false);
  };

  const handleDecline = () => {
    // console.log("decline");
    // setCookieBanner(false);
    const cookies = Cookies.get();
    Cookies.set("CookieConsent", false, { expires: 365 });
    // const cookies2 = Cookies.get();
    setCookieConsent(true);

    // Object.keys(cookies).forEach((cookieName) => {
    //   Cookies.remove(cookieName);
    // });
    setCookieBanner(false);
  };
  return (
    <LandingPageLayout>
      {/********************
        @purpose : Default page of react application
        @Author : INIC
        ********************/}

      {/* banner section */}
      <section className="section intro-section">
        <Container>
          <Row className="intro-row align-items-center">
            <div className="col-md-6">
              <h1 className="mb-3 text-secondary">
                {lang("INDEX_PAGE.WELCOME")}{" "}
                <span className="text-secondary-purple">
                  {lang("INDEX_PAGE.YLIWAY")}
                </span>
              </h1>
              <p className="font-30 font-md-24 mb-5 mb-md-20 font-weight-bold text-secondary">
                {lang("INDEX_PAGE.BUSINESS_GROWTH_TOOL")}
              </p>
              <p className="font-20 font-md-16 mb-4 font-weight-bold text-secondary">
                {lang("INDEX_PAGE.YLIWAY_TWO_DIRECTIONS")}
              </p>
              <ul className="list-unstyled benefit-list mb-3 mb-md-0">
                <li className="d-flex align-items-center text-secondary">
                  <span className="material-icons mr-2 text-success">
                    trending_up
                  </span>
                  {lang("INDEX_PAGE.PROFESSIONAL_GROWTH")}
                </li>
                <li className="d-flex align-items-center text-secondary">
                  <span className="material-icons mr-2 text-success">
                    trending_up
                  </span>
                  {lang("INDEX_PAGE.BUSINESS_GOALS")}
                </li>
              </ul>
            </div>
            <div className="col-xl-4 offset-xl-2 col-md-6 ">
              {/* tabs */}
              <Card className="auth-tabs">
                <Tabs
                  activeKey={tabKey}
                  onSelect={(k) => {
                    setTabKey(k);
                  }}
                >
                  <Tab eventKey="login" title="Login">
                    {tabKey === "login" && (
                      // <Login cookieConsent={cookieConsent} />
                      <Login />
                    )}
                  </Tab>
                  <Tab eventKey="signup" title="Sign up">
                    {tabKey === "signup" && <Registration />}
                  </Tab>
                </Tabs>
              </Card>
            </div>
          </Row>
        </Container>
      </section>
      {showCookieBanner && (
        <CookieConsent
          // debug={true}
          buttonWrapperClasses="my-button-wrapper"
          buttonStyle={{ display: "none" }}
          style={{
            backgroundColor: "#0f6bbf",
            // display: "flex",
            // alignItems: "flex-start",
            // paddingTop: "1rem",
            // paddingBottom: "1rem",
            // position: "relative",
            // marginBottom: "20px",
          }}
        >
          <Container>
            <div className="d-flex alert-mobile-view">
              <span className="material-icons text-white mr-3 font-28">
                info
              </span>
              <div className="text-white flex-grow-1 alert-mobile-content">
                <p className="font-14 mb-2">
                  {lang("INDEX_PAGE.INFO_CONTENT")}{" "}
                  <Link href="/cookies-policy" className="cursor-pointer">
                    <b className="cursor-pointer">
                      {lang("INDEX_PAGE.COOKIE_POLICY")}
                    </b>
                  </Link>
                  .
                </p>
                <p className="font-14">
                  {lang("INDEX_PAGE.SELECT_INFO_START")}{" "}
                  <b>"{lang("INDEX_PAGE.SELECT_INFO_ACCEPT")}"</b>{" "}
                  {lang("INDEX_PAGE.SELECT_INFO_MIDDLE")}{" "}
                  <b>"{lang("INDEX_PAGE.SELECT_INFO_REJECT")}"</b>{" "}
                  {lang("INDEX_PAGE.SELECT_INFO_END")}
                </p>
                <div className="my-button-wrapper">
                  <button className="btn btn-white mr-3" onClick={handleAccept}>
                    {lang("INDEX_PAGE.SELECT_INFO_ACCEPT")}
                  </button>
                  <button
                    className="btn btn-outline-white"
                    onClick={handleDecline}
                  >
                    {lang("INDEX_PAGE.SELECT_INFO_REJECT")}
                  </button>
                </div>
              </div>
              <span
                className="material-icons text-white ml-3 cursor-pointer"
                onClick={() => setCookieBanner(false)}
              >
                close
              </span>
            </div>
          </Container>
        </CookieConsent>
      )}
    </LandingPageLayout>
  );
};
export default Index;
