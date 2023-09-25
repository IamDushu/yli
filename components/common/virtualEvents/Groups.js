import React, { useEffect, useState } from "react";
import { Button, Card, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "@routes";
import { useTranslation } from "react-i18next";
import { groupJoinRequest } from "store/actions";

const Groups = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const { roomDetail } = useSelector((state) => state?.room);
  const [groupStatus, setGroupStatus] = useState(lang("GROUP.COMMON.JOIN"));

  useEffect(() => {
    if (
      roomDetail?.joiningGroupDetails?.groupType === "private" &&
      roomDetail?.joiningGroupDetails?.requestSent === 1
    ) {
      setGroupStatus(lang("GROUP.COMMON.GROUP_REQUESTED"));
    } else if (
      roomDetail?.joiningGroupDetails?.groupType === "private" &&
      roomDetail?.joiningGroupDetails?.requestSent !== 1
    ) {
      setGroupStatus(lang("GROUP.COMMON.REQUEST_TO_JOIN"));
    } else if (
      roomDetail?.joiningGroupDetails?.isGroupMember &&
      roomDetail?.joiningGroupDetails?.isGroupMember?.status
    ) {
      setGroupStatus("");
    } else {
      setGroupStatus(lang("GROUP.COMMON.JOIN"));
    }
  }, [roomDetail?.joiningGroupDetails]);

  return (
    <div className="border-bottom-blueberry-whip desc mt-4 pb-lg-4 pb-2">
      <h3 className="h6 mb-3">{lang("ROOMS.RELATED_GROUPS")}</h3>
      <div className="d-flex row px-2">
        <Col md={4} xl={3} className="mb-3 p-0 mx-2">
          <Card className="position-relative h-100  related-groups">
            <Card.Img
              variant="top"
              src={roomDetail?.joiningGroupDetails?.imageURL}
            />

            <Card.Body>
              <Card.Title className="mb-1">
                <Link
                  href={`/groups${
                    roomDetail?.joiningGroupDetails?.name &&
                    roomDetail?.joiningGroupLink
                      ? `/${roomDetail?.joiningGroupDetails?.name}/${roomDetail?.joiningGroupLink}`
                      : ""
                  }`}
                >
                  <h5 className="text-body-14 mb-0 text-ellipsis pointer">
                    {roomDetail?.joiningGroupDetails?.name}
                  </h5>
                </Link>
              </Card.Title>
              <div className="d-block">
                <div className="group-type">
                  <img
                    className="pr-1"
                    src="../../assets/images/private-icon-svg.svg"
                  />
                  {roomDetail?.joiningGroupDetails?.groupType &&
                    `${roomDetail?.joiningGroupDetails?.groupType} group`}
                </div>
                <div className="group-members">
                  {roomDetail?.joiningGroupDetails?.membersCount &&
                    `${roomDetail?.joiningGroupDetails?.membersCount} members`}
                </div>

                <div className="mt-3">
                  {groupStatus !== "" && (
                    <Button
                      variant="info"
                      size="sm"
                      className="float-left px-4"
                      style={{ borderRadius: "8px" }}
                      onClick={async () => {
                        await dispatch(
                          groupJoinRequest({
                            groupId: roomDetail?.joiningGroupDetails?.id,
                          })
                        );
                        if (
                          roomDetail?.joiningGroupDetails?.groupType ===
                          "private"
                        ) {
                          setGroupStatus(lang("GROUP.COMMON.GROUP_REQUESTED"));
                        } else {
                          setGroupStatus("");
                        }
                      }}
                    >
                      {groupStatus}
                    </Button>
                  )}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </div>
    </div>
  );
};

export default Groups;
