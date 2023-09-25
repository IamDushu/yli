import React from "react";
import { Button, Dropdown } from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";

function StepThree() {
  return (
    <>
      <div className="d-flex flex-wrap flex-lg-nowrap justify-content-between m-4 px-4">
        <h6 className="m-0 font-weight-semibold">Automatic Compilation</h6>
        <div className="profe-wrap d-flex mt-3 mt-lg-0">
          <div className="profe-type">
            <h6 className="font-16">Professional Field</h6>
            <span className="font-16">Softwere Design</span>
          </div>
          <hr className="horizontal-border" />
          <div className="profe-type">
            <h6 className="font-16">Profession</h6>
            <span className="font-16">UX Researcher</span>
          </div>
        </div>
      </div>
      <div className="box-wrapper">
        <div className="growth-profile d-lg-none text-center">
          <div className="overflow-hidden rounded-pill flex-shrink-0 my-3">
            <picture>
              <source
                srcSet={"/assets/images/my-profile/profile-picture.jpg"}
                type="image/png"
              />
              <img
                src={"/assets/images/homepage/profile-picture.jpg"}
                alt="User"
                width="98"
                height="98"
              />
            </picture>
          </div>
          <h6 className="font-weight-semibold font-lg-18">Ketty Smith</h6>
          <span className="text-secondary-75 font-18 font-lg-16 font-medium mb-3 mb-lg-0 d-inline-block">
            Sr. Sales Manager
          </span>
        </div>
        <div className="d-flex flex-wrap flex-sm-nowrap justify-content-between">
          <div className="auto-skillfill-box">
            <PerfectScrollbar>
              <ul className="list-unstyled">
                <li className="d-flex justify-content-between align-items-center primary-skill">
                  <div>
                    Hard Skills
                    <small className="d-block">The tools of the trade</small>
                  </div>
                  <em className="bx bx-x pointer"></em>
                </li>
                <li className="d-flex justify-content-between">
                  <Dropdown className="theme-dropdown">
                    <Dropdown.Toggle>Courses</Dropdown.Toggle>
                    <em className="bx bx-x pointer"></em>
                    <Dropdown.Toggle></Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">
                        First Course
                        <em className="bx bx-x pointer pl-5"></em>
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        Second Course
                        <em className="bx bx-x pointer pl-5"></em>
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        Third Course
                        <em className="bx bx-x pointer pl-5"></em>
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        Fourth Course
                        <em className="bx bx-x pointer pl-5"></em>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
                <li className="d-flex justify-content-between">
                  Training Rooms
                  <em className="bx bx-x pointer"></em>
                </li>
                <li className="d-flex justify-content-between">
                  Audio Rooms
                  <em className="bx bx-x pointer"></em>
                </li>
              </ul>
            </PerfectScrollbar>
            <span className="thik-border"></span>
            <div className="border-wrap">
              <img
                className="growth-userimg-left"
                src={"/assets/images/growth/border-blue.svg"}
                alt="Growth"
              ></img>
            </div>
          </div>
          <div className="auto-skillfill-box">
            <PerfectScrollbar>
              <ul className="list-unstyled">
                <li className="d-flex justify-content-between align-items-center primary-skill">
                  <div>
                    Traction
                    <small className="d-block">
                      Learn how to get customers
                    </small>
                  </div>
                  <em className="bx bx-x pointer"></em>
                </li>
                <li className="d-flex justify-content-between">
                  Courses<em className="bx bx-x pointer"></em>
                </li>
                <li className="d-flex justify-content-between">
                  Training Rooms
                  <em className="bx bx-x pointer"></em>
                </li>
                <li className="d-flex justify-content-between">
                  Audio Rooms
                  <em className="bx bx-x pointer"></em>
                </li>
                <li className="d-flex justify-content-between">
                  N &amp; S Rooms
                  <em className="bx bx-x pointer"></em>
                </li>
              </ul>
            </PerfectScrollbar>
            <span className="thik-border"></span>
            <div className="border-wrap">
              <img
                className="growth-userimg-left"
                src={"/assets/images/growth/border-yellow.svg"}
                alt="Growth"
              ></img>
            </div>
          </div>
        </div>
        <div className="d-flex flex-wrap flex-sm-nowrap justify-content-between">
          <div className="auto-skillfill-box">
            <PerfectScrollbar>
              <ul className="list-unstyled">
                <li className="d-flex justify-content-between align-items-center primary-skill">
                  <div>
                    Soft Skills{" "}
                    <small className="d-block">
                      Learn to deal with partners and{" "}
                    </small>
                  </div>
                  <em className="bx bx-x pointer"></em>
                </li>
                <li className="d-flex justify-content-between">
                  <Dropdown className="theme-dropdown">
                    <Dropdown.Toggle>Courses</Dropdown.Toggle>
                    <em className="bx bx-x pointer"></em>
                    <Dropdown.Toggle></Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">
                        First Course
                        <em className="bx bx-x pointer pl-5"></em>
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        Second Course
                        <em className="bx bx-x pointer pl-5"></em>
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        Third Course
                        <em className="bx bx-x pointer pl-5"></em>
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        Fourth Course
                        <em className="bx bx-x pointer pl-5"></em>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
                <li className="d-flex justify-content-between">
                  Training Rooms
                  <em className="bx bx-x pointer"></em>
                </li>
                <li className="d-flex justify-content-between">
                  Audio Rooms
                  <em className="bx bx-x pointer"></em>
                </li>
              </ul>
            </PerfectScrollbar>
            <span className="thik-border"></span>
            <div className="border-wrap">
              <img
                className="growth-userimg-left"
                src={"/assets/images/growth/border-skyblue.svg"}
                alt="Growth"
              ></img>
            </div>
          </div>
          <div className="growth-profile d-none d-lg-block text-center">
            <div className="overflow-hidden rounded-pill flex-shrink-0 my-3">
              <picture>
                <source
                  srcSet={"/assets/images/my-profile/profile-picture.jpg"}
                  type="image/png"
                />
                <img
                  src={"/assets/images/homepage/profile-picture.jpg"}
                  alt="User"
                  width="98"
                  height="98"
                />
              </picture>
            </div>
            <h6 className="font-weight-semibold font-lg-18">Ketty Smith</h6>
            <span className="text-secondary-75 font-18 font-lg-16 font-medium">
              Sr. Sales Manager
            </span>
          </div>
          <div className="auto-skillfill-box box-orange">
            <PerfectScrollbar>
              <ul className="list-unstyled">
                <li className="d-flex justify-content-between align-items-center primary-skill">
                  <div>
                    Distribution
                    <small className="d-block">
                      Learn where you can sell your product / services
                    </small>
                  </div>
                  <em className="bx bx-x pointer"></em>
                </li>
                <li className="d-flex justify-content-between">
                  Courses<em className="bx bx-x pointer"></em>
                </li>
                <li className="d-flex justify-content-between">
                  Training Rooms
                  <em className="bx bx-x pointer"></em>
                </li>
                <li className="d-flex justify-content-between">
                  Audio Rooms
                  <em className="bx bx-x pointer"></em>
                </li>
              </ul>
            </PerfectScrollbar>
            <span className="thik-border"></span>
            <div className="border-wrap">
              <img
                className="growth-userimg-left"
                src={"/assets/images/growth/border-orange.svg"}
                alt="Growth"
              ></img>
            </div>
          </div>
        </div>
        <div className="d-flex flex-wrap flex-sm-nowrap justify-content-between">
          <div className="auto-skillfill-box">
            <PerfectScrollbar>
              <ul className="list-unstyled">
                <li className="d-flex justify-content-between align-items-center primary-skill">
                  <div>
                    Mindset
                    <small className="d-block">
                      Learn how to control your self and get winning thinking
                    </small>
                  </div>
                  <em className="bx bx-x pointer"></em>
                </li>
                <li className="d-flex justify-content-between">
                  <Dropdown className="theme-dropdown">
                    <Dropdown.Toggle>Courses</Dropdown.Toggle>
                    <em className="bx bx-x pointer"></em>
                    <Dropdown.Toggle></Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">
                        First Course
                        <em className="bx bx-x pointer pl-5"></em>
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        Second Course
                        <em className="bx bx-x pointer pl-5"></em>
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        Third Course
                        <em className="bx bx-x pointer pl-5"></em>
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        Fourth Course
                        <em className="bx bx-x pointer pl-5"></em>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
                <li className="d-flex justify-content-between">
                  Training Rooms
                  <em className="bx bx-x pointer"></em>
                </li>
                <li className="d-flex justify-content-between">
                  Audio Rooms
                  <em className="bx bx-x pointer"></em>
                </li>
              </ul>
            </PerfectScrollbar>
            <span className="thik-border"></span>
            <div className="border-wrap">
              <img
                className="growth-userimg-left"
                src={"/assets/images/growth/border-pink.svg"}
                alt="Growth"
              ></img>
            </div>
          </div>
          <div className="auto-skillfill-box box-green">
            <PerfectScrollbar>
              <ul className="list-unstyled">
                <li className="d-flex justify-content-between align-items-center primary-skill">
                  <div>
                    Support
                    <small className="d-block">
                      Learn how to support your business
                    </small>
                  </div>
                  <em className="bx bx-x pointer"></em>
                </li>
                <li className="d-flex justify-content-between">
                  Courses<em className="bx bx-x pointer"></em>
                </li>
                <li className="d-flex justify-content-between">
                  Training Rooms
                  <em className="bx bx-x pointer"></em>
                </li>
                <li className="d-flex justify-content-between">
                  Audio Rooms
                  <em className="bx bx-x pointer"></em>
                </li>
                <li className="d-flex justify-content-between">
                  N &amp; S Rooms
                  <em className="bx bx-x pointer"></em>
                </li>
              </ul>
            </PerfectScrollbar>
            <span className="thik-border"></span>
            <div className="border-wrap">
              <img
                className="growth-userimg-left"
                src={"/assets/images/growth/border-green.svg"}
                alt="Growth"
              ></img>
            </div>
          </div>
        </div>
        <div className="text-center mb-4">
          <Button variant="info text-uppercase btn-xxxl">Continue</Button>
        </div>
      </div>
    </>
  );
}

export default StepThree;
