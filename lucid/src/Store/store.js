import { configureStore, Tuple } from "@reduxjs/toolkit";
import productsReducer from "./Slice/productSlice";
import singleProductReducer from "./Slice/singleProduct";
import userReucer from "./Slice/userSlice";
export const store = configureStore({
  reducer: {
    products: productsReducer,
    singleProduct: singleProductReducer,
    user:userReucer
  },
});
