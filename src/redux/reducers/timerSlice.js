import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  timePassed: 0,
  multiplier: 1,
  globeRotationSpeed: 0.5,
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
    setGlobeRotationSpeed: (state, action) => {
      state.globeRotationSpeed = action.payload;
    },
  },
});
export const { setTimePassed, setTimeMultiplier, setGlobeRotationSpeed } =
  timerSlice.actions;
export default timerSlice.reducer;
