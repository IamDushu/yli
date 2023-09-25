import { Layout } from "@components/layout";
import {
  Activity,
  Certifications,
  Description,
  Education,
  Experience,
  FollowedGroups,
  Languages,
  ProfileSummary,
  TotalSummary,
} from "components/profile";
import ShortDescription from "components/profile/shortDescription";
import Skills from "components/profile/skills";
import {
  FollowedGroup,
  GrowthModal,
  GrowthPartners,
  MostFollowedContents,
  RecentAddedGM,
  UpgradeYourProfile,
} from "components/sidebar";
import ProfileLoader from "components/ui/profile";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Card, Container, Tab, Tabs } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getCertificationList } from "store/actions/certification";
import { getEducationList } from "store/actions/education";
import { getExperienceList } from "store/actions/experience";
import { selectCertificationData } from "store/selectors/certification";
import { selectEducationData } from "store/selectors/education";
import { selectLanguageData } from "store/selectors/language";
import { trackEvent } from "@components/segment-analytics";
import { get } from "../../api/index";
import { GET_OTHER_PROFILE } from "../../api/routes";
import WithAuth from "../../components/with-auth/with-auth";
import { USER_API_URL } from "../../config";
import {
  checkPendingRequest,
  getGroupsJoinedList,
  getProfileCountData,
  postListing,
  profileSearch,
  profileViewed,
} from "../../store/actions";
import { manageActivity } from "../../store/actions/manageActivities";
import { selectUserInfo } from "../../store/selectors/user";

