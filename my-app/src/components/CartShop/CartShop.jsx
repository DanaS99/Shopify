import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { bin } from '../../assets';
import { removeFromCart, updateQuantity } from '../Store/Slices/CartSlice';

const CartShop = ({ cartItem, updateTotalCart }) => {
  const [quantity, setQuantity] = useState(cartItem.quantity || 1);
  const [total, setTotal] = useState(cartItem.price * quantity);

  const dispatch = useDispatch();

  const updateTotal = (newQuantity) => {
    setTotal(newQuantity * cartItem.price);
    updateTotalCart();
  };

  const handleIncreaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    dispatch(updateQuantity({ id: cartItem.id, quantity: newQuantity }));
    updateTotal(newQuantity);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      dispatch(updateQuantity({ id: cartItem.id, quantity: newQuantity }));
      updateTotal(newQuantity);
    }
  };

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
      dispatch(updateQuantity({ id: cartItem.id, quantity: value }));
      updateTotal(value);
    } else {
      setQuantity(1);
      dispatch(updateQuantity({ id: cartItem.id, quantity: 1 }));
      updateTotal(1);
    }
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(cartItem.id));
    updateTotalCart();
  };

  useEffect(() => {
    updateTotal(quantity);
  }, [quantity]);

  return (
    <div className='p-4 sm:p-6 lg:p-8'>
      <div className='flex flex-col lg:flex-row justify-between items-center mb-4'>
        <img
          src={cartItem?.images}
          alt={cartItem?.title}
          className='w-full sm:w-36 lg:w-48 h-auto object-cover mb-4 lg:mb-0'
        />
        <div className='flex-1 lg:ml-4'>
          <h2 className='text-black text-base sm:text-lg lg:text-xl mb-2'>{cartItem?.title}</h2>
          <span className='text-gray-500 text-sm sm:text-base lg:text-lg'>${cartItem?.price}</span>
        </div>
        <div className='flex items-center justify-between w-full lg:w-2/5 mt-4 lg:mt-0'>
          <div className='relative flex items-center bg-white px-2 py-1 text-black border-2 border-slate-600 rounded'>
            <button onClick={handleDecreaseQuantity} className='px-2 py-1'>
              -
            </button>
            <input
              type='text'
              value={quantity}
              onChange={handleInputChange}
              className='mx-2 w-12 text-center no-spinners'
            />
            <button onClick={handleIncreaseQuantity} className='px-2 py-1'>
              +
            </button>
            {
              quantity >= cartItem?.stock && (
                <span className='text-sm'>You can't add more {cartItem?.title} to the cart</span>
              )
            }
          </div>
          
          <button onClick={handleRemoveFromCart} className='ml-4'>
            <img src={bin} className='w-5 h-5' alt='Remove' />
          </button>
          <span className='text-black text-base sm:text-lg lg:text-xl ml-4'>${total.toFixed(2)}</span>
        </div>
      </div>
      <hr className='mb-8' />
    </div>
  );
};

export default CartShop;
