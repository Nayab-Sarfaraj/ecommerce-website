import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const STATUSES = {
  LOADING: "loading",
  ERROR: "error",
  SUCCESS: "success",
  IDLE: "idle",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    status: STATUSES.IDLE,
    cart: {
      cartItems: localStorage.getItem("cartItem")
        ? JSON.parse(localStorage.getItem("cartItem"))
        : [],
    },
  },
  reducers: {
    removeFromCart: (state, action) => {
      state.status = STATUSES.LOADING;

      const newState = state.cart.cartItems.filter(
        (item) => item._id !== action.payload
      );
      console.log(newState);
      state.cart.cartItems = newState;

      // localStorage.setItem("cartItem", JSON.stringify(newState));
      state.status = STATUSES.SUCCESS;
    },
  },
  extraReducers: (bundler) => {
    bundler
      .addCase(addToCart.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = STATUSES.LOADING;
        const item = action.payload;
        console.log("the item add is ");
        console.log(item);
        const isExist = state.cart.cartItems.findIndex(
          (product) => product._id === item._id
        );
        console.log(isExist);
        if (isExist >= 0)
          state.cart.cartItems[isExist].quantity = item.quantity;
        else state.cart.cartItems.push(item);
        // localStorage.setItem("cartItem", JSON.stringify(state.cart.cartItems));

        state.status = STATUSES.SUCCESS;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});
export const addToCart = createAsyncThunk(
  "addToCart",
  async ({ id, quantity }) => {
    console.log(quantity);
    const { data } = await axios.get(`/product/${id}`);
    return { ...data, quantity };
  }
);
// export const removeFromCart = createAsyncThunk(
//   "removeFromCart",
//   async (id) => {

//   }
// );
export const { removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
