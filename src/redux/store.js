import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./reducers/modalSlice";
import dataReducer from "./reducers/dataSlice";
import filterReducer from "./reducers/filterSlice";
import timerReducer from "./reducers/timerSlice";
import telemetryReducer from "./reducers/telemetrySlice";
import eventDataReducer from "./reducers/eventsSlice";

export const store = configureStore({
  reducer: {
    data: dataReducer,
    filter: filterReducer,
    timer: timerReducer,
    telemetry: telemetryReducer,
    modalHeight: modalReducer,
    eventData: eventDataReducer,
  },
});
