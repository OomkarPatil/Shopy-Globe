import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart';  // assuming you have a slice for cart

const store = configureStore({
  reducer: {
    cart: cartReducer
  }
});

export default store;
