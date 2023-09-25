import { APP_URL } from "config";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  addEditGrowthModelSelectedSkills,
  addGrowthModelActivities,
  deleteGrowthModelActivities,
  getGrowthModelSelectedSkills,
  setGrowthProject,
  deleteGrowthModelUserActivities,
} from "store/actions";
import {
  activityListData,
  getSkillAreaPost,
  setSkillsActData,
} from "store/actions/skills";
import { companySkillAreaOptions } from "utils";
import ActivityTable from "./StepTwo/activity-table";
import Filters from "./StepTwo/filters";
import Skills from "./StepTwo/skills";

function StepTwo() {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();

  const [skillArea, setSkillArea] = useState({});
  const [projectArea, setProjectArea] = useState({});
  const [projectAreaOptions, setProjectAreaOptions] = useState([]);
  const [skillAreaOptions, setSkillAreaOptions] = useState([]);
  const [skillsSelected, setSkillsSelected] = useState([]);
  const [skillsSelectedToView, setSkillsSelectedToView] = useState([]);
  const [combinedSkillsSelected, setCombinedSkillsSelected] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const initFilterSettings = {
    page: 1,
    pageSize: 10,
  };
  const [filterSettings, setFilterSettings] = useState(initFilterSettings);
  const { skillArea: skillAreaData, skillActivityList } = useSelector(
    (state) => state?.skillReducer
  );
  const { growthModelDetail, growthProject, selectedSkills } = useSelector(
    (state) => state.growth
  );

  useEffect(() => {
    setSkillsSelected(selectedSkills);
  }, [selectedSkills]);

  useEffect(() => {
    dispatch(setGrowthProject(growthProject?.id, 2, growthProject));
    return () => { }; //cleanup function when the page unmounts
  }, []);

  useEffect(() => {
    if (growthModelDetail?.models) {
      setProjectArea(growthModelDetail[0]);
      const optionsArray = [];
      for (const optionData of growthModelDetail?.models) {
        optionsArray.push({ value: optionData, label: optionData.profession });
      }
      setProjectAreaOptions(optionsArray);
    }
  }, [growthModelDetail]);

  const { skillType } = useSelector((state) => state?.skillReducer);
  useEffect(() => {
    if (growthProject?.job_type === "employee") {
      dispatch(getSkillAreaPost({ type: "company" }));
    } else if (growthProject?.job_type === "professional") {
      dispatch(getSkillAreaPost({ type: "professional" }));
    }
    if (_.isEmpty(projectArea) && growthProject?.id) {
      setProjectArea({ value: growthProject, label: growthProject.profession });
    }
    if (!_.isEmpty(growthProject)) {
      dispatch(getGrowthModelSelectedSkills(growthProject?.id));
    }
  }, [growthProject]);

  useEffect(() => {
    if (skillType.length > 0) {
      let arr = [];
      skillType.forEach((value) => {
        if (value.isSelected) {
          arr.push(value.name);
        }
      });
      if (arr.length > 0) {
        setSkillsSelected([...arr]);
      }
      if (selectedSkills?.length > 0) {
        setSkillsSelected(selectedSkills);
      }
    } else {
      setSkillsSelected([]);
    }
  }, [skillType]);

  /******************* 
  @purpose : Set Skill area options
  @Author : YLIWAY
  ******************/
  useEffect(() => {
    let options = [];
    skillAreaData.forEach((element) => {
      if (growthModelDetail?.job_type === "employee") {
        if (companySkillAreaOptions?.includes(element?.name)) {
          options.push({
            label: element?.name || "",
            value: element?.id || "",
          });
        }
      } else {
        options.push({
          label: element?.name || "",
          value: element?.id || "",
        });
      }
    });
    setSkillAreaOptions(options);
    setSkillArea({
      ...options[0],
    });
  }, [skillAreaData]);

  /******************* 
  @purpose : To fetch activities on selection of skills
  @Author : YLIWAY
  ******************/
  useEffect(() => {
    const combinedSkillsData = new Set([
      ...(skillsSelected || []),
      ...(skillsSelectedToView || []),
    ]);
    setCombinedSkillsSelected([...combinedSkillsData]);
    if (skillsSelected?.length > 0 || skillsSelectedToView?.length > 0) {
      setFilterSettings({
        ...filterSettings,
        pageSize: 10,
      });
    } else {
      dispatch(setSkillsActData({}));
    }
  }, [skillsSelected, skillsSelectedToView]);

  useEffect(() => {
    if (
      (skillsSelected && skillsSelected?.length > 0) ||
      (skillsSelectedToView && skillsSelectedToView?.length > 0)
    ) {
      getActivitiesFromSkills();
    }
  }, [filterSettings]);

  /******************* 
  @purpose : To get activities
  @Author : YLIWAY
  ******************/
  const getActivitiesFromSkills = () => {
    // dispatch(clearAuthorName());
    dispatch(
      activityListData({
        skills: combinedSkillsSelected,
        page: filterSettings.page,
        pagesize: filterSettings.pageSize,
        ...(filterSettings?.authorId !== undefined &&
          filterSettings?.authorId !== null && {
          authorId: filterSettings?.authorId,
        }),
        ...(filterSettings?.role !== undefined &&
          filterSettings?.role !== null && {
          role: filterSettings?.role,
        }),
        ...(filterSettings?.rating !== undefined &&
          filterSettings?.rating !== null && {
          rating: filterSettings?.rating,
        }),
        ...(filterSettings?.sortByPrice !== undefined &&
          filterSettings?.sortByPrice !== null && {
          sortByPrice: filterSettings?.sortByPrice,
        }),
        ...(filterSettings?.type !== undefined &&
          filterSettings?.type !== null && {
          type: filterSettings?.type,
        }),
      })
    );
    // dispatch(getAuthorName(filterSettings));
  };

  /******************* 
  @purpose : To go back to product selection
  @Author : YLIWAY
  ******************/
  const prevHandler = () => {
    dispatch(setGrowthProject(growthProject?.id ?? "", 1, growthProject));
  };

  /******************* 
  @purpose : To go next 
  @Author : YLIWAY
  ******************/
  const nextHandler = () => {
    const payloadData = {
      skills: skillsSelected,
      growthModelId: growthProject?.id,
    };
    dispatch(addEditGrowthModelSelectedSkills(payloadData));
    dispatch(setGrowthProject(growthProject?.id, 3, growthProject));
  };

  /******************* 
  @purpose : To select/unselect skills
  @Author : YLIWAY
  ******************/
  const onClickSkills = (value) => {
    let temp_skills = skillsSelected || [];
    if (temp_skills?.includes(value)) {
      temp_skills.splice(temp_skills.indexOf(value), 1);
    } else {
      temp_skills?.push(value);
    }
    const payloadData = {
      skills: temp_skills,
      growthModelId: growthProject?.id,
    };
    dispatch(addEditGrowthModelSelectedSkills(payloadData));
    setSkillsSelected([...temp_skills]);
  };

  const onClickSkillsToView = (value) => {
    let temp_skills = skillsSelectedToView;
    if (skillsSelectedToView?.includes(value)) {
      skillsSelectedToView.splice(skillsSelectedToView.indexOf(value), 1);
    } else {
      skillsSelectedToView.push(value);
    }
    setSkillsSelectedToView([...temp_skills]);
  };
  /******************* 
  @purpose : To select skill area
  @Author : YLIWAY
  ******************/
  const onSelectSkillArea = (e) => {
    if (skillArea?.value !== e.value) {
      setSkillArea(e);
      setSkillsSelected([]);
      setSkillsSelectedToView([]);
      setFilterSettings({
        ...filterSettings,
        pageSize: 10,
      });
    }
  };

  /******************* 
  @purpose : To select project area
  @Author : YLIWAY
  ******************/
  const onSelectProjectArea = (e) => {
    dispatch(setGrowthProject(e?.value?.id, 1, e?.value));
    setSkillsSelected([]);
    setSkillsSelectedToView([]);
    setFilterSettings({
      ...filterSettings,
      pageSize: 10,
    });
  };

  /******************* 
  @purpose : To add activity in growth model
  @Author : YLIWAY
  ******************/
  const addToGrowthModel = async (data, check) => {
    let name = data?.courseType ? "Courses" : data?.virtualEventType;
    let url =
      data?.courseType === "offline" || data?.courseType === "online"
        ? APP_URL + "/course-detail/" + data?.id
        : data?.courseType === "other"
          ? data?.personalWebsiteLink
          : data?.virtualEventType
            ? APP_URL + "/virtual-events/" + data?.id
            : "";

    let gmAId = "";
    if (check) {
      let gmPayload = {
        skillArea: skillArea?.label,
        skillTypes: [
          {
            typeName: name,
            data: [
              {
                activityTitle: data?.title,
                activityId: data?.id,
                activityLink: url,
                professionField: growthProject?.profession_field,
              },
            ],
          },
        ],
      };
      let payloadBody = {
        growthModelId: growthProject?.id,
        activities: [gmPayload],
      };
      let result = await dispatch(addGrowthModelActivities(payloadBody));

      await getActivitiesFromSkills();

      gmAId = result?.id;
      // add activity id in table when done from api
    } else {
      if (data?.gmActivityId !== undefined) {
        await dispatch(deleteGrowthModelActivities(data?.gmActivityId));
        await dispatch(deleteGrowthModelUserActivities(data?.gmActivityId));
      }
      await getActivitiesFromSkills();
    }

    if (name === "Courses") {
      skillActivityList.courseDetails.rows.map((item) => {
        if (item.id === data.id) {
          item["isSelected"] = check;
          if (check) {
            item["gmActivityId"] = gmAId;
          }
        }
      });
    }
    if (name === data?.virtualEventType) {
      skillActivityList.virtualEvenDetails.rows.map((item) => {
        if (item.id === data.id) {
          item["isSelected"] = check;
          if (check) {
            item["gmActivityId"] = gmAId;
          }
        }
      });
    }
    dispatch(setSkillsActData(skillActivityList));

    if (data?.skills && data?.skills[0]) {
      let payloadData = {};
      if (!skillsSelected?.includes(data?.skills[0])) {
        payloadData = {
          skills: [...(skillsSelected || []), data?.skills[0]],
          growthModelId: growthProject?.id,
        };
        dispatch(addEditGrowthModelSelectedSkills(payloadData));
      }
    }
  };

  /******************* 
  @purpose : To load more content
  @Author : YLIWAY
  ******************/
  const loadMoreActivities = () => {
    filterSettings.pageSize = filterSettings?.pageSize + 10;
    setFilterSettings({
      ...filterSettings,
    });
  };

  return (
    <div className="growth-modal-step-2">
      {Object.keys(skillArea).length > 0 && skillArea?.value !== "" && (
        <>
          <div className="bg-white">
            <div className="step-2-heading px-3 py-3">
              <Form.Group
                controlId="formSearch"
                className="position-relative mb-0"
              >
                <label>
                  <h6 className="font-20">
                    {lang("GROWTH_MODEL.GM_STEPTWO_SELECT_PROJECT")}
                  </h6>
                </label>
                <div
                  className="custom-selectpicker-xs cc"
                  style={{ maxWidth: "250px" }}
                >
                  <Select
                    placeholder={lang("GROWTH_MODEL.GM_STEPTWO_SELECT_PROJECT")}
                    options={projectAreaOptions}
                    onChange={onSelectProjectArea}
                    value={projectArea}
                  />
                </div>
              </Form.Group>

              <Form.Group
                controlId="formSearch"
                className="position-relative mb-0 px-5"
              >
                <label>
                  <h6 className="font-20">
                    {lang("GROWTH_MODEL.GM_STEPTWO_SELECT_SKILL_AREA")}
                  </h6>
                </label>
                <div
                  className="custom-selectpicker-xs cc"
                  style={{ maxWidth: "250px", width: "250px" }}
                >
                  <Select
                    placeholder={lang(
                      "GROWTH_MODEL.GM_STEPTWO_SELECT_SKILL_AREA"
                    )}
                    options={skillAreaOptions}
                    onChange={onSelectSkillArea}
                    value={skillArea}
                  />
                </div>
              </Form.Group>
            </div>
            {selectedSkills?.length > 0 && (
              <div className="grid px-3 py-3">
                <div className="row px-3">
                  <label>
                    <h6 className="font-20">Selected Skills</h6>
                  </label>
                </div>
                <div class="row card-deck">
                  {selectedSkills?.map((selectedSkillsData) => {
                    return (
                      <div class="mb-3">
                        <div class="card border-0 mr-0 text-uppercase">
                          <div class="py-1 px-2 font-12 bg-primary text-white rounded">
                            {selectedSkillsData}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <div className="step-2-skills px-3 mb-4">
              <Skills
                skillArea={skillArea}
                skillsSelected={skillsSelected}
                skillsSelectedToView={skillsSelectedToView}
                onClickSkills={onClickSkills}
                onClickSkillsToView={onClickSkillsToView}
              />
            </div>
          </div>
          {skillActivityList && (
            <div className="step-2-growth-activities p-3 bg-white">
              <div className="d-flex mb-3 align-items-center pt-1">
                <h6 className="font-20 mb-0">
                  {lang("GROWTH_MODEL.GM_STEPTWO_GROWTH_ACTIVITIES")}
                </h6>
                <Button
                  variant="outline-info"
                  className="d-flex ml-auto filter-btn  align-items-center"
                  onClick={() => {
                    setShowFilters(!showFilters);
                  }}
                >
                  <span class="material-icons font-20">filter_alt</span>
                  <span className="ml-auto pr-3 pl-1 ">
                    {lang("COMMON.FILTERS")}
                  </span>
                </Button>
              </div>
              {showFilters && (
                <Filters
                  initFilterSettings={initFilterSettings}
                  filterSettings={filterSettings}
                  setFilterSettings={setFilterSettings}
                />
              )}

              <ActivityTable
                activitiesData={skillActivityList}
                addToGM={addToGrowthModel}
                loadMore={loadMoreActivities}
              />
            </div>
          )}
        </>
      )}

      <div className="menual-step-two position-relative">
        <div className="border-top d-flex justify-content-between border-geyser pt-2">
          <Button
            variant="btn btn-outline-gray font-weight-semibold pointer"
            onClick={() => prevHandler()}
          >
            <span className="bx bx-left-arrow-alt previous-icon"></span>
            {lang("GROWTH_MODEL.GM_PREVIOUS_BUTTON")}
          </Button>
          <Button
            variant="btn btn-info font-weight-semibold d-flex align-items-center"
            onClick={() => nextHandler()}
          >
            {lang("GROWTH_MODEL.GM_NEXT_BUTTON")}
            <span className="bx bx-right-arrow-alt next-icon"></span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default StepTwo;
