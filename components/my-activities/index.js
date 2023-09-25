import React from "react";
import { Card } from "react-bootstrap";
import { toggleModal } from "store/actions";
import { CoachingRoom } from "./CoachingRoom";
import { MyActivitiesCoursesList } from "./CoursesList";
import { EventsRoom } from "./EventsRoom";
import { Masterclass } from "./MasterClass";
import { TrainingRoom } from "./TrainingRoom";
import { WebinarList } from "./WebinarList";
import { WelcomeRoom } from "./WelcomeRoom";
import { useSelector } from "react-redux";
import { selectUserInfo } from "store/selectors/user";
import { BusinessNetworkRoom } from "./BusinessNetworkRoom";

export const MyActivities = ({
  total,
  setPagesize,
  pagesize,
  myLearningCourseList,
  myLearningtraining_roomList,
  myLearningevent_List,
  myLearningWebinarList,
  myLearningCoaching_roomList,
  myLearningBnrList,
  myLearningMaster_classList,
  myLearningWelcome,
}) => {
  const userInfo = useSelector(selectUserInfo);

  const showModalWithValue = (name, values) => {
    learningModalValues[name] = values;
    setLearningModalValues((state) => ({ ...state, ...learningModalValues }));
    dispatch(toggleModal(true, name));
  };
  return (
    <Card style={{ backgroundColor: "transparent", border: "0" }}>
      <Card.Body
        className="m-0 p-0"
        style={{ backgroundColor: "transparent", border: "0" }}
      >
        {myLearningWelcome && myLearningWelcome?.rows?.length > 0 && (
          <WelcomeRoom
            total={total}
            setPagesize={setPagesize}
            pagesize={pagesize}
            myLearningWelcome={myLearningWelcome}
            userInfo={userInfo}
          />
        )}
        {myLearningCourseList && myLearningCourseList?.rows?.length > 0 && (
          <MyActivitiesCoursesList
            total={total}
            setPagesize={setPagesize}
            pagesize={pagesize}
            myLearningCourseList={myLearningCourseList}
            showModalWithValue={showModalWithValue}
          />
        )}
        {myLearningtraining_roomList &&
          myLearningtraining_roomList?.rows?.length > 0 && (
            <TrainingRoom
              total={total}
              setPagesize={setPagesize}
              pagesize={pagesize}
              showModalWithValue={showModalWithValue}
              myLearningtraining_roomList={myLearningtraining_roomList}
              userInfo={userInfo}
            />
          )}
        {myLearningCoaching_roomList &&
          myLearningCoaching_roomList?.rows.length > 0 && (
            <CoachingRoom
              total={total}
              setPagesize={setPagesize}
              pagesize={pagesize}
              showModalWithValue={showModalWithValue}
              myLearningCoaching_roomList={myLearningCoaching_roomList}
              userInfo={userInfo}
            />
          )}
        {myLearningWebinarList && myLearningWebinarList?.rows?.length > 0 && (
          <WebinarList
            total={total}
            setPagesize={setPagesize}
            showModalWithValue={showModalWithValue}
            pagesize={pagesize}
            myLearningWebinarList={myLearningWebinarList}
            userInfo={userInfo}
          />
        )}
        {myLearningBnrList && myLearningBnrList?.rows?.length > 0 && (
          <BusinessNetworkRoom
            total={total}
            setPagesize={setPagesize}
            pagesize={pagesize}
            myLearningBnrList={myLearningBnrList}
            showModalWithValue={showModalWithValue}
            userInfo={userInfo}
          />
        )}{" "}
        {myLearningevent_List && myLearningevent_List?.rows?.length > 0 && (
          <EventsRoom
            total={total}
            setPagesize={setPagesize}
            pagesize={pagesize}
            showModalWithValue={showModalWithValue}
            myLearningevent_List={myLearningevent_List}
            userInfo={userInfo}
          />
        )}{" "}
        {myLearningMaster_classList &&
          myLearningMaster_classList?.rows?.length > 0 && (
            <Masterclass
              total={total}
              setPagesize={setPagesize}
              pagesize={pagesize}
              myLearningMaster_classList={myLearningMaster_classList}
              showModalWithValue={showModalWithValue}
              userInfo={userInfo}
            />
          )}
      </Card.Body>
    </Card>
  );
};
