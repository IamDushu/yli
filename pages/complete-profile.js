import React from "react";
import { Link } from "@routes"; //Access routing
import { HOME } from "@routes/urls";
import Header from "components/layout/header";
import Footer from "components/layout/footer";
import { Loader } from "components/ui";
import { Alert, Form, Button, Row, Col } from "react-bootstrap";
import { images } from "../public/assets/images";
import { DateTimePickerField } from "../components/form-fields";

const CompleteProfile = () => {
  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <main className="main-layout flex-shrink-0">
        <div className="inner-wrapper ">
          <div className="container">
            <div className="profile-intro">
              <h4>Let’s complete your profile</h4>
              <span>
                Let's get you all set up so you can verify your personal account
                and begin settings up your profile
              </span>
            </div>
            <ul className="profile-stepper">
              <li className="active">
                <span className="step-count">
                  1{" "}
                  <em className="step-done">
                    <img
                      src={images.StepDone.default}
                      alt="check"
                      className="img-fluid"
                    />
                  </em>
                </span>
                <p className="step-title m-0">Personal Details</p>
              </li>
              <li className="step-complete">
                <span className="step-count">
                  2
                  <em className="step-done">
                    <img
                      src={images.StepDone.default}
                      alt="check"
                      className="img-fluid"
                    />
                  </em>
                </span>
                <p className="step-title m-0">Personal Details</p>
              </li>
              <li>
                <span className="step-count">
                  3{" "}
                  <em className="step-done">
                    <img
                      src={images.StepDone.default}
                      alt="check"
                      className="img-fluid"
                    />
                  </em>
                </span>
                <p className="step-title m-0">Personal Details</p>
              </li>
            </ul>

            <div className="step-1-detail">
              <div className="profile-detail-card">
                <div className="profile-header">
                  <h6 className="m-0">Personal details</h6>
                </div>
                <div className="profile-body">
                  <Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Name *</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Surname *</Form.Label>
                        <Form.Control type="text" placeholder="Enter surname" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Upload Image *</Form.Label>
                        <div className="form-upload">
                          <em>
                            <img
                              src={images.upload.default}
                              alt="upload"
                              className="img-fluid"
                            />
                          </em>
                          <p>
                            Browse From Your System or Just Drag & Drop
                            Here..Size 200 x 200 / JPG, PNG)
                          </p>
                          <input type="file" />
                        </div>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>&nbsp;</Form.Label>
                        <em className="thumb-icon">
                          <img
                            src={images.thumbImage.default}
                            alt="thumb"
                            className="img-fluid"
                          />
                        </em>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Email *</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Alternative Email</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter alternative email"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Country *</Form.Label>
                        <Form.Control as="select">
                          <option>Select</option>
                          <option value="1">India</option>
                          <option value="2">USA</option>
                          <option value="3">Spain</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Province/State *</Form.Label>
                        <Form.Control as="select">
                          <option>Select</option>
                          <option value="1">Gujarat</option>
                          <option value="2">New York</option>
                          <option value="3">Barcelona</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>City *</Form.Label>
                        <Form.Control as="select">
                          <option>Select</option>
                          <option value="1">Gandhinagar</option>
                          <option value="2">ABC</option>
                          <option value="3">XYZ</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Website Url</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter website Url"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group>
                        <Form.Label>Overview *</Form.Label>
                        <Form.Control
                          as="textarea"
                          placeholder="Write something here..."
                        />
                      </Form.Group>
                    </Col>

                    <Col md={12}>
                      <Form.Group>
                        <Form.Label>Full Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          placeholder="Write something here..."
                        />
                      </Form.Group>
                      <div className="form-text d-flex m-0">
                        <em className="mr-1">
                          <img
                            src={images.infoIcon.default}
                            alt="info"
                            className="img-fluid"
                          />
                        </em>
                        Maximum 2,500 characters
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="button-block single-button">
                <Button variant="primary">
                  Next{" "}
                  <em>
                    <img
                      src={images.nextIcon.default}
                      alt="next"
                      className="img-fluid"
                    />
                  </em>
                </Button>
              </div>
            </div>

            <div className="step-2-detail d-none">
              <div className="profile-detail-card">
                <div className="profile-header">
                  <h6 className="m-0">Education details</h6>
                </div>
                <div className="profile-body">
                  <Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Institute</Form.Label>
                        <Form.Control as="select">
                          <option>Select</option>
                          <option value="1">India</option>
                          <option value="2">USA</option>
                          <option value="3">Spain</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Education</Form.Label>
                        <Form.Control as="select">
                          <option>Select</option>
                          <option value="1">Gujarat</option>
                          <option value="2">New York</option>
                          <option value="3">Barcelona</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Start Date</Form.Label>
                        <DateTimePickerField />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>End Date</Form.Label>
                        <DateTimePickerField />
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="add-block">
                    <Button variant="outline-primary">
                      <em className="normal-state">
                        <img
                          src={images.addIcon.default}
                          alt="add"
                          className="img-fluid"
                        ></img>
                      </em>
                      <em className="hover-state">
                        <img
                          src={images.addIconWhite.default}
                          alt="add"
                          className="img-fluid"
                        ></img>
                      </em>
                      Add More
                    </Button>
                  </div>
                </div>
              </div>

              <div className="profile-detail-card secondary-card">
                <div className="profile-header">
                  <h6 className="m-0">Certificates</h6>
                </div>
                <div className="profile-body">
                  <Row>
                    <Col md={12}>
                      <Form.Group>
                        <Form.Label>Upload Certificate</Form.Label>
                        <div className="form-upload">
                          <em>
                            <img
                              src={images.upload.default}
                              alt="upload"
                              className="img-fluid"
                            />
                          </em>
                          <p>Upload your certificate here</p>
                          <input type="file" />
                        </div>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Name *</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Url</Form.Label>
                        <Form.Control type="text" placeholder="Enter Url" />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          placeholder="Write something here..."
                        />
                      </Form.Group>
                      <div className="form-text d-flex m-0">
                        <em className="mr-1">
                          <img
                            src={images.infoIcon.default}
                            alt="info"
                            className="img-fluid"
                          />
                        </em>
                        Maximum 500 characters
                      </div>
                    </Col>
                  </Row>
                  <div className="add-block">
                    <Button variant="outline-primary">
                      <em className="normal-state">
                        <img
                          src={images.addIcon.default}
                          alt="add"
                          className="img-fluid"
                        ></img>
                      </em>
                      <em className="hover-state">
                        <img
                          src={images.addIconWhite.default}
                          alt="add"
                          className="img-fluid"
                        ></img>
                      </em>
                      Add More
                    </Button>
                  </div>
                </div>
              </div>

              <div className="profile-detail-card secondary-card">
                <div className="profile-header">
                  <h6 className="m-0">Language Skills</h6>
                </div>
                <div className="profile-body">
                  <Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Spoken Language</Form.Label>
                        <Form.Control as="select">
                          <option>Select</option>
                          <option value="1">Language 1</option>
                          <option value="2">Language 2</option>
                          <option value="3">Language 3</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Level</Form.Label>
                        <Form.Control as="select">
                          <option>Select</option>
                          <option value="1">Level 1</option>
                          <option value="2">Level 2</option>
                          <option value="3">Level 3</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="add-block">
                    <Button variant="outline-primary">
                      <em className="normal-state">
                        <img
                          src={images.addIcon.default}
                          alt="add"
                          className="img-fluid"
                        ></img>
                      </em>
                      <em className="hover-state">
                        <img
                          src={images.addIconWhite.default}
                          alt="add"
                          className="img-fluid"
                        ></img>
                      </em>
                      Add More
                    </Button>
                  </div>
                </div>
              </div>
              <div className="button-block">
                <Button variant="outline-dark">
                  <em className="normal-state">
                    <img
                      src={images.previousIcon.default}
                      alt="previous"
                      className="img-fluid"
                    />
                  </em>
                  <em className="hover-state">
                    <img
                      src={images.previousIconDark.default}
                      alt="add"
                      className="img-fluid"
                    ></img>
                  </em>
                  Previous
                </Button>
                <Button variant="primary">
                  Next{" "}
                  <em>
                    <img
                      src={images.nextIcon.default}
                      alt="next"
                      className="img-fluid"
                    />
                  </em>
                </Button>
              </div>
            </div>

            <div className="step-3-detail d-none">
              <div className="profile-detail-card">
                <div className="profile-header">
                  <h6 className="m-0">Experience</h6>
                </div>
                <div className="profile-body">
                  <Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Role *</Form.Label>
                        <Form.Control as="select">
                          <option>Select</option>
                          <option value="1">Role 1</option>
                          <option value="2">Role 2</option>
                          <option value="3">Role 3</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Location</Form.Label>
                        <Form.Control as="select">
                          <option>Select</option>
                          <option value="1">Role 1</option>
                          <option value="2">Role 2</option>
                          <option value="3">Role 3</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Start Date</Form.Label>
                        <DateTimePickerField />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>End Date</Form.Label>
                        <DateTimePickerField />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group>
                        <div className="custom-checkbox">
                          <label className="custom-label">
                            Currently Working
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                          </label>
                        </div>
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          placeholder="Write something here..."
                        />
                      </Form.Group>
                      <div className="form-text d-flex m-0">
                        <em className="mr-1">
                          <img
                            src={images.infoIcon.default}
                            alt="info"
                            className="img-fluid"
                          />
                        </em>
                        Maximum 500 characters
                      </div>
                    </Col>
                  </Row>

                  <div className="add-block">
                    <Button variant="outline-primary">
                      <em className="normal-state">
                        <img
                          src={images.addIcon.default}
                          alt="add"
                          className="img-fluid"
                        ></img>
                      </em>
                      <em className="hover-state">
                        <img
                          src={images.addIconWhite.default}
                          alt="add"
                          className="img-fluid"
                        ></img>
                      </em>
                      Add More
                    </Button>
                  </div>
                </div>
              </div>
              <div className="button-block">
                <Button variant="outline-dark">
                  <em className="normal-state">
                    <img
                      src={images.previousIcon.default}
                      alt="previous"
                      className="img-fluid"
                    />
                  </em>
                  <em className="hover-state">
                    <img
                      src={images.previousIconDark.default}
                      alt="add"
                      className="img-fluid"
                    ></img>
                  </em>
                  Previous
                </Button>
                <Button variant="primary">Finish</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <Alert />
      <Loader />
    </div>
  );
};

export default CompleteProfile;