const ViewProfile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const userData = useSelector(selectUserInfo);
  const { countData } = useSelector((state) => state.user);

  /******************* 
  @purpose : All the useRef()
  @Author : INIC
  ******************/
  const descriptionRef = useRef();
  const shortDescriptionRef = useRef();
  const experienceRef = useRef();
  const educationRef = useRef();
  const certificationRef = useRef();
  const languageRef = useRef();
  const skillsRef = useRef();
  const { profileGroupsList } = useSelector(({ groups }) => groups);
  const { profileId, profileTab } = router.query;
  const viewmode = Boolean(router.query.viewmode);
  /******************* 
  @purpose : All the useStates()
  @Author : INIC
  ******************/
  const [isSelfProfile, setIsSelfProfile] = useState(
    userData.profileId === profileId || profileId === "me"
  );

  const [userDetails, setUserDetails] = useState(null);
  const [otherUserData, setOtherUserData] = useState("");
  const [skillsInfo, setSkillsInfo] = useState([]);
  const [certificateInfo, setCertificateInfo] = useState([]);
  const [educationInfo, setEducationInfo] = useState([]);
  const [activityInfo, setActivityInfo] = useState([]);
  const [activityCount, setActivityCount] = useState(0);
  const [userJoinedGroupInfo, setUserJoinedGroupInfo] = useState([]);
  const [languageInfo, setLanguageInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visibilityProfileLocked, setVisibilityProfileLocked] = useState("");

  const languageDataFlag = useSelector(selectLanguageData);
  const certificateDataFlag = useSelector(selectCertificationData);
  const educationDataFlag = useSelector(selectEducationData);
  const { experienceList } = useSelector((state) => state.experience);
  const { educationList } = useSelector((state) => state.education);
  const { certificationList } = useSelector((state) => state.certification);
  const ActivityList = useSelector((state) => state.manageActivity);

  const [tabKey, setTabKey] = useState("ShortDescription");
  const [lang] = useTranslation("language");

  /******************* 
  @purpose : User Joined Group
  @Author : INIC
  ******************/
  useEffect(() => {
    if (profileGroupsList) {
      setUserJoinedGroupInfo(profileGroupsList.data);
    }
  }, [profileGroupsList]);
  /******************* 
  @purpose : My Profile 
  @Author : INIC
  ******************/
  useEffect(() => {
    if (profileTab) {
      setTabKey(profileTab);
    }
  }, [router.query]);

  useEffect(() => {
    if (isSelfProfile || (!isSelfProfile && otherUserData));
    setTimeout(() => {
      dispatch(
        getExperienceList({
          userId: isSelfProfile ? userData?.id : otherUserData?.id,
        })
      );
      dispatch(
        getEducationList({
          userId: isSelfProfile ? userData?.id : otherUserData?.id,
        })
      );
      dispatch(
        getCertificationList({
          userId: isSelfProfile ? userData?.id : otherUserData?.id,
        })
      );
    }, 1000);
  }, [isSelfProfile, otherUserData]);


  async function updateOtherUserData() {
    const response = await get(
      { serviceURL: USER_API_URL },
      `${GET_OTHER_PROFILE}${profileId}`,
      false,
      {},
      true
    );
    let payload = {
      recentVisitorUserId: response?.data?.id,
    };
    setOtherUserData(response.data);
    return { response, payload }
  }

  useEffect(() => {
    !isSelfProfile &&
      otherUserData?.visibilitySettings &&
      otherUserData?.visibilitySettings.forEach((element) => {
        if (element.key === "profile_options") {
          setVisibilityProfileLocked(element.settings);
        }
      });
  }, [otherUserData?.visibilitySettings]);
  useEffect(() => {
    setIsSelfProfile(userData.profileId === profileId || profileId === "me");

    if (userData.profileId === profileId || profileId === "me") {
      let data = { page: 1, pagesize: 10, searchText: "" };
      const type = "profile";
      // dispatch(getUserProfileData());
      dispatch(getProfileCountData(userData?.id));
      dispatch(getGroupsJoinedList(data, type));
      dispatch(postListing({ page: 1, pagesize: 4 }));
      dispatch(
        manageActivity({
          page: 1,
          pagesize: 6,
          searchText: "",
          userId: userData?.id,
        })
      );
      // dispatch(getGroupsList({ page: 1, pagesize: 10, searchText: "" }));
    } else {
      (async () => {
        setIsLoading(true);
        const { response, payload } = await updateOtherUserData();
        dispatch(profileViewed(response?.data?.id));
        dispatch(checkPendingRequest(response?.data?.id));
        // if (!isSelfProfile) {
        dispatch(getProfileCountData(response?.data?.id));
        // }
        dispatch(profileSearch(payload));
        dispatch(
          manageActivity({
            page: 1,
            pagesize: 6,
            searchText: "",
            userId: response?.data?.id,
          })
        );
        if (response.status === 1) {
          // if viewed other user profile
          trackEvent("profile_viewed", {
            name: `${response?.data?.firstName} ${response?.data?.lastName}`,
            email: response?.data?.email,
          });
          setSkillsInfo(response.data.skills || []);
          setCertificateInfo(response.data.certificate || []);
          setEducationInfo(response.data.educationDetails || []);
          setActivityInfo(response.data.activity || []);
          setActivityCount(response.data.activityFollowerCount);
          setUserJoinedGroupInfo(response.data.joinedGroups || []);
          setLanguageInfo(response.data.languageSkills || []);
          setUserDetails(response.data || {});
        }
        setIsLoading(false);
      })();
    }
  }, [profileId]);

  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  if (isLoading) {
    return <ProfileLoader />;
  }

  const renderTabs = () => {
    const tabs = [];

    if (isSelfProfile) {
      tabs.push(
        <Tab
          key="ShortDescription"
          eventKey="ShortDescription"
          title={lang("PROFILE_TABS.OVERVIEW")}
        >
          {tabKey === "ShortDescription" && (
            <ShortDescription
              isSelfProfile={isSelfProfile}
              shortDescriptionRef={shortDescriptionRef}
              userDetails={userDetails}
              viewmode={viewmode}
              otherUserData={otherUserData}
            />
          )}
        </Tab>
      );

      tabs.push(
        <Tab
          Tab
          key="Description"
          eventKey="Description"
          title={lang("PROFILE_TABS.DESCRIPTION")}
        >
          {tabKey === "Description" && (
            <Description
              isSelfProfile={isSelfProfile}
              descriptionRef={descriptionRef}
              userDetails={userDetails}
              viewmode={viewmode}
              otherUserData={otherUserData}
            />
          )}
        </Tab>
      );

      tabs.push(
        <Tab key="Activity" eventKey="Activity" title={lang("COMMON.ACTIVITY")}>
          {tabKey === "Activity" && (
            <Activity
              isSelfProfile={isSelfProfile}
              activityInfo={activityInfo}
              activityCount={activityCount}
              userDetails={userDetails}
              otherUserData={otherUserData}
              viewmode={viewmode}
              userCountInfo={countData}
              userData={userData}
            />
          )}
        </Tab>
      );

      if (experienceList?.rows?.length > 0) {
        tabs.push(
          <Tab
            key="Experience"
            eventKey="Experience"
            title={lang("PROFILE_TABS.EXPERIENCE_PT")}
          >
            {tabKey === "Experience" && (
              <Experience
                experienceRef={experienceRef}
                experienceList={experienceList}
                viewmode={viewmode}
                isSelfProfile={isSelfProfile}
              />
            )}
          </Tab>
        );
      }

      if (educationList?.rows?.length > 0) {
        tabs.push(
          <Tab
            key="Education"
            eventKey="Education"
            title={lang("EDUCATION.TEXT.EDUCATION")}
          >
            {tabKey === "Education" && (
              <Education
                isSelfProfile={isSelfProfile}
                educationRef={educationRef}
                educationList={educationList}
                viewmode={viewmode}
                otherUserData={otherUserData}
              />
            )}
          </Tab>
        );
      }

      if (certificationList?.rows?.length > 0) {
        tabs.push(
          <Tab
            key="Certifications"
            eventKey="Certifications"
            title={lang("MY_ACCOUNTS.COMMON.CERTIFICATIONS")}
          >
            {tabKey === "Certifications" && (
              <Certifications
                isSelfProfile={isSelfProfile}
                certificationRef={certificationRef}
                certificationList={certificationList}
                viewmode={viewmode}
                otherUserData={otherUserData}
              />
            )}
          </Tab>
        );
      }

      if (languageDataFlag?.length > 0) {
        tabs.push(
          <Tab key="Languages" eventKey="Languages" title="Languages">
            {tabKey === "Languages" && (
              <Languages
                isSelfProfile={isSelfProfile}
                languageRef={languageRef}
                languageInfo={languageInfo}
                viewmode={viewmode}
                otherUserData={otherUserData}
              />
            )}
          </Tab>
        );
      }
    } else {
      if (otherUserData?.shortDescription) {
        tabs.push(
          <Tab
            key="ShortDescription"
            eventKey="ShortDescription"
            title={lang("PROFILE_TABS.OVERVIEW")}
          >
            <ShortDescription
              isSelfProfile={isSelfProfile}
              shortDescriptionRef={shortDescriptionRef}
              userDetails={userDetails}
              viewmode={viewmode}
              otherUserData={otherUserData}
            />
          </Tab>
        );
      }

      if (otherUserData?.briefDescription) {
        tabs.push(
          <Tab
            key="Description"
            eventKey="Description"
            title={lang("PROFILE_TABS.DESCRIPTION")}
          >
            <Description
              isSelfProfile={isSelfProfile}
              descriptionRef={descriptionRef}
              userDetails={userDetails}
              viewmode={viewmode}
              otherUserData={otherUserData}
            />
          </Tab>
        );
      }

      if (ActivityList.manageActivity?.length > 0) {
        tabs.push(
          <Tab
            key="Activity"
            eventKey="Activity"
            title={lang("MY_ACCOUNTS.COMMON.ACTIVITY")}
          >
            <Activity
              isSelfProfile={isSelfProfile}
              activityInfo={activityInfo}
              activityCount={activityCount}
              userDetails={userDetails}
              otherUserData={otherUserData}
              viewmode={viewmode}
              userCountInfo={countData}
              userData={userData}
            />
          </Tab>
        );
      }

      if (experienceList?.rows?.length > 0) {
        tabs.push(
          <Tab
            key="Experience"
            eventKey="Experience"
            title={lang("PROFILE_TABS.EXPERIENCE_PT")}
          >
            <Experience
              isSelfProfile={isSelfProfile}
              experienceRef={experienceRef}
              experienceList={experienceList}
              viewmode={viewmode}
            />
          </Tab>
        );
      }

      if (educationList?.rows?.length > 0) {
        tabs.push(
          <Tab
            key="Education"
            eventKey="Education"
            title={lang("EDUCATION.TEXT.EDUCATION")}
          >
            <Education
              isSelfProfile={isSelfProfile}
              educationRef={educationRef}
              educationList={educationList}
              viewmode={viewmode}
              otherUserData={otherUserData}
            />
          </Tab>
        );
      }

      if (certificationList?.rows?.length > 0) {
        tabs.push(
          <Tab
            key="Certifications"
            eventKey="Certifications"
            title={lang("MY_ACCOUNTS.COMMON.CERTIFICATIONS")}
          >
            <Certifications
              isSelfProfile={isSelfProfile}
              certificationRef={certificationRef}
              certificationList={certificationList}
              viewmode={viewmode}
              otherUserData={otherUserData}
            />
          </Tab>
        );
      }

      if (otherUserData?.languageSkills?.length > 0) {
        tabs.push(
          <Tab key="Languages" eventKey="Languages" title="Languages">
            <Languages
              isSelfProfile={isSelfProfile}
              languageRef={languageRef}
              languageInfo={languageInfo}
              viewmode={viewmode}
              otherUserData={otherUserData}
            />
          </Tab>
        );
      }
    }

    return tabs;
  };
  return (
    <Layout>
      <div className="inner-wrapper profile-wrapper my-profile py-3">
        <Container>
          {!isLoading && !isSelfProfile && !userDetails ? (
            <h1 className="text-center">This profile does not exist</h1>
          ) : (
            <div className="d-flex flex-wrap d-xl-nowrap">
              <div className="profile-left-bar">
                <ProfileSummary
                  isSelfProfile={isSelfProfile}
                  userCountInfo={countData}
                  shortDescriptionRef={shortDescriptionRef}
                  descriptionRef={descriptionRef}
                  userDetails={userDetails}
                  otherUserData={otherUserData}
                  viewmode={viewmode}
                  setOtherUserData={setOtherUserData}
                  profileId={profileId}
                />
                {isSelfProfile ||
                  visibilityProfileLocked === "" ||
                  (otherUserData &&
                    otherUserData.connectionData[0]?.isConnection) ||
                  (otherUserData &&
                    !otherUserData.connectionData[0]?.isConnection &&
                    visibilityProfileLocked.public) ? (
                  <Fragment>
                    <TotalSummary isSelfProfile={isSelfProfile} />
                    {isSelfProfile && (
                      <Tabs
                        activeKey={tabKey}
                        id="profile-tabs-section"
                        className="custom-tabs mb-0 border-bottom border-geyser group-nav-tabs profile-tabs-title-text overflow-x-auto profile-custom-tabs"
                        style={{ backgroundColor: "#FFFFFF" }}
                        onSelect={(e) => {
                          setTabKey(e);
                          router.push({
                            pathname: `/profile/${profileId}`,
                            query: { profileTab: e },
                          });
                        }}
                      >
                        {renderTabs()}
                      </Tabs>
                    )}

                    {!isSelfProfile &&
                      (otherUserData?.shortDescription ||
                        otherUserData?.briefDescription ||
                        otherUserData?.educationDetails?.length > 0 ||
                        otherUserData?.certificate?.length > 0 ||
                        otherUserData?.languageSkills?.length > 0 ||
                        otherUserData?.experience?.length > 0) && (
                        <Tabs
                          activeKey={tabKey}
                          id="profile-tabs-section"
                          className="custom-tabs mb-0 border-bottom border-geyser group-nav-tabs profile-tabs-title-text overflow-x-auto profile-custom-tabs"
                          style={{ backgroundColor: "#FFFFFF" }}
                          onSelect={(e) => {
                            setTabKey(e);
                            router.push({
                              pathname: `/profile/${profileId}`,
                              query: { profileTab: e },
                            });
                          }}
                        >
                          {renderTabs()}
                        </Tabs>
                      )}

                    {(isSelfProfile ||
                      otherUserData.userSkillDetails.length > 0) && (
                        <Skills
                          isSelfProfile={isSelfProfile}
                          skillsRef={skillsRef}
                          skillsInfo={skillsInfo}
                          viewmode={viewmode}
                          otherUserData={otherUserData}
                          updateOtherUserData={updateOtherUserData}
                        />
                      )}

                    {(isSelfProfile ||
                      otherUserData.followedGroup.length > 0) && (
                        <FollowedGroups
                          isSelfProfile={isSelfProfile}
                          userJoinedGroupInfo={userJoinedGroupInfo}
                          viewmode={viewmode}
                          otherUserData={otherUserData}
                        />
                      )}
                  </Fragment>
                ) : (
                  <Card className="my-4 post-upload">
                    <Card.Body className="py-5 d-flex justify-content-center">
                      <h6 className="mb-0 d-flex align-items-center">
                        <i className="bx bx-lock-alt font-46 mr-3"></i>
                        <h4>The Profile has been Locked</h4>
                      </h6>
                    </Card.Body>
                  </Card>
                )}
              </div>
              <div className="profile-right-bar">
                {/* <OtherViews /> */}
                <UpgradeYourProfile />
                <GrowthModal />
                <GrowthPartners />
                <RecentAddedGM />
                <FollowedGroup />
                <MostFollowedContents />
              </div>
            </div>
          )}
        </Container>
      </div>
    </Layout>
  );
};
export default WithAuth(ViewProfile);
