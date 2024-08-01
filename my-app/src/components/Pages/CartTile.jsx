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
        <div className='px-5 xl:px-28 pt-9 lg:px-2 pb-3 lg:mx-0'>
          <div className='flex gap-5 justify-between'>
            <h1 className='text-black text-5xl mb-8'>Your cart</h1>
            <Link to={'/'}>
              <button className='w-full py-2 text-black underline underline-offset-2'>
                Continue shopping
              </button>
            </Link>
          </div>
          <div className='flex justify-between mb-4'>
            <span className='text-gray-400 text-xs font-normal'>PRODUCT</span>
            <div className='flex w-2/5 justify-between'>
              <span className='text-gray-400 text-xs font-normal'>
                QUANTITY
              </span>
              <span className='ftext-gray-400 text-xs font-normal'>TOTAL</span>
            </div>
          </div>
          <hr className='mb-4' />
          <div>
            {cart.map((cartItem) => (
              <CartShop key={cartItem.id} cartItem={cartItem} updateTotalCart={updateTotalCart} />
            ))}
          </div>
          <div className='flex mt-28 justify-between items-center flex-col md:items-end'>
            <div className='flex md:justify-end justify-center w-full md:mb-4 text-center items-center'>
              <span className='text-black text-lg '>Subtotal</span>
              <span className='ml-5 text-xl'>$ {totalCart.toFixed(2)} CAD</span>
            </div>
            <p className='text-gray-500 mb-4 md:mb-2'>
              Taxes and shipping calculated at checkout
            </p>
            <button className='bg-buynowButton text-black rounded hover:h-11 px-4 py-2 w-80'>
              Check out
            </button>
          </div>
        </div>
      ) : (
        <div className='min-h-[40vh] flex justify-center flex-col items-center'>
          <h1 className='text-black font-serif font-light text-4xl mb-6 text-center'>
            Your cart is empty
          </h1>
          <Link to={'/'}>
            <button className='w-60 py-2 bg-buynowButton text-black rounded hover:h-11'>
              Continue Shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default CartTile;
