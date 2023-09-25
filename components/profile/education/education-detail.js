import React, { Fragment } from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { onImageError } from "utils";
/******************** 
  @purpose :Education Detail 
  @Parameter : { }
  @Author : INIC
  ******************/
const EducationDetail = ({
  isFirst,
  isLast,
  data,
  editPopupHandler,
  isSelfProfile,
  viewmode,
}) => {
  const [lang] = useTranslation("language");

  return (
    <Fragment>
      <div className="d-flex align-items-start w-100 list-group card  flex-md-row">
        <div className="overflow-hidden w-h-54 border-radius-8 flex-shrink-0">
          <picture onContextMenu={(e) => e.preventDefault()}>
            <source
              srcSet={
                data?.companyDetails ?? data?.instituteDetails
                  ? data?.companyDetails?.logo ??
                    data?.instituteDetails?.logo ??
                    ""
                  : data?.uploadUrl ?? ""
              }
              type="image/png"
            />
            <img
              src={
                data?.companyDetails ?? data?.instituteDetails
                  ? data?.companyDetails?.logo ??
                    data?.instituteDetails?.logo ??
                    ""
                  : data?.uploadUrl ?? ""
              }
              alt="User"
              width="54"
              height="54"
              onError={(e) =>
                onImageError(
                  e,
                  "profile",
                  data?.degree || data?.instituteDetails?.name
                )
              }
            />
          </picture>
        </div>
        <div className="activity-info w-100 pl-md-2">
          <h4 className="mb-1 font-16">{data?.degree || ""}</h4>
          <ul className="list-unstyled exp-list mt-1 mb-0">
            <li>
              {moment(data?.startDate).format("MMMM YYYY")}
              {data?.endDate
                ? ` - ${moment(data?.startDate).format("MMMM YYYY")}`
                : " - Present"}
            </li>
            <li className="mb-1">{data?.description}</li>
          </ul>
        </div>

        <div className="d-flex ml-auto justify-content-between">
          {isSelfProfile && data?.degree && !viewmode && (
            <span
              className={`d-flex align-items-center font-18 pointer text-secondary material-icons ${
                isFirst ? "invisible" : ""
              }`}
              onClick={() => editPopupHandler(data)}
            >
              {" "}
              {/* {lang("EDUCATION.TEXT.EDIT")} */}
              border_color
            </span>
          )}
        </div>
      </div>

      {/* {!isLast && <hr className="my-4" />} */}
    </Fragment>
  );
};

export default React.memo(EducationDetail);
