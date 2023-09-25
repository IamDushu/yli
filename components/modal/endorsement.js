import { Card, Modal } from "react-bootstrap";
import React from "react";
import { useSelector } from "react-redux";
import { onImageError } from "utils";

const Endorsements = () => {
  const { skills } = useSelector((state) => state.ui);

  return (
    <Modal.Body>
      <Card.Body className="py-0">
        {skills.endorsements &&
          skills.endorsements?.length > 0 &&
          skills.endorsements.map((item) => (
            <div
              className="d-flex align-items-center mb-3 cursor-pointer"
              key={item.id}
              onClick={() => {
                window.open(
                  `/profile/${item?.endorsedByUser?.profileId}`,
                  "_self"
                );
              }}
            >
              <picture
                className="user-profile-pic rounded-pill mr-2"
                onContextMenu={(e) => e.preventDefault()}
              >
                <source
                  src={item?.endorsedByUser?.profilePicURL}
                  type="image/jpg"
                />
                <img
                  src={item?.endorsedByUser?.profilePicURL}
                  alt="profilePicURL"
                  width="70"
                  height="70"
                  onError={(e) => {
                    onImageError(
                      e,
                      "profile",
                      `${item?.endorsedByUser?.firstName} ${item?.endorsedByUser?.lastName}`
                    );
                  }}
                />
              </picture>
              <div className="ml-2 text-left">
                <h5 className="card-title font-18 text-secondary font-bold mb-10">
                  {item?.endorsedByUser?.firstName}{" "}
                  {item?.endorsedByUser?.lastName}
                </h5>
                <span>
                  {item?.endorsedByUser?.currentPosition
                    ? item?.endorsedByUser?.currentPosition
                    : "No Position Added yet"}
                </span>
              </div>
            </div>
          ))}
      </Card.Body>
    </Modal.Body>
  );
};

export default Endorsements;
