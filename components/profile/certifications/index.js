import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import WithPopup from "../../with-popup/with-popup";
import CertificateForm from "./certification-form";
import CertificateDetail from "./certification-detail";
import YliwayCertificateDetail from "./yliway-certification-detail";
import { selectCertificationData } from "../../../store/selectors/certification";
import { getYliwayeCertificate } from "store/actions";
/******************** 
  @purpose :Profile Certificate
  @Parameter : {}
  @Author : INIC
  ******************/
const Certificate = ({
  openPopupHandler,
  editPopupHandler,
  renderPopup,
  popupInfo,
  certificationRef,
  isSelfProfile,
  certificationList,
  viewmode,
  otherUserData,
  profile,
}) => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const [viewAll, setViewAll] = useState(false);
  const yliwayCertificates = useSelector(
    (state) => state.user.userYliwayCertificates
  );

  const data = certificationList;
  const editPopUpHandler = useCallback(editPopupHandler, []);
  const renderCertificateForm = (props) => (
    <CertificateForm {...props} isSelfProfile={isSelfProfile} />
  );
  let numberOfCertificate =  viewAll ? data?.count : 3;

  /******************** 
  @purpose :Certificate list
  @Parameter : []
  @Author : INIC
  ******************/
  useEffect(() => {
    dispatch(getYliwayeCertificate());
  }, []);

  return (
    <Fragment>
      {(isSelfProfile ||
        data?.rows?.length ||
        profile === "otherProfile") && (
        <Card className="mb-3">
          <Card.Body className="p-3">
            <div
              className={`d-flex align-items-center justify-content-between ${
                data && data.length > 0 ? "pb-3" : "pb-3"
              }`}
            >
              <h6 className="mb-sm-0 mb-0">
                {lang("CERTIFICATE.TEXT.CERTIFICATE")}
              </h6>
              {isSelfProfile && !viewmode && (
                <div
                  variant="outline-info py-12 px-4 d-flex align-items-center border-0"
                  onClick={openPopupHandler}
                  ref={certificationRef}
                >
                  {/* <em className="icon icon-plus-primary font-14 pr-2"></em> */}
                  <span className="material-icons font-24 text-secondary  pointer">add</span>
                  {/* {lang("COMMON.ADD_MORE")} */}
                </div>
              )}
            </div>
            {yliwayCertificates &&
              yliwayCertificates?.length > 0 &&
              yliwayCertificates
                .reverse()
                .map((item, idx) => (
                  <YliwayCertificateDetail data={item} key={"yli-cer-" + idx} />
                ))}
            {data?.rows &&
              data?.rows?.length > 0 &&
              data?.rows
                .slice(0)
                .reverse()
                .slice(0, numberOfCertificate)
                .map((item, idx) => (
                  <CertificateDetail
                    key={item.id}
                    // isFirst={!item.id}
                    isLast={idx + 1 === data.length}
                    data={item}
                    isSelfProfile={isSelfProfile}
                    editPopupHandler={editPopUpHandler}
                    viewmode={viewmode}
                    profile={profile}
                  />
                ))}
            {data?.rows && data?.rows?.length === 0 && yliwayCertificates?.length === 0 && (
              <div className="desc pr-xl-5 mr-xl-2">
                <p className="text-body-14 font-weight-normal m-0">
                  {lang("CERTIFICATE.TEXT.NO_CERTIFICATE")}
                </p>
              </div>
            )}
          </Card.Body>

          {data && data?.count > 3 && (
            <span
              className="cursor-pointer text-body-14 py-12 text-center load-more-color border-geyser border-top"
              style={{ color: "#0f6bbf" }}
              onClick={() => setViewAll(!viewAll)}
            >
              {viewAll ? lang("COMMON.VIEW_LESS") : lang("COMMON.VIEW_MORE")}
            </span>
          )}
          {renderPopup(
            popupInfo.isEdit
              ? lang("CERTIFICATE.POPUP.EDIT_CERTIFICATE")
              : lang("CERTIFICATE.POPUP.ADD_CERTIFICATE"),
            renderCertificateForm
          )}
        </Card>
      )}
    </Fragment>
  );
};
export default WithPopup(Certificate);
