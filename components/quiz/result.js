import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function Result({ result }) {
  return (
    <Container fluid className="bg-white">
      <Row>
        <Col md={6} className="py-4">
          <h5 className="mb-0 text-body-16">
            Right Answer:{" "}
            <span className="text-primary">{`${result?.numberOfRightQuestions}/${result?.totalQuestions}`}</span>
          </h5>
        </Col>
        <Col md={6} className="py-4">
          <h5 className="mb-0 text-body-16">
            Your grade:{" "}
            <span className="text-primary">{`${result?.percentage.toFixed(
              2
            )}%`}</span>
          </h5>
        </Col>
        <Col md={6} className="border-top py-4">
          <h5 className="mb-0 text-body-20">
            Result:{" "}
            {result?.isPassed ? (
              <span className="text-success">Pass</span>
            ) : (
              <span className="text-danger">Fail</span>
            )}
          </h5>
        </Col>
        <Col md={6} className="border-top py-4">
          <h5 className="mb-0 text-body-20">We keep your highest score</h5>
        </Col>
      </Row>
    </Container>
  );
}

export default Result;
