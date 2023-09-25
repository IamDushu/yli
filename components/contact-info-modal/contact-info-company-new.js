import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "routes";
import { APP_URL, PUBLIC_PROFILE_URL } from "config";

export default function CompanyContactInfo({ ...props }) {
  const [lang] = useTranslation("language");
  const { companyData } = useSelector((state) => state.company);

  return (
    <>
      <div className="card-md">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-center">
            <h6> {lang("USER_PROFILE_SUMMARY.TEXT.CONTACT_INFO")}</h6>
          </div>
          <ul className="list-unstyled profile-contact-info m-0">
            <Row>
              <Col lg={12} key={"item.item.id"}>
                <li className="mb-3">
                  <img
                    className="bx"
                    src="/assets/images/favicon.ico"
                    width="20"
                    height="20"
                  />
                  {lang("USER_PROFILE_SUMMARY.TEXT.CONTACT_INFO_YOUR_PROFILE")}
                  {companyData.id && APP_URL && PUBLIC_PROFILE_URL ? (
                    <Link
                      className="text-primary"
                      route={`${APP_URL}/profile/company-profile?companyId=${companyData.id}`}
                    >{`${PUBLIC_PROFILE_URL}/profile/company-profile?companyId=${companyData.id}`}</Link>
                  ) : (
                    <p>
                      {lang(
                        "USER_PROFILE_SUMMARY.TEXT.CONTACT_INFO_NOT_ADDED_YET"
                      )}
                    </p>
                  )}
                </li>
              </Col>
            </Row>

            <Row>
              {companyData?.companyURL !== "HIDDEN" && (
                <Col lg={8} key={"item.item.id"}>
                  <li className="mb-3">
                    <em className="bx bxl-chrome"></em>
                    {lang("PROFILE_TABS.COMPANY_URL")}
                    <Link
                      className="text-primary"
                      route={companyData?.companyURL}
                    >
                      {companyData?.companyURL}
                    </Link>
                  </li>
                </Col>
              )}
            </Row>

            <Row>
              {companyData.companyContact !== "HIDDEN" && (
                <Col lg={8} key={"item.item.id"}>
                  <li className="mb-3">
                    <em className="bx bxs-buildings"></em>
                    {lang("PROFILE_TABS.COMPANY_STRENGTH")}
                    <p>{companyData?.companyStrength}</p>
                  </li>
                </Col>
              )}
            </Row>
            <Row>
              {companyData.companyContact !== "HIDDEN" && (
                <Col lg={8} key={"item.item.id"}>
                  <li className="mb-3">
                    <em className="bx bxs-briefcase-alt-2"></em>
                    {lang("PROFILE_TABS.INDUSTRY")}
                    <p>{companyData?.industry}</p>
                  </li>
                </Col>
              )}
            </Row>
            <Row>
              {companyData.companyContact !== "HIDDEN" && (
                <Col lg={8} key={"item.item.id"}>
                  <li className="mb-3">
                    <em className="bx bx-phone"></em>
                    {lang("USER_PROFILE_SUMMARY.TEXT.CONTACT_INFO_PHONE")}
                    <p>
                      {companyData.companyContact
                        ? companyData.companyContact &&
                          companyData.companyContact?.indexOf("+") === 0
                          ? companyData.companyContact
                          : companyData.companyContact
                        : lang(
                            "USER_PROFILE_SUMMARY.TEXT.CONTACT_INFO_NOT_ADDED_YET"
                          )}
                    </p>
                  </li>
                </Col>
              )}
            </Row>
            <Row>
              {companyData.companyContact !== "HIDDEN" && (
                <Col lg={8} key={"item.item.id"}>
                  <li className="mb-3">
                    <em className="bx bxs-envelope"></em>
                    {lang("PROFILE_TABS.COMPANY_EMAIL")}
                    <p>{companyData?.companyEmail}</p>
                  </li>
                </Col>
              )}
            </Row>
            <Row>
              <Col lg={8} key={"item.item.id"}>
                <li className="mb-3">
                  <em className="bx bxs-award"></em>
                  {lang("PROFILE_TABS.FOUNDED_ON")}
                  <p>
                    {companyData?.foundedOn ||
                      lang(
                        "USER_PROFILE_SUMMARY.TEXT.CONTACT_INFO_NOT_ADDED_YET"
                      )}
                  </p>
                </li>
              </Col>
            </Row>
            <Row>
              <Col lg={8} key={"item.item.id"}>
                <li className="mb-3">
                  <em className="bx bxs-buildings"></em>
                  {lang("LEARNING_INSTITUTE_FORM.FISCAL_NUMBER")}
                  <p>
                    {companyData?.fiscalNumber ||
                      lang(
                        "USER_PROFILE_SUMMARY.TEXT.CONTACT_INFO_NOT_ADDED_YET"
                      )}
                  </p>
                </li>
              </Col>
            </Row>
            <Row>
              <Col lg={8} key={"item.item.id"}>
                <li className="mb-3">
                  <em className="bx bxs-tag"></em>
                  {lang("PROFILE_TABS.TAGS")}
                  <p>
                    {companyData?.tags?.join(", ") ||
                      lang(
                        "USER_PROFILE_SUMMARY.TEXT.CONTACT_INFO_NOT_ADDED_YET"
                      )}
                  </p>
                </li>
              </Col>
            </Row>
            <Row>
              <Col lg={8} key={"item.item.id"}>
                <li className="mb-3">
                  <em className="bx bxs-map"></em>
                  {lang("PROFILE_TABS.HQ_ADDRESS")}
                  <p>
                    {companyData?.headquarter ||
                      lang(
                        "USER_PROFILE_SUMMARY.TEXT.CONTACT_INFO_NOT_ADDED_YET"
                      )}
                  </p>
                </li>
              </Col>
            </Row>
          </ul>
        </Card.Body>
      </div>
    </>
  );
}
