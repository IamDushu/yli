import React, { useState } from "react";
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
import { ListItem } from "components/list-item";
import Image from "next/image";
import { Tooltip } from "@mui/material";
import { Card, CardHeader, CardContent } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const GrowthModal = () => {
  const [lang] = useTranslation("language");
  const router = useRouter();
  const { type } = router.query;
  const [show, setShow] = useState(false);

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
    <div className="my-4 growth-modal-box">
      <Card className="growth-tools-card-border rounded-0">
        <CardHeader
          className="d-flex growth-area-header"
          sx={{ paddingRight: "2px" }}
          title={
            <div className="w-100 p-0 d-flex align-items-center border-0 accordion-heading-box rounded-24">
              <Image
                src="/assets/images/logo-y-only.svg"
                alt="RTF YLIWAY"
                width={24}
                height={24}
              />
              <div className="text-body-16 mb-0 ml-2 text-secondary-purple w-100">
                <div className="growth-area-header-container">
                  <span className="m-0 heading">
                    {lang("GROWTH_TOOL.GROWTH_AREA")}
                  </span>
                  <div className="icon-container">
                    <Tooltip
                      classes={{ tooltip: "custom-tooltip" }}
                      title={lang("GROWTH_TOOL.TOOLTIP_1")}
                      placement="bottom">
                      <div>
                        <Image
                          src="/assets/images/info.svg"
                          alt="Info Icon"
                          width={18}
                          height={19}
                        />
                      </div>
                    </Tooltip>
                    <Tooltip
                      title={lang("GROWTH_TOOL.TOOLTIP_2")}
                      classes={{ tooltip: "custom-tooltip" }}
                      placement="bottom">
                      <div className="d-flex align-items-center ml-1">
                        <IconButton
                          onClick={() => setShow(!show)}
                          style={{
                            cursor: "pointer",
                            padding: "0px",
                            transform: !show ? "rotate(-90deg)" : "none",
                          }}>
                          <ExpandMoreIcon />
                        </IconButton>
                      </div>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          }
        />
        {show && (
          <div className="growth-tools-list pt-3">
            <CardContent className="py-0 px-1">
              <ul className="listing-section listing-content-between border-first-0 pt-first-0 active-inner">
                <li className="listing-box">
                  <Link href="/growth-model">
                    <div
                      title={lang("GROWTH_TOOL.GROWTH_PROJECTS")}
                      className={getClassName("/growth-model")}>
                      <ListItem
                        icon="assets/images/chart-progress.svg"
                        label={lang("GROWTH_TOOL.GROWTH_PROJECTS")}
                      />

                      {/* {lang("GROWTH_TOOL.GROWTH_MODEL")} */}
                      {/* <em className="icon icon-right-angle-arrow ml-auto"></em> */}
                      {/* <em className="icon icon-right-gray-arrow ml-auto"></em> */}
                    </div>
                  </Link>
                </li>
                {/* <li className="listing-box">
                <Link href="/my-connections?tab=my_growth_connection">
                  <div
                    title="Growth connections"
                    className={getClassName(
                      "/my-connections?tab=my_growth_connection"
                    )}>
                    {lang("USER_PROFILE_SUMMARY.TEXT.GROWTH_CONNECTIONS")}
                  </div>
                </Link>
              </li> */}
                <li className="listing-box">
                  <Link href={"/courses"}>
                    <div
                      title={lang("GROWTH_TOOL.COURSES")}
                      className={getClassName("/courses")}>
                      <ListItem
                        icon="assets/images/light-bulb-idea.svg"
                        label={lang("GROWTH_TOOL.COURSES")}
                      />
                      {/* <em className="icon icon-right-gray-arrow ml-auto"></em> */}
                    </div>
                  </Link>
                </li>
                <li className="listing-box">
                  <Link href={TRAINING_ROOMS}>
                    <div
                      title={lang("GROWTH_TOOL.TRAINING_ROOMS")}
                      className={getClassName(
                        "/virtual-events",
                        "training-room"
                      )}>
                      <ListItem
                        icon="assets/images/tr.svg"
                        label={lang("GROWTH_TOOL.TRAINING_ROOMS")}
                      />
                      {/* <em className="icon icon-right-gray-arrow ml-auto"></em> */}
                    </div>
                  </Link>
                </li>
                <li className="listing-box">
                  <Link href={COACHING_ROOMS}>
                    <div
                      title={lang("GROWTH_TOOL.COACHING_ROOMS")}
                      className={getClassName(
                        "/virtual-events",
                        "coaching-room"
                      )}>
                      <ListItem
                        icon="assets/images/cr.svg"
                        label={lang("GROWTH_TOOL.COACHING_ROOMS")}
                      />
                      {/* <em className="icon font-20 icon-right-gray-arrow ml-auto"></em> */}
                    </div>
                  </Link>
                </li>
                <li className="listing-box">
                  <Link href={WEBINAR}>
                    <div
                      title={lang("GROWTH_TOOL.WEBINAR")}
                      className={getClassName("/virtual-events", "webinar")}>
                      <ListItem
                        icon="assets/images/webinar.svg"
                        label={lang("GROWTH_TOOL.WEBINAR")}
                      />
                      {/* <em className="icon icon-right-gray-arrow ml-auto"></em> */}
                    </div>
                  </Link>
                </li>
                <li className="listing-box">
                  <Link href={MASTER_CLASS}>
                    <div
                      title={lang("GROWTH_TOOL.MASTERCLASS")}
                      className={getClassName(
                        "/virtual-events",
                        "master-class"
                      )}>
                      <ListItem
                        icon="assets/images/mc.svg"
                        label={lang("GROWTH_TOOL.MASTERCLASS")}
                      />
                      {/* <em className="icon icon-right-gray-arrow ml-auto"></em> */}
                    </div>
                  </Link>
                </li>
                <li className="listing-box">
                  <Link href={BUSINESS_NETWORK_ROOM}>
                    <div
                      title={lang("GROWTH_TOOL.BUSINESS_NETWORK_ROOMS")}
                      className={getClassName(
                        "/virtual-events",
                        "business-network-room"
                      )}>
                      <ListItem
                        icon="assets/images/BNR.svg"
                        label={lang("GROWTH_TOOL.BUSINESS_NETWORK_ROOMS")}
                      />
                      {/* <em className="icon icon-right-gray-arrow ml-auto"></em> */}
                    </div>
                  </Link>
                </li>
                <li className="listing-box">
                  <Link href={EVENTS}>
                    <div
                      title={lang("GROWTH_TOOL.EVENTS")}
                      className={getClassName("/virtual-events", "event")}>
                      <ListItem
                        icon="assets/images/event.svg"
                        label={lang("GROWTH_TOOL.EVENTS")}
                      />
                      {/* <em className="icon icon-right-gray-arrow ml-auto"></em> */}
                    </div>
                  </Link>
                </li>
                {/* <li className="listing-box-launch-room">
                <div
                  title="Meeting"
                  className={getClassName("/virtual-events", "meeting")}>
                  <GrowthDropdown />
                </div>
              </li>
              <li className="listing-box">
                <Link href={JOB_OFFERS}>
                  <div
                    title="Job Offers"
                    className={getClassName("/job-offers")}>
                    {lang("GROWTH_TOOL.JOB_OFFERS")}
                    {/* <em className="icon icon-right-gray-arrow ml-auto"></em> */}
                {/* </div>
                </Link>
              </li>  */}
              </ul>
            </CardContent>
          </div>
        )}
      </Card>
    </div>
  );
};
export default GrowthModal;
