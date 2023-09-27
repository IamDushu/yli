import Link from "next/link";
import { useRouter } from "next/router";
import groups from "pages/groups/groups";
import React from "react";
import { Col, Card } from "react-bootstrap";
import { onImageError } from "utils";
import moment from "moment";
import { PEER_PRODUCER_URL } from "config";

const FollowedGroupDetail = ({ members = 0, group, isSelfProfile, isLast }) => {
  const router = useRouter();
  return (
    <Card className="cursor-pointer list-group">
      <div className="d-md-flex w-100">
        <div className=" overflow-hidden flex-shrink-0 mr-3 mb-3 mb-md-0">
          <picture
            className="user-profile-pic mr-3 w-h-120-68 d-flex align-items-center border-radius-8"
            onContextMenu={(e) => e.preventDefault()}
          >
            <source srcSet={group?.groups?.imageURL} type="image/png" />
            <img
              style={{ borderRadius: "8px" }}
              src={group?.groups?.imageURL}
              alt="User"
              className="w-100 object-fill"
              height="68"
              onClick={() =>
                router.push(
                  `/groups/${group?.groups?.name}/${group?.groups?.id}`
                )
              }
              onError={(e) => {
                onImageError(e);
              }}
            />
          </picture>
        </div>

        <div className="activity-info">
          <h4
            className="hover-selfttext-primary text-body-16 mb-1"
            onClick={() =>
              router.push(`/groups/${group?.groups?.name}/${group?.groups?.id}`)
            }
          >
            {group?.groups?.name}
          </h4>

          <p className="font-12 font-weight-normal text-gray mb-1">
            {group?.groups?.description}{" "}
          </p>

          {isSelfProfile && (
            <>
              <p className="text-body-12 m-0">
                <span>
                  <img
                    className="mr-1"
                    src={
                      group?.groups?.groupType === "private"
                        ? "/assets/images/private-icon.svg"
                        : "/assets/images/public-icon.svg"
                    }
                    alt="public-icon"
                  />
                  {group?.groups?.groupType === "private"
                    ? " Private "
                    : " Public "}
                  Group
                </span>
                <span className="mr-1">|</span>
                <span className="text-ellipsis groups-members-text">{`${group.members} members`}</span>
              </p>
              <p className="text-body-12 m-0 mt-1">
                <span>
                  Created on {moment(group?.createdAt).format("DD MMM YYYY")}{" "}
                </span>
                <span className="mr-1">|</span>
                Created By
                <span className="ml-1 text-primary pointer">
                  {group?.createdBy?.type === "Learning Institute" ? (
                    <a
                      href={`${PEER_PRODUCER_URL}profile/institute-profile?instituteId=${group?.createdBy?.instituteId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary"
                    >
                      {group?.createdBy?.name}
                    </a>
                  ) : (
                    <Link href={`/profile/${group?.createdBy?.profileId}`}>
                      <a className="text-primary">{group?.createdBy?.name}</a>
                    </Link>
                  )}
                </span>
              </p>
            </>
          )}
        </div>
      </div>
      {/* {!isLast && <hr className="my-1" />} */}
    </Card>
  );
};

export default React.memo(FollowedGroupDetail);
