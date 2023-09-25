import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { getAuthorName } from "store/actions";

const Filters = ({ initFilterSettings, setFilterSettings }) => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const [authorSearch, setAuthorSearch] = useState("");
  const initFilterOptions = {
    authorId: null,
    role: null,
    rating: null,
    sortByPrice: null,
    type: null,
  };
  const [filterOptions, setFilterOptions] = useState(initFilterOptions);

  const acitivityTypeOptions = [
    {
      label: "Online Courses",
      value: "online",
    },
    {
      label: "Offline Courses",
      value: "offline",
    },
    {
      label: "Other Courses",
      value: "other",
    },
    {
      label: "Master Class",
      value: "master-class",
    },
    {
      label: "Webinar",
      value: "webinar",
    },
    {
      label: "BN Room",
      value: "business-network-rrom",
    },
    {
      label: "Coaching Room",
      value: "coaching-room",
    },
    {
      label: "Training Room",
      value: "training-room",
    },
    {
      label: "Event",
      value: "event",
    },
  ];

  const creatorOptions = [
    {
      label: "Teacher",
      value: "Teacher",
    },
    {
      label: "Host",
      value: "Host",
    },
    {
      label: "Coach",
      value: "Coach",
    },
    {
      label: "Learning Institute",
      value: "Learning Institute",
    },
  ];
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

  const { filterActivityType, filterAuthors } = useSelector(
    ({ growth }) => growth
  );

  useEffect(() => {
    setActDropdown();
  }, [filterActivityType]);

  // adds activitytype data in state to show in dropdown
  const setActDropdown = async () => {
    if (filterActivityType?.length > 0) {
      filterActivityType?.forEach((element) => {
        if (activityType?.length === filterActivityType?.length) {
          return;
        } else {
          activityType.push({
            value: element.value,
            label: element.label,
          });
        }
      });
      setactivityType(() => [...activityType]);
    }
  };

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

  /*******************
  @Purpose : To set filter options
  @Parameter : {value, type}
  @Author : Yliway
  ******************/
  const setFilterOptionsFn = (value, type) => {
    switch (type) {
      case "rating":
        setFilterOptions((state) => ({ ...state, rating: value }));
        break;
      case "price":
        setFilterOptions((state) => ({ ...state, sortByPrice: value }));
        break;
      case "role":
        setFilterOptions((state) => ({ ...state, role: [value] }));
        break;
      case "author":
        setFilterOptions((state) => ({ ...state, authorId: value }));
        break;
      case "activity":
        setFilterOptions((state) => ({ ...state, type: value }));
        break;

      default:
        break;
    }
  };

  /*******************
  @Purpose : To execute filter
  @Parameter : {}
  @Author : Yliway
  ******************/
  const executeFn = () => {
    setFilterSettings((state) => ({ ...state, ...filterOptions }));
  };

  /*******************
  @Purpose : To clear filter
  @Parameter : {}
  @Author : Yliway
  ******************/
  const clearFilterFn = () => {
    setAuthorSearch(null);
    setFilterSettings({ ...initFilterSettings });
    setFilterOptions({ ...initFilterOptions });
  };

  return (
    <Card className="w-100 mb-3">
      <Card.Body>
        <div className="d-flex font-14 font-weight-bold mb-3 w-100">
          {lang("COMMON.FILTERS")}
        </div>
        <Row>
          <Col sm={3}>
            <Form.Group>
              <Form.Label htmlFor="activity-type-filter">
                Activity Type
              </Form.Label>
              <div className="custom-selectpicker-xs cc">
                <Select
                  placeholder={lang("GROWTH_MODEL.GM_POPUP_FILTER_AT")}
                  id="activity-type-filter"
                  options={acitivityTypeOptions}
                  value={
                    acitivityTypeOptions.find(
                      (acitivity) => acitivity.value === filterOptions.type
                    ) || { label: "", value: "" }
                  }
                  onChange={(e) => setFilterOptionsFn(e.value, "activity")}
                />
              </div>
            </Form.Group>
          </Col>
          <Col sm={3}>
            <Form.Group>
              <Form.Label htmlFor="peer-producer-filter">Creator</Form.Label>
              <div className="custom-selectpicker-xs cc">
                <Select
                  id="peer-producer-filter"
                  options={creatorOptions}
                  value={{
                    label: filterOptions.role?.[0] || "",
                    value: filterOptions.role?.[0] || "",
                  }}
                  onChange={(e) => setFilterOptionsFn(e.value, "role")}
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
                      (price) => price.value === filterOptions.sortByPrice
                    ) || { label: "", value: "" }
                  }
                  onChange={(e) => setFilterOptionsFn(e.value, "price")}
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
                    label: filterOptions.rating || "",
                    value: filterOptions.rating || "",
                  }}
                  onChange={(e) => setFilterOptionsFn(e.value, "rating")}
                />
              </div>
            </Form.Group>
          </Col>
          <Col sm={3}>
            <Form.Group>
              <Form.Label htmlFor="author-filter">Author</Form.Label>
              <div className="custom-selectpicker-xs cc">
                <AsyncSelect
                  isClearable
                  cacheOptions
                  value={authorSearch?.value ? authorSearch : ""}
                  placeholder={lang("GROWTH_MODEL.GM_POPUP_FILTER_SA")}
                  loadOptions={loadAuthorOptions}
                  onChange={(e) => {
                    setAuthorSearch(e);
                    setFilterOptionsFn(e?.value || null, "author");
                  }}
                />
              </div>
            </Form.Group>
          </Col>
          <Col sm={3} className="my-auto">
            <Button
              variant="link"
              className="pl-0 text-info"
              onClick={clearFilterFn}
            >
              Clear filters
            </Button>
          </Col>
          <Col sm={6} className="my-auto">
            <Button
              variant="outline-info"
              onClick={executeFn}
              className="float-right"
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
