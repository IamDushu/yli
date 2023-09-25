import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Card, Col, Form, Row, Button } from "react-bootstrap";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { LanguageList } from "store/actions/room";
import { getSkillType } from "store/actions/skills";
import { debounce } from "lodash";
import { useTranslation } from "react-i18next";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import AsyncSelect from "react-select/async";

const FilterCourse = ({ getCourses, clearFilters }) => {
  const dispatch = useDispatch();
  const [lang] = useTranslation("language");
  /******************** 
@purpose : Used for use State
@Parameter : {  }
@Author : INIC
******************/

  const [langOptions, setLangOptions] = useState([]);
  const [courseTypeSelect, setCourseTypeSelect] = useState([]);
  const [skillsOptions, setSkillsOptions] = useState([]);
  const [show, setShow] = useState(false);
  const [courseSearch, setCourseSearch] = useState("");
  const [searchFields, setSearchFields] = useState({
    selectSkills: { value: null, label: lang("COMMON.SELECT_OPTION") },
    selectLevel: { value: null, label: lang("COMMON.SELECT_OPTION") },
    selectLanguage: { value: null, label: lang("COMMON.SELECT_OPTION") },
    selectSubTitle: { value: null, label: lang("COMMON.SELECT_OPTION") },
    selectRating: { value: null, label: lang("COMMON.SELECT_OPTION") },
    selectSortBy: { value: null, label: lang("COMMON.SELECT_OPTION") },
  });
  /******************** 
@purpose : Used for use selector
@Parameter : {  }
@Author : INIC
******************/
  const { languageList } = useSelector((state) => state.room);
  const { skillType } = useSelector((state) => state.skillReducer);

  /******************** 
@purpose : Used for use effect
@Parameter : {  }
@Author : INIC
******************/

  useEffect(() => {
    dispatch(LanguageList());
    dispatch(getSkillType(null, "profile"));
  }, []);

  /******************** 
    @purpose : Get Course List
    @Parameter : { }
    @Author : INIC
    ******************/
  useEffect(() => {
    getCourses("searchText", courseSearch);
  }, [courseSearch]);

  /******************** 
@purpose : Used for course type
@Parameter : {  }
@Author : INIC
******************/
  const courseType = [
    { value: "online", label: lang("ROOMS_FILTER.ONLINE_COURSE") },
    { value: "offline", label: lang("ROOMS_FILTER.OFFLINE_COURSE") },
    { value: "other", label: lang("ROOMS_FILTER.OTHER_COURSE") },
  ];

  const Courselevel = [
    { value: null, label: lang("COMMON.SELECT_OPTION") },
    { value: "basic", label: lang("ROOMS_FILTER.BASIC") },
    { value: "intermediate", label: lang("ROOMS_FILTER.INTERMEDIATE") },
    { value: "hard", label: lang("ROOMS_FILTER.HARD") },
  ];

  const Subtitle = [
    { value: null, label: lang("COMMON.SELECT_OPTION") },
    { value: "true", label: lang("ROOMS_FILTER.TRUE") },
    { value: "false", label: lang("ROOMS_FILTER.FALSE") },
  ];

  /******************** 
@purpose : Used for ratings
@Parameter : {  }
@Author : INIC
******************/
  const ratings = [
    { value: null, label: lang("COMMON.SELECT_OPTION") },
    { value: 0, label: 0 },
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
  ];

  /******************** 
@purpose : Used for price options
@Parameter : {  }
@Author : INIC
******************/
  const priceOptions = [
    { value: null, label: lang("COMMON.SELECT_OPTION") },
    { value: "low", label: lang("ROOMS_FILTER.SORT_BY.LOW_PRICE") },
    { value: "high", label: lang("ROOMS_FILTER.SORT_BY.HIGH_PRICE") },
  ];

  /******************** 
@purpose : Used for get Languages
@Parameter : {  }
@Author : INIC
******************/

  const getLanguages = () => {
    const languages = [];
    languageList.map((langData) => {
      languages.push({ label: langData.name, value: langData.name });
      setLangOptions(languages);
    });
  };
  /******************** 
    @purpose : Used for course search
    @Parameter : { course }
    @Author : INIC
    ******************/
  const searchCourse = useCallback(
    debounce((value) => {
      setCourseSearch(value);
    }, 100)
  );
  const getSkillTypeData = () => {
    const skillTypeArray = [];
    skillType.map((langData) => {
      skillTypeArray.push({
        label: langData.name,
        value: langData.name,
      });
      setSkillsOptions(skillTypeArray);
    });
  };

  const loadOptions = (inputValue, callback) => {
    if (!inputValue) {
      callback([]);
    } else {
      setTimeout(() => {
        dispatch(
          getSkillType(null, "skills", null, {
            page: 1,
            pagesize: 100,
            searchText: inputValue,
          })
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

  const getDropdownButtonLabel = ({ placeholderButtonLabel }) => {
    return (
      <Fragment>
        <div
          className={
            courseTypeSelect?.length
              ? "text-secondary d-flex align-items-center justify-content-between w-100"
              : "text-gray"
          }
        >
          {courseTypeSelect?.length
            ? `${courseTypeSelect[0]?.value} courses`
            : "Select"}
          <span className="text-gray font-12">{`${
            courseTypeSelect.length > 1
              ? ` & ${courseTypeSelect?.length - 1} more`
              : ""
          } `}</span>
        </div>
        <em className="icon icon-down-arrow-grey"></em>
      </Fragment>
    );
  };
  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  return (
    <Fragment>
      <Card className="mb-3 mt-3 mt-md-0 mb-md-4">
        <Card.Header className="pr-2 pl-0 py-1">
          <div className="d-flex align-items-center">
            <div className="common-searchbar w-100">
              <Form.Group
                controlId="formSearch"
                className="position-relative mb-0"
              >
                <Form.Control
                  type="text"
                  value={courseSearch}
                  placeholder={lang("ROOMS_FILTER.SEARCH_PLACEHOLDER")}
                  className="border-0"
                  onChange={(e) => {
                    searchCourse(e.target.value);
                  }}
                />
                <div className="search-inner-icon">
                  <em className="bx bx-search"></em>
                </div>
              </Form.Group>
            </div>
            <div
              className="d-flex border-left border-geyser border-top-0 border-bottom-0  w-auto my-1 pl-3 pr-2 pointer"
              onClick={() => setShow(!show)}
            >
              <img
                src={"/assets/images/icon-filter.svg"}
                alt="filter"
                width="20"
                height="20"
                className="m-auto"
              />
              <span className="text-primary font-weight-normal mx-2">
                {lang("ROOMS_FILTER.FILTERS")}
              </span>
            </div>
          </div>
        </Card.Header>
        {show && (
          <Card.Body className="border-top border-dark">
            <div className="video-search-list border-0 w-100 p-0 df">
              <Form className="courses-filter">
                <Row>
                  <Col md={4} lg={3}>
                    <Form.Group controlId="courseType">
                      <Form.Label>
                        {lang("ROOMS_FILTER.COURSE_TYPE")}
                      </Form.Label>
                      <div className="custom-multiselectcheck-courses">
                        <ReactMultiSelectCheckboxes
                          options={courseType}
                          value={courseTypeSelect}
                          getDropdownButtonLabel={getDropdownButtonLabel}
                          defaultValue={courseTypeSelect}
                          onChange={(e) => {
                            const values = e.map((data) => data?.value);
                            if (values.length) getCourses("courseType", values);
                            else getCourses("courseType", "");
                            setCourseTypeSelect(
                              values.map((value) => {
                                return {
                                  value: value,
                                  label: `${value} courses`,
                                };
                              })
                            );
                          }}
                          placeholder={lang("COMMON.SELECT")}
                        />
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={4} lg={3}>
                    <Form.Group controlId="ratings">
                      <Form.Label>{lang("ROOMS_FILTER.LEVEL")}</Form.Label>
                      <div className="custom-selectpicker-xs">
                        <Select
                          placeholder={lang("COMMON.SELECT")}
                          value={searchFields.selectLevel}
                          options={Courselevel}
                          onChange={(e) => {
                            getCourses("courseLevel", e.value);
                            setSearchFields((prevState) => {
                              return {
                                ...prevState,
                                selectLevel: {
                                  value: e.value,
                                  label: e.label,
                                },
                              };
                            });
                          }}
                          styles={{
                            placeholder: (defaultStyles) => {
                              return {
                                ...defaultStyles,
                                color: "#999",
                              };
                            },
                          }}
                        />
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={4} lg={3}>
                    <Form.Group controlId="language">
                      <Form.Label>{lang("ROOMS_FILTER.LANGUAGE")}</Form.Label>
                      <div className="custom-selectpicker-xs">
                        <Select
                          name="language"
                          placeholder={lang("COMMON.SELECT")}
                          value={searchFields.selectLanguage}
                          options={langOptions}
                          onMenuOpen={getLanguages}
                          onChange={(e) => {
                            getCourses("language", e.value);
                            setSearchFields((prevState) => {
                              return {
                                ...prevState,
                                selectLanguage: {
                                  value: e.value,
                                  label: e.label,
                                },
                              };
                            });
                          }}
                        />
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={4} lg={3}>
                    <Form.Group controlId="ratings">
                      <Form.Label>{lang("ROOMS_FILTER.SUBTITLES")}</Form.Label>
                      <div className="custom-selectpicker-xs">
                        <Select
                          name="subtitle"
                          placeholder={lang("COMMON.SELECT")}
                          value={searchFields.selectSubTitle}
                          options={Subtitle}
                          onChange={(e) => {
                            getCourses("subtitles", e.value);
                            setSearchFields((prevState) => {
                              return {
                                ...prevState,
                                selectSubTitle: {
                                  value: e.value,
                                  label: e.label,
                                },
                              };
                            });
                          }}
                        />
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={4} lg={3}>
                    <Form.Group controlId="ratings">
                      <Form.Label>{lang("ROOMS_FILTER.RATINGS")}</Form.Label>
                      <div className="custom-selectpicker-xs">
                        <Select
                          value={searchFields.selectRating}
                          options={ratings}
                          placeholder={lang("COMMON.SELECT")}
                          onChange={(e) => {
                            getCourses("rating", e.value);
                            setSearchFields((prevState) => {
                              return {
                                ...prevState,
                                selectRating: {
                                  value: e.value,
                                  label: e.label,
                                },
                              };
                            });
                          }}
                        />
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={4} lg={3}>
                    <Form.Group controlId="ratings">
                      <Form.Label>
                        {lang("ROOMS_FILTER.SORT_BY.SORT_BY")}
                      </Form.Label>
                      <div className="custom-selectpicker-xs">
                        <Select
                          options={priceOptions}
                          value={searchFields.selectSortBy}
                          placeholder={lang("COMMON.SELECT")}
                          onChange={(e) => {
                            getCourses("sortByPrice", e.value);
                            setSearchFields((prevState) => {
                              return {
                                ...prevState,
                                selectSortBy: {
                                  value: e.value,
                                  label: e.label,
                                },
                              };
                            });
                          }}
                        />
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={4} lg={3}>
                    <Form.Group controlId="ratings">
                      <Form.Label>{lang("COMMON.SKILLS")}</Form.Label>
                      <div className="custom-selectpicker">
                        <AsyncSelect
                          value={searchFields.selectSkills}
                          // options={skillsOptions}
                          onMenuOpen={getSkillTypeData}
                          onChange={async (selected) => {
                            await setSearchFields({
                              ...searchFields,
                              selectSkills: selected,
                            });
                            getCourses("skills", [selected?.value] || []);
                          }}
                          cacheOptions
                          loadOptions={loadOptions}
                          noOptionsMessage={() =>
                            lang("SKILLS.NO_SKILL_OPTIONS")
                          }
                          defaultOptions
                        />
                      </div>
                    </Form.Group>
                  </Col>

                  {(courseTypeSelect.some(
                    (option) => option.value === "online"
                  ) ||
                    courseTypeSelect.some(
                      (option) => option.value === "offline"
                    )) && (
                    <>
                      <Col md={4} lg={3}></Col>
                      <Col md-3></Col>
                    </>
                  )}
                  <Col
                    md={4}
                    lg={3}
                    className="my-auto d-flex justify-content-start"
                    style={{ marginLeft: "auto" }}
                  >
                    <Button
                      variant="link"
                      className="pl-0 text-info "
                      onClick={() => {
                        clearFilters();
                        setCourseTypeSelect([]);
                        setSearchFields({
                          ...searchFields,
                          selectLevel: {
                            value: null,
                            label: lang("COMMON.SELECT_OPTION"),
                          },
                          selectLanguage: {
                            value: null,
                            label: lang("COMMON.SELECT_OPTION"),
                          },
                          selectSubTitle: {
                            value: null,
                            label: lang("COMMON.SELECT_OPTION"),
                          },
                          selectRating: {
                            value: null,
                            label: lang("COMMON.SELECT_OPTION"),
                          },
                          selectSortBy: {
                            value: null,
                            label: lang("COMMON.SELECT_OPTION"),
                          },
                          selectSkills: {
                            value: null,
                            label: lang("COMMON.SELECT_OPTION"),
                          },
                        });
                        searchCourse("");
                      }}
                    >
                      {lang("COMMON.CLEAR_FILTERS")}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Card.Body>
        )}
      </Card>
    </Fragment>
  );
};
export default FilterCourse;
