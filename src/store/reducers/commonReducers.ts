import { loginReducer } from "./../features/common-actions/login/tokenSlice";
import { userDetailReducer } from "./../features/common-actions/user-detail/userDetailSlice";

import { combineReducers } from "@reduxjs/toolkit";
import { alertReducer } from "../features/common-actions/snackbar/alertSlice";
import { addEditReducer } from "../features/common-actions/forms/formSlice";
import { encounterReducer } from "../features/provider-actions/provider-encounter/providerEncounter";

export const commonReducer = combineReducers({
  alertReducer,
  addEditReducer,
  loginReducer,
  userDetail: userDetailReducer,
  encounterReducer,
});
