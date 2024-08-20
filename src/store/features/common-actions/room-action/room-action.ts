export const SET_ROOM = "SET_ROOM";
export const SET_LOCAL_AUDIO = "SET_LOCAL_AUDIO";
export const SET_LOCAL_VIDEO = "SET_LOCAL_VIDEO";
export const SET_CONVERSATION_SID = "SET_CONVERSATION_SID";
export const SET_PARTICIPANT_SID = "SET_PARTICIPANT_SID";
export const SET_USER_IDENTITY = "SET_USER_IDENTITY";
export const SET_CLIENT = "SET_CLIENT";
export const SET_UNIQUE_NAME_FOR_CONVERSATION =
  "SET_UNIQUE_NAME_FOR_CONVERSATION";
export const SET_CREATE_CHANNEL = "SET_CREATE_CHANNEL";
export const SET_JOIN_CHANNEL = "SET_JOIN_CHANNEL";
export const ADD_MESSAGE = "ADD_MESSAGE";
export const SET_SID_FOR_ROOM = "SET_SID_FOR_ROOM";
export const SET_VIDEO_CALL_ON = "SET_VIDEO_CALL_ON";

// export const setRoom = (payload: Room) => {
//   return {
//     type: SET_ROOM,
//     payload
//   };
// };

export const setIsMeeting = (payload: boolean) => {
  return {
    type: SET_VIDEO_CALL_ON,
    payload,
  };
};

export const setLocalAudio = (payload: boolean) => {
  return {
    type: SET_LOCAL_AUDIO,
    payload,
  };
};

export const setLocalVideo = (payload: boolean) => {
  return {
    type: SET_LOCAL_VIDEO,
    payload,
  };
};

export const setConversationSid = (payload: string) => {
  return {
    type: SET_CONVERSATION_SID,
    payload,
  };
};

export const setParticipantSid = (payload: string) => {
  return {
    type: SET_PARTICIPANT_SID,
    payload,
  };
};

export const setUserIdentity = (payload: string) => {
  return {
    type: SET_USER_IDENTITY,
    payload,
  };
};

// export const setClient = (payload: Client) => {
//   return {
//     type: SET_CLIENT,
//     payload,
//   };
// };

export const setUniqNameForConversation = (payload: string) => {
  return {
    type: SET_UNIQUE_NAME_FOR_CONVERSATION,
    payload,
  };
};

// export const setCreateChannel = (payload: Channel) => {
//   return {
//     type: SET_CREATE_CHANNEL,
//     payload,
//   };
// };

// export const setJoinChannel = (payload: Channel) => {
//   return {
//     type: SET_JOIN_CHANNEL,
//     payload,
//   };
// };

// export const addMessage = (payload: MessageDataModel) => {
//   return {
//     type: ADD_MESSAGE,
//     payload
//   };
// };

export const setSidForRoom = (payload: string) => {
  return {
    type: SET_SID_FOR_ROOM,
    payload,
  };
};
