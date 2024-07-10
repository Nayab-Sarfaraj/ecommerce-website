import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const STATUSES = {
  LOADING: "loading",
  ERROR: "error",
  SUCCESS: "success",
  IDLE: "idle",
};

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    status: STATUSES.IDLE,
    data: [],
  },
  extraReducers: (bundler) => {
    bundler
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        if (action.payload?.message) {
          state.status = STATUSES.ERROR;
        } else {
          state.status = STATUSES.SUCCESS;
        }
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const fetchProducts = createAsyncThunk(
  "fetchProducts",
  async ({
    keyword = "",
    currentPage = 1,
    price = [0, 25000],
    category = "",
    ratings = 0,
  }) => {
    try {
      console.log(price);
      category = category.toLowerCase();
      let link = `/product?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
      if (category) {
        link = `/product?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }
      console.log(link);
      const { data } = await axios.get(link);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export default productsSlice.reducer;
