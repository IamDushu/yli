import React, { useEffect, useState } from "react";
import { Layout } from "@components/layout";
import { Row, Col, Container, Button } from "react-bootstrap";
import { formatDateTime } from "utils/functions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getCertificateDetails, toggleModal } from "store/actions";
import { APP_URL } from "config";
import { selectUserInfo } from "store/selectors/user";
import { useTranslation } from "react-i18next";
import { getvirtualEventCertificateDetails } from "store/actions/room";
import dynamic from "next/dynamic";
import GeneralSkeletonLoader from "components/ui/general-skeleton-loader";
const MainModal = dynamic(() =>
  import("components/modal").then((mod) => mod.MainModal)
);
const ManageShare = dynamic(() => import("components/rooms/ManageShare"));

const CourseCertificate = () => {
  const dispatch = useDispatch();
  const [lang] = useTranslation("language");
  const certificate = useSelector((state) => state?.courses?.certificateDetail);
  const [loading, setLoading] = useState(true);
  const userData = useSelector(selectUserInfo);
  const { manageShare } = useSelector(({ ui }) => ui.modals, shallowEqual);
  const router = useRouter();
  const { id, type } = router.query;
  useEffect(() => {
    if (type === "course")
      dispatch(getCertificateDetails(id)).then((data) => {
        if (data) {
          setLoading(false);
        }
      });
    if (type === "virtualEvent")
      dispatch(getvirtualEventCertificateDetails(id)).then((data) => {
        if (data) {
          setLoading(false);
        }
      });
  }, []);

  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  return (
    <Layout>
      <div className="inner-wrapper profile-wrapper certificate-detail">
        {loading ? (
          <GeneralSkeletonLoader />
        ) : (
          <Container>
            <div className="bg-white p-4 p-sm-5  border-top border-primary position-relative">
              <div className="certificate-badge">
                <picture>
                  <source
                    srcSet={"/assets/images/certificate-icon.svg"}
                    type="image/png"
                  />
                  <img
                    src={"/assets/images/certificate-icon.svg"}
                    alt="RTF YLIWAY"
                    width="180"
                  />
                </picture>
              </div>
              <div className="w-180">
                <picture>
                  <source
                    srcSet={"/assets/images/brand-logo.svg"}
                    type="image/png"
                  />
                  <img
                    src={"/assets/images/brand-logo.svg"}
                    alt="RTF YLIWAY"
                    width="180"
                  />
                </picture>
              </div>
              <h4 className="text-uppercase text-primary mb-2 mb-sm-4 mt-3 mt-sm-4 pr-5 pr-sm-0 font-sm-14">
                Certification of completion
              </h4>
              <h1 className="font-64 mb-0 mb-sm-3 w-75 li-height-104 py-3">
                {type === "course"
                  ? certificate?.courseDetails?.title
                  : certificate?.eventDetails?.title}
              </h1>
              <h5 className="pb-1 pb-md-4 mb-0">
                <span className="text-secondary-75">Instructor:</span>{" "}
                <span>
                  {" "}
                  {type === "course"
                    ? certificate?.courseDetails?.instituteDetails
                      ? certificate?.courseDetails?.instituteDetails?.name
                      : certificate?.courseDetails?.UserDetails?.firstName +
                        " " +
                        certificate?.courseDetails?.UserDetails?.lastName
                    : certificate?.eventDetails?.instituteDetails
                    ? certificate?.eventDetails?.instituteDetails?.name
                    : certificate?.eventDetails?.UserDetails?.firstName +
                      " " +
                      certificate?.eventDetails?.UserDetails?.lastName}
                </span>
              </h5>
              <Row className="pt-2 pt-sm-4 align-items-end">
                <Col md={7}>
                  <h2 className="mb-2 mb-sm-4">
                    {certificate?.userDetails?.firstName +
                      " " +
                      certificate?.userDetails?.lastName}
                  </h2>
                  <h5 className="mb-3 mb-sm-4">
                    <span className="text-secondary-75">Date:</span>{" "}
                    <span> {formatDateTime(certificate?.createdAt)}</span>
                  </h5>
                  <h5 className="mb-0">
                    <span className="text-secondary-75">Expired on:</span>{" "}
                    <span> N/A</span>
                  </h5>
                </Col>
                <Col md={5} className="mt-3 mt-md-0">
                  <p className="text-gray font-14 mb-3 text-left text-break">
                    Certifcate No:{" "}
                    {certificate?.certificateDetails?.certificateNumber}
                  </p>
                  <a
                    className="text-gray font-14 mb-0 text-left text-break"
                    href={`${APP_URL}/certificate/${certificate?.certificateDetails?.certificateNumber}?type=${type}`}
                  >
                    Certifcate URL:{" "}
                    {`${APP_URL}/certificate/${certificate?.certificateDetails?.certificateNumber}?type=${type}`}
                  </a>
                </Col>
              </Row>
            </div>
            {userData?.id === certificate?.userDetails?.id && (
              <div className="d-flex justify-content-center py-sm-2 ">
                <a
                  href={certificate?.certificateDetails?.certificateURL}
                  className="m-2 btn btn-primary"
                  download
                  target="_blank"
                >
                  Download
                </a>
                <Button
                  className="m-2"
                  onClick={() => dispatch(toggleModal(true, "manageShare"))}
                >
                  Share
                </Button>
              </div>
            )}
          </Container>
        )}
      </div>
      {/* Course share */}
      <MainModal
        className="manageShare custom-modal-footer"
        show={manageShare}
        keyModal="manageShare"
        header={<h2 className="h6 m-0"> {lang("COMMON.SHARE")}</h2>}
        body={
          <ManageShare
            courseId={certificate?.courseDetails?.id}
            type="certificate"
            manageData={certificate}
          />
        }
        headerClassName="mb-50 block md-mb-30"
        backdrop="static"
      />
    </Layout>
  );
};
export default CourseCertificate;
