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
const CertificateDetail = ({
  isFirst,
  isLast,
  data,
  editPopupHandler,
  isSelfProfile,
  viewmode,
  profile,
}) => {
  const { title:name, issuingOrganization:issuer, url:logo, credentialUrl, id } = data;
  const dispatch = useDispatch();
  const router = useRouter();
  const [lang] = useTranslation("language");
  return (
    <Fragment>
      <div className="d-md-flex align-items-start w-100">
        {data?.url && (
          <div className="overflow-hidden flex-shrink-0 mr-3 mb-md-0 mb-2">
            <picture onContextMenu={(e) => e.preventDefault()}>
              <source srcSet={logo} type="image/png" />
              <img
                src={data.url || ""}
                alt="Company"
                width="80"
                height="80"
                // className="img-fluid"
                onError={(e) => {
                  onImageError(e);
                }}
              />
            </picture>
          </div>
        )}

        <div className="activity-info mb-md-0 mb-3">
          <div className="d-flex justify-content-between">
            <h4 className="m-0 text-body-16">{name || data.title || ""}</h4>
          </div>
          <ul className="list-unstyled exp-list mt-1 mb-0">
            <li>{issuer || data.description || ""}</li>
            {credentialUrl && (
              <li>
                <a
                  className="text-blue-dress"
                  onClick={() => window.open(credentialUrl, "_blank")}
                >
                  See Certificate
                </a>
              </li>
            )}
          </ul>
        </div>
        <div className="d-flex justify-content-between ml-auto pl-md-3 pl-0">
          {profile !== "otherProfile" && data.title && (
            <span
              className="d-flex align-items-center font-18 pointer text-secondary material-icons"
              onClick={() => {
                // router.push({ pathname: VIEW_CERTIFICATE, query: { id: id } });
                dispatch(viewCertiModal({id,profileCert:true,data}));
                dispatch(toggleModals({ viewcertificate: true }));
              }}
            >
              {/* {lang("View")} */}
              visibility
            </span>
          )}

          {isSelfProfile && data.title && !viewmode && (
            <>
              <div className="px-3 text-gray">•</div>
              <span
                className={`d-flex align-items-center font-18 pointer text-secondary material-icons ${
                  isFirst ? "invisible" : ""
                }`}
                onClick={() => editPopupHandler(data)}
              >
                {/* {lang("COMMON.EDIT")} */}
                border_color
              </span>
            </>
          )}
        </div>
      </div>
      {!isLast && <hr className="my-4" />}
    </Fragment>
  );
};

export default React.memo(CertificateDetail);
