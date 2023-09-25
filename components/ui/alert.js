import React, { Fragment } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Toast } from "react-bootstrap";
import { removeAlert } from "../../store/actions/ui";

export const Alert = () => {
  const { messages } = useSelector((state) => state.ui, shallowEqual);
  const dispatch = useDispatch();
  const onClose = (i) => {
    dispatch(removeAlert(i));
  };
  return (
    <Fragment>
      {messages?.length > 0 &&
        messages.map((message, i) => (
          <Toast
            onClose={() => onClose(i)}
            show={true}
            delay={message.timeout}
            autohide
            animation
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              zIndex: 9999,
              // background: "#fff",
            }}
            bg={message.level == "success" ? "success" : "danger"}
            key={i}
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded mr-2"
                alt=""
              />
              {message.title && (
                <strong className="mr-auto">{message.title}</strong>
              )}
              {/* <small>12 mins ago</small> */}
            </Toast.Header>
            <Toast.Body>{message.text}</Toast.Body>
          </Toast>
        ))}
    </Fragment>
  );
};
