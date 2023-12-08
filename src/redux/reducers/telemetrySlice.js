import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  telemetry: {},
};

export const telemetrySlice = createSlice({
  name: "telemetry",
  initialState,
  reducers: {
    setTelemetry: (state, action) => {
      state.telemetry = action.payload;
    },
  },
});
export const { setTelemetry } = telemetrySlice.actions;
export default telemetrySlice.reducer;
