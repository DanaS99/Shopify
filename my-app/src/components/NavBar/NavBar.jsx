import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GlobalContext } from '../Context/Context';
import { Logo, SearchIcon } from '../../assets';
import Shopping from '../../assets/Shopping';

const NavBar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { searchParam, setSearchParam, handleSubmit } = useContext(GlobalContext);

  const cart = useSelector((state) => state.cart);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className='flex justify-between items-center px-5 xl:px-24 pt-9 lg:px-2 pb-3 lg:mx-0'>
      <div className='hidden md:flex items-center justify-start w-1/3'>
        <a href='/' className='p-3 cursor-pointer'>
          <img
            src={Logo}
            className='max-w-[120px] h-auto w-full sm:max-w-[150px]'
            alt='Logo'
          />
        </a>
      </div>
      <div className='flex md:hidden items-center justify-start w-1/3'>
        <img
          src={SearchIcon}
          className='cursor-pointer h-5 w-5 md:h-6 md:w-6'
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
      <div className='relative hidden md:flex items-center justify-end w-1/3 space-x-4'>
        <img
          src={SearchIcon}
          className='cursor-pointer h-5 w-5 md:h-6 md:w-6'
          alt='search'
          onClick={toggleSearch}
        />
        <div className='relative inline-block'>
          <Link to={'/cart/allproducts'}>
            <Shopping className='h-9 w-9 text-slate-950 md:h-10 md:w-10' />
            {totalItems > 0 && (
              <span className='absolute bottom-0 right-0 bg-buynowButton text-black text-xs rounded-full h-4 w-4 flex items-center justify-center z-10'>
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
      <div className='relative flex md:hidden items-center justify-end w-1/3'>
        <Link to={'/cart/allproducts'}>
          <Shopping className='h-9 w-9 text-slate-950 md:h-10 md:w-10' />
          {totalItems > 0 && (
            <span className='absolute bottom-0 right-0 bg-buynowButton text-black text-xs rounded-full h-4 w-4 flex items-center justify-center z-10'>
              {totalItems}
            </span>
          )}
        </Link>
      </div>

      {isSearchOpen && (
        <div className='fixed top-0 left-0 right-0 flex justify-center h-32 items-start bg-white p-4'>
          <div className='relative w-11/12 md:w-1/2 lg:w-1/3'>
            <form onSubmit={handleSubmit}>
              <input
                type='text'
                name='search'
                placeholder='Search'
                value={searchParam}
                onChange={(event) => setSearchParam(event.target.value)}
                className='w-full h-11 p-4 border border-black rounded-md'
              />
            </form>
            <img
              src={SearchIcon}
              className='absolute right-10 top-1/2 transform -translate-y-1/2 h-5 w-5 md:h-5 md:w-5'
              alt='search'
            />
            <div
              className='absolute right-2 top-5 transform -translate-y-1/2 cursor-pointer text-black text-3xl'
              onClick={toggleSearch}
            >
              &times;
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
