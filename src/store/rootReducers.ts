import { combineReducers } from "@reduxjs/toolkit";
import { commonReducer } from "./reducers/commonReducers";
import { providerReducer } from "./reducers/providerReducer";
import { useSelector } from "react-redux";
import roomReducer from "./reducers/roomReducer";
// import { patientReducer } from './reducers/patientReducer';

export const rootReducer = combineReducers({
  commonReducer: commonReducer,
  providerReducer: providerReducer,
  roomReducer: roomReducer,
  // patientReducer: patientReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export const useReduxSelector = useSelector<RootState>;
