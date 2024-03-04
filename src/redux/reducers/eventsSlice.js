import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  eventData: [],
  singleSearch: [],
  eventFilter: "visual",
  isLastSearchSingle: false,
};

export const eventDataSlice = createSlice({
  name: "eventData",
  initialState,
  reducers: {
    setEventData: (state, action) => {
      state.eventData = action.payload;
    },
    setSingleSearch: (state, action) => {
      state.singleSearch = action.payload;
    },
    setEventFilter: (state, action) => {
      state.eventFilter = action.payload;
    },
    setIsLastSearchSingle: (state, action) => {
      state.isLastSearchSingle = action.payload;
    },
  },
});
export const {
  setEventData,
  setSingleSearch,
  setEventFilter,
  setIsLastSearchSingle,
} = eventDataSlice.actions;
export default eventDataSlice.reducer;
