import React from "react";
import ProfileSkillDetail from "./profile-skill-detail";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const FilteredSkills = ({
  filteredData,
  isSelfProfile,
  editPopupHandler,
  viewmode,
  otherUserData,
  skillData,
  skillAreaType,
  updateSkillData,
}) => {
  const router = useRouter();
  const [lang] = useTranslation("language");
  return (
    <div>
      <h4 className="mb-2 mb-md-0 text-body-16">{skillAreaType}</h4>
      {filteredData?.slice(0, 3)?.map((item, idx) => (
        <ProfileSkillDetail
          key={item.id}
          isLast={idx + 1 === skillData.length}
          data={item}
          isSelfProfile={isSelfProfile}
          editPopupHandler={editPopupHandler}
          viewmode={viewmode}
          otherUserData={otherUserData}
          skillData={skillData}
          index={idx}
          updateSkillData={updateSkillData}
          filteredData={filteredData}
          skillAreaType={skillAreaType}
        />
      ))}
    </div>
  );
};

export default FilteredSkills;
