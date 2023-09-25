import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCertificate } from "store/actions/faq";
import { Row, Col, Modal } from "react-bootstrap";
import moment from "moment";

/******************** 
  @purpose :  View Certificate
  @Parameter : {}
  @Author : INIC
  ******************/
const ViewCertificate = () => {
  const dispatch = useDispatch();
  const { viewCertificate } = useSelector((state) => state.faqReducer);
  const { viewSingleCerti } = useSelector((state) => state.ui);

  /******************** 
  @purpose :  View Certificate
  @Parameter : {}
  @Author : INIC
  ******************/
  useEffect(() => {
    const body = { id: viewSingleCerti, key: "certificate" };
    dispatch(getCertificate(body));
  }, []);

  const imageSource = viewSingleCerti?.profileCert
    ? viewSingleCerti?.data?.url
    : viewCertificate?.uploadURL;

  return (
    <>
      <Modal.Body>
        {Boolean(imageSource) && (
          <Row>
            <Col md={12}>
              <div className="certificate ">
                <div className="certificate-img text-center mb-4 ">
                  <picture>
                    <source srcSet={imageSource} type="image/jpg" />
                    <img
                      src={
                        imageSource
                          ? imageSource
                          : "/assets/images/user-noimg.jpg"
                      }
                      alt="Profile-Banner w-100 "
                      className="object-contain w-100 rounded-10 overflow-hidden m-h-360"
                    />
                  </picture>
                </div>
              </div>
            </Col>
          </Row>
        )}
        <Row>
          {(viewSingleCerti?.data?.title || viewCertificate?.title) && (
            <Col md={6}>
              <p>
                <strong> Title : </strong>{" "}
                {viewSingleCerti?.profileCert
                  ? viewSingleCerti?.data?.title
                  : viewCertificate?.title}
              </p>
            </Col>
          )}
          {(viewSingleCerti?.data?.issuingOrganization ||
            viewCertificate?.issuingOrganization) && (
            <Col md={6}>
              <p>
                <strong> Issuing Organization:</strong>{" "}
                {viewSingleCerti?.profileCert
                  ? viewSingleCerti?.data?.issuingOrganization
                  : viewCertificate?.issuingOrganization}
              </p>
            </Col>
          )}
          {(viewSingleCerti?.data?.issuedDate ||
            viewCertificate?.startDate) && (
            <Col md={6}>
              <p>
                <strong> Start Date:</strong>{" "}
                {viewSingleCerti?.profileCert
                  ? viewSingleCerti?.data?.issuedDate
                    ? moment(viewSingleCerti?.data?.issuedDate).format(
                        "DD/MM/YYYY"
                      )
                    : ""
                  : viewCertificate?.startDate}
              </p>
            </Col>
          )}
          {(viewSingleCerti?.data?.expirationDate ||
            viewCertificate?.endDate) && (
            <Col md={6}>
              <p>
                <strong> End Date:</strong>{" "}
                {viewSingleCerti?.profileCert
                  ? viewSingleCerti?.data?.expirationDate
                    ? moment(viewSingleCerti?.data?.expirationDate).format(
                        "DD/MM/YYYY"
                      )
                    : ""
                  : viewCertificate?.endDate}
              </p>
            </Col>
          )}
          {(viewSingleCerti?.data?.credentialId ||
            viewCertificate?.credentialId) && (
            <Col md={6}>
              <p>
                <strong> Credential ID :</strong>{" "}
                {viewSingleCerti?.profileCert
                  ? viewSingleCerti?.data?.credentialId
                  : viewCertificate?.credentialId}
              </p>
            </Col>
          )}
          {(viewSingleCerti?.data?.credentialUrl || viewCertificate?.url) && (
            <Col md={6}>
              <p>
                <strong> Credential URL :</strong>
                {viewSingleCerti?.profileCert
                  ? viewSingleCerti?.data?.credentialUrl
                  : viewCertificate?.url}
              </p>
            </Col>
          )}
          {(viewSingleCerti?.data?.description ||
            viewCertificate?.description) && (
            <Col md={6}>
              <p>
                <strong> Description:</strong>
                {viewSingleCerti?.profileCert
                  ? viewSingleCerti?.data?.description
                  : viewCertificate?.description}
              </p>
            </Col>
          )}
        </Row>
        .
      </Modal.Body>
    </>
  );
};

export default ViewCertificate;
