import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  RecentAddedGM,
  UpgradeYourProfile,
  GrowthPartners,
} from "/components/sidebar";
import { Container, Tabs, Tab } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { toggleModals } from "store/actions";
import {
  aboutInfo,
  addFollowUpdate,
  getInstituteDetails,
  getLearningInstituteDetails,
} from "store/actions/learningInstitute";
import { onImageError, setCookie } from "utils";
import { useRouter } from "next/router";
import WithAuth from "components/with-auth/with-auth";
import { Fragment } from "react";
import { Layout } from "components/layout";
import { GrowthModal } from "components/sidebar";
import dynamic from "next/dynamic";
import ProfileLoader from "components/ui/profile";

const ContactInfo = dynamic(() => import("components/modal/contact-info"));
const JobTabRender = dynamic(() =>
  import("components/profile-tabs/tabs-component/job-tab-render")
);
const AddToGMModal = dynamic(() =>
  import("components/modal").then((mod) => mod.AddToGMModal)
);
const MainModal = dynamic(() =>
  import("components/modal").then((mod) => mod.MainModal)
);
const Eventmodule = dynamic(() =>
  import("components/profile-tabs").then((mod) => mod.Eventmodule)
);
const ServiceTabs = dynamic(() =>
  import("components/profile-tabs").then((mod) => mod.ServiceTabs)
);
const AboutTabs = dynamic(() =>
  import("components/profile-tabs").then((mod) => mod.AboutTabs)
);
const FacultiesTabs = dynamic(() =>
  import("components/profile-tabs").then((mod) => mod.FacultiesTabs)
);
const PostTabs = dynamic(() =>
  import("components/profile-tabs").then((mod) => mod.PostTabs)
);
const ArticlesTabs = dynamic(() =>
  import("components/profile-tabs").then((mod) => mod.ArticlesTabs)
);
const PeopleTabs = dynamic(() =>
  import("components/profile-tabs").then((mod) => mod.PeopleTabs)
);
const CourseList = dynamic(() =>
  import("components/profile-tabs").then((mod) => mod.CourseList)
);
const HomeTabs = dynamic(() =>
  import("components/profile-tabs/home-tab").then((mod) => mod.HomeTabs)
);

