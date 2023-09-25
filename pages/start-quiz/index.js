import { Layout } from "components/layout";
import { GrowthModal, MyProfile } from "components/sidebar";
import React from "react";
import { Button, Card, Container } from "react-bootstrap";

function StartQuiz() {
  return (
    <Layout>
      <div className="inner-wrapper create-groups-box">
        <Container>
          <div className="d-flex flex-xl-nowrap flex-wrap">
            {/* left profile section */}
            <div className="left-profile-section">
              {/* profile section */}
              <MyProfile />

              {/* growth modal listing */}
              <GrowthModal />
            </div>

            {/* quiz */}
            <div className="post-section">
              <Card className="mb-20">
                <Card.Header>
                  <h5 className="font-23 font-md-16 mb-0">Start Quiz</h5>
                </Card.Header>
                <Card.Body className="p-3">
                  <div className="d-flex align-items-center mt-sm-0 mt-2">
                    <div className="w-h-24  circle-inner-icons ml-3 pointer">
                      <em className="bx bxs-time font-24"></em>
                    </div>
                    <span>Duration</span>
                  </div>
                  <div className="d-flex align-items-center mt-sm-0 mt-2">
                    <div className="w-h-24  circle-inner-icons ml-3 pointer">
                      <em className="bx bx-question-mark font-24"></em>
                    </div>
                    <span>Time</span>
                  </div>
                  <div className="text-center d-flex justify-content-end">
                    <Button variant="btn btn-outline-info align-items-center d-flex py-12 text-uppercase btn-hover-icon-white btn-sm">
                      Start Now
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
}

export default StartQuiz;
