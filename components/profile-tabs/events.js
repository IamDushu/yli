import { APP_URL } from "config";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { toggleModals } from "store/actions";
import { learningInstituteEvents } from "store/actions/learningInstitute";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import EventCard from "./events-card";

const MainModal = dynamic(() =>
  import("components/modal").then((mod) => mod.MainModal)
);
const AddToGMModal = dynamic(() =>
  import("components/modal").then((mod) => mod.AddToGMModal)
);

const Eventmodule = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const router = useRouter();
  const { instituteId } = router.query;
  const { eventDataPast, eventDataUpcoming } = useSelector(
    (data) => data.learningInstitute
  );
  const timestamp = Math.floor(new Date().getTime() / 1000);

  const eventPastPage = 1;
  const [eventPastPageSize, setEventPastPageSize] = useState(3); // 3 list of events.

  const eventUpcomingPage = 1;
  const [eventUpcomingPageSize, setEventUpcomingPageSize] = useState(3); // 3 list of events.

  /******************* 
  @Purpose : Used for Learning institue events
  @Parameter : 
  @Author : INIC
  ******************/
  useEffect(() => {
    dispatch(
      learningInstituteEvents({
        page: eventUpcomingPage,
        pagesize: eventUpcomingPageSize, // 3 list of events all 3 as upcoming
        instituteId: instituteId,
        virtualEventType: "event",
        postType: "upcoming",
        timestamp: timestamp,
      })
    );
  }, [eventUpcomingPageSize]);

  useEffect(() => {
    dispatch(
      learningInstituteEvents({
        page: eventPastPage,
        pagesize: eventPastPageSize, // 3 list of events all 3 as upcoming
        instituteId: instituteId,
        virtualEventType: "event",
        postType: "past",
        timestamp: timestamp,
      })
    );
  }, [eventPastPageSize]);

  /******************* 
  @Purpose : Used for get more events
  @Parameter : 
  @Author : INIC
  ******************/
  const { addtoGrowthModelEvent } = useSelector(
    ({ ui }) => ui.modals,
    shallowEqual
  );

  const initGModalData = {
    activityCategory: "event",
    activityTitle: "",
    activityId: "",
    activityLink: "",
  };

  const [gmodalData, setGmodalData] = useState(initGModalData);

  const addToGModalToggle = (id = "", title = "", postLink) => {
    if (id !== "") {
      setGmodalData((state) => ({
        ...state,
        activityId: id,
        activityTitle: title,
        activityLink: postLink,
        instituteId: instituteId,
      }));
      dispatch(toggleModals({ addtoGrowthModelEvent: true }));
    } else {
      setGmodalData({ ...initGModalData });
      dispatch(toggleModals({ addtoGrowthModelEvent: false }));
    }
  };

  const addtoGrowthMEvents = (id, title, courseType, personalWebsiteLink) => {
    if (courseType === "other") {
      let postLink = personalWebsiteLink;
      addToGModalToggle(id, title, postLink);
    } else {
      let postLink = `${APP_URL}/virtual-events/${id}`;
      addToGModalToggle(id, title, postLink);
    }
  };

  /*******************
        @purpose : Rander HTML/ React Components
        @Author : INIC
        ******************/
  return (
    <React.Fragment>
      <Card className="mb-3 mt-4">
        <div className="d-flex justify-content-between align-items-center px-3 py-3">
          <h3 className="h6 mb-0 font-18 font-weight-bold">Upcoming Events</h3>
        </div>
        <EventCard
          eventData={eventDataUpcoming}
          pageSize={eventUpcomingPageSize}
          setPageSize={setEventUpcomingPageSize}
        />
      </Card>
      <Card className="mb-3">
        <div className="d-flex justify-content-between align-items-center px-3 py-3">
          <h3 className="h6 mb-0 font-18 font-weight-bold">Past Events</h3>
        </div>
        <EventCard
          eventData={eventDataPast}
          pageSize={eventPastPageSize}
          setPageSize={setEventPastPageSize}
        />
      </Card>
      <MainModal
        className="add-to-gmodal modal"
        show={addtoGrowthModelEvent}
        keyModal="addtoGrowthModelEvent"
        body={
          <AddToGMModal
            toggleGMModal={addtoGrowthMEvents}
            data={gmodalData}
            eventtab={"eventtab"}
          />
        }
        headerClassName="mb-50 block md-mb-30"
        header={<h2 className="h6 mb-0">{lang("ROOMS.ADD_TO_GM")}</h2>}
      />
    </React.Fragment>
  );
};
export default Eventmodule;
