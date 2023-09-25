import React, { useState, Fragment, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Speakers from "components/common/virtualEvents/Speakers";
import Groups from "components/common/virtualEvents/Groups";

const RoomFeatures = () => {
  /******************** 
  @purpose : Used for use state
  @Parameter : { data, dispatch }
  @Author : INIC
  ******************/
  const router = useRouter();
  const [lang] = useTranslation("language");
  const { roomDetail } = useSelector((state) => state?.room);
  const [isReadDesc, setIsReadDesc] = useState(true);
  const [isReadGoal, setIsReadGoal] = useState(true);

  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  return (
    <Fragment>
      <Card className="border-0">
        <Card.Body className="px-3 px-sm-4 pt-2 pt-sm-4 pb-lg-4 pb-0 ">
          {(roomDetail?.virtualEventType === "training-room" ||
            roomDetail?.virtualEventType === "webinar" ||
            roomDetail?.virtualEventType === "master-class") && (
            <div className="desc border-bottom-blueberry-whip mb-4 pb-3">
              <h3 className="h6 font-24">{lang("ROOMS.GOAL")}</h3>
              <p className="text-body-14 font-weight-normal m-0">
                <p
                  dangerouslySetInnerHTML={{
                    __html: isReadGoal
                      ? roomDetail.enterRoomGoal?.slice(0, 200)
                      : roomDetail.enterRoomGoal,
                  }}
                />

                {roomDetail.enterRoomGoal?.length > 200 && (
                  <a
                    type="button"
                    onClick={() => setIsReadGoal(!isReadGoal)}
                    className="text-blue-dress"
                  >
                    {isReadGoal
                      ? lang("COMMON.READ_MORE")
                      : lang("COMMON.READ_LESS")}
                  </a>
                )}
              </p>
            </div>
          )}

          <div className="border-bottom-blueberry-whip desc mb-4 pb-3">
            <h3 className="h6">{lang("ROOMS.DESCRIPTION")}</h3>
            <p className="text-body-14 font-weight-normal m-0">
              <p
                dangerouslySetInnerHTML={{
                  __html: isReadDesc
                    ? roomDetail.fullDescription?.slice(0, 500)
                    : roomDetail.fullDescription,
                }}
              />

              {roomDetail.fullDescription?.length > 200 && (
                <a
                  type="button"
                  onClick={() => setIsReadDesc(!isReadDesc)}
                  className="text-blue-dress"
                >
                  {isReadDesc
                    ? lang("COMMON.READ_MORE")
                    : lang("COMMON.READ_LESS")}
                </a>
              )}
            </p>
          </div>

          <Speakers />

          {roomDetail.joiningGroupLink !== "" &&
            roomDetail.joiningGroupLink !== null && <Groups />}
        </Card.Body>
      </Card>
    </Fragment>
  );
};
export default RoomFeatures;
