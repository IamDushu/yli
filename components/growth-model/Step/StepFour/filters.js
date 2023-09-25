import React, { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { getAuthorName } from "store/actions";
import { growthModelResourceFilterOptions } from "utils";

const Filters = ({
  setFilterSettings,
  setTypeOptions,
  filterSettings,
  optionsSkill,
  optionsStatus,
  setExecutive,
  initFilterSettings,
}) => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const { filterAuthors } = useSelector(({ growth }) => growth);
  const [authorSearch, setAuthorSearch] = useState("");
  const priceOptions = [
    {
      label: "Low to High",
      value: "low",
    },
    {
      label: "Hight to Low",
      value: "high",
    },
  ];
  const ratingOptions = [
    {
      label: "1",
      value: "1",
    },
    {
      label: "2",
      value: "2",
    },
    {
      label: "3",
      value: "3",
    },
    {
      label: "4",
      value: "4",
    },
    {
      label: "5",
      value: "5",
    },
  ];

  /*******************
  @Purpose : To load author options
  @Parameter : {}
  @Author : Yliway
  ******************/
  const loadAuthorOptions = async (inputText, callback) => {
    try {
      dispatch(getAuthorName({ searchText: inputText }));
      callback(
        filterAuthors?.rows?.map((authorListData) => ({
          label: `${authorListData.name}`,
          value: authorListData?.id,
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="w-100">
      <Card.Body>
        <div className="d-flex font-14 font-weight-bold mb-3 w-100">
          {lang("COMMON.FILTERS")}
        </div>
        <Row>
          <Col sm={3}>
            <Form.Group>
              <Form.Label htmlFor="skills-filter">Skills</Form.Label>
              <div className="custom-selectpicker-xs cc">
                <Select
                  id="skills-filter"
                  options={growthModelResourceFilterOptions}
                  onChange={(e) => {
                    setFilterSettings((state) => ({
                      ...state,
                      resource: e.value,
                    }));
                    setTypeOptions(e.value);
                  }}
                  value={{
                    label: filterSettings.resource,
                    value: filterSettings.resource,
                  }}
                />
              </div>
            </Form.Group>
          </Col>

          <Col sm={3}>
            <Form.Group>
              <Form.Label htmlFor="activity-type-filter">
                Activity Type
              </Form.Label>
              <div className="custom-selectpicker-xs cc">
                <Select
                  placeholder={lang("GROWTH_MODEL.GM_POPUP_FILTER_AT")}
                  id="activity-type-filter"
                  options={optionsSkill}
                  onChange={(e) =>
                    setFilterSettings((state) => ({
                      ...state,
                      acitivityType: e.value,
                    }))
                  }
                  value={{
                    label: filterSettings.acitivityType,
                    value: filterSettings.acitivityType,
                  }}
                />
              </div>
            </Form.Group>
          </Col>
          <Col sm={3}>
            <Form.Group>
              <Form.Label htmlFor="status-filter">Status</Form.Label>
              <div className="custom-selectpicker-xs cc">
                <Select
                  id="peer-producer-filter"
                  options={optionsStatus}
                  onChange={(e) =>
                    setFilterSettings((state) => ({
                      ...state,
                      status: e.value,
                    }))
                  }
                  value={{
                    label:
                      filterSettings.status === "inProgress"
                        ? "In Progess"
                        : filterSettings.status,
                    value: filterSettings.status,
                  }}
                />
              </div>
            </Form.Group>
          </Col>
          <Col sm={3}>
            <Form.Group>
              <Form.Label htmlFor="price-filter">Price</Form.Label>
              <div className="custom-selectpicker-xs cc">
                <Select
                  id="price-filter"
                  options={priceOptions}
                  value={
                    priceOptions.find(
                      (price) => price.value === filterSettings.sortByPrice
                    ) || { label: "", value: "" }
                  }
                  onChange={(e) =>
                    setFilterSettings((state) => ({
                      ...state,
                      sortByPrice: e.value,
                    }))
                  }
                />
              </div>
            </Form.Group>
          </Col>
          <Col sm={3}>
            <Form.Group>
              <Form.Label htmlFor="rating-filter">Rating</Form.Label>
              <div className="custom-selectpicker-xs cc">
                <Select
                  id="rating-filter"
                  options={ratingOptions}
                  value={{
                    label: filterSettings.rating || "",
                    value: filterSettings.rating || "",
                  }}
                  onChange={(e) =>
                    setFilterSettings((state) => ({
                      ...state,
                      rating: e.value,
                    }))
                  }
                />
              </div>
            </Form.Group>
          </Col>
          <Col sm={3}>
            <Form.Group>
              <Form.Label htmlFor="author-filter">Author</Form.Label>
              <div className="custom-selectpicker-xs cc">
                <AsyncSelect
                  cacheOptions
                  value={authorSearch?.value ? authorSearch : ""}
                  placeholder={lang("GROWTH_MODEL.GM_POPUP_FILTER_SA")}
                  loadOptions={loadAuthorOptions}
                  onChange={(e) => {
                    setAuthorSearch(e);
                    setFilterSettings((state) => ({
                      ...state,
                      author: [e?.value],
                    }));
                  }}
                />
              </div>
            </Form.Group>
          </Col>
          <Col sm={3} className="my-auto">
            <Button
              variant="link"
              className="pl-0 text-info"
              onClick={() => {
                setFilterSettings({
                  ...initFilterSettings,
                });
                setAuthorSearch("");
                setExecutive(true);
              }}
            >
              Clear filters
            </Button>
          </Col>
          <Col sm={3} className="my-auto">
            <Button
              variant="outline-info"
              className="float-right"
              onClick={() => {
                setFilterSettings((state) => ({
                  ...state,
                  page: 1,
                }));
                setExecutive(true);
              }}
            >
              {lang("COMMON.EXECUTE")}
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Filters;
