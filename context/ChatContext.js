import React, { createContext, useState } from "react";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const [currentChannel, setCurrentChannel] = useState();
  const [activeThread, setActiveThreadChannel] = useState();
  const [userDetails, setUserDetails] = useState();
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const [channels, setChannels] = useState([]);
  const [userProfiles, setUserProfiles] = useState([]);
  const [isChatDetailsLoading, setIsChatDetailsLoading] = useState(false);

  /************************************** 
  @purpose : Set current thread
  @Parameter : {}
  *************************************/
  const activeThreadHandler = (thread) => {
    setActiveThreadChannel(thread);
  };

  const clearChatContext = () => {
    setCurrentChannel(null);
    setActiveThreadChannel(null);
    setUserDetails(null);
    setUnreadMessageCount(0);
    setChannels([]);
    setUserProfiles([]);
  };

  const handleUnreadMessageCount = (count) => {
    setUnreadMessageCount(count);
  };

  const handleIsChatDetailsLoading = (val) => {
    setIsChatDetailsLoading(val);
  };

  const updateUserProfiles = (profiles) => {
    setUserProfiles((prevState) => [...prevState, ...profiles]);
  };

  const getUserByID = (id) => {
    return userProfiles.find((user) => user.id === id)
  };

  const providerValue = React.useMemo(() => ({
    currentChannel, setCurrentChannel,
    activeThread, activeThreadHandler,
    userDetails, setUserDetails,
    channels, setChannels,
    userProfiles, updateUserProfiles,
    unreadMessageCount, handleUnreadMessageCount,
    getUserByID,
    clearChatContext,
    isChatDetailsLoading, handleIsChatDetailsLoading,
  }), [currentChannel, activeThread, userDetails, channels, userProfiles, unreadMessageCount, isChatDetailsLoading]);

  /************************************** 
  @purpose : Context Provider 
  @Parameter : {}
  *************************************/
  return (
    <ChatContext.Provider value={providerValue}>
      {children}
    </ChatContext.Provider>
  );
};
