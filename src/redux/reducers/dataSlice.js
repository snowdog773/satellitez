import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  hasApiFailed: false,
};

export const getData = createAsyncThunk("data/callAPI", async () => {
  const api = await axios.get("https://someAPI.com");
  const array = api.data;
  return array;
});

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state) => {
      state.isLoading = true;
      state.hasApiFailed = false;
    });
    builder.addCase(getData.fulfilled, (state, action) => {
      state.isLoading = false;

      state.data = action.payload;

      state.hasApiFailed = false;
    });
    builder.addCase(getData.rejected, (state) => {
      state.isLoading = false;
      state.hasApiFailed = true;
    });
  },
});

export default dataSlice.reducer;
