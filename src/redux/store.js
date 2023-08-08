import { configureStore } from "@reduxjs/toolkit";

import dataReducer from "./reducers/dataSlice";

export const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});
