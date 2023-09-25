import React, { Fragment, Component } from "react";
import { Card, Accordion } from "react-bootstrap";
import Slider from "react-slick";

/******************** 
@purpose : Used for next arrow display
@Parameter : { props}
@Author : INIC
******************/
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

/******************** 
@purpose : Used for arrow previous display
@Parameter : { props }
@Author : INIC
******************/

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}

export default class CustomArrows extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
        {
          breakpoint: 1440,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 1199,
          settings: {
            slidesToShow: 8,
          },
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 6,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 5,
          },
        },
        {
          breakpoint: 530,
          settings: {
            slidesToShow: 4,
          },
        },
        {
          breakpoint: 450,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 350,
          settings: {
            slidesToShow: 2,
          },
        },
      ],
    };
    /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
    return (
      <Fragment>
        <Accordion
          defaultActiveKey="0"
          className="mb-4 followed-content-box sticky-fix"
        >
          <Card>
            <Card.Header>
              <Accordion.Toggle
                variant="link"
                eventKey="0"
                className="w-100 p-0 d-flex border-0 accordion-heading-box rounded-24"
              >
                <Card.Title className="text-body-14 text-primary mb-0">
                  Top Activities
                </Card.Title>
                <em className="icon icon-down-arrow ml-auto font-24 d-xl-none d-block"></em>
              </Accordion.Toggle>
            </Card.Header>

            <Card.Body className="py-0">
              <div className="pb-20 px-4">
                <Slider {...settings} className="top-activities">
                  <div>
                    <picture>
                      <source
                        srcSet={"../assets/images/dashboard/meeting.jpg"}
                        type="image/jpg"
                      />
                      <img
                        src={"../assets/images/dashboard/meeting.jpg"}
                        alt="meeting"
                        width="80"
                        height="80"
                      />
                    </picture>
                  </div>
                  <div>
                    <picture>
                      <source
                        srcSet={"../assets/images/dashboard/study.jpg"}
                        type="image/jpg"
                      />
                      <img
                        src={"../assets/images/dashboard/study.jpg"}
                        alt="study"
                        width="80"
                        height="80"
                      />
                    </picture>
                  </div>
                  <div>
                    <picture>
                      <source
                        srcSet={"../assets/images/dashboard/seminar.jpg"}
                        type="image/jpg"
                      />
                      <img
                        src={"../assets/images/dashboard/seminar.jpg"}
                        alt="seminar"
                        width="80"
                        height="80"
                      />
                    </picture>
                  </div>

                  <div>
                    <picture>
                      <source
                        srcSet={"../assets/images/dashboard/meeting.jpg"}
                        type="image/jpg"
                      />
                      <img
                        src={"../assets/images/dashboard/meeting.jpg"}
                        alt="meeting"
                        width="80"
                        height="80"
                      />
                    </picture>
                  </div>
                  <div>
                    <picture>
                      <source
                        srcSet={"../assets/images/dashboard/study.jpg"}
                        type="image/jpg"
                      />
                      <img
                        src={"../assets/images/dashboard/study.jpg"}
                        alt="study"
                        width="80"
                        height="80"
                      />
                    </picture>
                  </div>
                  <div>
                    <picture>
                      <source
                        srcSet={"../assets/images/dashboard/seminar.jpg"}
                        type="image/jpg"
                      />
                      <img
                        src={"../assets/images/dashboard/seminar.jpg"}
                        alt="seminar"
                        width="80"
                        height="80"
                      />
                    </picture>
                  </div>

                  <div>
                    <picture>
                      <source
                        srcSet={"../assets/images/dashboard/meeting.jpg"}
                        type="image/jpg"
                      />
                      <img
                        src={"../assets/images/dashboard/meeting.jpg"}
                        alt="meeting"
                        width="80"
                        height="80"
                      />
                    </picture>
                  </div>
                  <div>
                    <picture>
                      <source
                        srcSet={"../assets/images/dashboard/study.jpg"}
                        type="image/jpg"
                      />
                      <img
                        src={"../assets/images/dashboard/study.jpg"}
                        alt="study"
                        width="80"
                        height="80"
                      />
                    </picture>
                  </div>
                  <div>
                    <picture>
                      <source
                        srcSet={"../assets/images/dashboard/seminar.jpg"}
                        type="image/jpg"
                      />
                      <img
                        src={"../assets/images/dashboard/seminar.jpg"}
                        alt="seminar"
                        width="80"
                        height="80"
                      />
                    </picture>
                  </div>
                </Slider>
              </div>
            </Card.Body>
          </Card>
        </Accordion>
      </Fragment>
    );
  }
}
