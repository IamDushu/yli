import React, { useEffect, useState } from "react";
import { Layout } from "components/layout";
import { useTranslation } from "react-i18next";
import { Container, Button, Col, Row, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { bookSlotDetails, getWelcomeDetails } from "store/actions/aboutUs";
import moment from "moment";
import momentTz from "moment-timezone";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import WithAuth from "components/with-auth/with-auth";
/************************************** 
  @purpose : Welcome Room
  @Author : INIC
  *************************************/
const WelcomeRoom = () => {
  const dispatch = useDispatch();
  const [lang] = useTranslation("language");
  const timezoneLists = momentTz.tz.names();
  const { availableSlots } = useSelector((state) => state.aboutUsInfo);
  const [selected, setSelected] = useState(new Date());
  const [timeZone, setTimeZone] = useState({
    value: "Asia/Kolkata",
    label: "Asia/Kolkata",
  });
  /************************************** 
  @purpose : Formatting dates for datepicker  
  @Author : INIC
  *************************************/
  const formattedDates =
    availableSlots &&
    availableSlots?.slots?.map((dateString) => {
      const date = new Date(dateString);
      return new Date(date.toString());
    });

  /***************************************
  @purpose : Get Welcome Details
  @Author : INIC
  **************************************/
  useEffect(() => {
    setTimeout(() => {
      dispatch(getWelcomeDetails());
    }, 500);
  }, []);
  /***************************************
  @purpose : Render HTML/ React Components
  @Author : INIC
  **************************************/
  return (
    <Layout>
      <div className="inner-wrapper">
        <Container>
          <Card>
            <Card.Body className="p-md-0">
              <Row>
                <Col md={6} className="p-md-5 mb-4 mb-md-0">
                  <h4 className="mb-3 text-center font-weight-bold">
                    Welcome Room
                  </h4>
                  {/* <p className="mb-0">
                    {" "}
                   
                  </p> */}
                  <p className="font-16 mb-2">
                    {`${lang("WELCOME_ROOM.WELCOME_ROOM_CONTENT")}`}
                  </p>
                  <ul className="mb-0 pl-3">
                    <li className="mb-1">{`${lang("WELCOME_ROOM.WELCOME_ROOM_LIST_0NE")}`}</li>
                    <li >{`${lang("WELCOME_ROOM.WELCOME_ROOM_LIST_TWO")}`}</li>
                    <li className="mb-1">{`${lang("WELCOME_ROOM.WELCOME_ROOM_LIST_THREE")}`}</li>
                    <li className="mb-1">{`${lang("WELCOME_ROOM.WELCOME_ROOM_LIST_FOUR")}`}</li>
                    <li className="mb-1">{`${lang("WELCOME_ROOM.WELCOME_ROOM_LIST_FIVE")}`}</li>
                    <li>{`${lang("WELCOME_ROOM.WELCOME_ROOM_LIST_SIX")}`}</li>
                  </ul>
                 
                </Col>
                <Col md={6} className="p-md-5 border-left-1 border-geyser">
                  <h5 className="font-weight-bold mb-3 text-center">Select Date & Time</h5>
                  <div className="mb-4 custom-selectpicker">
                    <Select
                      value={timeZone}
                      className="font-16-px"
                      placeholder="Select timezone"
                      options={timezoneLists.map((item) => ({
                        label: item,
                        value: item,
                      }))}
                      onChange={(e) => setTimeZone(e)}
                    />
                  </div>
                  <div className="mb-5 d-flex align-items-start custom-welcomedate-select">
                    <DatePicker
                      selected={selected}
                      highlightDates={formattedDates}
                      includeDates={formattedDates}
                      onChange={(selected) => setSelected(selected)}
                      inline={true}
                    />

                    {selected !== null ? (
                      <div className="d-flex flex-wrap w-100 ml-3">
                        {availableSlots?.datesObject &&
                          availableSlots?.datesObject[
                            moment(selected).format("YYYY-MM-DD")
                          ]?.map((timeSlots) => (
                            <Button
                              variant="btn btn-outline-primary btn-hover-icon-white border-radius-8 p-2 font-12"
                              disabled={availableSlots?.bookedSlot === timeSlots}
                              className="mb-2 w-100"
                              onClick={async () => {
                                await dispatch(
                                  bookSlotDetails({
                                    slot: timeSlots,
                                  })
                                );
                                await dispatch(getWelcomeDetails());
                              }}
                            >
                              {moment(
                                momentTz.tz(timeSlots, timeZone.value)
                              ).format("hh:mm A")}
                            </Button>
                          ))}
                      </div>
                    ) : (
                      <div className="d-flex flex-wrap w-100 ml-3 text-center">
                        <h6 className="text-danger w-100 text-center mb-0 font-14">No Slots Available</h6>
                      </div>
                    )}
                  </div>


                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </Layout>
  );
};
export default WithAuth(WelcomeRoom);
