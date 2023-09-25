import React from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "@components/layout";
import { Button, Form, Card, Row, Col, Tab, Tabs } from "react-bootstrap";
import { Link } from "@routes"; //Access routing
import { useDispatch } from "react-redux";
import { toggleModals } from "../../store/actions";
import Datetime from "react-datetime";
import Select from "react-select";

const AboutUs = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();

  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  const options = [
    { value: "Italy", label: "Italy" },
    { value: "India", label: "India" },
    { value: "Slovenia	", label: "Slovenia	" },
    { value: "Solomon Islands	", label: "Solomon Islands	" },
    { value: "South Africa	", label: "South Africa	" },
    { value: "Singapore", label: "Singapore" },
  ];

  const inputProps = {
    placeholder: "Select date",
  };
  return (
    <Layout>
      <div className="ui-kit py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {/* Headings */}
              <h4 className="mt-4">Headings</h4>
              <h1>h1 Headings</h1>
              <h2>h2 Headings</h2>
              <h3>h3 Headings</h3>
              <h4>h4 Headings</h4>
              <h5>h5 Headings</h5>
              <h6>h6 Headings</h6>
              {/* paragraph */}
              <h4 className="mt-4">Paragraph</h4>
              <p className="mb-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rutrum
                etiam fames viverra turpis sollicitudin ultrices odio. Mi ut
                nunc ultrices sed. Nullam eros, sagittis, aliquam dignissim
                Dolor sit amet, consectetur adipiscing elit. Rutrum etiam fames
                viverra turpis sollicitudin ultrices odio. Mi ut nunc ultrices
                sed. Nullam eros, sagittis, aliquam dignissim id.
              </p>
              {/* Buttons */}
              <h4 className="mt-4">Buttons</h4>
              <Button variant="primary">Primary</Button>
              <Button variant="primary" size="sm">
                Primary 16px
              </Button>
              <Button variant="outline-primary">Primary Outline</Button>
              <Button variant="info">Secondary</Button>
              <Button variant="outline-info">Secondary Outline</Button>
              <Button variant="warning">warning</Button>
              <Button variant="success">success</Button>
              <Button variant="danger">danger</Button>
              <Button variant="light">light</Button>
              <Button variant="dark">Dark</Button>
              <Button
                variant="outline-info py-12 px-4 text-uppercase w-sm-100 mt-4 mt-sm-0"
                size="sm"
              >
                <em className="icon icon-plus font-22 pr-2"></em>Add Lesson
              </Button>
              <Link to="/">
                <a className="bg-gary-light rounded-pill text-black font-14 d-flex align-items-center py-2 px-3 w-75">
                  View Profile
                </a>
              </Link>
              <div className="text-center d-flex flex-wrap justify-content-center flex-sm-nowrap mt-3 mb-5">
                <Button variant="outline-info px-4 text-uppercase btn-md mx-sm-3 mb-3 mb-sm-0">
                  Reset
                </Button>
                <Button variant="info px-4 text-uppercase btn-md mx-sm-3">
                  Save
                </Button>
              </div>
              {/* Form */}
              <h4 className="mt-4">Form</h4>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Enter Name</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="signupShortDescription">
                  <Form.Label>
                    Overview<sup>*</sup>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Write here..."
                    rows={4}
                  />
                </Form.Group>
                <Button variant="info" type="submit" className="w-50">
                  Submit
                </Button>
              </Form>
              {/* Card */}
              <Card className="mt-4">
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Primary</Button>
                </Card.Body>
              </Card>
            </div>
          </div>
          <hr></hr>
          <Button
            onClick={() => dispatch(toggleModals({ otpVerification: true }))}
            variant="primary text-uppercase btn-sm"
          >
            OTP Verification
          </Button>
          <Button
            onClick={() => dispatch(toggleModals({ setNewPassword: true }))}
            variant="primary text-uppercase btn-sm"
          >
            Reset Password
          </Button>
          <Button
            onClick={() => dispatch(toggleModals({ thankyou: true }))}
            variant="primary text-uppercase btn-sm"
          >
            Thankyou
          </Button>
          <Button
            onClick={() => dispatch(toggleModals({ joinnow: true }))}
            variant="primary text-uppercase btn-sm"
          >
            Thankyou2
          </Button>
          <hr></hr>
          <Form>
            <Row>
              <Col sm={6}>
                <Form.Group controlId="signupStartDate">
                  <Form.Label>Start Date</Form.Label>
                  <div className="calendar-wrap">
                    <Datetime inputProps={inputProps} timeFormat={false} />
                    <em className="icon icon-calendar"></em>
                  </div>
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group controlId="signupCountry">
                  <Form.Label>
                    Country<sup>*</sup>
                  </Form.Label>
                  <div className="custom-selectpicker">
                    <Select options={options} />
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <div className="custom-radio custom-radio-outline mb-10">
              <label htmlFor="check" className="font-16">
                <input
                  type="radio"
                  name="cssradio"
                  id="check"
                  autoComplete="off"
                  value="public"
                  checked
                />
                <span></span> Public(all can add member or join themself.)
              </label>
            </div>
            <div className="custom-radio custom-radio-outline">
              <label htmlFor="Normal" className="font-16">
                <input
                  type="radio"
                  name="cssradio"
                  id="Normal"
                  autoComplete="off"
                  value="private"
                />
                <span></span> Private (Only Admin can add members)
              </label>
            </div>
          </Form>
          <div className="overflow-hidden rounded-pill flex-shrink-0 mr-2">
            <picture>
              <source
                srcSet={"../assets/images/my-profile/profile-picture.jpg"}
                type="image/png"
              />
              <img
                src={"../assets/images/homepage/profile-picture.jpg"}
                alt="User"
                width="60"
                height="60"
              />
            </picture>
          </div>
          <div className="custom-checkbox checkbox-blue">
            <label
              htmlFor="quizQ1-Answer1"
              className="mb-0 font-16 font-medium"
            >
              <input
                type="checkbox"
                name="csscheckbox"
                id="quizQ1-Answer1"
                autoComplete="off"
              />
              <span></span>Answer
            </label>
          </div>
          <div className="custom-checkbox">
            <label
              htmlFor="quizQ1-Answer2"
              className="mb-0 font-16 font-medium"
            >
              <input
                type="checkbox"
                name="csscheckbox"
                id="quizQ1-Answer2"
                autoComplete="off"
              />
              <span></span>Answer
            </label>
          </div>
          <div className="custom-search">
            <em className="icon icon-search"></em>
            <input
              type="text"
              className="search-custom"
              placeholder="Search..."
            />
          </div>
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title="Home">
              Test
            </Tab>
            <Tab eventKey="profile" title="Profile">
              Test 1
            </Tab>
            <Tab eventKey="contact" title="Contact">
              Test 2
            </Tab>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};
export default AboutUs;
