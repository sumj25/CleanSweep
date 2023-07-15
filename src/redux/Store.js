import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./reducer/CartReducer";
import ProductReducer from "./reducer/ProductReducer";

export default configureStore({
  reducer: {
    cart: CartReducer,
    product: ProductReducer,
  },
});
