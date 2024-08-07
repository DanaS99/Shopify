import React, { useContext, useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GlobalContext } from '../Context/Context';
import { loading2 } from '../../assets';
import { addToCart } from '../Store/Slices/CartSlice';

function Cart({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [totalQuantityInCart, setTotalQuantityInCart] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stockExceeded, setStockExceeded] = useState(false);
  const addToCartButtonRef = useRef(null);
  const dispatch = useDispatch();
  const popupRef = useRef(null);

  const combinedClickHandler = () => {
    if (!stockExceeded) {
      AddedToShopCart(); // Calls the function that dispatches the cart event
      handleAddToCart(); // Calls the function that sets loading state and shows popup
    }
  };

  const handleAddToCart = () => {
    if (quantity > recipeDetailsData?.stock) {
      setStockExceeded(true);
      return; // Prevent adding to cart if stock is exceeded
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowPopup(true);
      setTotalQuantityInCart(totalQuantityInCart + quantity); // Update total quantity in cart
    }, 1000); // Simulate a loading time of 1 second
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setStockExceeded(false); // Reset stock check when popup closes
  };

  const handleClickOutside = (event) => {
    if (
      addToCartButtonRef.current &&
      !addToCartButtonRef.current.contains(event.target) &&
      popupRef.current &&
      !popupRef.current.contains(event.target)
    ) {
      handleClosePopup();
    }
  };

  useEffect(() => {
    if (showPopup) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPopup]);

  const increaseQuantity = () => {
    if (quantity < recipeDetailsData?.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value > 0 && value <= recipeDetailsData?.stock) {
      setQuantity(value);
    } else {
      setQuantity(1);
    }
  };

  const { id } = useParams();
  const { recipeDetailsData, setrecipeDetailsData } = useContext(GlobalContext);

  function AddedToShopCart() {
    const itemToAdd = { ...recipeDetailsData, quantity }; // Add quantity to the item data
    dispatch(addToCart(itemToAdd));
  }

  // useEffect(() => {
  //   async function getRecipeDetails() {
  //     const response = await fetch(`https://dummyjson.com/products/${id}`);
  //     const data = await response.json();

  //     if (data) {
  //       setrecipeDetailsData(data);
  //     }
  //   }
  //   getRecipeDetails();
  // }, [id, setrecipeDetailsData]);

  useEffect(() => {
    async function getRecipeDetails() {
      const response = await fetch(`http://localhost:5000/api/getItem/${id}`);
      const data = await response.json();

      if (data) {
        setrecipeDetailsData(data);
      }
    }
    getRecipeDetails();
  }, [id, setrecipeDetailsData]);

  return (
    <div className='container p-5 xxs:mx-5 xs:mx-auto lg:mx-32 '>
      <div className='grid grid-cols-1 gap-10 md:grid-cols-2'>
        <div>
          <img
            src={recipeDetailsData?.images}
            alt={recipeDetailsData?.title}
            className=' xs:w-full rounded-xl'
          />
        </div>

        <div className='w-60 xs:w-80'>
          <h1 className='text-3xl text-black'>{recipeDetailsData?.title}</h1>
          <h3 className='mt-3 text-sm md:text-base text-lightblack'>
            $ {recipeDetailsData?.price} CAD
          </h3>

          <div className='mb-6'>
            <label
              className='block mt-4 mb-2 text-xs font-normal text-black'
              htmlFor='quantity'
            >
              Quantity ({totalQuantityInCart} in cart)
            </label>
            <div className='flex items-center'>
              <div className='flex items-center text-black bg-white border-2 rounded border-slate-600'>
                <button onClick={decreaseQuantity} className='px-2 py-1 '>
                  -
                </button>

                <input
                  type='text'
                  value={quantity}
                  onChange={handleInputChange}
                  className='w-12 mx-4 text-center no-spinners'
                />
                <button onClick={increaseQuantity} className='px-2 py-1 '>
                  +
                </button>
              </div>
            </div>
            {quantity >= recipeDetailsData?.stock && (
              <span className='text-sm leading-3'>
                You can't add more {recipeDetailsData?.title} to the cart
              </span>
            )}
          </div>

          <div className='mb-6'>
            <button
              ref={addToCartButtonRef}
              className='relative w-full py-2 mb-3 text-black bg-white border-2 rounded border-slate-600 hover:border-black'
              onClick={combinedClickHandler}
              disabled={totalQuantityInCart >= recipeDetailsData?.stock}
            >
              {loading ? (
                <img
                  src={loading2}
                  className='items-center justify-center w-8 h-8 animate-spin ml-36'
                ></img>
              ) : (
                'Add to cart'
              )}
            </button>

            {showPopup && (
              <div
                ref={popupRef} 
                className={`absolute transition-transform duration-300 ease-out transform ${
                  window.innerWidth <= 768
                    ? 'w-screen top-20 left-0 mx-5'
                    : 'w-96'
                }`}
                style={{
                  top:
                    window.innerWidth > 768
                      ? `${
                          addToCartButtonRef.current.getBoundingClientRect()
                            .top - 190
                        }px`
                      : '',
                  left:
                    window.innerWidth > 768
                      ? `${
                          addToCartButtonRef.current.getBoundingClientRect()
                            .left
                        }px`
                      : '',
                  zIndex: 2000, // Increased z-index to ensure it's on top
                  pointerEvents: 'auto', // Ensure it can be interacted with
                }}
              >
                <div className='relative w-full p-6 bg-white border-2 border-black rounded-none'>
                  <div className='flex items-center justify-between mb-4'>
                    <span> ✔ Item added to your cart</span>
                    <button
                      onClick={handleClosePopup}
                      className='text-3xl text-gray-400'
                    >
                      &times;
                    </button>
                  </div>
                  <div className='flex items-center mb-4'>
                    <img
                      src={recipeDetailsData?.images}
                      alt={recipeDetailsData?.title}
                      className='w-16 h-16 mr-4'
                    />
                    <span>{recipeDetailsData?.title}</span>
                  </div>
                  <div className='flex flex-col'>
                    <Link to='/cart/allproducts'>
                      <button className='w-full py-2 mb-3 text-black bg-white border-2 border-black rounded'>
                        View my cart ({totalQuantityInCart})
                      </button>
                    </Link>
                    <button className='w-full py-2 text-black rounded bg-buynowButton hover:h-11'>
                      Check out
                    </button>
                    <Link to='/'>
                      <button className='w-full py-2 text-black underline underline-offset-2'>
                        Continue shopping
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            <button className='w-full py-2 text-black rounded bg-buynowButton hover:h-11'>
              Buy it now
            </button>
          </div>

          <p className='mb-4 text-sm leading-6 text-gray-600'>
            This is a demonstration store. You can purchase products like this
            from{' '}
            <a href='#' className='underline'>
              Coursework
            </a>
            .
          </p>

          <p className='mb-4 text-sm leading-6 text-gray-600'>
            {recipeDetailsData?.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Cart;
