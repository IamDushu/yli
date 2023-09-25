import React, { Fragment, useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addCommunicationMessaging } from "store/actions/communication";
/******************** 
  @purpose : Messaging
  @Parameter : {}
  @Author : INIC
  ******************/
const Messaging = () => {
  const [lang] = useTranslation("language");
  const { communication } = useSelector((state) => state.communication);
  const dispatch = useDispatch();
  const [messaging, setMessaging] = useState(communication?.messaging);

  return (
    <Fragment>
      <Card>
        <Card.Body>
          <ul className="listing-section border-first-0 pt-first-0 pb-last-0 py-lg">
            <li className="listing-box justify-content-between">
              <div className="pr-3">
                <h4 className="text-body-16">
                  {lang("MY_ACCOUNTS.COMMUNICATION.MESSAGING.READ_RECIEPTS")}
                </h4>
                <p className="text-body-14 font-weight-normal m-0">
                  {lang(
                    "MY_ACCOUNTS.COMMUNICATION.MESSAGING.READ_RECIEPTS_DESCRIPTION"
                  )}
                </p>
              </div>
              <div>
                <label className="switch mb-0">
                  <input
                    type="checkbox"
                    checked={messaging?.readRecipts}
                    onClick={() => {
                      setMessaging({
                        ...messaging,
                        readRecipts: !messaging?.readRecipts,
                      });
                      dispatch(
                        addCommunicationMessaging({
                          ...messaging,
                          readRecipts: !messaging?.readRecipts,
                        })
                      );
                    }}
                  />
                  <span className="switch-slider round"></span>
                </label>
              </div>
            </li>
            <li className="listing-box justify-content-between">
              <div className="pr-3">
                <h4 className="text-body-16">
                  {" "}
                  {lang("MY_ACCOUNTS.COMMUNICATION.MESSAGING.WRITE_INDICATORS")}
                </h4>
                <p className="text-body-14 font-weight-normal m-0">
                  {lang(
                    "MY_ACCOUNTS.COMMUNICATION.MESSAGING.WRITE_INDICATORS_DESCRIPTION"
                  )}
                </p>
              </div>
              <div>
                <label className="switch mb-0">
                  <input
                    type="checkbox"
                    checked={messaging?.writeIndiactors}
                    onClick={() => {
                      setMessaging({
                        ...messaging,
                        writeIndiactors: !messaging?.writeIndiactors,
                      });
                      dispatch(
                        addCommunicationMessaging({
                          ...messaging,
                          writeIndiactors: !messaging?.writeIndiactors,
                        })
                      );
                    }}
                  />
                  <span className="switch-slider round"></span>
                </label>
              </div>
            </li>
          </ul>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default Messaging;
