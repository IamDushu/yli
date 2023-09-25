import React, { useEffect, useRef, useState } from "react";
import { Col, Collapse, Dropdown, Row } from "react-bootstrap";
/******************** 
  @purpose :People You May Know Filter
  @Parameter : {}
  @Author : INIC
  ******************/
const PYMKFilter = ({ applyFilterFn, filterSettings }) => {
  const [showFilter, setShowFilter] = useState(false);

  const [toggleFilterOptions, setToggleFilterOptions] = useState({
    availability: false,
    category: false,
    goal: false,
    skill: false,
    professionField: false,
    nation: false,
    profession: false,
    city: false,
  });

  const filterRef = useRef(null);

  const openFilter = "icon icon-down-arrow-grey text-dark pr-2 font-14";
  const closeFilter = "icon icon-right-angle-arrow font-26 text-charcoal-grey";

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target) &&
        showFilter === true
      ) {
        setShowFilter(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterRef]);

  const filterList = {
    availability: {
      name: "Availibility",
      options: [],
    },
    category: {
      name: "Category",
      options: ["User", "Teacher", "Trainer", "Host", "Coach"],
    },
    goal: {
      name: "Goals",
      options: [],
    },
    skill: {
      name: "Skills",
      options: [],
    },
    professionField: {
      name: "Professional Fields",
      options: [],
    },
    nation: {
      name: "Nation",
      options: [],
    },
    profession: {
      name: "Professions",
      options: [],
    },
    city: {
      name: "City",
      options: [],
    },
  };

  return (
    <Row>
      <Col md={{ span: 5, offset: 7 }}>
        <div className="ml-auto d-flex align-items-center justify-content-end people-you-may-know-filter">
          <h5 className="font-12 mb-sm-0 mb-4 text-right pr-2">Filter By</h5>
          <Dropdown
            show={showFilter}
            className="theme-dropdown dropdown-secondary mx-sm-2 mb-sm-0 mb-4"
            ref={filterRef}
          >
            <Dropdown.Toggle
              className="bg-gary-light px-4 font-14 py-3 text-gary"
              onClick={() => {
                setShowFilter((prev) => !prev);
              }}
            >
              Select
              <em className="icon icon-down-arrow text-charcoal-grey pl-5"></em>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {Object.keys(filterList).map((key, index) => (
                <Dropdown.Item>
                  <div
                    key={index}
                    className="pointer"
                    onClick={() => {
                      toggleFilterOptions[key] = !toggleFilterOptions[key];
                      setToggleFilterOptions({
                        ...toggleFilterOptions,
                      });
                    }}
                  >
                    {filterList[key].name}
                    <span className="float-right">
                      {" "}
                      <em
                        className={
                          toggleFilterOptions[key] ? openFilter : closeFilter
                        }
                      ></em>{" "}
                    </span>
                  </div>
                  <Collapse in={toggleFilterOptions.category}>
                    <ul className="listing-section pt-3 listing-content-between border-first-0">
                      {filterList[key].options.map((v, i) => (
                        <li className="py-2 border-0 d-flex" key={i}>
                          <div className="custom-checkbox w-25-px checkbox-blue">
                            <label
                              htmlFor="check1"
                              className="mb-0"
                              onClick={() => {
                                applyFilterFn(v, key);
                              }}
                            >
                              <input
                                type="checkbox"
                                name="csscheckbox"
                                id="check1"
                                autoComplete="off"
                                checked={
                                  filterSettings[key].includes(v) ? true : false
                                }
                              />
                              <span className="top--15"></span>
                            </label>
                          </div>
                          <div className="ml-2">
                            <p
                              className="font-14 font-weight-light text-gary mb-0"
                              onClick={() => {
                                applyFilterFn(v, key);
                              }}
                            >
                              {v}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </Collapse>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Col>
    </Row>
  );
};

export default PYMKFilter;
