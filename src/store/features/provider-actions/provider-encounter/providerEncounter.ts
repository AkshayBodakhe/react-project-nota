import { createSlice } from "@reduxjs/toolkit";

export const encounterDataSlice = createSlice({
  name: "encounterDetails",
  initialState: {
    encounterDetails: {},
  },
  reducers: {
    setEncounterData: (state, action) => {
      state.encounterDetails = action.payload;
    },
  },
});

export const { setEncounterData } = encounterDataSlice.actions;
export const encounterReducer = encounterDataSlice.reducer;
