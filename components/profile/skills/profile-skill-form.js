import React, { useState, useEffect } from "react";
import { Button, Form, Card, FormText } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { SelectField } from "../../form-fields";
import {
  addSkillData,
  endorseRequest,
  getSkillArea,
  getSkillsData,
  getSkillType,
  getSkillUserList,
  updateSkillData,
} from "store/actions/skills";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { selectUserInfo } from "store/selectors/user";
import { ADD_SKILL_FORM } from "utils";
import { AsyncSelectField } from "components/form-fields/select-field";
import AsyncSelect from "react-select/async";
import { getGrowthPartnerList, getMyConnectionsList } from "store/actions";

/******************** 
  @purpose :Profile Skill Form
  @Parameter : { }
  @Author : INIC
  ******************/
const ProfileSkillForm = ({
  closePopupHandler,
  popupInfo: { data, isEdit },
}) => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const { skillArea, skillType, skillUserList } = useSelector(
    (state) => state.skillReducer
  );

  const userInfo = useSelector(selectUserInfo);
  const [skillAreaOptions, setSkillAreaOptions] = useState([]);
  const [skillTypeOptions, setSkillTypeOptions] = useState([]);
  const [connectionSelected, setConnectionSelected] = useState(null);

  /******************** 
  @purpose :Add/Update Delete Skill Data
  @Parameter : { }
  @Author : INIC
  ******************/
  const initialValues = {
    skillArea: data?.skillArea || "",
    skillType: data?.skillType || "",
    userId: userInfo.id,
    typeOfConnection: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ADD_SKILL_FORM(lang),
    onSubmit: async (values) => {
      if (data?.id) {
        dispatch(
          updateSkillData(
            {
              skillArea: data?.skillArea,
              skillType: values?.selected_skillType?.label,
              userId: userInfo.id,
              operationType: "update",
            },
            data?.id
          )
        ).then(({ createdOrUpdatedSkillId }) => {
          if (createdOrUpdatedSkillId)
            requestForEndorse(createdOrUpdatedSkillId);
          dispatch(getSkillsData()).then(() => {
            closePopupHandler();
          });
        });
      } else {
        dispatch(
          addSkillData({
            skillArea: values?.selected_skillArea?.label,
            skillType: values?.selected_skillType?.label,
            userId: userInfo.id,
            operationType: "add",
          })
        ).then(({ createdOrUpdatedSkillId }) => {
          if (createdOrUpdatedSkillId)
            requestForEndorse(createdOrUpdatedSkillId);
          dispatch(getSkillsData()).then(() => {
            closePopupHandler();
          });
        });
      }
    },
  });
  function requestForEndorse(userSkillId) {
    if (connectionSelected?.value) {
      dispatch(
        endorseRequest({
          connectionUserIds: [connectionSelected?.value],
          userSkillIds: [userSkillId],
        })
      );
    }
  }
  useEffect(() => {
    dispatch(getSkillArea());
  }, [formik?.values?.skillArea, formik?.values?.userType]);

  /******************** 
@purpose : Used for get skill Type
@Parameter : {  }
@Author : INIC
******************/
  const getSkillAreaData = () => {
    const skillAreaArray = [];
    skillArea.map((langData) => {
      skillAreaArray.push({
        label: langData.name,
        value: langData.id,
      });
      setSkillAreaOptions(skillAreaArray);
    });
  };

  /******************** 
@purpose : Used for get skill type
@Parameter : {  }
@Author : INIC
******************/
  const getSkillTypeData = () => {
    const skillTypeArray = [];
    skillType.map((langData) => {
      skillTypeArray.push({
        label: langData.name,
        value: langData.id,
      });
      setSkillTypeOptions(skillTypeArray);
    });
  };

  /*******************
  @Purpose : To load author options
  @Parameter : {}
  @Author : Yliway
  ******************/
  const loadOptions = (inputValue, callback) => {
    if (!inputValue) {
      callback([]);
    } else {
      setTimeout(() => {
        dispatch(
          getSkillType(
            data?.id
              ? data?.skillArea === "Hard Skills"
                ? 6
                : data?.skillArea === "Soft Skills"
                ? 1
                : 2
              : formik?.values?.skillArea,
            "skills",
            null,
            {
              page: 1,
              pagesize: 100,
              searchText: inputValue,
            }
          )
        ).then((res) => {
          const skillList = [];
          res.map((data) => {
            skillList.push({
              label: `${data?.name}`,
              value: data?.id,
            });
          });

          callback(skillList);
        });
      }, 500);
    }
  };

  useEffect(() => {
      setConnectionSelected(null);
  }, [formik.values.typeOfConnection]);

  const loadConnectionOptions = (inputValue, callback) => {
    if (!inputValue) {
      callback([]);
    } else {
      setTimeout(() => {
        if (formik?.values?.typeOfConnection === lang("COMMON.CONNECTIONS")) {
          dispatch(
            getMyConnectionsList({
              page: 1,
              pagesize: 20,
              search: inputValue || "",
            })
          ).then((res) => {
            const connectionList = [];
            res?.payload?.map((data) => {
              connectionList.push({
                label: `${data?.firstName || ""} ${data?.lastName || ""}`,
                value: data?.userId,
              });
            });

            callback(connectionList);
          });
        } else {
          dispatch(
            getGrowthPartnerList({
              page: 1,
              pagesize: 20,
              searchText: inputValue || "",
            })
          ).then((res) => {
            const connectionList = [];
            res?.data?.rows?.map(({ users }) => {
              connectionList.push({
                label: `${users?.firstName || ""} ${users?.lastName || ""}`,
                value: users?.id,
              });
            });

            callback(connectionList);
          });
        }
      }, 500);
    }
  };
  const typeOfConnectionOptions = [
    { label: lang("COMMON.CONNECTIONS"), value: lang("COMMON.CONNECTIONS") },
    {
      label: lang("COMMON.GROWTH_CONNECTIONS"),
      value: lang("COMMON.GROWTH_CONNECTIONS"),
    },
  ];
  return (
    <>
      <Card className="card-md border-top-0 rounded-0">
        <Card.Body className="p-3">
          <Form>
            <Form.Group controlId="formEditExpEmpType">
              <div className="custom-selectpicker">
                <SelectField
                  menuPortalTarget={document?.querySelector("body")}
                  classNamePrefix={"custom-select"}
                  loadingMessage={() => lang("COMMON.LOADING")}
                  noOptionsMessage={() => lang("COMMON.NO_OPTIONS")}
                  isDisabled={data?.id ? true : false}
                  defaultValue={
                    data?.skillArea
                      ? {
                          label: data?.skillArea,
                          value: data?.skillArea,
                        }
                      : null
                  }
                  placeholder={lang("COMMON.SELECT")}
                  options={skillAreaOptions}
                  label={lang("SKILLS.FORM.SKILL_AREA")}
                  onMenuOpen={getSkillAreaData}
                  maxMenuHeight={170}
                  required={true}
                  name="skillArea"
                  formik={formik}
                />
              </div>
            </Form.Group>
            <Form.Group controlId="formEditExpEmpType">
              <Form.Label>{lang("SKILLS.FORM.SKILL_TYPE")} *</Form.Label>
              <div className="custom-selectpicker">
                <AsyncSelect
                  value={formik?.values["selected_skillType"]}
                  defaultValue={
                    data?.skillType
                      ? {
                          value: data?.skillType,
                          label: data?.skillType,
                        }
                      : null
                  }
                  placeholder={lang("COMMON.SELECT")}
                  loadingMessage={() => lang("COMMON.LOADING")}
                  onChange={(selected) => {
                    formik?.setFieldValue("selected_skillType", selected);
                    formik?.setFieldValue("skillType", selected.value);
                  }}
                  isDisabled={!formik.values.skillArea}
                  // cacheOptions
                  loadOptions={loadOptions}
                  noOptionsMessage={({ inputValue }) =>
                    inputValue
                      ? lang("COMMON.NO_OPTIONS")
                      : lang("SKILLS.SEARCH_FOR_SKILLS")
                  }
                  defaultOptions
                />
                {formik?.touched["skillType"] &&
                  formik?.errors["skillType"] && (
                    <FormText className={"error"}>
                      {formik?.errors["skillType"]}
                    </FormText>
                  )}
              </div>
            </Form.Group>
            <Form.Group controlId="formEditExpEmpType">
              <div className="custom-selectpicker">
                <SelectField
                  menuPortalTarget={document?.querySelector("body")}
                  classNamePrefix={"custom-select"}
                  placeholder={lang("COMMON.SELECT")}
                  options={typeOfConnectionOptions}
                  label={lang("SKILLS.FORM.APPLY_FILTER")}
                  maxMenuHeight={170}
                  required={false}
                  formik={formik}
                  name="typeOfConnection"
                  noOptionsMessage={() => lang("COMMON.NO_OPTIONS")}
                />
              </div>
            </Form.Group>
            {/* connection search */}
            <Form.Group controlId="formEditExpEmpType">
              <Form.Label>
                {lang("SKILLS.FORM.REQUEST_FOR_RECOMMENDATION")}
              </Form.Label>
              <div className="custom-selectpicker">
                <AsyncSelect
                  loadingMessage={() => lang("COMMON.LOADING")}
                  value={connectionSelected}
                  defaultValue={connectionSelected}
                  onChange={(selected) => {
                    setConnectionSelected(selected);
                  }}
                  loadOptions={loadConnectionOptions}
                  placeholder={lang("COMMON.SELECT")}
                  isDisabled={formik?.values?.typeOfConnection ? false : true}
                  noOptionsMessage={({ inputValue }) =>
                    inputValue
                      ? lang("COMMON.NO_OPTIONS")
                      : lang("SKILLS.SEARCH_FOR_CONNECTIONS")
                  }
                  defaultOptions
                />
              </div>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
      <div className="custom-footer d-flex justify-content-end">
        <Button
          variant="btn border-divider-color font-weight-semibold mb-md-0 mr-3"
          onClick={() => closePopupHandler()}
        >
          {lang("COMMON.CANCEL")}
        </Button>
        <Button
          onClick={formik.handleSubmit}
          variant="btn btn-info font-weight-semibold px-24"
          type="button"
        >
          {lang("COMMON.SAVE")}
        </Button>
      </div>
    </>
  );
};

export default ProfileSkillForm;
