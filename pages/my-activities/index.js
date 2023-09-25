import { Layout } from "components/layout";
import { MyActivities } from "components/my-activities";
import { Add, GrowthModal, MyProfile } from "components/sidebar";
import WithAuth from "components/with-auth/with-auth";
import dynamic from "next/dynamic";
import React, { Fragment, useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchMyLearningPaginationData } from "store/actions";
const MainModal = dynamic(() =>
  import("components/modal").then((mod) => mod.MainModal)
);
const AddFeedback = dynamic(() => import("components/modal/add-feedback"));
const PurchaseCoursesList = () => {
  const dispatch = useDispatch();
  const [pagesize, setPagesize] = useState({
    pagesizeCourse: 3,
    pagesizeTraining: 3,
    pagesizeCoaching: 3,
    pagesizeWebinar: 3,
    pagesizeBnr: 3,
    pagesizeEvent: 3,
    pagesizeMasterclass: 3,
    pagesizeWelcome: 3,
  });
  const [total, setTotal] = useState({
    totalCourse: 1,
    totalTraining: 1,
    totalCoaching: 1,
    totalWebinar: 1,
    totalBnr: 1,
    totalEvent: 1,
    totalMasterclass: 1,
    totalWelcomeRooms: 1,
  });

  const [learningModalValues, setLearningModalValues] = useState({
    mylearning: {},
  });

  const {
    myLearningCourseList,
    myLearningtraining_roomList,
    myLearningevent_List,
    myLearningWebinarList,
    myLearningCoaching_roomList,
    myLearningBnrList,
    myLearningMaster_classList,
    myLearningWelcome,
  } = useSelector((state) => state.courses);
  const { mylearning } = useSelector(({ ui }) => ui.modals, shallowEqual);

  //calling api on page change

  useEffect(() => {
    courseData();
  }, [pagesize?.pagesizeCourse]);

  useEffect(() => {
    traindata();
  }, [pagesize?.pagesizeTraining]);

  useEffect(() => {
    webinardata();
  }, [pagesize?.pagesizeWebinar]);

  useEffect(() => {
    coachingdata();
  }, [pagesize?.pagesizeCoaching]);

  useEffect(() => {
    eventdata();
  }, [pagesize?.pagesizeEvent]);

  useEffect(() => {
    bnrdata();
  }, [pagesize?.pagesizeBnr]);

  useEffect(() => {
    masterclassdata();
  }, [pagesize?.pagesizeMasterclass]);

  useEffect(() => {
    welcomeRoomData();
  }, [pagesize?.pagesizeWelcome]);

  // setting total for pagination

  useEffect(() => {
    if (myLearningCourseList) {
      setTotal({ ...total, totalCourse: myLearningCourseList?.total });
    }
  }, [myLearningCourseList]);

  useEffect(() => {
    if (myLearningCourseList) {
      setTotal({ ...total, totalWelcomeRooms: myLearningWelcome?.total });
    }
  }, [myLearningWelcome]);

  useEffect(() => {
    if (myLearningtraining_roomList) {
      setTotal({ ...total, totalTraining: myLearningtraining_roomList?.total });
    }
  }, [myLearningtraining_roomList]);

  useEffect(() => {
    if (myLearningCoaching_roomList) {
      setTotal({ ...total, totalCoaching: myLearningCoaching_roomList?.total });
    }
  }, [myLearningCoaching_roomList]);

  useEffect(() => {
    if (myLearningWebinarList) {
      setTotal({ ...total, totalWebinar: myLearningWebinarList?.total });
    }
  }, [myLearningWebinarList]);

  useEffect(() => {
    if (myLearningBnrList) {
      setTotal({ ...total, totalBnr: myLearningBnrList?.total });
    }
  }, [myLearningBnrList]);

  useEffect(() => {
    if (myLearningevent_List) {
      setTotal({ ...total, totalEvent: myLearningevent_List?.total });
    }
  }, [myLearningevent_List]);

  useEffect(() => {
    if (myLearningMaster_classList) {
      setTotal({
        ...total,
        totalMasterclass: myLearningMaster_classList?.total,
      });
    }
  }, [myLearningMaster_classList]);

  /********************************************************
   * GET data virtual events functions
   * @author INIC
   ********************************************************/

  const courseData = () => {
    const body = {
      page: 1,
      pagesize: pagesize?.pagesizeCourse,
      type: "course",
    };
    dispatch(fetchMyLearningPaginationData(body));
  };

  const traindata = () => {
    const body = {
      page: 1,
      pagesize: pagesize?.pagesizeTraining,
      type: "training-room",
    };
    dispatch(fetchMyLearningPaginationData(body));
  };
  const webinardata = () => {
    const body = {
      page: 1,
      pagesize: pagesize?.pagesizeWebinar,
      type: "webinar",
    };
    dispatch(fetchMyLearningPaginationData(body));
  };

  const bnrdata = () => {
    const body = {
      page: 1,
      pagesize: pagesize?.pagesizeBnr,
      type: "business-network-room",
    };
    dispatch(fetchMyLearningPaginationData(body));
  };
  const masterclassdata = () => {
    const body = {
      page: 1,
      pagesize: pagesize?.pagesizeMasterclass,
      type: "master-class",
    };
    dispatch(fetchMyLearningPaginationData(body));
  };
  const coachingdata = () => {
    const body = {
      page: 1,
      pagesize: pagesize?.pagesizeCoaching,
      type: "coaching-room",
    };
    dispatch(fetchMyLearningPaginationData(body));
  };

  const eventdata = () => {
    const body = {
      page: 1,
      pagesize: pagesize?.pagesizeEvent,
      type: "event",
    };
    dispatch(fetchMyLearningPaginationData(body));
  };
  const welcomeRoomData = () => {
    const body = {
      page: 1,
      pagesize: pagesize?.pagesizeWelcome,
      type: "welcome-room",
    };
    dispatch(fetchMyLearningPaginationData(body));
  };

  return (
    <Fragment>
      <Layout>
        <div className="inner-wrapper my-learning-box">
          <Container>
            <div className="d-flex flex-wrap inner-right-full-orsidebar">
              <div className="profile-left-bar">
                <MyProfile />
                <GrowthModal />
                <Add />
              </div>
              <div className="profile-right-bar mt-3 mt-md-0">
                {myLearningCourseList?.rows?.length > 0 ||
                myLearningWelcome?.rows?.length > 0 ||
                myLearningtraining_roomList?.rows?.length > 0 ||
                myLearningCoaching_roomList?.rows.length > 0 ||
                myLearningWebinarList?.rows?.length > 0 ||
                myLearningBnrList?.rows?.length > 0 ||
                myLearningevent_List?.rows?.length > 0 ||
                myLearningMaster_classList?.rows?.length > 0 ? (
                  <MyActivities
                    total={total}
                    pagesize={pagesize}
                    setPagesize={setPagesize}
                    myLearningCourseList={myLearningCourseList}
                    myLearningtraining_roomList={myLearningtraining_roomList}
                    myLearningevent_List={myLearningevent_List}
                    myLearningWebinarList={myLearningWebinarList}
                    myLearningCoaching_roomList={myLearningCoaching_roomList}
                    myLearningBnrList={myLearningBnrList}
                    myLearningMaster_classList={myLearningMaster_classList}
                    myLearningWelcome={myLearningWelcome}
                  />
                ) : (
                  <Card className="mt-0 pt-4 pb-4">
                    <h4 className="px-3">No Activity Found</h4>
                  </Card>
                )}
              </div>
            </div>
          </Container>
        </div>
        <MainModal
          className="my-learning"
          show={mylearning}
          keyModal="mylearning"
          header={<h6>Rating and Review</h6>}
          body={<AddFeedback data={learningModalValues.mylearning} />}
          headerClassName="mb-50 block md-mb-30"
          backdrop="static"
        />
      </Layout>
    </Fragment>
  );
};

export default WithAuth(PurchaseCoursesList);
