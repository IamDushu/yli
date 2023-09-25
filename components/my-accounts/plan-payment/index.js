import React, { Fragment, useState } from "react";
import PaymentHistory from "./payment-history";
import Credit from "./credit";
import Plan from "./plan";
import { Card, Row, Col, Button } from "react-bootstrap";

const PlanAndPayment = () => {
  const [currentSubMenu, setCurrentSubMenu] = useState(null);
  const handleChange = (menuItem) => {
    setCurrentSubMenu(menuItem);
  };
  return (
    <Fragment>
      <Card className="mb-3">
        <Card.Body>
          <ul className="listing-section border-first-0 pt-first-0 pb-last-0 py-lg">
            {[
              { Component: Credit },
              { Component: Plan },
              { Component: PaymentHistory },
            ].map(({ Component }, idx) => (
              <Component
                key={idx}
                currentSubMenu={currentSubMenu}
                handleChange={handleChange}
              />
            ))}
          </ul>
        </Card.Body>
      </Card>
    </Fragment>
  );
};
export default PlanAndPayment;
