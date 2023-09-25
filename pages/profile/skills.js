import React, { useEffect, useMemo, useState } from "react";
import { Layout } from "components/layout";
import { Add, GrowthModal, MyProfile } from "components/sidebar";
import WithAuth from "components/with-auth/with-auth";
import { Container } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getSkillsData } from "store/actions";
import EndorsedMe from "components/profile/skills/endorse-me";
import SkillList from "components/profile/skills/skill-list";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { DASHBOARD } from "routes/urls";

const MainModal = dynamic(() =>
  import("components/modal").then((mod) => mod.MainModal)
);
const RequestForRecommendation = dynamic(() =>
  import("components/profile/skills/request-for-recommendation")
);

const RequestSkills = dynamic(() =>
  import("components/profile/skills/request-skill").then(
    (mod) => mod.RequestSkills
  )
);

const ProfileSkills = () => {
  /**************************************  
  @Purpose : All the hooks 
  @Parameter : {}
  @Author : YLIWAY
  **************************************/
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const { requestforrecommendation, requestskills } = useSelector(
    ({ ui }) => ui.modals,
    shallowEqual
  );
  const router = useRouter();
  const otherProfileId = router.query?.otherProfileId || "";
  const { skillList } = useSelector((state) => state.skillReducer);
  const [loading, setLoading] = useState(true);
  const [loadMore, setLoadMore] = useState({
    hardSkills: false,
    softSkills: false,
    mindset: false,
  });
  /**************************************  
  @Purpose : Used for skill seperation
  @Parameter : {}
  @Author : YLIWAY
  **************************************/
  const [hardSkills, softSkills, mindset] = useMemo(() => {
    return [
      skillList.filter((item) => item.skillArea === lang("COMMON.HARD_SKILLS")),
      skillList.filter((item) => item.skillArea === lang("COMMON.SOFT_SKILLS")),
      skillList.filter((item) => item.skillArea === lang("COMMON.MINDSET")),
    ];
  }, [skillList]);

  useEffect(() => {
    if (
      !loading &&
      !hardSkills.length &&
      !softSkills.length &&
      !mindset.length
    ) {
      router.push(DASHBOARD);
    }
  }, [loading, hardSkills, softSkills, mindset]);
  /***************************
  @Purpose : Get skills data
  @Parameter : {}
  @Author : YLIWAY
  ****************************/
  useEffect(() => {
    dispatch(
      getSkillsData(otherProfileId ? { userId: otherProfileId } : {})
    ).then((res) => {
      if (res) {
        setLoading(false);
      }
    });
  }, []);

  return (
    <Layout>
      <div className="inner-wrapper create-growth-model">
        <Container>
          <div className="d-flex flex-md-nowrap flex-wrap inner-right-full-orsidebar">
            <div className="profile-left-bar d-md-block d-none">
              <MyProfile />
              <GrowthModal />
              <Add />
            </div>
            <div className="profile-right-bar">
              <SkillList
                skillName={lang("SKILLS.TEXT.HARD_SKILLS")}
                skills={hardSkills}
                loading={loading}
                loadMore={loadMore}
                setLoadMore={setLoadMore}
                type={"hardSkills"}
                otherProfileId={otherProfileId ? true : false}
              />
              <div className="pt-4">
                <SkillList
                  skillName={lang("SKILLS.TEXT.SOFT_SKILLS")}
                  skills={softSkills}
                  loading={loading}
                  loadMore={loadMore}
                  setLoadMore={setLoadMore}
                  type={"softSkills"}
                  otherProfileId={otherProfileId ? true : false}
                />
              </div>
              <div className="pt-4">
                <SkillList
                  skillName={lang("SKILLS.TEXT.MINDSET")}
                  skills={mindset}
                  loading={loading}
                  loadMore={loadMore}
                  setLoadMore={setLoadMore}
                  type={"mindset"}
                  otherProfileId={otherProfileId ? true : false}
                />
              </div>
              {!otherProfileId && (
                <EndorsedMe
                  skillList={skillList}
                  hardSkills={hardSkills}
                  softSkills={softSkills}
                  mindset={mindset}
                  otherProfileId={otherProfileId ? true : false}
                />
              )}
            </div>
          </div>
        </Container>
      </div>
      <MainModal
        show={requestforrecommendation}
        keyModal="requestforrecommendation"
        body={<RequestForRecommendation />}
        headerClassName="mb-50 block md-mb-30"
        header={
          <h2 className="h6 m-0">
            {lang("SKILLS.FORM.REQUEST_FOR_RECOMMENDATION")}
          </h2>
        }
      />
      <MainModal
        show={requestskills}
        keyModal="requestskills"
        body={<RequestSkills />}
        headerClassName="mb-50 block md-mb-30"
      />
    </Layout>
  );
};

export default WithAuth(ProfileSkills);
