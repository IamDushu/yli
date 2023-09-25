import { APP_URL } from "config";
import React from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const ActivityTable = ({ activitiesData, addToGM, loadMore }) => {
  const [lang] = useTranslation("language");

  /*******************
  @Purpose : To redirect onclick of title
  @Parameter : {}
  @Author : INIC
  ******************/
  const activityTitleFunc = (
    courseTyp,
    virtualEtyp,
    id,
    personalWebsiteLink
  ) => {
    if (courseTyp === "offline" || courseTyp === "online") {
      window.open(APP_URL + "/course-detail/" + id, "_blank");
    }
    if (courseTyp === "other") {
      window.open(personalWebsiteLink, "_blank");
    }
    if (virtualEtyp) {
      window.open(APP_URL + "/virtual-events/" + id, "_blank");
    }
  };

  /*******************
  @Purpose : To redirect onclick of author name
  @Parameter : {data}
  @Author : YLIWAY
  ******************/
  const authorClickFunc = (data) => {
    if (
      (data?.courseType === "online" ||
        data?.courseType === "offline" ||
        data?.virtualEventType) &&
      data?.instituteId === null
    ) {
      window.open(
        APP_URL + "/profile/" + data?.UserDetails?.profileId,
        "_blank"
      );
    }
    if (data?.courseType === "other" && data?.instituteId === null) {
      window.open(data?.personalWebsiteLink, "_blank");
    }
    if (data.instituteId !== null && data?.instituteDetails !== null) {
      window.open(
        APP_URL +
          "/profile/institute-profile/?instituteId=" +
          data?.instituteId +
          "&name=" +
          data?.instituteDetails?.name +
          "&userId=" +
          data?.userId,
        "_blank"
      );
    }
  };

  return (
    <>
      <Table className="bg-white compilation-table" responsive="lg">
        <thead className="text-body-12 text-secondary font-weight-light">
          <tr>
            <th className="w-230">{lang("GROWTH_MODEL.GM_POPUP_TITLE")}</th>
            <th className="text-center">
              {lang("GROWTH_MODEL.GM_POPUP_AUTHOR")}
            </th>
            <th className="text-center">
              {lang("GROWTH_MODEL.GM_STEPTWO_ACTIVITY")}
            </th>
            <th className="text-center">
              {lang("GROWTH_MODEL.GM_STEPTWO_DATETIME")}
            </th>
            <th className="text-center">
              {lang("GROWTH_MODEL.GM_STEPTWO_YC")}
            </th>
            <th className="text-center">
              {lang("GROWTH_MODEL.GM_POPUP_RATING")}
            </th>
            <th className="text-center">{lang("COMMON.ACTION")}</th>
          </tr>
        </thead>
        <tbody>
          {activitiesData?.courseDetails &&
            activitiesData?.virtualEvenDetails &&
            [
              ...activitiesData?.courseDetails?.rows,
              ...activitiesData?.virtualEvenDetails?.rows,
            ].map((row) => {
              return (
                <tr className="border-bottom border-dark" key={row?.id}>
                  <td
                    className="text-underline pl-3 pr-0 cursor-pointer"
                    onClick={(e) =>
                      activityTitleFunc(
                        row?.courseType,
                        row?.virtualEventType,
                        row?.id,
                        row?.personalWebsiteLink
                      )
                    }
                  >
                    {row?.title}
                  </td>
                  <td
                    className="text-underline pl-3 pr-0 text-primary cursor-pointer text-center"
                    onClick={(e) => authorClickFunc(row)}
                  >
                    {row?.courseType === "other"
                      ? row?.structureInformation
                      : row?.instituteId
                      ? row?.instituteDetails?.name
                      : row?.UserDetails?.firstName +
                        " " +
                        row?.UserDetails?.lastName}
                  </td>
                  <td className="pl-3 pr-0 text-center">
                    {row?.courseType?.charAt(0).toUpperCase() +
                      row?.courseType?.slice(1) ||
                      row?.virtualEventType?.charAt(0).toUpperCase() +
                        row?.virtualEventType?.slice(1)}
                  </td>
                  <td className="pl-3 pr-0 text-center">
                    {row?.dates !== null ? row?.dates : "N/A"}
                  </td>
                  <td className="pl-3 pr-0 text-center">
                    {row?.enterPrice !== null
                      ? row?.enterPrice
                      : row?.freePrice}
                  </td>
                  <td className="pl-3 pr-0 text-center">
                    {row?.rating}
                    <span className="bx bxs-star text-warning mr-1 font-16 pointer ml-auto pt-1"></span>
                  </td>
                  <td className="pl-3 pr-0 text-center ">
                    <div className="activities-action-btns ">
                      <i
                        className={`bx bxs-plus-circle ${
                          row?.isSelected ? "text-success" : "text-info"
                        }`}
                        onClick={() => {
                          if (!row?.isSelected) {
                            addToGM(row, true);
                          }
                        }}
                      ></i>
                      {row?.isSelected && (
                        <i
                          className="bx bxs-x-circle remove-ga"
                          onClick={() => {
                            if (row?.isSelected) {
                              addToGM(row, false);
                            }
                          }}
                        ></i>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      {activitiesData?.courseDetails &&
        activitiesData?.virtualEvenDetails &&
        (activitiesData?.courseDetails?.rows.length <
          activitiesData?.courseDetails?.total ||
          activitiesData?.virtualEvenDetails?.rows.length <
            activitiesData?.virtualEvenDetails?.total) && (
          <Row>
            <Col sm={12} className="text-center pt-3 pointer">
              <div
                className="text-primary font-weight-semibold"
                variant="outline-info"
                onClick={() => loadMore()}
              >
                {lang("COMMON.VIEW_MORE")}
              </div>
            </Col>
          </Row>
        )}
    </>
  );
};

export default ActivityTable;
