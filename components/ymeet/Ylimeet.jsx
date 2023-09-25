import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useContext,
} from "react";
import { Button } from "react-bootstrap";
import { fetchExternalApi } from "./init";
import { generateComponentId, getAppId } from "./utils";
import ChatList from "components/messagesV2/ChatList";
import { ChatContext } from "context/ChatContext";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { toggleModals } from "store/actions";
import ExpireNotification from "./ExpireNotification";
import { showMessageNotification } from "utils";
import CopyToClipboard from "react-copy-to-clipboard";
import { APP_URL } from "config";
import { endMeet } from "../../store/actions/yli-meet";
import { useRouter } from "next/router";
import moment from "moment";

const AddParticipants = ({ roomDetail, setDisplay }) => {
  const dispatch = useDispatch();
  const [lang] = useTranslation("language");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      showMessageNotification(
        lang("YLIMEET.INSTANT_YLIMEET.ADD_PARTICIPANTS.COPIED")
      );
      setCopied(false);
    }
  }, [copied]);

  return (
    <div>
      <div className="add-participants">
        <div className="p-3">
          <div className="d-flex justify-content-center">
            <span className="header">
              {lang("YLIMEET.INSTANT_YLIMEET.ADD_PARTICIPANTS.MEET_START")}
            </span>
            <div className="ml-auto p-0">
              <i
                class="bx bx-x close-icon cursor-pointer"
                onClick={() => setDisplay(false)}
              ></i>
            </div>
          </div>
          <div
            className="d-flex border-bottom border-geyser"
            style={{ width: "100%" }}
          ></div>
          <Button
            className="btn-addParticipents"
            onClick={() => dispatch(toggleModals({ addparticipants: true }))}
          >
            <i class="bx bx-user-plus btn-icon align-items-center pr-1"></i>
            <span className="btn-text align-items-center pt-1">
              {lang("YLIMEET.INSTANT_YLIMEET.ADD_PARTICIPANTS.ADD_PARTICIPANT")}
            </span>
          </Button>
          <div className="mt-3 text">
            {lang("YLIMEET.INSTANT_YLIMEET.ADD_PARTICIPANTS.SHARE_MEET")}
          </div>
        </div>
        <div className="ml-3 mt-2 text-primary">
          <div
            className="d-flex p-1 rounded align-items-center active-chat"
            style={{ width: "91%" }}
          >
            <CopyToClipboard
              text={`${APP_URL}/yli-meet/${roomDetail}`}
              onCopy={() => setCopied(true)}
            >
              <i class="bx bx-copy bx-flip-horizontal close-icon cursor-pointer"></i>
            </CopyToClipboard>
            <span className="ml-2 mt-1 text">{roomDetail}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Ylimeet = ({
  domain,
  roomName,
  configOverwrite,
  interfaceConfigOverwrite,
  token,
  jwt,
  invitees,
  devices,
  userInfo,
  release,
  spinner: Spinner,
  onApiReady,
  onReadyToClose,
  onChatButtonClicked,
  onJoinedToRoom,
  getIFrameRef,
  isJoined,
}) => {
  const [lang] = useTranslation("language");
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [apiLoaded, setApiLoaded] = useState(false);
  const externalApi = useRef(null);
  const apiRef = useRef(null);
  const meetingRef = useRef(null);
  const componentId = useMemo(
    () => generateComponentId("Ymeeting"),
    [generateComponentId]
  );
  const [close, setClose] = useState(true);
  const { currentChannel } = useContext(ChatContext);
  const instantYlimeetData = useSelector(
    (state) => state.yliMeet.instantMeetingDetail
  );
  const { id } = useSelector((state) => state.user.userInfo);
  const { ylimeetId } = router.query;

  const [display, setDisplay] = useState(true);
  const [meetingDuration, setMeetingDuration] = useState();

  useEffect(() => {
    if (
      instantYlimeetData &&
      instantYlimeetData.meetDate &&
      instantYlimeetData.duration
    ) {
      const time = moment(instantYlimeetData.meetDate);
      const updatedTime = time
        .clone()
        .add(instantYlimeetData.duration, "minutes");
      const currentTime = moment();
      const timeDifferenceInSeconds = updatedTime.diff(
        currentTime,
        "seconds",
        true
      );

      setMeetingDuration(Math.ceil(timeDifferenceInSeconds) * 1000);
    }
  }, [instantYlimeetData]);

  const endMeeting = useCallback(() => {
    if (apiRef.current) {
      apiRef.current.executeCommand("hangup"); // End the meeting
      const data = {
        id: ylimeetId,
        endDate: new Date(),
      };
      endMeet(data);
      router.push(`/dashboard`);
    }
  }, []);

  useEffect(() => {
    let timeoutId;
    if (meetingDuration) {
      timeoutId = setTimeout(endMeeting, meetingDuration);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [endMeeting, meetingDuration, instantYlimeetData]);

  useEffect(() => {
    fetchExternalApi(domain, release, getAppId(roomName))
      .then((api) => {
        externalApi.current = api;
        setApiLoaded(true);
      })
      .catch((e) => console.error(e.message));
  }, []);

  const loadIFrame = useCallback(
    (JitsiMeetExternalAPI) => {
      roomName = roomName + "_token_" + token;
      let option = {
        roomName,
        configOverwrite,
        interfaceConfigOverwrite,
        token,
        jwt,
        invitees,
        devices,
        userInfo,
        release,
        parentNode: meetingRef.current,
      };
      apiRef.current = new JitsiMeetExternalAPI(domain, option);

      setLoading(false);
      if (apiRef.current) {
        typeof onApiReady === "function" && onApiReady(apiRef.current);
        apiRef.current.on("readyToClose", () => {
          typeof onReadyToClose === "function" && onReadyToClose();
        });
        apiRef.current.on("toolbarButtonClicked", (e) => {
          if (e.key == "chat")
            typeof onChatButtonClicked === "function" && onChatButtonClicked();
        });
        apiRef.current.on("videoConferenceJoined", (e) => {
          typeof onJoinedToRoom === "function" && onJoinedToRoom();
        });
        if (meetingRef.current && typeof getIFrameRef === "function") {
          getIFrameRef(meetingRef.current);
        }
      }
    },
    [
      apiRef,
      meetingRef,
      onApiReady,
      onReadyToClose,
      onChatButtonClicked,
      onJoinedToRoom,
      getIFrameRef,
      domain,
      roomName,
      configOverwrite,
      interfaceConfigOverwrite,
      token,
      jwt,
      invitees,
      devices,
      userInfo,
    ]
  );
  useEffect(() => {
    if (currentChannel) {
      setClose(false);
    }
  }, [currentChannel]);
  useEffect(() => {
    if (apiLoaded && !apiRef.current) {
      if (externalApi.current) {
        loadIFrame(externalApi.current);
      }
    }
  }, [apiLoaded, loadIFrame]);

  const renderLoadingSpinner = useCallback(() => {
    if (!Spinner) {
      return null;
    }
    if (!loading || apiRef.current) {
      return null;
    }

    return <Spinner />;
  }, [Spinner, apiRef.current]);

  return (
    <>
      {renderLoadingSpinner()}
      <div className="d-flex ymeet-first-video">
        <div
          id={componentId}
          key={componentId}
          ref={meetingRef}
          className="ymeet-video"
        >
          <div
            style={{
              position: "absolute",
              marginTop: "2%",
              marginLeft: "10%",
              width: "80%",
              height: "30%",
            }}
          >
            <ExpireNotification isJoined={isJoined} />
          </div>

          {isJoined && (
            <>
              <Button
                variant="btn btn-primary ml-2"
                style={{
                  position: "absolute",
                  left: 0,
                  top: "1%",
                }}
                onClick={() => {
                  setDisplay(!display);
                }}
              >
                <span className="btn-dismiss-txt">
                  {lang("YLIMEET.INSTANT_YLIMEET.INFO")}
                </span>
              </Button>
              {instantYlimeetData &&
                instantYlimeetData.creatorUserId === id && (
                  <Button
                    variant="btn btn-upgrade_plan mr-2"
                    onClick={() => {
                      dispatch(toggleModals({ upgradeplans: true }));
                    }}
                    style={{
                      position: "absolute",
                      top: "1%",
                      right: "0%",
                      maxWidth: "200px",
                      padding: "5px",
                    }}
                  >
                    <span className="btn-dismiss-txt">
                      {lang("YLIMEET.INSTANT_YLIMEET.UPGRADE_PLAN")}
                    </span>
                  </Button>
                )}
            </>
          )}

          {isJoined && display && (
            <AddParticipants roomDetail={roomName} setDisplay={setDisplay} />
          )}
        </div>
        {/*   <ChatList isFloatMessage="virtual-event" /> */}
        <>
          <ChatList isFloatMessage={true} event="virtual-event" />
          {/* !close && currentChannel && (
            <CurrentChannel
              event="virtual-event"
              currentChannel={currentChannel}
              close={close}
              setClose={setClose}
            />
          ) */}
        </>
      </div>
    </>
  );
};

export default Ylimeet;
