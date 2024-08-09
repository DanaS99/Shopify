import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { bin } from '../../assets';
import { removeFromCart, updateQuantity } from '../Store/Slices/CartSlice';

const CartShop = ({ cartItem, updateTotalCart }) => {
  console.log('Rendering CartShop component');
  console.log('cartItem:', cartItem);

  const [quantity, setQuantity] = useState(cartItem.quantity || 1);
  const [total, setTotal] = useState(cartItem.price * quantity);

  const dispatch = useDispatch();

  const updateTotal = (newQuantity) => {
    setTotal(newQuantity * cartItem.price);
    updateTotalCart();
  };

  useEffect(() => {
    console.log('Initial quantity in useEffect:', quantity);
    console.log('Initial stock in useEffect:', cartItem.stock);
  }, []);

  useEffect(() => {
    updateTotal(quantity);
  }, [quantity]);



  const handleIncreaseQuantity = () => {
    console.log('Attempting to increase quantity:', quantity);
    console.log('Cart item stock:', cartItem.stock);
    if (quantity < cartItem.stock) {
      const newQuantity = quantity + 1;
      console.log('New quantity:', newQuantity);
      setQuantity(newQuantity);
      dispatch(updateQuantity({ id: cartItem.id, quantity: newQuantity }));
      updateTotal(newQuantity);
    } else {
      console.log('Cannot increase, stock limit reached.');
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      console.log('New quantity:', newQuantity);
      setQuantity(newQuantity);
      dispatch(updateQuantity({ id: cartItem.id, quantity: newQuantity }));
      updateTotal(newQuantity);
    }
  };

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value, 10);
    console.log('Input change value:', value);
    if (!isNaN(value) && value > 0 && value <= cartItem.stock) {
      setQuantity(value);
      dispatch(updateQuantity({ id: cartItem.id, quantity: value }));
      updateTotal(value);
    } else {
      setQuantity(1);
      dispatch(updateQuantity({ id: cartItem.id, quantity: 1 }));
      updateTotal(1);
    }
  };

  // const handleRemoveFromCart = () => {
  //   dispatch(removeFromCart(cartItem.id));
  //   updateTotalCart();
  // };

  // const handleRemoveFromCart = async () => {
  //   try {
  //     if (!cartItem.id) {
  //       console.error('cartItem does not have an id field. Cannot delete.');
  //       return;
  //     }
  
  //     const response = await fetch(`http://localhost:5000/api/delete/${cartItem.id}`, {
  //       method: 'DELETE',
  //     });
  
  //     if (response.ok) {
  //       dispatch(removeFromCart(cartItem.id));
  //       updateTotalCart();
  //     } else {
  //       const errorText = await response.text();
  //       console.error(`Failed to delete item from the database: ${errorText}`);
  //     }
  //   } catch (error) {
  //     console.error('Error deleting item:', error);
  //   }
  // };
  const handleRemoveFromCart = () => {
    try {
      if (!cartItem._id) {
        console.error('cartItem does not have an id field. Cannot delete.');
        return;
      }
  
      // Remove the item from the cart in Redux store
      dispatch(removeFromCart(cartItem.id));
      
      // Update the total cart value
      updateTotalCart();
    } catch (error) {
      console.error('Error removing item from the cart:', error);
    }
  };
  

  return (
    <div className='p-4 sm:p-6 lg:p-8'>
      <div className='flex flex-col items-center justify-between mb-4 lg:flex-row'>
        <img
          src={cartItem?.images}
          alt={cartItem?.title}
          className='object-cover w-full h-auto mb-4 sm:w-36 lg:w-48 lg:mb-0'
        />
        <div className='flex-1 lg:ml-4'>
          <h2 className='mb-2 text-base text-black sm:text-lg lg:text-xl'>
            {cartItem?.title}
          </h2>
          <span className='text-sm text-gray-500 sm:text-base lg:text-lg'>
            ${cartItem?.price}
          </span>
        </div>
        <div className='flex items-center justify-between w-full mt-4 lg:w-2/5 lg:mt-0'>
          <div className='relative flex items-center px-2 py-1 text-black bg-white border-2 rounded border-slate-600'>
            <button onClick={handleDecreaseQuantity} className='px-2 py-1'>
              -
            </button>
            <input
              type='text'
              value={quantity}
              onChange={handleInputChange}
              className='w-12 mx-2 text-center no-spinners'
            />
            <button onClick={handleIncreaseQuantity} disabled={quantity >= cartItem.stock} className='px-2 py-1'>
              +
            </button>
          </div>
          {quantity >= cartItem?.stock && (
              <span className='text-sm'>
                You can't add more {cartItem?.title} to the cart
              </span>
            )}

          <button onClick={handleRemoveFromCart} className='ml-4'>
            <img src={bin} className='w-5 h-5' alt='Remove' />
          </button>
          <span className='ml-4 text-base text-black sm:text-lg lg:text-xl'>
            ${total.toFixed(2)}
          </span>
        </div>
      </div>
      <hr className='mb-8' />
    </div>
  );
};

export default CartShop;


