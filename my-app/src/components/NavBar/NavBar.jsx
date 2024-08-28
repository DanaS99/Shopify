import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GlobalContext } from '../Context/Context';
import { Logo, SearchIcon } from '../../assets';
import Shopping from '../../assets/Shopping';
import { FaUser } from 'react-icons/fa';
import Signup from '../Auth/Signup';
import Profile from './Profile';
import axios from 'axios';

const NavBar = () => {
  const [userdata, setUserdata] = useState({});
  console.log('userdata', userdata);
  const getUser = async () => {
    try {
      const response = await axios.get('http://localhost:5000/login/success', {
        withCredentials: true,
      });
      console.log('response', response.data);
      setUserdata(response.data.user);
    } catch (error) {
      console.log('error', error);
    }
  };
  
  
  

  useEffect(() => {
    getUser();
  }, []);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { searchParam, setSearchParam, handleSubmit, notFound } =
    useContext(GlobalContext);

  const cart = useSelector((state) => state.cart);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <div>
      <header className='flex items-center justify-between px-5 pb-3 xl:px-24 pt-9 lg:px-2 lg:mx-0'>
        <div className='items-center justify-start hidden w-1/3 md:flex'>
          <a href='/' className='p-3 cursor-pointer'>
            <img
              src={Logo}
              className='max-w-[120px] h-auto w-full sm:max-w-[150px]'
              alt='Logo'
            />
          </a>
        </div>
        <div className='flex items-center justify-start w-1/3 md:hidden'>
          <img
            src={SearchIcon}
            className='w-5 h-5 cursor-pointer md:h-6 md:w-6'
            alt='search'
            onClick={toggleSearch}
          />
        </div>
        <div className='flex justify-center w-1/3 md:hidden'>
          <Link to={'/'} className='p-3 cursor-pointer'>
            <img
              src={Logo}
              className='max-w-[120px] h-auto w-full sm:max-w-[150px]'
              alt='Logo'
            />
          </Link>
        </div>
        <div className='relative items-center justify-end hidden w-1/3 space-x-4 md:flex'>
          <img
            src={SearchIcon}
            className='w-5 h-5 cursor-pointer md:h-6 md:w-6'
            alt='search'
            onClick={toggleSearch}
          />
          <div className='relative inline-block'>
            <Link to={'/cart/allproducts'}>
              <Shopping className='h-9 w-9 text-slate-950 md:h-10 md:w-10' />
              {totalItems > 0 && (
                <span className='absolute bottom-0 right-0 z-10 flex items-center justify-center w-4 h-4 text-xs text-black rounded-full bg-buynowButton'>
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
        <div className='relative flex items-center justify-end w-1/3 md:hidden'>
          <Link to={'/cart/allproducts'}>
            <Shopping className='h-9 w-9 text-slate-950 md:h-10 md:w-10' />
            {totalItems > 0 && (
              <span className='absolute bottom-0 right-0 z-10 flex items-center justify-center w-4 h-4 text-xs text-black rounded-full bg-buynowButton'>
                {totalItems}
              </span>
            )}
          </Link>
        </div>


        {
          Object.keys(userdata).length > 0 ? (
            <>
              <button>{userdata.name}</button>
              <img src="" alt="image"/>
            </>
          ) : (
            <button
          onClick={() => document.getElementById('my_modal_5').showModal()}
          className='flex items-center gap-2 px-6 text-black rounded-full btn bg-green'
        >
          <FaUser /> Signup
        </button>
          )
        }

        

        <Signup />

        {isSearchOpen && (
          <div className='fixed top-0 left-0 right-0 z-50 flex items-start justify-center h-32 p-4 bg-white'>
            <div className='relative w-11/12 md:w-1/2 lg:w-1/3'>
              <form onSubmit={handleSubmit}>
                <input
                  type='text'
                  name='search'
                  placeholder='Search'
                  value={searchParam}
                  onChange={(event) => setSearchParam(event.target.value)}
                  className='w-full p-4 border border-black rounded-md h-11'
                />
              </form>
              <img
                src={SearchIcon}
                className='absolute w-5 h-5 transform -translate-y-1/2 right-10 top-1/2 md:h-5 md:w-5'
                alt='search'
              />
              <div
                className='absolute text-3xl text-black transform -translate-y-1/2 cursor-pointer right-2 top-5'
                onClick={toggleSearch}
              >
                &times;
              </div>
            </div>
          </div>
        )}
      </header>
      <div>
        {/* Message for item not found */}
        {notFound && (
          <div className='w-full mt-4 text-center'>
            <p className='text-red-600'>
              The item you mentioned is not found in our store.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
