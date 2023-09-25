import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Row, Form, Col, Button } from "react-bootstrap";
import { Layout } from "@components/layout";
import { Link } from "@routes";

const Email = () => {
  const [lang] = useTranslation("language");

  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  return (
    <Layout>
      <div className="inner-wrapper bg-white email-us-box">
        <Container>
          <div className="email-us-container">
            <div className="mb-2">
              <Link route="/">
                <a title="" className="back-containt">
                  <em className="icon icon-back-arrow-red text-dark font-22 mr-1 v-text-bottom back-icon"></em>
                  <h6 className="font-16 mb-0 text-secondary back-text d-inline-block">
                    Back
                  </h6>
                </a>
              </Link>
            </div>
          </div>
          <div className="email-submit-box mb-lg-5 mb-0">
            <div className="d-flex justify-content-between align-items-center mb-40 mt-md-0 mt-4">
              <h1 className="font-weight-semibold font-30 heading-text mb-0">
                Email Us
              </h1>
              <h5 className="font-18 mb-0">
                Required<sup className="text-danger">*</sup>
              </h5>
            </div>
            <Form className="email-us-form">
              <div className="d-flex align-items-start">
                <div className="profile-details-wrap w-100">
                  <Row>
                    <Col sm={12}>
                      <Form.Group controlId="signupFirstName">
                        <Form.Label className="text-charcoal-grey">
                          Name<sup>*</sup>
                        </Form.Label>
                        <Form.Control type="text" placeholder="Name" />
                      </Form.Group>
                    </Col>
                    <Col sm={12}>
                      <Form.Group controlId="signupEmail">
                        <Form.Label className="text-charcoal-grey">
                          Email<sup>*</sup>
                        </Form.Label>
                        <Form.Control type="email" placeholder="Email" />
                      </Form.Group>
                    </Col>
                    <Col sm={12}>
                      <Form.Group controlId="signupPhoneNo">
                        <Form.Label className="text-charcoal-grey">
                          Phone Number
                        </Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Phone number"
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={12}>
                      <Form.Group controlId="signupShortDescription">
                        <Form.Label className="text-charcoal-grey">
                          Message<sup>*</sup>
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          placeholder="Type here..."
                          rows={4}
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={12}>
                      <Form.Group controlId="signupFirstName">
                        <Form.Label className="text-charcoal-grey">
                          Enter Capcha<sup>*</sup>
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter name" />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="text-center mt-4 pt-2 px-md-4 px-0">
                    <Button variant="info text-uppercase w-100">Submit</Button>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </Container>
      </div>
    </Layout>
  );
};
export default Email;
