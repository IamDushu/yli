import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CardElement } from "@stripe/react-stripe-js";
import { Elements, ElementsConsumer } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Button, Row, Col, Form, Modal } from "react-bootstrap";
import { get, post } from "../../api";
import { PAYMENT_API_URL, STRIPE_PUBLIC_KEY } from "../../config";
import { toggleModals } from "../../store/actions";
import { ADD_CARD, CARD_LIST } from "../../api/routes";
import { showMessageNotification } from "utils";
import { cardListing } from "store/actions/my-account";
import { useTranslation } from "react-i18next";

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
const SaveCardForm = ({ stripe, elements }) => {
  const dispatch = useDispatch();
  const [lang] = useTranslation("language");
  const [errMsg, setErrMsg] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsSubmitting(true);
      const response = await post(
        { serviceURL: PAYMENT_API_URL },
        ADD_CARD,
        false,
        {},
        true
      );
      if (response.status === 1) {
        const { error: stripeError } = await stripe.confirmCardSetup(
          response.data.client_secret,
          {
            payment_method: { card: elements.getElement(CardElement) },
          }
        );
        dispatch(cardListing());

        if (stripeError) return setErrMsg(`${lang("ADD_CARD.CARD_INVALID")}`);

        setErrMsg(null);
        dispatch(toggleModals({ addcard: false }));
        showMessageNotification("Card added successfully", "success");
      }
    } catch (error) {
      setErrMsg(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* <div> */}
      <Modal.Body className="p-4">
        <Form>
          <Row>
            <Col md={12}>
              <Form.Group className="mb-0" controlId="formBasicNumber">
                <CardElement className="form-control" />
                <span
                  style={{ color: "red", fontSize: "10px" }}
                  className="mt-1"
                >
                  {errMsg}
                </span>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer className="custom-footer text-center d-flex border-top border-geyser justify-content-between">
        <Button
          variant="btn btn-info font-weight-semibold px-30"
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? lang("ADD_CARD.PROCESSING") : lang("ADD_CARD.SAVE")}
        </Button>
      </Modal.Footer>
      {/* // </div> */}
    </>
  );
};

const InjectedSaveCardForm = () => (
  <ElementsConsumer>
    {({ stripe, elements }) => (
      <SaveCardForm stripe={stripe} elements={elements} />
    )}
  </ElementsConsumer>
);
export const AddCard = () => {
  return (
    <Elements stripe={stripePromise}>
      <InjectedSaveCardForm />
    </Elements>
  );
};
