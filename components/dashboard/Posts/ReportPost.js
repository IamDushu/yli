import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { reportPostData, toggleModals } from "store/actions";
/******************** 
@purpose :  Report Post 
@Parameter : {}
@Author : INIC
******************/
function ReportPost() {
  const dispatch = useDispatch();
  const { reportPostId } = useSelector((state) => state.post);
  const [reason, setReason] = useState("");

  const submitHandler = () => {
    dispatch(reportPostData({ id: reportPostId, reason }));
    dispatch(toggleModals({ reportpost: false }));
  };

  return (
    <Form >
      <div className="px-3">
        <h3 className="font-20 font-weight-semibold text-secondary mb-3">
          Are you report this post?
        </h3>
        <h5 className="font-14 font-weight-normal text-black">
          Reason (Optional)
        </h5>
        
        <textarea
          className="form-control mb-3"
          onChange={(e) => setReason(e.target.value)}
        />
        </div>
        <div className="text-center d-flex justify-content-between border-top-dark px-3 pt-3">
          <Button
            variant="btn  font-weight-semibold btn-sm text-uppercase py-12 mr-3 btn-dark "
            onClick={() => dispatch(toggleModals({ reportpost: false }))}
          >
            Back
          </Button>
          <Button
            variant="btn btn-info btn-sm font-weight-semibold text-uppercase py-12 ml-3 "
            onClick={() => submitHandler()}
          >
            Submit
          </Button>
        </div>
     
    </Form>
  );
}

export default ReportPost;
