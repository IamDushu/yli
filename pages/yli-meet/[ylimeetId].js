import React, { useState, useEffect } from "react";
import { Layout } from "@components/layout";
import { Card } from "react-bootstrap";
import { useRouter } from "next/router";
import WithAuth from "components/with-auth/with-auth";
import { getCookie, getLocalStorage } from "utils";
import Ylimeet from "components/ymeet/Ylimeet";
import { YLIMEET_API } from "config";
import { useDispatch, useSelector } from "react-redux";
import { toggleModals } from "store/actions";
import {
  addMemberInYliMeetGroup,
  endMeet,
  findGroupOfParticipents,
  getMeetDetail,
  joinInstantMeeting,
} from "store/actions/yli-meet";
import { useYchat } from "hooks/useYchat";
import { useTranslation } from "react-i18next";

const RoomDetail = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [lang] = useTranslation("language");
  const { ylimeetId } = router.query;
  const { userInfo } = useSelector((state) => state.user);
  const instantYlimeetData = useSelector(
    (state) => state.yliMeet.instantMeetingDetail
  );
  const [isJoined, setIsJoined] = useState(false);
  const [chatButtonClicked, setChatButtonClicked] = useState(false);
  let mmLogin = getLocalStorage("mmLogin");
  if (mmLogin && typeof mmLogin === "string") {
    mmLogin = JSON.parse(mmLogin);
  }
  const { currentChannelHandler } = useYchat();
  /****************** YliMeet ********************/
  let token = getCookie("token");

  useEffect(() => {
    const data = { id: ylimeetId };
    dispatch(getMeetDetail(data, router));
  }, []);

  const joinMeeting = () => {
    const data = {
      meetDate: new Date(),
      meetId: ylimeetId,
    };
    dispatch(joinInstantMeeting(lang, data, router))
      .then(() => {
        setIsJoined(true);
      })
      .catch((error) => {
        console.log(error);
      });
    if (
      instantYlimeetData &&
      instantYlimeetData.meetingStatus !== "Done" &&
      instantYlimeetData.groupId &&
      mmLogin &&
      mmLogin.mmId
    ) {
      const groupData = {
        meetId: instantYlimeetData.id,
        groupId: instantYlimeetData.groupId,
        userMmId: mmLogin.mmId,
      };
      addMemberInYliMeetGroup(groupData);
    }
  };

  useEffect(() => {
    // jitsi meet not detecting changes for instantYlimeetData on onChatButtonClicked method so, implemented chatButtonClicked state that change on chat button clicked
    if (chatButtonClicked) {
      setChatButtonClicked(false);
      onChatButtonClicked();
    }
  }, [chatButtonClicked]);

  const onChatButtonClicked = async (x) => {
    try {
      if (!instantYlimeetData.groupId) {
        let data = { id: ylimeetId };
        await dispatch(findGroupOfParticipents(data)).then((response) => {
          if (response?.data?.groupId === null || response?.data?.groupId === undefined) {
            dispatch(toggleModals({ createChannel: true, isYliMeet: true }));
          }
          currentChannelHandler({ id: response.data.groupId });
        });
      } else {
        currentChannelHandler({ id: instantYlimeetData.groupId });
      }
    } catch (error) {
      console.error("Error occurred during the chat button click:", error);
    }
  };
  return (
    <>
      <Layout>
        <div
          className="inner-wrapper profile-wrapper my-learning-virtual-event-detail pt-0"
          style={{ paddingBottom: "0" }}
        >
          <Card>
            <Card.Body className="p-0">
              <div className="courses-banner-wrap w-100">
                {instantYlimeetData && (
                  <Ylimeet
                    domain={YLIMEET_API}
                    roomName={ylimeetId}
                    token={token}
                    getIFrameRef={(node) => {
                      node.style.height = "calc(100vh - 70px)";
                    }}
                    configOverwrite={{
                      startWithAudioMuted: true,
                      hiddenPremeetingButtons: ["microphone"],
                    }}
                    onApiReady={(externalApi) => {
                      console.log("onApiReady  externalApi => ", externalApi);
                    }}
                    onReadyToClose={async (e) => {
                      if (
                        instantYlimeetData &&
                        instantYlimeetData.creatorUserId === userInfo.id
                      ) {
                        const data = {
                          id: ylimeetId,
                          endDate: new Date(),
                        };
                        endMeet(data).then(() => router.push(`/dashboard`));
                        console.log("onReadyToClose => ", e);
                      } else {
                        router.push(`/dashboard`);
                      }
                    }}
                    onChatButtonClicked={() => setChatButtonClicked(true)}
                    onJoinedToRoom={() => {
                      joinMeeting();
                      console.log("onJoinedToRoom");
                    }}
                    userInfo={userInfo}
                    isJoined={isJoined}
                  />
                )}
              </div>
            </Card.Body>
          </Card>
        </div>
      </Layout>
    </>
  );
};

export default WithAuth(RoomDetail);
