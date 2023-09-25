import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Trans, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toggleModals } from "store/actions";
import moment from "moment";

const ExpireNotification = ({ isJoined }) => {
  const [lang] = useTranslation("language");
  const [expireTimer, setExpireTimer] = useState(15);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const instantYlimeetData = useSelector(
    (state) => state.yliMeet.instantMeetingDetail
  );

  useEffect(() => {
    let warnTimer, expireInterval;
    if (
      instantYlimeetData &&
      instantYlimeetData.meetDate &&
      userInfo.id === instantYlimeetData.creatorUserId
    ) {
      const startTime = moment(instantYlimeetData.meetDate);
      const endTime = startTime.add(instantYlimeetData.duration, "minutes");
      const currentTime = moment();
      const warnDuration = endTime.subtract(15, "minutes").diff(currentTime, "milliseconds");
      if (warnDuration <= 0) {
        setIsVisible(true);
        setExpireTimer(0);
      } else {
        warnTimer = setTimeout(() => {
          setIsVisible(true);
          expireInterval = setInterval(() => {
            setExpireTimer((prevState) => prevState > 0 ? prevState - 1 : 0);
          }, 60000);
        }, warnDuration);
      }
    }

    return () => {
      warnTimer && clearTimeout(warnTimer);
      expireInterval && clearInterval(expireInterval);
    };
  }, [instantYlimeetData]);

  return (
    <div>
      {
      isJoined && isVisible && 
      userInfo.id === instantYlimeetData.creatorUserId && (
        <div className="expire-notification" style={{zIndex:"1", position:"relative"}}>
          <div className="d-flex">
            <i class="bx bxs-error icon mt-1"></i>
            <span className="pt-2 pl-2 notification">
              <Trans 
                t={lang}
                i18nKey="YLIMEET.INSTANT_YLIMEET.EXPIRE_NOTIFICATION_MESSAGE"
                values={{ minute: expireTimer }}
                components={[<strong></strong>]}
              />
            </span>
          </div>
          <div>
            <Button
              variant="btn btn-upgrade_plan mr-2"
              onClick={() => {
                setIsVisible(false);
                dispatch(toggleModals({ upgradeplans: true }));
              }}
              style={{padding:"5px"}}
            >
              <span className="btn-dismiss-txt">
                {lang("YLIMEET.INSTANT_YLIMEET.UPGRADE_PLAN")}
              </span>
            </Button>
            <Button
              variant="btn btn-dismiss ml-2"
              onClick={() => setIsVisible(false)}
              style={{padding:"5px"}}
            >
              <span className="btn-dismiss-txt">
                {lang("YLIMEET.INSTANT_YLIMEET.DISMISS")}
              </span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpireNotification;
