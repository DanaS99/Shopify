import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../Context/Context';
import RecipeItem from '../RecipeItem/RecipeItem';

function Product({ product }) {
  const { recipeList, loading } = useContext(GlobalContext);
  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className='container flex flex-wrap justify-center gap-10 py-8 mx-auto'>
      {recipeList && recipeList.length > 0 ? (
        recipeList.map((item) => <RecipeItem item={item} />)
      ) : (
        <div>
          {' '}
          <Link to={`/cart/${product?._id}`} className='cursor-pointer'>
            <div className='group flex flex-col md:gap-3 p-4 md:h-[360px] mt-4 rounded-xl '>
              <div className='relative overflow-hidden bg-red-50 rounded-xl'>
                <img
                  src={product?.images}
                  alt={product?.title}
                  className='object-cover w-full h-full transition-transform transform rounded-xl hover:scale-105'
                />
                {product?.stock === 0 && (
                  <span className='absolute px-2 py-1 text-xs font-semibold text-white bg-black rounded bottom-2 left-2'>
                    Sold out
                  </span>
                )}
              </div>
              <div className='mt-2 text-left'>
                <h2 className='font-medium leading-5 md:text-lg md:leading-6 text-lighterblack hover:underline'>
                  {product?.title}
                </h2>
                <p className='text-sm md:text-base text-lightblack'>
                  $ {product?.price} CAD
                </p>
              </div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
  
}

export default Product;
