import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { toggleModals, viewCertiModal } from "store/actions";
import { onImageError } from "utils";

/******************** 
  @purpose :Certificate Detail
  @Parameter : { isFirst,isLast,data,editPopupHandler,isSelfProfile}
  @Author : INIC
  ******************/
const YliwayCertificateDetail = ({ data }) => {
  const router = useRouter();
  const [lang] = useTranslation("language");
  return (
    <Fragment>
      <div className="d-md-flex align-items-center w-100">
        <div className="overflow-hidden flex-shrink-0 mr-3 mb-md-0 mb-2">
          <picture onContextMenu={(e) => e.preventDefault()}>
            <source
              srcSet={data?.userCourseDetails?.[0]?.imageURL}
              type="image/png"
            />
            <img
              src={data?.userCourseDetails?.[0]?.imageURL}
              alt="Company"
              width="80"
              height="54"
              className="img-fluid"
              onError={(e) => {
                onImageError(e);
              }}
            />
          </picture>
        </div>

        <div className="activity-info mb-md-0 mb-3">
          <div className="d-flex justify-content-between">
            <h4 className="m-0 text-body-16">
              {data?.userCourseDetails?.[0]?.title}
            </h4>
          </div>
          <ul className="list-unstyled exp-list mt-1 mb-0">
            <li>Yliway Certificate</li>
          </ul>
        </div>
        <div className="d-flex justify-content-between ml-auto pl-md-3 pl-0">
          <span className="font-weight-semibold d-flex align-items-center text-primary text-body-14 pointer">
            <a
              href={"/certificate/" + data?.certificateNumber + "?type=course"}
              target="__blank"
            >
              {lang("CERTIFICATE.TEXT.VIEW_CERTIFICATE")}
            </a>
          </span>
        </div>
      </div>
      <hr className="my-3 my-md-4" />
    </Fragment>
  );
};

export default React.memo(YliwayCertificateDetail);
