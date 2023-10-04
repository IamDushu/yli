import React from "react";
import { Divider, Select, MenuItem, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import CalendarWidgetEventCard from "./calendar-widget-event-card";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import Link from "next/link";

import { EVENTS, } from "routes/urls";

const monthOptions = [
  { label: "January", value: 0 },
  { label: "February", value: 1 },
  { label: "March", value: 2 },
  { label: "April", value: 3 },
  { label: "May", value: 4 },
  { label: "June", value: 5 },
  { label: "July", value: 6 },
  { label: "August", value: 7 },
  { label: "September", value: 8 },
  { label: "October", value: 9 },
  { label: "November", value: 10 },
  { label: "December", value: 11 },
];

export default function EventCalendarWidgetUI(props) {
  const {
    month,
    onChangeMonth,
    selectedDate,
    onChangeSelectedDate,
    weekRange,
    dateEvents,
    onPrev,
    onNext,
  } = props;
  const [lang] = useTranslation("language");

  return (
    <div className="calendar-widget-wrapper">
      <div className="calendar-widget-header">
        <div className="d-flex justify-content-between align-items-center pb-2">
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Link href={{ pathname: EVENTS }}>
                <span className="calendar-header-title">Calendar</span>
              </Link>
            </Grid>
            <Grid
              className="d-flex justify-content-center align-items-center"
              item
              xs={4}
            >
              <KeyboardArrowLeftOutlinedIcon
                role="button"
                fontSize="small"
                onClick={onPrev}
              />
              <KeyboardArrowRightOutlinedIcon
                role="button"
                fontSize="small"
                onClick={onNext}
              />
            </Grid>
            <Grid
              className="d-flex justify-content-end align-items-center"
              item
              xs={4}
            >
              <Select
                variant="standard"
                IconComponent={KeyboardArrowDownOutlinedIcon}
                className="calendar-widget-month"
                disableUnderline
                value={month}
                onChange={(event) => onChangeMonth(event.target.value)}
              >
                {monthOptions.map((mo) => (
                  <MenuItem
                    key={mo.label}
                    className="calendar-widget-month-option"
                    value={mo.value}
                  >
                    {mo.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          {weekRange.length == 7 &&
            weekRange.map((date, i) => (
              <div
                key={i}
                role="button"
                onClick={() => onChangeSelectedDate(date)}
                className="d-flex flex-column justify-content-between align-items-center"
              >
                <span className="week-day">{date.format("dd")}</span>
                <span
                  className={
                    selectedDate.isSame(date, "d")
                      ? "week-date-active"
                      : "week-date"
                  }
                >
                  {date.format("DD")}
                </span>
              </div>
            ))}
        </div>
      </div>
      <div className="mt-1">
        <Divider />
      </div>
      <div className="calendar-widget-body">
        <div className="calendar-widget-event">
          {dateEvents.length == 0 ? (
            <div className="no-event-ui">
              <span>{lang("CALENDAR_WIDGET.NO_EVENTS")}</span>
            </div>
          ) : (
            dateEvents.map((e, i) => (
              <div className={i == dateEvents.length - 1 ? "" : "pb-2"}>
                <CalendarWidgetEventCard event={e} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
