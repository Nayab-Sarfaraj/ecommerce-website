import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const STATUSES = {
  LOADING: "loading",
  ERROR: "error",
  SUCCESS: "success",
  IDLE: "idle",
};

export const productSlice = createSlice({
  name: "singlProduct",
  initialState: {
    status: STATUSES.IDLE,
    data: {},
  },
  extraReducers: (bundler) => {
    bundler
      .addCase(fetchProduct.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        if (action.payload.message) {
          state.status = STATUSES.ERROR;
        } else {
          state.status = STATUSES.SUCCESS;
        }
        state.data = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const fetchProduct = createAsyncThunk("fetchProduct", async (id) => {
  const { data } = await axios.get(`/product/${id}`);
  // console.log(data)
  return data;
});

export default productSlice.reducer;
