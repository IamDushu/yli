import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Layout } from "@components/layout";
import { CoursesList } from "components/courses";
import { MyProfile, GrowthModal, Add } from "components/sidebar";
import WithAuth from "components/with-auth/with-auth";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "store/actions";

const Courses = () => {
  const user = useSelector(({ user }) => user);
  const dispatch = useDispatch();

  let userData = user?.userInfo || {};
  if (user?.userInfo && typeof user.userInfo === "string")
    userData = JSON.parse(user.userInfo);

  const courseList = useSelector(({ courses }) => courses.courses);
  const [fetchSettings, setFetchSettings] = useState({
    page: 1,
    pagesize: 4,
    searchText: "",
    courseLevel: "",
  });

  useEffect(() => {
    dispatch(fetchCourses(fetchSettings));
  }, [fetchSettings]);

  const clearFilters = () => {
    setFetchSettings(() => ({
      page: 1,
      pagesize: 8,
      searchText: "",
      courseLevel: null,
    }));
  };

  const fetchCoursesSetting = (name, value) => {
    fetchSettings[name] = value;
    setFetchSettings(() => ({
      ...fetchSettings,
      pagesize: fetchSettings.pagesize + 4,
    }));
  };

  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/

  return (
    <Layout>
      <div className="inner-wrapper video-courses">
        <Container>
          <div className="d-flex flex-xl-nowrap flex-wrap two-column-sidebar">
            {/* left profile section */}
            <div className="left-profile-section">
              {/* profile section */}
              <MyProfile />
              {/* growth modal listing */}
              <GrowthModal />

              <Add />
            </div>
            {/* Video Courses list : START */}
            <div className="right-profile-section">
              <CoursesList
                list={courseList.data}
                userData={userData}
                getCourses={fetchCoursesSetting}
                fetchCoursesSetting={fetchCoursesSetting}
                fetchSettings={fetchSettings}
                clearFilters={clearFilters}
              />
            </div>
            {/* Video Courses list : END */}
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default WithAuth(Courses);
