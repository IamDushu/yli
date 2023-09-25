import React from "react";
import { Card } from "react-bootstrap";
import Link from "next/link";
import {
  BUSINESS_NETWORK_ROOM,
  COACHING_ROOMS,
  EVENTS,
  JOB_OFFERS,
  MASTER_CLASS,
  TRAINING_ROOMS,
  WEBINAR,
} from "routes/urls";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import GrowthDropdown from "./GrowthDropdown";

const GrowthModal = () => {
  const [lang] = useTranslation("language");
  const router = useRouter();
  const { type } = router.query;

  /**
   * Get active class
   * @param {*} route
   * @returns
   */
  const getClassName = (route, routeType) =>
    `d-flex pointer list-item align-items-center w-100 text-gray-darker ${
      router.pathname === route && (!type || routeType == type) ? "active" : ""
    }`;

  return (
    <div className="mb-3 growth-modal-box">
      <Card className="growth-tools-card-border rounded-0">
        <Card.Header className="d-flex">
          <div className="w-100 p-0 d-flex align-items-center border-0 accordion-heading-box rounded-24">
            <img
              src={"/assets/images/logo-y-only.svg"}
              alt="RTF YLIWAY"
              width="18"
            />
            <Card.Title className="text-body-16 mb-0 ml-2 text-secondary-purple">
              {lang("GROWTH_TOOL.GROWTH_TOOL")}
            </Card.Title>
          </div>
        </Card.Header>

        <div className="growth-tools-list pt-3">
          <Card.Body className="py-0">
            <ul className="listing-section listing-content-between border-first-0 pt-first-0 active-inner">
              <li className="listing-box">
                <Link href="/growth-model">
                  <div
                    title="Growth model"
                    className={getClassName("/growth-model")}
                  >
                    {lang("GROWTH_TOOL.GROWTH_MODEL")}
                    {/* <em className="icon icon-right-angle-arrow ml-auto"></em> */}
                    {/* <em className="icon icon-right-gray-arrow ml-auto"></em> */}
                  </div>
                </Link>
              </li>
              <li className="listing-box">
                <Link href="/my-connections?tab=my_growth_connection">
                  <div
                    title="Growth connections"
                    className={getClassName(
                      "/my-connections?tab=my_growth_connection"
                    )}
                  >
                    {lang("USER_PROFILE_SUMMARY.TEXT.GROWTH_CONNECTIONS")}
                  </div>
                </Link>
              </li>
              <li className="listing-box">
                <Link href={"/courses"}>
                  <div title="Courses" className={getClassName("/courses")}>
                    {lang("GROWTH_TOOL.COURSES")}
                    {/* <em className="icon icon-right-gray-arrow ml-auto"></em> */}
                  </div>
                </Link>
              </li>
              <li className="listing-box">
                <Link href={TRAINING_ROOMS}>
                  <div
                    title="Training rooms"
                    className={getClassName("/virtual-events", "training-room")}
                  >
                    {lang("GROWTH_TOOL.TRAINING_ROOMS")}
                    {/* <em className="icon icon-right-gray-arrow ml-auto"></em> */}
                  </div>
                </Link>
              </li>
              <li className="listing-box">
                <Link href={COACHING_ROOMS}>
                  <div
                    title="Coaching rooms"
                    className={getClassName("/virtual-events", "coaching-room")}
                  >
                    {lang("GROWTH_TOOL.COACHING_ROOMS")}
                    {/* <em className="icon font-20 icon-right-gray-arrow ml-auto"></em> */}
                  </div>
                </Link>
              </li>
              <li className="listing-box">
                <Link href={WEBINAR}>
                  <div
                    title="Webinar"
                    className={getClassName("/virtual-events", "webinar")}
                  >
                    {lang("GROWTH_TOOL.WEBINAR")}
                    {/* <em className="icon icon-right-gray-arrow ml-auto"></em> */}
                  </div>
                </Link>
              </li>
              <li className="listing-box">
                <Link href={MASTER_CLASS}>
                  <div
                    title="Master class"
                    className={getClassName("/virtual-events", "master-class")}
                  >
                    {lang("GROWTH_TOOL.MATERCLASS")}
                    {/* <em className="icon icon-right-gray-arrow ml-auto"></em> */}
                  </div>
                </Link>
              </li>
              <li className="listing-box">
                <Link href={BUSINESS_NETWORK_ROOM}>
                  <div
                    title="Business network rooms"
                    className={getClassName(
                      "/virtual-events",
                      "business-network-room"
                    )}
                  >
                    {lang("GROWTH_TOOL.BUSINESS_NETWORK_ROOMS")}
                    {/* <em className="icon icon-right-gray-arrow ml-auto"></em> */}
                  </div>
                </Link>
              </li>
              <li className="listing-box">
                <Link href={EVENTS}>
                  <div
                    title="Events"
                    className={getClassName("/virtual-events", "event")}
                  >
                    {lang("GROWTH_TOOL.EVENTS")}
                    {/* <em className="icon icon-right-gray-arrow ml-auto"></em> */}
                  </div>
                </Link>
              </li>
              <li className="listing-box-launch-room">
                <div
                  title="Meeting"
                  className={getClassName("/virtual-events", "meeting")}
                ><GrowthDropdown/>
                </div>
              </li>
              <li className="listing-box">
                <Link href={JOB_OFFERS}>
                  <div
                    title="Job Offers"
                    className={getClassName("/job-offers")}
                  >
                    {lang("GROWTH_TOOL.JOB_OFFERS")}
                    {/* <em className="icon icon-right-gray-arrow ml-auto"></em> */}
                  </div>
                </Link>
              </li>
            </ul>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
};
export default GrowthModal;
