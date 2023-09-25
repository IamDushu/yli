import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import AsyncSelect from "react-select/async";
import {
  addGrowthModal,
  clearActivityPayload,
  deleteGrowthProject,
  getProfession,
  setGrowthProfession,
  setGrowthProject,
  storeJobType,
  storeProfessionData,
  updateGrowthModal,
} from "store/actions/growth";
import {
  clearBlockData,
  clearSkillData,
  clearSkillType,
} from "store/actions/skills";
import Swal from "sweetalert2";
import { setCookie, showMessageNotification } from "utils";

const ExploreMoreModal = dynamic(() => import("../explore-more-modal"));
const MainModal = dynamic(() =>
  import("components/modal").then((mod) => mod.MainModal)
);

function ChooseProfession({ setShowDepartment }) {
  const [lang] = useTranslation("language");
  const [jobType, setJobType] = useState();
  const {
    growthModelDetail,
    professionStepOne,
    jobTypeStepOne,
    growthProfession,
  } = useSelector((state) => state.growth);

  const dispatch = useDispatch();

  const setJobTypeValue = (value) => {
    dispatch(storeJobType(value));
    setJobType(value);
    dispatch(clearSkillType());
    dispatch(clearBlockData());
    dispatch(clearActivityPayload());
  };

  setCookie("jobtype", jobTypeStepOne);

  const { exploremoreprofessions } = useSelector(
    ({ ui }) => ui.modals,
    shallowEqual
  );

  const professionDropdown = (value) => {
    dispatch(clearSkillType());
    dispatch(clearBlockData());
    dispatch(clearActivityPayload());
    dispatch(storeProfessionData(value));
  };

  const selectProfessionFunction = (professionalField, value, elementId) => {
    dispatch(clearSkillType());
    dispatch(clearBlockData());
    dispatch(clearActivityPayload());
    dispatch(
      storeProfessionData({
        value: elementId,
        label: value,
      })
    );
  };

  useEffect(() => {
    dispatch(clearSkillData());
    setJobTypeValue("professional");
    dispatch(setGrowthProject("", ""));
  }, []);

  const clickHandler = () => {
    if (!_.isEmpty(professionStepOne) || !_.isEmpty(growthProfession)) {
      dispatch(
        addGrowthModal({
          jobType: jobTypeStepOne,
        })
      ).then((res) => {
        if (res?.data?.id) {
          let body = {
            id: res?.data?.id,
            profession_field: professionStepOne?.value ?? growthProfession?.id,
            profession: professionStepOne?.label ?? growthProfession?.name,
            compilation_method: "automatic",
            job_type: jobTypeStepOne,
          };
          dispatch(updateGrowthModal(body));
          dispatch(setGrowthProfession({}));
          dispatch(storeProfessionData());
          setJobType(undefined);
        }
      });
    } else {
      showMessageNotification(lang("GROWTH_MODEL.GM_STEPONE_SELECT_JOBTYPE"));
    }
  };

  const deleteGrowthProjectFn = (growthModelDetailDataId) => {
    Swal.fire({
      text: lang("GROWTH_MODEL.DELETE_GM_PROJECT"),
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: lang("GROWTH_MODEL.YES"),
      denyButtonText: lang("GROWTH_MODEL.NO"),
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteGrowthProject(growthModelDetailDataId));
        dispatch(setGrowthProject("", ""));
        dispatch(storeProfessionData());
      }
    });
  };

  const loadOptionsProfession = (inputValue, callback) => {
    if (!inputValue) {
      callback([]);
    } else {
      setTimeout(() => {
        let data = {
          parentId: 1,
          search: inputValue.toLowerCase(),
          departmentId: growthProfession?.departmentId,
        };
        dispatch(getProfession(data)).then((result) => {
          if (result?.length > 0) {
            const professionOptionsX = result.map((element) => ({
              value: element.id,
              label: element.name,
            }));
            callback(professionOptionsX);
          } else {
            callback([]);
          }
        });
      }, 500);
    }
  };

  return (
    <React.Fragment>
      <div className="px-3">
        <h4 className="h6 mb-3">
          {lang("GROWTH_MODEL.GM_STEPONE_PROFESSION")}
        </h4>
        <div className="growth-profession-box p-4">
          <div className="d-flex">
            <Form.Group
              controlId="createAutoSelectProfession"
              className="w-100"
            >
              <Form.Label>
                {lang("GROWTH_MODEL.GM_STEPONE_PROFESSION_DROPDOWN")}
              </Form.Label>
              <div className="custom-selectpicker">
                <AsyncSelect
                  value={
                    professionStepOne ?? {
                      value: growthProfession?.id,
                      label: growthProfession?.name,
                    }
                  }
                  placeholder={lang("GROWTH_MODEL.GM_STEPONE_PROFESSION")}
                  onChange={(e) => professionDropdown(e)}
                  loadOptions={loadOptionsProfession}
                  noOptionsMessage={() =>
                    lang("GROWTH_MODEL.GM_STEPONE_PROFESSION")
                  }
                />
              </div>
            </Form.Group>
            <div className="mt-4 pt-1 text-right w-20">
              <Button
                variant="outline-dark"
                onClick={() => {
                  setShowDepartment(true);
                  // dispatch(toggleModals({ exploremoreprofessions: true }))
                }}
                className="text-capitalize explore-btn"
              >
                {lang("GROWTH_MODEL.GM_STEPONE_EXPLOREMORE")}
              </Button>
              <Button
                variant="info"
                onClick={() => clickHandler()}
                className="ml-auto add-project-btn mt-2"
              >
                {lang("GROWTH_MODEL.GM_STEPONE_ADD_PROJECT")}
              </Button>
            </div>
          </div>
        </div>

        <>
          <Card className="mt-5">
            <Card.Body>
              <h4 className="h6  mb-3">
                {lang("GROWTH_MODEL.GM_STEPONE_PROJECTS")}
              </h4>
              <Row className="growth-projects">
                {growthModelDetail && growthModelDetail?.models && (
                  <React.Fragment>
                    {growthModelDetail.models?.map((growthModelDetailData) => (
                      <Col sm={3}>
                        <div className="growth-project">
                          <div className="growth-project-header">
                            <span className="growth-project-title">
                              {growthModelDetailData?.profession ||
                                lang("COMMON.NA")}
                            </span>

                            <span className="growth-project-index">
                              {
                                growthModelDetailData?.activities?.[0]
                                  ?.activityTitle
                              }
                            </span>
                          </div>
                          <div className="growth-project-body"></div>
                          <div className="growth-project-footer">
                            <div
                              className="growth-project-open"
                              onClick={() =>
                                dispatch(
                                  setGrowthProject(
                                    growthModelDetailData?.id,
                                    growthModelDetailData?.currentStep || 2,
                                    growthModelDetailData
                                  )
                                )
                              }
                            >
                              Open
                            </div>
                            <div
                              className="growth-project-delete"
                              onClick={() =>
                                deleteGrowthProjectFn(growthModelDetailData?.id)
                              }
                            >
                              Delete
                            </div>
                          </div>
                        </div>
                      </Col>
                    ))}
                    <Col sm={3}>
                      <div className="growth-project">
                        <div className="growth-project-header">
                          <span className="growth-project-title">OPR</span>
                          <span className="growth-project-index">
                            Other activities
                          </span>
                        </div>
                        <div className="growth-project-body py-3 pl-2 font-12">
                          Activities from old GP
                          <span className="font-weight-bold px-1">
                            {growthModelDetail?.deleted?.length || 0}
                          </span>
                          <br />
                          Activities out of one of GP
                          <span className="font-weight-bold px-1">
                            {growthModelDetail?.deleted?.length || 0}
                          </span>
                        </div>
                        <div className="growth-project-footer">
                          <div
                            className="growth-project-open-single"
                            onClick={() =>
                              dispatch(
                                setGrowthProject(null, 3, { isDeleted: true })
                              )
                            }
                          >
                            Open
                          </div>
                        </div>
                      </div>
                    </Col>
                  </React.Fragment>
                )}
              </Row>
            </Card.Body>
          </Card>
        </>
      </div>
      <MainModal
        className="explore-more-professions"
        show={exploremoreprofessions}
        keyModal="exploremoreprofessions"
        header={lang("GROWTH_MODEL.FIND_YOUR_PROFESSION")}
        body={
          <ExploreMoreModal
            selectProfessionFunction={selectProfessionFunction}
            selectedProfession={professionStepOne}
          />
        }
        headerClassName="mb-50 block md-mb-30 font-weight-bold"
      />
    </React.Fragment>
  );
}

export default ChooseProfession;
