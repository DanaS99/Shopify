//createslice method
//initialize the initial state
//create slice -> name, initial state, actions

import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action){
      console.log("action");
        console.log(action);
        state.push(action.payload)
    },
    removeFromCart(state, action){
        return state.filter(item => item.id !== action.payload)
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    setCart: (state, action) => action.payload, // Set the cart items from the payload

  },
});

export const { addToCart, removeFromCart, updateQuantity, setCart } = cartSlice.actions

export default cartSlice.reducer;
