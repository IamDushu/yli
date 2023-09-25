import React from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "@components/layout";
import { Container, Form, Card, Row, Col, Button } from "react-bootstrap";
import Datetime from "react-datetime";
import Select from "react-select";

const SelectCompanyType = () => {
  const [lang] = useTranslation("language");

  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  const options = [
    { value: "Italy", label: "Italy" },
    { value: "India", label: "India" },
  ];

  const inputProps = {
    placeholder: "Select",
  };
  return (
    <Layout>
      <div className="inner-wrapper select-company-box">
        <Container>
          <div className="mb-3">
            <h1 className="font-weight-bold font-23 d-flex heading-text mb-0">
              Create Your own Business Page
            </h1>
          </div>

          <Card>
            <Card.Body className="p-0">
              <div className="border-bottom border-geyser p-4 position-relative text-center">
                <h2 className="font-23 font-md-20 mb-0">
                  Choose Your Company Type
                </h2>
              </div>
              <div className="p-4">
                <Row>
                  <Col md={12}>
                    <Row>
                      <Col md={6} className="mb-30">
                        <div className="custom-radio custom-radio-outline h-100">
                          <label
                            htmlFor="small-company"
                            className="select-company"
                          >
                            <input
                              type="radio"
                              name="courses-training"
                              id="small-company"
                              autoComplete="off"                              
                            />
                            <span className="invisible"></span>
                            <div className="border border-geyser select-company-box rounded-8">
                              <div>
                                <picture className="video-image">
                                  <source
                                    srcSet={
                                      "../assets/images/business/small-company.svg"
                                    }
                                    type="image/svg"
                                  />
                                  <img
                                    src={
                                      "../assets/images/business/small-company.svg"
                                    }
                                    alt="Small Company"
                                    width="100"
                                    height="100"
                                  />
                                </picture>
                                <h3 className="font-18 font-md-16 font-weight-semibold mt-4 mb-1">
                                  Small Company
                                </h3>
                                <h5 className="font-16 font-weight-semibold text-gray font-md-14">
                                  (Below 200 employees)
                                </h5>
                              </div>
                            </div>
                          </label>
                        </div>
                      </Col>
                      <Col md={6} className="mb-30">
                        <div className="custom-radio custom-radio-outline h-100">
                          <label
                            htmlFor="large-company"
                            className="select-company"
                          >
                            <input
                              type="radio"
                              name="courses-training"
                              id="large-company"
                              autoComplete="off"
                            />
                            <span className="invisible"></span>
                            <div className="border border-geyser select-company-box rounded-8">
                              <div>
                                <picture className="video-image">
                                  <source
                                    srcSet={
                                      "../assets/images/business/company.svg"
                                    }
                                    type="image/svg"
                                  />
                                  <img
                                    src={
                                      "../assets/images/business/company.svg"
                                    }
                                    alt="Medium and Large Company"
                                    width="100"
                                    height="100"
                                  />
                                </picture>
                                <h3 className="font-18 font-md-16 font-weight-semibold mt-4 mb-1">
                                  Medium / Large Company
                                </h3>
                                <h5 className="font-16 font-weight-semibold text-gray font-md-14">
                                  (Below 200 employees)
                                </h5>
                              </div>
                            </div>
                          </label>
                        </div>
                      </Col>
                      <Col md={6} className="mb-md-30">
                        <div className="custom-radio custom-radio-outline h-100">
                          <label
                            htmlFor="university"
                            className="select-company"
                          >
                            <input
                              type="radio"
                              name="courses-training"
                              id="university"
                              autoComplete="off"                              
                            />
                            <span className="invisible"></span>
                            <div className="border border-geyser select-company-box rounded-8">
                              <div>
                                <picture className="video-image">
                                  <source
                                    srcSet={
                                      "../assets/images/business/university.svg"
                                    }
                                    type="image/svg"
                                  />
                                  <img
                                    src={
                                      "../assets/images/business/university.svg"
                                    }
                                    alt="School, Collage, Institute, University"
                                    width="100"
                                    height="100"
                                  />
                                </picture>
                                <h3 className="font-18 font-md-16 font-weight-semibold mt-4 mb-1">
                                  Scool, Collage, Institute, University
                                </h3>
                              </div>
                            </div>
                          </label>
                        </div>
                      </Col>
                      <Col md={6} className="mb-md-30">
                        <div className="custom-radio custom-radio-outline h-100">
                          <label
                            htmlFor="no-profit-orgnization"
                            className="select-company"
                          >
                            <input
                              type="radio"
                              name="courses-training"
                              id="no-profit-orgnization"
                              autoComplete="off"
                            />
                            <span className="invisible"></span>
                            <div className="border border-geyser select-company-box rounded-8">
                              <div>
                                <picture className="video-image">
                                  <source
                                    srcSet={
                                      "../assets/images/business/non-profit-orgnization.svg"
                                    }
                                    type="image/svg"
                                  />
                                  <img
                                    src={
                                      "../assets/images/business/non-profit-orgnization.svg"
                                    }
                                    alt="Non Profit Organization"
                                    width="100"
                                    height="100"
                                  />
                                </picture>
                                <h3 className="font-18 font-md-16 font-weight-semibold mt-4 mb-1">
                                  Non Profit Organization
                                </h3>
                              </div>
                            </div>
                          </label>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </Layout>
  );
};
export default SelectCompanyType;
