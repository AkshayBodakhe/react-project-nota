// import { Room } from "twilio-video";
// import { MessageDataModel } from "../../components/twilio/Model/messageDataModel";
// import { ActionType } from "../action-type";

import {
  SET_CONVERSATION_SID,
  SET_LOCAL_AUDIO,
  SET_LOCAL_VIDEO,
  SET_PARTICIPANT_SID,
  SET_SID_FOR_ROOM,
  SET_UNIQUE_NAME_FOR_CONVERSATION,
  SET_USER_IDENTITY,
  SET_VIDEO_CALL_ON,
} from "../features/common-actions/room-action/room-action";
import { ActionType } from "./actionType";

// import { Channel, Client } from "twilio-chat";

type RoomState = {
  // room: Room | null;
  localAudio: boolean;
  localVideo: boolean;
  isMeeting: boolean;
  conversationSid: string;
  participantSid: string;
  userIdentity: string;
  //   client: Client | null;
  uniqueName: string;
  //   createChannel: Channel | null;
  //   joinChannel: Channel | null;
  // messagesList: MessageDataModel[];
  sidForRoom: string;
};

const initialState: RoomState = {
  // room: null,
  localAudio: true,
  localVideo: true,
  isMeeting: false,
  conversationSid: "",
  participantSid: "",
  userIdentity: "",
  //   client: null,
  uniqueName: "",
  //   createChannel: null,
  //   joinChannel: null,
  // messagesList: [],
  sidForRoom: "",
};

const roomReducer = (
  state = initialState,
  action: ActionType<string | boolean>
): RoomState => {
  const { type, payload } = action;

  switch (type) {
    // case SET_ROOM:
    //   return { ...state, room: payload as Room };
    case SET_VIDEO_CALL_ON:
      return { ...state, isMeeting: payload as boolean };
    case SET_LOCAL_AUDIO:
      return { ...state, localAudio: payload as boolean };
    case SET_LOCAL_VIDEO:
      return { ...state, localVideo: payload as boolean };
    case SET_CONVERSATION_SID:
      return { ...state, conversationSid: payload as string };
    case SET_PARTICIPANT_SID:
      return { ...state, participantSid: payload as string };
    case SET_USER_IDENTITY:
      return { ...state, userIdentity: payload as string };
    // case SET_CLIENT:
    //   return { ...state, client: payload as Client };
    case SET_UNIQUE_NAME_FOR_CONVERSATION:
      return { ...state, uniqueName: payload as string };
    // case SET_CREATE_CHANNEL:
    //   return { ...state, createChannel: payload as Channel };
    // case SET_JOIN_CHANNEL:
    //   return { ...state, joinChannel: payload as Channel };
    // case ADD_MESSAGE:
    //   return { ...state, messagesList: [...state.messagesList, payload as MessageDataModel] };
    case SET_SID_FOR_ROOM:
      return { ...state, sidForRoom: payload as string };
    default:
      return state;
  }
};

export default roomReducer;
