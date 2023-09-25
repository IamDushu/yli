import React, { Fragment, useEffect, useState } from "react";
import { Card, Accordion } from "react-bootstrap";
import { Link } from "@routes";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { getCookie, getDefaultLanguage } from "utils";
import { cmsListStatus } from "store/actions/aboutUs";

const Corporate = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [lang] = useTranslation("language");
  const [accordion, setAccordion] = useState("1");

  const { cmsStatus } = useSelector((state) => state.aboutUsInfo);

  useEffect(() => {
    let currentLanguage = getCookie("language");
    if (!currentLanguage) currentLanguage = getDefaultLanguage();
    dispatch(cmsListStatus({ cmsType: "user", language: currentLanguage }));
  }, []);

  return (
    <Fragment>
      {/* Recently Added to gm */}
      <Accordion
        activeKey={accordion}
        className="corporate border-bottom border-geyser"
      >
        <Accordion.Toggle
          variant="link"
          eventKey={"1"}
          className="p-20 w-100 d-flex border-0 accordion-heading-box text-secondary"
          onClick={() => setAccordion(accordion === "0" ? "1" : "0")}
        >
          <Card.Title className="h4 font-18 font-600 mb-0 d-flex text-left align-items-center w-100">
            {lang("CMS.CORPORATE")}
          </Card.Title>
          <em
            className={`icon icon-down-arrow ml-auto font-24 ${
              accordion === "1" ? "rotate-top" : ""
            }`}
          ></em>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={"1"}>
          <Card.Body className="pt-0">
            <ul className="listing-section accordions-listing listing-content-between active-inner">
              <li
                className={
                  router.pathname === "/cms/about-us"
                    ? "listing-box active"
                    : "listing-box"
                }
              >
                <Link route="/about-us">
                  <a
                    title="About us"
                    className="d-flex align-items-center w-100"
                  >
                    {lang("CMS.ABOUT_US")}
                  </a>
                </Link>
              </li>
              {cmsStatus?.["General Conditions"] ? (
                <li
                  className={
                    router.pathname === "/cms/term-and-conditions"
                      ? "listing-box active"
                      : "listing-box"
                  }
                >
                  <Link route="/term-and-conditions">
                    <a
                      title="Terms & Conditions"
                      className="d-flex align-items-center w-100"
                    >
                      {lang("CMS.TERM_AND_CONDITIONS")}
                    </a>
                  </Link>
                </li>
              ) : (
                ""
              )}

              {cmsStatus?.["Privacy Policy"] ? (
                <li
                  className={
                    router.pathname === "/cms/privacy-and-policy"
                      ? "listing-box active"
                      : "listing-box"
                  }
                >
                  <Link route="/privacy-policy">
                    <a
                      title="Privacy Policy"
                      className="d-flex align-items-center w-100"
                    >
                      {lang("CMS.PRIVACY_POLICY")}
                    </a>
                  </Link>
                </li>
              ) : (
                ""
              )}

              {cmsStatus?.["Cookies Policy"] ? (
                <li
                  className={
                    router.pathname === "/cms/cookies-policy"
                      ? "listing-box active"
                      : "listing-box"
                  }
                >
                  <Link route="/cookies-policy">
                    <a
                      title="Cookie Policy"
                      className="d-flex align-items-center w-100"
                    >
                      {lang("CMS.COOKIES_POLICY")}
                    </a>
                  </Link>
                </li>
              ) : (
                ""
              )}
              {cmsStatus?.["Investor Relations"] ? (
                <li
                  className={
                    router.pathname === "/cms/investor-relations"
                      ? "listing-box active"
                      : "listing-box"
                  }
                >
                  <Link route="/investor-relations">
                    <a
                      title="Investor Relations"
                      className="d-block text-ellipsis align-items-center w-100"
                    >
                      {lang("CMS.INVESTOR_RELATIONS")}
                    </a>
                  </Link>
                </li>
              ) : (
                ""
              )}

              {cmsStatus?.["Brand Policy"] && (
                <li
                  className={
                    router.pathname === "/cms/brand-policy"
                      ? "listing-box active"
                      : "listing-box"
                  }
                >
                  <Link route="/brand-policy">
                    <a
                      title="Brand Policy"
                      className="d-flex align-items-center w-100"
                    >
                      {lang("CMS.BRAND_POLICY")}
                    </a>
                  </Link>
                </li>
              )}
            </ul>
          </Card.Body>
        </Accordion.Collapse>
      </Accordion>
    </Fragment>
  );
};
export default Corporate;
