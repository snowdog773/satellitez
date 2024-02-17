const random = Math.round(Math.random());
const randArray = [
  { group: "Brightest / Most Visible", query: "visual" }, //render a random choice of data first time
  { group: "OneWeb", query: "oneweb" },
];

import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  query: randArray[random],
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.query = action.payload;
    },
  },
});
export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
