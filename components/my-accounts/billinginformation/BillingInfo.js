import React, { Fragment, useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addCommunicationNotification,
  getCommunication,
} from "store/actions/communication";
/******************** 
  @purpose : Recieve Notification
  @Parameter : {}
  @Author : INIC
  ******************/
const BillingInfo = () => {
  const dispatch = useDispatch();
  const { billinginformation } = useSelector(
    (state) => state.billinginformation
  );
  const [notification, setNotification] = useState(
    billinginformation?.notificationSettings
  );

  useEffect(() => {
    dispatch(getCommunication());
  }, []);

  useEffect(() => {
    if (billinginformation)
      setNotification(billinginformation?.notificationSettings);
  }, [billinginformation]);

  return (
    <Fragment>
      <div className="card mb-20">
        <div className="p-0 card-body">
          <div className="p-4">
            <h3 className="h6 pb-4 mb-0">Billing Information</h3>
            <form>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label">Fiscal Number</label>
                    <div className="w-100">
                      <input
                        name="fiscalnumber"
                        placeholder="Enter"
                        type="text"
                        className="form-control"
                        value="Enter"
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label">VAT No.</label>
                    <div className="w-100">
                      <input
                        name="vat no"
                        placeholder="Enter"
                        type="text"
                        className="form-control"
                        value="Enter"
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label">IBAN</label>
                    <div className="w-100">
                      <input
                        name="iban"
                        placeholder="Enter"
                        type="text"
                        className="form-control"
                        value="Enter"
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label">BIC/SWIFT Number</label>
                    <div className="w-100">
                      <input
                        name="bic/swift number"
                        placeholder="Enter"
                        type="text"
                        className="form-control"
                        value="Enter"
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label">PEC</label>
                    <div className="w-100">
                      <input
                        name="pec"
                        placeholder="Enter"
                        type="text"
                        className="form-control"
                        value="Enter"
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label">CU</label>
                    <div className="w-100">
                      <input
                        name="cu"
                        placeholder="Enter"
                        type="text"
                        className="form-control"
                        value="Enter"
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="custom-modal-footer custom-footer text-center d-flex border-top border-geyser justify-content-between p-4">
            <button
              type="button"
              className="btn btn-btn btn-dark font-weight-semibold"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-btn btn-info font-weight-semibold px-30"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BillingInfo;
