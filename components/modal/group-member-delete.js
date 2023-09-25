import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { groupLeave, toggleModals } from "store/actions";

function GroupMemberDelete() {
  const dispatch = useDispatch();
  const { memberDetails } = useSelector(({ groups }) => groups);

  /******************** 
@purpose : Used for delete Member
@Parameter : { groupId, userId }
@Author : INIC
******************/
  const deleteMemberHandler = () => {
    let body = {
      groupId: memberDetails.groupId,
      userId: memberDetails.userId,
      removedBy: "admin",
    };
    dispatch(groupLeave(body));
    dispatch(toggleModals({ groupmemberdelete: false }));
  };

  return (
    <Modal.Body className="text-center">
      <em className="bx bx-info-circle text-info bg-icon-modal"></em>
      <div className="mx-lg-5 px-sm-2">
        <h2 className="h-1 font-md-20 font-medium mt-md-5 mt-2 mb-4">
          Are you sure you want to delete this member ?
        </h2>
        <div className="d-flex w-lg-75 m-auto justify-content-center pb-3">
          <Button
            variant="outline-info"
            type="submit"
            className="mb-50 md-mb-30 font-weight-semibold text-uppercase mt-4 w-50 w-sm-100 mx-sm-3"
            onClick={() => dispatch(toggleModals({ groupmemberdelete: false }))}
          >
            Back
          </Button>
          <Button
            variant="info"
            type="submit"
            className="mb-50 md-mb-30 font-weight-semibold text-uppercase mt-4 w-50 w-sm-100 mx-sm-3"
            onClick={deleteMemberHandler}
          >
            Yes
          </Button>
        </div>
      </div>
    </Modal.Body>
  );
}

export default GroupMemberDelete;
