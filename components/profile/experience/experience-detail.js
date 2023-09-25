import React, { Fragment } from "react";
import moment from "moment";
import { onImageError } from "utils";
/******************** 
  @purpose :Profile Experience Listing
  @Parameter : { }
  @Author : INIC
  ******************/
const ExperienceDetail = ({
  isFirst,
  data,
  editPopupHandler,
  isSelfProfile,
  viewmode,
}) => {
  return (
    <Fragment>
      <div className="d-md-flex list-group card flex-md-row">
        <div className="activity-info w-40 w-md-100  pl-md-3 pl-0">
          <div className="d-flex align-items-center mb-md-0 mb-1">
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
                      data?.companyDetails?.companyName ??
                        data?.instituteDetails?.name ??
                        ""
                    )
                  }
                />
              </picture>
            </div>
            <h5 className="font-16 text-secondary cursor-pointer pl-2 font-semibold mb-1">
              {data.role ?? ""}
            </h5>
          </div>
        </div>
        <ul className="list-unstyled exp-list mt-1 mb-md-0 mb-3 d-flex-column justify-content-start pl-md-3">
          <li className="mb-1 font-weight-bold text-secondary">
            {data?.companyDetails?.companyName ??
              data?.instituteDetails?.name ??
              ""}
          </li>
          {data?.startDate && (
            <li className="mb-1 font-12">{`${moment(data.startDate).format(
              "MMM YYYY"
            )} - ${
              data?.endDate
                ? moment(data.endDate).format("MMM YYYY")
                : "Present"
            }`}</li>
          )}

          <li>{data?.location ?? ""}</li>
        </ul>
        <div className="d-flex ml-auto justify-content-between">
          {isSelfProfile && !viewmode && (
            <span
              className={`font-18 d-flex align-items-center pointer text-secondary material-icons ${
                isFirst ? "invisible" : ""
              }`}
              onClick={() => editPopupHandler(data)}
            >
              border_color
            </span>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default React.memo(ExperienceDetail);
