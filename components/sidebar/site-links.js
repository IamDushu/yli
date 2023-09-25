import React from "react";
import { Link } from "@routes";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import moment from "moment";
import {
  ABOUT_US,
  BRAND_POLICY,
  COOKIES_POLICY,
  INVESTOR_RELATIONS,
  PRIVACY_POLICY,
  TERM_AND_CONDITIONS,
} from "routes/urls";

function SiteLinks() {
  const [lang] = useTranslation("language");
  const year = moment().format("YYYY");

  return (
    <div className="section-footer footer-sticky-fix">
      <Container className="px-0">
        <div className="footer-text">
          <ul className="d-flex align-items-center justify-content-start mb-0 pl-0">
            <li>
              <Link route={ABOUT_US} title={lang("SIDE_BAR.ABOUT")}>
                {lang("SIDE_BAR.ABOUT")}
              </Link>
              <span className="mx-2 font-12">|</span>
            </li>
            <li>
              <Link
                route={TERM_AND_CONDITIONS}
                title={lang("SIDE_BAR.LICENSE_AGREEMENT")}
              >
                {lang("SIDE_BAR.LICENSE_AGREEMENT")}
              </Link>
              <span className="mx-2 font-12">|</span>
            </li>
            <li>
              <Link
                route={PRIVACY_POLICY}
                title={lang("SIDE_BAR.PRIVACY_POLICY")}
              >
                {lang("SIDE_BAR.PRIVACY_POLICY")}
              </Link>
              <span className="mx-2 font-12">|</span>
            </li>
            <li>
              <Link
                route={COOKIES_POLICY}
                title={lang("SIDE_BAR.COOKIES_POLICY")}
              >
                {lang("SIDE_BAR.COOKIES_POLICY")}
              </Link>
              <span className="mx-2 font-12">|</span>
            </li>
            <li>
              <Link
                route={INVESTOR_RELATIONS}
                title={lang("SIDE_BAR.INVESTOR_RELATIONS")}
              >
                {lang("SIDE_BAR.INVESTOR_RELATIONS")}
              </Link>
              <span className="mx-2 font-12">|</span>
            </li>
            <li>
              <Link route={BRAND_POLICY} title={lang("SIDE_BAR.BRAND_POLICY")}>
                {lang("SIDE_BAR.BRAND_POLICY")}
              </Link>
              <span className="mx-2 font-12">|</span>
            </li>
            {/*    <li>
              <Link
                route={ABOUT_US}
                title={lang("SIDE_BAR.HOW_TO_UNSUBSCRIBE")}
              >
                {lang("SIDE_BAR.HOW_TO_UNSUBSCRIBE")}
              </Link>
              <span className="mx-2 font-12">|</span>
            </li> */}
            <li className="d-flex align-items-center mt-1">
              <p className="copyright-text mb-0 font-12 text-gray">
                {lang("SIDE_BAR.YLIWAY")} {year}
              </p>
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
}

export default SiteLinks;
