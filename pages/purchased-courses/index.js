import React from "react";
// import PurchaseCoursesList from "components/courses/purchase-course";
import { MyProfile, GrowthModal } from "components/sidebar";
import { Layout } from "@components/layout";
import { Container } from "react-bootstrap";
import FilterCourse from "components/common/filter-course-room/FilterCourse";

const Purchasedcourse = () => {
  return (
    // <PurchaseCoursesList />
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
            </div>

            {/* Video Courses list : START */}
            {/* <div className="video-lists post-section">
                            <PurchaseCoursesList />
                        </div> */}

            {/* Video Courses right section : START */}
            <div className="right-blog-section">
              <FilterCourse />
            </div>
            {/* Video Courses list : END */}
          </div>
        </Container>
      </div>
    </Layout>
  );
};
export default Purchasedcourse;
