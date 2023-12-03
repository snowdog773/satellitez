import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  timePassed: 0,
  multiplier: 1,
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setTimePassed: (state, action) => {
      state.timePassed = action.payload;
    },
    setTimeMultiplier: (state, action) => {
      state.multiplier = action.payload;
    },
  },
});
export const { setTimePassed, setTimeMultiplier } = timerSlice.actions;
export default timerSlice.reducer;
