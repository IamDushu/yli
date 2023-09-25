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
import { getFollowerListingCo } from "store/actions";
import {
  aboutInfoCo,
  addFollowUpdateCo,
  getCompanyDetailsById,
} from "store/actions";
import { selectUserInfo } from "store/selectors/user";
import { onImageError, setCookie } from "utils";
import { useRouter } from "next/router";
import WithAuth from "components/with-auth/with-auth";
import { Fragment } from "react";
import { Layout } from "components/layout";
import { APP_URL } from "config";
import { selectSearchData } from "store/selectors/searchResult";
import { GrowthModal } from "components/sidebar";
import dynamic from "next/dynamic";
import ProfileLoader from "components/ui/profile";
import { HomeTabs } from "components/profile-tabs/home-tab"; // Direct loading as it's needed immediately loaded upfront
import WithPopup from "components/with-popup/with-popup";
import ContactInfoCompany from "components/contact-info-modal/contact-info-company-new";

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
const ProductsTab = dynamic(() =>
  import("components/profile-tabs").then((mod) => mod.ProductsTab)
);
const ServiceTabs = dynamic(() =>
  import("components/profile-tabs").then((mod) => mod.ServiceTabs)
);
const AboutTabs = dynamic(() =>
  import("components/profile-tabs").then((mod) => mod.AboutTabs)
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

// Removed dynamic loading hometabs as it takes time to load the hometab when user visits the profile
// const HomeTabs = dynamic(() =>
//   import("components/profile-tabs/home-tab").then((mod) => mod.HomeTabs)
// );

const CompanyProfile = ({ renderPopup, openPopupHandler }) => {
  const searchData = useSelector(selectSearchData);
  const [lang] = useTranslation("language");
  const router = useRouter();
  const [renderType, setRenderType] = useState("joblist");
  const { companyData } = useSelector((state) => state.company);
  const [jobDetailId, setJobDetailId] = useState(null);
  const userInfo = useSelector(selectUserInfo);
  const { companyId, name, tab } = router.query;
  const dispatch = useDispatch();
  const { addtoGrowthModellearningInst } = useSelector(
    ({ ui }) => ui.modals,
    shallowEqual
  );
  const { aboutData } = useSelector((data) => data.company);
  useEffect(() => {}, [jobDetailId]);
  const { editinfo } = useSelector(({ ui }) => ui.modals, shallowEqual);
  const [activeTab, setActiveTab] = useState("home");

  const jobRendering = useSelector(
    (state) => state?.learningInstitute?.jobRender
  );

  useEffect(() => {
    dispatch(aboutInfoCo(companyId));
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
        pathname: "/profile/company-profile",
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
    let data = {
      companyId: companyData?.id,
      isFollow: !companyData?.cufd?.isFollow,
    };
    dispatch(addFollowUpdateCo(data)).then((res) => {
      if (res.data) {
        dispatch(getCompanyDetailsById(companyId));
        dispatch(
          getFollowerListingCo({
            page: 1,
            pagesize: 4,
            companyId: companyId,
            selected_city: "",
            selected_state: "",
            selected_country: "",
            startDate: "",
            endDate: "",
            isFollowers: "",
            selected_isFollowers: "",
            selected_currentPosition: "",
            searchText: "",
          })
        );
      }
    });
  };

  /**************************************
@purpose : Used for edit institute details
@Author : YLIWAY
******************************************/
  useEffect(() => {
    getCompanyDetails();
  }, []);
  const getCompanyDetails = () => {
    dispatch(getCompanyDetailsById(companyId));
  };

  const initGModalData = {
    activityCategory: "learning-institute",
    activityTitle: "",
    activityId: "",
    activityLink: "",
  };

  const [gmodalData, setGmodalData] = useState(initGModalData);

  const addToGModalToggle = (id = "", title = "", postLink) => {
    if (id !== "") {
      setGmodalData((state) => ({
        ...state,
        activityId: id,
        activityTitle: title,
        activityLink: postLink,
      }));
      dispatch(toggleModals({ addtoGrowthModellearningInst: true }));
    } else {
      setGmodalData({ ...initGModalData });
      dispatch(toggleModals({ addtoGrowthModellearningInst: false }));
    }
  };

  const addtoGrowthM = (orgId, title, orgType, userId) => {
    let postLink = `${APP_URL}/profile/company-profile/?companyId=${orgId}&name=${title}&userId=${userId}`;
    addToGModalToggle(orgId, title, postLink);
  };
  let total = 0;

  aboutData.map((element) => {
    total += element.data.length;
  });

  if (Object.keys(companyData).length === 0) {
    return <ProfileLoader />;
  }

  /*******************
  @purpose : Rander HTML/ React Components
  @Author : YLIWAY
  ******************/
  return (
    <Fragment>
      <Layout>
        <div className="inner-wrapper profile-wrapper my-profile">
          <Container>
            <div className="d-flex flex-wrap d-xl-nowrap">
              <div className="profile-left-bar">
                {/* Profile header */}
                <Card>
                  <Card.Body className="p-0">
                    <div className="profile-bg position-relative mn-h-200">
                      <picture onContextMenu={(e) => e.preventDefault()}>
                        <source srcSet={companyData?.cover} type="image/jpg" />
                        <img
                          src={companyData?.cover ?? ""}
                          alt={lang("COMMON.PROFILE_BANNER")}
                          className="object-cover"
                          width="1133"
                          height="200"
                          onError={(e) => onImageError(e, "myprofile")}
                        />
                      </picture>
                    </div>

                    {/* *** */}

                    <div className="profile-summary-wrap">
                      <div className="mt-xl-4 mt-md-5 mb-3 mx-md-4 mx-3 position-relative pt-5">
                        <div className="profile-wrap pt-xl-0 pt-md-2">
                          <div className="profile-box w-h-120 rounded-pill">
                            <div className="position-relative w-h-120 rounded-pill flex-shrink">
                              <div className="w-h-120 overflow-hidden rounded-pill flex-shrink">
                                <picture
                                  onContextMenu={(e) => e.preventDefault()}
                                >
                                  <source
                                    srcSet={companyData?.logo}
                                    type="image/jpg"
                                  />
                                  <img
                                    src={companyData?.logo ?? ""}
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
                                {companyData?.slogan}
                              </h5>
                            </div>
                          </div>
                        </div>
                        {/* *** */}

                        <div className="profile-summary list-unstyled mt-2 d-flex flex-wrap">
                          <div className="text-center lh-1 d-flex">
                            <h5 className="text-body-14 mb-0 text-primary">
                              {companyData?.followersCount}
                              <span className="text-gray pl-1 text-primary">
                                {lang("ACTIVITY.TEXT.FOLLOWERS")}
                              </span>
                            </h5>
                          </div>

                          <div className="text-center d-flex">
                            <span className="px-2  lh-1 text-gray">•</span>
                            <h5 className="text-body-14 mb-0 text-primary">
                              {companyData?.totalEmployees || 0}
                              <span className="text-gray pl-1 text-primary">
                                {lang("PROFILE_TABS.EMPLOYEES")}
                              </span>
                            </h5>
                          </div>
                        </div>
                        {/* *** */}

                        <div className="profile-action-top">
                          <button
                            type="button"
                            className=" btn-sm btn btn-outline-grey-secondary py-1 px-2 p-2"
                            onClick={() => handleFollowUnfollow()}
                          >
                            {companyData?.cufd?.isFollow
                              ? lang("COMMON.UNFOLLOW")
                              : lang("COMMON.FOLLOW")}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              // openPopupHandler(true);
                              dispatch(toggleModals({ editinfo: true }));
                            }}
                            className="btn-sm btn btn-outline-grey-secondary py-1 px-2 ml-2 p-2"
                          >
                            {lang("PROFILE_TABS.CONTACT")}
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* *** */}
                  </Card.Body>
                </Card>
                {/* Progress bar */}
                {/* */}

                {/* */}
                <div className="custom-tab page-tab pt-2">
                  <Tabs
                    id="uncontrolled-tab-example"
                    className="mb-3 card-header-tabs "
                    activeKey={activeTab}
                    onSelect={(k) => {
                      setActiveTab(k);
                      router.push({
                        pathname: "/profile/company-profile",
                        query: { ...router.query, tab: k },
                      });
                    }}
                  >
                    <Tab eventKey="home" title={lang("COMMON.HOME")}>
                      <HomeTabs
                        handleActiveTab={handleActiveTab}
                        companyData={companyData}
                        activeTab={activeTab}
                        setRenderType={setRenderType}
                        jobDetailId={jobDetailId}
                        setJobDetailId={setJobDetailId}
                        setActiveTab={setActiveTab}
                      />
                    </Tab>
                    {total > 0 && (
                      <Tab eventKey="about" title={lang("ROOMS.ABOUT")}>
                        <AboutTabs aboutData={aboutData} />
                      </Tab>
                    )}

                    {companyData?.isProduct && (
                      <Tab
                        eventKey="product"
                        title={lang("PROFILE_TABS.PRODUCTS")}
                      >
                        <ProductsTab logo={companyData?.logo} />
                      </Tab>
                    )}

                    {companyData?.isService && (
                      <Tab
                        eventKey="service"
                        title={lang("PROFILE_TABS.SERVICES")}
                      >
                        <ServiceTabs logo={companyData?.logo} />
                      </Tab>
                    )}

                    {companyData?.isPost && (
                      <Tab eventKey="post" title={lang("PROFILE_TABS.POST")}>
                        <PostTabs />
                      </Tab>
                    )}

                    {companyData?.isArticle && (
                      <Tab
                        eventKey="articles"
                        title={lang("GLOBAL_SEARCH.FILTER.ARTICLES")}
                      >
                        <ArticlesTabs />
                      </Tab>
                    )}

                    {companyData?.isEvent && (
                      <Tab eventKey="events" title={lang("GROWTH_TOOL.EVENTS")}>
                        <Eventmodule />
                      </Tab>
                    )}

                    {companyData?.isPeople && (
                      <Tab
                        eventKey="people"
                        title={lang("GLOBAL_SEARCH.FILTER.PEOPLE")}
                      >
                        <PeopleTabs activeTab={activeTab} />
                      </Tab>
                    )}

                    {companyData?.isJob && (
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
       @purpose :company overview
       @Author : YLIWAY
       *****************************/}
        {/* editinfo &&
          renderPopup(companyData?.companyName || "Company Info", (props) => (
            <ContactInfoCompany {...props} />
          )) */}
        <MainModal
          className="custom-modal-footer"
          size="xxl"
          show={editinfo}
          keyModal="editinfo"
          body={<ContactInfo companyId={companyId} newCompanyModal={true} />}
          headerClassName="mb-50 block md-mb-30"
          header={
            <h2 className="h6 m-0">{lang("PROFILE_TABS.CONTACT_INFO")}</h2>
          }
        />
      </Layout>
      <MainModal
        className="add-to-gmodal modal"
        show={addtoGrowthModellearningInst}
        keyModal="addtoGrowthModellearningInst"
        body={
          <AddToGMModal
            toggleGMModal={addToGModalToggle}
            data={gmodalData}
            learningInst={"learningInst"}
            instituteId={companyId}
          />
        }
        headerClassName="mb-50 block md-mb-30"
        header={<h2 className="h6 mb-0">{lang("ROOMS.ADD_TO_GM")}</h2>}
      />
    </Fragment>
  );
};
export default WithPopup(WithAuth(CompanyProfile));
