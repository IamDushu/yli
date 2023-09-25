import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const CourseLoader = () => {
  return (
    <Row className="pt-1 row-col-10 three-grid-spacing">
      <Col lg={4} sm={6} className="d-flex w-100">
        <Card className="secondary-card abstract-card-v2">
          <Card.Body className="d-flex flex-column h-100">
            <div className="position-relative pointer">
              <Skeleton width="100%" height={170} />
            </div>
          </Card.Body>
          <Card.Footer className="py-2 px-3 m-0 border-top">
            <Skeleton count={5} />
          </Card.Footer>
        </Card>
      </Col>
      <Col lg={4} sm={6} className="d-flex w-100">
        <Card className="secondary-card abstract-card-v2">
          <Card.Body className="d-flex flex-column h-100">
            <div className="position-relative pointer">
              <Skeleton width="100%" height={170} />
            </div>
          </Card.Body>
          <Card.Footer className="py-2 px-3 m-0 border-top">
            <Skeleton count={5} />
          </Card.Footer>
        </Card>
      </Col>
      <Col lg={4} sm={6} className="d-flex w-100">
        <Card className="secondary-card abstract-card-v2">
          <Card.Body className="d-flex flex-column h-100">
            <div className="position-relative pointer">
              <Skeleton width="100%" height={170} />
            </div>
          </Card.Body>
          <Card.Footer className="py-2 px-3 m-0 border-top">
            <Skeleton count={5} />
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};

export default CourseLoader;
