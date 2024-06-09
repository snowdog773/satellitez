import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  eventData: [],
  singleSearch: [],
  eventFilter: "visual",
  hours: 6,
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
    setHours: (state, action) => {
      state.hours = action.payload;
    },
  },
});
export const { setEventData, setSingleSearch, setEventFilter, setHours } =
  eventDataSlice.actions;
export default eventDataSlice.reducer;
