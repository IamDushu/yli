import React, { useContext } from "react";
import {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { fetchExternalApi } from "./init";
import { generateComponentId, getAppId } from "./utils";
import ChatList from "components/messagesV2/ChatList";
import { ChatContext } from "context/ChatContext";
// import CurrentChannel from "components/messages/CurrentChannel";

const Ymeeting = ({
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
}) => {
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
          if(e.key=="chat")typeof onChatButtonClicked === "function" && onChatButtonClicked();
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

export default Ymeeting;
