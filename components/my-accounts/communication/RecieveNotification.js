import React, { Fragment, useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
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
const RecieveNotification = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const { communication } = useSelector((state) => state.communication);
  const [notification, setNotification] = useState(
    communication?.notificationSettings
  );
  
  useEffect(() => {
    dispatch(getCommunication());
  }, []);

  useEffect(() => {
    if (communication) setNotification(communication?.notificationSettings);
  }, [communication]);

  return (
    <Fragment>
      <Card>
        <Card.Body>
          <ul className="listing-section border-first-0 pt-first-0 pb-last-0 py-lg">
            <li className="listing-box justify-content-between">
              <div className="pr-3">
                <h4 className="text-body-16">
                  {lang(
                    "MY_ACCOUNTS.COMMUNICATION.HOW_YOU_RECIEVE_NOTIFICATION.ON_YLIWAY"
                  )}
                </h4>
                <p className="text-body-14 font-weight-normal m-0">
                  {lang(
                    "MY_ACCOUNTS.COMMUNICATION.HOW_YOU_RECIEVE_NOTIFICATION.ON_YLIWAY_DESCRIPTION"
                  )}
                </p>
              </div>
              <div>
                <label className="switch mb-0">
                  <input
                    type="checkbox"
                    name="yliway"
                    checked={notification?.yliway}
                    onClick={async() => {
                      await setNotification({
                        ...notification,
                        yliway: !notification?.yliway,
                      });
                      await  dispatch(
                        addCommunicationNotification({
                          ...notification,
                          yliway: !notification?.yliway,
                        })
                      );
                      await dispatch(getCommunication());
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
                  {lang(
                    "MY_ACCOUNTS.COMMUNICATION.HOW_YOU_RECIEVE_NOTIFICATION.EMAIL"
                  )}
                </h4>
                <p className="text-body-14 font-weight-normal m-0">
                  {lang(
                    "MY_ACCOUNTS.COMMUNICATION.HOW_YOU_RECIEVE_NOTIFICATION.EMAIL_DESCRIPTION"
                  )}
                </p>
              </div>
              <div>
                <label className="switch mb-0">
                  <input
                    type="checkbox"
                    name="email"
                    checked={notification?.email}
                    onClick={async() => {
                      await  setNotification({
                        ...notification,
                        email: !notification?.email,
                      });
                      await dispatch(
                        addCommunicationNotification({
                          ...notification,
                          email: !notification?.email,
                        })
                      );
                      await dispatch(getCommunication());
                    }}
                  />
                  <span className="switch-slider round"></span>
                </label>
              </div>
            </li>
            <li className="listing-box justify-content-between">
              <div className="pr-3">
                <h4 className="text-body-16">
                  {lang(
                    "MY_ACCOUNTS.COMMUNICATION.HOW_YOU_RECIEVE_NOTIFICATION.PUSH"
                  )}
                </h4>
                <p className="text-body-14 font-weight-normal m-0">
                  {lang(
                    "MY_ACCOUNTS.COMMUNICATION.HOW_YOU_RECIEVE_NOTIFICATION.PUSH_DESCRIPTION"
                  )}
                </p>
              </div>
              <div>
                <label className="switch mb-0">
                  <input
                    type="checkbox"
                    name="push"
                    checked={notification?.push}
                    onChange={async() => {
                      await  setNotification({
                        ...notification,
                        push: !notification?.push,
                      });
                      await dispatch(
                        addCommunicationNotification({
                          ...notification,
                          push: !notification?.push,
                        })
                      );
                      await  dispatch(getCommunication());
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

export default RecieveNotification;
