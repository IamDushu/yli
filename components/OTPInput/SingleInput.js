import { usePrevious } from "hooks";
import React, { memo, useRef, useLayoutEffect } from "react";
import { Form } from "react-bootstrap";

export function SingleOTPInputComponent(props) {
  const { focus, autoFocus, ...rest } = props;
  const inputRef = useRef();
  const prevFocus = usePrevious(!!focus);
  useLayoutEffect(() => {
    if (inputRef.current) {
      if (focus && autoFocus) {
        inputRef.current.focus();
      }
      if (focus && autoFocus && focus !== prevFocus) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
  }, [autoFocus, focus, prevFocus]);

  return (
    <div className="enter-box">
      <Form.Control ref={inputRef} {...rest} />
    </div>
  );
}

const SingleOTPInput = memo(SingleOTPInputComponent);
export default SingleOTPInput;
