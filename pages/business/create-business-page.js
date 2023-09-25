import React from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "@components/layout";
import { useDispatch } from "react-redux";
import { Container, Form, Card, Row, Col, Button } from "react-bootstrap";
import { FileUploader } from "react-drag-drop-files";
import { toggleModals } from "../../store/actions";
import Select from "react-select";
import WithAuth from "components/with-auth/with-auth";

const CreateBusinessPage = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const colourOptions = [
    { value: "Business", label: "Business" },
    { value: "Education", label: "Education" },
  ];

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
      <div className="inner-wrapper profile-business-box">
        <Container>
          <div className="mb-3">
            <h1 className="font-weight-bold font-23 d-flex heading-text mb-0">
              Create Your own Business Page{" "}
            </h1>
          </div>

          <Card>
            <Card.Body className="p-0">
              <div className="border-bottom border-geyser p-4 position-relative text-center">
                <h2 className="font-23 font-md-20 mb-0">
                  Fill Your Company Details
                </h2>
              </div>
              <div className="container-fluid">
                <Form>
                  <div className="px-2 pt-4">
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-4">
                          <Form.Label className="font-16">
                            Enter Name{" "}
                          </Form.Label>
                          <Form.Control type="text" placeholder="Enter name" />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-4">
                          <Form.Label className="font-16">
                            Public URL YLIWAY
                          </Form.Label>
                          <Form.Control
                            type="url"
                            placeholder="yaliway.com/companyname/"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="font-16">
                            Choose Sector{" "}
                          </Form.Label>
                          <div className="custom-selectpicker">
                            <Select options={options} />
                          </div>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-4">
                          <Form.Label className="font-16">
                            Website URL
                          </Form.Label>
                          <Form.Control type="url" placeholder="Website url" />
                        </Form.Group>
                      </Col>
                      <Col md={12}>
                        <Form.Group className="mb-4">
                          <Form.Label className="font-16">Overview</Form.Label>{" "}
                          <sup>*</sup>
                          <Form.Control
                            type="text"
                            placeholder="Write here.."
                          />
                        </Form.Group>
                      </Col>
                      <Col md={12}>
                        <Form.Group>
                          <Form.Label className="font-16">
                            Description
                          </Form.Label>{" "}
                          <sup>*</sup>
                          <textarea
                            className="form-control"
                            rows="3"
                            placeholder="Write here.."
                          ></textarea>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-4">
                          <Form.Label className="font-16">
                            Company Dimension
                          </Form.Label>
                          <div className="custom-selectpicker">
                            <Select options={options} />
                          </div>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="font-16">
                            Company Name{" "}
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter company name"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="font-16">
                            Company Contact No{" "}
                          </Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter company contact no"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-4">
                          <Form.Label className="font-16">
                            Company Email
                          </Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter company email"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="font-16">Slogan</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Belive In The Best"
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-4">
                          <Form.Label className="font-16">
                            Add Address
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Add location"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-4">
                          <Form.Label className="font-16">
                            Link to Google Maps
                          </Form.Label>
                          <Form.Control type="url" placeholder="Add location" />
                        </Form.Group>
                      </Col>

                      <Col lg={6} className="d-md-block d-none"></Col>

                      <Col lg={6}>
                        <Row>
                          <Col xl={9} sm={7}>
                            <Form.Group
                              controlId="uploadOfflineImg"
                              className="w-100 inner-label-100 mb-sm-3 mb-0"
                            >
                              <FileUploader>
                                <Form.Label className="font-16">
                                  Upload{" "}
                                  <span className="text-uppercase"> Logo </span>{" "}
                                </Form.Label>
                                <div className="dropzone-wrap text-center pointer px-2">
                                  <em className="icon icon-upload-cloud"></em>
                                  <p className="m-0 font-16 font-medium">
                                    Upload your Brand{" "}
                                    <span className="text-uppercase">
                                      {" "}
                                      Logo{" "}
                                    </span>{" "}
                                    here
                                  </p>
                                  <small className="font-12 font-medium">
                                    Size 300 x 300 / JPG, JPEG, PNG)
                                  </small>
                                </div>
                              </FileUploader>
                            </Form.Group>
                          </Col>
                          <Col xl={3} sm={5}>
                            <Form.Label></Form.Label>
                            <div className="d-flex justify-content-sm-end mb-sm-3 mb-4 mb-lg-0">
                              <div className="overflow-hidden rounded-pill flex-shrink-0 ">
                                <picture>
                                  <source
                                    srcSet={"../assets/images/user-noimg.jpg"}
                                    type="image/png"
                                  />
                                  <img
                                    src={"../assets/images/user-noimg.jpg"}
                                    alt="User"
                                    width="150"
                                    height="150"
                                  />
                                </picture>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Col>

                      <Col lg={12}>
                        <Form.Group controlId="uploadOnlineAddTags">
                          <Form.Label className="text-charcoal-grey font-medium">
                            Tags
                          </Form.Label>
                          <div className="custom-selectpicker-multi d-flex w-inner-100">
                            <Select
                              isMulti
                              options={colourOptions}
                              classNamePrefix="select"
                            />
                          </div>
                        </Form.Group>
                      </Col>

                      <Col xl={12}>
                        <label className="d-flex">
                          <div className="d-inline-block">
                            <div className="custom-checkbox checkbox-blue">
                              <label htmlFor="check1" className="mb-0">
                                <input
                                  type="checkbox"
                                  name="csscheckbox"
                                  id="check1"
                                  autoComplete="off"
                                />
                                <span></span>
                              </label>
                            </div>
                          </div>
                          <div className="custom-selectpicker-multi">
                            <p className="font-16 font-md-14 pt-2">
                              I certify that I am an authorized representative
                              of this organization and that I have the right to
                              act on its behalf in the creation and management
                              of this page. The organization and I accept the
                              additional terms and conditions of the pages.
                            </p>
                          </div>
                        </label>
                      </Col>
                    </Row>
                  </div>

                  <Row>
                    <Col md={12} className="border-top border-geyser py-4">
                      <div className="text-center form-submit-btn">
                        <Button
                          variant="btn btn-info font-weight-semibold text-uppercase"
                          onClick={() =>
                            dispatch(toggleModals({ requesttoadmin: true }))
                          }
                        >
                          Submit
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </Layout>
  );
};
export default WithAuth(CreateBusinessPage);
