import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getSkillsData } from "store/actions/skills";
import WithPopup from "../../with-popup/with-popup";
import ProfileSkillForm from "./profile-skill-form";
import FilteredSkills from "./FilteredSkills";
const ProfileSectionNotFound = dynamic(() =>
  import("components/profile-section-not-found")
);
/******************** 
  @purpose :Skills Listing
  @Parameter : { }
  @Author : INIC
  ******************/
const Skills = ({
  openPopupHandler,
  editPopupHandler,
  renderPopup,
  popupInfo,
  skillsRef,
  isSelfProfile,
  viewmode,
  otherUserData,
  updateOtherUserData,
}) => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const [viewAll, setViewAll] = useState(false);
  const editPopUpHandler = useCallback(editPopupHandler, []);
  const renderProfileSkillForm = (props) => (
    <ProfileSkillForm {...props} isSelfProfile={isSelfProfile} />
  );
  const { skillList } = useSelector((state) => state.skillReducer);
  const skillData = isSelfProfile ? skillList : otherUserData?.userSkillDetails;

  const HardSkillsFilteredData = skillData?.filter(
    (item) => item.skillArea === "Hard Skills"
  );

  const SoftSkillsFilteredData = skillData?.filter(
    (item) => item.skillArea === "Soft Skills"
  );
  const MindsetFilteredData = skillData?.filter(
    (item) => item.skillArea === "Mindset"
  );

  let numberOfSkills = viewAll ? skillData?.length : 3;
  /******************** 
  @purpose :Skills Listing
  @Parameter : { }
  @Author : INIC
  ******************/
  useEffect(() => {
    if (isSelfProfile) dispatch(getSkillsData());
  }, []);

  async function updateSkillData() {
    if (isSelfProfile) {
      await dispatch(getSkillsData());
    } else {
      typeof updateOtherUserData === "function" && updateOtherUserData?.();
    }
  }

  return (
    <Fragment>
      <Card className="mb-3">
        <Card.Body className="p-3">
          <div
            className={`d-flex align-items-center justify-content-between ${
              skillData && skillData.length > 0 ? "pb-3" : "pb-3"
            }`}
          >
            <h6 className="mb-sm-0 mb-0">{lang("SKILLS.TEXT.SKILLS")}</h6>
            {isSelfProfile && !viewmode && (
              <div
                variant="outline-info py-12 px-4 d-flex align-items-center border-0"
                onClick={openPopupHandler}
                ref={skillsRef}
              >
                {/* <em className="icon icon-plus-primary font-14 pr-2"></em> */}
                <span className="material-icons font-24 text-secondary  pointer">
                  add
                </span>
                {/* {lang("COMMON.ADD_MORE")} */}
              </div>
            )}
          </div>
          {skillData && skillData.length > 0 ? (
            <>
              {HardSkillsFilteredData && HardSkillsFilteredData?.length > 0 && (
                <FilteredSkills
                  filteredData={HardSkillsFilteredData}
                  isSelfProfile={isSelfProfile}
                  editPopupHandler={editPopUpHandler}
                  viewmode={viewmode}
                  otherUserData={otherUserData}
                  skillData={skillData}
                  skillAreaType={lang("SKILLS.TEXT.HARD_SKILLS")}
                  updateSkillData={updateSkillData}
                />
              )}

              {SoftSkillsFilteredData && SoftSkillsFilteredData?.length > 0 && (
                <>
                  <hr className="my-3" />
                  <FilteredSkills
                    filteredData={SoftSkillsFilteredData}
                    isSelfProfile={isSelfProfile}
                    editPopupHandler={editPopUpHandler}
                    viewmode={viewmode}
                    otherUserData={otherUserData}
                    skillData={skillData}
                    skillAreaType={lang("SKILLS.TEXT.SOFT_SKILLS")}
                    updateSkillData={updateSkillData}
                  />
                </>
              )}

              {MindsetFilteredData && MindsetFilteredData?.length > 0 && (
                <>
                  <hr className="my-3" />
                  <FilteredSkills
                    filteredData={MindsetFilteredData}
                    isSelfProfile={isSelfProfile}
                    editPopupHandler={editPopUpHandler}
                    viewmode={viewmode}
                    otherUserData={otherUserData}
                    skillData={skillData}
                    skillAreaType={lang("SKILLS.TEXT.MINDSET")}
                    updateSkillData={updateSkillData}
                  />
                </>
              )}
            </>
          ) : (
            <ProfileSectionNotFound
              sorryTextMessage={
                isSelfProfile
                  ? lang("SKILLS.TEXT.NO_SKILLS")
                  : lang("SKILLS.TEXT.NO_SKILLS_OTHER_PROFILE")
              }
            />
          )}
        </Card.Body>
        {renderPopup(
          popupInfo.isEdit
            ? lang("SKILLS.POPUP.EDIT_SKILLS")
            : lang("SKILLS.POPUP.ADD_SKILLS"),
          renderProfileSkillForm
        )}
      </Card>
    </Fragment>
  );
};
export default WithPopup(Skills);
