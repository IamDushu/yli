import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Layout } from "@components/layout";
import { Link } from "@routes";
import { FAQ } from "routes/urls";

const AddQuestions = () => {
  const [lang] = useTranslation("language");

  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  return (
    <Layout>
      <div className="inner-wrapper bg-white add-questions-box">
        <Container>
          <div className="mb-2">
            <Link route={FAQ}>
              <a title="" className="back-containt">
                <em className="icon icon-back-arrow-red text-dark font-22 v-text-bottom mr-1 back-icon"></em>
                <h6 className="font-16 mb-0 text-secondary back-text d-inline-block">
                  Back
                </h6>
              </a>
            </Link>
          </div>
          <div className="mb-30 mt-md-0 mt-4">
            <h1 className="font-weight-semibold font-30 mb-0 d-flex heading-text">
              Frequently Asked Questions
            </h1>
          </div>
          <h3 className="font-24 font-weight-semibold mb-30">Add Question</h3>
          <div className="mb-lg-5 mb-0">
          {/* add-question-box  */}
            <Form className="sign-up-form">
              <div className="d-flex align-items-start">
                <div className="profile-details-wrap w-100">
                  <Card className="mb-20 upload-post">
                    <Card.Body>
                      <div className="d-flex align-items-center">
                        <h5 className="mb-0 font-16">
                          How can I view the pricing ?
                        </h5>
                        <em className="icon icon-plus pointer font-22 ml-auto"></em>
                      </div>
                    </Card.Body>
                  </Card>

                  <Card className="mb-20">
                    <Card.Body className="p-0">
                      <div className="d-flex align-items-center">
                        <input
                          type="text"
                          placeholder="Add more"
                          name="name"
                          className="custom-input w-100 p-20 border-0"
                        />
                      </div>
                    </Card.Body>
                  </Card>

                  <div className="text-center d-flex justify-content-end">
                    <Button variant="btn btn-outline-info align-items-center d-flex py-12 btn-hover-icon-white btn-sm">
                      <em className="icon icon-plus-primary font-14 mr-2 ml-auto hover-white"></em>{" "}
                      <span className="ml-1">Add More</span>
                    </Button>
                  </div>

                  <div className="d-flex align-items-center justify-content-between mt-4">                    
                      <Button variant="btn btn-dark font-weight-semibold btn-sm px-5 mr-2">
                        Back
                      </Button>                    
                      <Button variant="btn btn-info font-weight-semibold btn-sm px-5 ml-2">
                        Submit
                      </Button>                    
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
export default AddQuestions;
