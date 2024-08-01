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
    <div className='py-8 container mx-auto flex flex-wrap justify-center gap-10'>
      {recipeList && recipeList.length > 0 ? (
        recipeList.map((item) => <RecipeItem item={item} />)
      ) : (
        <div>
          {' '}
          <Link to={`/cart/${product?.id}`} className='cursor-pointer'>
            <div className='group flex flex-col md:gap-3 p-4 md:h-[360px] mt-4 rounded-xl '>
              <div className='relative bg-red-50 rounded-xl overflow-hidden'>
                <img
                  src={product?.images}
                  alt={product?.title}
                  className='w-full h-full object-cover rounded-xl transform transition-transform hover:scale-105'
                />
                {product?.stock === 0 && (
                  <span className='absolute bottom-2 left-2 bg-black text-white text-xs font-semibold px-2 py-1 rounded'>
                    Sold out
                  </span>
                )}
              </div>
              <div className='mt-2 text-left'>
                <h2 className='md:text-lg font-medium leading-5 md:leading-6 text-lighterblack hover:underline'>
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
