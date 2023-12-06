import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],

  dataTrue: false,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
      state.dataTrue = true;
    },
    setRenderData: (state, action) => {
      state.renderArray = action.payload;
    },
  },
});
export const { setData, setRenderData } = dataSlice.actions;
export default dataSlice.reducer;
