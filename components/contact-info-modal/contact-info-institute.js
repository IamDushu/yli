import React, { useEffect } from "react";
import { TextField } from "components/form-fields";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getLearningInstituteDetails } from "store/actions/learningInstitute";
import { useTranslation } from "react-i18next";

const ContactInfoInstitute = ({ instituteId }) => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const { learningData } = useSelector((state) => state.learningInstitute);
  const inputProps = {
    disabled: true,
  };

  useEffect(() => {
    dispatch(getLearningInstituteDetails(instituteId));
  }, []);

  let visibilitySettings = {
    email: true,
    phone: true,
    website: true,
    address: true
  };
  
  if (learningData?.contactVSettings) {
    const visibility = learningData.contactVSettings;
    // isFollow checks whether current user -> follower of insitute or not
    const isFollow = learningData?.cufd?.isFollow;
  
    for (const key of ['email', 'phone', 'website', 'address']) {
      
      if (visibility[key]?.none || (visibility[key]?.followers && !isFollow)) {
        visibilitySettings[key] = false;
      }
    }
  }
  

  return (
    <div className="modal-body">
      <div>
        <Row>
          <Col md={6}>
            <div className="mb-2">
              <TextField
                label={lang("PROFILE_TABS.INSTITUTE_NAME")}
                value={learningData?.name}
                required={false}
                disabled
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="mb-2">
              <TextField
                label={lang("PROFILE_TABS.ORGANISATION_TYPE")}
                value={learningData?.orgType}
                required={false}
                disabled
              />
            </div>
          </Col>
          {/* <Col md={6}>
            <div className="mb-2">
              <TextField
                label={lang("PROFILE_TABS.SECTOR")}
                value={learningData?.sector}
                required={false}
                disabled
              />
            </div>
          </Col> */}
          {visibilitySettings?.phone && <Col md={12}>
            <div className="mb-2">
              <TextField
                label={lang("PROFILE_TABS.INSTITUTE_CONTACT_NUMBER")}
                value={learningData?.instituteContact}
                required={false}
                disabled
              />
            </div>
          </Col>}
          {visibilitySettings?.email && <Col md={12}>
            <div className="mb-2">
              <TextField
                label={lang("PROFILE_TABS.INSTITUTE_EMAIL")}
                value={learningData?.instituteEmail}
                required={false}
                disabled
              />
            </div>
          </Col>}
          {visibilitySettings?.website && <Col md={12}>
            <div className="mb-2">
              <TextField
                label={lang("PROFILE_TABS.INSTITUTE_URL")}
                value={learningData?.instituteURL}
                required={false}
                disabled
              />
            </div>
          </Col>}
          {/*  <Col md={6}>
            <div className="mb-2">
              <TextField
                label={lang("PROFILE_TABS.FOUNDED_ON")}
                value={learningData?.foundedOn}
                required={false}
                disabled
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="mb-3">
              <span className="form-label">
                {lang("LEARNING_INSTITUTE_FORM.FISCAL_NUMBER")}
              </span>

              <TextField
                type="text"
                id="fiscal"
                value={learningData?.fiscalNumber}
                disabled
              />
            </div>
          </Col>
 */}{" "}
          <Col md={12}>
            <div className="mb-2">
              <TextField
                label={lang("PROFILE_TABS.TAGS")}
                value={learningData?.tags}
                required={false}
                disabled
              />
            </div>
          </Col>
          {visibilitySettings?.address && <Col md={12}>
            <div className="mb-2">
              <TextField
                label={lang("PROFILE_TABS.HQ_ADDRESS")}
                value={learningData?.headquarter}
                required={false}
                disabled
              />
            </div>
          </Col>}
        </Row>
      </div>
    </div>
  );
};

export default ContactInfoInstitute;
