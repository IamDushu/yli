import React from "react";
import { toggleModals } from "store/actions";

const AddInformation = ({ dispatch, userInfo }) => {
  return (
    <div className="mt-xl-1 mt-3">
      {userInfo.experience && userInfo.experience.length === 0 && (
        <button
          type="button"
          onClick={() => dispatch(toggleModals({ addexperience: true }))}
          className="btn btn-btn btn-outline-info mr-3 mb-sm-0 mb-2"
        >
          Add Experience
        </button>
      )}

      {userInfo.certificate && userInfo.certificate.length === 0 && (
        <button
          type="button"
          onClick={() => dispatch(toggleModals({ addcertificate: true }))}
          className="btn btn-btn btn-outline-info mr-3"
        >
          Add Certificate
        </button>
      )}

      {userInfo.educationDetails && userInfo.educationDetails.length === 0 && (
        <button
          type="button"
          onClick={() => dispatch(toggleModals({ addeducation: true }))}
          className="btn btn-btn btn-outline-info"
        >
          Add Education
        </button>
      )}
    </div>
  );
};

export default AddInformation;
