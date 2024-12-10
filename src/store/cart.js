import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  statusTab:  false
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add item to cart or update quantity if it exists
    addToCart: (state, action) => {
      const item = state.items.find(
        (item) => item.productId === action.payload.productId
      );

      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    // Change item quantity or remove it if quantity is 0
    changeQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const indexProductId = state.items.findIndex(
        (item) => item.productId === productId
      );

      if (indexProductId !== -1) {
        if (quantity > 0) {
          state.items[indexProductId].quantity = quantity;
        } else {
          // Remove item from the array
          state.items.splice(indexProductId, 1);
        }
      }
    },
    toggleStatusTab(state){
      if(state.statusTab === false){
        state.statusTab = true;
      }else{
        state.statusTab = false;
      }
    }
  },
});

export const { addToCart, changeQuantity, toggleStatusTab } = cartSlice.actions;
export default cartSlice.reducer;
