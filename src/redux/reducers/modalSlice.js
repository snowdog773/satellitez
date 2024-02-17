import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalHeight: 0,
};

export const modalSlice = createSlice({
  name: "modalHeight",
  initialState,
  reducers: {
    setModalHeight: (state, action) => {
      state.modalHeight = action.payload;
    },
  },
});
export const { setModalHeight } = modalSlice.actions;
export default modalSlice.reducer;
