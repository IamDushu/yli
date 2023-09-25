import React from "react";
import { groupRequestReceived } from "store/actions";
import { useDispatch } from "react-redux";

const ShowIcon = ({ show, setShow, groupId }) => {
  const dispatch = useDispatch();
  return (
    <img
      className="ml-2 pointer"
      src="/assets/images/cap-icon.svg"
      alt="cap-icon"
      style={{
        transform: show ? "rotate(180deg)" : "rotate(0deg)",
      }}
      onClick={() => {
        dispatch(groupRequestReceived({ groupId: groupId }));
        setShow(!show);
      }}
    />
  );
};

export default ShowIcon;
