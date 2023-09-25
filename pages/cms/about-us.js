import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Container, Card } from "react-bootstrap";
import { Layout } from "@components/layout";
import { Corporate, Faq, WorkWithUs } from "components/sidebar";
import { Link } from "@routes";
import { useDispatch, useSelector } from "react-redux";
import { aboutUsInfo } from "store/actions/aboutUs";
import { getCookie, getDefaultLanguage } from "utils";
/******************** 
  @purpose :  About Us
  @Parameter : {}
  @Author : INIC
  ******************/
const AboutUs = () => {
  const [lang] = useTranslation("language");
  const { aboutUs } = useSelector((state) => state.aboutUsInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    let currentLanguage = getCookie("language");
    if (!currentLanguage)
      currentLanguage = getDefaultLanguage();
    dispatch(aboutUsInfo({
      cmsType:"user",
      language:currentLanguage
    }));
  }, []);
  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  return (
    <Layout>
      <div className="inner-wrapper bg-white about-box">
        <Container>
          <div className="d-flex flex-xl-nowrap flex-wrap">
            {/* left profile section */}
            <div className="left-profile-section">
              <Card className="rounded-8 overflow-hidden mb-4">
                <Corporate />
                {/* <Faq /> */}
                <WorkWithUs />
              </Card>
            </div>

            <div className="slide-left-section">
              {/* <div className="mb-4">
                <Link route="/">
                  <a title="" className="back-containt">
                    <em className="icon icon-back-arrow-red text-dark font-22 v-text-bottom mr-1 back-icon"></em>
                    <h6 className="font-16 mb-0 text-secondary back-text d-inline-block">
                      Back
                    </h6>
                  </a>
                </Link>
              </div> */}
              {/* About us */}
              <div className="mb-30 mt-md-0 mt-4">
                <h1 className="font-weight-semibold font-30 d-flex mb-0 heading-text">
                  About us
                </h1>
              </div>
              <div className="text-center">
                <div className="mb-sm-5 mb-4">
                  <picture>
                    <source
                      srcSet="../assets/images/brand-logo.svg"
                      type="image/svg"
                    />
                    <img
                      src="../assets/images/brand-logo.svg"
                      alt="RTF YLIWAY"
                      width="184"
                      height="35"
                    />
                  </picture>
                </div>
                <h3 className="font-26 font-sm-18 yliway-about font-medium">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: aboutUs?.overview,
                    }}
                  />
                </h3>
                <h2 className="font-28 font-sm-22 inner-heading">
                  Brand Mantra
                </h2>
                <p
                  className="text-blue-grey font-sm-14 font-18 lh-font-18-34"
                  dangerouslySetInnerHTML={{
                    __html: aboutUs?.brandMantra,
                  }}
                />

                <div className="seprator-h-5"></div>
                <h2 className="font-28 font-sm-22 inner-heading">
                  YLIWAY Mission
                </h2>
                <p
                  className="text-blue-grey font-sm-14 font-18 lh-font-18-34"
                  dangerouslySetInnerHTML={{
                    __html: aboutUs?.yliwayMission,
                  }}
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};
export default AboutUs;
