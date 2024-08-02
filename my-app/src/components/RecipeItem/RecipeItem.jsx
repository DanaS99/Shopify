import React from 'react';

function RecipeItem({ item }) {

  return (
    <div className='group flex flex-col md:gap-3 p-4 md:h-[360px] mt-4 rounded-xl '>
      <div className='relative bg-red-50 rounded-xl overflow-hidden'>
        <img
          src={item?.images}
          alt={item?.title}
          className='w-full h-full object-cover  pointer-events-auto rounded-xl transform transition-transform hover:scale-105'
        />
        {item?.stock === 0 && (
          <span className='absolute bottom-2 left-2 bg-black text-white text-xs font-semibold px-2 py-1 rounded'>
            Sold out
          </span>
        )}
      </div>
      <div className='mt-2 text-left'>
        <h2 className='md:text-lg font-medium leading-5 md:leading-6 text-lighterblack hover:underline'>
          {item?.title}
        </h2>
        <p className='text-sm md:text-base text-lightblack'>
          $ {item?.price} CAD
        </p>
      </div>
    </div>
  );
}

export default RecipeItem;
