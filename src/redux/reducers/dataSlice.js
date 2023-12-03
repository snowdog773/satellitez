import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  hasApiFailed: false,
  iss: [],
  issTrue: false,
  renderArray: [],
};

export const getData = createAsyncThunk("data/callAPI", async () => {
  const api = await axios.get(
    `http://localhost:6001/getSatellites/${satFilter}`
  );
  const array = api.data;
  return array;
});

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setIss: (state, action) => {
      state.iss = action.payload;
      state.issTrue = true;
    },
    setRenderData: (state, action) => {
      state.renderArray = action.payload;
    },
  },
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
export const { setIss, setRenderData } = dataSlice.actions;
export default dataSlice.reducer;
