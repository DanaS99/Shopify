

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartShop from '../CartShop/CartShop';

function CartTile() {
  const [totalCart, setTotalCart] = useState(0);
  const { cart } = useSelector((state) => state);

  
  useEffect(() => {
    updateTotalCart();
  }, [cart]);

  const updateTotalCart = () => {
    // Calculate total by adding up the price multiplied by quantity (default to 1 if quantity is undefined)
    const total = cart.reduce((acc, curr) => acc + (curr.price * (curr.quantity || 1)), 0);
    setTotalCart(total);
  };

  return (
    <div>
      {cart && cart.length ? (
        <div className='px-5 pb-3 xl:px-28 pt-9 lg:px-2 lg:mx-0'>
          <div className='flex justify-between gap-5'>
            <h1 className='mb-8 text-5xl text-black'>Your cart</h1>
            <Link to={'/'}>
              <button className='w-full py-2 text-black underline underline-offset-2'>
                Continue shopping
              </button>
            </Link>
          </div>
          <div className='flex justify-between mb-4'>
            <span className='text-xs font-normal text-gray-400'>PRODUCT</span>
            <div className='flex justify-between w-2/5'>
              <span className='text-xs font-normal text-gray-400'>
                QUANTITY
              </span>
              <span className='text-xs font-normal ftext-gray-400'>TOTAL</span>
            </div>
          </div>
          <hr className='mb-4' />
          <div>
            {cart.map((cartItem) => (
              <CartShop key={cartItem.id} cartItem={cartItem} updateTotalCart={updateTotalCart} />
            ))}
          </div>
          <div className='flex flex-col items-center justify-between mt-28 md:items-end'>
            <div className='flex items-center justify-center w-full text-center md:justify-end md:mb-4'>
              <span className='text-lg text-black '>Subtotal</span>
              <span className='ml-5 text-xl'>$ {totalCart.toFixed(2)} CAD</span>
            </div>
            <p className='mb-4 text-gray-500 md:mb-2'>
              Taxes and shipping calculated at checkout
            </p>
            <button className='px-4 py-2 text-black rounded bg-buynowButton hover:h-11 w-80'>
              Check out
            </button>
          </div>
        </div>
      ) : (
        <div className='min-h-[40vh] flex justify-center flex-col items-center'>
          <h1 className='mb-6 font-serif text-4xl font-light text-center text-black'>
            Your cart is empty
          </h1>
          <Link to={'/'}>
            <button className='py-2 text-black rounded w-60 bg-buynowButton hover:h-11'>
              Continue Shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default CartTile;
