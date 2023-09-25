import React, { Fragment, useEffect, useState } from "react";
import { Card, Accordion } from "react-bootstrap";
import { mostFollowedContent } from "store/actions";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { onImageError } from "utils";
import { useRouter } from "next/router";

const MostFollowedContents = () => {
  const [lang] = useTranslation("language");
  const router = useRouter();
  const dispatch = useDispatch();
  const { mostFollowedContents } = useSelector((state) => state.growth);
  useEffect(() => {
    dispatch(mostFollowedContent({ page: 1, pagesize: 5 }));
  }, []);

  const getCourseType = (type) => {
    switch (type) {
      case "online":
        return "Online Course";
      case "offline":
        return "Offline Course";
      case "other":
        return "Other Course";
      case "training-room":
        return "Training Room";
      case "business-network-room":
        return "Business Network Room";
      case "webinar":
        return "Webinar";
      case "event":
        return "Event";
      case "master-class":
        return "Master Class";
      case "coaching-room":
        return "Coaching Room";
    }
  };

  return (
    mostFollowedContents?.rows?.length > 0 && (
      <div className="mb-3 followed-content-box">
        <Card className="rounded-0 border-0 border-bottom-dark-2 overflow-hidden ">
          <Card.Header className="d-flex border-radius-0 border-bottom border-geyser py-2">
            <div className="w-100 d-flex border-0 p-0 ">
              <Card.Title className="text-body-16 mb-0 w-100 text-secondary">
                {lang("RIGHT_SIDEBAR.MOST_FOLLOWED_CONTENTS")}
              </Card.Title>
              {/* <em className="icon icon-down-arrow ml-auto font-24 d-xl-none d-block"></em> */}
            </div>
          </Card.Header>
          <Card.Body className="px-0">
            <ul className="listing-section listing-content-start pt-first-0 border-first-0">
              {mostFollowedContents.rows &&
              mostFollowedContents?.rows?.length > 0 ? (
                mostFollowedContents?.rows?.map((contents, i) => (
                  <li
                    key={i}
                    className={`listing-box cursor-pointer font-12 font-weight-semibold px-3 ${
                      i === mostFollowedContents?.rows?.length - 1 ? "pb-0" : ""
                    }`}
                    onClick={() => {
                      contents.courseType
                        ? router.push(`/course-detail/${contents.id}`)
                        : router.push(`/virtual-events/${contents.id}`);
                    }}
                  >
                    <div className="position-relative flex-shrink-0 mr-3">
                      <img
                        className="img-fluid w-h-84-48 border-radius-8"
                        src={contents.imageURL}
                        onError={(e) => onImageError(e)}
                      />
                    </div>

                    <div className="w-68">
                      <h5 className="font-14 text-ellipsis mb-1 text-secondary sidebar-text">
                        {contents.title}
                      </h5>
                      <div className="text-body-12">
                        {getCourseType(contents?.courseType)}
                        {getCourseType(contents?.virtualEventType)}
                      </div>
                    </div>
                    {/* <span className="icon icon-right-angle-arrow text-dark"></span> */}
                  </li>
                ))
              ) : (
                <div className="px-3">
                  <em className="font-12">
                    {lang("RIGHT_SIDEBAR.NO_RECORDS")}
                  </em>
                </div>
              )}
            </ul>
          </Card.Body>
        </Card>
      </div>
    )
  );
};
export default MostFollowedContents;
