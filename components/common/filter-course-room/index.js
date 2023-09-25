import React, { Fragment, useState, useEffect } from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import Select from "react-select";
import { Range } from "react-range";
import { useDispatch, useSelector } from "react-redux";
import { LanguageList } from "store/actions/room";
import { getSkillType } from "store/actions/skills";
import { useTranslation } from "react-i18next";

const Filter = ({ body, setBody, show, setShow }) => {
  const dispatch = useDispatch();
  const [lang] = useTranslation("language");
  /******************** 
@purpose : Used for use State
@Parameter : {  }
@Author : INIC
******************/
  const [rangeValue, setRangeValue] = useState([1]);
  const [langOptions, setLangOptions] = useState([]);
  const [skillsOptions, setSkillsOptions] = useState([]);
  const [searchFields, setSearchFields] = useState({
    selectSkills: null,
    selectLanguage: null,
    selectRating: null,
    selectSortBy: null,
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
@purpose : Used for price options
@Parameter : {  }
@Author : INIC
******************/
  const priceOptions = [
    { value: "low", label: lang("ROOMS_FILTER.SORT_BY.LOW_PRICE") },
    { value: "high", label: lang("ROOMS_FILTER.SORT_BY.HIGH_PRICE") },
  ];
  /******************** 
@purpose : Used for ratings
@Parameter : {  }
@Author : INIC
******************/
  const ratings = [
    { value: 0, label: 0 },
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
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
  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  return (
    <Fragment>
      <Card className="mb-4 mt-md-0 mt-3">
        <Card.Header className="pr-2 pl-0 py-1">
          <div className="d-flex align-items-center">
            <div className="common-searchbar w-100">
              <Form.Group
                controlId="formSearch"
                className="position-relative mb-0"
              >
                <Form.Control
                  type="text"
                  value={body.searchText}
                  placeholder={lang("ROOMS_FILTER.SEARCH_PLACEHOLDER")}
                  className="border-0"
                  onChange={(e) => {
                    setBody({ ...body, searchText: e.target.value });
                  }}
                />
                <div className="search-inner-icon">
                  <em className="bx bx-search"></em>
                </div>
              </Form.Group>
            </div>

            <div
              className="d-flex border-left border-geyser border-top-0 border-bottom-0  w-auto my-1 pl-3 pr-3 pointer"
              onClick={() => setShow(!show)}
            >
              <img
                src={"/assets/images/icon-filter.svg"}
                alt="filter"
                width="20"
                height="20"
                className="m-auto"
              />
              <span className="text-primary font-weight-normal ml-2">
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
                    <Form.Group controlId="ratings">
                      <Form.Label>
                        {lang("ROOMS_FILTER.SORT_BY.SORT_BY")}
                      </Form.Label>
                      <div className="custom-selectpicker-xs">
                        <Select
                          value={searchFields.selectSortBy}
                          options={priceOptions}
                          onChange={(e) => {
                            setBody({
                              ...body,
                              sortByPrice: e.value,
                            });
                            setSearchFields((prevState) => {
                              return {
                                ...prevState,
                                selectSortBy: {
                                  value: e.value,
                                  label:
                                    e.label.charAt(0).toUpperCase() +
                                    e.label.slice(1),
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
                          onChange={(e) => {
                            setBody({
                              ...body,
                              rating: e.value,
                            });
                            setSearchFields((prevState) => {
                              return {
                                ...prevState,
                                selectRating: {
                                  value: e.value,
                                  label: e.value,
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
                      <Form.Label>{lang("ROOMS_FILTER.SKILLS")}</Form.Label>
                      <div className="custom-selectpicker-xs">
                        <Select
                          value={searchFields.selectSkills}
                          options={skillsOptions}
                          onMenuOpen={getSkillTypeData}
                          onChange={(e) => {
                            setBody({
                              ...body,
                              skills: e.value,
                            });
                            setSearchFields((prevState) => {
                              return {
                                ...prevState,
                                selectSkills: {
                                  value: e.value,
                                  label:
                                    e.label.charAt(0).toUpperCase() +
                                    e.label.slice(1),
                                },
                              };
                            });
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
                          value={searchFields.selectLanguage}
                          options={langOptions}
                          onMenuOpen={getLanguages}
                          onChange={(e) => {
                            setBody({
                              ...body,
                              language: e.value.toLowerCase(),
                            });
                            setSearchFields((prevState) => {
                              return {
                                ...prevState,
                                selectLanguage: {
                                  value: e.value,
                                  label:
                                    e.label.charAt(0).toUpperCase() +
                                    e.label.slice(1),
                                },
                              };
                            });
                          }}
                        />
                      </div>
                    </Form.Group>
                  </Col>
                  <Col
                    md={4}
                    lg={3}
                    className="my-auto d-flex justify-content-end"
                    style={{ marginLeft: "auto" }}
                  >
                    <Button
                      variant="link"
                      className="pl-0 text-info"
                      onClick={() => {
                        setBody({
                          pagesize: 10,
                          searchText: "",
                        });
                        setSearchFields({
                          selectLanguage: null,
                          selectSkills: null,
                          selectRating: null,
                          selectSortBy: null,
                        });
                        setRangeValue([1]);
                      }}
                    >
                      Clear filters
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
export default Filter;
