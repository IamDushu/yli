import { Layout } from '@components/layout';
import CourseEnrollPeerDetails from 'components/courses/course-detail/course-enroll-peer-details';
import CoursePlayer from 'components/courses/course-detail/course-player';
import OtherCourses from 'components/otherCoursesRooms/otherCourses';
import OtherMatchToGM from 'components/otherCoursesRooms/otherMatchToGM';
import {
  AboutTeacher,
  CoursesFeatures,
  StudentFeedback,
} from 'components/profile';
import AboutInsititue from 'components/profile/about-institute';
import {
  FollowedGroup,
  GrowthModal,
  GrowthPartners,
  MostFollowedContents,
  RecentAddedGM,
  UpgradeYourProfile,
} from 'components/sidebar';
import CourseDetailLoader from 'components/ui/course-detail-loader';
import WithAuth from 'components/with-auth/with-auth';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Helmet } from "react-helmet"; 
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getCourseDetail } from 'store/actions';
import { removeHTMLTags } from "utils";

const CourseDetail = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { courseId } = router.query;
  const [courseDetail, setCourseDetail] = useState({});
  const user = useSelector(({ user }) => user);
  let userData = user?.userInfo || {};
  const { courseDetailLoader } = useSelector(
    ({ ui }) => ui.loaders,
    shallowEqual
  );
  if (user?.userInfo && typeof user.userInfo === 'string')
    userData = JSON.parse(user.userInfo);

  useEffect(async () => {
    dispatch(getCourseDetail(courseId, router)).then((res) => {
      if (res.status === 1) {
        setCourseDetail(() => ({ ...res.data }));
      }
    });
  }, [courseId]);

  const updateCourseDetails = (values) => {
    setCourseDetail(() => ({ ...courseDetail, ...values }));
  };
  if (courseDetailLoader) {
    return <CourseDetailLoader sidebar={true} />;
  }

   // Extract necessary data for og:image, og:title, og:description
   const ogImage = courseDetail?.imageURL || "course image";
   const ogTitle = courseDetail?.title? courseDetail?.title?.slice(0,300) :"course title";
   const ogDescription = (courseDetail?.description)? removeHTMLTags(courseDetail?.description).slice(0, 300):"course description";
 

  return (
    <Layout>
      {/* meta data for og:image, og:title, og:description */}
      <Helmet>
        <meta property="og:image" content={ogImage} />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
      </Helmet>
      <div className='profile-wrapper inner-wrapper courses-detail '>
        <Container className='course-basic-details'>
          <CoursePlayer />
        </Container>
        <CourseEnrollPeerDetails
          userInfo={user?.userInfo}
          isOwner={userData.id}
          updateCourseDetails={updateCourseDetails}
        />
        <div className='bg-paper-white pt-1'>
          <Container className='d-lg-flex pb-2 pb-md-4'>
            <div className='profile-left-bar'>
              <CoursesFeatures
                courseDetail={courseDetail}
                RoomGoal={courseDetail?.courseGoal}
                Requirement={courseDetail?.requirement}
                FullDescription={courseDetail?.description}
                tags={courseDetail?.tags}
                certificateTitle={courseDetail?.certificateTitle}
                chapterDetails={courseDetail?.chapterDetails}
                courseQuiz={courseDetail?.courseQuiz}
                type='course'
              />
              {/* <Certifications /> */}
              <OtherMatchToGM
                type='courses'
                courseType={courseDetail?.courseType}
              />
              {courseDetail?.instituteDetails?.id ? (
                <AboutInsititue
                  rating={courseDetail?.rating}
                  instituteDetails={courseDetail?.instituteDetails}
                />
              ) : (
                <AboutTeacher
                  rating={courseDetail?.rating}
                  userDetails={courseDetail?.UserDetails}
                />
              )}
              <StudentFeedback sourceId={courseId} type='course' />
              <OtherCourses
                courseId={courseDetail?.id}
                userDetails={courseDetail?.UserDetails}
                instituteDetails={courseDetail?.instituteDetails}
              />
            </div>
            <div className='profile-right-bar mt-4'>
              <UpgradeYourProfile />
              <GrowthModal />
              <GrowthPartners />
              <RecentAddedGM />
              <FollowedGroup />
              <MostFollowedContents />
            </div>
          </Container>
        </div>
      </div>
    </Layout>
  );
};
export default WithAuth(CourseDetail);
