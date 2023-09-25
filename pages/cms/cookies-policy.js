import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Container, Card } from "react-bootstrap";
import { Layout } from "@components/layout";
import { Corporate, Faq, WorkWithUs } from "components/sidebar";
import { Link } from "@routes";
import { useDispatch, useSelector } from "react-redux";
import { getCookiesInfo } from "store/actions";
import { getCookie, getDefaultLanguage } from "utils";

const CookiesPolicy = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();

  /******************* 
  @purpose : for define all effects
  @Author : INIC
  ******************/

  useEffect(() => {
     let currentLanguage = getCookie("language");
     if (!currentLanguage)
      currentLanguage = getDefaultLanguage();
    dispatch(getCookiesInfo(currentLanguage));
  }, []);

  /******************* 
  @purpose : for define all selectors
  @Author : INIC
  ******************/

  const { cookiesInfo } = useSelector(({ cookiesPolicy }) => cookiesPolicy);

  function createMarkup() {
    if (cookiesInfo.content) {
      return {
        __html: cookiesInfo.content,
      };
    }
  }

  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  return (
    <Layout>
      <div className="inner-wrapper bg-white cookies-box">
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
              {/* <div className="mb-4">
                <Link route="/">
                  <a title="" className="back-containt">
                    <em className="icon icon-back-arrow-red text-dark font-22 mr-1 v-text-bottom back-icon"></em>
                    <h6 className="font-16 mb-0 text-secondary back-text d-inline-block">
                      {lang("COMMON.BACK")}
                    </h6>
                  </a>
                </Link>
              </div> */}
              {/* FAQ */}

              <div className="d-flex flex-lg-nowrap flex-wrap align-items-center mb-30 mt-md-0 mt-4">
                <h1 className="font-weight-semibold font-30 d-flex heading-text mb-0">
                  {lang("CMS.COOKIES_POLICY")}
                </h1>
              </div>

              <div className="policy-content-box">
                <div dangerouslySetInnerHTML={createMarkup()} />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};
export default CookiesPolicy;
