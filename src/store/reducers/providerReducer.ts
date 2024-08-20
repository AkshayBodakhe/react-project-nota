import { combineReducers } from '@reduxjs/toolkit';
import { providerListReducer } from "../features/provider-actions/patient/add-patient/provider-info/providerSlice";
import { locationListReducer } from "../features/provider-actions/patient/add-patient/locationSlice";

export const providerReducer = combineReducers({
    providerListReducer,
    locationListReducer
});