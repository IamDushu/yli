import React, { useEffect } from "react";
import { TextField } from "components/form-fields";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyDetailsById } from "store/actions/company";
import { useTranslation } from "react-i18next";

const ContactInfoCompany = ({ companyId }) => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const { companyData } = useSelector((state) => state.company);
  const inputProps = {
    disabled: true,
  };

  useEffect(() => {
    dispatch(getCompanyDetailsById(companyId));
  }, []);

  let visibilitySettings = {
    email: true,
    phone: true,
    website: true,
    address: true
  };
  
  if (companyData?.contactVSettings) {
    const visibility = companyData.contactVSettings;
    // isFollow checks whether current user -> follower of insitute or not
    const isFollow = companyData?.cufd?.isFollow;
  
    for (const key of ['email', 'phone', 'website', 'address']) {
      
      if (visibility[key]?.none || (visibility[key]?.followers && !isFollow)) {
        visibilitySettings[key] = false;
      }
    }
  }

  const companyStrengthValue = (key) => {
    switch (key) {
      case "small":
        return "Small Company (<200 Employees)";
      case "medium":
        return "Medium or Large (>200 Employees)";
      case "no-profit-organization":
        return "Non Profit Organization";
      case "public-institute":
        return "Public Institute";

      default:
        return "";
    }
  };
  return (
    <div className="modal-body">
      <div>
        <Row>
          <Col md={6}>
            <div className="mb-2">
              <TextField
                label={lang("PROFILE_TABS.COMPANY_NAME")}
                value={companyData?.companyName}
                required={false}
                disabled
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="mb-2">
              <TextField
                label={lang("PROFILE_TABS.COMPANY_STRENGTH")}
                value={companyStrengthValue(companyData?.companyStrength)}
                required={false}
                disabled
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="mb-2">
              <TextField
                label={lang("PROFILE_TABS.INDUSTRY")}
                value={companyData?.industry}
                required={false}
                disabled
              />
            </div>
          </Col>
          {visibilitySettings?.phone && <Col md={6}>
            <div className="mb-2">
              <TextField
                label={lang("PROFILE_TABS.COMPANY_CONTACT_NUMBER")}
                value={companyData?.companyContact}
                required={false}
                disabled
              />
            </div>
          </Col>}
          {visibilitySettings?.email && <Col md={12}>
            <div className="mb-2">
              <TextField
                label={lang("PROFILE_TABS.COMPANY_EMAIL")}
                value={companyData?.companyEmail}
                required={false}
                disabled
              />
            </div>
          </Col>}
          {visibilitySettings?.website && <Col md={12}>
            <div className="mb-2">
              <TextField
                label={lang("PROFILE_TABS.COMPANY_URL")}
                value={companyData?.companyURL}
                required={false}
                disabled
              />
            </div>
          </Col>}
          <Col md={6}>
            <div className="mb-2">
              <TextField
                label={lang("PROFILE_TABS.FOUNDED_ON")}
                value={companyData?.foundedOn}
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
                value={companyData?.fiscalNumber}
                disabled
              />
            </div>
          </Col>
          <Col md={12}>
            <div className="mb-2">
              <TextField
                label={lang("PROFILE_TABS.TAGS")}
                value={companyData?.tags}
                required={false}
                disabled
              />
            </div>
          </Col>
          {visibilitySettings?.address && <Col md={12}>
            <div className="mb-2">
              <TextField
                label={lang("PROFILE_TABS.HQ_ADDRESS")}
                value={companyData?.headquarter}
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

export default ContactInfoCompany;
