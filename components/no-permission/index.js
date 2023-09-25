import React from "react";
import { Layout } from "components/layout";
import { useTranslation } from "react-i18next";
import { Container, Button, Col, Row, Card } from "react-bootstrap";
import WithAuth from "components/with-auth/with-auth";
/************************************** 
  @purpose : No Permission
  @Author : INIC
  *************************************/
const NoPermission = () => {
  const [lang] = useTranslation("language");

  return (
    <div className="inner-wrapper">
      <Container>
        <Card>
          <Card.Body className="py-5">
            <Row>
              <Col md={8} lg={6} className="mx-auto text-center">
                <img src="/assets/images/no-permission-img.svg" alt="" className="mb-5" />
                <h4 className="mb-3 font-weight-bold font-18">
                  {lang('DASHBOARD.NO_PERMISSION')}
                </h4>
                <Button variant="primary" className="">{lang('DASHBOARD.BACK_TO_DASHBOARD')}</Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};
export default WithAuth(NoPermission);