const InstituteProfile = ({}) => {
  const [lang] = useTranslation("language");
  const router = useRouter();
  const [renderType, setRenderType] = useState("joblist");
  const { learningData } = useSelector((state) => state.learningInstitute);
  const [jobDetailId, setJobDetailId] = useState(null);
  const [followLoading, setFollowLoading] = useState(false);
  const { instituteId, name, tab } = router.query;
  const dispatch = useDispatch();
  const { aboutData } = useSelector((data) => data.learningInstitute);
  useEffect(() => {}, [jobDetailId]);
  const { editinfo } = useSelector(({ ui }) => ui.modals, shallowEqual);
  const [activeTab, setActiveTab] = useState("home");

  const jobRendering = useSelector(
    (state) => state?.learningInstitute?.jobRender
  );

  useEffect(() => {
    dispatch(getInstituteDetails());
  }, []);

  useEffect(() => {
    dispatch(aboutInfo(instituteId));
  }, []);

  useEffect(() => {
    if (jobRendering?.renderingType === "addjob") {
      setActiveTab("job");
      setCookie("jobId", jobRendering?.jobId);
      setRenderType(jobRendering?.renderingType);
    }
  }, [jobRendering]);

  useEffect(() => {
    if (!tab) {
      router.replace({
        pathname: "/profile/institute-profile",
        query: { ...router.query, tab: "home" },
      });
    } else if (tab) {
      setActiveTab(tab);
    }
  }, [router.query]);

  const handleActiveTab = (tab) => {
    setActiveTab(tab);
  };

  const handleFollowUnfollow = () => {
    setFollowLoading(true);
    let data = {
      learningInstituteId: learningData?.id,
      isFollow: !learningData?.cufd?.isFollow,
    };
    dispatch(addFollowUpdate(data, true))
      .then((res) => {
        if (res.data) {
          dispatch(getLearningInstituteDetails(instituteId, true)).finally(
            () => {
              setFollowLoading(false);
            }
          );
        } else {
          setFollowLoading(false);
        }
      })
      .catch((e) => {
        setFollowLoading(false);
      });
  };

  /**************************************
@purpose : Used for edit institute details
@Author : INIC
******************************************/
  useEffect(() => {
    getLearningDetails();
  }, []);
  const getLearningDetails = () => {
    dispatch(getLearningInstituteDetails(instituteId, true));
  };

  let total = 0;

  aboutData.map((element) => {
    total += element.data.length;
  });

  if (Object.keys(learningData).length === 0) {
    return <ProfileLoader />;
  }

  /*******************
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  return (
    <Fragment>
      <Layout>
        <div className="inner-wrapper profile-wrapper my-profile">
          <Container>
            <div className="d-flex flex-wrap d-xl-nowrap">
              <div className="profile-left-bar">
                <Card>
                  <Card.Body className="p-0">
                    <div className="profile-bg position-relative mn-h-200">
                      <picture onContextMenu={(e) => e.preventDefault()}>
                        <source srcSet={learningData?.cover} type="image/jpg" />
                        <img
                          src={learningData?.cover ?? ""}
                          alt={lang("COMMON.PROFILE_BANNER")}
                          className="object-cover"
                          width="1133"
                          height="200"
                          onError={(e) => onImageError(e, "myprofile")}
                        />
                      </picture>
                    </div>
                    <div className="profile-summary-wrap">
                      <div className="mt-xl-4 mt-md-5 mb-3 mx-md-4 mx-3 position-relative pt-5">
                        <div className="profile-wrap pt-xl-0 pt-md-2">
                          <div className="profile-box w-h-120 rounded-pill">
                            <div className="position-relative w-h-120 rounded-pill flex-shrink">
                              <div className="w-h-120 overflow-hidden rounded-pill flex-shrink w-h-100-sm">
                                <picture
                                  onContextMenu={(e) => e.preventDefault()}
                                >
                                  <source
                                    srcSet={learningData?.logo}
                                    type="image/jpg"
                                  />
                                  <img
                                    src={learningData?.logo ?? ""}
                                    alt={lang("COMMON.PROFILE_PICTURE")}
                                    width="120"
                                    height="120"
                                    onError={(e) =>
                                      onImageError(e, "profile", name)
                                    }
                                  />
                                </picture>
                              </div>
                            </div>
                          </div>

                          <div className="profile-info">
                            <h6 className="mt-3">{name}</h6>
                            <div className="d-flex align-items-center">
                              <h5 className="text-body-14 text-gray font-weight-normal mb-1">
                                {learningData?.slogan}
                              </h5>
                            </div>
                          </div>
                        </div>
                        <div className="profile-summary list-unstyled mt-2 d-flex flex-wrap">
                          <div
                            className={`text-center lh-1 d-flex ${
                              learningData?.followersCount > 0 &&
                              "cursor-pointer"
                            }`}
                            onClick={() => {
                              if (learningData?.followersCount > 0) {
                                setActiveTab("people");
                                router.push({
                                  pathname: router.pathname,
                                  query: { ...router.query, tab: "people" },
                                });
                              }
                            }}
                          >
                            <h5 className="text-body-14 mb-0 text-primary font-sm-10">
                              {learningData?.followersCount}
                              <span className="text-gray pl-1 text-primary ">
                                {lang("ACTIVITY.TEXT.FOLLOWERS")}
                              </span>
                            </h5>
                          </div>

                          <div
                            className={`text-center d-flex ${
                              learningData?.totalEmployees > 0 &&
                              "cursor-pointer"
                            }`}
                            onClick={() => {
                              if (learningData?.totalEmployees > 0) {
                                setActiveTab("people");
                                router.push({
                                  pathname: router.pathname,
                                  query: { ...router.query, tab: "people" },
                                });
                              }
                            }}
                          >
                            <span className="px-1 px-sm-2 lh-1 text-gray">
                              •
                            </span>
                            <h5 className="text-body-14 mb-0 text-primary font-sm-10">
                              {learningData?.totalEmployees || 0}
                              <span className="text-gray pl-1 text-primary ">
                                {lang("PROFILE_TABS.EMPLOYEES")}
                              </span>
                            </h5>
                          </div>

                          <div
                            className={`text-center d-flex ${
                              learningData?.courseCount > 0 && "cursor-pointer"
                            }`}
                            onClick={() => {
                              if (learningData?.courseCount > 0) {
                                setActiveTab("courses");
                                router.push({
                                  pathname: router.pathname,
                                  query: { ...router.query, tab: "courses" },
                                });
                              }
                            }}
                          >
                            <span className="px-1 px-sm-2 lh-1 text-gray">
                              •
                            </span>
                            <h5 className="text-body-14 mb-0 text-primary font-sm-10">
                              {learningData?.courseCount}
                              <span className="text-gray pl-1 text-primary ">
                                {lang("GROWTH_TOOL.ACTIVITIES")}
                              </span>
                            </h5>
                          </div>
                        </div>
                        <div className="profile-action-top">
                          <button
                            type="button"
                            className=" btn-sm btn btn-outline-grey-secondary py-1 px-2 p-2"
                            disabled={followLoading}
                            onClick={() => handleFollowUnfollow()}
                          >
                            {learningData?.cufd?.isFollow
                              ? lang("COMMON.UNFOLLOW")
                              : lang("COMMON.FOLLOW")}
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              dispatch(toggleModals({ editinfo: true }))
                            }
                            className="btn-sm btn btn-outline-grey-secondary py-1 px-2 ml-2 p-2"
                          >
                            {lang("PROFILE_TABS.CONTACT")}
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
                <div className="custom-tab page-tab pt-2">
                  <Tabs
                    id="uncontrolled-tab-example"
                    className=" card-header-tabs "
                    activeKey={activeTab}
                    onSelect={(k) => {
                      setActiveTab(k);
                      router.push({
                        pathname: "/profile/institute-profile",
                        query: { ...router.query, tab: k },
                      });
                    }}
                  >
                    <Tab eventKey="home" title={lang("COMMON.HOME")}>
                      <HomeTabs
                        handleActiveTab={handleActiveTab}
                        learningData={learningData}
                        activeTab={activeTab}
                        setRenderType={setRenderType}
                        setJobDetailId={setJobDetailId}
                        setActiveTab={setActiveTab}
                      />
                    </Tab>
                    {total > 0 && (
                      <Tab eventKey="about" title={lang("ROOMS.ABOUT")}>
                        <AboutTabs aboutData={aboutData} />
                      </Tab>
                    )}

                    {learningData?.isProduct && (
                      <Tab
                        eventKey="courses"
                        title={lang("PROFILE_TABS.ACTIVITIES")}
                      >
                        <CourseList activeTab={activeTab} />
                      </Tab>
                    )}

                    {learningData?.isFaculty && (
                      <Tab
                        eventKey="facultie"
                        title={lang("PROFILE_TABS.FACULTIES")}
                      >
                        <FacultiesTabs />
                      </Tab>
                    )}

                    {learningData?.isService && (
                      <Tab
                        eventKey="service"
                        title={lang("PROFILE_TABS.SERVICES")}
                      >
                        <ServiceTabs logo={learningData?.logo} />
                      </Tab>
                    )}

                    {learningData?.isPost && (
                      <Tab eventKey="post" title={lang("PROFILE_TABS.POST")}>
                        <PostTabs />
                      </Tab>
                    )}

                    {learningData?.isArticle && (
                      <Tab
                        eventKey="articles"
                        title={lang("GLOBAL_SEARCH.FILTER.ARTICLES")}
                      >
                        <ArticlesTabs />
                      </Tab>
                    )}

                    {learningData?.isEvent && (
                      <Tab eventKey="events" title={lang("GROWTH_TOOL.EVENTS")}>
                        <Eventmodule />
                      </Tab>
                    )}

                    {learningData?.isPeople && (
                      <Tab
                        eventKey="people"
                        title={lang("GLOBAL_SEARCH.FILTER.PEOPLE")}
                      >
                        <PeopleTabs activeTab={activeTab} />
                      </Tab>
                    )}
                    {learningData?.isJob && (
                      <Tab eventKey="job" title={lang("PROFILE_TABS.JOBS")}>
                        <JobTabRender
                          renderType={renderType}
                          setRenderType={setRenderType}
                          jobDetailId={jobDetailId}
                          setJobDetailId={setJobDetailId}
                          activeTab={activeTab}
                        />
                      </Tab>
                    )}
                  </Tabs>
                </div>
              </div>

              <div className="profile-right-bar">
                <UpgradeYourProfile />
                <GrowthModal />
                <GrowthPartners />
                <RecentAddedGM />
              </div>
            </div>
          </Container>
        </div>
        {/*****************************
       @purpose :Edit institute overview
       @Author : INIC
       *****************************/}
        <MainModal
          className="custom-modal-footer"
          size="xxl"
          show={editinfo}
          keyModal="editinfo"
          body={<ContactInfo instituteId={instituteId} />}
          headerClassName="mb-50 block md-mb-30"
          header={
            <h2 className="h6 m-0">{lang("PROFILE_TABS.CONTACT_INFO")}</h2>
          }
        />
      </Layout>
    </Fragment>
  );
};
export default WithAuth(InstituteProfile);
