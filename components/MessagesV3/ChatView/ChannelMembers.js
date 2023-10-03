import React, { useState } from "react";
import { useYchat } from "hooks/useYchat";
import ProfileImage from "../ProfileImage";
import { useRouter } from "next/router";
import { toggleModals } from "store/actions";
import { useDispatch } from "react-redux";
import { Icon } from "components/icons";
import ModalBody from "components/yli-modal/modalBody";

const Users = ({ userId }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { getUserByID, getUserFullName } = useYchat();
  const [user, setUser] = useState(null);

  getUserByID(userId).then((userDetail) => setUser(userDetail));
  const fullName = getUserFullName(user);

  return (
    <div className="d-flex w-100 align-items-center">
      <ProfileImage
        name={fullName}
        src={
          user?.type === "user"
            ? user?.profilePicURL
            : user?.type === "Learning Institute"
            ? user?.instituteDetails?.logo
            : user?.companyDetail?.logo
        }
      />
      <h5
        className="cursor-pointer font-weight-bold mb-0 font-16 ml-1 flex-grow-1"
        onClick={() => {
          user?.type === "Company"
            ? router.push(
                `/profile/company-profile?companyId=${
                  user?.companyDetail?.id
                }&name=${user?.companyDetail?.firstName || ""}+${
                  user?.companyDetail?.lastName || ""
                }`
              )
            : user?.type === "Learning Institute"
            ? router.push(
                `/profile/institute-profile?instituteId=${
                  user?.instituteDetails?.id
                }&name=${user?.instituteDetails?.firstName || ""}+${
                  user?.instituteDetails?.lastName || ""
                }`
              )
            : router.push(`/profile/${user?.profileId}`);
          dispatch(toggleModals({ channelmembers: false }));
        }}
      >
        {fullName}
      </h5>
      <div>
        <Icon iconName="deleteIcon" />
      </div>
    </div>
  );
};

const ChannelMembers = ({ channelMemeberList }) => {
  return (
    <ModalBody>
      <ul className="list-unstyled mb-0">
        {channelMemeberList &&
          channelMemeberList.map((data, i) => (
            <li
              key={data?.user_id}
              className="py-2 border-bottom border-geyser"
            >
              <Users userId={data?.user_id} />
            </li>
          ))}
      </ul>
    </ModalBody>
  );
};

export default ChannelMembers;
