import React, { useState } from "react";
import { Card, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "@routes";
import router from "next/router";
import dynamic from "next/dynamic";
import WithPopup from "../../with-popup/with-popup";
import { selectJoinedGroupData } from "../../../store/selectors/group";
import FollowedGroupsDetail from "./followed-groups-detail";
const ProfileSectionNotFound =  dynamic(()=>import("components/profile-section-not-found"))

const FollowedGroups = ({
  isSelfProfile,
  userJoinedGroupInfo,
  viewmode,
  otherUserData,
}) => {
  const [lang] = useTranslation("language");
  const [numberOfGroups, setNumberOfGroups] = useState(3);

  //Adding this because of change in API in groups listing in my profile
  const data = isSelfProfile
    ? userJoinedGroupInfo
    : otherUserData?.followedGroup;

  return (
    <Card className="mb-3">
      <Card.Body className="p-3">
        <div className="d-flex flex-wrap flex-sm-nowrap justify-content-between pb-3">
          <h6 className="mb-sm-0 mb-0">
            {lang("PROFILE_GROUPS.FOLLOWED_GROUPS")}
          </h6>
          {isSelfProfile && !viewmode && (
            <div
              variant="outline-info py-12 px-4 d-flex align-items-center border-0"
              onClick={() => router.push("/groups/create-groups")}
            >
              {/* <em className="icon icon-plus-primary font-14 pr-2"></em> */}
              <span className="material-icons font-24 text-secondary  pointer">
                add
              </span>
            </div>
          )}
        </div>
        {data && data?.length > 0 ? (
          <div>
            {data?.slice(0, numberOfGroups)?.map((item, idx) => (
              <FollowedGroupsDetail
                isSelfProfile={isSelfProfile}
                isLast={idx + 1 === data?.length}
                key={idx}
                group={item}
              />
            ))}
          </div>
        ) : (
          <ProfileSectionNotFound sorryTextMessage={(isSelfProfile)?lang("PROFILE_GROUPS.NOT_JOINED_GROUPS"):lang("PROFILE_GROUPS.NOT_JOINED_GROUPS_OTHER_PROFILE")}/>
        )}
      </Card.Body>
      {!isSelfProfile ? (
        <>
          {!isSelfProfile && data && data?.length - 1 > numberOfGroups && (
            <a
              className="text-body-14  py-12 text-center"
              style={{ color: "#0f6bbf" }}
              onClick={() => setNumberOfGroups(data.length - 1)}
            >
              {lang("COMMON.VIEW_ALL")}
            </a>
          )}
        </>
      ) : (
        <>
          {data && data?.length > numberOfGroups && (
            <Link route="/groups?type=joined">
              <a className="text-body-14 py-2 text-center border-geyser border-top load-more-color">
                {lang("COMMON.VIEW_ALL")}
              </a>
            </Link>
          )}
        </>
      )}
    </Card>
  );
};
export default WithPopup(FollowedGroups);
