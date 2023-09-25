import React, { Fragment, useState } from "react";
import { Card, Row, Col, Form } from "react-bootstrap";
import { Link } from "routes";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import { APP_URL, PUBLIC_PROFILE_URL } from "../../../config";
import { useTranslation } from "react-i18next";

/******************** 
  @purpose :Profile Summary Detail  
  @Parameter : { }
  @Author : INIC
  ******************/
const ProfileSummaryDetail = ({
  userInfo,
  editPopupHandler,
  isSelfProfile,
  viewmode,
  showVisibilitySelect,
}) => {
  const {
    email,
    dateOfBirth,
    birthyear,
    profileId,
    phone,
    phoneNumberVerified,
    country,
    state,
    city,
    countryCode,
    socialMediaUrl,
    im,
    websiteURL,
  } = userInfo;

  let dob = dateOfBirth && moment(dateOfBirth).format("MMMM DD");
  const [lang] = useTranslation("language");

  // const [visibility, setVisibility] = useState({
  //   WEBSITE: false,
  //   PHONE: false,
  //   ADDRESS: false,
  //   EMAIL_ID: false,
  //   IM: false,
  //   BIRTHDAY: false,
  // });

  // // Rendering the single component for all Visibility options
  // const showVisibilitySelect = (id, menuPlacement = "bottom") => {
  //   return (
  //     <div className="custom-selectpicker-xs">
  //       <Form.Label>{lang("USER_PROFILE_SUMMARY.TEXT.VISIBILITY")}</Form.Label>
  //       <Select
  //         options={visibilityOptions}
  //         menuPlacement={menuPlacement}
  //         maxMenuHeight={190}
  //         onChange={(selected) => {
  //           // Setting the visibility state with selected value. Initially it will be false and updated as per API data
  //           setVisibility({ ...visibility, [id]: selected });
  //         }}
  //         value={
  //           visibility[id] === false ? visibilityOptions[0] : visibility[id]
  //         }
  //       />
  //     </div>
  //   );
  // };

  return (
    <div className="card-md">
      {/* <PerfectScrollbar> */}
      <Card.Body className="p-4">
        {phoneNumberVerified && (
          <Fragment>
            <h4 className="font-18">
              <em className="bx bx-check-circle font-24 pr-1 align-middle"></em>
              Verified account
            </h4>
            <p className="font-16">
              A phone number associated with this account has been verified. You
              can remove this verification at any time.
            </p>
            <hr />
          </Fragment>
        )}
        <div className="d-flex justify-content-between align-items-center">
          <h6> {lang("USER_PROFILE_SUMMARY.TEXT.CONTACT_INFO")}</h6>
          {isSelfProfile && !viewmode && (
            <em
              className="icon icon-write pointer font-24"
              onClick={() => editPopupHandler(userInfo)}
            ></em>
          )}
        </div>
        <ul className="list-unstyled profile-contact-info m-0">
          <Row>
            <Col lg={12} key={"item.item.id"}>
              <li className="mb-3">
                {/* <em className="bx bxl-linkedin-square"></em> */}
                <img
                  className="bx"
                  src="/assets/images/favicon.ico"
                  width="20"
                  height="20"
                />
                {lang("USER_PROFILE_SUMMARY.TEXT.CONTACT_INFO_YOUR_PROFILE")}
                {profileId ? (
                  <Link
                    className="text-primary"
                    route={`${APP_URL}/profile/${profileId}`}
                  >{`${PUBLIC_PROFILE_URL}/${profileId}`}</Link>
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
            {websiteURL !== "HIDDEN" && (
              <Col lg={7} key={"item.item.id"}>
                <li className="mb-3">
                  <em className="bx bx-link"></em>
                  {lang("USER_PROFILE_SUMMARY.TEXT.CONTACT_INFO_WEBSITE")}
                  <p>
                    {websiteURL && websiteURL.length > 0
                      ? websiteURL.map((data, i) => (
                          <div key={i}>
                            <a href={data?.url} target="_blank">
                              {data?.url}
                            </a>
                          </div>
                        ))
                      : lang(
                          "USER_PROFILE_SUMMARY.TEXT.CONTACT_INFO_NOT_ADDED_YET"
                        )}{" "}
                  </p>
                </li>
              </Col>
            )}
            {isSelfProfile && !viewmode && (
              <Col lg={5} key={"item.item.id"}>
                {showVisibilitySelect("WEBSITE")}
              </Col>
            )}
          </Row>

          <Row>
            {phone !== "HIDDEN" && (
              <Col lg={7} key={"item.item.id"}>
                <li className="mb-3">
                  <em className="bx bx-phone"></em>
                  {lang("USER_PROFILE_SUMMARY.TEXT.CONTACT_INFO_PHONE")}
                  <p>
                    {phone
                      ? phone && phone?.indexOf("+") === 0
                        ? phone
                        : countryCode + phone
                      : lang(
                          "USER_PROFILE_SUMMARY.TEXT.CONTACT_INFO_NOT_ADDED_YET"
                        )}
                  </p>
                </li>
              </Col>
            )}
            {isSelfProfile && !viewmode && (
              <Col lg={5} key={"item.item.id"}>
                {showVisibilitySelect("PHONE")}
              </Col>
            )}
          </Row>

          <Row>
            <Col lg={7} key={"item.item.id"}>
              <li className="mb-3">
                <em className="bx bxs-map"></em>
                {lang("USER_PROFILE_SUMMARY.TEXT.CONTACT_INFO_ADDRESS")}
                <p>
                  {country
                    ? `${country}, ${state}, ${city}`
                    : lang(
                        "USER_PROFILE_SUMMARY.TEXT.CONTACT_INFO_NOT_ADDED_YET"
                      )}
                </p>
              </li>
            </Col>
            {isSelfProfile && !viewmode && (
              <Col lg={5} key={"item.item.id"}>
                {showVisibilitySelect("ADDRESS")}
              </Col>
            )}
          </Row>

          <Row>
            {email !== "HIDDEN" && (
              <Col lg={7} key={"item.item.id"}>
                <li className="mb-3">
                  <em className="bx bx-mail-send"></em>
                  {lang("USER_PROFILE_SUMMARY.TEXT.CONTACT_INFO_EMAIL_ID")}
                  <a href={`mailto:${email}`}>{email}</a>
                </li>
              </Col>
            )}
            {isSelfProfile && !viewmode && (
              <Col lg={5} key={"item.item.id"}>
                {showVisibilitySelect("EMAIL")}
              </Col>
            )}
          </Row>

          <Row>
            {im !== "HIDDEN" && (
              <Col lg={7} key={"item.item.id"}>
                <li className="mb-3">
                  <em className="bx bx-message-square-detail"></em>
                  {lang("USER_PROFILE_SUMMARY.TEXT.CONTACT_INFO_IM")}
                  <p>
                    {socialMediaUrl && socialMediaUrl.length > 0
                      ? socialMediaUrl.map((data, index) => (
                          <div key={index}>
                            <a href={data?.url} target="_blank">
                              {data?.url} ({data?.type?.label})
                            </a>
                          </div>
                        ))
                      : lang(
                          "USER_PROFILE_SUMMARY.TEXT.CONTACT_INFO_NOT_ADDED_YET"
                        )}
                  </p>
                </li>
              </Col>
            )}
            {isSelfProfile && !viewmode && (
              <Col lg={5} key={"item.item.id"}>
                {showVisibilitySelect("IM", "top")}
              </Col>
            )}
          </Row>

          <Row>
            {birthyear !== "HIDDEN" && (
              <Col lg={7} key={"item.item.id"}>
                <li className="mb-3">
                  <em className="bx bx-cake"></em>
                  {lang("USER_PROFILE_SUMMARY.TEXT.CONTACT_INFO_BIRTHDAY")}
                  <p>
                    {dob
                      ? dob
                      : lang(
                          "USER_PROFILE_SUMMARY.TEXT.CONTACT_INFO_NOT_ADDED_YET"
                        )}
                  </p>
                </li>
              </Col>
            )}
            {isSelfProfile && !viewmode && (
              <Col lg={5} key={"item.item.id"}>
                {showVisibilitySelect("BIRTHYEAR", "top")}
              </Col>
            )}
          </Row>
        </ul>
      </Card.Body>
      {/* </PerfectScrollbar> */}
    </div>
  );
};

export default React.memo(ProfileSummaryDetail);
