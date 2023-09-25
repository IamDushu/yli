import { Layout } from "@components/layout";
import { APP_URL } from "config";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getSuggestedJobActivities, toggleModals } from "store/actions";
import Courses from "./Courses";
import Events from "./Events";
import MasterClasses from "./MasterClasses";
import Rooms from "./Rooms";
import Webinars from "./Webinars";
import { Add, MyProfile, GrowthModal, SiteLinks } from "components/sidebar";
import dynamic from "next/dynamic";
const MainModal = dynamic(() =>
  import("components/modal").then((mod) => mod.MainModal)
);
const AddToGMModal = dynamic(() =>
  import("components/modal").then((mod) => mod.AddToGMModal)
);
function SuggestedActivity({ jobId, skillName }) {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const router = useRouter();
  const activityData = useSelector(
    (state) => state?.learningInstitute?.suggestedActivityList
  );
  const [page, setPage] = useState(1);
  const [pagesize, setPagesize] = useState(100);

  /*******************
  @purpose : For initial suggested activities
  @param : {}
  @Author : INIC
  ******************/
  useEffect(() => {
    let data = {
      page,
      pagesize,
      jobId,
      skill: skillName,
    };
    dispatch(getSuggestedJobActivities(data));
  }, []);

  const initGModalData = {
    activityCategory: "",
    activityTitle: "",
    activityId: "",
    activityLink: "",
  };
  const { addtoGrowthModelSAC } = useSelector(
    ({ ui }) => ui.modals,
    shallowEqual
  );

  const [gmodalData, setGmodalData] = useState(initGModalData);

  const addToGModalToggleSAC = (id = "", title = "", postLink, type) => {
    if (id !== "") {
      setGmodalData((state) => ({
        ...state,
        activityCategory: type,
        activityId: id,
        activityTitle: title,
        activityLink: postLink,
      }));
      dispatch(toggleModals({ addtoGrowthModelSAC: true }));
    } else {
      setGmodalData({ ...initGModalData });
      dispatch(toggleModals({ addtoGrowthModelSAC: false }));
    }
  };

  const addtoGrowthSAC = (id, title, type, link) => {
    let postLink = `${APP_URL}/course-detail/${id}`;
    addToGModalToggleSAC(id, title, postLink, type);
  };
  const addtoGrowthSARoom = (id, title, type, link) => {
    let postLink = `${APP_URL}/virtual-events/${id}`;
    addToGModalToggleSAC(id, title, postLink, type);
  };

  const addtoGrowthSAWebinar = (id, title, type, link) => {
    let postLink = `${APP_URL}/virtual-events/${id}`;
    addToGModalToggleSAC(id, title, postLink, type);
  };

  const addtoGrowthSAMasterclass = (id, title, type, link) => {
    let postLink = `${APP_URL}/virtual-events/${id}`;
    addToGModalToggleSAC(id, title, postLink, type);
  };

  const addtoGrowthSAEvents = (id, title, type, link) => {
    let postLink = `${APP_URL}/virtual-events/${id}`;
    addToGModalToggleSAC(id, title, postLink, type);
  };

  /*******************
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  return (
    <Layout removeSidebar="footer">
      <div className="inner-wrapper profile-wrapper my-profile">
        <Container>
          <div className="d-flex flex-md-nowrap flex-wrap">
            {/* left profile section */}
            <div className="left-profile-section">
              {/* profile section */}
              <MyProfile />
              {/* growth modal listing */}
              <GrowthModal />
              <div className="sticky-fix">
                <Add />
                <SiteLinks />
              </div>
            </div>
            {/* <div
            className="d-flex pointer"
            onClick={() => router.push("/job-offers")}
          >
            <i className="bx bx-arrow-back mr-3"></i>
            <p className="text-body-14 text-uppercase text-underline">
              Back to jobs
            </p>
          </div> */}
            <div className="d-flex flex-wrap d-xl-nowrap mt-3 mt-md-0 w-100">
              <Container className="fluid px-0">
                <Card>
                  <Card.Header className="p-3 p-md-4 border-bottom border-dark">
                    <h6 className="mb-0">
                      {" "}
                      {lang("JOBS.JOB_OFFERS.SUGGESTED_ACTIVITIES_YLIWAY")}
                    </h6>
                  </Card.Header>
                </Card>
                <Card className="mb-2">
                  {activityData?.course?.length > 0 && (
                    <Card.Body className="p-0">
                      <Courses
                        activityData={activityData}
                        addtoGrowthSAC={addtoGrowthSAC}
                        router={router}
                      />
                    </Card.Body>
                  )}
                </Card>
                {activityData?.trainingRoom?.length > 0 && (
                  <Card className="mb-2">
                    <Card.Body className="p-0">
                      <Rooms
                        activityData={activityData}
                        addtoGrowthSARoom={addtoGrowthSARoom}
                        router={router}
                      />
                    </Card.Body>
                  </Card>
                )}

                {activityData?.webinar?.length > 0 && (
                  <Card className="mb-2">
                    <Card.Body className="p-0">
                      <Webinars
                        activityData={activityData}
                        addtoGrowthSAWebinar={addtoGrowthSAWebinar}
                        router={router}
                      />
                    </Card.Body>
                  </Card>
                )}

                {activityData?.masterClass?.length > 0 && (
                  <Card className="mb-2">
                    <Card.Body className="p-0">
                      <MasterClasses
                        activityData={activityData}
                        addtoGrowthSAMasterclass={addtoGrowthSAMasterclass}
                        router={router}
                      />
                    </Card.Body>
                  </Card>
                )}

                {activityData?.event?.length > 0 && (
                  <Card className="mb-2">
                    <Card.Body className="p-0">
                      <Events
                        activityData={activityData}
                        addtoGrowthSAEvents={addtoGrowthSAEvents}
                        router={router}
                      />
                    </Card.Body>
                  </Card>
                )}
              </Container>
            </div>

            {/* right blog section */}
          </div>
        </Container>
      </div>
      <MainModal
        className="add-to-gmodal modal"
        show={addtoGrowthModelSAC}
        keyModal="addtoGrowthModelSAC"
        body={
          <AddToGMModal
            toggleGMModal={addToGModalToggleSAC}
            data={gmodalData}
            suggestedCourse={"suggestedCourse"}
            jobId={jobId}
          />
        }
        headerClassName="mb-50 block md-mb-30"
        header={<h2 className="h6 mb-0">Add to GM</h2>}
      />
    </Layout>
  );
}

export default SuggestedActivity;
