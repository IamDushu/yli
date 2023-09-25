import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { deleteGroup, getGroupsList, toggleModals } from "../../store/actions";

/*******************   
@purpose : Group Delete
@Author : INIC
******************/
export const GroupDeleteConfirms = () => {
  const dispatch = useDispatch();
  const [lang] = useTranslation("language");
  const { groupId } = useSelector(({ groups }) => groups);
  const { myGroupDetails } = useSelector(({ groups }) => groups);

  const handleClick = () => {
    dispatch(deleteGroup(groupId)).then(() => {
      dispatch(getGroupsList(myGroupDetails));
      dispatch(toggleModals({ groupdeleteconfirms: false }));
    });
  };

  return (
    <>
      <Modal.Body className="text-center">
        <em className="bx bx-info-circle text-info bg-icon-modal"></em>
        <div className="mx-lg-5 px-sm-2">
          <h2 className="h-1 font-md-20 font-medium mt-md-5 mt-2 mb-4">
            {lang("GROUP.COMMON.DELETE_THIS_GROUP")}
          </h2>
          <div className="d-flex w-lg-75 m-auto justify-content-center pb-3">
            <Button
              variant="outline-info"
              type="submit"
              className="mb-50 md-mb-30 font-weight-semibold text-uppercase mt-4 w-50 w-sm-100 mx-sm-3"
              onClick={() =>
                dispatch(toggleModals({ groupdeleteconfirms: false }))
              }
            >
              {lang("COMMON.BACK")}
            </Button>
            <Button
              variant="info"
              type="submit"
              className="mb-50 md-mb-30 font-weight-semibold text-uppercase mt-4 w-50 w-sm-100 mx-sm-3"
              onClick={handleClick}
            >
              {lang("COMMON.YES")}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </>
  );
};
