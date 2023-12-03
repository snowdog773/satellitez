import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  query: { group: "Brightest / Most Visible", query: "visual" },
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
