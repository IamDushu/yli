import ContactInfoCompany from "components/contact-info-modal/contact-info-company";
import ContactInfoInstitute from "components/contact-info-modal/contact-info-institute";
import React from "react";

const ContactInfo = ({ instituteId, companyId }) => {
  return instituteId !== undefined ? (
    <ContactInfoInstitute instituteId={instituteId} />
  ) : (
    companyId !== undefined && <ContactInfoCompany companyId={companyId} />
  );
};

export default ContactInfo;
