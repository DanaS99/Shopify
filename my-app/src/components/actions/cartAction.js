// cartActions.js
import {setCart} from './cartSlice'
export const addToCart2 = (itemData) => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:5000/api/cart', { // Update URL if needed
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemData),
    });

    if (response.ok) {
      const cartData = await response.json();
      dispatch(setCart(cartData.items)); // Update Redux state with new cart
    } else {
      const errorText = await response.text();
      console.error(`Failed to add item to cart: ${errorText}`);
    }
  } catch (error) {
    console.error('Error adding item to cart:', error);
  }
};
