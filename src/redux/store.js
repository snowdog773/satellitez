import { configureStore } from "@reduxjs/toolkit";

import dataReducer from "./reducers/dataSlice";
import filterReducer from "./reducers/filterSlice";
import timerReducer from "./reducers/timerSlice";

export const store = configureStore({
  reducer: {
    data: dataReducer,
    filter: filterReducer,
    timer: timerReducer,
  },
});
