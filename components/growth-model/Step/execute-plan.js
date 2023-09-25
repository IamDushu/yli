import React, { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { newsFeedGMaction, toggleModals } from "store/actions";
import {
  clearActivityPayload,
  deleteGrowthModelActivities,
  deleteGrowthModelUserActivities,
  getGrowthModelActivities,
  getGrowthModelActivitiesStatus,
  getStatusGM,
  setGrowthProject
} from "store/actions/growth";
import Swal from "sweetalert2";
import {
  growthModelTypeFilterOptionschange
} from "utils";
import Filters from "./StepFour/filters";

function StepFour() {
  const [lang] = useTranslation("language");
  const [optionsSkill, setOptionsSkill] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const optionsStatus = [
    { value: "Selected", label: "Selected" },
    { value: "inProgress", label: "In Progress" },
  ];

  const [executive, setExecutive] = useState(false);

  const dispatch = useDispatch();

  const { growthProject, growthModelActivities, growthModelDetail, statusData } = useSelector(
    ({ growth }) => growth
  );

  const user = useSelector(({ user }) => user);
  let userData = user?.userInfo || {};
  if (user?.userInfo && typeof user.userInfo === "string")
    userData = JSON.parse(user.userInfo);

  const [statusDataList, setstatusDataList] = useState([]);

  const statusDropdown = async () => {
    if (statusData?.length > 0) {
      statusData?.forEach((element, index) => {
        if (statusDataList?.length === statusData?.length) {
          return;
        } else {
          statusDataList.push({
            value: element?.title,
            label: element?.title,
          });
        }
      });
      setstatusDataList(() => [...statusDataList]);
    }
  };

  useEffect(() => {
    statusDropdown();
  }, [statusData]);

  const initFilterSettings = {
    resource: "",
    acitivityType: "",
    status: "",
    keyword: "",
    sortByPrice: "",
    rating: "",
    author: [],
    page: 1,
    limit: 5,
  };

  const [filterSettings, setFilterSettings] = useState(initFilterSettings);

  useEffect(() => {
    dispatch(getGrowthModelActivities(growthProject.id, filterSettings));
  }, [growthProject?.id]);

  useEffect(() => {
    if (executive === true) {
      dispatch(getGrowthModelActivities(growthProject.id, filterSettings));
      setExecutive(false);
    }
  }, [executive]);

  // get status List added by admin
  useEffect(() => {
    dispatch(getStatusGM());
    dispatch(clearActivityPayload());
  }, []);

  const setTypeOptions = (value) => {
    setFilterSettings((state) => ({
      ...state,
      acitivityType: "",
    }));
    switch (value) {
      case "Hard Skills":
        setOptionsSkill(growthModelTypeFilterOptionschange);
        break;
      case "Soft Skills":
        setOptionsSkill(growthModelTypeFilterOptionschange);
        break;
      case "Mindset":
        setOptionsSkill(growthModelTypeFilterOptionschange);
        break;
      case "Traction":
        setOptionsSkill(growthModelTypeFilterOptionschange);
        break;
      case "Distribution":
        setOptionsSkill(growthModelTypeFilterOptionschange);
        break;
      case "Support":
        setOptionsSkill(growthModelTypeFilterOptionschange);
        break;
      case "Content":
        setOptionsSkill(growthModelTypeFilterOptionschange);
        break;
      default:
        setOptionsSkill([]);
        break;
    }
  };

  const deleteGMRow = (id, activityId) => {
    Swal.fire({
      text: "Are you sure you want to remove this row from growth model?",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteGrowthModelActivities(id)).then(async () => {
          const payload = {
            id: "",
            postId: "",
            status: false,
            activityId: activityId,
            instituteId: "",
          };
          // dispatch(newsFeedGMaction(payload));
          await dispatch(deleteGrowthModelUserActivities(activityId));
          dispatch(getGrowthModelActivitiesStatus(growthProject?.id));
          dispatch(getGrowthModelActivities(growthProject.id, filterSettings));
        });
      }
    });
  };

  const showStatus = (value) => {
    switch (value) {
      case "Selected":
        return (
          <div className="mr-0 status-selected">
            <span className="mr-0 w-100 rounded-10"></span>
          </div>
        );
      case "Purchased":
        return (
          <div className="mr-0 status-purchased">
            <span className="mr-0 w-100 rounded-10"></span>
          </div>
        );
      case "In Progress":
        return (
          <div className="mr-0 status-in-progress">
            <span className="mr-0 w-100 rounded-10"></span>
          </div>
        );
      case "Completed":
        return (
          <div className="mr-0 status-completed">
            <span className="mr-0 w-100 rounded-10"></span>
          </div>
        );

      default:
        break;
    }
  };

  /*******************
  @Purpose : To load more data
  @Parameter : {}
  @Author : YLIWAY
  ******************/
  const loadMore = () => {
    setFilterSettings((state) => ({
      ...state,
      page: filterSettings.page + 1,
    }));
    setExecutive(true);
  };

  const handlePreviousBtn = () => {
    if (growthProject?.isDeleted) {
      dispatch(setGrowthProject(null, 1))
    } else {
      dispatch(setGrowthProject(growthProject?.id, 2, growthProject))
    }
  }

  return (
    <div className="growth-modal-step-4">
      <div className="px-3 bg-white">
        <div className="d-flex pb-2 pt-3  align-items-center">
          <h6 className="font-20 mb-0">
            {lang("GROWTH_MODEL.GM_STEPFOUR_GROWTH_DASHBOARD")}
          </h6>
          <Button
            variant="outline-info"
            className="d-flex ml-auto filter-btn align-items-center"
            onClick={() => {
              setShowFilters(!showFilters);
            }}
          >
            <span class="material-icons font-20">filter_alt</span>
            <span className="ml-auto pr-3 pl-1 ">{lang("COMMON.FILTERS")}</span>
          </Button>
        </div>

        {showFilters && (
          <Filters
            setFilterSettings={setFilterSettings}
            filterSettings={filterSettings}
            setTypeOptions={setTypeOptions}
            optionsSkill={optionsSkill}
            optionsStatus={optionsStatus}
            setExecutive={setExecutive}
            initFilterSettings={initFilterSettings}
          />
        )}

        <div className="d-flex my-3">
          <div className="status-selected">
            <span></span> Selected
          </div>
          <div className="status-purchased">
            <span></span> Purchased
          </div>
          <div className="status-in-progress">
            <span></span> In Progress
          </div>
          <div className="status-completed">
            <span></span> Completed
          </div>
        </div>

        {/* Automatic Filled Skill Table : START */}
        <div className="compilation-table-wrap mt-sm-0 mt-4">
          <Table className="compilation-table bg-white table-responsive-lg">
            <thead>
              <tr>
                <th className="w-230">
                  {lang("GROWTH_MODEL.GM_STEPFOUR_TITLE")}
                </th>
                <th className="text-center">
                  {lang("GROWTH_MODEL.GM_STEPFOUR_AUTHOR")}
                </th>
                <th className="text-center">
                  {lang("GROWTH_MODEL.GM_STEPFOUR_ACTIVITY")}
                </th>
                <th className="text-center">
                  {lang("GROWTH_MODEL.GM_STEPFOUR_DATETIME")}
                </th>
                <th className="text-center">
                  {lang("GROWTH_MODEL.GM_STEPFOUR_YC")}
                </th>
                <th className="text-center">
                  {lang("GROWTH_MODEL.GM_STEPFOUR_STATUS")}
                </th>
                <th className="text-center">
                  {lang("GROWTH_MODEL.GM_STEPFOUR_ACTION")}
                </th>
              </tr>
            </thead>
            {growthProject?.isDeleted && growthModelDetail?.deleted?.length > 0 ?
              <tbody>
                {growthModelDetail?.deleted?.map((deletedData) => {
                  return deletedData?.activities?.map((list, i) => {
                    return (
                      <tr key={list?.id}>
                        <td className="align-middle pl-3 pr-0">
                          {list.activity_title}
                        </td>
                        <td className="align-middle pl-3 pr-0 text-center">
                          {list.author ? list.author : lang("COMMON.NA")}
                        </td>
                        <td className="align-middle pl-3 pr-0 text-center">
                          {list.activity_type?.charAt(0).toUpperCase() +
                            list.activity_type?.slice(1).split("-").join(" ")}
                        </td>
                        <td className="align-middle pl-3 pr-0 text-center">
                          {lang("COMMON.NA")}
                        </td>
                        <td className="align-middle pl-3 pr-0 text-center">
                          {list.price ? list.price : lang("COMMON.NA")}
                        </td>
                        <td className="align-middle pl-3 pr-0 text-center">
                          {showStatus(list?.activity_status)}
                        </td>
                        <td className="align-middle pl-3 pr-0 text-center">
                          <div className="d-flex ">
                            <a
                              className={`circle-inner-icons ml-0 ${list.activityLink !== null ? "green" : "red"
                                } pointer`}
                              target="_blank"
                              href={list.activityLink}
                            >
                              <i className="bx bx-log-in-circle"></i>
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                })}
              </tbody>

              :
              <tbody>
                {growthModelActivities?.rows?.length > 0 ? (
                  growthModelActivities.rows.map((list, i) => {
                    return (
                      <tr key={list?.id}>
                        <td className="align-middle pl-3 pr-0">
                          {list.activityTitle}
                        </td>
                        <td className="align-middle pl-3 pr-0 text-center">
                          {list.author ? list.author : lang("COMMON.NA")}
                        </td>
                        <td className="align-middle pl-3 pr-0 text-center">
                          {list.activityType.charAt(0).toUpperCase() +
                            list.activityType.slice(1).split("-").join(" ")}
                        </td>
                        <td className="align-middle pl-3 pr-0 text-center">
                          {lang("COMMON.NA")}
                        </td>
                        <td className="align-middle pl-3 pr-0 text-center">
                          {list.freePrice ? list.freePrice : lang("COMMON.NA")}
                        </td>
                        <td className="align-middle pl-3 pr-0 text-center">
                          {showStatus(list?.activityStatus)}
                        </td>
                        <td className="align-middle pl-3 pr-0 text-center">
                          <div className="d-flex ">
                            <a
                              className={`circle-inner-icons ml-0 ${list.activityLink !== null ? "green" : "red"
                                } pointer`}
                              target="_blank"
                              href={list.activityLink}
                            >
                              <i className="bx bx-log-in-circle"></i>
                            </a>
                            <div
                              className="circle-inner-icons pointer"
                              onClick={() =>
                                deleteGMRow(list?.id, list?.activityId)
                              }
                            >
                              <i className="bx bx-x"></i>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={8}>
                      {" "}
                      {lang("GROWTH_MODEL.GM_STEPFOUR_NO_RESULT")}{" "}
                    </td>
                  </tr>
                )}
              </tbody>

            }
          </Table>
          {growthModelActivities?.rows?.length <
            growthModelActivities.total && (
              <Row>
                <Col sm={12} className=" mt-3">
                  <Button
                    variant="outline-info"
                    type="button"
                    onClick={() => loadMore()}
                  >
                    {lang("COMMON.LOAD_MORE")}
                  </Button>
                </Col>
              </Row>
            )}
          <div className="d-flex py-3">
            <Button
              variant="outline-info px-4 w-sm-150"
              onClick={() => dispatch(toggleModals({ addmoreactivity: true }))}
            >
              <em className="icon icon-plus-primary font-14 pr-2"></em>
              {lang("GROWTH_MODEL.GM_STEPFOUR_ADD_MORE")}
            </Button>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between mt-2">
        <Button
          type="button"
          variant="btn btn-btn btn-outline-gray font-weight-noramal my-sm-2 my-0"
          onClick={() => handlePreviousBtn()}
        >
          <span className="bx bx-left-arrow-alt previous-icon"></span>
          {lang("GROWTH_MODEL.GM_PREVIOUS_BUTTON")}
        </Button>
        {/* 
        // Removed as per figma
        <Button
          type="button"
          variant="btn btn-btn btn-outline-gray font-weight-noramal my-sm-2 my-0"
          onClick={() =>
            dispatch(setGrowthProject(growthProject?.id ?? "", 1, growthProject))
          }
        >
          {lang("GROWTH_MODEL.GM_SUBMIT_BUTTON")}
        </Button> */}
      </div>
    </div>
  );
}

export default StepFour;
