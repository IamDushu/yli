import React from "react";
import { Card, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import VirtualEventsList from "../virtual-events-list";

export default function RoomsListing({ roomType, pageSize, setPageSize }) {
  const [lang] = useTranslation("language");
  const { trainingList, coachList, webinarList, masterClassList } = useSelector(
    (data) => data.learningInstitute
  );
  const list =
    roomType === "training-room"
      ? trainingList
      : roomType === "coaching-room"
      ? coachList
      : roomType === "webinar"
      ? webinarList
      : roomType === "master-class" && masterClassList;

  return (
    list?.rows.length > 0 && (
      <Card className="mt-3">
        <div className="px-3 pt-3">
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="h6 mb-0 font-16 text-style font-weight-bold text-secondary-dark-blue w-100">
            {roomType === "training-room"
              ? lang("LEARNING_INSTITUTE.PRODUCTS_TAB.TRAINING_ROOM")
              : roomType === "coaching-room"
              ? lang("LEARNING_INSTITUTE.PRODUCTS_TAB.COACHING_ROOM")
              : roomType === "webinar"
              ? lang("LEARNING_INSTITUTE.PRODUCTS_TAB.WEBINAR")
              : roomType === "master-class" &&
                lang("LEARNING_INSTITUTE.PRODUCTS_TAB.MASTERCLASS")}
          </h3>
        </div>

        <Row className={`row mt-3 pl-3`}>
          {list?.rows
            .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
            .map((rooms) => (
              <VirtualEventsList
                key={rooms?.id}
                rooms={rooms}
                eventType={roomType}
              />
            ))}
        </Row>
        </div>
        {list?.rows?.length < list?.total && (
          <div className="d-flex justify-content-center border-top-gray py-1">
            <div className="people-tab-view-all-button my-2">
              <span
                className="people-tab-view-all-button-text"
                onClick={() => setPageSize(roomType)}
              >
                Load More
              </span>
            </div>
          </div>
        )}
      </Card>
    )
  );
}
