import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Card } from "react-bootstrap";
import { Layout } from "@components/layout";
import { Corporate, Faq, WorkWithUs } from "components/sidebar";
import { Link } from "@routes";
import { ADD_QUESTIONS } from "routes/urls";
import FaqDetail from "../../components/Faqs/Faq";

const AboutUs = () => {
  const [lang] = useTranslation("language");
  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  return (
    <Layout>
      <div className="inner-wrapper bg-white faq-box">
        <Container>
          <div className="d-flex flex-xl-nowrap flex-wrap">
            {/* left profile section */}
            <div className="left-profile-section">
              <Card className="rounded-8 overflow-hidden mb-4">
                <Corporate />
                <Faq />
                <WorkWithUs />
              </Card>
            </div>

            <div className="slide-left-section">
              <div className="mb-4">
                <Link route="/">
                  <a title="" className="back-containt">
                    <em className="icon icon-back-arrow-red text-dark font-22 mr-1 v-text-bottom back-icon"></em>
                    <h6 className="font-16 mb-0 text-secondary back-text d-inline-block">
                      {lang("COMMON.BACK")}
                    </h6>
                  </a>
                </Link>
              </div>
              {/* FAQ */}

              <div className="mb-30 mt-md-0 mt-4">
                <h1 className="font-weight-semibold font-30 font-xl-26 font-md-24 mb-0 heading-text">
                  {lang("CMS.FREQUENTLY_ASKED_QUESTION")}
                </h1>
                {/* <Link route={ADD_QUESTIONS}>
                  <Button variant="primary bg-info box-shadow-none border-0 btn-sm py-12 px-4 ml-lg-auto ml-0 mt-lg-0 mt-3">
                    Add Questions
                  </Button>
                </Link> */}
              </div>

              <div className="faq-content-box">
                <div className="">
                  {/*  <h3 className="font-24 font-md-22 font-weight-semibold mb-14">
                    Growth Model:
                  </h3> */}
                  {/*  {faq &&
                    faq.map((faqData) => (
                      <Fragment key={faqData.id}>
                        <h5 className="font-16 mb-14">{faqData.questions}</h5>
                        <p
                          className="text-para"
                          dangerouslySetInnerHTML={{
                            __html: faqData.answers,
                          }}
                        />
                        <hr className="my-14" />
                      </Fragment>
                    ))} */}
                  <FaqDetail />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};
export default AboutUs;
