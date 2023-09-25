import React, { useState, useEffect, useCallback } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  fetchLearningInstCourses,
  learningInstituteEvents,
} from "store/actions/learningInstitute";
import { useTranslation } from "react-i18next";
import CourseListing from "./activity-tab-component/course-listing";
import RoomsListing from "./activity-tab-component/rooms-listing";
import CourseListFilter from "./activity-tab-component/course-list-filter";
import { useRouter } from "next/router";

const ratings = [
  { value: 0, label: "non rated" },
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
  { value: 4, label: 4 },
  { value: 5, label: 5 },
];

const CourseList = (props) => {
  const dispatch = useDispatch();
  const [lang] = useTranslation("language");
  const router = useRouter();
  const { instituteId } = router.query;

  const {
    learninginstcourselistonline,
    learninginstcourselistoffline,
    trainingList,
    coachList,
    webinarList,
    masterClassList,
  } = useSelector((data) => data.learningInstitute);

  const [pagesize, setPagesize] = useState({
    offlinePagesize: 3,
    onlinePageSize: 3,
    trainingPagesize: 3,
    coachPagesize: 3,
    webinarPagesize: 3,
    masterPagesize: 3,
    flagToLoadMore: "",
  });

  const [filterData, setFilterData] = useState({
    activityType: "",
  });
  const [isCollapse, setIsCollapse] = useState(false);

  const initialValues = {
    activityType: "",
    selected_activityType: "",
    searchText: "",
    price: "",
    selected_price: "",
    rating: "",
    language: "",
    selected_language: "",
    startDate: "",
    faculty: "",
    selected_faculty: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {},
  });

  const executeFilter = (searchString) => {
    const dataToSend = {};
    if (formik?.values?.activityType)
      dataToSend.activityType = formik?.values?.activityType?.value;
    else dataToSend.activityType = "";
    dataToSend.searchText = searchString;
    dataToSend.price = formik?.values?.price;
    dataToSend.startDate = formik?.values?.startDate;
    if (formik?.values?.rating)
      dataToSend.rating = formik?.values?.rating?.value;
    else dataToSend.rating = "";
    dataToSend.language = formik?.values?.language;
    if (formik?.values?.faculty)
      dataToSend.faculty = formik?.values?.faculty?.value;
    else dataToSend.faculty = "";
    setFilterData(dataToSend);
  };

  // rooms list based on activityType (online, offline, all)
  const roomDispatcher = (pagesize, typeRoom) => {
    dispatch(
      learningInstituteEvents({
        page: 1,
        pagesize: pagesize,
        instituteId: instituteId,
        virtualEventType: typeRoom,
        ...filterData,
      })
    );
  };

  // course list render based on activityType (online, offline, all)
  const courseDispatcher = (typeRoom) => {
    const conditionForCourseType = {};
    conditionForCourseType.activityType = typeRoom;
    if (typeRoom == "") {
      conditionForCourseType.courseType = ["offline"];
      dispatch(
        fetchLearningInstCourses({
          page: 1,
          pagesize: pagesize.offlinePagesize,
          instituteId: instituteId,
          ...conditionForCourseType,
          ...filterData,
        })
      );
      conditionForCourseType.courseType = ["online"];
      dispatch(
        fetchLearningInstCourses({
          page: 1,
          pagesize: pagesize.onlinePageSize,
          instituteId: instituteId,
          ...conditionForCourseType,
          ...filterData,
        })
      );
    } else if (typeRoom == "online") {
      conditionForCourseType.courseType = ["online"];
      dispatch(
        fetchLearningInstCourses({
          page: 1,
          pagesize: pagesize.onlinePageSize,
          instituteId: instituteId,
          ...conditionForCourseType,
          ...filterData,
        })
      );
    } else if (typeRoom == "offline") {
      conditionForCourseType.courseType = ["offline"];
      dispatch(
        fetchLearningInstCourses({
          page: 1,
          pagesize: pagesize.offlinePagesize,
          instituteId: instituteId,
          ...conditionForCourseType,
          ...filterData,
        })
      );
    }
  };

  // useeffect handling filter (based on activityType)
  useEffect(() => {
    if (props.activeTab === "courses") {
      const targetActivity = filterData?.activityType;

      if (targetActivity == "master-class")
        roomDispatcher(pagesize.masterPagesize, "master-class");
      else if (targetActivity == "webinar")
        roomDispatcher(pagesize.webinarPagesize, "webinar");
      else if (targetActivity == "online") courseDispatcher("online");
      else if (targetActivity == "offline") courseDispatcher("offline");
      else if (targetActivity == "coaching-room")
        roomDispatcher(pagesize.coachPagesize, "coaching-room");
      else if (targetActivity == "training-room")
        roomDispatcher(pagesize.trainingPagesize, "training-room");
      else if (targetActivity == "") {
        courseDispatcher("");
        roomDispatcher(pagesize.masterPagesize, "master-class");
        roomDispatcher(pagesize.trainingPagesize, "training-room");
        roomDispatcher(pagesize.coachPagesize, "coaching-room");
        roomDispatcher(pagesize.webinarPagesize, "webinar");
      }
    }
  }, [props.activeTab, filterData]);

  const clearFilter = () => {
    formik.resetForm({ values: initialValues });
    setFilterData({ activityType: "" });
  };

  const addMoreFunction = (roomTypes) => {
    const pre = { ...pagesize };
    if (roomTypes == "master-class")
      setPagesize({
        ...pre,
        masterPagesize: pre.masterPagesize + 3,
        flagToLoadMore: "master-class",
      });
    else if (roomTypes == "webinar")
      setPagesize({
        ...pre,
        webinarPagesize: pre.webinarPagesize + 3,
        flagToLoadMore: "webinar",
      });
    else if (roomTypes == "coaching-room")
      setPagesize({
        ...pre,
        coachPagesize: pre.coachPagesize + 3,
        flagToLoadMore: "coaching-room",
      });
    else if (roomTypes == "training-room")
      setPagesize({
        ...pre,
        trainingPagesize: pre.trainingPagesize + 3,
        flagToLoadMore: "training-room",
      });
    else if (roomTypes == "online")
      setPagesize({
        ...pre,
        onlinePageSize: pre.onlinePageSize + 3,
        flagToLoadMore: "online",
      });
    else if (roomTypes == "offline")
      setPagesize({
        ...pre,
        offlinePagesize: pre.offlinePagesize + 3,
        flagToLoadMore: "offline",
      });
  };

  useEffect(() => {
    if (pagesize.flagToLoadMore == "master-class") {
      roomDispatcher(pagesize.masterPagesize, "master-class");
    } else if (pagesize.flagToLoadMore == "webinar") {
      roomDispatcher(pagesize.webinarPagesize, "webinar");
    } else if (pagesize.flagToLoadMore == "coaching-room") {
      roomDispatcher(pagesize.coachPagesize, "coaching-room");
    } else if (pagesize.flagToLoadMore == "training-room") {
      roomDispatcher(pagesize.trainingPagesize, "training-room");
    } else if (pagesize.flagToLoadMore == "online") {
      courseDispatcher("online");
    } else if (pagesize.flagToLoadMore == "offline") {
      courseDispatcher("offline");
    }
  }, [pagesize]);

  /*******************
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/

  return (
    <>
      <Card className="p-3 p-sm-4 mt-4">
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="h6 mb-0 mr-3 font-16 font-weight-bold text-secondary-dark-blue">
            {lang("LEARNING_INSTITUTE.PRODUCTS_TAB.ACTIVITY")}
          </h3>
        </div>

        <div className="mt-3">
          <div className="d-sm-flex mb-sm-4">
            <div className="flex-grow-1 mr-sm-3 mb-3 mb-sm-0">
              <Form className="tab-searchbar">  
                <Form.Group
                  controlId="formSearch"
                  className="position-relative mb-0 common-searchbar"
                >
                  <Form.Control
                    type="text"
                    placeholder="Search..."
                    value={formik?.values?.searchText}
                    onChange={(e) => {
                      formik.setFieldValue("searchText", e.target.value);
                      setTimeout(() => {
                        if (e.target.value.length == 0) {
                          executeFilter(e.target.value);
                        } else executeFilter(e.target.value);
                      }, 1000);
                    }}
                    onKeyPress={(e) => {
                      e.key === "Enter" && e.preventDefault();
                    }}
                    style={{ borderRadius: "5px", background: "#EFF0F6" }}
                    autoComplete="off"
                  />
                  <div className="search-inner-icon">
                    <em className="bx bx-search"></em>
                  </div>
                </Form.Group>
              </Form>
            </div>

            <Button
              variant="btn btn-outline-primary align-items-center justify-content-center d-flex btn-hover-icon-white btn-sm border-radius-eight no-outline"
              style={{
                height: "39px",
                minWidth: "105px",
              }}
              onClick={() => setIsCollapse(!isCollapse)}
            >
              <span className="material-icons font-18 align-self-center">
                filter_alt
              </span>
              <div
                className="ml-1  align-self-center"
                onClick={() => clearFilter()}
              >
                Filters
              </div>
            </Button>
          </div>

          {isCollapse && (
            <CourseListFilter
              props={props}
              formik={formik}
              clearFilter={clearFilter}
              executeFilter={executeFilter}
            />
          )}
        </div>
      </Card>

      {Array.isArray(learninginstcourselistonline?.rows) &&
        learninginstcourselistonline?.rows.length === 0 &&
        Array.isArray(learninginstcourselistoffline?.rows) &&
        learninginstcourselistoffline?.rows.length === 0 &&
        Array.isArray(trainingList?.rows) &&
        trainingList?.rows.length === 0 &&
        Array.isArray(coachList?.rows) &&
        coachList?.rows.length === 0 &&
        Array.isArray(webinarList?.rows) &&
        webinarList?.rows.length === 0 &&
        Array.isArray(masterClassList?.rows) &&
        masterClassList?.rows.length === 0 && (
          <Card className="p-3 mt-3">
            {lang("LEARNING_INSTITUTE.PRODUCTS_TAB.NO_PRODUCT_FOUND")}{" "}
          </Card>
        )}

      {/* Online Course List */}
      {Array.isArray(learninginstcourselistonline?.rows) &&
        learninginstcourselistonline?.rows?.length > 0 && (
          <CourseListing
            courseType="online"
            pageSize={pagesize.onlinePageSize}
            setPageSize={addMoreFunction}
          />
        )}

      {/* Offline Course List */}

      {learninginstcourselistoffline?.rows?.length > 0 && (
        <CourseListing
          courseType="offline"
          pageSize={pagesize.offlinePagesize}
          setPageSize={addMoreFunction}
        />
      )}

      {/* Training room List */}

      {trainingList?.rows?.length > 0 && (
        <RoomsListing
          roomType="training-room"
          pageSize={pagesize.trainingPagesize}
          setPageSize={addMoreFunction}
        />
      )}

      {/* Coach room List */}

      {coachList?.rows?.length > 0 && (
        <RoomsListing
          roomType="coaching-room"
          pageSize={pagesize.coachPagesize}
          setPageSize={addMoreFunction}
        />
      )}

      {/* Webinar List */}

      {webinarList?.rows?.length > 0 && (
        <RoomsListing
          roomType="webinar"
          pageSize={pagesize.webinarPagesize}
          setPageSize={addMoreFunction}
        />
      )}

      {/* Master class List */}

      {Array.isArray(masterClassList?.rows) &&
        masterClassList?.rows?.length > 0 && (
          <RoomsListing
            roomType="master-class"
            pageSize={pagesize.masterPagesize}
            setPageSize={addMoreFunction}
          />
        )}
    </>
  );
};
export default CourseList;
