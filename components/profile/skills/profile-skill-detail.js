import { Button } from "react-bootstrap";
import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { skillEndorse } from "store/actions/skills";
import { selectUserInfo } from "store/selectors/user";
import { skillEndorseModal, toggleModals } from "store/actions";
import { onImageError, showMessageNotification } from "utils";

/******************** 
  @purpose :Profile Skill Detail
  @Parameter : { }
  @Author : INIC
  ******************/
const ProfileSkillDetail = ({
  isLast,
  data,
  isSelfProfile,
  editPopupHandler,
  viewmode,
  index,
  otherUserData,
  skillData,
  skillAreaType,
  updateSkillData,
  filteredData,
}) => {
  const { skillArea, skillType, recommendationUserType } = data;
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const [state, setState] = useState(false);
  const router = useRouter();
  const [endorseCount, setEndorseCount] = useState(
    data && data?.endorsements.length
  );
  const [endorseMentUpdateLoading, setEndorseMentUpdateLoading] =
    useState(false);
  const skillEndorseHandler = async (userSkillId, isEndorsed) => {
    try {
      if (endorseMentUpdateLoading) {
        return;
      }
      setEndorseMentUpdateLoading(true);
      if (state) {
        setEndorseCount(endorseCount - 1);
      } else {
        setEndorseCount(endorseCount + 1);
      }
      const body = { userSkillId, isEndorsed };
      await dispatch(skillEndorse(body));
      if (typeof updateSkillData === "function") {
        await updateSkillData();
      }
      setState(isEndorsed);
    } catch (error) {
      showMessageNotification(lang("COMMON.SOMETHING_WENT_WRONG"));
    } finally {
      setEndorseMentUpdateLoading(false);
    }
  };

  useEffect(async () => {
    //skillData &&
    //  skillData[index].endorsements.length > 0 &&
    //  skillData[index].endorsements.forEach((ele) => {
    //    if (userInfo && ele.endorsedByUser.id === userInfo.id) {
    //      setState(true);
    //    }
    //  });
    data?.endorsements?.forEach((ele) => {
      if (userInfo && ele?.endorsedByUser?.id === userInfo.id) {
        setState(true);
      }
    });
  }, []);
  const moreDetailCount = filteredData ? filteredData?.length - 3 : 0;
  return (
    <Fragment>
      <div className="d-md-flex align-items-center mb-3">
        <div className="activity-info w-20">
          <div className="d-flex justify-content-between"></div>
        </div>
        <ul className="list-unstyled exp-list mb-2 mb-md-0">
          <li>
            <div className="d-md-flex align-items-center">
              <span className="skill-type-style px-2 py-1  d-inline-flex align-self-center skill-type-text mb-2 mb-md-0">
                {skillType}
              </span>

              {data?.endorsements?.length > 0 && (
                <span className="pl-2 d-block">
                  confirmed By
                  {data &&
                    data?.endorsements?.slice(0, 2)?.map((user) => (
                      <span key={user?.endorsedByUser?.id}>
                        <img
                          className="ml-1"
                          src={user?.endorsedByUser?.profilePicURL ?? ""}
                          alt="User"
                          width="32px"
                          height="32px"
                          style={{ borderRadius: "50%" }}
                          onClick={() => {
                            dispatch(skillEndorseModal(data));
                            dispatch(toggleModals({ endorsements: true }));
                          }}
                          onError={(e) => {
                            onImageError(
                              e,
                              "profile",
                              `${user?.endorsedByUser?.firstName} ${user?.endorsedByUser?.lastName}`
                            );
                          }}
                        />
                      </span>
                    ))}
                  {data?.endorsements?.length > 2 && (
                    <span className="ml-1 font-weight-bold">
                      +{data?.endorsements?.length - 2}
                    </span>
                  )}
                </span>
              )}
            </div>
          </li>
        </ul>

        <div className="d-flex ml-auto justify-content-end">
          {isSelfProfile && !viewmode && (
            <span
              className="edit-skill-text pointer"
              onClick={() => editPopupHandler(data)}
            >
              {lang("SKILLS.POPUP.EDIT_SKILLS")}
            </span>
          )}
        </div>

        <div>
          {!isSelfProfile &&
            skillData &&
            skillData.length > 0 &&
            otherUserData?.connectionData[0]?.isConnection && (
              <Button
                disabled={endorseMentUpdateLoading || state}
                variant="btn-link p-0 text-primary"
                onClick={async () => {
                  if (state) {
                    await skillEndorseHandler(data.id, false);
                  } else {
                    await skillEndorseHandler(data.id, true);
                  }
                }}
              >
                {endorseMentUpdateLoading
                  ? lang("USER_PROFILE_SUMMARY.TEXT.ENDORSING")
                  : state
                  ? lang("USER_PROFILE_SUMMARY.TEXT.ENDORSED")
                  : lang("USER_PROFILE_SUMMARY.TEXT.ENDORSE")}
              </Button>
            )}
        </div>
      </div>

      {/* dbg */}

      {moreDetailCount !== 0 && index == 2 && (
        <div className="d-md-flex align-items-center mb-3">
          <div className="activity-info w-20">
            <div className="d-flex justify-content-between"></div>
          </div>
          <ul className="list-unstyled exp-list mb-2 mb-md-0">
            <li>
              <div className="d-md-flex align-items-center">
                <span className="skill-type-style px-2 py-1  d-inline-flex align-self-center skill-type-text mb-2 mb-md-0">
                  {moreDetailCount ? `${moreDetailCount} +` : ""}{" "}
                  {`${skillAreaType} ${lang("COMMON.MORE")}`}
                </span>
                {
                  <span
                    className="ml-2 font-weight-600 font-14px-primary pointer"
                    onClick={() =>
                      router.push(
                        isSelfProfile
                          ? `/profile/skills`
                          : `/profile/skills/?otherProfileId=${otherUserData?.id}`
                      )
                    }
                  >
                    {lang("COMMON.VIEW")}
                  </span>
                }
              </div>
            </li>
          </ul>
        </div>
      )}
    </Fragment>
  );
};

export default React.memo(ProfileSkillDetail);
