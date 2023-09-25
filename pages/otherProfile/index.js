import React, { Fragment, useEffect, useRef, useState } from "react";
import { Layout } from "@components/layout";
import { Container } from "react-bootstrap";

import {
  ProfileSummary,
  TotalSummary,
  Description,
  Experience,
  Education,
  Certifications,
  Languages,
} from "components/profile";
import { useDispatch, useSelector } from "react-redux";
import { getProfileCountData } from "../../store/actions";
import { get } from "../../api/index";
import { USER_API_URL } from "../../config";
import { OTHER_PROFILE } from "../../api/routes";
import ShortDescription from "components/profile/shortDescription";
import ProfileLoader from "components/ui/profile";
import { getCookie } from "utils";
import { useRouter } from "next/router";

const OtherProfileId = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const token = getCookie("token");
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

  const profileId = getCookie("profileId");

  /******************* 
  @purpose : All the useStates()
  @Author : INIC
  ******************/

  const [userDetails, setUserDetails] = useState(null);
  const [otherUserData, setOtherUserData] = useState("");
  const [experienceInfo, setExperienceInfo] = useState([]);
  const [certificateInfo, setCertificateInfo] = useState([]);
  const [educationInfo, setEducationInfo] = useState([]);
  const [languageInfo, setLanguageInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visibilityDetails, setVisibilityDetails] = useState("");

  useEffect(() => {
    if (token) {
      router.push("/dashboard");
    }
  }, [token]);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await get(
        { serviceURL: USER_API_URL },
        `${OTHER_PROFILE}${profileId}`,
        false,
        {},
        true
      );
      setOtherUserData(response.data);

      dispatch(getProfileCountData(response?.data?.id));

      if (response.status === 1) {
        setExperienceInfo(response.data.experience || []);
        setCertificateInfo(response.data.certificate || []);
        setEducationInfo(response.data.educationDetails || []);
        setLanguageInfo(response.data.languageSkills || []);
        setUserDetails(response.data || {});
        setVisibilityDetails(response?.data?.visibilityDetails);
      }
      setIsLoading(false);
    })();
  }, [profileId]);

  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  if (isLoading) {
    return <ProfileLoader type="otherProfile" />;
  }
  return (
    <Layout>
      <div className="inner-wrapper profile-wrapper my-profile py-3">
        <Container>
          {!isLoading && !userDetails ? (
            <h1 className="text-center">This profile does not exist</h1>
          ) : (
            <div className="d-flex flex-wrap d-xl-nowrap">
              <div className="profile-left-bar">
                <ProfileSummary
                  isSelfProfile={false}
                  userCountInfo={countData}
                  shortDescriptionRef={shortDescriptionRef}
                  descriptionRef={descriptionRef}
                  experienceRef={experienceRef}
                  educationRef={educationRef}
                  certificationRef={certificationRef}
                  languageRef={languageRef}
                  userDetails={userDetails}
                  otherUserData={otherUserData}
                  setOtherUserData={setOtherUserData}
                  profileId={profileId}
                  profilePicVisibility={visibilityDetails?.settings?.profilePic}
                  profile="otherProfile"
                />

                <Fragment>
                  <TotalSummary isSelfProfile={false} profile="otherProfile" />

                  {visibilityDetails?.settings &&
                    visibilityDetails?.settings?.shortDescription && (
                      <ShortDescription
                        shortDescriptionRef={shortDescriptionRef}
                        userDetails={userDetails}
                        otherUserData={otherUserData}
                        isSelfProfile={false}
                        profile="otherProfile"
                      />
                    )}

                  {visibilityDetails?.settings &&
                    visibilityDetails?.settings?.description && (
                      <Description
                        descriptionRef={descriptionRef}
                        userDetails={userDetails}
                        otherUserData={otherUserData}
                        isSelfProfile={false}
                        profile="otherProfile"
                      />
                    )}

                  {visibilityDetails?.settings &&
                    visibilityDetails?.settings?.experience && (
                      <Experience
                        experienceRef={experienceRef}
                        experienceInfo={experienceInfo}
                        otherUserData={otherUserData}
                        isSelfProfile={false}
                        profile="otherProfile"
                      />
                    )}

                  {visibilityDetails?.settings &&
                    visibilityDetails?.settings?.workExperience && (
                      <Education
                        educationRef={educationRef}
                        educationInfo={educationInfo}
                        otherUserData={otherUserData}
                        isSelfProfile={false}
                        profile="otherProfile"
                      />
                    )}

                  {visibilityDetails?.settings &&
                    visibilityDetails?.settings?.certification && (
                      <Certifications
                        certificationRef={certificationRef}
                        certificateInfo={certificateInfo}
                        otherUserData={otherUserData}
                        isSelfProfile={false}
                        profile="otherProfile"
                      />
                    )}

                  {visibilityDetails?.settings &&
                    visibilityDetails?.settings?.language && (
                      <Languages
                        languageRef={languageRef}
                        languageInfo={languageInfo}
                        otherUserData={otherUserData}
                        isSelfProfile={false}
                        profile="otherProfile"
                      />
                    )}
                </Fragment>
              </div>
            </div>
          )}
        </Container>
      </div>
    </Layout>
  );
};
export default OtherProfileId;
